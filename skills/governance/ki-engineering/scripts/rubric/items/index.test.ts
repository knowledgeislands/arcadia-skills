import { afterEach, expect, test } from 'bun:test'
import { mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricFamily } from '../../shared/rubric.ts'
import {
  createEngineeringSession,
  type EngineeringRubricContext,
  type KnipRubricContext,
  type PackageRubricContext,
  type ScriptsRubricContext
} from '../contexts/engineering.ts'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const familyModules = readdirSync(import.meta.dir)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.test.ts'))
  .sort()

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

test('the structured catalogue preserves the engineering criteria', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-engineering')
  expect(catalogue.createSession).toBeFunction()
  expect(catalogue.families.map((family) => family.code)).toEqual([
    'RUBRIC',
    'PKG',
    'MISE',
    'CI',
    'SCR',
    'BUN',
    'TSC',
    'BIO',
    'KNIP',
    'SYNC',
    'DEPS',
    'GEN',
    'TEST',
    'BUILD',
    'ENV',
    'TOML'
  ])
  const codes = catalogue.families.filter((family) => family.code !== 'RUBRIC').flatMap((family) => family.items.map((item) => item.code))
  expect(codes).toHaveLength(48)
  expect(new Set(codes).size).toBe(codes.length)
  expect(codes[0]).toBe('PKG-1')
  expect(codes.at(-1)).toBe('TOML-2')
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

test('the session keeps stable focused context and coalesces package drafts', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-'))
  temporaryDirectories.push(repository)
  writeFileSync(
    join(repository, 'package.json'),
    '{"name":"example","scripts":{"ki:all":"ki repo audit","ki:engineering:check":"ki repo audit --skill ki-engineering","ki:authoring:fix":"ki repo conform --skill ki-authoring","ki:eval":"bun evals/harness.ts"}}\n'
  )
  const session = createEngineeringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => [
    { level: 'FAIL', code: 'PKG-1', message: 'type missing', subject: 'package.json' },
    { level: 'FAIL', code: 'PKG-2', message: 'package manager missing', subject: 'package.json' }
  ])
  const root = session.subjects[1]?.context()
  expect(session.subjects[1]?.context()).toBe(root)

  const family = catalogue.families.find((candidate) => candidate.code === 'PKG') as RubricFamily<EngineeringRubricContext, PackageRubricContext>
  const context = family.selectContext(root as EngineeringRubricContext)
  expect(family.items[0]?.mechanical?.audit.run(context)[0]?.status).toBe('VIOLATION')
  family.items[0]?.mechanical?.conform?.run(context)
  family.items[1]?.mechanical?.conform?.run(context)

  const writes = session.proposal().writes
  expect(writes).toHaveLength(1)
  expect(writes[0]?.path).toBe('package.json')
  expect(writes[0]?.content).not.toContain('ki repo audit')
  expect(writes[0]?.content).not.toContain('ki repo conform')
  expect(JSON.parse(writes[0]?.content ?? '{}').scripts['ki:eval']).toBe('bun evals/harness.ts')
  expect(JSON.parse(writes[0]?.content ?? '{}').type).toBe('module')
})

test('SCR-2 proposes removal for any whole-repository or focused native governance wrapper', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-'))
  temporaryDirectories.push(repository)
  writeFileSync(
    join(repository, 'package.json'),
    '{"scripts":{"ki:all":"ki repo audit","ki:engineering:check":"ki repo audit --skill ki-engineering","ki:authoring:fix":"ki repo conform --skill ki-authoring","ki:eval":"bun evals/harness.ts"}}\n'
  )
  const session = createEngineeringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => [
    { level: 'FAIL', code: 'SCR-2', message: 'native governance wrappers present', subject: 'package.json' }
  ])
  const root = session.subjects[1]?.context() as EngineeringRubricContext
  const family = catalogue.families.find((candidate) => candidate.code === 'SCR') as RubricFamily<EngineeringRubricContext, ScriptsRubricContext>
  family.items.find((candidate) => candidate.code === 'SCR-2')?.mechanical?.conform?.run(family.selectContext(root))

  const scripts = JSON.parse(session.proposal().writes[0]?.content ?? '{}').scripts
  expect(scripts).toEqual({ 'ki:deps:update': 'bun update --latest', 'ki:eval': 'bun evals/harness.ts', clean: 'rm -rf dist node_modules', prepare: 'husky' })
})

test('guarded remedies do not expose unsafe command conform actions', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-'))
  temporaryDirectories.push(repository)
  writeFileSync(join(repository, 'package.json'), '{}\n')
  const session = createEngineeringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => [
    { level: 'FAIL', code: 'BIO-1', message: 'formatting drift' },
    { level: 'FAIL', code: 'KNIP-2', message: 'unused export' },
    { level: 'WARN', code: 'DEPS-1', message: 'dependency update available' }
  ])
  for (const [familyCode, itemCode] of [
    ['BIO', 'BIO-1'],
    ['KNIP', 'KNIP-2'],
    ['DEPS', 'DEPS-1']
  ] as const) {
    const family = catalogue.families.find((candidate) => candidate.code === familyCode)
    expect(family?.items.find((item) => item.code === itemCode)?.mechanical?.conform).toBeUndefined()
  }
  expect(session.proposal().commands).toBeUndefined()
})

test('conform never replaces a symlinked contributed package file', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-'))
  temporaryDirectories.push(repository)
  const source = join(repository, 'package-source.json')
  writeFileSync(source, '{}\n')
  symlinkSync(source, join(repository, 'package.json'))
  const session = createEngineeringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => [
    { level: 'FAIL', code: 'PKG-1', message: 'type missing' }
  ])
  const root = session.subjects[1]?.context() as EngineeringRubricContext
  root.package.synchronise?.()
  expect(session.proposal().writes).toEqual([])
  expect(readFileSync(source, 'utf8')).toBe('{}\n')
})

test('knip export coverage is audited without offering a repair', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-engineering-'))
  temporaryDirectories.push(repository)
  writeFileSync(join(repository, 'package.json'), '{}\n')
  const session = createEngineeringSession({ mode: 'conform', repository, userHome: tmpdir(), configuration: {} }, () => [
    { level: 'FAIL', code: 'KNIP-3', message: 'export "./cli" is unreachable', subject: 'knip.json' }
  ])
  const root = session.subjects[1]?.context() as EngineeringRubricContext
  const family = catalogue.families.find((candidate) => candidate.code === 'KNIP') as RubricFamily<EngineeringRubricContext, KnipRubricContext>
  const item = family.items.find((candidate) => candidate.code === 'KNIP-3')

  // Choosing which entry glob to add is a judgment call, so KNIP-3 never proposes a
  // conform action — and in particular never reaches for the `knip --fix` repair that
  // would delete the very exports this criterion protects.
  expect(item?.mechanical?.conform).toBeUndefined()
  expect(item?.mechanical?.audit.run(family.selectContext(root))).toEqual([
    { status: 'VIOLATION', message: 'export "./cli" is unreachable', subject: 'knip.json' }
  ])
  expect(session.proposal().commands).toBeUndefined()
})
