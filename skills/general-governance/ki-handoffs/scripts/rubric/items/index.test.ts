import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const items = catalogue.families.flatMap((family) => family.items)

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

test('the structured catalogue preserves every handoff criterion', () => {
  expect(items.map((item) => item.code)).toEqual(['HAND-1', 'HAND-2', 'HAND-3', 'HAND-4', 'HAND-5', 'HAND-6', 'HAND-7', 'HAND-8'])
  expect(Object.fromEntries(items.filter((item) => item.mechanical).map((item) => [item.code, item.mechanical?.level]))).toEqual({
    'HAND-1': 'FAIL',
    'HAND-2': 'FAIL',
    'HAND-3': 'WARN'
  })
  expect(items.filter((item) => item.judgment)).toHaveLength(5)
  expect(items.filter((item) => item.judgment).every((item) => Boolean(item.judgment?.prompt.trim()))).toBe(true)
  expect(items.map((item) => item.title)).toEqual([
    'Semantic tier marker',
    'Decisions locked versus escalate',
    'Readiness marker',
    'Locked decisions are closed',
    'Definition of done',
    'Appropriate assigned tier',
    'Cold-agent readiness',
    'Tokenomics composition boundary'
  ])
  expect(items.map((item) => item.sources)).toEqual([
    ['standards.md#the-opt-in-marker-contract'],
    ['standards.md#the-opt-in-marker-contract', 'standards.md#the-quality-bar'],
    ['standards.md#the-opt-in-marker-contract', 'standards.md#the-readiness-test'],
    ['standards.md#the-reasoning-layer-split', 'standards.md#the-quality-bar'],
    ['standards.md#the-quality-bar'],
    ['standards.md#tier-assignment'],
    ['standards.md#the-readiness-test'],
    ['standards.md#tier-assignment']
  ])
  expect(items.filter((item) => item.judgment).map((item) => item.judgment?.prompt)).toEqual(
    items.filter((item) => item.judgment).map((item) => item.description)
  )
})

test('the session keeps one readiness draft and proposes it once', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-handoffs-'))
  temporaryDirectories.push(repository)
  const directory = join(repository, 'docs', 'handoffs')
  const path = join(directory, 'example.md')
  mkdirSync(directory, { recursive: true })
  writeFileSync(
    path,
    `---
handoff: true
tier: opus
---

# Example

## Decisions

Locked: use the direct catalogue.

Escalate: none.
`
  )

  const session = catalogue.createSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} })
  const subject = session.subjects[0]
  const context = subject?.context()
  const readiness = items[2]

  expect(subject?.context()).toBe(context)
  expect(readiness?.mechanical?.audit.run(context as NonNullable<typeof context>)[0]?.status).toBe('VIOLATION')

  readiness?.mechanical?.conform?.run(context as NonNullable<typeof context>)

  expect(session.proposal().writes).toEqual([
    {
      path: 'docs/handoffs/example.md',
      content: expect.stringContaining('readiness: pending')
    }
  ])
})
