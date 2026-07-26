import type { RubricItem } from '../../shared/rubric.ts'
import { createHarnessContext, type HarnessRubricContext, hasTomlTable } from '../contexts/harness.ts'
import { KI_HARNESS_RUBRIC } from './catalogue.ts'

type NativeHarnessContext = Omit<HarnessRubricContext, 'dryRun' | 'ensurePart' | 'ensureShelfReadme' | 'ensureHarnessConfig'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<HarnessRubricContext>[]
}

const catalogueDefinition = KI_HARNESS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<HarnessRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeHarnessContext) => definition.audit.run(context as unknown as HarnessRubricContext)
  }
}

const judgment = (item: RubricItem<HarnessRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

// The host transaction presently replaces existing regular files only.  Directory and
// missing-file scaffolding remain violations until that capability is deliberately added;
// their legacy writers are not exposed through the native context.
const unsupportedScaffoldConform = () => ({ writes: [] })

const nativeConfig1 = (item: RubricItem<HarnessRubricContext>) => ({
  ...mechanical(item),
  conform: (context: NativeHarnessContext) => ({
    writes:
      context.config === null || hasTomlTable(context.config, 'ki-harness')
        ? []
        : [{ path: '.ki-config.toml', content: `${context.config.replace(/\n*$/, '\n')}\n[ki-harness]\n` }]
  })
})

const nativeItem = (item: RubricItem<HarnessRubricContext>) => {
  if (item.code === 'LAY-1' || item.code === 'LAY-2') return { ...mechanical(item), conform: unsupportedScaffoldConform }
  if (item.code === 'CONFIG-1') return nativeConfig1(item)
  return item.mechanical ? mechanical(item) : judgment(item)
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
  name: 'ki-harness',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeHarnessContext => {
    const {
      dryRun: _dryRun,
      ensurePart: _ensurePart,
      ensureShelfReadme: _ensureShelfReadme,
      ensureHarnessConfig: _ensureHarnessConfig,
      ...evidence
    } = createHarnessContext(repository, true)
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
