import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { createHousekeepingSession, type HousekeepingRubricContext } from '../contexts/housekeeping.ts'
import { RUBRIC } from './publication.ts'
import { STATE } from './safety.ts'

export default {
  contract: 1,
  name: 'ki-housekeeping-codex',
  concern: 'Safe repository-scoped Codex session housekeeping',
  createSession: createHousekeepingSession,
  families: [STATE, RUBRIC]
} satisfies SkillRubricDefinition<HousekeepingRubricContext>
