import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const STATUS_1: RubricItem<OutcomeContext> = {
  code: 'STATUS-1',
  title: 'receiver status and linkage are valid',
  description:
    'Only inbound records carry receiver status: received, adopted, retained, parked, clarify, declined, or superseded, with status-appropriate rationale and local adoption, retention, or supersession linkage.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const STATUS: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'STATUS',
  title: 'Receiver lifecycle',
  description: 'Receiver-owned disposition uses a closed status vocabulary and explicit local work or knowledge evidence.',
  standard: SOURCE,
  selectContext: (context) => context.status,
  items: [STATUS_1]
}
