import { join, relative } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import {
  type AuthoringRubricContext,
  createAuthoringContextFactory,
  EDITORCONFIG_DEFAULT,
  MARKDOWN_CONFORM_COMMANDS,
  MARKDOWNLINT_DEFAULT,
  type OwnedFile,
  PRETTIER_DEFAULT
} from '../contexts/authoring.ts'
import { KI_AUTHORING_RUBRIC } from './catalogue.ts'

type NativeAuthoringContext = Omit<AuthoringRubricContext, 'dryRun' | 'markdownConform' | 'syncOwned'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<AuthoringRubricContext>[]
}

const catalogueDefinition = KI_AUTHORING_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

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

type NativeRuntimeItem = {
  readonly kind: 'mechanical' | 'judgment'
  readonly phase?: 'PREPARE' | 'INSPECT' | 'PRIMARY' | 'DERIVED' | 'NORMALISE'
  readonly audit?: (...arguments_: never[]) => unknown
  readonly repair?: (...arguments_: never[]) => unknown
}

const directItem = <Context>(item: RubricItem<Context>, runtime: NativeRuntimeItem) => {
  if (!item.mechanical) return item
  if (runtime.kind !== 'mechanical' || !runtime.phase || !runtime.audit) throw new Error(`${item.code} has no native mechanical runtime`)
  const { repair: legacyRepair, ...mechanical } = item.mechanical
  void legacyRepair
  return {
    ...item,
    mechanical: {
      ...mechanical,
      audit: { phase: runtime.phase, run: runtime.audit },
      ...(runtime.repair ? { repair: { phase: 'NORMALISE', run: runtime.repair } } : {})
    }
  }
}

export default {
  contract: 1,
  name: 'ki-authoring',
  concern: catalogueDefinition.concern,
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
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
