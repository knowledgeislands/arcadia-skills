import { afterEach, describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import type { RubricContextOptions } from '../../shared/rubric.ts'
import { FILES } from '../items/files.ts'
import { WORK } from '../items/working-areas.ts'
import { collectAuditFindings } from './audit.ts'
import { createRepoSession, type FilesRubricContext, type WorkingAreasRubricContext } from './repository.ts'

const roots: string[] = []

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
})

const repository = (): string => {
  const root = mkdtempSync(join(tmpdir(), 'ki-repo-session-'))
  roots.push(root)
  mkdirSync(join(root, '.git'))
  return root
}

const options = (root: string, mode: 'audit' | 'conform'): RubricContextOptions => ({
  mode,
  repository: root,
  userHome: root,
  configuration: {}
})

const inspect = (root: string) => ({
  target: root,
  findings: [
    { level: 'FAIL' as const, code: 'FILES-1', message: 'required files are absent' },
    { level: 'FAIL' as const, code: 'FILES-3', message: 'authoring marker is absent' }
  ]
})

const runFilesConform = (context: FilesRubricContext): void => {
  for (const item of FILES.items) item.mechanical?.conform?.run(context)
}

const filesContext = (session: ReturnType<typeof createRepoSession>): FilesRubricContext => {
  const [subject] = session.subjects
  if (!subject) throw new Error('ki-repo session did not expose its repository subject')
  return FILES.selectContext(subject.context())
}

const workingAreasContext = (session: ReturnType<typeof createRepoSession>): WorkingAreasRubricContext => {
  const [subject] = session.subjects
  if (!subject) throw new Error('ki-repo session did not expose its repository subject')
  return WORK.selectContext(subject.context())
}

const runWorkingAreasConform = (context: WorkingAreasRubricContext): void => {
  for (const item of WORK.items) item.mechanical?.conform?.run(context)
}

const applyWrites = (root: string, writes: ReturnType<ReturnType<typeof createRepoSession>['proposal']>['writes']): void => {
  for (const write of writes) {
    const path = join(root, write.path)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, write.content)
  }
}

