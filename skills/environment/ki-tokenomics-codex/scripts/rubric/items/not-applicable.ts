import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { CodexEvidenceContext, CodexRubricContext } from '../contexts/codex.ts'

const SOURCE = 'standards-codex-tokenomics.md'
const NA_1: RubricItem<CodexEvidenceContext> = {
  code: 'CODEX-NA-1',
  title: 'Unavailable token metrics are explicit',
  description:
    'Actual billing, tool-schema weights, compaction totals, and transcript metrics are explicitly not applicable until Codex documents a safe evidence contract.',
  sources: [SOURCE],
  mechanical: {
    level: 'WARN',
    remediation: { class: 'diagnostic', guidance: 'Supply the selected Codex configuration evidence or record the unavailable metric; hosted conform does not infer runtime state.' },
    audit: { phase: 'INSPECT', run: (context) => context.unavailableMetrics }
  }
}
export const NA: RubricFamily<CodexRubricContext, CodexEvidenceContext> = {
  code: 'NA',
  title: 'Unavailable metrics',
  description: 'Metrics not inferred from local state.',
  standard: SOURCE,
  selectContext: (context) => context.codex,
  items: [NA_1]
}
