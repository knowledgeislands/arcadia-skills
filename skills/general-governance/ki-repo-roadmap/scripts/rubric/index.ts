import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createRoadmapContextFactory, type RoadmapContext } from './contexts/roadmap.ts'
import { type RoadmapReplacement, roadmapReplacements } from './contexts/roadmap-writes.ts'
import { KI_REPO_ROADMAP_RUBRIC } from './items/index.ts'

type NativeRoadmapContext = Omit<RoadmapContext, 'conform'> & {
  readonly repository: string
  readonly replacements: readonly RoadmapReplacement[]
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<RoadmapContext>[]
}

const catalogue = KI_REPO_ROADMAP_RUBRIC.families as unknown as readonly LegacyFamily[]

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

export default {
  contract: 1,
  skill: 'ki-repo-roadmap',
  createContext: ({ repository }: { readonly repository: string }): NativeRoadmapContext => {
    const { conform: _conform, ...evidence } = createRoadmapContextFactory({ target: repository, dryRun: true })()
    return { repository, ...evidence, replacements: roadmapReplacements(repository) }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
