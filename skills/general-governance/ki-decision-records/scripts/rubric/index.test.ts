import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_DECISION_RECORDS_RUBRIC } from './items/index.ts'

test('preserves the decision-record catalogue and proposes missing index entries without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-decision-records-native-'))
  try {
    const directory = join(repository, 'docs', 'decisions')
    const record = 'ADR-EXAMPLE-001-decide-the-record-shape.md'
    const index = join(directory, 'README.md')
    const source = [
      '---',
      'id: ADR-EXAMPLE-001',
      "title: 'Decide the record shape'",
      'date: 2026-07-21',
      'status: current',
      'type: Architecture Decision Record',
      'type_url: https://knowledgeislands.info/specifications/decision-records/adr',
      'decision_type: architecture',
      '---',
      '',
      '# ADR-EXAMPLE-001: Decide the record shape',
      '',
      '## Context',
      '',
      'The record needs a stable, machine-checkable shape.',
      '',
      '## Decision',
      '',
      'The repository adopts the universal record metadata.',
      '',
      '## Consequences',
      '',
      'Readers can identify record type without inferring it from an acronym.',
      ''
    ].join('\n')
    await mkdir(directory, { recursive: true })
    await writeFile(join(repository, '.ki-config.toml'), '[ki-decision-records]\n')
    await writeFile(join(directory, record), source)
    await writeFile(index, '# Decisions\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_DECISION_RECORDS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const index2 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'INDEX-2') as
      | {
          readonly kind: 'mechanical'
          readonly audit: (context: ReturnType<typeof contract.createContext>) => unknown
          readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] }
        }
      | undefined
    expect(index2?.kind).toBe('mechanical')
    if (!index2 || index2.kind !== 'mechanical' || !('repair' in index2)) throw new Error('INDEX-2 must be repairable')

    const context = contract.createContext({ repository })
    expect(index2.audit(context)).toEqual([
      { status: 'VIOLATION', message: 'Expected exactly one index entry; found 0.', subject: 'ADR-EXAMPLE-001' }
    ])
    expect(index2.repair?.(context)).toEqual({
      writes: [
        {
          path: 'docs/decisions/README.md',
          content: '# Decisions\n- [ADR-EXAMPLE-001](ADR-EXAMPLE-001-decide-the-record-shape.md) — Decide the record shape\n'
        }
      ]
    })
    expect(await readFile(index, 'utf8')).toBe('# Decisions\n')
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
