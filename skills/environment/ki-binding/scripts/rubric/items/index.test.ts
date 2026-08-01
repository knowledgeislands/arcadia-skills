import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricFamily } from '../../shared/rubric.ts'
import { type BindingRubricContext, createBindingSession } from '../contexts/binding.ts'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const originalMcpSource = process.env.KI_MCP_SOURCE

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
  if (originalMcpSource === undefined) delete process.env.KI_MCP_SOURCE
  else process.env.KI_MCP_SOURCE = originalMcpSource
})
test('the portable catalogue publishes the host-owned rubric criterion', () => {
  expect(catalogue.name).toBe('ki-binding')
  expect(catalogue.families.map((family) => family.code)).toEqual(['BIND', 'RUBRIC'])
  expect(catalogue.families[0]?.items.map((item) => item.code)).toEqual(['BIND-1', 'BIND-2', 'BIND-J1'])
  expect(catalogue.families[1]?.items.map((item) => item.code)).toEqual(['RUBRIC-1'])
})
test('the session compares only mcporter against a canonical source', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-binding-repository-'))
  const userHome = mkdtempSync(join(tmpdir(), 'ki-binding-home-'))
  temporaryDirectories.push(repository, userHome)
  mkdirSync(join(userHome, '.config', 'ki'), { recursive: true })
  mkdirSync(join(userHome, '.mcporter'), { recursive: true })
  writeFileSync(join(userHome, '.config', 'ki', 'mcp-servers.yaml'), 'mcpServers:\n  - name: ki-example\n    clients: [mcporter]\n    command: node\n')
  writeFileSync(join(userHome, '.mcporter', 'mcporter.json'), '{"mcpServers":{"ki-example":{}}}\n')
  delete process.env.KI_MCP_SOURCE
  const context = createBindingSession({
    mode: 'audit',
    repository,
    userHome,
    configuration: {}
  }).subjects[0]?.context() as BindingRubricContext
  expect(context.mcporterServerKeys).toEqual(new Set(['ki-example']))
  const family = catalogue.families[0] as RubricFamily<BindingRubricContext, BindingRubricContext>
  expect(family.items[0]?.mechanical?.audit.run(context)[0]?.status).toBe('PASS')
})

test('the session honours an explicit MCP source override', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-binding-repository-'))
  const userHome = mkdtempSync(join(tmpdir(), 'ki-binding-home-'))
  temporaryDirectories.push(repository, userHome)
  const source = join(userHome, 'mcp-servers.yaml')
  writeFileSync(source, 'mcpServers:\n  - name: ki-example\n    clients: [mcporter]\n    command: node\n')
  process.env.KI_MCP_SOURCE = source

  const context = createBindingSession({
    mode: 'audit',
    repository,
    userHome,
    configuration: {}
  }).subjects[0]?.context() as BindingRubricContext

  expect(context.source).toBe(source)
  expect(context.sourceState).toMatchObject({ kind: 'valid' })
})
test('family modules export only one complete family', async () => {
  for (const file of readdirSync(import.meta.dir).filter((file) => file.endsWith('.ts') && file !== 'index.ts' && !file.endsWith('.test.ts'))) {
    const module = (await import(`./${file}`)) as Record<string, unknown>
    expect(Object.keys(module)).toHaveLength(1)
  }
})
