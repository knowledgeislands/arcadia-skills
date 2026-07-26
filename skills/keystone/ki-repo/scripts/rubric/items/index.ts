import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createAuditContext, type RepoRubricContext } from '../contexts/contexts.ts'
import { KI_REPO_RUBRIC } from './catalogue.ts'

type NativeRepoContext = {
  readonly repository: string
  readonly evidence: RepoRubricContext
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<RepoRubricContext>[]
}

const catalogueDefinition = KI_REPO_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const kiRepoDefault = `[ki-repo]
visibility = "private"   # "public" | "private" — must match the repo's actual GitHub visibility
license = "MIT"          # SPDX id the LICENSE, package.json, and GitHub must match; default MIT. Use "UNLICENSED" for proprietary. Pick one at https://choosealicense.com/
supported_runtimes = ["claude-code", "codex"] # required agent-runtime support surface

# Per-repo check overrides — true = enforce, false = don't. Omit any check to take
# the org default; a repo that fully conforms needs nothing here.
# [ki-repo.checks]
# branch-protection = true   # default off — protect \`main\` on this repo
# wiki = false               # default on  — allow this repo's Wiki
`

const kiAuthoringDefault = `# The authoring standard (Markdown/TOML house style) is baseline — every KI repo is
# governed by it. Declared explicitly, not assumed; its presence is the compliance marker.
[ki-authoring]
`

const gitignoreDefault = 'node_modules/\n.DS_Store\n.ki/audits/\n.ki/conform/\n'

const mechanical = (item: RubricItem<RepoRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeRepoContext) => definition.audit.run(context.evidence)
  }
}

const judgment = (item: RubricItem<RepoRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

/** Return whether a TOML document declares the exact root table, ignoring comments and sub-tables. */
const declaresRootTable = (content: string, table: string): boolean => {
  for (const line of content.split(/\r?\n/)) {
    const source = line.replace(/\s+#.*$/, '').trim()
    const match = source.match(/^\[\s*(?:"([^"\\]+)"|'([^']+)'|([A-Za-z0-9_-]+))\s*\]$/)
    if ((match?.[1] ?? match?.[2] ?? match?.[3]) === table) return true
  }
  return false
}

const configurationConform = (repository: string) => {
  const path = '.ki-config.toml'
  const absolutePath = join(repository, path)
  const existing = existsSync(absolutePath) ? readFileSync(absolutePath, 'utf8') : ''
  const addRepo = !declaresRootTable(existing, 'ki-repo')
  const addAuthoring = !declaresRootTable(existing, 'ki-authoring')
  if (!addRepo && !addAuthoring) return { writes: [] }

  const blocks = [addRepo ? kiRepoDefault : '', addAuthoring ? kiAuthoringDefault : ''].filter(Boolean)
  const separator = existing.length === 0 ? '' : existing.endsWith('\n\n') ? '' : existing.endsWith('\n') ? '\n' : '\n\n'
  return {
    writes: [{ path, content: `${existing}${separator}${blocks.join('\n')}`, ...(existing.length === 0 ? { create: true } : {}) }]
  }
}

const filesOneConform = (context: NativeRepoContext) => {
  const config = configurationConform(context.repository)
  const gitignore = join(context.repository, '.gitignore')
  return {
    writes: [...config.writes, ...(existsSync(gitignore) ? [] : [{ path: '.gitignore', content: gitignoreDefault, create: true }])]
  }
}

const nativeItem = (item: RubricItem<RepoRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'FILES-1') return { ...native, conform: filesOneConform }
  if (item.code === 'FILES-3') return { ...native, conform: (context: NativeRepoContext) => configurationConform(context.repository) }
  return native
}

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly conform?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { conform: legacyConform, ...mechanical } = item.mechanical
  void legacyConform
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.conform ? { conform: { phase: 'NORMALISE', run: runtime.conform } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-repo',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeRepoContext => ({
    repository,
    evidence: createAuditContext([repository]).context
  }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
