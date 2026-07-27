import type { SkillRubricDefinition } from '../../shared/rubric.ts'
import { createGitSession, type GitRubricContext } from '../contexts/git.ts'
import { BRANCH } from './branch.ts'
import { COMMIT } from './commit.ts'
import { HYGIENE } from './hygiene.ts'
import { LOCK } from './lock.ts'

export default {
  contract: 1,
  name: 'ki-git',
  concern: 'Knowledge Islands Git conventions',
  createSession: createGitSession,
  families: [COMMIT, BRANCH, HYGIENE, LOCK]
} satisfies SkillRubricDefinition<GitRubricContext>
