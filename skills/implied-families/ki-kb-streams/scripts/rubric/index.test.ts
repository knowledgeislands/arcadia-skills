import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_KB_STREAMS_RUBRIC } from './items/index.ts'

const repair = (code: string) => {
  const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('preserves the Streams catalogue and proposes controlled-vocabulary repairs without writing', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-kb-streams-native-'))
  const proposal = join(repository, 'Streams', 'Active', 'Example Proposal.md')
  const source = [
    '---',
    'status: ready - awaiting approval',
    'priority: high (planned)',
    'dependencies: []',
    '---',
    '',
    '# Example',
    ''
  ].join('\n')
  try {
    await mkdir(join(repository, 'Streams', 'Active'), { recursive: true })
    await writeFile(proposal, source)

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_KB_STREAMS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(repair('ENACT-2')(contract.createContext({ repository }))).toEqual({
      writes: [
        {
          path: 'Streams/Active/Example Proposal.md',
          content: ['---', 'status: ready', 'priority: high', 'dependencies: []', '---', '', '# Example', ''].join('\n')
        }
      ]
    })
    expect(await readFile(proposal, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
