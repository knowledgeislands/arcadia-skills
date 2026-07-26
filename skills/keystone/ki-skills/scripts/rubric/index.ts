import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { AuditOutcome as NativeAuditOutcome } from '../shared/rubric.ts'
import type { KiShapeRubricContext, KiSkillsRubricContext, LayoutRubricContext, NameRubricContext } from './contexts/contexts.ts'
import { frontmatterLine, parseFrontmatter, replaceFrontmatterScalar } from './contexts/frontmatter.ts'
import { discoverSkillDirs } from './contexts/skill-files.ts'
import { createKiSkillsSubjects, KI_SKILLS_SUBJECT_FAMILIES, type KiSkillsSubject } from './contexts/subjects.ts'
import { KI_SKILLS_RUBRIC } from './items/index.ts'

type LegacyAuditOutcome = {
  readonly status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE' | 'INFO'
  readonly message: string
  readonly subject?: string
}

type LegacyMechanicalItem = {
  readonly code: string
  readonly title: string
  readonly mechanical: {
    readonly level: 'FAIL' | 'WARN'
    readonly audit: {
      readonly phase: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
      readonly run: (context: unknown) => readonly LegacyAuditOutcome[]
    }
  }
}

type LegacyJudgmentItem = {
  readonly code: string
  readonly title: string
  readonly judgment: { readonly prompt: string }
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly selectContext: (context: KiSkillsRubricContext) => unknown
  readonly items: readonly (LegacyMechanicalItem | LegacyJudgmentItem)[]
}

type NativeSubject = KiSkillsSubject & { readonly directory?: string }

type NativeSkillsContext = {
  readonly repository: string
  readonly subjects: readonly NativeSubject[]
}

const catalogue = KI_SKILLS_RUBRIC.families as unknown as readonly LegacyFamily[]
const universalVerbs = ['AUDIT', 'CONFORM', 'HELP', 'EDUCATE', 'REFRESH'] as const

const isMechanical = (item: LegacyMechanicalItem | LegacyJudgmentItem): item is LegacyMechanicalItem => 'mechanical' in item

const subjectDirectory = (subject: KiSkillsSubject, directories: readonly string[], index: number) =>
  subject.scope === 'skill' || subject.scope === 'invalidSkill' ? directories[index] : undefined

const nativeSubjects = (repository: string): readonly NativeSubject[] => {
  const legacy = createKiSkillsSubjects({ mode: 'audit', roots: [repository], reportTarget: repository })
  const directories = discoverSkillDirs(repository).sort()
  let directoryIndex = 0

  return legacy.subjects.map((subject) => {
    const directory = subjectDirectory(subject, directories, directoryIndex)
    if (directory) directoryIndex++
    return { ...subject, ...(directory ? { directory } : {}) }
  })
}

const fallbackSubject = (context: NativeSkillsContext, subject: NativeSubject): string | undefined =>
  subject.subject ??
  ((subject.scope === 'skill' || subject.scope === 'invalidSkill') && subject.directory
    ? relative(context.repository, subject.directory)
    : undefined)

const outcomesFor = (context: NativeSkillsContext, family: LegacyFamily, item: LegacyMechanicalItem): readonly NativeAuditOutcome[] =>
  context.subjects.flatMap((subject) => {
    if (!KI_SKILLS_SUBJECT_FAMILIES[subject.scope].some((code) => code === family.code)) return []
    const fallback = fallbackSubject(context, subject)
    return item.mechanical.audit.run(family.selectContext(subject.context())).map((outcome) => ({
      ...outcome,
      ...(outcome.subject || !fallback ? {} : { subject: fallback })
    }))
  })

const layoutContext = (family: LegacyFamily, subject: NativeSubject): LayoutRubricContext =>
  family.selectContext(subject.context()) as LayoutRubricContext

const skillContext = <Context>(family: LegacyFamily, subject: NativeSubject): Context => family.selectContext(subject.context()) as Context

const skillMarkdown = (context: NativeSkillsContext, subject: NativeSubject): { path: string; content: string } | undefined => {
  if (!subject.directory) return undefined
  const path = relative(context.repository, join(subject.directory, 'SKILL.md'))
  return { path, content: readFileSync(join(subject.directory, 'SKILL.md'), 'utf8') }
}

