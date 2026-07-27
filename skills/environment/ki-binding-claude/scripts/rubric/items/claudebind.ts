import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { ClaudeBindingContext } from '../contexts/claude.ts'

const source = ['standards-claude-binding.md'] as const
const CLAUDEBIND_1: RubricItem<ClaudeBindingContext> = {
  code: 'CLAUDEBIND-1',
  title: 'Claude Code and Desktop surface agreement',
  description: 'Claude Code and Desktop JSON surfaces contain the canonical servers targeting each client.',
  sources: source,
  mechanical: {
    level: 'WARN',
    audit: {
      phase: 'INSPECT',
      run: ({ codePath, desktopPath, codeServers, desktopServers, expectedCode, expectedDesktop }) =>
        [
          [codePath, codeServers, expectedCode, 'Claude Code'],
          [desktopPath, desktopServers, expectedDesktop, 'Claude Desktop']
        ].map(([path, actual, wanted, label]) =>
          actual === null
            ? { status: 'INFO' as const, message: `${label} configuration is absent or unreadable.`, subject: path as string }
            : [...(wanted as ReadonlySet<string>)].every((name) => (actual as ReadonlySet<string>).has(name))
              ? {
                  status: 'PASS' as const,
                  message: `${label} contains all ${(wanted as ReadonlySet<string>).size} targeted server(s).`,
                  subject: path as string
                }
              : { status: 'VIOLATION' as const, message: `${label} is missing a canonical targeted server.`, subject: path as string }
        )
    }
  }
}
const CLAUDEBIND_2: RubricItem<ClaudeBindingContext> = {
  code: 'CLAUDEBIND-2',
  title: 'Cowork plugin integrity',
  description: 'Every safe Cowork workspace registers and enables the KI plugin.',
  sources: source,
  mechanical: {
    level: 'WARN',
    audit: {
      phase: 'INSPECT',
      run: ({ cowork, coworkBase }) =>
        !cowork.length
          ? [{ status: 'INFO', message: 'No Cowork workspace settings were found.', subject: coworkBase }]
          : cowork.map((file) =>
              file.status === 'already'
                ? { status: 'PASS' as const, message: 'The KI plugin is registered and enabled.', subject: file.subject }
                : {
                    status: 'VIOLATION' as const,
                    message:
                      file.status === 'pending'
                        ? 'The KI plugin is not registered and enabled.'
                        : 'Cowork settings are unsafe or unreadable.',
                    subject: file.subject
                  }
            )
    },
    conform: {
      phase: 'PRIMARY',
      run: ({ cowork }) =>
        cowork.forEach((file) => {
          file.enable?.()
        })
    }
  }
}
const CLAUDEBIND_J1: RubricItem<ClaudeBindingContext> = {
  code: 'CLAUDEBIND-J1',
  title: 'Web convention is intentional',
  description: 'claude.ai web use is documented as a convention rather than a local render target.',
  sources: source,
  judgment: { prompt: 'Is the web convention explicit without claiming a local file or renderer exists?' }
}
export const CLAUDEBIND: RubricFamily<ClaudeBindingContext, ClaudeBindingContext> = {
  code: 'CLAUDEBIND',
  title: 'Claude binding',
  description: 'Claude-native JSON and Cowork plugin evidence.',
  standard: 'standards-claude-binding.md',
  selectContext: (context) => context,
  items: [CLAUDEBIND_1, CLAUDEBIND_2, CLAUDEBIND_J1]
}
