import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const STATUS_1: RubricItem<OutcomeContext> = {
  code: 'STATUS-1',
  title: 'receiver status and linkage are valid',
  description:
    'Only inbound records carry receiver status: received, adopted, parked, clarify, declined, or superseded, with status-appropriate rationale and local adoption or supersession linkage.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const STATUS: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'STATUS',
  title: 'Receiver lifecycle',
  description: 'Receiver-owned disposition uses a closed status vocabulary and explicit local evidence.',
  standard: SOURCE,
  selectContext: (context) => context.status,
  items: [STATUS_1]
}
