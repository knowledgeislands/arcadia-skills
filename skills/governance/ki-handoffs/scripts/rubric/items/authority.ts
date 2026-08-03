import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const AUTH_1: RubricItem<OutcomeContext> = {
  code: 'AUTH-1',
  title: 'sender and receiver write boundaries are preserved',
  description:
    'Outbound records belong to the local sender and contain no receiver-local fields; inbound records belong to the local receiver, use an active route, and preserve the outbound sender envelope and body exactly.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const AUTH: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'AUTH',
  title: 'Write authority',
  description: 'A handoff remains a local copy protocol with immutable sender provenance and receiver-only disposition fields.',
  standard: SOURCE,
  selectContext: (context) => context.authority,
  items: [AUTH_1]
}
