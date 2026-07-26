import type { RubricItem } from '../../shared/rubric.ts'
import { createLiveArtifactsContext, type LiveArtifactsContext } from '../contexts/live-artifacts.ts'
import { KI_KB_LIVE_ARTIFACTS_RUBRIC } from './catalogue.ts'

type NativeLiveArtifactsContext = Omit<LiveArtifactsContext, 'conformIndex' | 'conformRenders'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<LiveArtifactsContext>[]
}

const catalogueDefinition = KI_KB_LIVE_ARTIFACTS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<LiveArtifactsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeLiveArtifactsContext) => definition.audit.run(context as unknown as LiveArtifactsContext)
  }
}

const judgment = (item: RubricItem<LiveArtifactsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const indexRepair = (context: NativeLiveArtifactsContext) => {
  if (!context.artifactsDirectoryExists || context.sources.length === 0) return { writes: [] }
  const entry = (source: (typeof context.sources)[number]): string =>
    `- [${source.stem}](${source.relativePath.split('/').at(-1)}) — _(description — see manual TODO)_`
  if (context.indexText === null) {
    const content = `# Live Artifacts\n\nOperational documents reflecting the current state of the island. Each row is a \`.md\`/\`.html\` pair.\n\n${context.sources.map(entry).join('\n')}\n`
    return { writes: [{ path: context.indexRelativePath, content, create: true }] }
  }
  const missing = context.sources.filter(
    (source) => !context.indexText?.includes(source.relativePath.split('/').at(-1) ?? '') && !context.indexText?.includes(source.stem)
  )
  if (missing.length === 0) return { writes: [] }
  return {
    writes: [
      {
        path: context.indexRelativePath,
        content: `${context.indexText.replace(/\n*$/, '\n')}${missing.map(entry).join('\n')}\n`
      }
    ]
  }
}

const rendersRepair = (context: NativeLiveArtifactsContext) => ({
  writes: context.sources.flatMap((source) => {
    if (source.frontmatter?.renders) return []
    const match = source.text.match(/^---\n([\s\S]*?)\n---/)
    if (!match) return []
    return [{ path: source.relativePath, content: source.text.replace(match[0], `---\n${match[1]}\nrenders: html\n---`) }]
  })
})

const nativeItem = (item: RubricItem<LiveArtifactsContext>) => {
  const native = item.mechanical ? mechanical(item) : judgment(item)
  if (item.code === 'LA-S-1' && native.kind === 'mechanical') return { ...native, repair: indexRepair }
  if (item.code === 'LA-F-2' && native.kind === 'mechanical') return { ...native, repair: rendersRepair }
  return native
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
  name: 'ki-kb-live-artifacts',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeLiveArtifactsContext => {
    const source = createLiveArtifactsContext({ target: repository, dryRun: true })
    const { conformIndex: _conformIndex, conformRenders: _conformRenders, ...evidence } = source
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
