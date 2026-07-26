import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_REPO_RUBRIC } from './items/index.ts'

test('the native contract preserves the catalogue and declares local foundation repairs without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-repo-native-'))
  try {
    // The legacy evidence collector recognises a repository from this marker;
    // no GitHub remote is needed to exercise its offline local evidence.
    await mkdir(join(repository, '.git'))
    await writeFile(join(repository, '.ki-config.toml'), '[ "ki-authoring" ] # baseline\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_REPO_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const context = contract.createContext({ repository })
    const files1 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'FILES-1') as
      | { readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] } }
      | undefined
    const files3 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'FILES-3') as
      | { readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] } }
      | undefined

    if (!files1?.repair || !files3?.repair) throw new Error('FILES-1 and FILES-3 must declare local foundation repairs')

    const files1Proposal = files1.repair(context)
    expect(files1Proposal).toEqual({
      writes: [
        {
          path: '.ki-config.toml',
          content: expect.stringContaining('[ki-repo]')
        },
        { path: '.gitignore', content: 'node_modules/\n.DS_Store\n.ki/audits/\n.ki/conform/\n', create: true }
      ]
    })
    expect(files3.repair(context)).toEqual({ writes: [files1Proposal.writes[0]] })
    expect(await readFile(join(repository, '.ki-config.toml'), 'utf8')).toBe('[ "ki-authoring" ] # baseline\n')
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
