import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { CodexEvidenceContext, CodexRubricContext } from '../contexts/codex.ts'

const SOURCE = 'standards-codex-tokenomics.md'
const SURF_1: RubricItem<CodexEvidenceContext> = {
  code: 'CODEX-SURF-1',
  title: 'Documented Codex surfaces are bounded',
  description:
    'Only documented selected-repository and bounded user Codex configuration, instructions, skills, memory, subagent, and MCP structural evidence is reported; values that may be secret are not emitted.',
  sources: [SOURCE],
  mechanical: { level: 'WARN', audit: { phase: 'INSPECT', run: (context) => context.surfaces } }
}
export const SURF: RubricFamily<CodexRubricContext, CodexEvidenceContext> = {
  code: 'SURF',
  title: 'Codex standing surfaces',
  description: 'Bounded documented Codex evidence.',
  standard: SOURCE,
  selectContext: (context) => context.codex,
  items: [SURF_1]
}
