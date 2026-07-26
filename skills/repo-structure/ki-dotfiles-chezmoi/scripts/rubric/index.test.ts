import { expect, test } from 'bun:test'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import contract from './index.ts'
import { KI_DOTFILES_CHEZMOI_RUBRIC } from './items/index.ts'

test('preserves the chezmoi catalogue and declares only the safe ignore-file scaffold', async () => {
  const repository = await mkdtemp(join(tmpdir(), 'ki-dotfiles-chezmoi-native-'))
  try {
    expect(contract.families.flatMap((family) => family.items).map((item) => item.code)).toEqual(
      KI_DOTFILES_CHEZMOI_RUBRIC.families.flatMap((family) => family.items).map((item) => item.code)
    )

    const context = contract.createContext({ repository })
    const mechanicalItems = contract.families.flatMap((family) => family.items).filter((item) => item.kind === 'mechanical')
    const ignore = mechanicalItems.find((item) => item.code === 'CHEZMOI-1')
    if (!ignore || !('repair' in ignore) || !ignore.repair) throw new Error('CHEZMOI-1 must be repairable')

    expect(ignore.repair(context)).toEqual({
      writes: [
        {
          path: '.chezmoiignore',
          content:
            '# Files/directories chezmoi should never manage.\n# See references/standards.md (Repo layout & naming) in the ki-dotfiles-chezmoi skill.\n',
          create: true
        }
      ]
    })
    expect(mechanicalItems.filter((item) => item.code !== 'CHEZMOI-1').every((item) => !('repair' in item))).toBe(true)
    await expect(readFile(join(repository, '.chezmoiignore'), 'utf8')).rejects.toThrow()
  } finally {
    await rm(repository, { recursive: true, force: true })
  }
})
