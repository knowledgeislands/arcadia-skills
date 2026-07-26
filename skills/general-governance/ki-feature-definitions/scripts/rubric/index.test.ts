import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'

test('declares heading normalisation as a feature-definition repair plan', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-feature-definitions-rubric-'))
  try {
    const source = [
      '# Area',
      '',
      '### FEAT-001 - Supports native contracts',
      '',
      'The system MUST support native contracts.',
      '',
      '_Verify:_ a test.'
    ].join('\n')
    await mkdir(join(repository, 'docs/features'), { recursive: true })
    await writeFile(
      join(repository, 'docs/features/index.md'),
      ['# Index', '', '| Prefix | File |', '| --- | --- |', '| FEAT | [area.md](area.md) |', ''].join('\n')
    )
    await writeFile(join(repository, 'docs/features/area.md'), source)

    const context = await definition.createContext({ repository })
    const identity = definition.families.find((family) => family.code === 'ID')?.items.find((item) => item.code === 'ID-1')
    expect(identity?.kind).toBe('mechanical')
    if (!identity || identity.kind !== 'mechanical' || !('repair' in identity)) throw new Error('ID-1 must be repairable')

    expect(await identity.audit(context)).toEqual([
      {
        status: 'VIOLATION',
        message: 'Level-3 heading is not a valid requirement ID: “FEAT-001 - Supports native contracts”.',
        subject: 'area.md'
      }
    ])
    expect(await identity.repair?.(context)).toEqual({
      writes: [
        {
          path: 'docs/features/area.md',
          content: source.replace('### FEAT-001 - Supports native contracts', '### FEAT-001 — Supports native contracts')
        }
      ]
    })
    expect(await readFile(join(repository, 'docs/features/area.md'), 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
