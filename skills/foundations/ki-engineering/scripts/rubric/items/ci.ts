import { mechanical } from './common.ts'

export const CI_1 = mechanical(
  'CI-1',
  'CI installs the declared toolchain',
  'Where `.github/workflows/ci.yml` exists, it uses `jdx/mise-action` and hardcodes no Bun or Node version.',
  'WARN'
)
export const CI_2 = mechanical(
  'CI-2',
  'CI runs the canonical gates',
  '`ci.yml` runs `ki repo audit`, then `bun run test` when tests exist, and does not route governance through package scripts.',
  'FAIL',
  ['WARN']
)
export const CI = [CI_1, CI_2] as const
