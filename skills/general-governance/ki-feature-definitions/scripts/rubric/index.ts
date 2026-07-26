import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createFeatureDefinitionsContextFactory, type FeatureDefinitionsContext } from './contexts/feature-definitions.ts'
import {
  AREA_1,
  AREA_2,
  AREA_FIT_1,
  AS_BUILT_1,
  BEHAVIOUR_1,
  DR_LINK_1,
  ID_1,
  ID_2,
  ID_3,
  INDEX_1,
  INDEX_2,
  REQ_1,
  SPLIT_1,
  VERIFY_1,
  VERIFY_2
} from './items/feature-definitions.ts'

type NativeFeatureDefinitionsContext = Omit<FeatureDefinitionsContext, 'dryRun' | 'normaliseHeadings'> & {
  readonly repository: string
  readonly contents: ReadonlyMap<string, string>
}

const mechanical = (item: RubricItem<FeatureDefinitionsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeFeatureDefinitionsContext) => definition.audit.run(context as unknown as FeatureDefinitionsContext)
  }
}

const judgment = (item: RubricItem<FeatureDefinitionsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const normaliseHeadingWrites = (context: NativeFeatureDefinitionsContext) => {
  const issues = context.headingIssues.filter((issue) => issue.canonical)
  const byFile = new Map<string, typeof issues>()
  for (const issue of issues) byFile.set(issue.file, [...(byFile.get(issue.file) ?? []), issue])
  return {
    writes: [...byFile]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([file, replacements]) => {
        const source = context.contents.get(file)
        if (source === undefined) throw new Error(`missing cached feature-definition source: ${file}`)
        const headings = new Map(replacements.map((issue) => [`### ${issue.heading}`, issue.canonical as string]))
        return {
          path: relative(context.repository, join(context.directory, file)),
          content: source
            .split('\n')
            .map((line) => headings.get(line) ?? line)
            .join('\n')
        }
      })
  }
}

const nativeId1 = () => ({
  ...mechanical(ID_1),
  repair: (context: NativeFeatureDefinitionsContext) => normaliseHeadingWrites(context)
})

export default {
  contract: 1,
  skill: 'ki-feature-definitions',
  createContext: ({ repository }: { readonly repository: string }): NativeFeatureDefinitionsContext => {
    const source = createFeatureDefinitionsContextFactory({ target: repository, dryRun: true })()
    const { dryRun: _dryRun, normaliseHeadings: _normaliseHeadings, ...evidence } = source
    const files = new Set(source.headingIssues.filter((issue) => issue.canonical).map((issue) => issue.file))
    const contents = new Map([...files].map((file) => [file, readFileSync(join(source.directory, file), 'utf8')]))
    return { repository, ...evidence, contents }
  },
  families: [
    { code: 'INDEX', title: 'Feature index', items: [mechanical(INDEX_1), mechanical(INDEX_2)] },
    { code: 'AREA', title: 'Area registration', items: [mechanical(AREA_1), mechanical(AREA_2)] },
    { code: 'ID', title: 'Requirement identity', items: [nativeId1(), mechanical(ID_2), mechanical(ID_3)] },
    { code: 'REQ', title: 'Normative requirement shape', items: [mechanical(REQ_1)] },
    { code: 'VERIFY', title: 'Verification hooks', items: [mechanical(VERIFY_1), judgment(VERIFY_2)] },
    { code: 'BEHAVIOUR', title: 'Behavioural altitude', items: [judgment(BEHAVIOUR_1)] },
    { code: 'AS-BUILT', title: 'As-built truth', items: [judgment(AS_BUILT_1)] },
    { code: 'SPLIT', title: 'Requirement focus', items: [judgment(SPLIT_1)] },
    { code: 'DR-LINK', title: 'Decision traceability', items: [judgment(DR_LINK_1)] },
    { code: 'AREA-FIT', title: 'Area fit', items: [judgment(AREA_FIT_1)] }
  ]
} as const
