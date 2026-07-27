import { expect, test } from 'bun:test'
import catalogue from './index.ts'

test('the Claude catalogue is independently complete', () => {
  expect(catalogue.contract).toBe(1)
  expect(catalogue.name).toBe('ki-binding-claude')
  expect(catalogue.families[0]?.items.map((item) => item.code)).toEqual(['CLAUDEBIND-1', 'CLAUDEBIND-2', 'CLAUDEBIND-J1'])
})
