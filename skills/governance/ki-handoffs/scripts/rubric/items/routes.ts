import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const ROUTE_1: RubricItem<OutcomeContext> = {
  code: 'ROUTE-1',
  title: 'peer routes are reciprocal and registered',
  description:
    'A route is active only when exactly one locally registered repository declares the peer identity and both repositories include one another in their normalized peer lists.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const ROUTE: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'ROUTE',
  title: 'Reciprocal routes',
  description: 'Registered repository visibility becomes an active route only through matching reciprocal declarations.',
  standard: SOURCE,
  selectContext: (context) => context.routes,
  items: [ROUTE_1]
}
