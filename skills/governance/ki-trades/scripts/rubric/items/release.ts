import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const RELEASE_1: RubricItem<OutcomeContext> = {
  code: 'RELEASE-1',
  title: 'release and pruning follow observable lifecycle evidence',
  description:
    'Sender release follows the declared observation policy: unattended and receipt wait for receipt, decision waits for a terminal receiver decision, and completion additionally waits for adopted local work to be done. Receiver pruning becomes eligible only after such a release is observable.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const RELEASE: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'RELEASE',
  title: 'Release and pruning',
  description: 'Absence is an observable release signal only after the sender-selected receipt, decision, or completion condition is satisfied.',
  standard: SOURCE,
  selectContext: (context) => context.release,
  items: [RELEASE_1]
}
