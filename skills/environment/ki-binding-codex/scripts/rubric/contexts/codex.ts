import { existsSync, lstatSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { RubricContextOptions, RubricPublicationContext, RubricSession } from '../../shared/rubric.ts'

declare const Bun: { TOML: { parse(input: string): unknown }; YAML: { parse(input: string): unknown } }
export type CodexBindingContext = {
  rubric: RubricPublicationContext
  configPath: string
  servers: ReadonlySet<string> | null
  expected: ReadonlySet<string>
}
const inspect = (path: string): ReadonlySet<string> | null => {
  if (!existsSync(path) || !lstatSync(path).isFile() || lstatSync(path).isSymbolicLink()) return null
  try {
    const config = Bun.TOML.parse(readFileSync(path, 'utf8')) as { mcp_servers?: unknown }
    return config.mcp_servers && typeof config.mcp_servers === 'object'
      ? new Set(Object.keys(config.mcp_servers as Record<string, unknown>))
      : new Set()
  } catch {
    return null
  }
}
const expected = (path: string): ReadonlySet<string> => {
  if (!existsSync(path)) return new Set()
  try {
    const source = Bun.YAML.parse(readFileSync(path, 'utf8')) as { mcpServers?: unknown }
    return new Set(
      Array.isArray(source?.mcpServers)
        ? source.mcpServers.flatMap((entry) => {
            const value = entry as { name?: unknown; clients?: unknown }
            return typeof value?.name === 'string' && Array.isArray(value.clients) && value.clients.includes('chatgpt-codex')
              ? [value.name]
              : []
          })
        : []
    )
  } catch {
    return new Set()
  }
}
export const createCodexBindingSession = ({
  repository,
  userHome,
  publication
}: RubricContextOptions): RubricSession<CodexBindingContext> => {
  const home = resolve(userHome),
    configPath = join(home, '.codex', 'config.toml'),
    source = process.env.KI_MCP_SOURCE ? resolve(process.env.KI_MCP_SOURCE) : join(home, '.config', 'ki', 'mcp-servers.yaml')
  const context = { rubric: { publication }, configPath, servers: inspect(configPath), expected: expected(source) }
  return {
    subjects: [
      { families: ['CODEXBIND'], context: () => context, subject: resolve(repository) },
      { families: ['RUBRIC'], context: () => context, subject: resolve(repository) }
    ],
    proposal: () => ({ writes: [] })
  }
}
