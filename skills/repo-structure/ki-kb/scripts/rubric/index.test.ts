import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_KB_RUBRIC } from './items/index.ts'

test('preserves the KB catalogue and proposes safe missing indexes without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-kb-native-'))
  try {
    await Promise.all(['Calendar', 'Pillars', 'Resources', 'Streams', 'Admin'].map((zone) => mkdir(join(repository, zone))))
    await writeFile(join(repository, 'AGENTS.md'), '# Base\n\nThis base uses the memory cascade.\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_KB_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const items = contract.families.flatMap((family) => family.items)
    const zoneIndexes = items.find((item) => item.code === 'ZONE-2')
    const memoryIndex = items.find((item) => item.code === 'ZONE-3')
    expect(zoneIndexes?.kind).toBe('mechanical')
    expect(memoryIndex?.kind).toBe('mechanical')
    if (!zoneIndexes || zoneIndexes.kind !== 'mechanical' || !('repair' in zoneIndexes)) throw new Error('ZONE-2 must be repairable')
    if (!memoryIndex || memoryIndex.kind !== 'mechanical' || !('repair' in memoryIndex)) throw new Error('ZONE-3 must be repairable')

    const context = contract.createContext({ repository })
    expect(zoneIndexes.repair(context)).toEqual({
      writes: ['Calendar', 'Pillars', 'Resources', 'Streams', 'Admin'].map((zone) => ({
        path: `${zone}/${zone}.md`,
        content: `# ${zone}\n`,
        create: true
      }))
    })
    expect(memoryIndex.repair(context)).toEqual({
      writes: [
        {
          path: 'Admin/MEMORY.md',
          content: '# MEMORY\n\n## Active Pillars\n\n<!-- list active Pillars here -->\n',
          create: true
        }
      ]
    })
    expect(await readFile(join(repository, 'Admin', 'MEMORY.md'), 'utf8').catch(() => undefined)).toBeUndefined()
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
