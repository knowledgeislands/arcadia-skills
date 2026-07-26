import { resolve } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { type ActivitiesContext, createActivitiesContextFactory } from './contexts/activities.ts'
import { KI_KB_ACTIVITIES_RUBRIC } from './items/index.ts'

type NativeActivitiesContext = Omit<ActivitiesContext, 'dryRun' | 'ensureIndex'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<ActivitiesContext>[]
}

const ACTIVITIES_INDEX = 'Admin/Operations/Activities/Activities.md'

const catalogue = KI_KB_ACTIVITIES_RUBRIC.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<ActivitiesContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeActivitiesContext) => definition.audit.run(context as unknown as ActivitiesContext)
  }
}

const judgment = (item: RubricItem<ActivitiesContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const indexRepair = (context: NativeActivitiesContext) => {
  if (!context.activitiesAvailable || context.notes.length === 0) return { writes: [] }
  const missing = context.notes.filter((note) => !context.indexContent.includes(note.indexLink))
  if (missing.length === 0) return { writes: [] }
  const content =
    `${context.indexContent || '# Activities\n\n'}`.replace(/\n*$/, '\n') +
    missing.map((note) => `- [${note.title}](${note.indexLink})`).join('\n') +
    '\n'
  return { writes: [{ path: ACTIVITIES_INDEX, content, ...(context.indexExists ? {} : { create: true }) }] }
}

const nativeItem = (item: RubricItem<ActivitiesContext>) => {
  if (item.code === 'ACT-S-1') return { ...mechanical(item), repair: indexRepair }
  return item.mechanical ? mechanical(item) : judgment(item)
}

const configuredHarness = (repository: string, configuration: Readonly<Record<string, unknown>>): string | undefined => {
  const harness = configuration.harness
  return typeof harness === 'string' && harness ? resolve(repository, harness) : undefined
}

export default {
  contract: 1,
  skill: 'ki-kb-activities',
  createContext: ({
    repository,
    configuration
  }: {
    readonly repository: string
    readonly configuration: Readonly<Record<string, unknown>>
  }) => {
    const source = createActivitiesContextFactory({
      target: repository,
      harness: configuredHarness(repository, configuration),
      dryRun: true
    })()
    const { dryRun: _dryRun, ensureIndex: _ensureIndex, ...evidence } = source
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
