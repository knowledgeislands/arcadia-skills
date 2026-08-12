import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import {
  physicalFile,
  readSource,
  resolveSource,
  type ServerEntry,
  type SourceState,
  targeted
} from '../../shared/binding.ts'
import type { RubricContextOptions, RubricPublicationContext, RubricSession } from '../../shared/rubric.ts'

type CodexTarget =
  | { kind: 'unavailable'; path: string }
  | { kind: 'invalid'; path: string }
  | { kind: 'valid'; path: string; servers: Readonly<Record<string, Record<string, unknown>>> }
export type CodexBindingContext = {
  rubric: RubricPublicationContext
  source: string
  sourceState: SourceState
  target: CodexTarget
}
declare const Bun: { TOML: { parse(input: string): unknown } }
const inspect = (path: string): CodexTarget => {
  if (!physicalFile(path)) return { kind: 'unavailable', path }
  try {
    const config = Bun.TOML.parse(readFileSync(path, 'utf8')) as { mcp_servers?: unknown }
    if (!config.mcp_servers || typeof config.mcp_servers !== 'object' || Array.isArray(config.mcp_servers))
      return { kind: 'invalid', path }
    const servers: Record<string, Record<string, unknown>> = {}
    for (const [name, value] of Object.entries(config.mcp_servers as Record<string, unknown>)) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return { kind: 'invalid', path }
      servers[name] = value as Record<string, unknown>
    }
    return { kind: 'valid', path, servers }
  } catch {
    return { kind: 'invalid', path }
  }
}
const same = (entry: ServerEntry, actual: Record<string, unknown> | undefined): boolean =>
  'url' in entry
    ? actual?.url === entry.url
    : actual?.command === entry.command &&
      JSON.stringify(actual?.args ?? []) === JSON.stringify(entry.args) &&
      JSON.stringify(actual?.env ?? {}) === JSON.stringify(entry.env)
export const mismatches = (sourceState: SourceState, target: CodexTarget): readonly ServerEntry[] | null =>
  sourceState.kind === 'valid' && target.kind === 'valid'
    ? targeted(sourceState.entries, 'chatgpt-codex').filter((entry) => !same(entry, target.servers[entry.name]))
    : null
export const createCodexBindingSession = ({
  repository,
  userHome,
  publication
}: RubricContextOptions): RubricSession<CodexBindingContext> => {
  const home = resolve(userHome),
    source = resolveSource({ home }),
    context: CodexBindingContext = {
      rubric: { publication },
      source,
      sourceState: readSource(source),
      target: inspect(join(home, '.codex', 'config.toml'))
    }
  return {
    subjects: [
      { families: ['CODEXBIND'], context: () => context, subject: resolve(repository) },
      { families: ['RUBRIC'], context: () => context, subject: resolve(repository) }
    ],
    proposal: () => ({ writes: [] })
  }
}
