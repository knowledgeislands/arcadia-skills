import type { RubricItem } from '../../shared/rubric.ts'
import { type BindingRubricContext, createBindingContext } from '../contexts/binding.ts'
import { KI_BINDING_RUBRIC } from './catalogue.ts'

type NativeBindingContext = BindingRubricContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<BindingRubricContext>[]
}

const catalogueDefinition = KI_BINDING_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<BindingRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeBindingContext) => definition.audit.run(context as unknown as BindingRubricContext)
  }
}

const judgment = (item: RubricItem<BindingRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<BindingRubricContext>) => {
  // BIND-4's legacy conform callback writes Cowork settings beneath the user home.
  // The repository transaction cannot safely own that path, so it remains audit-only
  // until an explicit `ki user conform` scope supplies equivalent containment proof.
  return item.mechanical ? mechanical(item) : judgment(item)
}

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
  name: 'ki-binding',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeBindingContext => {
    return { repository, ...createBindingContext({ dryRun: true }) }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
