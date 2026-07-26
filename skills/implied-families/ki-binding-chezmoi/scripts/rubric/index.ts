import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { type BindingChezMoiContext, createBindingChezMoiContext } from './contexts/binding-chezmoi.ts'
import { KI_BINDING_CHEZMOI_RUBRIC } from './items/index.ts'

type NativeBindingChezMoiContext = BindingChezMoiContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<BindingChezMoiContext>[]
}

const catalogue = KI_BINDING_CHEZMOI_RUBRIC.families as unknown as readonly LegacyFamily[]

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
export default {
  contract: 1,
  skill: 'ki-binding-chezmoi',
  createContext: ({ repository }: { readonly repository: string }): NativeBindingChezMoiContext => ({
    repository,
    ...createBindingChezMoiContext(repository)
  }),
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
