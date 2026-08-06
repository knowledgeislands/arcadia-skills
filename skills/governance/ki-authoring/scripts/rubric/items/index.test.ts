import { afterEach, expect, test } from 'bun:test'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createAuthoringSession, EDITORCONFIG_DEFAULT, MARKDOWNLINT_DEFAULT, PRETTIER_DEFAULT, PRETTIER_IGNORE_DEFAULT } from '../contexts/authoring.ts'
import catalogue, * as indexModule from './index.ts'
import * as markdownModule from './markdown.ts'
import * as ownedModule from './owned.ts'
import * as synchronisationModule from './sync.ts'
import * as tomlModule from './toml.ts'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const temporaryRepository = (): string => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-authoring-'))
  temporaryDirectories.push(repository)
  return repository
}

test('the default export is the sole catalogue entrypoint and families are complete modules', () => {
  expect(Object.keys(indexModule)).toEqual(['default'])
  expect(Object.keys(markdownModule)).toEqual(['MARKDOWN'])
  expect(Object.keys(ownedModule)).toEqual(['OWNED'])
  expect(Object.keys(tomlModule)).toEqual(['TOML'])
  expect(Object.keys(synchronisationModule)).toEqual(['SYNCHRONISATION'])
  expect(catalogue.families.map((family) => family.code)).toEqual(['RUBRIC', 'MD', 'OWN', 'TOML', 'SYNC'])
  expect(catalogue.families.filter((family) => family.code !== 'RUBRIC').flatMap((family) => family.items.map((item) => item.code))).toEqual([
    'MD-mech',
    'MD-frontmatter',
    'MD-table',
    'MD-footnote',
    'MD-link',
    'MD-cell-prose',
    'MD-callout',
    'OWN-1',
    'TOML-keys',
    'TOML-values',
    'TOML-tables',
    'TOML-comments',
    'SYNC-1'
  ])
})

test('conform retains drafts, coalesces writes, and leaves publication to the host', () => {
  const repository = temporaryRepository()
  writeFileSync(join(repository, '.prettierrc.json'), '{}\n')
  let inspections = 0
  const session = createAuthoringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => {
    inspections += 1
    return { clean: false, detail: 'formatter drift' }
  })
  const subject = session.subjects[1]
  const context = subject?.context()
  const markdown = markdownModule.MARKDOWN.items[0]
  const owned = ownedModule.OWNED.items[0]

  expect(inspections).toBe(1)
  expect(subject?.context()).toBe(context)
  expect(markdown?.mechanical?.audit.run(context?.markdown as NonNullable<typeof context>['markdown'])[0]?.status).toBe('VIOLATION')
  expect(owned?.mechanical?.audit.run(context?.owned as NonNullable<typeof context>['owned']).map((outcome) => outcome.status)).toEqual([
    'VIOLATION',
    'VIOLATION',
    'VIOLATION',
    'VIOLATION'
  ])

  owned?.mechanical?.conform?.run(context?.owned as NonNullable<typeof context>['owned'])
  owned?.mechanical?.conform?.run(context?.owned as NonNullable<typeof context>['owned'])
  markdown?.mechanical?.conform?.run(context?.markdown as NonNullable<typeof context>['markdown'])

  expect(session.proposal()).toEqual({
    writes: [
      { path: '.prettierrc.json', content: PRETTIER_DEFAULT },
      { path: '.editorconfig', content: EDITORCONFIG_DEFAULT, create: true },
      { path: '.prettierignore', content: PRETTIER_IGNORE_DEFAULT, create: true },
      { path: '.markdownlint-cli2.jsonc', content: MARKDOWNLINT_DEFAULT, create: true }
    ],
    commands: [
      {
        program: 'bunx',
        arguments: [
          'prettier',
          '--write',
          '**/*.md',
          '!src/generated/**',
          '!.claude/commands/**',
          '!.claude/skills/**',
          '!.claude/agents/**',
          '!.agents/skills/**',
          '!+/_TRADES/*/*/TRD-*.md',
          '!-/_TRADES/*/*/TRD-*.md',
          '--ignore-path',
          '.gitignore',
          '--ignore-path',
          '.prettierignore'
        ]
      },
      { program: 'bunx', arguments: ['markdownlint-cli2', '--fix'] }
    ]
  })
  expect(readFileSync(join(repository, '.prettierrc.json'), 'utf8')).toBe('{}\n')
  expect(existsSync(join(repository, '.editorconfig'))).toBe(false)
  expect(existsSync(join(repository, '.prettierignore'))).toBe(false)
  expect(existsSync(join(repository, '.markdownlint-cli2.jsonc'))).toBe(false)
})

