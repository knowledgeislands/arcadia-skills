import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const ROUTE_1: RubricItem<OutcomeContext> = {
  code: 'ROUTE-1',
  title: 'trade routes are typed, reciprocal, and registered',
  description:
    'A route for a kind is active only when exactly one locally registered repository declares the canonical GitHub home, the sender exports that kind to it, and the receiver imports that same kind from the sender.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const ROUTE: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'ROUTE',
  title: 'Typed reciprocal routes',
  description: 'Registered repository visibility becomes an active route only through matching declarations for the same trade kind.',
  standard: SOURCE,
  selectContext: (context) => context.routes,
  items: [ROUTE_1]
}
