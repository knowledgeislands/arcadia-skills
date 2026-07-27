import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { type CodexRubricContext, createCodexSession } from '../contexts/codex.ts'
import { NA } from './not-applicable.ts'
import { SURF } from './surface.ts'
export default {
  contract: 1,
  name: 'ki-tokenomics-codex',
  concern: 'Bounded Codex tokenomics evidence',
  createSession: createCodexSession,
  families: [SURF, NA]
} satisfies SkillRubricDefinition<CodexRubricContext>
