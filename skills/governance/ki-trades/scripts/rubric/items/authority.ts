import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const AUTH_1: RubricItem<OutcomeContext> = {
  code: 'AUTH-1',
  title: 'sender and receiver write boundaries are preserved',
  description:
    'Outbound records belong to the local sender and contain no receiver-local fields; inbound records belong to the local receiver, use an active route, and preserve the outbound sender envelope and body exactly.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const AUTH: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'AUTH',
  title: 'Write authority',
  description: 'A trade remains a local copy protocol with immutable sender provenance and receiver-only disposition fields.',
  standard: SOURCE,
  selectContext: (context) => context.authority,
  items: [AUTH_1]
}
