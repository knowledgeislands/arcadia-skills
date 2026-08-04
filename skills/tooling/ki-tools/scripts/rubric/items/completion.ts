import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { ToolRepositoryContext, ToolsRubricContext } from '../contexts/tools.ts'

const STANDARD = 'standards-tool-repositories.md'

const COMPLETION_SURFACE = {
  code: 'COMP-SURFACE',
  title: 'Completion command surface',
  description:
    'The CLI exposes exactly one documented completion <shell> action at a stable command path; it accepts bash and zsh, prints only the selected definition to standard output, and rejects unsupported shells as owned invalid syntax.',
  sources: [STANDARD],
  judgment: {
    prompt:
      'The CLI exposes exactly one documented completion <shell> action at a stable command path; it accepts bash and zsh, prints only the selected definition to standard output, and rejects unsupported shells as owned invalid syntax.'
  }
} satisfies RubricItem<ToolRepositoryContext>

const COMPLETION_INTEGRATION = {
  code: 'COMP-INTEGRATION',
  title: 'Completion integration',
  description:
    'The Bash definition registers the executable with complete; the Zsh definition is an autoloadable _<tool> artifact with #compdef and compdef registration that does not invoke itself while loading. Tests cover both emitted forms and Zsh registration under compinit.',
  sources: [STANDARD],
  judgment: {
    prompt:
      'The Bash definition registers the executable with complete; the Zsh definition is an autoloadable _<tool> artifact with #compdef and compdef registration that does not invoke itself while loading. Tests cover both emitted forms and Zsh registration under compinit.'
  }
} satisfies RubricItem<ToolRepositoryContext>

const COMPLETION_OWNERSHIP = {
  code: 'COMP-OWNERSHIP',
  title: 'Completion persistence ownership',
  description:
    'The tool does not edit shell startup files or personal completion directories. A shell configuration, package manager, or configuration manager persists the generated artifact and arranges fpath before compinit for Zsh.',
  sources: [STANDARD],
  judgment: {
    prompt:
      'The tool does not edit shell startup files or personal completion directories. A shell configuration, package manager, or configuration manager persists the generated artifact and arranges fpath before compinit for Zsh.'
  }
} satisfies RubricItem<ToolRepositoryContext>

export const COMPLETION: RubricFamily<ToolsRubricContext, ToolRepositoryContext> = {
  code: 'COMP',
  title: 'completion capabilities',
  description: 'Portable Bash and Zsh completion output, integration, and ownership.',
  standard: STANDARD,
  selectContext: (context) => context.tool,
  items: [COMPLETION_SURFACE, COMPLETION_INTEGRATION, COMPLETION_OWNERSHIP]
}
