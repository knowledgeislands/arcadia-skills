import type { RubricItem } from '../../shared/rubric.ts'
import { createWebsiteCloudflareContext, type WebsiteCloudflareContext } from '../contexts/website-cloudflare.ts'
import { KI_WEBSITE_CLOUDFLARE_RUBRIC } from './catalogue.ts'

type NativeWebsiteCloudflareContext = WebsiteCloudflareContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<WebsiteCloudflareContext>[]
}

const catalogueDefinition = KI_WEBSITE_CLOUDFLARE_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<WebsiteCloudflareContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeWebsiteCloudflareContext) => definition.audit.run(context)
  }
}

const judgment = (item: RubricItem<WebsiteCloudflareContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<WebsiteCloudflareContext>) => (item.mechanical ? mechanical(item) : judgment(item))

// The host may inspect a site's local configuration but cannot infer a Worker
// name, domain routes, account bindings, or a deploy target. Those decisions
// and all Wrangler/Cloudflare operations remain explicitly reported work.

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
  name: 'ki-website-cloudflare',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeWebsiteCloudflareContext => ({
    repository,
    ...createWebsiteCloudflareContext(repository)
  }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
