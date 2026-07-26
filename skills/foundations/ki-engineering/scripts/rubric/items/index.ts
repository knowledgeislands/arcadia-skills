import { createEngineeringContext, type EngineeringRubricContext } from '../contexts/engineering.ts'
import { BIO } from './biome.ts'
import { BUILD } from './build.ts'
import { BUN } from './bun.ts'
import { CI } from './ci.ts'
import type { EngineeringRubricItem } from './common.ts'
import { DEPS } from './dependencies.ts'
import { ENV } from './environment.ts'
import { GEN } from './generated.ts'
import { KNIP } from './knip.ts'
import { MISE } from './mise.ts'
import { PKG } from './package.ts'
import { SCR } from './scripts.ts'
import { SYNC } from './sync.ts'
import { TEST } from './test.ts'
import { TOML } from './toml.ts'
import { TSC } from './typescript.ts'

type EngineeringRubricFamily = {
  readonly code: string
  readonly title: string
  readonly description: string
  readonly standard: string
  readonly selectContext: (context: EngineeringRubricContext) => EngineeringRubricContext
  readonly items: readonly EngineeringRubricItem[]
}

const family = (code: string, items: readonly EngineeringRubricItem[]): EngineeringRubricFamily => ({
  code,
  title: `${code} engineering rules`,
  description: 'Stable engineering criteria preserved from the engineering standard.',
  standard: 'standards.md',
  selectContext: (context: EngineeringRubricContext) => context,
  items
})

export const ENGINEERING_ITEMS = [
  ...PKG,
  ...MISE,
  ...CI,
  ...SCR,
  ...BUN,
  ...TSC,
  ...BIO,
  ...KNIP,
  ...SYNC,
  ...DEPS,
  ...GEN,
  ...TEST,
  ...BUILD,
  ...ENV,
  ...TOML
] as const

export const KI_ENGINEERING_RUBRIC = {
  contract: 1,
  name: 'ki-engineering',
  concern: 'engineering standards',
  scope: { kind: 'repository' },
  createContext: ({ repository }: { readonly repository: string }): EngineeringRubricContext => createEngineeringContext({ repository }),
  families: [
    family('PKG', PKG),
    family('MISE', MISE),
    family('CI', CI),
    family('SCR', SCR),
    family('BUN', BUN),
    family('TSC', TSC),
    family('BIO', BIO),
    family('KNIP', KNIP),
    family('SYNC', SYNC),
    family('DEPS', DEPS),
    family('GEN', GEN),
    family('TEST', TEST),
    family('BUILD', BUILD),
    family('ENV', ENV),
    family('TOML', TOML)
  ]
} as const

export default KI_ENGINEERING_RUBRIC
