import { afterEach, describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { KI_SHAPE } from '../items/ki-shape.ts'
import { NAME } from '../items/name.ts'
import { selectKiSkillsContext } from './contexts.ts'
import { createSkillRubricContext } from './skill.ts'

const temporaryDirectories: string[] = []
const KI_SHAPE_12 = KI_SHAPE.items.find(({ code }) => code === 'KI-SHAPE-12')
const KI_SHAPE_14 = KI_SHAPE.items.find(({ code }) => code === 'KI-SHAPE-14')
const NAME_5 = NAME.items.find(({ code }) => code === 'NAME-5')

if (!KI_SHAPE_12 || !KI_SHAPE_14 || !NAME_5) throw new Error('expected rubric items are missing from their families')

const validLocalSkill = `---
name: ki-self
ki-depends-on: []
description: Repository-local governance.
argument-hint: 'audit | conform | educate | refresh | help'
---

# KI Self

## Operating modes

HELP describes this local boundary.

### Mode AUDIT

Check the repository.

### Mode CONFORM

Apply safe fixes.

### Mode EDUCATE

Explain the local workflow.

### Mode REFRESH

Refresh only this committed .agents/skills/ki-self/ source. If a rule is reusable, stop and promote it to its shared owner.

### Mode HELP

Describe this local boundary.
`

const createSkill = (relativeDirectory: string): string => {
  const root = mkdtempSync(join(tmpdir(), 'ki-skills-local-governance-'))
  temporaryDirectories.push(root)
  const directory = join(root, relativeDirectory)
  mkdirSync(directory, { recursive: true })
  writeFileSync(join(directory, 'SKILL.md'), validLocalSkill)
  return directory
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const audit = (directory: string) => {
  const context = createSkillRubricContext(directory).context
  return {
    name: NAME_5.mechanical?.audit.run(selectKiSkillsContext(context, 'name'))[0],
    vocabulary: KI_SHAPE_12.mechanical?.audit.run(selectKiSkillsContext(context, 'shape'))[0],
    refresh: KI_SHAPE_14.mechanical?.audit.run(selectKiSkillsContext(context, 'shape'))[0]
  }
}

describe('repository-local ki-self source', () => {
  test('accepts only the canonical .agents/skills/ki-self shape', () => {
    const result = audit(createSkill('.agents/skills/ki-self'))

    expect(result.name?.status).toBe('PASS')
    expect(result.vocabulary?.status).toBe('PASS')
    expect(result.refresh?.status).toBe('PASS')
  })

  test.each([
    { relativeDirectory: 'ki-self', nameStatus: 'PASS' },
    { relativeDirectory: '.agents/skills/not-ki-self', nameStatus: 'VIOLATION' }
  ])('does not treat an invalid lookalike as a local-source exception', ({ relativeDirectory, nameStatus }) => {
    const result = audit(createSkill(relativeDirectory))

    expect(result.name?.status).toBe(nameStatus)
    expect(result.vocabulary?.status).toBe('PASS')
  })
})
