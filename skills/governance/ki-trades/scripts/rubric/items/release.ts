import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const RELEASE_1: RubricItem<OutcomeContext> = {
  code: 'RELEASE-1',
  title: 'release and pruning follow observable lifecycle evidence',
  description:
    'Sender release is permitted only after adopted, retained, declined, or superseded; unconsidered, in_progress, parked, and clarify retain the outbound copy, and receiver pruning becomes eligible only after an allowed release is observable.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const RELEASE: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'RELEASE',
  title: 'Release and pruning',
  description: 'Absence is interpreted only as an observable release signal after a terminal receiver disposition.',
  standard: SOURCE,
  selectContext: (context) => context.release,
  items: [RELEASE_1]
}
