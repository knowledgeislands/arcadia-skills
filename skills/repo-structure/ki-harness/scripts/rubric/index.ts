import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createHarnessContext, type HarnessRubricContext, hasTomlTable } from './contexts/harness.ts'
import { KI_HARNESS_RUBRIC } from './items/index.ts'

type NativeHarnessContext = Omit<HarnessRubricContext, 'dryRun' | 'ensurePart' | 'ensureShelfReadme' | 'ensureHarnessConfig'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<HarnessRubricContext>[]
}

const catalogue = KI_HARNESS_RUBRIC.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<HarnessRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeHarnessContext) => definition.audit.run(context as unknown as HarnessRubricContext)
  }
}

const judgment = (item: RubricItem<HarnessRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

// The host transaction presently replaces existing regular files only.  Directory and
// missing-file scaffolding remain violations until that capability is deliberately added;
// their legacy writers are not exposed through the native context.
const unsupportedScaffoldRepair = () => ({ writes: [] })

const nativeConfig1 = (item: RubricItem<HarnessRubricContext>) => ({
  ...mechanical(item),
  repair: (context: NativeHarnessContext) => ({
    writes:
      context.config === null || hasTomlTable(context.config, 'ki-harness')
        ? []
        : [{ path: '.ki-config.toml', content: `${context.config.replace(/\n*$/, '\n')}\n[ki-harness]\n` }]
  })
})

const nativeItem = (item: RubricItem<HarnessRubricContext>) => {
  if (item.code === 'LAY-1' || item.code === 'LAY-2') return { ...mechanical(item), repair: unsupportedScaffoldRepair }
  if (item.code === 'CONFIG-1') return nativeConfig1(item)
  return item.mechanical ? mechanical(item) : judgment(item)
}

export default {
  contract: 1,
  skill: 'ki-harness',
  createContext: ({ repository }: { readonly repository: string }): NativeHarnessContext => {
    const {
      dryRun: _dryRun,
      ensurePart: _ensurePart,
      ensureShelfReadme: _ensureShelfReadme,
      ensureHarnessConfig: _ensureHarnessConfig,
      ...evidence
    } = createHarnessContext(repository, true)
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
