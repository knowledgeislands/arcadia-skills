import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'

const repair = (code: string) => {
  const item = definition.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('declares pure skill-document repairs for native conform', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-skills-rubric-'))
  try {
    const directory = join(repository, 'sample-skill')
    const source = [
      '---',
      'name: not-the-directory',
      "description: 'Audits a sample skill.'",
      "argument-hint: 'audit | conform | educate | refresh | help'",
      '---',
      '',
      '[Example](references\\example.md)',
      ''
    ].join('\n')
    await mkdir(directory, { recursive: true })
    await writeFile(join(directory, 'SKILL.md'), source)

    const context = await definition.createContext({ repository })
    const name = definition.families.find((family) => family.code === 'NAME')?.items.find((item) => item.code === 'NAME-5')
    expect(name?.kind).toBe('mechanical')
    if (name?.kind !== 'mechanical') throw new Error('NAME-5 must be mechanical')
    expect(await name.audit(context)).toEqual([
      {
        status: 'VIOLATION',
        message: '`name` "not-the-directory" does not match the directory name "sample-skill"',
        subject: 'sample-skill'
      }
    ])
    const expected = source
      .replace('name: not-the-directory', 'name: sample-skill')
      .replace('references\\example.md', 'references/example.md')
    expect(await repair('NAME-5')(context)).toEqual({ writes: [{ path: 'sample-skill/SKILL.md', content: expected }] })
    expect(await repair('LAY-4')(context)).toEqual({ writes: [{ path: 'sample-skill/SKILL.md', content: expected }] })
    expect(await readFile(join(directory, 'SKILL.md'), 'utf8')).toBe(source)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
