import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { createHandoffsSession, type HandoffsRubricContext } from '../contexts/handoffs.ts'
import { HAND } from './hand.ts'

export default {
  contract: 1,
  name: 'ki-handoffs',
  concern: 'Knowledge Islands handoff readiness',
  createSession: createHandoffsSession,
  families: [HAND]
} satisfies SkillRubricDefinition<HandoffsRubricContext>
