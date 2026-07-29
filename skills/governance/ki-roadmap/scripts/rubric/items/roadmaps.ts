import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import { outcomesFor, type RoadmapAuditContext, type RoadmapRubricContext } from '../contexts/roadmap.ts'

const SOURCE = 'standards-repository-roadmaps.md'

const ROAD_1: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-1',
  title: 'root orientation',
  description: 'Root ROADMAP.md is a concise orientation that points to canonical work items rather than duplicating their queue.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ROAD-1', 'Every authored roadmap has canonical structure.') }
  }
}

const ROAD_2: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-2',
  title: 'honest horizon placement',
  description:
    'Items sit in honest horizons; Waiting-for items name their external condition; speculative Future work carries `candidate: true`.',
  sources: [SOURCE],
  judgment: { prompt: 'Review horizon placement, waiting conditions, and Future candidate marking.' }
}

const ROAD_3: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-3',
  title: 'open finite work',
  description: 'Work-item indexes are open-only and contain finite work rather than continuous practice.',
  sources: [SOURCE],
  judgment: { prompt: 'Review that roadmap items are finite open work, not completed work or ongoing practice.' }
}

const ROAD_4: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-4',
  title: 'horizon vocabulary',
  description: 'Every work item uses the canonical horizon vocabulary; the root orientation carries no parallel horizon list.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ROAD-4', 'Every horizon has its canonical blurb.') }
  }
}

const ROAD_5: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-5',
  title: 'horizon transitions and readiness',
  description:
    'Horizon promotion and deferral meet the readiness contract; execution state remains honest and CONFORM never chooses a move.',
  sources: [SOURCE],
  judgment: { prompt: 'Review each promotion or deferral against its readiness contract and plan state.' }
}

const ROAD_6: RubricItem<RoadmapAuditContext> = {
  code: 'ROAD-6',
  title: 'repository work-item code',
  description: 'The ki-roadmap table declares a valid stable repository code.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: (context) => outcomesFor(context, 'ROAD-6', 'The repository work-item code is valid.') }
  }
}

export const ROAD: RubricFamily<RoadmapRubricContext, RoadmapAuditContext> = {
  code: 'ROAD',
  title: 'roadmaps',
  description: 'Canonical generated-index structure, placement, and readiness.',
  standard: SOURCE,
  selectContext: (context) => context.roadmaps,
  items: [ROAD_1, ROAD_2, ROAD_3, ROAD_4, ROAD_5, ROAD_6]
}
