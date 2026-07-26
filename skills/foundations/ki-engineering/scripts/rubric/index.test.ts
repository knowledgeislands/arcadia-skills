import { expect, test } from 'bun:test'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_ENGINEERING_RUBRIC } from './items/index.ts'

const repair = (code: string) => {
  const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('declares host-owned engineering writes and commands without invoking a legacy writer', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-native-'))
  const packagePath = join(repository, 'package.json')
  const source = `${JSON.stringify({ name: 'example', scripts: {} }, null, 2)}\n`
  try {
    writeFileSync(packagePath, source)
    const context = contract.createContext({ repository })

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_ENGINEERING_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(repair('PKG-1')(context) as unknown).toEqual({
      writes: [
        {
          path: 'package.json',
          content: expect.stringContaining('"type": "module"')
        }
      ]
    })
    expect(repair('MISE-1')(context) as unknown).toEqual({ writes: [{ path: 'mise.toml', content: expect.any(String), create: true }] })
    expect(repair('TOML-1')(context) as unknown).toEqual({
      writes: [{ path: '.ki-config.toml', content: '[ki-engineering]\n', create: true }]
    })
    expect(repair('BIO-1')(context) as unknown).toEqual({
      writes: [],
      commands: [
        { program: 'bunx', arguments: ['@biomejs/biome', 'check', '--write', '--unsafe'] },
        { program: 'bunx', arguments: ['@biomejs/biome', 'format', '--write'] }
      ]
    })
    expect(readFileSync(packagePath, 'utf8')).toBe(source)
  } finally {
    rmSync(repository, { recursive: true, force: true })
  }
})
