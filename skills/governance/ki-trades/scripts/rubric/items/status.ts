import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const STATUS_1: RubricItem<OutcomeContext> = {
  code: 'STATUS-1',
  title: 'receipt evidence, decision status, and linkage are valid',
  description:
    'Inbound records evidence receipt independently from decision and carry one receiver-owned status: unconsidered, in_progress, parked, clarify, applied, adopted, retained, declined, or superseded, with full commit evidence and decision-appropriate rationale or local linkage.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const STATUS: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'STATUS',
  title: 'Delivery and receiver decision',
  description: 'Preparation, submission, receipt, receiver decision, and local completion remain separate facts with closed receiver-owned evidence.',
  standard: SOURCE,
  selectContext: (context) => context.status,
  items: [STATUS_1]
}
