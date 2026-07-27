import { describe, expect, test } from 'bun:test'
import definition from './index.ts'

describe('ki-tokenomics rubric catalogue', () => {
  test('owns only portable policy', () => {
    expect(definition.families.map((family) => family.code)).toEqual(['CFG', 'POL', 'RUBRIC'])
    expect(Object.keys(definition)).not.toContain('scope')
  })
})
