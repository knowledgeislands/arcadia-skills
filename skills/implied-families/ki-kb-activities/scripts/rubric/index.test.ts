import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_KB_ACTIVITIES_RUBRIC } from './items/index.ts'

test('preserves the activity catalogue and proposes a missing index without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-kb-activities-native-'))
  try {
    const activities = join(repository, 'Admin', 'Operations', 'Activities')
    await mkdir(activities, { recursive: true })
    await writeFile(
      join(activities, 'Daily review.md'),
      ['---', 'status: active', 'realization: manual', '---', '', '# Daily review', '', 'Review the daily work.', ''].join('\n')
    )

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_KB_ACTIVITIES_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const index = contract.families.flatMap((family) => family.items).find((item) => item.code === 'ACT-S-1')
    expect(index?.kind).toBe('mechanical')
    if (!index || index.kind !== 'mechanical' || !('repair' in index)) throw new Error('ACT-S-1 must be repairable')

    const context = contract.createContext({ repository, configuration: {} })
    expect(index.repair?.(context)).toEqual({
      writes: [
        { path: 'Admin/Operations/Activities/Activities.md', content: '# Activities\n- [Daily review](Daily review.md)\n', create: true }
      ]
    })
    expect(await readFile(join(activities, 'Activities.md'), 'utf8').catch(() => undefined)).toBeUndefined()
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
