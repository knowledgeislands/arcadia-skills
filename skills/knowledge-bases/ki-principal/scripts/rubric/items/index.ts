import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { createPrincipalSession, type PrincipalContext } from '../contexts/principal.ts'
import { PRINCIPAL } from './principal.ts'
import { RUBRIC } from './publication.ts'

export default {
  contract: 1,
  name: 'ki-principal',
  concern: 'principal Knowledge Base governance',
  createSession: createPrincipalSession,
  families: [RUBRIC, PRINCIPAL]
} satisfies SkillRubricDefinition<PrincipalContext>
