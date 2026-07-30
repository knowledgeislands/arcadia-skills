import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { ChezmoiRubricContext, ReviewContext } from '../contexts/chezmoi.ts'

const SHELL_J1: RubricItem<ReviewContext> = {
  code: 'SHELL-J1',
  title: 'Shell paths and completions',
  description: 'Shell paths are intentional, idempotent, and optional-tool-safe; tracked completions are regenerated from their owning CLIs.',
  sources: ['standards-chezmoi-dotfiles.md'],
  judgment: {
    prompt:
      'Are PATH, MANPATH, and completion search-path entries idempotent and ordered as documented; are optional integrations guarded; and do tracked completions come from repeatable upstream CLI generators?'
  }
}

export const SHELL: RubricFamily<ChezmoiRubricContext, ReviewContext> = {
  code: 'SHELL',
  title: 'Shell paths and completions',
  description: 'Judgment criteria for executable, manual, and completion-path handling.',
  standard: 'standards-chezmoi-dotfiles.md',
  selectContext: (context) => context.review,
  items: [SHELL_J1]
}
