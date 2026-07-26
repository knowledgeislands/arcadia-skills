import { join, relative } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { type AgentDefinition, type AgentsRubricContext, createAgentsContext } from '../contexts/agents.ts'
import { KI_AGENTS_RUBRIC } from './catalogue.ts'

type NativeAgentsContext = Omit<AgentsRubricContext, 'dryRun' | 'alignName'> & {
  readonly repository: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<AgentsRubricContext>[]
}

const catalogueDefinition = KI_AGENTS_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<AgentsRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeAgentsContext) => definition.audit.run(context as unknown as AgentsRubricContext)
  }
}

const judgment = (item: RubricItem<AgentsRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const nameAlignment = (agent: AgentDefinition): string | undefined => {
  if (!agent.name || agent.name === agent.stem) return undefined
  const lines = agent.content.split(/\r?\n/)
  const nameLine = lines.findIndex((line) => /^name:/.test(line))
  if (nameLine === -1) return undefined
  lines[nameLine] = `name: ${agent.stem}`
  return lines.join('\n')
}

const nativeLay3 = (item: RubricItem<AgentsRubricContext>) => ({
  ...mechanical(item),
  conform: (context: NativeAgentsContext) => ({
    writes: context.agents.flatMap((agent) => {
      const content = nameAlignment(agent)
      return content === undefined ? [] : [{ path: relative(context.repository, agent.file), content }]
    })
  })
})

const nativeItem = (item: RubricItem<AgentsRubricContext>) => {
  if (item.code === 'LAY-3') return nativeLay3(item)
  return item.mechanical ? mechanical(item) : judgment(item)
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
  name: 'ki-subagents',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeAgentsContext => {
    const { dryRun: _dryRun, alignName: _alignName, ...evidence } = createAgentsContext([join(repository, 'subagents')], true)
    return { repository, ...evidence }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
