import { expect, test } from 'bun:test'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_BOOTSTRAP_RUBRIC } from './items/index.ts'

const repair = (code: string) => {
  const item = contract.families.flatMap((family) => family.items).find((candidate) => candidate.code === code)
  if (item?.kind !== 'mechanical' || !('repair' in item)) throw new Error(`${code} must be repairable`)
  return item.repair
}

test('preserves the bootstrap catalogue and declares only the safe gitignore repair', () => {
  const repository = mkdtempSync(join(tmpdir(), 'ki-bootstrap-native-'))
  const config = '[ki-repo]\nsupported_runtimes = ["claude-code"]\n\n[ki-bootstrap]\n'
  try {
    writeFileSync(join(repository, '.ki-config.toml'), config)
    const context = contract.createContext({ repository })

    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_BOOTSTRAP_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(repair('BOOT-3')(context)).toEqual({
      writes: [
        {
          path: '.gitignore',
          content: '# Generated project-local runtime payloads (ki-bootstrap) — never committed\n.claude/agents/\n.claude/skills/\n',
          create: true
        }
      ]
    })
    expect(repair('BOOT-8')(context)).toEqual(repair('BOOT-3')(context))
    expect(readFileSync(join(repository, '.ki-config.toml'), 'utf8')).toBe(config)
  } finally {
    rmSync(repository, { recursive: true, force: true })
  }
})
