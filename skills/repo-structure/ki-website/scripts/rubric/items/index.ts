import type { RubricItem } from '../../shared/rubric.ts'
import { createWebsiteContextFactory, KI_DEFAULT, type WebsiteContext } from '../contexts/website.ts'
import { KI_WEBSITE_RUBRIC } from './catalogue.ts'

type NativeWebsiteContext = Omit<WebsiteContext, 'dryRun' | 'ensureOptIn' | 'ensureDistIgnore'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<WebsiteContext>[]
}

const catalogueDefinition = KI_WEBSITE_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<WebsiteContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeWebsiteContext) => definition.audit.run(context as unknown as WebsiteContext)
  }
}

const judgment = (item: RubricItem<WebsiteContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const distIgnoreConform = (context: NativeWebsiteContext) => {
  if (!context.cfgName) return { writes: [] }
  const current = context.read('.gitignore')
  const correct = context.siteRoot ? /^\s*\/?site\/dist\/?\s*$/m.test(current) : /^\s*\/?dist\/?\s*$/m.test(current)
  if (correct) return { writes: [] }
  const content =
    context.siteRoot && /^\s*\/dist\/?\s*$/m.test(current)
      ? current.replace(/^(\s*)\/dist(\/?)(\s*)$/m, '$1/site/dist$2$3')
      : `${current ? current.replace(/\n*$/, '\n') : ''}${context.siteRoot ? 'site/dist' : 'dist'}\n`
  return { writes: [{ path: '.gitignore', content, ...(!context.has('.gitignore') ? { create: true } : {}) }] }
}

const optInConform = (context: NativeWebsiteContext) => {
  if (context.kiWebsiteTable) return { writes: [] }
  const current = context.read('.ki-config.toml')
  const content = current ? `${current.replace(/\n*$/, '\n')}\n${KI_DEFAULT}` : KI_DEFAULT
  return { writes: [{ path: '.ki-config.toml', content, ...(!context.has('.ki-config.toml') ? { create: true } : {}) }] }
}

const nativeItem = (item: RubricItem<WebsiteContext>) => {
  const native = item.mechanical ? mechanical(item) : judgment(item)
  if (item.code === 'WEB-33' && native.kind === 'mechanical') return { ...native, conform: distIgnoreConform }
  if (item.code === 'WEB-41' && native.kind === 'mechanical') return { ...native, conform: optInConform }
  return native
}

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly conform?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { conform: legacyConform, ...mechanical } = item.mechanical
  void legacyConform
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.conform ? { conform: { phase: 'NORMALISE', run: runtime.conform } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-website',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeWebsiteContext => {
    const source = createWebsiteContextFactory({ target: repository, dryRun: true })()
    const { dryRun: _dryRun, ensureOptIn: _ensureOptIn, ensureDistIgnore: _ensureDistIgnore, ...evidence } = source
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
