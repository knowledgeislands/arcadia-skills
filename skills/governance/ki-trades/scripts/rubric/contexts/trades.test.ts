import { afterEach, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { RubricContextOptions } from '../../shared/rubric.ts'
import { AUTH } from '../items/authority.ts'
import { CONFIG } from '../items/configuration.ts'
import { RECORD } from '../items/records.ts'
import { RELEASE } from '../items/release.ts'
import { ROUTE } from '../items/routes.ts'
import { SCAFFOLD } from '../items/scaffold.ts'
import { STATUS } from '../items/status.ts'
import { createTradesSession, tradeReadmes } from './trades.ts'

const temporaryDirectories: string[] = []

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const temporaryDirectory = (prefix: string): string => {
  const directory = mkdtempSync(join(tmpdir(), prefix))
  temporaryDirectories.push(directory)
  return directory
}

const repositoryUrl = (identity: string): string => `https://github.com/${identity}`
const routes = (peers: readonly string[], kinds: readonly ('work' | 'knowledge')[] = ['work', 'knowledge']): Record<string, readonly string[]> => ({
  work: kinds.includes('work') ? peers.map(repositoryUrl) : [],
  knowledge: kinds.includes('knowledge') ? peers.map(repositoryUrl) : []
})
const tradeConfiguration = (_identity: string, peers: readonly string[], kinds?: readonly ('work' | 'knowledge')[]): Record<string, unknown> => ({
  exports_to: routes(peers, kinds),
  imports_from: routes(peers, kinds)
})

const writeRepositoryConfiguration = (root: string, identity: string, peers: readonly string[], kinds?: readonly ('work' | 'knowledge')[]): void => {
  writeFileSync(
    join(root, '.ki-config.toml'),
    [
      '["knowledgeislands/ki-agentic-harness:ki-repo"]',
      `repository = ${JSON.stringify(repositoryUrl(identity))}`,
      '',
      '["knowledgeislands/ki-agentic-harness:ki-trades"]',
      `exports_to = ${JSON.stringify(routes(peers, kinds))}`,
      `imports_from = ${JSON.stringify(routes(peers, kinds))}`,
      ''
    ].join('\n')
  )
}

const scaffold = (root: string): void => {
  mkdirSync(join(root, '+'), { recursive: true })
  mkdirSync(join(root, '-'), { recursive: true })
  for (const readme of tradeReadmes) {
    mkdirSync(join(root, readme.path, '..'), { recursive: true })
    writeFileSync(join(root, readme.path), readme.content)
  }
}

const registry = (home: string, roots: readonly string[]): void => {
  const directory = join(home, '.config', 'ki')
  mkdirSync(directory, { recursive: true })
  writeFileSync(join(directory, 'config.toml'), ['[repositories]', `paths = [${roots.map((root) => JSON.stringify(root)).join(', ')}]`, ''].join('\n'))
}

const fixture = (peerIdentity = 'peer/repo', reciprocal = true) => {
  const home = temporaryDirectory('ki-trades-home-')
  const local = temporaryDirectory('ki-trades-local-')
  const peer = temporaryDirectory('ki-trades-peer-')
  scaffold(local)
  scaffold(peer)
  writeRepositoryConfiguration(local, 'local/repo', ['peer/repo'])
  writeRepositoryConfiguration(peer, peerIdentity, reciprocal ? ['local/repo'] : [])
  registry(home, [local, peer])
  return { home, local, peer }
}

const options = (repository: string, userHome: string, configuration: Record<string, unknown>, mode: 'audit' | 'conform' = 'audit'): RubricContextOptions => ({
  mode,
  repository,
  userHome,
  configuration
})

const record = (
  id: string,
  sender: string,
  receiver: string,
  receiverFields: readonly string[] = [],
  submission = 'Please consider the proposed local outcome.',
  kind: 'work' | 'knowledge' = 'work'
): string =>
  [
    '---',
    `id: ${id}`,
    "title: 'Submission title'",
    "created_at: '2026-08-03T12:00:00Z'",
    `sender: ${sender}`,
    `receiver: ${receiver}`,
    `kind: ${kind}`,
    'source_ref: KI-SOURCE-FND-001',
    ...receiverFields,
    '---',
    '',
    `# ${id}: Submission title`,
    '',
    '## Context',
    '',
    'The sender has relevant originating evidence.',
    '',
    '## Submission',
    '',
    submission,
    '',
    '## Constraints',
    '',
    'The receiver retains roadmap, priority, implementation, and acceptance authority.',
    ''
  ].join('\n')

const writeRecord = (root: string, direction: '+' | '-', peerIdentity: string, id: string, content: string): void => {
  const directory = join(root, direction, '_TRADES', ...peerIdentity.split('/'))
  mkdirSync(directory, { recursive: true })
  writeFileSync(join(directory, `${id}.md`), content)
}

const mechanicalOutcomes = (
  session: ReturnType<typeof createTradesSession>,
  family: typeof CONFIG | typeof ROUTE | typeof SCAFFOLD | typeof RECORD | typeof AUTH | typeof STATUS | typeof RELEASE
) => {
  const item = family.items[0]
  if (!item?.mechanical) throw new Error(`${family.code} has no mechanical item`)
  return item.mechanical.audit.run(family.selectContext(session.subjects[0]?.context() as never))
}

test('malformed, duplicated, and non-normalized declarations are refused', () => {
  const { home, local } = fixture()
  const session = createTradesSession(options(local, home, tradeConfiguration('Local/Repo', ['peer/repo', 'peer/repo', 'another/repo'])))
  const messages = mechanicalOutcomes(session, CONFIG).map((outcome) => outcome.message)

  expect(messages).toContain('exports_to.work must not repeat a repository')
  expect(messages).toContain('exports_to.work must be normalized in lexical order')
})

test('mismatched and nonreciprocal registered routes are reported rather than trusted', () => {
  const mismatch = fixture('peer/other')
  const mismatchSession = createTradesSession(options(mismatch.local, mismatch.home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(mismatchSession, ROUTE)).toContainEqual({
    status: 'VIOLATION',
    message: 'declared export route https://github.com/peer/repo has no matching registered repository',
    subject: 'https://github.com/peer/repo'
  })

  const oneSided = fixture('peer/repo', false)
  const oneSidedSession = createTradesSession(options(oneSided.local, oneSided.home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(oneSidedSession, ROUTE)).toContainEqual({
    status: 'VIOLATION',
    message: 'declared export route https://github.com/peer/repo lacks its matching receiver or sender declaration',
    subject: 'https://github.com/peer/repo'
  })
})

test('a route is active only for a kind that both repositories declare', () => {
  const { home, local, peer } = fixture()
  writeRepositoryConfiguration(peer, 'peer/repo', ['local/repo'], ['work'])
  const session = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'], ['knowledge'])))

  expect(mechanicalOutcomes(session, ROUTE)).toContainEqual({
    status: 'VIOLATION',
    message: 'declared export route https://github.com/peer/repo lacks its matching receiver or sender declaration',
    subject: 'https://github.com/peer/repo'
  })
})

test('a blank line after frontmatter does not weaken exact H1 identity validation', () => {
  const { home, local } = fixture()
  const validId = 'TRD-00000000-0000-4000-8000-000000000003'
  writeRecord(local, '-', 'peer/repo', validId, record(validId, 'local/repo', 'peer/repo'))

  const valid = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(valid, RECORD)).toEqual([{ status: 'PASS', message: 'Trade record identity and payload shape are valid.' }])

  const invalidId = 'TRD-00000000-0000-4000-8000-000000000004'
  writeRecord(
    local,
    '-',
    'peer/repo',
    invalidId,
    record(invalidId, 'local/repo', 'peer/repo').replace(`# ${invalidId}: Submission title`, `# ${invalidId}: Altered title`)
  )

  const invalid = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(invalid, RECORD)).toContainEqual({
    status: 'VIOLATION',
    message: 'H1 must exactly repeat the trade id and title',
    subject: `-/_TRADES/peer/repo/${invalidId}.md`
  })
})

test('sender and receiver write boundaries reject receiver fields outbound and changed inbound payload', () => {
  const { home, local, peer } = fixture()
  const outboundId = 'TRD-00000000-0000-4000-8000-000000000001'
  writeRecord(local, '-', 'peer/repo', outboundId, record(outboundId, 'local/repo', 'peer/repo', ['status: received']))

  const inboundId = 'TRD-00000000-0000-4000-8000-000000000002'
  writeRecord(peer, '-', 'local/repo', inboundId, record(inboundId, 'peer/repo', 'local/repo'))
  writeRecord(
    local,
    '+',
    'peer/repo',
    inboundId,
    record(inboundId, 'peer/repo', 'local/repo', ['status: received'], 'The receiver changed the sender payload.')
  )

  const session = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  const messages = mechanicalOutcomes(session, AUTH).map((outcome) => outcome.message)
  expect(messages).toContain('sender-owned outbound record must not set receiver-local field status')
  expect(messages).toContain('sender provenance or payload differs between outbound and inbound copies')
})

test('all receiver statuses are accepted with their required rationale and linkage', () => {
  const { home, local, peer } = fixture()
  const statuses = [
    ['received', []],
    ['adopted', ['adopted_as: KI-LOCAL-FND-001']],
    ['retained', ['retained_as: Knowledge/Local/Note']],
    ['parked', ["rationale: 'Wait for dependency.'"]],
    ['clarify', ["rationale: 'Confirm the expected boundary.'"]],
    ['declined', ["rationale: 'The proposal does not fit local scope.'"]],
    ['superseded', ["rationale: 'A newer submission replaces this one.'", 'superseded_by: TRD-00000000-0000-4000-8000-000000000099']]
  ] as const
  for (const [index, [status, fields]] of statuses.entries()) {
    const id = `TRD-00000000-0000-4000-8000-${String(index + 10).padStart(12, '0')}`
    const kind = status === 'retained' ? 'knowledge' : 'work'
    writeRecord(peer, '-', 'local/repo', id, record(id, 'peer/repo', 'local/repo', [], undefined, kind))
    writeRecord(local, '+', 'peer/repo', id, record(id, 'peer/repo', 'local/repo', [`status: ${status}`, ...fields], undefined, kind))
  }

  const valid = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(valid, STATUS)).toEqual([{ status: 'PASS', message: 'Receiver statuses and local linkage are valid.' }])

  const invalidId = 'TRD-00000000-0000-4000-8000-000000000090'
  writeRecord(peer, '-', 'local/repo', invalidId, record(invalidId, 'peer/repo', 'local/repo'))
  writeRecord(local, '+', 'peer/repo', invalidId, record(invalidId, 'peer/repo', 'local/repo', ['status: accepted']))
  const invalid = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(invalid, STATUS).map((outcome) => outcome.message)).toContain(
    'status must be one of received, adopted, retained, parked, clarify, declined, superseded'
  )

  const wrongKindId = 'TRD-00000000-0000-4000-8000-000000000091'
  writeRecord(peer, '-', 'local/repo', wrongKindId, record(wrongKindId, 'peer/repo', 'local/repo'))
  writeRecord(local, '+', 'peer/repo', wrongKindId, record(wrongKindId, 'peer/repo', 'local/repo', ['status: retained', 'retained_as: Knowledge/Local/Note']))
  const wrongKind = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  expect(mechanicalOutcomes(wrongKind, STATUS).map((outcome) => outcome.message)).toContain('retained is valid only for knowledge trades')
})

