import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricFamily } from '../../shared/rubric.ts'
import { type CodexBindingContext, createCodexBindingSession } from '../contexts/codex.ts'
import catalogue from './index.ts'

const temporaryDirectories: string[] = []
const originalMcpSource = process.env.KI_MCP_SOURCE
afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
  if (originalMcpSource === undefined) delete process.env.KI_MCP_SOURCE
  else process.env.KI_MCP_SOURCE = originalMcpSource
})

test('the Codex catalogue is independently complete', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-binding-codex')
  expect(catalogue.families[0]?.items.map((item) => item.code)).toEqual(['CODEXBIND-1', 'CODEXBIND-J1'])
})

test('the Codex criteria expose complete v1 remediation and review metadata', () => {
  const items = catalogue.families[0]?.items ?? []
  const mechanical = items.find((item) => item.code === 'CODEXBIND-1')?.mechanical
  const judgment = items.find((item) => item.code === 'CODEXBIND-J1')?.judgment

  expect(mechanical?.remediation.class).toBe('diagnostic')
  expect(judgment?.scope).not.toBeEmpty()
  expect(judgment?.outcomes.length).toBeGreaterThan(0)
  expect(judgment?.guidance).not.toBeEmpty()
})

test('the Codex target compares complete definitions rather than names', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-binding-codex-repository-'))
  const home = mkdtempSync(join(tmpdir(), 'ki-binding-codex-home-'))
  temporaryDirectories.push(repository, home)
  const source = join(home, 'mcp-servers.yaml')
  process.env.KI_MCP_SOURCE = source
  mkdirSync(join(home, '.codex'), { recursive: true })
  writeFileSync(
    source,
    'mcpServers:\n  - name: ki-url\n    clients: [chatgpt-codex]\n    url: https://example.invalid/mcp\n    transports: { chatgpt-codex: streamable_http }\n'
  )
  writeFileSync(join(home, '.codex', 'config.toml'), '[mcp_servers.ki-url]\nurl = "https://wrong.invalid/mcp"\n')
  const context = createCodexBindingSession({
    mode: 'audit',
    repository,
    userHome: home,
    configuration: {}
  }).subjects[0]?.context() as CodexBindingContext
  const family = catalogue.families[0] as RubricFamily<CodexBindingContext, CodexBindingContext>
  expect(family.items[0]?.mechanical?.audit.run(context)[0]?.status).toBe('VIOLATION')
})
