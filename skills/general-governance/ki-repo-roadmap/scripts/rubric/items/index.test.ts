import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RoadmapRubricContext } from '../contexts/roadmap.ts'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const families = catalogue.families as unknown as readonly RubricFamily<RoadmapRubricContext, unknown>[]
const items = families.flatMap((family) => family.items) as readonly RubricItem<unknown>[]
const familyModules = readdirSync(import.meta.dir)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.test.ts'))
  .sort()

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const createThematicFixture = (): { repository: string; roadmapPath: string } => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-repo-roadmap-session-'))
  temporaryDirectories.push(repository)
  const theme = join(repository, 'docs', 'roadmap', 'foundation')
  const plans = join(theme, 'plans')
  mkdirSync(plans, { recursive: true })
  writeFileSync(join(repository, '.ki-config.toml'), '[ki-repo-roadmap]\n')
  const roadmapPath = join(theme, 'ROADMAP.md')
  writeFileSync(
    roadmapPath,
    `---
code: FND
---

# Foundation roadmap

## Blocking

### Build the foundation

Deliver the foundation.

**Plan:** [FND-999](plans/FND-999-missing.md)

## Next

## Soon

## Waiting for

## Future
`
  )
  writeFileSync(
    join(plans, 'FND-001-build-the-foundation.md'),
    `---
id: 'FND-001'
title: Build the foundation
status: open
roadmap: foundation/build-the-foundation
blocks: —
blocked-by: —
baseline-ref: —
---

# FND-001: Build the foundation

## Context

The foundation needs implementation.

## Current state

The work has not started.

## Steps

1. Build the foundation.

## Files touched

The foundation files.

## Verify

Run the focused checks.

## Dependencies / blocks

None.
`
  )
  return { repository, roadmapPath }
}

test('the structured catalogue preserves every repository-roadmap criterion', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-repo-roadmap')
  expect(catalogue.createSession).toBeFunction()
  expect(catalogue.families.map((family) => family.code)).toEqual([
    'SCOPE',
    'PROFILE',
    'ROAD',
    'THEME',
    'ITEM',
    'PROJ',
    'PLAN',
    'SAFE',
    'EXPAND',
    'HANDOFF'
  ])
  expect(items.map((item) => item.code)).toEqual([
    'SCOPE-1',
    'PROFILE-1',
    'PROFILE-2',
    'ROAD-1',
    'ROAD-2',
    'ROAD-3',
    'ROAD-4',
    'ROAD-5',
    'THEME-1',
    'THEME-2',
    'THEME-3',
    'THEME-4',
    'ITEM-1',
    'PROJ-1',
    'PLAN-1',
    'PLAN-2',
    'PLAN-3',
    'PLAN-4',
    'PLAN-5',
    'SAFE-1',
    'EXPAND-1',
    'HANDOFF-1'
  ])
  expect(items.filter((item) => item.judgment)).toHaveLength(9)
  expect(items.filter((item) => item.judgment).every((item) => Boolean(item.judgment?.prompt.trim()))).toBe(true)
})

test('each family module exports one complete family', async () => {
  for (const file of familyModules) {
    const module = (await import(`./${file}`)) as Record<string, unknown>
    expect(Object.keys(module)).toHaveLength(1)
    const family = Object.values(module)[0] as { code?: unknown; items?: unknown }
    expect(typeof family.code).toBe('string')
    expect(Array.isArray(family.items)).toBe(true)
  }
})

test('audit is read-only and returns one stable prepared context', () => {
  const { repository, roadmapPath } = createThematicFixture()
  const before = readFileSync(roadmapPath, 'utf8')
  const session = catalogue.createSession({ mode: 'audit', repository, userHome: tmpdir(), configuration: {} })
  const subject = session.subjects[0]
  const context = subject?.context()

  expect(subject?.context()).toBe(context)
  for (const family of families) {
    const familyContext = family.selectContext(context as RoadmapRubricContext)
    for (const item of family.items) item.mechanical?.audit.run(familyContext)
  }

  expect(session.proposal()).toEqual({ writes: [] })
  expect(readFileSync(roadmapPath, 'utf8')).toBe(before)
})

test('ordered conform actions coalesce multi-file replacements behind one session proposal', () => {
  const { repository } = createThematicFixture()
  const session = catalogue.createSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} })
  const context = session.subjects[0]?.context() as RoadmapRubricContext
  for (const code of ['ROAD-4', 'PROJ-1', 'PLAN-2']) {
    const family = families.find((candidate) => candidate.items.some((item) => item.code === code))
    const item = family?.items.find((candidate) => candidate.code === code)
    item?.mechanical?.conform?.run(family?.selectContext(context))
  }

  const proposal = session.proposal()
  expect(proposal.writes).toHaveLength(2)
  expect(proposal.writes.map((write) => write.path)).toEqual(['docs/roadmap/foundation/ROADMAP.md', 'ROADMAP.md'])
  expect(proposal.writes[1]).toMatchObject({ path: 'ROADMAP.md', create: true })
  expect(proposal.writes[0]?.content).toContain('Actively broken, or blocking the `Next` horizon: takes priority over everything else')
  expect(proposal.writes[0]?.content).toContain('**Plan:** [FND-001](plans/FND-001-build-the-foundation.md)')
  expect(proposal.writes[0]?.content.match(/\*\*Plan:\*\*/g)).toHaveLength(1)
})
