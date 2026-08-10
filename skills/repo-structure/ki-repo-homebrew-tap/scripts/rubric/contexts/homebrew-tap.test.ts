import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricContextOptions } from '../../shared/rubric.ts'
import { CONFIG } from '../items/config.ts'
import { TAP } from '../items/tap.ts'
import {
  collectHomebrewValidation,
  createHomebrewTapSession,
  type HomebrewCommandRunner,
  type HomebrewValidationCollector
} from './homebrew-tap.ts'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const temporaryDirectory = (prefix: string): string => {
  const directory = mkdtempSync(join(tmpdir(), prefix))
  temporaryDirectories.push(directory)
  return directory
}

const options = (repository: string, mode: 'audit' | 'conform'): RubricContextOptions => ({
  mode,
  repository,
  userHome: tmpdir(),
  configuration: {}
})

const fixture = (): { readonly repository: string; readonly config: string; readonly original: string } => {
  const repository = temporaryDirectory('ki-repo-homebrew-tap-')
  mkdirSync(join(repository, 'Formula'))
  writeFileSync(
    join(repository, 'Formula', 'mgit.rb'),
    [
      'class Mgit < Formula',
      '  desc "Run commands across many repositories"',
      '  homepage "https://example.com/tools-mgit"',
      '  url "https://example.com/archive/refs/tags/v1.0.0.tar.gz"',
      '  sha256 "abc"',
      '  license "MIT"',
      '  def install',
      '    bin.install "bin/mgit"',
      '  end',
      '  test do',
      '    system "#{bin}/mgit", "--version"',
      '  end',
      'end',
      ''
    ].join('\n')
  )
  writeFileSync(join(repository, 'README.md'), '# Tap\n\n## Formulae\n\n| Formula |\n| --- |\n| `mgit` |\n')
  const config = join(repository, '.ki-config.toml')
  const original = '[skills.ki-repo]\n'
  writeFileSync(config, original)
  return { repository, config, original }
}

const rootContext = (session: Awaited<ReturnType<typeof createHomebrewTapSession>>) => {
  const subject = session.subjects[0]
  if (!subject) throw new Error('ki-repo-homebrew-tap session did not expose its repository subject')
  return { subject, context: subject.context() }
}

const tapItem = (code: string) => {
  const item = TAP.items.find((candidate) => candidate.code === code)
  if (!item?.mechanical) throw new Error(`${code} mechanical item is missing`)
  return item.mechanical
}

const configItem = () => {
  const item = CONFIG.items.find((candidate) => candidate.code === 'CONFIG-1')
  if (!item?.mechanical) throw new Error('CONFIG-1 mechanical item is missing')
  return item.mechanical
}

const passingHomebrew: HomebrewCommandRunner = async (arguments_, cwd) => {
  if (arguments_[0] === 'tap') return { ok: true, stdout: 'knowledgeislands/tap\n' }
  if (arguments_[0] === '--repository') return { ok: true, stdout: cwd }
  return { ok: true, stdout: '' }
}

const validation =
  (runner: HomebrewCommandRunner = passingHomebrew): HomebrewValidationCollector =>
  (repository, formulae) =>
    collectHomebrewValidation(repository, formulae, runner)

test('audit is read-only, stable, applicable, and reports passing Homebrew validation', async () => {
  const { repository, config, original } = fixture()
  const session = await createHomebrewTapSession(options(repository, 'audit'), validation())
  const { subject, context } = rootContext(session)

  expect(subject.context()).toBe(subject.context())
  expect(context.config.addMarker).toBeUndefined()
  expect(tapItem('TAP-1').audit.run(TAP.selectContext(context))[0]?.status).toBe('PASS')
  expect(configItem().audit.run(CONFIG.selectContext(context))[0]?.status).toBe('VIOLATION')
  expect(tapItem('TAP-7').audit.run(TAP.selectContext(context))).toEqual([
    {
      status: 'PASS',
      message: 'Homebrew style and strict audit passed.',
      subject: 'Formula/mgit.rb'
    }
  ])
  expect(session.proposal()).toEqual({ writes: [] })
  expect(readFileSync(config, 'utf8')).toBe(original)
})

test('CONFIG-1 coalesces an idempotent marker repair into one session proposal', async () => {
  const { repository, config, original } = fixture()
  const session = await createHomebrewTapSession(options(repository, 'conform'), validation())
  const { context } = rootContext(session)
  const configContext = CONFIG.selectContext(context)

  configItem().conform?.run(configContext)
  configItem().conform?.run(configContext)

  expect(session.proposal()).toEqual({
    writes: [
      {
        path: '.ki-config.toml',
        content: `${original}\n# This repo is a Knowledge Islands Homebrew tap.\n[skills.ki-repo-homebrew-tap]\n`
      }
    ]
  })
  expect(readFileSync(config, 'utf8')).toBe(original)
})

