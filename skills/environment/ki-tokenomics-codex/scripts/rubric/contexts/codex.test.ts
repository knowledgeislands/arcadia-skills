import { describe, expect, test } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createCodexSession } from './codex.ts'

describe('Codex tokenomics context', () => {
  test('reports no values or runtime metrics and writes nothing', () => {
    const home = mkdtempSync(join(tmpdir(), 'codex-tokenomics-'))
    try {
      const repo = join(home, 'repo')
      mkdirSync(join(repo, '.agents', 'skills', 'local'), { recursive: true })
      const session = createCodexSession({ mode: 'audit', repository: repo, userHome: home, configuration: {} })
      const evidence = session.subjects[0]?.context().codex
      expect(evidence?.surfaces.map((item) => item.message).join(' ')).not.toContain('secret')
      expect(evidence?.unavailableMetrics).toHaveLength(4)
      expect(session.proposal()).toEqual({ writes: [] })
    } finally {
      rmSync(home, { recursive: true, force: true })
    }
  })
})
