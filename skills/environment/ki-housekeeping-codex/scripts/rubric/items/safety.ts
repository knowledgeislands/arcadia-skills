import { judgment, type RubricFamily } from '../../shared/rubric.ts'
import type { HousekeepingRubricContext } from '../contexts/housekeeping.ts'

export const STATE = {
  code: 'STATE',
  title: 'Codex session housekeeping safety',
  standard: 'standards-codex-state.md',
  description: 'Repository identity, content minimisation, reviewed selection, and fail-closed permanent deletion.',
  selectContext: (context) => context,
  items: [
    {
      code: 'STATE-1',
      title: 'inventory is exact and content-minimised',
      description:
        'Inventory resolves one selected physical repository, matches only exact returned working directories, covers active and archived roots plus complete descendants, and excludes preview, turns, items, and transcript content.',
      sources: ['standards-codex-state.md#repository-identity', 'standards-codex-state.md#inventory'],
      judgment: judgment(
        'Does the runtime evidence prove exact physical-repository matching, complete active/archive and descendant coverage, and content minimisation?'
      )
    },
    {
      code: 'STATE-2',
      title: 'permanent deletion is explicitly reviewed and fail-closed',
      description:
        'Deletion requires a reviewed artifact, exact root selection, destructive confirmation, complete pre-delete revalidation, and explicit partial-execution reporting without blind retry.',
      sources: ['standards-codex-state.md#deletion'],
      judgment: judgment(
        'Does the proposed deletion remain inside the reviewed artifact, revalidate every selected root and descendant before mutation, and preserve the permanent and partial-execution boundaries?'
      )
    }
  ]
} satisfies RubricFamily<HousekeepingRubricContext, HousekeepingRubricContext>
