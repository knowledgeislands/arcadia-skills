import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createStreamsContext, normalisationWrites, type StreamsContext } from './contexts/streams.ts'
import { KI_KB_STREAMS_RUBRIC } from './items/index.ts'

type NativeStreamsContext = Omit<StreamsContext, 'dryRun' | 'conformRule'> & {
  readonly repository: string
  readonly normalisationWrites: readonly { readonly path: string; readonly content: string }[]
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<StreamsContext>[]
}

const catalogue = KI_KB_STREAMS_RUBRIC.families as unknown as readonly LegacyFamily[]

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
  // remain explicit maintainer decisions rather than native repair proposals.
  if (item.code === 'ENACT-2') return { ...native, repair: (context: NativeStreamsContext) => ({ writes: context.normalisationWrites }) }
  return native
}

export default {
  contract: 1,
  skill: 'ki-kb-streams',
  createContext: ({ repository }: { readonly repository: string }): NativeStreamsContext => {
    const { dryRun: _dryRun, conformRule: _conformRule, ...evidence } = createStreamsContext(repository, true)
    return { repository, ...evidence, normalisationWrites: normalisationWrites(repository) }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
