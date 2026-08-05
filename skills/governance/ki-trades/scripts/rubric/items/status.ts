import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const STATUS_1: RubricItem<OutcomeContext> = {
  code: 'STATUS-1',
  title: 'receiver decision status and linkage are valid',
  description:
    'Inbound records evidence receiver acceptance and carry one receiver decision status: unconsidered, in_progress, adopted, retained, parked, clarify, declined, or superseded, with decision-appropriate rationale and local adoption, retention, or supersession linkage.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const STATUS: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'STATUS',
  title: 'Mutual lifecycle',
  description:
    'Derived sender and receiver delivery statuses pair with a closed receiver-owned decision vocabulary and explicit local work or knowledge evidence.',
  standard: SOURCE,
  selectContext: (context) => context.status,
  items: [STATUS_1]
}
