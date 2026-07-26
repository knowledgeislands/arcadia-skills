import { expect, test } from 'bun:test'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_WEBSITE_CLOUDFLARE_RUBRIC } from './items/index.ts'

test('preserves the Cloudflare catalogue without host-owned external repairs', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-website-cloudflare-native-'))
  try {
    await writeFile(join(repository, '.ki-config.toml'), '[ki-website-cloudflare]\n')

    const items = contract.families.flatMap((family) => family.items)
    expect(items.map((item) => item.code)).toEqual(
      KI_WEBSITE_CLOUDFLARE_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )
    expect(items.some((item) => 'repair' in item)).toBe(false)

    const workerConfig = items.find((item) => item.code === 'WCF-1')
    expect(workerConfig?.kind).toBe('mechanical')
    if (!workerConfig || workerConfig.kind !== 'mechanical') throw new Error('WCF-1 must remain mechanical')
    expect(workerConfig.audit(contract.createContext({ repository }))).toEqual([
      { status: 'PASS', message: 'site Worker config was inspected.' }
    ])
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
