import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { GitRubricContext } from '../contexts/git.ts'

const HYGIENE_1: RubricItem<GitRubricContext> = {
  code: 'HYGIENE-1',
  title: 'Git working hygiene preserves unrelated state',
  description: 'Git work inspects shared state, stages intended paths only, and serialises write-mode operations safely.',
  sources: ['standards-git.md'],
  judgment: {
    prompt:
      'Assess whether the working tree was inspected, staging is limited to intended paths, unrelated changes remain untouched, and write-mode Git activity is safely serialised.'
  }
}

export const HYGIENE: RubricFamily<GitRubricContext, GitRubricContext> = {
  code: 'HYGIENE',
  title: 'Git working hygiene',
  description: 'Git operations preserve shared worktree state and recoverability.',
  standard: 'standards-git.md',
  selectContext: (context) => context,
  items: [HYGIENE_1]
}
