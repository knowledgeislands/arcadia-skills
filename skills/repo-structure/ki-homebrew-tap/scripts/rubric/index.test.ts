import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_HOMEBREW_TAP_RUBRIC } from './items/index.ts'

test('preserves the catalogue and declares the marker repair without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-homebrew-tap-native-'))
  const config = join(repository, '.ki-config.toml')
  const source = '[ki-repo]\n'
  try {
    await mkdir(join(repository, 'Formula'))
    await writeFile(config, source)
    await writeFile(join(repository, 'Formula', 'example.rb'), 'class Example < Formula\nend\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_HOMEBREW_TAP_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const config1 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'CONFIG-1') as
      | {
          readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] }
        }
      | undefined
    expect(config1?.repair?.(contract.createContext({ repository }))).toEqual({
      writes: [
        {
          path: '.ki-config.toml',
          content: '[ki-repo]\n\n# This repo is a Knowledge Islands Homebrew tap.\n[ki-homebrew-tap]\n'
        }
      ]
    })
    expect(await readFile(config, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})

test('reports Homebrew validation as an explicit external operation', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-homebrew-tap-native-'))
  try {
    await mkdir(join(repository, 'Formula'))
    await writeFile(join(repository, '.ki-config.toml'), '[ki-homebrew-tap]\n')
    await writeFile(join(repository, 'Formula', 'example.rb'), 'class Example < Formula\nend\n')
    const tap7 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'TAP-7') as
      | { readonly audit: (context: ReturnType<typeof contract.createContext>) => readonly unknown[] }
      | undefined

    expect(tap7?.audit(contract.createContext({ repository }))).toEqual([
      {
        status: 'VIOLATION',
        message: 'Run Homebrew validation explicitly: brew style Formula/example.rb and brew audit --strict example.',
        subject: 'Formula/example.rb'
      }
    ])
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
