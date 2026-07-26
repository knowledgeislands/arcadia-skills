import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'
import { KI_HOUSEKEEPING_RUBRIC } from './items/index.ts'

test('preserves the housekeeping catalogue and declares bounded project-memory repairs without writing', async () => {
  const home = await mkdtemp(join(tmpdir(), 'ki-housekeeping-native-'))
  try {
    const memory = join(home, '.claude', 'projects', 'example-project', 'memory')
    const source = [
      '---',
      'name: wrong-name',
      'description: Useful memory',
      'metadata:',
      '  type: project',
      '---',
      '',
      'Remember this.',
      ''
    ].join('\n')
    await mkdir(memory, { recursive: true })
    await writeFile(join(memory, 'MEMORY.md'), '# Memory\n')
    await writeFile(join(memory, 'useful-memory.md'), source)

    expect(definition.scope).toEqual({ kind: 'user-home', paths: ['.claude/projects'] })
    expect(definition.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_HOUSEKEEPING_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const context = definition.createContext({ userHome: home })
    const items = definition.families.flatMap((family) => family.items)
    const name = items.find((item) => item.code === 'FM-2')
    const indexing = items.find((item) => item.code === 'IDX-3')
    const self = items.find((item) => item.code === 'SELF-1')
    if (!name || name.kind !== 'mechanical' || !indexing || indexing.kind !== 'mechanical' || !self || self.kind !== 'mechanical')
      throw new Error('expected native mechanical items')

    expect(name.audit(context)).toEqual([
      {
        status: 'VIOLATION',
        message: "name 'wrong-name' does not match filename slug 'useful-memory'",
        subject: '.claude/projects/example-project/memory/useful-memory.md'
      }
    ])
    if (!('repair' in name) || !name.repair || !('repair' in indexing) || !indexing.repair) throw new Error('expected repair plans')
    expect(name.repair(context)).toEqual({
      writes: [
        {
          path: '.claude/projects/example-project/memory/useful-memory.md',
          content: source.replace('name: wrong-name', 'name: useful-memory')
        }
      ]
    })
    expect(indexing.repair(context)).toEqual({
      writes: [
        {
          path: '.claude/projects/example-project/memory/MEMORY.md',
          content: '# Memory\n- [wrong-name](useful-memory.md) — Useful memory\n'
        }
      ]
    })
    expect(self.audit(context)).toEqual([
      {
        status: 'NOT_APPLICABLE',
        message: 'Repository-local ki-self payloads require repository scope; ki user audits only bounded user-home state.'
      }
    ])
    expect(await readFile(join(memory, 'useful-memory.md'), 'utf8')).toBe(source)
    expect(await readFile(join(memory, 'MEMORY.md'), 'utf8')).toBe('# Memory\n')
  } finally {
    await rm(home, { recursive: true, force: true })
  }
})
