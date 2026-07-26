import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_KB_LIVE_ARTIFACTS_RUBRIC } from './items/index.ts'

test('preserves the live-artifacts catalogue and proposes only deterministic index and render declarations', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-kb-live-artifacts-native-'))
  try {
    const directory = join(repository, 'Admin', 'Operations', 'Live Artifacts')
    const artifact = join(directory, 'Status Board.md')
    await mkdir(directory, { recursive: true })
    await writeFile(artifact, '---\nstatus: active\n---\n\n# Status Board\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_KB_LIVE_ARTIFACTS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const index = contract.families.flatMap((family) => family.items).find((item) => item.code === 'LA-S-1')
    const renders = contract.families.flatMap((family) => family.items).find((item) => item.code === 'LA-F-2')
    if (!index || index.kind !== 'mechanical' || !('repair' in index)) throw new Error('LA-S-1 must be repairable')
    if (!renders || renders.kind !== 'mechanical' || !('repair' in renders)) throw new Error('LA-F-2 must be repairable')

    const context = contract.createContext({ repository })
    expect(index.audit(context)).toEqual([
      {
        status: 'VIOLATION',
        message: 'The live artifacts index note is absent.',
        subject: 'Admin/Operations/Live Artifacts/Live Artifacts.md'
      }
    ])
    expect(index.repair(context)).toEqual({
      writes: [
        {
          path: 'Admin/Operations/Live Artifacts/Live Artifacts.md',
          content:
            '# Live Artifacts\n\nOperational documents reflecting the current state of the island. Each row is a `.md`/`.html` pair.\n\n- [Status Board](Status Board.md) — _(description — see manual TODO)_\n',
          create: true
        }
      ]
    })
    expect(renders.repair(context)).toEqual({
      writes: [
        { path: 'Admin/Operations/Live Artifacts/Status Board.md', content: '---\nstatus: active\nrenders: html\n---\n\n# Status Board\n' }
      ]
    })
    expect(await readFile(artifact, 'utf8')).toBe('---\nstatus: active\n---\n\n# Status Board\n')
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
