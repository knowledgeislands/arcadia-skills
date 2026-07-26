import { expect, test } from 'bun:test'
import { mkdir, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { KI_DEFAULT } from './contexts/website.ts'
import contract from './index.ts'
import { KI_WEBSITE_RUBRIC } from './items/index.ts'

test('preserves the website catalogue and declares only contained file repairs', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-website-native-'))
  try {
    await Bun.write(join(repository, 'package.json'), '{}\n')
    await mkdir(join(repository, 'site'))
    await Bun.write(join(repository, 'site', 'eleventy.config.ts'), 'export default {}\n')

    const items = contract.families.flatMap((family) => family.items)
    expect(items.map((item) => item.code)).toEqual(KI_WEBSITE_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code))

    const context = contract.createContext({ repository })
    const dist = items.find((item) => item.code === 'WEB-33')
    const optIn = items.find((item) => item.code === 'WEB-41')
    expect(dist?.kind).toBe('mechanical')
    expect(optIn?.kind).toBe('mechanical')
    if (!dist || dist.kind !== 'mechanical' || !('repair' in dist)) throw new Error('WEB-33 must declare a repair')
    if (!optIn || optIn.kind !== 'mechanical' || !('repair' in optIn)) throw new Error('WEB-41 must declare a repair')
    expect(dist.repair(context)).toEqual({ writes: [{ path: '.gitignore', content: 'site/dist\n', create: true }] })
    expect(optIn.repair(context)).toEqual({ writes: [{ path: '.ki-config.toml', content: KI_DEFAULT, create: true }] })
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