describe('ki-repo session', () => {
  test('coalesces two item actions into one explicit config create plus one gitignore create', () => {
    const root = repository()
    const session = createRepoSession(options(root, 'conform'), inspect)
    const context = filesContext(session)
    runFilesConform(context)

    const proposal = session.proposal()
    expect(proposal.writes.map((write) => write.path)).toEqual(['.ki-config.toml', '.gitignore'])
    expect(proposal.writes[0]?.create).toBe(true)
    expect(proposal.writes[0]?.content).toContain('["knowledgeislands/ki-agentic-harness:ki-repo"]')
    expect(proposal.writes[0]?.content).toContain('["knowledgeislands/ki-agentic-harness:ki-authoring"]')
  })

  test('appends only a missing exact root marker and preserves the original bytes', () => {
    const root = repository()
    const original = '# retained\n["knowledgeislands/ki-agentic-harness:ki-repo".checks]\nwiki = false\n'
    writeFileSync(join(root, '.ki-config.toml'), original)
    const session = createRepoSession(options(root, 'conform'), inspect)
    runFilesConform(filesContext(session))

    const config = session.proposal().writes.find((write) => write.path === '.ki-config.toml')
    expect(config?.create).toBeUndefined()
    expect(config?.content.startsWith(original)).toBe(true)
    expect(config?.content).toContain('\n["knowledgeislands/ki-agentic-harness:ki-repo"]\n')
    expect(config?.content).toContain('\n["knowledgeislands/ki-agentic-harness:ki-authoring"]\n')
  })

  test('audit is read-only and unsafe configuration leaves expose no write capability', () => {
    const root = repository()
    writeFileSync(join(root, 'outside.toml'), '[ki-repo]\n')
    symlinkSync('outside.toml', join(root, '.ki-config.toml'))

    const audit = createRepoSession(options(root, 'audit'), inspect)
    expect(audit.proposal()).toEqual({ writes: [] })

    const conform = createRepoSession(options(root, 'conform'), inspect)
    const context = filesContext(conform)
    expect(context.ensureRepoConfiguration).toBeUndefined()
    expect(context.ensureAuthoringConfiguration).toBeUndefined()
  })

  test('conforms the required inbound and outbound working-area scaffold', () => {
    const root = repository()
    const session = createRepoSession(options(root, 'conform'), inspect)
    runWorkingAreasConform(workingAreasContext(session))

    const writes = session.proposal().writes
    expect(writes.map((write) => write.path)).toEqual(['+/README.md', '+/_HANDOFFS/README.md', '-/README.md', '-/_HANDOFFS/README.md'])
    expect(writes.every((write) => write.create)).toBe(true)

    applyWrites(root, writes)
    const audit = createRepoSession(options(root, 'audit'), inspect)
    const [item] = WORK.items
    expect(item?.mechanical?.audit.run(workingAreasContext(audit))).toEqual([
      { status: 'PASS', message: 'working-area scaffold is present and conformed' }
    ])
  })

  test('repairs a drifted working-area README without recreating it', () => {
    const root = repository()
    const initial = createRepoSession(options(root, 'conform'), inspect)
    runWorkingAreasConform(workingAreasContext(initial))
    applyWrites(root, initial.proposal().writes)
    writeFileSync(join(root, '+', 'README.md'), '# drift\n')

    const session = createRepoSession(options(root, 'conform'), inspect)
    runWorkingAreasConform(workingAreasContext(session))
    const [write] = session.proposal().writes

    expect(session.proposal().writes).toHaveLength(1)
    expect(write?.path).toBe('+/README.md')
    expect(write?.create).toBeUndefined()
    expect(write?.content).toContain('[the matching outbound working area](../-/README.md)')
  })

  test('does not write a working-area scaffold through an unsafe directory', () => {
    const root = repository()
    const outside = join(root, 'outside')
    mkdirSync(outside)
    symlinkSync(outside, join(root, '+'), 'dir')

    const session = createRepoSession(options(root, 'conform'), inspect)
    runWorkingAreasConform(workingAreasContext(session))

    expect(session.proposal().writes).toEqual([])
  })
})

describe('runtime environment coverage', () => {
  const runtimeFindings = (configuration: string) => {
    const root = repository()
    writeFileSync(join(root, '.ki-config.toml'), configuration)
    return collectAuditFindings([root]).findings.filter(({ code }) => code === 'RUNTIMES-1' || code === 'RUNTIMES-2')
  }

  test('requires the portable and runtime-specific environment tables', () => {
    expect(runtimeFindings('["knowledgeislands/ki-agentic-harness:ki-repo"]\nsupported_runtimes = ["claude-code", "codex"]\n')).toEqual([
      {
        level: 'FAIL',
        code: 'RUNTIMES-2',
        message:
          'supported runtime coverage requires missing table(s): [knowledgeislands/ki-agentic-harness:ki-housekeeping-claude], [knowledgeislands/ki-agentic-harness:ki-tokenomics], [knowledgeislands/ki-agentic-harness:ki-tokenomics-claude], [knowledgeislands/ki-agentic-harness:ki-tokenomics-codex]',
        subject: expect.any(String)
      }
    ])
  })

  test('accepts the complete environment matrix for both runtimes', () => {
    expect(
      runtimeFindings(`["knowledgeislands/ki-agentic-harness:ki-repo"]
supported_runtimes = ["claude-code", "codex"]

["knowledgeislands/ki-agentic-harness:ki-tokenomics"]

["knowledgeislands/ki-agentic-harness:ki-housekeeping-claude"]

["knowledgeislands/ki-agentic-harness:ki-tokenomics-claude"]

["knowledgeislands/ki-agentic-harness:ki-tokenomics-codex"]
`)
    ).toEqual([])
  })
})
