import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_PLUGINS_RUBRIC } from './items/index.ts'

test('preserves the catalogue and does not declare generated plugin repairs', () => {
  const items = contract.families.flatMap((family) => family.items)

  expect(items.map((item) => item.code)).toEqual(KI_PLUGINS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code))
  expect(items.some((item) => 'repair' in item)).toBe(false)
})

test('reports generated manifest drift without changing the projection', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-plugins-native-'))
  const marketplaceFile = join(repository, '.claude-plugin', 'marketplace.json')
  const source = `${JSON.stringify(
    {
      owner: { name: 'Another owner' },
      plugins: [{ name: 'knowledge-islands', source: './knowledge-islands', description: 'Projected skills' }]
    },
    null,
    2
  )}\n`
  try {
    await mkdir(join(repository, '.claude-plugin'))
    await writeFile(marketplaceFile, source)

    const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === 'PLUG-2') as
      | { readonly audit: (context: ReturnType<typeof contract.createContext>) => readonly unknown[] }
      | undefined

    expect(item?.audit(contract.createContext({ repository }))).toEqual([
      {
        status: 'VIOLATION',
        message: 'marketplace owner or plugin count is invalid',
        subject: '.claude-plugin/marketplace.json'
      }
    ])
    expect(await readFile(marketplaceFile, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
