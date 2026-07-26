import { expect, test } from 'bun:test'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'

const source = `# Repository roadmap

## Blocking

## Next

## Soon

## Waiting for

## Future
`

test('declares a pure existing-file roadmap normalisation', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-repo-roadmap-rubric-'))
  try {
    const path = join(repository, 'ROADMAP.md')
    await writeFile(path, source)

    const context = definition.createContext({ repository })
    const road4 = definition.families.flatMap((family) => family.items).find((item) => item.code === 'ROAD-4') as
      | {
          readonly audit: (context: ReturnType<typeof definition.createContext>) => readonly unknown[]
          readonly repair?: (context: ReturnType<typeof definition.createContext>) => {
            readonly writes: readonly { readonly path: string; readonly content: string }[]
          }
        }
      | undefined
    if (!road4?.repair) throw new Error('ROAD-4 must declare a repair')

    expect(road4.audit(context)).toContainEqual(expect.objectContaining({ status: 'VIOLATION', subject: 'ROADMAP.md' }))
    const proposal = road4.repair(context)
    expect(proposal.writes).toHaveLength(1)
    expect(proposal.writes[0]?.path).toBe('ROADMAP.md')
    expect(proposal.writes[0]?.content).toContain('Actively broken, or blocking the `Next` horizon')
    expect(await readFile(path, 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
