import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { createHandoffsSession, type HandoffsRubricContext } from '../contexts/handoffs.ts'
import { ADOPTION } from './adoption.ts'
import { AUTH } from './authority.ts'
import { CONFIG } from './configuration.ts'
import { RUBRIC } from './publication.ts'
import { RECORD } from './records.ts'
import { RELEASE } from './release.ts'
import { ROUTE } from './routes.ts'
import { SCAFFOLD } from './scaffold.ts'
import { STATUS } from './status.ts'

export default {
  contract: 1,
  name: 'ki-handoffs',
  concern: 'Cross-repository handoff submissions',
  createSession: createHandoffsSession,
  families: [RUBRIC, CONFIG, ROUTE, SCAFFOLD, RECORD, AUTH, STATUS, RELEASE, ADOPTION]
} satisfies SkillRubricDefinition<HandoffsRubricContext>
