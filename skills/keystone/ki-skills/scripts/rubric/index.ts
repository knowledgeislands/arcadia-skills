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

const repairLayout4 = (context: NativeSkillsContext, family: LegacyFamily) => ({
  writes: context.subjects.flatMap((subject) => {
    if (!KI_SKILLS_SUBJECT_FAMILIES[subject.scope].some((code) => code === family.code) || !subject.subject) return []
    const layout = layoutContext(family, subject)
    if (layout.markdown === undefined || !/\[[^\]]*\]\([^)]*\\[^)]*\)/.test(layout.markdown)) return []
    return [
      {
        path: subject.subject,
        content: layout.markdown.replace(/\[([^\]]*)\]\(([^)]+)\)/g, (whole, text, target) =>
          (target as string).includes('\\') ? `[${text}](${(target as string).replace(/\\/g, '/')})` : whole
        )
      }
    ]
  })
})

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

const repairName5 = (context: NativeSkillsContext, family: LegacyFamily) => ({
  writes: context.subjects.flatMap((subject) => {
    if (subject.scope !== 'skill') return []
    const name = skillContext<NameRubricContext>(family, subject)
    if (!name.name || name.name === name.directoryName) return []
    const document = skillMarkdown(context, subject)
    if (!document) return []
    const frontmatter = parseFrontmatter(document.content)
    if (frontmatter.raw === null) return []
    const line = frontmatterLine(frontmatter.raw, 'name')
    return line ? [{ path: document.path, content: document.content.replace(line, `name: ${name.directoryName}`) }] : []
  })
})

const missingVerbs = (shape: KiShapeRubricContext) =>
  shape.skill ? universalVerbs.filter((verb) => !shape.skill?.hintVerbs.includes(verb)) : []

const repairHint = (
  context: NativeSkillsContext,
  family: LegacyFamily,
  shouldRepair: (missing: readonly string[]) => boolean,
  values: (missing: readonly string[]) => readonly string[]
) => ({
  writes: context.subjects.flatMap((subject) => {
    if (subject.scope !== 'skill') return []
    const shape = skillContext<KiShapeRubricContext>(family, subject)
    if (!shape.skill?.governanceSkill || !shape.skill.argumentHint) return []
    const missing = missingVerbs(shape)
    if (!shouldRepair(missing)) return []
    const document = skillMarkdown(context, subject)
    if (!document) return []
    const content = rewriteFrontmatter(
      document.content,
      'argument-hint',
      `${shape.skill.argumentHint} | ${values(missing)
        .map((verb) => verb.toLowerCase())
        .join(' | ')}`
    )
    return content ? [{ path: document.path, content }] : []
  })
})

const repairFor = (context: NativeSkillsContext, family: LegacyFamily, item: LegacyMechanicalItem) => {
  if (item.code === 'LAY-4') return repairLayout4(context, family)
  if (item.code === 'NAME-5') return repairName5(context, family)
  if (item.code === 'KI-SHAPE-11')
    return repairHint(
      context,
      family,
      (missing) => missing.includes('HELP'),
      (missing) => missing
    )
  if (item.code === 'KI-SHAPE-12')
    return repairHint(
      context,
      family,
      (missing) => missing.length > 0 && !missing.includes('HELP'),
      (missing) => missing
    )
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
    repair: (context: NativeSkillsContext) => repairFor(context, family, item)
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
