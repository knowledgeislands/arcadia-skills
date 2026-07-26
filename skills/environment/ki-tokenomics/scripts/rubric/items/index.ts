import type { RubricItem } from '../../../../../shared/rubric-contract.ts'
import { createTokenomicsUserContext, type TokenomicsUserContext } from '../contexts/user.ts'
import { KI_TOKENOMICS_RUBRIC } from './catalogue.ts'

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<unknown>[]
}

const catalogueDefinition = KI_TOKENOMICS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const nativeItem = (item: RubricItem<unknown>) => {
  if (!item.mechanical) {
    if (!item.judgment) throw new Error(`${item.code} must declare a native rubric mode`)
    return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: item.judgment.prompt }
  }
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: item.mechanical.level,
    phase: item.mechanical.audit.phase,
    audit: (context: TokenomicsUserContext) =>
      context.outcomes.get(item.code) ?? [
        { status: 'NOT_APPLICABLE' as const, message: 'No user-home evidence applies to this criterion.' }
      ]
  }
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
  name: 'ki-tokenomics',
  concern: catalogueDefinition.concern,
  scope: { kind: 'user-home', paths: ['.claude', '.claude.json'] },
  createContext: ({ userHome }: { readonly userHome: string }) => createTokenomicsUserContext({ userHome }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
