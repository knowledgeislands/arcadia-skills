import { expect, test } from 'bun:test'
import definition from './index.ts'

test('the catalogue exposes the complete ordered trade contract', () => {
  expect(definition.contract).toBe(1)
  expect(definition.name).toBe('ki-trades')
  expect(definition.createSession).toBeFunction()
  expect(definition.families.map((family) => family.code)).toEqual(['RUBRIC', 'CONFIG', 'ROUTE', 'SCAFFOLD', 'RECORD', 'AUTH', 'STATUS', 'RELEASE', 'ADOPTION'])
  expect(definition.families.flatMap((family) => family.items.map((item) => item.code))).toEqual([
    'RUBRIC-1',
    'CONFIG-1',
    'ROUTE-1',
    'SCAFFOLD-1',
    'RECORD-1',
    'AUTH-1',
    'STATUS-1',
    'RELEASE-1',
    'ADOPTION-1'
  ])
})

test('the catalogue and family modules keep narrow public surfaces', async () => {
  expect(Object.keys(await import('./index.ts'))).toEqual(['default'])
  for (const file of ['adoption', 'authority', 'configuration', 'publication', 'records', 'release', 'routes', 'scaffold', 'status']) {
    const module = (await import(`./${file}.ts`)) as Record<string, unknown>
    expect(Object.keys(module)).toHaveLength(1)
  }
})
