import { describe, expect, test } from 'bun:test'
import definition from './index.ts'

describe('Claude tokenomics catalogue', () => {
  test('owns only Claude evidence', () =>
    expect(definition.families.flatMap((family) => family.items.map((item) => item.code))).toEqual([
      'CLAUDE-SURF-1',
      'CLAUDE-RUN-1',
      'CLAUDE-RUN-2'
    ]))
})
