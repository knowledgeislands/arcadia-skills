import { readFileSync } from 'node:fs'
import type { RubricItem } from '../../shared/rubric.ts'
import { createSpecificationsContext, type SpecificationsContext } from '../contexts/specifications.ts'
import { KI_SPECIFICATIONS_RUBRIC } from './catalogue.ts'
import { SPEC_1 } from './specifications.ts'

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
  conform: (context: NativeSpecificationsContext) => {
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

const catalogueDefinition = KI_SPECIFICATIONS_RUBRIC

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
  name: 'ki-specifications',
  concern: catalogueDefinition.concern,
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
  families: catalogueDefinition.families.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => {
      const source = item as unknown as RubricItem<SpecificationsContext>
      return directItem(source, source.code === 'SPEC-1' ? nativeSpec1() : source.mechanical ? mechanical(source) : judgment(source))
    })
  }))
} as const

export * from './catalogue.ts'
