import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { RubricItem } from '../../../../../shared/rubric-contract.ts'
import { createToolsContext, type ToolsContext } from '../contexts/tools.ts'
import { KI_TOOLS_RUBRIC } from './catalogue.ts'

type NativeToolsContext = Omit<ToolsContext, 'conformBins' | 'conformInstall' | 'conformConfig'> & {
  readonly repository: string
  readonly configContent: string | null
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<ToolsContext>[]
}

const catalogueDefinition = KI_TOOLS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<ToolsContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeToolsContext) => definition.audit.run(context as unknown as ToolsContext)
  }
}

const judgment = (item: RubricItem<ToolsContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

// chmod only addresses the audited executable-bit gap. The host invokes the
// pathless command from the repository root; missing tool content remains a
// maintainer decision rather than a native scaffold.
const executableRepair = (context: NativeToolsContext) => ({
  writes: [],
  commands: context.bins.filter((bin) => !bin.executable).map((bin) => ({ program: 'chmod', arguments: ['+x', `bin/${bin.name}`] }))
})

const installRepair = (context: NativeToolsContext) => ({
  writes: [],
  commands: context.install === 'non-executable' ? [{ program: 'chmod', arguments: ['+x', 'install.sh'] }] : []
})

// ki-repo owns creation and malformed-TOML recovery. This proposal only extends
// an existing, parseable configuration that has no ki-tools marker.
const markerRepair = (context: NativeToolsContext) => ({
  writes:
    context.config === 'absent' && context.configContent !== null
      ? [{ path: '.ki-config.toml', content: `${context.configContent.replace(/\n*$/, '\n')}\n[ki-tools]\n` }]
      : []
})

const nativeItem = (item: RubricItem<ToolsContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'TOOL-EXEC') return { ...native, repair: executableRepair }
  if (item.code === 'TOOL-INSTALL') return { ...native, repair: installRepair }
  if (item.code === 'CONFIG-1') return { ...native, repair: markerRepair }
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
  name: 'ki-tools',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeToolsContext => {
    const source = createToolsContext({ target: repository, dryRun: true })
    const { conformBins: _conformBins, conformInstall: _conformInstall, conformConfig: _conformConfig, ...evidence } = source
    return {
      repository,
      ...evidence,
      configContent: source.config === 'absent' ? readFileSync(join(source.target, '.ki-config.toml'), 'utf8') : null
    }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
