import { expect, test } from 'bun:test'
import definition from './index.ts'

test('retains binding audit coverage without declaring user-home repairs', async () => {
  const family = definition.families.find((candidate) => candidate.code === 'BIND')
  expect(family?.items.map((item) => item.code)).toEqual(['BIND-1', 'BIND-2', 'BIND-3', 'BIND-4', 'BIND-5'])

  const projectLinks = family?.items.find((item) => item.code === 'BIND-3')
  expect(projectLinks?.kind).toBe('mechanical')
  if (!projectLinks || projectLinks.kind !== 'mechanical') throw new Error('BIND-3 must be mechanical')
  expect(await projectLinks.audit({ repository: '/repo' } as never)).toEqual([
    {
      status: 'NOT_APPLICABLE',
      message: 'Project-local runtime links are outside the native repository audit scope.',
      subject: '/repo'
    }
  ])

  const cowork = family?.items.find((item) => item.code === 'BIND-4')
  expect(cowork?.kind).toBe('mechanical')
  if (!cowork || cowork.kind !== 'mechanical') throw new Error('BIND-4 must be mechanical')
  expect((cowork as { readonly repair?: unknown }).repair).toBeUndefined()
})
