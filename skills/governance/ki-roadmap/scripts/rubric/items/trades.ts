import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RoadmapAuditContext, RoadmapRubricContext } from '../contexts/roadmap.ts'

const SOURCE = 'standards-repository-roadmaps.md'

const TRADE_1: RubricItem<RoadmapAuditContext> = {
  code: 'TRADE-1',
  title: 'trade review',
  description:
    'Where declared ki-trades records exist, report structural guidance and proposed local roadmap action without setting disposition, inferring adoption, prioritizing work, pruning records, or changing remote state.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Inspect declared trade records read-only: identify submissions needing receiver review or a separately confirmed local roadmap proposal and outbound progress needing follow-up; report proposals only.'
  }
}

export const TRADE: RubricFamily<RoadmapRubricContext, RoadmapAuditContext> = {
  code: 'TRADE',
  title: 'trade review',
  description: 'Read-only judgment guidance for declared cross-repository trade submissions.',
  standard: SOURCE,
  selectContext: (context) => context.trades,
  items: [TRADE_1]
}
