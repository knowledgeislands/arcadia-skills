import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
import type { AuditOutcome } from '../../shared/rubric.ts'

type BudgetKey = 'claude_md' | 'skills_surface' | 'mcp_servers' | 'total'

const BUDGETS: Record<BudgetKey, number> = {
  claude_md: 2500,
  skills_surface: 4000,
  mcp_servers: 5,
  total: 30000
}

const outcome = (status: AuditOutcome['status'], message: string, subject?: string): AuditOutcome => ({
  status,
  message,
  ...(subject ? { subject } : {})
})

const readText = (path: string): string | undefined => {
  try {
    return statSync(path).isFile() ? readFileSync(path, 'utf8') : undefined
  } catch {
    return undefined
  }
}

const readJson = (path: string): Record<string, unknown> | undefined => {
  const source = readText(path)
  if (source === undefined) return undefined
  try {
    const value: unknown = JSON.parse(source)
    return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined
  } catch {
    return undefined
  }
}

const approxTokens = (source: string): number => Math.ceil(source.length / 4)
const tokens = (value: number): string => `~${value.toLocaleString('en-US')} tok`
const isContained = (root: string, candidate: string): boolean => {
  const remainder = relative(root, candidate)
  return remainder === '' || (!remainder.startsWith('..') && remainder !== '..')
}
const IMPORT_RE = /(?:^|\s)@(~?[./][^\s)]*)/g
const stripCode = (markdown: string): string => markdown.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '')

const instructionTokens = (root: string, path: string, seen = new Set<string>()): { tokens: number; broken: string[] } => {
  const absolute = resolve(path)
  if (!isContained(root, absolute) || seen.has(absolute)) return { tokens: 0, broken: [] }
  seen.add(absolute)
  const source = readText(absolute)
  if (source === undefined) return { tokens: 0, broken: [] }
  let total = approxTokens(source)
  const broken: string[] = []
  for (const match of stripCode(source).matchAll(IMPORT_RE)) {
    const raw = match[1] as string
    const candidate = raw.startsWith('~/') ? join(root, raw.slice(2)) : isAbsolute(raw) ? raw : resolve(dirname(absolute), raw)
    if (!isContained(root, candidate) || !existsSync(candidate)) {
      broken.push(raw)
      continue
    }
    const nested = instructionTokens(root, candidate, seen)
    total += nested.tokens
    broken.push(...nested.broken)
  }
  return { tokens: total, broken }
}

const skillSurface = (skillsDirectory: string): { count: number; tokens: number } => {
  if (!existsSync(skillsDirectory)) return { count: 0, tokens: 0 }
  let count = 0
  let total = 0
  for (const entry of readdirSync(skillsDirectory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const source = readText(join(skillsDirectory, entry.name, 'SKILL.md'))
    if (source === undefined) continue
    count++
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    const block = frontmatter?.[1] ?? ''
    const name = block.match(/^name:(.*)$/m)?.[1]?.trim() ?? ''
    const description = block.match(/^description:\s*([\s\S]*?)(?:\n[A-Za-z0-9_-]+:|$)/m)?.[1] ?? block
    total += approxTokens(name) + approxTokens(description)
  }
  return { count, tokens: total }
}

type McpServer = { readonly name: string; readonly source: string; readonly command: string }
const collectMcp = (source: string, configuration: Record<string, unknown> | undefined): readonly McpServer[] => {
  const servers = configuration?.mcpServers
  if (!servers || typeof servers !== 'object' || Array.isArray(servers)) return []
  return Object.entries(servers as Record<string, unknown>).flatMap(([name, entry]) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return []
    const value = entry as Record<string, unknown>
    const command = [typeof value.command === 'string' ? value.command : '', Array.isArray(value.args) ? value.args.join(' ') : '']
      .join(' ')
      .trim()
    return [{ name, source, command }]
  })
}

const hasHeadroom = (servers: readonly McpServer[], configurations: readonly Record<string, unknown>[]): boolean =>
  servers.some((server) => server.name.toLowerCase() === 'headroom' || /(^|\W)headroom(\W|$)/i.test(server.command)) ||
  configurations.some((configuration) => {
    const env = configuration.env
    return Boolean(env && typeof env === 'object' && !Array.isArray(env) && Object.keys(env).some((key) => key.startsWith('HEADROOM_')))
  })

export type TokenomicsUserContext = {
  readonly userHome: string
  readonly outcomes: ReadonlyMap<string, readonly AuditOutcome[]>
}

/**
 * User maintenance has no repository target. It therefore measures only the
 * durable user-wide Claude surface and explicitly leaves project-attribution
 * and repository configuration criteria not applicable.
 */
