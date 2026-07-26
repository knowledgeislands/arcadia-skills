import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import rubric from './index.ts'

let failed = false
const check = (label: string, condition: boolean): void => {
  if (condition) console.log(`  \x1b[32mok\x1b[0m   ${label}`)
  else {
    failed = true
    console.log(`  \x1b[31mFAIL\x1b[0m ${label}`)
  }
}

const root = mkdtempSync(join(tmpdir(), 'ki-tokenomics-native-'))
try {
  mkdirSync(join(root, '.claude', 'skills', 'example'), { recursive: true })
  writeFileSync(join(root, '.claude', 'CLAUDE.md'), '# User guidance\n')
  writeFileSync(join(root, '.claude', 'skills', 'example', 'SKILL.md'), '---\nname: example\ndescription: A small user skill.\n---\n')
  writeFileSync(
    join(root, '.claude', 'settings.json'),
    JSON.stringify({ model: 'sonnet', mcpServers: { headroom: { command: 'headroom' } } })
  )
  const context = await rubric.createContext({ userHome: root })
  const families = rubric.families.flatMap((family) => family.items)
  const surf = families.find((item) => item.code === 'SURF-1')
  const tool = families.find((item) => item.code === 'TOOL-2')
  const configuration = families.find((item) => item.code === 'CFG-1')
  check(
    'declares the bounded user-home scope',
    rubric.scope.kind === 'user-home' && rubric.scope.paths.join(',') === '.claude,.claude.json'
  )
  check('preserves the complete rubric catalogue', families.length === 28)
  check(
    'measures user instruction evidence without a subprocess',
    Boolean(surf?.kind === 'mechanical' && (await surf.audit(context)).some((outcome) => outcome.status === 'PASS'))
  )
  check(
    'detects configured user compression tooling',
    Boolean(tool?.kind === 'mechanical' && (await tool.audit(context)).some((outcome) => outcome.status === 'PASS'))
  )
  check(
    'marks repository-only configuration evidence not applicable',
    Boolean(
      configuration?.kind === 'mechanical' && (await configuration.audit(context)).every((outcome) => outcome.status === 'NOT_APPLICABLE')
    )
  )
} finally {
  rmSync(root, { recursive: true, force: true })
}

if (failed) process.exit(1)
console.log('\x1b[32mindex.test.ts: all checks passed\x1b[0m')
