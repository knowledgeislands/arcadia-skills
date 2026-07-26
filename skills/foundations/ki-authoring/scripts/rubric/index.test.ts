import { expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_AUTHORING_RUBRIC } from './items/index.ts'

test('the native contract declares host-owned markdown commands and drifted owned-file replacements without writing', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-authoring-native-'))
  const prettier = join(repository, '.prettierrc.json')
  try {
    mkdirSync(repository, { recursive: true })
    writeFileSync(prettier, '{}\n')
    const context = contract.createContext({ repository })

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_AUTHORING_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const markdown = contract.families.flatMap((family) => family.items).find((item) => item.code === 'MD-mech') as {
      readonly repair?: () => { readonly commands: readonly unknown[] }
    }
    const owned = contract.families.flatMap((family) => family.items).find((item) => item.code === 'OWN-1') as {
      readonly repair?: (value: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] }
    }

    expect(markdown.repair?.().commands).toHaveLength(2)
    expect(owned.repair?.(context)).toEqual({ writes: [{ path: '.prettierrc.json', content: expect.any(String) }] })
    expect(readFileSync(prettier, 'utf8')).toBe('{}\n')
  } finally {
    rmSync(repository, { recursive: true, force: true })
  }
})
