import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { GitRubricContext } from '../contexts/git.ts'

const COMMIT_1: RubricItem<GitRubricContext> = {
  code: 'COMMIT-1',
  title: 'commit shape expresses the completed unit',
  description: 'A commit uses the portable Conventional Commit shape and accurately represents one completed unit of work.',
  sources: ['standards-git.md'],
  judgment: {
    prompt:
      'Assess whether the commit type, optional scope, and imperative summary accurately describe one completed unit, using the established vocabulary without combining unrelated changes.'
  }
}

export const COMMIT: RubricFamily<GitRubricContext, GitRubricContext> = {
  code: 'COMMIT',
  title: 'commit shape',
  description: 'Commit messages express one completed unit through the portable convention.',
  standard: 'standards-git.md',
  selectContext: (context) => context,
  items: [COMMIT_1]
}