export const createTokenomicsUserContext = ({ userHome }: { readonly userHome: string }): TokenomicsUserContext => {
  const claude = join(userHome, '.claude')
  const settings = readJson(join(claude, 'settings.json'))
  const desktop = readJson(join(userHome, '.claude.json'))
  const configurations = [settings, desktop].filter((value): value is Record<string, unknown> => value !== undefined)
  const servers = configurations.flatMap((configuration, index) =>
    collectMcp(index === 0 ? '.claude/settings.json' : '.claude.json', configuration)
  )
  const outcomes = new Map<string, readonly AuditOutcome[]>()
  const na = (code: string, message: string) => outcomes.set(code, [outcome('NOT_APPLICABLE', message)])

  outcomes.set('COMP-1', [outcome('PASS', `[user] ${claude}`)])
  outcomes.set('COMP-2', [outcome('PASS', 'All measured standing costs are attributed to the user-wide layer.')])

  let total = 0
  const instruction = join(claude, 'CLAUDE.md')
  if (!existsSync(instruction)) na('SURF-1', 'No user-wide CLAUDE.md is installed.')
  else {
    const measured = instructionTokens(claude, instruction)
    total += measured.tokens
    outcomes.set('SURF-1', [
      outcome(measured.broken.length ? 'VIOLATION' : 'PASS', `[user] CLAUDE.md ${tokens(measured.tokens)}`, '.claude/CLAUDE.md'),
      ...measured.broken.map((path) =>
        outcome('VIOLATION', `user CLAUDE.md has an unresolved or out-of-scope @import → "${path}"`, '.claude/CLAUDE.md')
      )
    ])
  }
  na('SURF-2', 'Memory is repository-selected; ki user has no repository target.')

  const skills = skillSurface(join(claude, 'skills'))
  total += skills.tokens
  outcomes.set(
    'SURF-3',
    skills.count
      ? [outcome('PASS', `[user] ${skills.count} skill description(s) ${tokens(skills.tokens)}`, '.claude/skills')]
      : [outcome('NOT_APPLICABLE', 'No user-wide Claude skills are installed.')]
  )

  const components: AuditOutcome[] = []
  const instructionTokensValue = existsSync(instruction) ? instructionTokens(claude, instruction).tokens : 0
  if (instructionTokensValue > BUDGETS.claude_md)
    components.push(
      outcome('VIOLATION', `user CLAUDE.md ${tokens(instructionTokensValue)} > budget ${tokens(BUDGETS.claude_md)}`, '.claude/CLAUDE.md')
    )
  if (skills.tokens > BUDGETS.skills_surface)
    components.push(
      outcome('VIOLATION', `user skill descriptions ${tokens(skills.tokens)} > budget ${tokens(BUDGETS.skills_surface)}`, '.claude/skills')
    )
  if (servers.length > BUDGETS.mcp_servers)
    components.push(outcome('VIOLATION', `${servers.length} user MCP servers > budget ${BUDGETS.mcp_servers}`))
  outcomes.set(
    'BUDG-1',
    components.length ? components : [outcome('PASS', 'Measured user-wide components are within their default budgets.')]
  )
  outcomes.set('BUDG-2', [
    outcome(total > BUDGETS.total ? 'VIOLATION' : 'PASS', `user-wide standing surface ${tokens(total)} (budget ${tokens(BUDGETS.total)})`)
  ])

  outcomes.set(
    'MCP-1',
    servers.length
      ? [outcome('PASS', `${servers.length} user MCP server(s): ${servers.map((server) => server.name).join(', ')}`)]
      : [outcome('PASS', 'No user MCP servers configured.')]
  )
  const pinned = configurations.map((configuration) => configuration.model).find((model): model is string => typeof model === 'string')
  outcomes.set('RUN-5', [outcome('INFO', pinned ? `default user model pinned: ${pinned}` : 'No default user model pinned in settings.')])

  const compression = hasHeadroom(servers, configurations)
  outcomes.set('TOOL-1', [
    outcome(
      compression ? 'PASS' : 'INFO',
      compression ? 'Headroom compression tooling detected in the user layer.' : 'No user-wide compression tooling detected.'
    )
  ])
  outcomes.set('TOOL-2', [
    outcome(
      compression ? 'PASS' : 'VIOLATION',
      compression
        ? 'User-wide compression tooling is present.'
        : 'No user-wide compression layer detected; Headroom is recommended for tool-heavy work.'
    )
  ])
  na('TOOL-4', 'Headroom learned captures are repository-local; ki user has no repository target.')
  na('TOOL-5', 'Headroom proxy attribution is repository-local; ki user has no repository target.')
  for (const code of ['CFG-1', 'CFG-2', 'CFG-4', 'CFG-5'])
    na(code, 'ki-tokenomics configuration is repository-local (.ki-config.toml); ki user has no repository target.')

  return { userHome, outcomes }
}