test('submitted trade records are never normalized, while preparation and README Markdown remain authored', () => {
  const repository = temporaryRepository()
  const submitted = join(repository, '+', '_TRADES', 'peer', 'repo')
  const preparation = join(repository, '-', '_TRADES', '_PREPARATIONS', 'peer', 'repo')
  const outbound = join(repository, '-', '_TRADES', 'peer', 'repo')
  mkdirSync(submitted, { recursive: true })
  mkdirSync(preparation, { recursive: true })
  mkdirSync(outbound, { recursive: true })
  mkdirSync(join(repository, '+', '_TRADES'), { recursive: true })
  writeFileSync(join(submitted, 'TRD-00000001.md'), '---\nid: "TRD-00000001"\n---\n\n# Submitted\n')
  writeFileSync(join(outbound, 'TRD-malformed.md'), '---\nid: "TRD-malformed"\n---\n\n# Submitted\n')
  writeFileSync(join(preparation, 'TRD-00000002.md'), '---\nid: "TRD-00000002"\n---\n\n# Preparation\n')
  writeFileSync(join(repository, '+', '_TRADES', 'README.md'), '---\nid: "trade-readme"\n---\n\n# Trade README\n')

  const session = createAuthoringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => ({ clean: true }))
  const context = session.subjects[1]?.context()
  const frontmatter = markdownModule.MARKDOWN.items.find((item) => item.code === 'MD-frontmatter')

  expect(context?.markdown.frontmatter.files.map((file) => file.path)).toEqual(['+/_TRADES/README.md', '-/_TRADES/_PREPARATIONS/peer/repo/TRD-00000002.md'])

  frontmatter?.mechanical?.conform?.run(context?.markdown as NonNullable<typeof context>['markdown'])

  expect(session.proposal().writes).toEqual([
    { path: '+/_TRADES/README.md', content: '---\nid: trade-readme\n---\n\n# Trade README\n' },
    { path: '-/_TRADES/_PREPARATIONS/peer/repo/TRD-00000002.md', content: '---\nid: TRD-00000002\n---\n\n# Preparation\n' }
  ])
  expect(readFileSync(join(submitted, 'TRD-00000001.md'), 'utf8')).toContain('id: "TRD-00000001"')
  expect(readFileSync(join(outbound, 'TRD-malformed.md'), 'utf8')).toContain('id: "TRD-malformed"')
})

test('frontmatter conform removes only safely unnecessary scalar quotes', () => {
  const repository = temporaryRepository()
  writeFileSync(
    join(repository, 'guide.md'),
    '---\nid: \'DOTFILES-UE-001\'\nname: "agent"\nenabled: "true"\nrelease: "2026-08-05"\ntitle: "A value: with punctuation"\n---\n\n# Guide\n'
  )
  const session = createAuthoringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => ({ clean: true }))
  const context = session.subjects[1]?.context()
  const frontmatter = markdownModule.MARKDOWN.items.find((item) => item.code === 'MD-frontmatter')

  expect(frontmatter?.mechanical?.audit.run(context?.markdown as NonNullable<typeof context>['markdown'])).toEqual([
    {
      status: 'VIOLATION',
      message: 'frontmatter has 2 unnecessarily quoted bare-safe scalars',
      subject: 'guide.md'
    }
  ])

  frontmatter?.mechanical?.conform?.run(context?.markdown as NonNullable<typeof context>['markdown'])

  expect(session.proposal().writes).toEqual([
    {
      path: 'guide.md',
      content: '---\nid: DOTFILES-UE-001\nname: agent\nenabled: "true"\nrelease: "2026-08-05"\ntitle: "A value: with punctuation"\n---\n\n# Guide\n'
    }
  ])
})

test('owned-file conform refuses to propose a write through a symlink', () => {
  const repository = temporaryRepository()
  const outside = join(temporaryRepository(), 'outside')
  writeFileSync(outside, 'do not replace\n')
  symlinkSync(outside, join(repository, '.editorconfig'))
  const session = createAuthoringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => ({ clean: true }))
  const context = session.subjects[1]?.context()
  const owned = ownedModule.OWNED.items[0]

  expect(context?.owned.files.find((file) => file.name === '.editorconfig')?.state).toBe('unsafe')
  owned?.mechanical?.conform?.run(context?.owned as NonNullable<typeof context>['owned'])

  expect(session.proposal().writes.some((write) => write.path === '.editorconfig')).toBe(false)
  expect(readFileSync(outside, 'utf8')).toBe('do not replace\n')
})
