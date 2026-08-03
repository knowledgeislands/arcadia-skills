import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const RECORD_1: RubricItem<OutcomeContext> = {
  code: 'RECORD-1',
  title: 'record identity, placement, and payload are canonical',
  description:
    'Every handoff record uses the two-level peer layout, an `HND-` lower-case UUID-shaped identity repeated in filename, metadata, and H1, the closed sender envelope, and non-empty Context, Submission, and Constraints payload sections.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const RECORD: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'RECORD',
  title: 'Record shape',
  description: 'Handoff identity is collision-resistant and corroborated by canonical record content rather than inferred from a filename.',
  standard: SOURCE,
  selectContext: (context) => context.records,
  items: [RECORD_1]
}
