import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { type CodexBindingContext, createCodexBindingSession } from '../contexts/codex.ts'
import { CODEXBIND } from './codexbind.ts'
export default {
  contract: 1,
  name: 'ki-binding-codex',
  concern: 'Knowledge Islands Codex MCP binding',
  createSession: createCodexBindingSession,
  families: [CODEXBIND]
} satisfies SkillRubricDefinition<CodexBindingContext>
