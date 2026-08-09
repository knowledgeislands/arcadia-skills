import { expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolveBatchAuthorisation } from './internal/authorisation.ts'

const repository = 'https://github.com/knowledgeislands/ki-agentic-harness'
const now = new Date('2026-08-09T12:00:00Z')

const record = (overrides: readonly string[] = []): string =>
  `---\nid: KI-HARNESS-BATCH-001\nrepository: ${repository}\napproved: true\napproved_at: 2026-08-09T11:00:00Z\ntimebox_ends_at: 2026-08-09T13:00:00Z\nitem_ids: [KI-HARNESS-FND-013]\ncompletion_target: awaiting-review\nmandatory_stops: [unapproved-decision]\n${overrides.join('\n')}\n---\n\n# KI-HARNESS-BATCH-001 — Test batch\n`

const fixture = (contents = record()): { root: string; path: string } => {
  const root = mkdtempSync(join(tmpdir(), 'ki-batch-authorisation-'))
  const directory = join(root, '+', '_AUTHORISATIONS')
  mkdirSync(directory, { recursive: true })
  const path = join(directory, 'KI-HARNESS-BATCH-001.md')
  writeFileSync(path, contents)
  return { root, path }
}

const resolveFixture = (contents?: string) => {
  const { root, path } = fixture(contents)
  return resolveBatchAuthorisation({
    repositoryRoot: root,
    authorisationPath: path,
    repositoryIdentity: repository,
    now
  })
}

test('resolves one approved, local, active canonical batch authorisation without writes', () => {
  expect(resolveFixture()).toEqual({
    kind: 'resolved',
    authorisation: {
      id: 'KI-HARNESS-BATCH-001',
      repository,
      approved: true,
      approvedAt: '2026-08-09T11:00:00Z',
      timeboxEndsAt: '2026-08-09T13:00:00Z',
      itemIds: ['KI-HARNESS-FND-013'],
      completionTarget: 'awaiting-review',
      mandatoryStops: ['unapproved-decision'],
      closureItemIds: []
    },
    writes: false
  })
})

test('stops without writes for absent, malformed, foreign, expired, or unapproved authority', () => {
  const { root } = fixture()
  expect(
    resolveBatchAuthorisation({
      repositoryRoot: root,
      authorisationPath: join(root, 'missing.md'),
      repositoryIdentity: repository,
      now
    })
  ).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation is not a canonical local record',
    writes: false
  })
  expect(resolveFixture('not frontmatter\n')).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation has invalid frontmatter',
    writes: false
  })
  expect(resolveFixture(record().replace(repository, 'https://github.com/example/foreign'))).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation names another repository',
    writes: false
  })
  expect(
    resolveFixture(record().replace('timebox_ends_at: 2026-08-09T13:00:00Z', 'timebox_ends_at: 2026-08-09T11:00:00Z'))
  ).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation timebox has expired',
    writes: false
  })
  expect(
    resolveFixture(
      record()
        .replace('approved: true', 'approved: false')
        .replace('approved_at: 2026-08-09T11:00:00Z', 'approved_at: null')
    )
  ).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation is not approved',
    writes: false
  })
})

test('stops without writes for a non-canonical file or an invalid closure grant', () => {
  const { root } = fixture()
  expect(
    resolveBatchAuthorisation({
      repositoryRoot: root,
      authorisationPath: join(root, 'outside.md'),
      repositoryIdentity: repository,
      now
    })
  ).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation is not a canonical local record',
    writes: false
  })
  expect(resolveFixture(record(['closure_item_ids: [KI-HARNESS-GOV-028]']))).toMatchObject({
    kind: 'stop',
    reason: 'batch authorisation grants closure outside its named items',
    writes: false
  })
})
