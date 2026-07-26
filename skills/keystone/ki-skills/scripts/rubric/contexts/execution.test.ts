import { afterEach, describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import definition from '../items/index.ts'
import { KI_CHECKER_4 } from '../items/ki-checker.ts'
import { createSkillRubricContext } from './skill.ts'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

describe('ki-skills direct execution', () => {
  test('keeps the catalogue index as family wiring', () => {
    const skill = resolve(import.meta.dir, '../../..')
    const checker = createSkillRubricContext(skill).context().checker

    expect(KI_CHECKER_4.mechanical?.audit.run(checker)).toEqual([
      { status: 'PASS', message: 'structured rubric items follow the uniform family layout' }
    ])
  })

  test('coalesces item-owned conforms without changing the repository', () => {
    const repository = mkdtempSync(join(tmpdir(), 'ki-skills-execution-'))
    temporaryDirectories.push(repository)
    const skillDirectory = join(repository, 'skills', 'fixture')
    mkdirSync(join(skillDirectory, 'references'), { recursive: true })
    const skillPath = join(skillDirectory, 'SKILL.md')
    const source = `---
name: wrong-name
ki-depends-on: []
description: Governs a fixture skill.
argument-hint: 'audit'
---

# Fixture

See [the guide](references\\guide.md).
`
    writeFileSync(skillPath, source)
    writeFileSync(join(skillDirectory, 'references', 'guide.md'), '# Guide\n')

    const context = definition.createContext({ repository })
    const nameFamily = definition.families.find((family) => family.code === 'NAME')
    const nameItem = nameFamily?.items.find((item) => item.code === 'NAME-5')
    if (!nameFamily || !nameItem?.mechanical?.conform) throw new Error('NAME-5 direct conform is unavailable')

    const proposal = nameItem.mechanical.conform.run(nameFamily.selectContext(context))

    expect(proposal.writes).toHaveLength(1)
    expect(proposal.writes[0]?.path).toBe('skills/fixture/SKILL.md')
    expect(proposal.writes[0]?.content).toContain('name: fixture')
    expect(proposal.writes[0]?.content).toContain("argument-hint: 'audit | conform | educate | refresh | help'")
    expect(proposal.writes[0]?.content).toContain('[the guide](references/guide.md)')
    expect(readFileSync(skillPath, 'utf8')).toBe(source)
  })
})