const rewriteFrontmatter = (content: string, key: string, value: string): string | undefined => {
  const frontmatter = parseFrontmatter(content)
  if (frontmatter.raw === null) return undefined
  const rewritten = replaceFrontmatterScalar(frontmatter.raw, key, value)
  return rewritten === frontmatter.raw ? undefined : content.replace(frontmatter.raw, rewritten)
}

const missingVerbs = (shape: KiShapeRubricContext) =>
  shape.skill ? universalVerbs.filter((verb) => !shape.skill?.hintVerbs.includes(verb)) : []

/**
 * Legacy CONFORM callbacks mutate a shared in-memory document. Native repairs
 * propose complete immutable replacements, so compose every safe direct repair
 * into one final replacement per document before handing it to the host.
 */
const coalescedWrites = (context: NativeSkillsContext) => {
  const originals = new Map<string, string>()
  const drafts = new Map<string, string>()
  const draft = (path: string, source: string, transform: (content: string) => string): void => {
    originals.set(path, originals.get(path) ?? source)
    drafts.set(path, transform(drafts.get(path) ?? source))
  }

  const layoutFamily = catalogue.find((family) => family.code === 'LAY')
  if (layoutFamily) {
    for (const subject of context.subjects) {
      if (!KI_SKILLS_SUBJECT_FAMILIES[subject.scope].some((code) => code === 'LAY') || !subject.subject) continue
      const layout = layoutContext(layoutFamily, subject)
      if (layout.markdown === undefined || !/\[[^\]]*\]\([^)]*\\[^)]*\)/.test(layout.markdown)) continue
      draft(subject.subject, layout.markdown, (content) =>
        content.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (whole, text, target) =>
          (target as string).includes('\\') ? `[${text}](${(target as string).replace(/\\/g, '/')})` : whole
        )
      )
    }
  }

  const nameFamily = catalogue.find((family) => family.code === 'NAME')
  const shapeFamily = catalogue.find((family) => family.code === 'KI-SHAPE')
  for (const subject of context.subjects) {
    if (subject.scope !== 'skill') continue
    const document = skillMarkdown(context, subject)
    if (!document) continue
    if (nameFamily) {
      const name = skillContext<NameRubricContext>(nameFamily, subject)
      if (name.name && name.name !== name.directoryName) {
        draft(document.path, document.content, (content) => {
          const frontmatter = parseFrontmatter(content)
          const line = frontmatter.raw ? frontmatterLine(frontmatter.raw, 'name') : null
          return line ? content.replace(line, `name: ${name.directoryName}`) : content
        })
      }
    }
    if (shapeFamily) {
      const shape = skillContext<KiShapeRubricContext>(shapeFamily, subject)
      const missing = missingVerbs(shape)
      const argumentHint = shape.skill?.argumentHint
      if (shape.skill?.governanceSkill && argumentHint && missing.length > 0) {
        draft(
          document.path,
          document.content,
          (content) =>
            rewriteFrontmatter(content, 'argument-hint', `${argumentHint} | ${missing.map((verb) => verb.toLowerCase()).join(' | ')}`) ??
            content
        )
      }
    }
  }

  return {
    writes: [...drafts]
      .filter(([path, content]) => originals.get(path) !== content)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([path, content]) => ({ path, content }))
  }
}

const repairFor = (context: NativeSkillsContext, item: LegacyMechanicalItem) => {
  if (['LAY-4', 'NAME-5', 'KI-SHAPE-11', 'KI-SHAPE-12'].includes(item.code)) return coalescedWrites(context)
  return { writes: [] }
}

const nativeItem = (family: LegacyFamily, item: LegacyMechanicalItem | LegacyJudgmentItem) => {
  if (!isMechanical(item)) return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: item.judgment.prompt }
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: item.mechanical.level,
    phase: item.mechanical.audit.phase,
    audit: (context: NativeSkillsContext) => outcomesFor(context, family, item),
    repair: (context: NativeSkillsContext) => repairFor(context, item)
  }
}

export default {
  contract: 1,
  skill: 'ki-skills',
  createContext: ({ repository }: { readonly repository: string }): NativeSkillsContext => ({
    repository,
    subjects: nativeSubjects(repository)
  }),
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map((item) => nativeItem(family, item))
  }))
} as const
