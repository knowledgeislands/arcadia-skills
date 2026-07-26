import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { type BindingRubricContext, createBindingContext } from './contexts/binding.ts'
import { BIND_3 } from './items/bind.ts'
import { KI_BINDING_RUBRIC } from './items/index.ts'

type NativeBindingContext = Omit<BindingRubricContext, 'project' | 'projectCheck'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<BindingRubricContext>[]
}

const catalogue = KI_BINDING_RUBRIC.families as unknown as readonly LegacyFamily[]

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

// Project-local runtime links are not repository content and the old check delegated
// to the retired bootstrap publisher.  Native activation will need to expose its own
// runtime-link evidence; until then, retain this catalogue entry without invoking a
// legacy runner or claiming that `ki repo` can repair it.
const nativeProjectLinks = () => ({
  ...mechanical(BIND_3),
  audit: (context: NativeBindingContext) => [
    {
      status: 'NOT_APPLICABLE' as const,
      message: 'Project-local runtime links are outside the native repository audit scope.',
      subject: context.repository
    }
  ]
})

const nativeItem = (item: RubricItem<BindingRubricContext>) => {
  if (item.code === 'BIND-3') return nativeProjectLinks()
  // BIND-4's legacy conform callback writes Cowork settings beneath the user home.
  // The repository transaction cannot safely own that path, so it remains audit-only
  // until an explicit `ki user conform` scope supplies equivalent containment proof.
  return item.mechanical ? mechanical(item) : judgment(item)
}

export default {
  contract: 1,
  skill: 'ki-binding',
  createContext: ({ repository }: { readonly repository: string }): NativeBindingContext => {
    const { project: _project, projectCheck: _projectCheck, ...evidence } = createBindingContext({ dryRun: true })
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
