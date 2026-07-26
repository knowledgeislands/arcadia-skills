import { existsSync, lstatSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createHousekeepingContext, type HousekeepingRubricContext, INDEX_FILE } from '../contexts/housekeeping.ts'
import { KI_HOUSEKEEPING_RUBRIC } from './catalogue.ts'

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<HousekeepingRubricContext>[]
}

type ProjectMemory = {
  readonly slug: string
  readonly evidence: HousekeepingRubricContext
}

type NativeHousekeepingContext = {
  readonly userHome: string
  readonly projects: readonly ProjectMemory[]
}

type NativeOutcome = {
  readonly status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE' | 'INFO'
  readonly message: string
  readonly subject?: string
}

const catalogueDefinition = KI_HOUSEKEEPING_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]
const projectRoot = (userHome: string): string => join(userHome, '.claude', 'projects')
const memoryRoot = (slug: string): string => join('.claude', 'projects', slug, 'memory')
const physicalDirectory = (path: string): boolean => {
  if (!existsSync(path)) return false
  const state = lstatSync(path)
  return state.isDirectory() && !state.isSymbolicLink()
}

const discoverProjects = (userHome: string): readonly ProjectMemory[] => {
  const root = projectRoot(userHome)
  if (!physicalDirectory(root)) return []
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink())
    .map((entry) => {
      const memoryDir = join(root, entry.name, 'memory')
      return physicalDirectory(memoryDir)
        ? { slug: entry.name, evidence: createHousekeepingContext({ repoRoot: userHome, memoryDir, dryRun: true }) }
        : undefined
    })
    .filter((project): project is ProjectMemory => project !== undefined)
    .sort((left, right) => left.slug.localeCompare(right.slug))
}

const noMemory = (): readonly NativeOutcome[] => [
  { status: 'NOT_APPLICABLE', message: 'No physical Claude project memory directories under ~/.claude/projects.' }
]

const scopedSubject = (project: ProjectMemory, subject?: string): string | undefined => {
  if (!subject) return undefined
  const local = subject.startsWith(project.evidence.memoryDir) ? relative(project.evidence.memoryDir, subject) : subject
  return local ? join(memoryRoot(project.slug), local) : memoryRoot(project.slug)
}

const outcomes = (
  project: ProjectMemory,
  values: readonly { readonly status: string; readonly message: string; readonly subject?: string }[]
) =>
  values.map((value) => ({
    status: value.status as NativeOutcome['status'],
    message: value.message,
    ...(scopedSubject(project, value.subject) ? { subject: scopedSubject(project, value.subject) } : {})
  }))

const unavailableRepositoryEvidence = (code: string): readonly NativeOutcome[] => [
  {
    status: 'NOT_APPLICABLE',
    message:
      code === 'IDX-6'
        ? 'The user-memory scope cannot prove the repository that produced a project slug; cross-repository learned-entry checks require repository evidence.'
        : 'Repository-local ki-self payloads require repository scope; ki user audits only bounded user-home state.'
  }
]

const mechanical = (item: RubricItem<HousekeepingRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeHousekeepingContext): readonly NativeOutcome[] => {
      if (item.code.startsWith('SELF-') || item.code === 'IDX-6') return unavailableRepositoryEvidence(item.code)
      if (!context.projects.length) return noMemory()
      return context.projects.flatMap((project) => outcomes(project, definition.audit.run(project.evidence) as readonly NativeOutcome[]))
    }
  }
}

const judgment = (item: RubricItem<HousekeepingRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const alignedNameWrites = (context: NativeHousekeepingContext) =>
  context.projects.flatMap((project) =>
    project.evidence.memoryFiles.flatMap((memory) => {
      if (!memory.frontmatter) return []
      const expected = memory.file.replace(/\.md$/, '')
      if (memory.frontmatter.name === expected) return []
      const block = memory.content.match(/^---\n([\s\S]*?)\n---/)
      if (!block) return []
      const replacement =
        typeof memory.frontmatter.name === 'string'
          ? block[1].replace(/^name:\s*.*$/m, `name: ${expected}`)
          : `name: ${expected}\n${block[1]}`
      return [{ path: join(memoryRoot(project.slug), memory.file), content: memory.content.replace(block[0], `---\n${replacement}\n---`) }]
    })
  )

const indexEntries = (index: string): ReadonlySet<string> =>
  new Set([...index.matchAll(/^-\s*\[.+\]\(([^)]+\.md)\)/gm)].map((match) => match[1] as string))

const appendUnindexedWrites = (context: NativeHousekeepingContext) =>
  context.projects.flatMap((project) => {
    const index = project.evidence.index
    if (index === null) return []
    const indexed = indexEntries(index)
    const entries = project.evidence.memoryFiles.flatMap((memory) => {
      if (indexed.has(memory.file)) return []
      const title =
        typeof memory.frontmatter?.name === 'string' && memory.frontmatter.name ? memory.frontmatter.name : memory.file.replace(/\.md$/, '')
      const description =
        typeof memory.frontmatter?.description === 'string' && memory.frontmatter.description.trim()
          ? memory.frontmatter.description.trim()
          : '(no description — see file)'
      return [`- [${title}](${memory.file}) — ${description}`]
    })
    return entries.length
      ? [{ path: join(memoryRoot(project.slug), INDEX_FILE), content: `${index.replace(/\n*$/, '\n')}${entries.join('\n')}\n` }]
      : []
  })

const nativeItem = (item: RubricItem<HousekeepingRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'FM-2') return { ...native, repair: (context: NativeHousekeepingContext) => ({ writes: alignedNameWrites(context) }) }
  if (item.code === 'IDX-3')
    return { ...native, repair: (context: NativeHousekeepingContext) => ({ writes: appendUnindexedWrites(context) }) }
  return native
}

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly repair?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { repair: legacyRepair, ...mechanical } = item.mechanical
  void legacyRepair
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.repair ? { repair: { phase: 'NORMALISE', run: runtime.repair } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-housekeeping',
  concern: catalogueDefinition.concern,
  scope: { kind: 'user-home', paths: ['.claude/projects'] },
  createContext: ({ userHome }: { readonly userHome: string }): NativeHousekeepingContext => ({
    userHome,
    projects: discoverProjects(userHome)
  }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
