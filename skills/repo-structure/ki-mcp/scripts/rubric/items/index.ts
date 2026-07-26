import type { RubricItem } from '../../../../../shared/rubric-contract.ts'
import { createMcpContext, type McpRubricContext } from '../contexts/mcp.ts'
import { KI_MCP_RUBRIC } from './catalogue.ts'

type NativeMcpContext = Omit<McpRubricContext, 'dryRun' | 'ensureMcpConfig' | 'ensurePackageShape' | 'regenerateClient'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<McpRubricContext>[]
}

const catalogueDefinition = KI_MCP_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]
const MCP_MAIN = 'dist/mcp-server/index.js'

const mechanical = (item: RubricItem<McpRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeMcpContext) => definition.audit.run(context as unknown as McpRubricContext)
  }
}

const judgment = (item: RubricItem<McpRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

// ki-repo creates the shared config.  This repair only appends a marker to an
// existing, parseable file, never tries to recover malformed TOML or create it.
const mcpConfigWrite = (context: NativeMcpContext) => ({
  writes:
    context.config === null || context.configMalformed || context.configTable
      ? []
      : [{ path: '.ki-config.toml', content: `${context.config.replace(/\n*$/, '\n')}\n[ki-mcp]\n` }]
})

const packageShapeWrite = (context: NativeMcpContext) => {
  if (!context.packageJson) return { writes: [] }
  const pkg = structuredClone(context.packageJson)
  const bin = (pkg.bin && typeof pkg.bin === 'object' && !Array.isArray(pkg.bin) ? pkg.bin : {}) as Record<string, string>
  const exports_ = (pkg.exports && typeof pkg.exports === 'object' && !Array.isArray(pkg.exports) ? pkg.exports : {}) as Record<
    string,
    unknown
  >
  let changed = false

  if (pkg.main !== MCP_MAIN) {
    pkg.main = MCP_MAIN
    changed = true
  }
  if (!Object.values(bin).includes(MCP_MAIN)) {
    bin[Object.keys(bin).length === 1 ? (Object.keys(bin)[0] as string) : String(pkg.name ?? 'mcp-server').replace(/^@[^/]+\//, '')] =
      MCP_MAIN
    pkg.bin = bin
    changed = true
  }
  for (const [key, value] of Object.entries({
    '.': { types: './dist/index.d.ts', default: `./${MCP_MAIN}` },
    './config': { types: './dist/config/index.d.ts', default: './dist/config/index.js' },
    './package.json': './package.json'
  })) {
    if (exports_[key] === undefined) {
      exports_[key] = value
      changed = true
    }
  }
  return changed
    ? { writes: [{ path: 'package.json', content: `${JSON.stringify({ ...pkg, exports: exports_ }, null, 2)}\n` }] }
    : { writes: [] }
}

const nativeItem = (item: RubricItem<McpRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'KI-CONFIG') return { ...native, repair: mcpConfigWrite }
  if (item.code === 'PKG-1') return { ...native, repair: packageShapeWrite }
  // A repository-defined ki:generate:client script can execute arbitrary app code.
  // It remains an explicit maintainer action rather than a native conform repair.
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
  name: 'ki-mcp',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeMcpContext => {
    const {
      dryRun: _dryRun,
      ensureMcpConfig: _ensureMcpConfig,
      ensurePackageShape: _ensurePackageShape,
      regenerateClient: _regenerateClient,
      ...evidence
    } = createMcpContext(repository, true)
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
