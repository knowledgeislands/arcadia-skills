import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createTokenomicsUserContext, type TokenomicsUserContext } from './contexts/user.ts'
import { KI_TOKENOMICS_RUBRIC } from './items/index.ts'

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<unknown>[]
}

const catalogue = KI_TOKENOMICS_RUBRIC.families as unknown as readonly LegacyFamily[]

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

export default {
  contract: 1,
  skill: 'ki-tokenomics',
  scope: { kind: 'user-home', paths: ['.claude', '.claude.json'] },
  createContext: ({ userHome }: { readonly userHome: string }) => createTokenomicsUserContext({ userHome }),
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
