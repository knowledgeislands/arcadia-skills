import type { RubricItem } from '../../../../../shared/rubric-contract.ts'
import { type BindingChezMoiContext, createBindingChezMoiContext } from '../contexts/binding-chezmoi.ts'
import { KI_BINDING_CHEZMOI_RUBRIC } from './catalogue.ts'

type NativeBindingChezMoiContext = BindingChezMoiContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<BindingChezMoiContext>[]
}

const catalogueDefinition = KI_BINDING_CHEZMOI_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<BindingChezMoiContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeBindingChezMoiContext) => definition.audit.run(context)
  }
}

const judgment = (item: RubricItem<BindingChezMoiContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<BindingChezMoiContext>) => (item.mechanical ? mechanical(item) : judgment(item))

// This contract only observes the chezmoi source repository.  A repair needs
// source-specific decisions and an external `chezmoi` render/apply operation,
// neither of which the repository transaction may infer or run.  Violations
// therefore remain reported until a caller supplies those decisions explicitly.

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly repair?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { repair: legacyRepair, ...mechanical } = item.mechanical
  void legacyRepair
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.repair ? { repair: { phase: 'NORMALISE', run: runtime.repair } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-binding-chezmoi',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeBindingChezMoiContext => ({
    repository,
    ...createBindingChezMoiContext(repository)
  }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