test('only terminal receiver dispositions permit sender release and receiver pruning observation', () => {
  const { home, local } = fixture()
  const parkedId = 'TRD-00000000-0000-4000-8000-000000000020'
  writeRecord(local, '+', 'peer/repo', parkedId, record(parkedId, 'peer/repo', 'local/repo', ['status: parked', "rationale: 'Wait.'"]))
  const adoptedId = 'TRD-00000000-0000-4000-8000-000000000021'
  writeRecord(local, '+', 'peer/repo', adoptedId, record(adoptedId, 'peer/repo', 'local/repo', ['status: adopted', 'adopted_as: KI-LOCAL-FND-001']))
  const retainedId = 'TRD-00000000-0000-4000-8000-000000000022'
  writeRecord(
    local,
    '+',
    'peer/repo',
    retainedId,
    record(retainedId, 'peer/repo', 'local/repo', ['status: retained', 'retained_as: Knowledge/Local/Note'], undefined, 'knowledge')
  )

  const session = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo'])))
  const outcomes = mechanicalOutcomes(session, RELEASE)
  expect(outcomes).toContainEqual({
    status: 'VIOLATION',
    message: 'sender released its outbound copy before an adopted, retained, declined, or superseded disposition',
    subject: `+/_TRADES/peer/repo/${parkedId}.md`
  })
  expect(outcomes).toContainEqual({
    status: 'INFO',
    message: 'eligible sender release is observable; receiver may prune this inbound copy',
    subject: `+/_TRADES/peer/repo/${adoptedId}.md`
  })
  expect(outcomes).toContainEqual({
    status: 'INFO',
    message: 'eligible sender release is observable; receiver may prune this inbound copy',
    subject: `+/_TRADES/peer/repo/${retainedId}.md`
  })
})

test('conform proposes only the local owned README scaffold and never writes a peer', () => {
  const { home, local, peer } = fixture()
  writeFileSync(join(local, '+', '_TRADES', 'README.md'), '# drift\n')
  const peerBefore = readFileSync(join(peer, '+', '_TRADES', 'README.md'), 'utf8')
  const session = createTradesSession(options(local, home, tradeConfiguration('local/repo', ['peer/repo']), 'conform'))
  const scaffoldItem = SCAFFOLD.items[0]
  if (!scaffoldItem?.mechanical) throw new Error('SCAFFOLD-1 is missing')
  scaffoldItem.mechanical.conform?.run(SCAFFOLD.selectContext(session.subjects[0]?.context() as never))

  expect(session.proposal().writes.map((write) => write.path)).toEqual(['+/_TRADES/README.md'])
  expect(readFileSync(join(peer, '+', '_TRADES', 'README.md'), 'utf8')).toBe(peerBefore)
})
