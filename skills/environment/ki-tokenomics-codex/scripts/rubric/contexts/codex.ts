import { existsSync, lstatSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { AuditOutcome, RubricContextOptions, RubricPublicationContext, RubricSession } from '../../shared/rubric.ts'

const physical = (path: string) => existsSync(path) && !lstatSync(path).isSymbolicLink()
const directoryEntries = (path: string) =>
  physical(path) && lstatSync(path).isDirectory()
    ? readdirSync(path, { withFileTypes: true })
        .filter((entry) => !entry.isSymbolicLink())
        .map((entry) => entry.name)
    : []
const result = (status: AuditOutcome['status'], message: string): AuditOutcome => ({ status, message })
const presence = (label: string, path: string) =>
  physical(path)
    ? result('PASS', `${label} is present at ${path}; values are not read or reported.`)
    : result('NOT_APPLICABLE', `${label} is absent at ${path}.`)

export type CodexEvidenceContext = { readonly surfaces: readonly AuditOutcome[]; readonly unavailableMetrics: readonly AuditOutcome[] }
export type CodexRubricContext = { readonly rubric: RubricPublicationContext; readonly codex: CodexEvidenceContext }

export const createCodexSession = ({ repository, userHome, publication }: RubricContextOptions): RubricSession<CodexRubricContext> => {
  const repo = resolve(repository)
  const home = resolve(userHome)
  const codex = join(home, '.codex')
  const repoSkills = directoryEntries(join(repo, '.agents', 'skills'))
  const codexSkills = directoryEntries(join(codex, 'skills'))
  const sharedUserSkills = directoryEntries(join(home, '.agents', 'skills'))
  const context: CodexRubricContext = {
    rubric: { publication },
    codex: {
      surfaces: [
        presence('Bounded Codex configuration and MCP declaration surface', join(codex, 'config.toml')),
        presence('Selected repository AGENTS.md', join(repo, 'AGENTS.md')),
        result('INFO', `Selected repository agent skills: ${repoSkills.length ? repoSkills.join(', ') : 'none'}.`),
        result('INFO', `Bounded user Codex skills: ${codexSkills.length ? codexSkills.join(', ') : 'none'}.`),
        result('INFO', `Shared user agent skills: ${sharedUserSkills.length ? sharedUserSkills.join(', ') : 'none'}.`),
        result('NOT_APPLICABLE', 'No documented selected-repository Codex persistent-memory directory is asserted by this contract.'),
        presence('Selected repository subagent surface', join(repo, '.agents', 'agents'))
      ],
      unavailableMetrics: ['Actual billing metrics', 'Tool-schema token weights', 'Compaction metrics', 'Transcript metrics'].map((metric) =>
        result('NOT_APPLICABLE', `${metric} are not available from documented safe Codex filesystem evidence.`)
      )
    }
  }
  return {
    subjects: [
      { families: ['SURF', 'NA'], subject: repo, context: () => context },
      { families: ['RUBRIC'], subject: repo, context: () => context }
    ],
    proposal: () => ({ writes: [] })
  }
}
