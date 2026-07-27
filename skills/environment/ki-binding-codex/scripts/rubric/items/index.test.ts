import { expect, test } from 'bun:test'
import catalogue from './index.ts'

test('the Codex catalogue is independently complete', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-binding-codex')
  expect(catalogue.families[0]?.items.map((item) => item.code)).toEqual(['CODEXBIND-1', 'CODEXBIND-J1'])
})
