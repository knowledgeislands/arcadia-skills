import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import { outcomesFor, type RoadmapIndexContext, type RoadmapRubricContext } from '../contexts/roadmap.ts'

const SOURCE = 'standards-repository-roadmaps.md'

const INDEX_1: RubricItem<RoadmapIndexContext> = {
  code: 'INDEX-1',
  title: 'generated root index',
  description: 'Root `ROADMAP.md` exactly matches the linked index generated from flat canonical work items.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'INDEX-1', 'The root work-item index is current.') },
    conform: { phase: 'DERIVED', run: (context) => context.rebuildIndex?.() }
  }
}

export const INDEX: RubricFamily<RoadmapRubricContext, RoadmapIndexContext> = {
  code: 'INDEX',
  title: 'generated index',
  description: 'The exact generated root index for flat work items.',
  standard: SOURCE,
  selectContext: (context) => context.index,
  items: [INDEX_1]
}