test('a symlinked config is reported but never proposed for replacement', async () => {
  const repository = temporaryDirectory('ki-repo-homebrew-tap-root-')
  const outside = join(temporaryDirectory('ki-repo-homebrew-tap-outside-'), 'config.toml')
  mkdirSync(join(repository, 'Formula'))
  writeFileSync(join(repository, 'Formula', 'mgit.rb'), 'class Mgit < Formula\n')
  writeFileSync(outside, '[skills.ki-repo]\n')
  symlinkSync(outside, join(repository, '.ki-config.toml'))
  const session = await createHomebrewTapSession(options(repository, 'conform'), validation())
  const { context } = rootContext(session)
  const configContext = CONFIG.selectContext(context)

  configItem().conform?.run(configContext)

  expect(configItem().audit.run(configContext)[0]?.message).toContain('not a regular file')
  expect(session.proposal()).toEqual({ writes: [] })
  expect(readFileSync(outside, 'utf8')).toBe('[skills.ki-repo]\n')
})

test('an unrelated repository is not applicable', async () => {
  const repository = temporaryDirectory('ki-repo-homebrew-tap-unrelated-')
  const session = await createHomebrewTapSession(options(repository, 'audit'), validation())
  const { context } = rootContext(session)

  expect(tapItem('TAP-1').audit.run(TAP.selectContext(context))[0]?.status).toBe('NOT_APPLICABLE')
  expect(tapItem('TAP-7').audit.run(TAP.selectContext(context))[0]?.status).toBe('NOT_APPLICABLE')
  expect(configItem().audit.run(CONFIG.selectContext(context))[0]?.status).toBe('NOT_APPLICABLE')
})

test('TAP-7 reports a single warning only when Homebrew is unavailable', async () => {
  const { repository } = fixture()
  const unavailable: HomebrewCommandRunner = async () => ({ ok: false, stdout: '', unavailable: true })
  const session = await createHomebrewTapSession(options(repository, 'audit'), validation(unavailable))
  const { context } = rootContext(session)

  expect(tapItem('TAP-7').audit.run(TAP.selectContext(context))).toEqual([
    {
      status: 'VIOLATION',
      message: 'Homebrew is unavailable, so TAP-7 could not validate the formulae.',
      subject: 'Formula/'
    }
  ])
})

test('TAP-7 reports Homebrew failures against the formula that produced them', async () => {
  const { repository } = fixture()
  const failing: HomebrewCommandRunner = async (arguments_, cwd) => {
    if (arguments_[0] === 'tap') return { ok: true, stdout: 'knowledgeislands/tap\n' }
    if (arguments_[0] === '--repository') return { ok: true, stdout: cwd }
    if (arguments_[0] === 'audit') return { ok: false, stdout: '', detail: 'formula audit finding' }
    return { ok: true, stdout: '' }
  }
  const session = await createHomebrewTapSession(options(repository, 'audit'), validation(failing))
  const { context } = rootContext(session)

  expect(tapItem('TAP-7').audit.run(TAP.selectContext(context))).toEqual([
    {
      status: 'VIOLATION',
      message: 'Homebrew validation failed. audit: formula audit finding',
      subject: 'Formula/mgit.rb'
    }
  ])
})

test('TAP-7 does not apply an active-tap audit to different formula source', async () => {
  const { repository } = fixture()
  const activeTap = temporaryDirectory('ki-repo-homebrew-tap-active-')
  mkdirSync(join(activeTap, 'Formula'))
  writeFileSync(join(activeTap, 'Formula', 'mgit.rb'), 'class Different < Formula\n')
  const mismatched: HomebrewCommandRunner = async (arguments_) => {
    if (arguments_[0] === 'tap') return { ok: true, stdout: 'knowledgeislands/tap\n' }
    if (arguments_[0] === '--repository') return { ok: true, stdout: activeTap }
    return { ok: true, stdout: '' }
  }
  const session = await createHomebrewTapSession(options(repository, 'audit'), validation(mismatched))
  const { context } = rootContext(session)

  expect(tapItem('TAP-7').audit.run(TAP.selectContext(context))).toEqual([
    {
      status: 'VIOLATION',
      message:
        'No active Homebrew tap has matching formula source, so TAP-7 cannot safely run `brew audit` against this checkout. Register or synchronise the tap, then retry.',
      subject: 'Formula/'
    }
  ])
})
