import { expect, test } from 'bun:test'
import { resolve } from 'node:path'
import { createGitSession } from './git.ts'

test('the Git session exposes one immutable review subject and no writes', () => {
  const session = createGitSession({
    mode: 'audit',
    repository: '.',
    userHome: '/unused',
    configuration: {}
  })

  expect(session.subjects).toHaveLength(1)
  expect(session.subjects[0]?.families).toEqual(['COMMIT', 'BRANCH', 'HYGIENE', 'LOCK'])
  expect(session.subjects[0]?.subject).toBe(resolve('.'))
  expect(session.subjects[0]?.context()).toEqual({ repository: resolve('.'), mode: 'audit' })
  expect(session.proposal()).toEqual({ writes: [] })
})
