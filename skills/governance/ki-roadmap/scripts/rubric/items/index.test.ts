import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RoadmapRubricContext } from '../contexts/roadmap.ts'
import { inspectRoadmap, rootRoadmap } from '../contexts/roadmap-evidence.ts'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const families = catalogue.families.filter((family) => family.code !== 'RUBRIC') as unknown as readonly RubricFamily<
  RoadmapRubricContext,
  unknown
>[]
const items = families.flatMap((family) => family.items) as readonly RubricItem<unknown>[]

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const createFixture = (): string => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-roadmap-flat-'))
  temporaryDirectories.push(repository)
  mkdirSync(join(repository, 'docs', 'roadmap'), { recursive: true })
  writeFileSync(
    join(repository, '.ki-config.toml'),
    '["knowledgeislands/ki-agentic-harness:ki-roadmap"]\nrepo_code = "TEST"\n\n["knowledgeislands/ki-agentic-harness:ki-roadmap".themes]\nFND = "foundation-tooling"\n'
  )
  writeFileSync(
    join(repository, 'docs', 'roadmap', 'TEST-FND-001-build-the-foundation.md'),
    `---
id: TEST-FND-001
title: Build the foundation
theme: foundation-tooling
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

The foundation needs implementation.

## Boundary

Do not broaden the work beyond the first slice.
`
  )
  writeFileSync(join(repository, 'ROADMAP.md'), rootRoadmap())
  return repository
}

test('the structured catalogue represents the flat work-item standard', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-roadmap')
  expect(catalogue.createSession).toBeFunction()
  expect(catalogue.families.map((family) => family.code)).toEqual(['RUBRIC', 'SCOPE', 'ROAD', 'ITEM', 'INDEX', 'EXEC', 'SAFE', 'HANDOFF'])
  expect(items.map((item) => item.code)).toEqual([
    'SCOPE-1',
    'ROAD-1',
    'ROAD-2',
    'ROAD-3',
    'ROAD-4',
    'ROAD-5',
    'ROAD-6',
    'ITEM-1',
    'ITEM-2',
    'ITEM-3',
    'ITEM-4',
    'ROOT-1',
    'EXEC-1',
    'EXEC-2',
    'EXEC-3',
    'SAFE-1',
    'HANDOFF-1'
  ])
})

test('a flat work item and concise root orientation conform', () => {
  const repository = createFixture()
  expect(inspectRoadmap(repository).filter((finding) => finding.level === 'FAIL')).toEqual([])
  expect(readFileSync(join(repository, 'ROADMAP.md'), 'utf8')).toContain('canonical structured Markdown work items')
  expect(readFileSync(join(repository, 'ROADMAP.md'), 'utf8')).not.toContain('TEST-FND-001')
})

test('invalid lifecycle placement and missing execution sections fail', () => {
  const repository = createFixture()
  const item = join(repository, 'docs', 'roadmap', 'TEST-FND-001-build-the-foundation.md')
  writeFileSync(
    item,
    readFileSync(item, 'utf8').replace('horizon: next\nstatus: open', 'horizon: future\nstatus: in-progress\ncandidate: true')
  )
  const failures = inspectRoadmap(repository).filter((finding) => finding.level === 'FAIL')
  expect(failures).toContainEqual(expect.objectContaining({ area: 'ITEM-2', msg: 'non-open item must be in blocking or next' }))
  expect(failures).toContainEqual(expect.objectContaining({ area: 'ITEM-3' }))
})

test('conform repairs only a stale root orientation', () => {
  const repository = createFixture()
  writeFileSync(join(repository, 'ROADMAP.md'), '# stale\n')
  const session = catalogue.createSession({ mode: 'conform', repository, userHome: '/tmp', configuration: {} })
  const context = session.subjects[1]?.context() as RoadmapRubricContext
  const family = catalogue.families.find((candidate) => candidate.code === 'INDEX')
  const item = family?.items[0] as unknown as RubricItem<typeof context.index> | undefined
  item?.mechanical?.conform?.run(context.index)
  expect(session.proposal().writes).toEqual([{ path: 'ROADMAP.md', content: rootRoadmap() }])
})

test('dependency links must be reciprocal', () => {
  const repository = createFixture()
  const item = join(repository, 'docs', 'roadmap', 'TEST-FND-001-build-the-foundation.md')
  writeFileSync(item, readFileSync(item, 'utf8').replace('blocks: []', 'blocks: [TEST-FND-002]'))
  expect(inspectRoadmap(repository)).toContainEqual(
    expect.objectContaining({ area: 'ITEM-4', msg: "dependency 'TEST-FND-002' does not exist" })
  )
})

test('item theme codes must be declared by the repository roadmap configuration', () => {
  const repository = createFixture()
  const item = join(repository, 'docs', 'roadmap', 'TEST-FND-001-build-the-foundation.md')
  writeFileSync(item, readFileSync(item, 'utf8').replace('theme: foundation-tooling', 'theme: other-theme'))
  expect(inspectRoadmap(repository)).toContainEqual(
    expect.objectContaining({ area: 'ITEM-2', msg: 'item identifier theme code must map to its configured theme' })
  )
})
