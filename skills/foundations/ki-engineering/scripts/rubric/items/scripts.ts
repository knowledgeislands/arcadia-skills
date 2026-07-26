import { judgment, mechanical } from './common.ts'

export const SCR_1 = mechanical(
  'SCR-1',
  'ki script naming law',
  'Every script is a permitted bare lifecycle idiom or carries the `ki:` prefix; a bare non-idiom name is drift.',
  'FAIL'
)
export const SCR_2 = mechanical(
  'SCR-2',
  'repository maintenance stays CLI-owned',
  'Package scripts do not alias `ki repo audit`, `ki repo conform`, or `ki repo educate`; repositories invoke the installed CLI directly.',
  'FAIL'
)
export const SCR_3 = mechanical(
  'SCR-3',
  'retired script families absent',
  'Retired `ki:lint:*`, `ki:deps:*`, `ki:knip`, `ki:verify`, and aggregate governance aliases are absent.',
  'FAIL'
)
export const SCR_4 = mechanical(
  'SCR-4',
  'per-skill wrapper aliases absent',
  'Package scripts contain no derived `ki:<skill>:<mode>` aliases and no command that invokes `.ki`, `govern.ts`, `educate.ts`, an adapter, or a vendored runtime.',
  'FAIL'
)
export const SCR_5 = mechanical(
  'SCR-5',
  'lifecycle clean and prepare scripts',
  '`clean` removes `node_modules` (and `dist` where built), and `prepare` is `husky`.',
  'FAIL',
  ['WARN']
)
export const SCR_6 = mechanical(
  'SCR-6',
  'no test-entrypoint bypass',
  'Only the bare `test` script may use `bun test`; every other script uses `bun run test` to invoke the governed entrypoint.',
  'FAIL'
)
export const SCR_7 = mechanical(
  'SCR-7',
  'runner-neutral test and build entrypoints',
  'Test-capable repos expose bare `test`; compiled repos expose bare `build`; repository governance remains outside package scripts.',
  'FAIL'
)
export const SCR_8 = judgment(
  'SCR-8',
  'repo-specific scripts retain clear ownership',
  'Repo-specific scripts beyond the governance surface are valid only when an owning skill governs them and they do not shadow a governed entrypoint.',
  'Do repo-specific scripts have a clear owner and avoid divergent shadows of governed entrypoints?'
)
export const SCR_9 = judgment(
  'SCR-9',
  'clean-end-state cutovers',
  'Repository-footprint replacements protect the known-good state with a tag or release, cut directly to the intended contract without compatibility shims, verify it, and tag or release the resulting state.',
  'Did the cutover protect both known-good states while avoiding compatibility code that exists only for an intermediate state?'
)
export const SCR = [SCR_1, SCR_2, SCR_3, SCR_4, SCR_5, SCR_6, SCR_7, SCR_8, SCR_9] as const
