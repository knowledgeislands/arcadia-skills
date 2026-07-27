import { describe, expect, test } from 'bun:test'
import definition from './index.ts'

describe('Codex tokenomics catalogue', () => {
  test('owns only Codex evidence and explicit unavailable metrics', () =>
    expect(definition.families.flatMap((family) => family.items.map((item) => item.code))).toEqual(['CODEX-SURF-1', 'CODEX-NA-1']))
})
