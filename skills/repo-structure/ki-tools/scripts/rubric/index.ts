import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createToolsContext, type ToolsContext } from './contexts/tools.ts'
import { KI_TOOLS_RUBRIC } from './items/index.ts'

type NativeToolsContext = Omit<ToolsContext, 'conformBins' | 'conformInstall' | 'conformConfig'> & {
  readonly repository: string
  readonly configContent: string | null
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<ToolsContext>[]
}

const catalogue = KI_TOOLS_RUBRIC.families as unknown as readonly LegacyFamily[]

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

export default {
  contract: 1,
  skill: 'ki-tools',
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
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
