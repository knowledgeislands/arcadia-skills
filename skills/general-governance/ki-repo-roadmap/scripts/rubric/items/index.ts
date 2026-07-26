import type { RubricItem } from '../../shared/rubric.ts'
import { createRoadmapContextFactory, type RoadmapContext } from '../contexts/roadmap.ts'
import { type RoadmapReplacement, roadmapReplacements } from '../contexts/roadmap-writes.ts'
import { KI_REPO_ROADMAP_RUBRIC } from './catalogue.ts'

type NativeRoadmapContext = Omit<RoadmapContext, 'conform'> & {
  readonly repository: string
  readonly replacements: readonly RoadmapReplacement[]
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<RoadmapContext>[]
}

const catalogueDefinition = KI_REPO_ROADMAP_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<RoadmapContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeRoadmapContext) => definition.audit.run(context as unknown as RoadmapContext)
  }
}

const judgment = (item: RubricItem<RoadmapContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeRepair = (item: RubricItem<RoadmapContext>) => ({
  ...mechanical(item),
  repair: (context: NativeRoadmapContext) => ({
    writes: context.replacements
      .filter((replacement) => replacement.areas.includes(item.code as 'ROAD-4' | 'PLAN-2' | 'PROJ-1'))
      .map(({ path, content }) => ({ path, content }))
  })
})

const nativeItem = (item: RubricItem<RoadmapContext>) => {
  if (item.code === 'ROAD-4' || item.code === 'PLAN-2' || item.code === 'PROJ-1') return nativeRepair(item)
  return item.mechanical ? mechanical(item) : judgment(item)
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
  name: 'ki-repo-roadmap',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeRoadmapContext => {
    const { conform: _conform, ...evidence } = createRoadmapContextFactory({ target: repository, dryRun: true })()
    return { repository, ...evidence, replacements: roadmapReplacements(repository) }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
