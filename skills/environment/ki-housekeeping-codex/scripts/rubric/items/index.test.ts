import { describe, expect, test } from 'bun:test'
import definition from './index.ts'

describe('Codex housekeeping catalogue', () => {
  test('owns only the two safety judgments and generated publication', () => {
    expect(definition.families.flatMap((family) => family.items.map((item) => item.code))).toEqual([
      'STATE-1',
      'STATE-2',
      'RUBRIC-1'
    ])
  })

  test('keeps destructive state judgments non-mechanical', () => {
    const state = definition.families.find(({ code }) => code === 'STATE')
    expect(state?.items.every((item) => !('mechanical' in item) && 'judgment' in item)).toBe(true)
  })
})
