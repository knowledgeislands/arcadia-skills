import { mechanical } from './common.ts'

export const GEN_1 = mechanical(
  'GEN-1',
  'managed discovery surfaces share exclusions',
  'Known generated or managed discovery surfaces have matching Biome, Knip, and Markdown exclusions, and no legacy `.ki` runtime exclusion remains.',
  'FAIL'
)
export const GEN = [GEN_1] as const
