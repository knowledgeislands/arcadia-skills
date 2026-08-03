import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const RELEASE_1: RubricItem<OutcomeContext> = {
  code: 'RELEASE-1',
  title: 'release and pruning follow observable lifecycle evidence',
  description:
    'Sender release is permitted only after adopted, declined, or superseded; parked, clarify, and received retain the outbound copy, and receiver pruning becomes eligible only after an allowed release is observable.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const RELEASE: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'RELEASE',
  title: 'Release and pruning',
  description: 'Absence is interpreted only as an observable release signal after a terminal receiver disposition.',
  standard: SOURCE,
  selectContext: (context) => context.release,
  items: [RELEASE_1]
}
