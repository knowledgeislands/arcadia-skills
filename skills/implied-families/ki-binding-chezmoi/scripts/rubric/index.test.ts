import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import definition from './index.ts'
import { KI_BINDING_CHEZMOI_RUBRIC } from './items/index.ts'

test('preserves the chezmoi binding catalogue without proposing external repairs', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-binding-chezmoi-native-'))
  try {
    await mkdir(join(repository, '.chezmoidata'))
    await mkdir(join(repository, 'dot_config'))
    await writeFile(join(repository, '.chezmoidata', 'mcp.toml'), '[servers]\n')
    await writeFile(join(repository, 'partial_mcp-servers-json.tmpl'), '{}\n')
    await writeFile(join(repository, 'dot_config', 'target.tmpl'), '{{ template "mcp-servers-json" . }}\n')

    expect(definition.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_BINDING_CHEZMOI_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const context = definition.createContext({ repository })
    const mechanicalItems = definition.families.flatMap((family) => family.items).filter((item) => item.kind === 'mechanical')
    expect(await Promise.all(mechanicalItems.map((item) => item.audit(context)))).toEqual([
      [{ status: 'PASS', message: 'chezmoi source repo is present.', subject: repository }],
      [{ status: 'NOT_APPLICABLE', message: 'Surface agreement is owned by ki-binding; run its audit directly.' }],
      [{ status: 'PASS', message: 'chezmoi repo carries the MCP source data (.chezmoidata/mcp.toml).', subject: '.chezmoidata/mcp.toml' }],
      [{ status: 'PASS', message: 'render template present (partial_mcp-servers-json.tmpl)', subject: 'partial_mcp-servers-json.tmpl' }],
      [
        {
          status: 'PASS',
          message: 'render template is wired into a surface target (dot_config/target.tmpl)',
          subject: 'dot_config/target.tmpl'
        }
      ]
    ])
    expect(mechanicalItems.every((item) => !('repair' in item) || item.repair === undefined)).toBe(true)
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
