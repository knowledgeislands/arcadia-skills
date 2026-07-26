import { expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_AGENTS_RUBRIC } from './items/index.ts'

test('the native contract preserves the catalogue and proposes filename alignment without writing', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-subagents-native-'))
  const agent = join(repository, 'subagents', 'agent.md')
  try {
    mkdirSync(join(repository, 'subagents'))
    writeFileSync(agent, '---\nname: other\ndescription: Delegates testing.\n---\n\n# Agent\n')

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_AGENTS_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    const lay3 = contract.families.flatMap((family) => family.items).find((item) => item.code === 'LAY-3') as
      | {
          readonly repair?: (context: ReturnType<typeof contract.createContext>) => { readonly writes: readonly unknown[] }
        }
      | undefined
    expect(Boolean(lay3?.repair)).toBe(true)
    if (!lay3?.repair) throw new Error('LAY-3 repair must be available')

    const proposal = lay3.repair(contract.createContext({ repository }))

    expect(proposal).toEqual({
      writes: [{ path: 'subagents/agent.md', content: '---\nname: agent\ndescription: Delegates testing.\n---\n\n# Agent\n' }]
    })
    expect(readFileSync(agent, 'utf8')).toContain('name: other')
  } finally {
    rmSync(repository, { recursive: true, force: true })
  }
})
