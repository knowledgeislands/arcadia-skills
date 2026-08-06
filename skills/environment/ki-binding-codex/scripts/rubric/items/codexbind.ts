import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { CodexBindingContext } from '../contexts/codex.ts'

const CODEXBIND_1: RubricItem<CodexBindingContext> = {
  code: 'CODEXBIND-1',
  title: 'Codex TOML agrees with targeted source',
  description: 'The native Codex TOML MCP section contains canonical Codex-targeted servers without touching unrelated application entries.',
  sources: ['standards-codex-binding.md'],
  mechanical: {
    level: 'WARN',
    remediation: {
      class: 'diagnostic',
      guidance: 'Review the canonical source and run the native Codex renderer after confirming the intended client targets; do not overwrite unrelated application configuration.'
    },
    audit: {
      phase: 'INSPECT',
      run: ({ configPath, servers, expected }) =>
        servers === null
          ? [{ status: 'INFO', message: 'Codex configuration is absent, unsafe, or unreadable.', subject: configPath }]
          : [...expected].every((name) => servers.has(name))
            ? [{ status: 'PASS', message: `Codex TOML contains all ${expected.size} targeted server(s).`, subject: configPath }]
            : [
                {
                  status: 'VIOLATION',
                  message: 'Codex TOML is missing a canonical targeted server; use render-codex.',
                  subject: configPath
                }
              ]
    }
  }
}
const CODEXBIND_J1: RubricItem<CodexBindingContext> = {
  code: 'CODEXBIND-J1',
  title: 'Native merge remains appropriate',
  description: 'The Codex native writer remains the safe merge boundary for the live TOML file.',
  sources: ['standards-codex-binding.md'],
  judgment: {
    scope: 'The native Codex renderer, the live TOML configuration, and non-KI application entries it must preserve.',
    prompt: 'Does the native Codex writer still preserve non-KI application configuration better than whole-file ownership would?',
    outcomes: ['conforming', 'merge boundary revision required', 'ownership decision required'],
    guidance: 'Keep native merge ownership where it preserves unrelated configuration; otherwise record the owning runtime decision before changing the write boundary.'
  }
}
export const CODEXBIND: RubricFamily<CodexBindingContext, CodexBindingContext> = {
  code: 'CODEXBIND',
  title: 'Codex binding',
  description: 'Codex TOML comparison and merge-safe render boundary.',
  standard: 'standards-codex-binding.md',
  selectContext: (context) => context,
  items: [CODEXBIND_1, CODEXBIND_J1]
}
