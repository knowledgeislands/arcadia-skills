import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createDecisionRecordsContextFactory, type DecisionRecordsContext } from '../contexts/decision-records.ts'
import { KI_DECISION_RECORDS_RUBRIC } from './catalogue.ts'

type NativeDecisionRecordsContext = Omit<DecisionRecordsContext, 'appendMissingIndexEntries' | 'dryRun'> & {
  readonly repository: string
  readonly indexContent: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<DecisionRecordsContext>[]
}

const catalogueDefinition = KI_DECISION_RECORDS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<DecisionRecordsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeDecisionRecordsContext) => definition.audit.run(context as unknown as DecisionRecordsContext)
  }
}

const judgment = (item: RubricItem<DecisionRecordsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const missingIndexEntries = (context: NativeDecisionRecordsContext) =>
  context.records.filter((record) => (context.indexCounts.get(record.id) ?? 0) === 0)

const appendIndexEntries = (context: NativeDecisionRecordsContext) => {
  if (!context.indexExists) return { writes: [] }
  const missing = missingIndexEntries(context)
  if (missing.length === 0) return { writes: [] }
  const additions = missing.map((record) => `- [${record.id}](${record.file}) — ${record.headingTitle ?? '(title unknown — see file)'}`)
  return {
    writes: [
      {
        path: relative(context.repository, join(context.directory, context.indexFile)),
        content: `${context.indexContent.replace(/\n*$/, '\n')}${additions.join('\n')}\n`
      }
    ]
  }
}

const nativeIndex2 = (item: RubricItem<DecisionRecordsContext>) => ({
  ...mechanical(item),
  conform: (context: NativeDecisionRecordsContext) => appendIndexEntries(context)
})

const nativeItem = (item: RubricItem<DecisionRecordsContext>) => {
  if (item.code === 'INDEX-2') return nativeIndex2(item)
  return item.mechanical ? mechanical(item) : judgment(item)
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
  name: 'ki-decision-records',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeDecisionRecordsContext => {
    const source = createDecisionRecordsContextFactory({ target: repository, dryRun: true })()
    const { dryRun: _dryRun, appendMissingIndexEntries: _appendMissingIndexEntries, ...evidence } = source
    return {
      repository,
      ...evidence,
      indexContent: source.indexExists ? readFileSync(join(source.directory, source.indexFile), 'utf8') : ''
    }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
