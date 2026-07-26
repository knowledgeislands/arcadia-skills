import { expect, test } from 'bun:test'
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_TOOLS_RUBRIC } from './items/index.ts'

const repair = (code: string) => {
  const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('preserves the tools catalogue and declares only bounded local repairs', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-tools-native-'))
  const config = join(repository, '.ki-config.toml')
  const bin = join(repository, 'bin', 'example')
  const install = join(repository, 'install.sh')
  const configSource = '[ki-repo]\n'
  try {
    await mkdir(join(repository, 'bin'))
    await writeFile(config, configSource)
    await writeFile(bin, '#!/bin/sh\n')
    await writeFile(install, '#!/bin/sh\n')
    await chmod(bin, 0o644)
    await chmod(install, 0o644)
    const context = contract.createContext({ repository })

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_TOOLS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(repair('TOOL-EXEC')(context) as unknown).toEqual({
      writes: [],
      commands: [{ program: 'chmod', arguments: ['+x', 'bin/example'] }]
    })
    expect(repair('TOOL-INSTALL')(context) as unknown).toEqual({
      writes: [],
      commands: [{ program: 'chmod', arguments: ['+x', 'install.sh'] }]
    })
    expect(repair('CONFIG-1')(context)).toEqual({
      writes: [{ path: '.ki-config.toml', content: '[ki-repo]\n\n[ki-tools]\n' }]
    })
    expect(await readFile(config, 'utf8')).toBe(configSource)
    expect((await Bun.file(bin).stat()).mode & 0o111).toBe(0)
    expect((await Bun.file(install).stat()).mode & 0o111).toBe(0)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})

test('does not propose scaffolding or external operations', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-tools-native-'))
  try {
    await mkdir(join(repository, 'bin'))
    await writeFile(join(repository, 'bin', 'example'), '#!/bin/sh\n')
    const context = contract.createContext({ repository })
    const version = contract.families.flatMap((family) => family.items).find((item) => item.code === 'TOOL-VERSION')

    expect(repair('TOOL-INSTALL')(context) as unknown).toEqual({ writes: [], commands: [] })
    expect(repair('CONFIG-1')(context)).toEqual({ writes: [] })
    expect(version).not.toHaveProperty('repair')
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
