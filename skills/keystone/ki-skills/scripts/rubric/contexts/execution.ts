import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { AuditOutcome, RubricDefinition, RubricItem } from '../../shared/rubric.ts'
import type { KiShapeRubricContext, KiSkillsRubricContext, LayoutRubricContext, NameRubricContext } from './contexts.ts'
import { frontmatterLine, parseFrontmatter, replaceFrontmatterScalar } from './frontmatter.ts'
import { discoverSkillDirs } from './skill-files.ts'
import { createKiSkillsSubjects, KI_SKILLS_SUBJECT_FAMILIES, type KiSkillsSubject } from './subjects.ts'

type RuleOutcome = {
  readonly status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE' | 'INFO'
  readonly message: string
  readonly subject?: string
}

type MechanicalRule = {
  readonly code: string
  readonly title: string
  readonly mechanical: {
    readonly level: 'FAIL' | 'WARN'
    readonly audit: {
      readonly phase: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
      readonly run: (context: unknown) => readonly RuleOutcome[]
    }
  }
}

type JudgmentRule = {
  readonly code: string
  readonly title: string
  readonly judgment: { readonly prompt: string }
}

type CanonicalFamily = {
  readonly code: string
  readonly title: string
  readonly selectContext: (context: KiSkillsRubricContext) => unknown
  readonly items: readonly (MechanicalRule | JudgmentRule)[]
}

type SkillSubject = KiSkillsSubject & { readonly directory?: string }

type ExecutionContext = {
  readonly repository: string
  readonly subjects: readonly SkillSubject[]
}

const universalVerbs = ['AUDIT', 'CONFORM', 'HELP', 'EDUCATE', 'REFRESH'] as const

const isMechanical = (item: MechanicalRule | JudgmentRule): item is MechanicalRule => 'mechanical' in item

const subjectDirectory = (subject: KiSkillsSubject, directories: readonly string[], index: number) =>
  subject.scope === 'skill' || subject.scope === 'invalidSkill' ? directories[index] : undefined

const subjectsFor = (repository: string): readonly SkillSubject[] => {
  const subjects = createKiSkillsSubjects({ mode: 'audit', roots: [repository], reportTarget: repository }).subjects
  const directories = discoverSkillDirs(repository).sort()
  let directoryIndex = 0

  return subjects.map((subject) => {
    const directory = subjectDirectory(subject, directories, directoryIndex)
    if (directory) directoryIndex++
    return { ...subject, ...(directory ? { directory } : {}) }
  })
}

const subjectPath = (context: ExecutionContext, subject: SkillSubject): string | undefined =>
  subject.subject ??
  ((subject.scope === 'skill' || subject.scope === 'invalidSkill') && subject.directory
    ? relative(context.repository, subject.directory)
    : undefined)

const outcomesFor = (context: ExecutionContext, family: CanonicalFamily, item: MechanicalRule): readonly AuditOutcome[] =>
  context.subjects.flatMap((subject) => {
    if (!KI_SKILLS_SUBJECT_FAMILIES[subject.scope].some((code) => code === family.code)) return []
    const fallback = subjectPath(context, subject)
    return item.mechanical.audit.run(family.selectContext(subject.context())).map((outcome) => ({
      ...outcome,
      ...(outcome.subject || !fallback ? {} : { subject: fallback })
    }))
  })

const layoutContext = (family: CanonicalFamily, subject: SkillSubject): LayoutRubricContext =>
  family.selectContext(subject.context()) as LayoutRubricContext

const skillContext = <Context>(family: CanonicalFamily, subject: SkillSubject): Context =>
  family.selectContext(subject.context()) as Context

const skillMarkdown = (context: ExecutionContext, subject: SkillSubject): { path: string; content: string } | undefined => {
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

const coalescedWrites = (context: ExecutionContext, catalogue: readonly CanonicalFamily[]) => {
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

const repairFor = (context: ExecutionContext, item: MechanicalRule, catalogue: readonly CanonicalFamily[]) => {
  if (['LAY-4', 'NAME-5', 'KI-SHAPE-11', 'KI-SHAPE-12'].includes(item.code)) return coalescedWrites(context, catalogue)
  return { writes: [] }
}

const executionFor = (family: CanonicalFamily, item: MechanicalRule | JudgmentRule, catalogue: readonly CanonicalFamily[]) => {
  if (!isMechanical(item)) return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: item.judgment.prompt }
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: item.mechanical.level,
    phase: item.mechanical.audit.phase,
    audit: (context: ExecutionContext) => outcomesFor(context, family, item),
    repair: (context: ExecutionContext) => repairFor(context, item, catalogue)
  }
}

type ItemExecution = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly repair?: (...arguments_: never[]) => unknown
}

const withExecution = <Context>(item: RubricItem<Context>, runtime: ItemExecution) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no direct mechanical execution`)
  const { repair: conform, ...mechanical } = item.mechanical
  void conform
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.repair ? { repair: { phase: 'NORMALISE', run: runtime.repair } } : {})
    }
  }
}

/** Turn the canonical per-subject catalogue into KI's direct multi-skill operation. */
export const createKiSkillsExecutionDefinition = (definition: RubricDefinition<KiSkillsRubricContext>) => {
  const catalogue = definition.families as unknown as readonly CanonicalFamily[]
  return {
    contract: 1,
    name: definition.name,
    concern: definition.concern,
    createContext: ({ repository }: { readonly repository: string }): ExecutionContext => ({
      repository,
      subjects: subjectsFor(repository)
    }),
    families: definition.families.map((family) => {
      const runtimeFamily = catalogue.find((candidate) => candidate.code === family.code)
      if (!runtimeFamily) throw new Error(`${family.code} has no family execution`)
      return {
        ...family,
        selectContext: (context: ExecutionContext) => context,
        items: family.items.map((item) => {
          const runtimeItem = runtimeFamily.items.find((candidate) => candidate.code === item.code)
          if (!runtimeItem) throw new Error(`${item.code} has no item execution`)
          return withExecution(item, executionFor(runtimeFamily, runtimeItem, catalogue))
        })
      }
    })
  } as const
}
