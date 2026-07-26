import type { RubricItem } from '../../shared/rubric.ts'
import { createStreamsContext, normalisationWrites, type StreamsContext } from '../contexts/streams.ts'
import { KI_KB_STREAMS_RUBRIC } from './catalogue.ts'

type NativeStreamsContext = Omit<StreamsContext, 'dryRun' | 'conformRule'> & {
  readonly repository: string
  readonly normalisationWrites: readonly { readonly path: string; readonly content: string }[]
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<StreamsContext>[]
}

const catalogueDefinition = KI_KB_STREAMS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<StreamsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeStreamsContext) => definition.audit.run(context as unknown as StreamsContext)
  }
}

const judgment = (item: RubricItem<StreamsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<StreamsContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  // Normalising an existing proposal's controlled-vocabulary field is a
  // deterministic replacement. Folder moves, index synthesis, and gate prose
  // remain explicit maintainer decisions rather than native conform proposals.
  if (item.code === 'ENACT-2') return { ...native, conform: (context: NativeStreamsContext) => ({ writes: context.normalisationWrites }) }
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
  name: 'ki-kb-streams',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeStreamsContext => {
    const { dryRun: _dryRun, conformRule: _conformRule, ...evidence } = createStreamsContext(repository, true)
    return { repository, ...evidence, normalisationWrites: normalisationWrites(repository) }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
