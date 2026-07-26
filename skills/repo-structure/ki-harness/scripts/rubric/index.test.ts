import { expect, test } from 'bun:test'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_HARNESS_RUBRIC } from './items/index.ts'

test('preserves the catalogue and declares an existing config replacement without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-harness-native-'))
  const config = join(repository, '.ki-config.toml')
  const source = '[ki-repo]\n'
  try {
    await writeFile(config, source)

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_HARNESS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const config1 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'CONFIG-1') as
      | {
          readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] }
        }
      | undefined
    expect(Boolean(config1?.repair)).toBe(true)
    if (!config1?.repair) throw new Error('CONFIG-1 repair must be available')

    expect(config1.repair(contract.createContext({ repository }))).toEqual({
      writes: [{ path: '.ki-config.toml', content: '[ki-repo]\n\n[ki-harness]\n' }]
    })
    expect(await readFile(config, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
