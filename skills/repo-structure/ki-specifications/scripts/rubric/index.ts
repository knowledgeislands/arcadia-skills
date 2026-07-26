import { readFileSync } from 'node:fs'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createSpecificationsContext, type SpecificationsContext } from './contexts/specifications.ts'
import { SPEC, SPEC_1 } from './items/specifications.ts'
import { SYNC } from './items/sync.ts'

type NativeSpecificationsContext = Omit<SpecificationsContext, 'conformMarker'> & {
  readonly repository: string
  readonly configurationSource: string | undefined
  readonly markerIsAbsent: boolean
}

const mechanical = (item: RubricItem<SpecificationsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeSpecificationsContext) => definition.audit.run(context as unknown as SpecificationsContext)
  }
}

const judgment = (item: RubricItem<SpecificationsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeSpec1 = () => ({
  ...mechanical(SPEC_1),
  repair: (context: NativeSpecificationsContext) => {
    if (!context.markerIsAbsent || context.configurationSource === undefined) return { writes: [] }
    return {
      writes: [
        {
          path: '.ki-config.toml',
          content: `${context.configurationSource.trimEnd()}\n\n# This repo carries the KI Specifications repository structure.\n[ki-specifications]\n`
        }
      ]
    }
  }
})

export default {
  contract: 1,
  skill: 'ki-specifications',
  createContext: ({ repository }: { readonly repository: string }): NativeSpecificationsContext => {
    const source = createSpecificationsContext({ target: repository, dryRun: true })
    const configurationSource = source.configExists ? readFileSync(`${repository}/.ki-config.toml`, 'utf8') : undefined
    let markerIsAbsent = false
    if (configurationSource !== undefined && !source.malformed) {
      const parsed = Bun.TOML.parse(configurationSource) as Record<string, unknown>
      markerIsAbsent = parsed['ki-specifications'] === undefined
    }
    const { conformMarker: _conformMarker, ...evidence } = source
    return { repository, ...evidence, configurationSource, markerIsAbsent }
  },
  families: [
    {
      code: 'SPEC',
      title: 'Repository structure',
      items: [nativeSpec1(), ...SPEC.filter((item) => item !== SPEC_1).map((item) => (item.mechanical ? mechanical(item) : judgment(item)))]
    },
    { code: 'SYNC', title: 'Standard synchronisation', items: SYNC.map(judgment) }
  ]
} as const
