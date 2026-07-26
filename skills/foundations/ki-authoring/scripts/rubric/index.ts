import { join, relative } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import {
  type AuthoringRubricContext,
  createAuthoringContextFactory,
  EDITORCONFIG_DEFAULT,
  MARKDOWN_CONFORM_COMMANDS,
  MARKDOWNLINT_DEFAULT,
  type OwnedFile,
  PRETTIER_DEFAULT
} from './contexts/authoring.ts'
import { KI_AUTHORING_RUBRIC } from './items/index.ts'

type NativeAuthoringContext = Omit<AuthoringRubricContext, 'dryRun' | 'markdownConform' | 'syncOwned'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<AuthoringRubricContext>[]
}

const catalogue = KI_AUTHORING_RUBRIC.families as unknown as readonly LegacyFamily[]

const canonical: Record<OwnedFile, string> = {
  '.prettierrc.json': PRETTIER_DEFAULT,
  '.editorconfig': EDITORCONFIG_DEFAULT,
  '.markdownlint-cli2.jsonc': MARKDOWNLINT_DEFAULT
}

const mechanical = (item: RubricItem<AuthoringRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeAuthoringContext) => definition.audit.run(context as unknown as AuthoringRubricContext)
  }
}

const judgment = (item: RubricItem<AuthoringRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nativeMarkdown = (item: RubricItem<AuthoringRubricContext>) => ({
  ...mechanical(item),
  repair: () => ({ writes: [], commands: MARKDOWN_CONFORM_COMMANDS })
})

const nativeOwned = (item: RubricItem<AuthoringRubricContext>) => ({
  ...mechanical(item),
  repair: (context: NativeAuthoringContext) => ({
    writes: (Object.keys(canonical) as OwnedFile[]).flatMap((name) =>
      context.owned(name) === 'drifted'
        ? [{ path: relative(context.repository, join(context.repository, name)), content: canonical[name] }]
        : []
    )
  })
})

const nativeItem = (item: RubricItem<AuthoringRubricContext>) => {
  if (item.code === 'MD-mech') return nativeMarkdown(item)
  if (item.code === 'OWN-1') return nativeOwned(item)
  return item.mechanical ? mechanical(item) : judgment(item)
}

export default {
  contract: 1,
  skill: 'ki-authoring',
  createContext: ({ repository }: { readonly repository: string }): NativeAuthoringContext => {
    const {
      dryRun: _dryRun,
      markdownConform: _markdownConform,
      syncOwned: _syncOwned,
      ...evidence
    } = createAuthoringContextFactory({
      target: repository,
      dryRun: true
    })()
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
