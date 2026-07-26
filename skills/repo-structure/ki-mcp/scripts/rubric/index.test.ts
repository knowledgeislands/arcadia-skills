import { expect, test } from 'bun:test'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_MCP_RUBRIC } from './items/index.ts'

const repair = (code: string) => {
  const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('preserves the MCP catalogue and declares only host-owned file replacements', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-mcp-native-'))
  const config = join(repository, '.ki-config.toml')
  const packageJson = join(repository, 'package.json')
  const configSource = '[ki-repo]\n'
  const packageSource = `${JSON.stringify({ name: '@example/mcp-server', bin: { mcp: 'dist/index.js' } }, null, 2)}\n`
  try {
    await writeFile(config, configSource)
    await writeFile(packageJson, packageSource)
    const context = contract.createContext({ repository })

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_MCP_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(repair('KI-CONFIG')(context)).toEqual({ writes: [{ path: '.ki-config.toml', content: '[ki-repo]\n\n[ki-mcp]\n' }] })
    expect(repair('PKG-1')(context)).toEqual({
      writes: [
        {
          path: 'package.json',
          content: expect.stringContaining('"dist/mcp-server/index.js"')
        }
      ]
    })
    expect(await readFile(config, 'utf8')).toBe(configSource)
    expect(await readFile(packageJson, 'utf8')).toBe(packageSource)

    await writeFile(config, '[ki-mcp\n')
    expect(repair('KI-CONFIG')(contract.createContext({ repository }))).toEqual({ writes: [] })
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
