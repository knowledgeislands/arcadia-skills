import { expect, test } from 'bun:test'
import catalogue from './index.ts'

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
