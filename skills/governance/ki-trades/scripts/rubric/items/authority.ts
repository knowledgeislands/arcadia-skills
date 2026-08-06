import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const AUTH_1: RubricItem<OutcomeContext> = {
  code: 'AUTH-1',
  title: 'sender and receiver write boundaries are preserved',
  description:
    'Preparations and outbound records belong to the local sender, retain their declared export route, and contain no receiver-local fields; inbound records belong to the local receiver, retain an active receipt route, and preserve the complete raw submitted sender projection byte-for-byte.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const AUTH: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'AUTH',
  title: 'Write authority',
  description: 'A trade remains a local copy protocol with an immutable raw sender projection and receiver-only local fields.',
  standard: SOURCE,
  selectContext: (context) => context.authority,
  items: [AUTH_1]
}
