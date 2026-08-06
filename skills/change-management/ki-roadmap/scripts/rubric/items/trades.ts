import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import { outcomesFor, type RoadmapAuditContext, type RoadmapRubricContext } from '../contexts/roadmap.ts'

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

const TRADE_2: RubricItem<RoadmapAuditContext> = {
  code: 'TRADE-2',
  title: 'trade-aware waiting and pruning',
  description:
    'Trade waits use one flat canonical identity array only at Waiting for, name the exact observed condition in prose, and retain done work referenced by unresolved completion observation.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: {
      phase: 'INSPECT',
      run: (context) => outcomesFor(context, 'TRADE-2', 'Every declared trade wait has valid flat identity and horizon fields.')
    }
  },
  judgment: {
    prompt:
      'Review each trade-aware wait and pruning candidate: confirm the trade exists and is relevant, the prose names receipt, terminal decision, or linked-work completion precisely, and no done work is pruned before completion-observation sender release is observable.'
  }
}

export const TRADE: RubricFamily<RoadmapRubricContext, RoadmapAuditContext> = {
  code: 'TRADE',
  title: 'trade review',
  description: 'Read-only judgment guidance for declared cross-repository trade submissions.',
  standard: SOURCE,
  selectContext: (context) => context.trades,
  items: [TRADE_1, TRADE_2]
}
