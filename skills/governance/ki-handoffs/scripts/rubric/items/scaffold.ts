import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, ScaffoldContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const SCAFFOLD_1: RubricItem<ScaffoldContext> = {
  code: 'SCAFFOLD-1',
  title: 'owned handoff scaffold is canonical',
  description:
    'A repository declaring ki-handoffs carries the two `_HANDOFFS` directories and their canonical README orientation beneath the generic working areas owned by ki-repo.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes },
    conform: { phase: 'PRIMARY', run: (context) => context.ensureScaffold?.() }
  }
}

export const SCAFFOLD: RubricFamily<HandoffsRubricContext, ScaffoldContext> = {
  code: 'SCAFFOLD',
  title: 'Handoff scaffold',
  description: 'The optional capability owns only its `_HANDOFFS` directories and README files.',
  standard: SOURCE,
  selectContext: (context) => context.scaffold,
  items: [SCAFFOLD_1]
}
