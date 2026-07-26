import type { RubricItem } from '../../shared/rubric.ts'
import { type ChezmoiContext, createChezmoiContextFactory } from '../contexts/chezmoi.ts'
import { KI_DOTFILES_CHEZMOI_RUBRIC } from './catalogue.ts'

type NativeChezmoiContext = ChezmoiContext & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<ChezmoiContext>[]
}

const catalogueDefinition = KI_DOTFILES_CHEZMOI_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

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
  // This static source-only ignore file is the one safe conform. Template
  // design, source-name changes, lock-file removal, and every `chezmoi`
  // operation need repository-specific intent or an external tool, so remain
  // report-only for the host.
  if (item.code === 'CHEZMOI-1')
    return {
      ...native,
      conform: (context: NativeChezmoiContext) => ({
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

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly conform?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { conform: legacyConform, ...mechanical } = item.mechanical
  void legacyConform
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.conform ? { conform: { phase: 'NORMALISE', run: runtime.conform } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-dotfiles-chezmoi',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeChezmoiContext => ({
    repository,
    ...createChezmoiContextFactory({ target: repository })()
  }),
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
