import { expect, test } from 'bun:test'
import definition from './index.ts'

test('the catalogue exposes the ordered Guides criteria', () => {
  expect(definition.contract).toBe(1)
  expect(definition.name).toBe('ki-guides')
  expect(definition.createSession).toBeFunction()
  expect(definition.families.map((family) => family.code)).toEqual(['RUBRIC', 'GUIDE', 'ROUTE'])
  expect(definition.families.filter((family) => family.code !== 'RUBRIC').flatMap((family) => family.items.map((item) => item.code))).toEqual([
    'GUIDE-1',
    'GUIDE-2',
    'GUIDE-3',
    'ROUTE-1',
    'ROUTE-2'
  ])
})

test('the catalogue and family modules keep their public surfaces narrow', async () => {
  expect(Object.keys(await import('./index.ts'))).toEqual(['default'])
  for (const file of ['guides', 'routing']) {
    const module = (await import(`./${file}.ts`)) as Record<string, unknown>
    expect(Object.keys(module)).toHaveLength(1)
  }
})
