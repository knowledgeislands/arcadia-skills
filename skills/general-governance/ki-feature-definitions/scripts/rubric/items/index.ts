import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createFeatureDefinitionsContextFactory, type FeatureDefinitionsContext } from '../contexts/feature-definitions.ts'
import { KI_FEATURE_DEFINITIONS_RUBRIC } from './catalogue.ts'
import { ID_1 } from './feature-definitions.ts'

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

const catalogueDefinition = KI_FEATURE_DEFINITIONS_RUBRIC

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
  name: 'ki-feature-definitions',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeFeatureDefinitionsContext => {
    const source = createFeatureDefinitionsContextFactory({ target: repository, dryRun: true })()
    const { dryRun: _dryRun, normaliseHeadings: _normaliseHeadings, ...evidence } = source
    const files = new Set(source.headingIssues.filter((issue) => issue.canonical).map((issue) => issue.file))
    const contents = new Map([...files].map((file) => [file, readFileSync(join(source.directory, file), 'utf8')]))
    return { repository, ...evidence, contents }
  },
  families: catalogueDefinition.families.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => {
      const source = item as unknown as RubricItem<FeatureDefinitionsContext>
      return directItem(source, source.code === 'ID-1' ? nativeId1() : source.mechanical ? mechanical(source) : judgment(source))
    })
  }))
} as const

export * from './catalogue.ts'
