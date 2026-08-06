import { expect, test } from 'bun:test'
import definition from './index.ts'

test('the catalogue keeps guarded packet review separate from automatic heading repair', () => {
  expect(definition.contract).toBe(1)
  const items = definition.families.flatMap((family) => family.items) as unknown as readonly {
    code: string
    mechanical?: { remediation: { class: string } }
    judgment?: { scope: string; prompt: string; outcomes: readonly string[]; guidance: string }
  }[]

  expect(items.map((item) => item.code)).toEqual(['PACKET-1', 'PACKET-2'])
  expect(items.filter((item) => item.mechanical?.remediation.class === 'automatic').map((item) => item.code)).toEqual(['PACKET-2'])
  expect(items.find((item) => item.code === 'PACKET-1')).toMatchObject({
    mechanical: { remediation: { class: 'guarded' } },
    judgment: { scope: expect.any(String), prompt: expect.any(String), outcomes: expect.any(Array), guidance: expect.any(String) }
  })
})
