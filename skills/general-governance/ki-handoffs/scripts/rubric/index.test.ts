import { expect, test } from 'bun:test'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'

test('declares pure readiness repair writes for opted-in handoffs', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-handoffs-rubric-'))
  try {
    const artifact = join(repository, 'handoff.md')
    const source = [
      '---',
      'handoff: true',
      'tier: sonnet',
      '---',
      '',
      '## Decisions',
      '',
      'Locked: command is ki handoff.',
      '',
      'Escalate: none.',
      ''
    ].join('\n')
    await writeFile(artifact, source)

    const context = await definition.createContext({ repository })
    const readiness = definition.families[0]?.items.find((item) => item.code === 'HAND-3')
    expect(readiness?.kind).toBe('mechanical')
    if (!readiness || readiness.kind !== 'mechanical') throw new Error('HAND-3 must be mechanical')

    expect(await readiness.audit(context)).toEqual([
      {
        status: 'VIOLATION',
        message: "no readiness marker (readiness: frontmatter, a '## Readiness' heading, or a 'Readiness test' checkbox)",
        subject: 'handoff.md'
      }
    ])
    expect(await readiness.repair?.(context)).toEqual({
      writes: [
        {
          path: 'handoff.md',
          content: source.replace('tier: sonnet\n---', 'tier: sonnet\nreadiness: pending\n---')
        }
      ]
    })
    expect(await readFile(artifact, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
