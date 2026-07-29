import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import { outcomesFor, type RoadmapAuditContext, type RoadmapRubricContext } from '../contexts/roadmap.ts'

const SOURCE = 'standards-repository-roadmaps.md'
const FORMAT = 'standards-work-item-format.md'

const ITEM_1: RubricItem<RoadmapAuditContext> = {
  code: 'ITEM-1',
  title: 'flat work-item identity',
  description: 'Each canonical item lives directly under docs/roadmap with a unique stable identifier and matching filename.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: {
      phase: 'INSPECT',
      run: (context) => outcomesFor(context, 'ITEM-1', 'Every work item has a canonical identity and frontmatter.')
    }
  }
}

export const ITEM: RubricFamily<RoadmapRubricContext, RoadmapAuditContext> = {
  code: 'ITEM',
  title: 'items',
  description: 'Flat work-item identity, grouping, lifecycle, and dependencies.',
  standard: SOURCE,
  selectContext: (context) => context.items,
  items: [
    ITEM_1,
    {
      code: 'ITEM-2',
      title: 'item state and theme grouping',
      description: 'Each item has valid theme, horizon, candidate, status, baseline, and dependency fields.',
      sources: [SOURCE],
      mechanical: {
        level: 'FAIL',
        audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ITEM-2', 'Every item has valid state fields.') }
      }
    },
    {
      code: 'ITEM-3',
      title: 'item body shape',
      description: 'Every item ends with Discussion and carries the deterministic sections required by its horizon and lifecycle state.',
      sources: [FORMAT],
      mechanical: {
        level: 'FAIL',
        audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ITEM-3', 'Every item body matches its lifecycle state.') }
      }
    },
    {
      code: 'ITEM-4',
      title: 'item dependencies',
      description: 'Dependencies name existing work items, are reverse-consistent and acyclic, and do not permit active blocked work.',
      sources: [SOURCE],
      mechanical: {
        level: 'FAIL',
        audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ITEM-4', 'Every item dependency is valid and reciprocal.') }
      }
    }
  ]
}
