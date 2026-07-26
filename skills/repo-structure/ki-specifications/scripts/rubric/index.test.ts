import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'

test('declares the keyless marker as a host-owned repository repair', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-specifications-rubric-'))
  try {
    const configuration = '[ki-repo]\n'
    await mkdir(join(repository, 'proposals'))
    await writeFile(join(repository, '.ki-config.toml'), configuration)

    const context = await definition.createContext({ repository })
    const marker = definition.families.find((family) => family.code === 'SPEC')?.items.find((item) => item.code === 'SPEC-1')
    expect(marker?.kind).toBe('mechanical')
    if (marker?.kind !== 'mechanical' || !('repair' in marker)) throw new Error('SPEC-1 must be repairable')

    expect(await marker.audit(context)).toEqual([
      { status: 'VIOLATION', message: '[ki-specifications] is absent from .ki-config.toml.', subject: '.ki-config.toml' }
    ])
    expect(await marker.repair?.(context)).toEqual({
      writes: [
        {
          path: '.ki-config.toml',
          content: '[ki-repo]\n\n# This repo carries the KI Specifications repository structure.\n[ki-specifications]\n'
        }
      ]
    })
    expect(await readFile(join(repository, '.ki-config.toml'), 'utf8')).toBe(configuration)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
