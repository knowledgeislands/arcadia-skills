import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RoadmapAuditContext, RoadmapRubricContext } from '../contexts/roadmap.ts'

const SOURCE = 'standards-repository-roadmaps.md'

const HANDOFF_1: RubricItem<RoadmapAuditContext> = {
  code: 'HANDOFF-1',
  title: 'handoff review',
  description:
    'Where declared ki-trades records exist, report structural guidance and proposed local roadmap action without setting disposition, inferring adoption, prioritizing work, pruning records, or changing remote state.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Inspect declared handoff records read-only: identify submissions needing receiver review or a separately confirmed local roadmap proposal and outbound progress needing follow-up; report proposals only.'
  }
}

export const HANDOFF: RubricFamily<RoadmapRubricContext, RoadmapAuditContext> = {
  code: 'HANDOFF',
  title: 'handoff review',
  description: 'Read-only judgment guidance for declared cross-repository handoff submissions.',
  standard: SOURCE,
  selectContext: (context) => context.handoffs,
  items: [HANDOFF_1]
}
