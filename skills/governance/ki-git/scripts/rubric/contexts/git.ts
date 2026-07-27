import { resolve } from 'node:path'
import type { RubricContextOptions, RubricMode, RubricSession } from '../../shared/rubric.ts'

export type GitRubricContext = {
  repository: string
  mode: RubricMode
}

export const createGitSession = ({ mode, repository }: RubricContextOptions): RubricSession<GitRubricContext> => {
  const context: GitRubricContext = { repository: resolve(repository), mode }
  return {
    subjects: [
      {
        families: ['COMMIT', 'BRANCH', 'HYGIENE', 'LOCK'],
        subject: context.repository,
        context: () => context
      }
    ],
    proposal: () => ({ writes: [] })
  }
}
