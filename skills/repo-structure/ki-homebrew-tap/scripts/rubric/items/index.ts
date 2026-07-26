import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createHomebrewTapContext, type HomebrewTapContext } from '../contexts/homebrew-tap.ts'
import { KI_HOMEBREW_TAP_RUBRIC } from './catalogue.ts'

type NativeHomebrewTapContext = Omit<HomebrewTapContext, 'brewOutcomes' | 'conformMarker'> & {
  readonly repository: string
  readonly configContent: string | null
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<HomebrewTapContext>[]
}

const catalogueDefinition = KI_HOMEBREW_TAP_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<HomebrewTapContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeHomebrewTapContext) => definition.audit.run(context as unknown as HomebrewTapContext)
  }
}

const judgment = (item: RubricItem<HomebrewTapContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const markerConform = (context: NativeHomebrewTapContext) => {
  if (!context.targetExists || !context.formulaDirectory || context.config !== 'absent' || context.configContent === null)
    return { writes: [] }
  return {
    writes: [
      {
        path: '.ki-config.toml',
        content: `${context.configContent.replace(/\n*$/, '\n')}\n# This repo is a Knowledge Islands Homebrew tap.\n[ki-homebrew-tap]\n`
      }
    ]
  }
}

// Native repository audits do not invoke external package managers.  Homebrew's
// style and audit commands remain explicit manual violations rather than hidden
// subprocesses, so their output and side effects stay outside the transaction.
const nativeTap7 = (item: RubricItem<HomebrewTapContext>) => ({
  ...mechanical(item),
  audit: (context: NativeHomebrewTapContext) => {
    if (!context.applicable) return [{ status: 'NOT_APPLICABLE' as const, message: 'ki-homebrew-tap is not applicable.' }]
    if (context.formulae.length === 0)
      return [{ status: 'NOT_APPLICABLE' as const, message: 'No formulae are available for Homebrew checks.' }]
    return context.formulae.map((formula) => ({
      status: 'VIOLATION' as const,
      message: `Run Homebrew validation explicitly: brew style Formula/${formula.file} and brew audit --strict ${formula.name}.`,
      subject: `Formula/${formula.file}`
    }))
  }
})

const nativeItem = (item: RubricItem<HomebrewTapContext>) => {
  if (!item.mechanical) return judgment(item)
  if (item.code === 'CONFIG-1') return { ...mechanical(item), conform: markerConform }
  if (item.code === 'TAP-7') return nativeTap7(item)
  return mechanical(item)
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
  name: 'ki-homebrew-tap',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeHomebrewTapContext => {
    const source = createHomebrewTapContext({ target: repository, dryRun: true })
    const { brewOutcomes: _brewOutcomes, conformMarker: _conformMarker, ...evidence } = source
    return {
      repository,
      ...evidence,
      configContent: source.config === 'absent' ? readFileSync(join(source.target, '.ki-config.toml'), 'utf8') : null
    }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
