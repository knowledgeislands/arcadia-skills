import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { type ChezmoiContext, createChezmoiContextFactory } from './contexts/chezmoi.ts'
import { KI_DOTFILES_CHEZMOI_RUBRIC } from './items/index.ts'

type NativeChezmoiContext = ChezmoiContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<ChezmoiContext>[]
}

const catalogue = KI_DOTFILES_CHEZMOI_RUBRIC.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<ChezmoiContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeChezmoiContext) => definition.audit.run(context)
  }
}

const judgment = (item: RubricItem<ChezmoiContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeItem = (item: RubricItem<ChezmoiContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  // This static source-only ignore file is the one safe repair. Template
  // design, source-name changes, lock-file removal, and every `chezmoi`
  // operation need repository-specific intent or an external tool, so remain
  // report-only for the host.
  if (item.code === 'CHEZMOI-1')
    return {
      ...native,
      repair: (context: NativeChezmoiContext) => ({
        writes: context.hasIgnore
          ? []
          : [
              {
                path: '.chezmoiignore',
                content:
                  '# Files/directories chezmoi should never manage.\n# See references/standards.md (Repo layout & naming) in the ki-dotfiles-chezmoi skill.\n',
                create: true
              }
            ]
      })
    }
  return native
}

export default {
  contract: 1,
  skill: 'ki-dotfiles-chezmoi',
  createContext: ({ repository }: { readonly repository: string }): NativeChezmoiContext => ({
    repository,
    ...createChezmoiContextFactory({ target: repository })()
  }),
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
