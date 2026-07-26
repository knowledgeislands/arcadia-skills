import { isAbsolute, relative, resolve } from 'node:path'
import type { RubricItem } from '../../shared/rubric.ts'
import { createKbContext, type KbEvidenceFinding, type KbRubricContext } from '../contexts/kb.ts'
import { KI_KB_RUBRIC } from './catalogue.ts'

type NativeKbContext = {
  readonly repository: string
  readonly root: string
  readonly auditFindings: readonly KbEvidenceFinding[]
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<KbRubricContext>[]
}

const catalogueDefinition = KI_KB_RUBRIC
const catalogue = catalogueDefinition.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<KbRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeKbContext) => definition.audit.run(context as unknown as KbRubricContext)
  }
}

const judgment = (item: RubricItem<KbRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const violationSubjects = (context: NativeKbContext, code: string): readonly string[] =>
  context.auditFindings.flatMap((finding) =>
    finding.code === code && (finding.level === 'FAIL' || finding.level === 'WARN') && finding.subject ? [finding.subject] : []
  )

const containedPath = (context: NativeKbContext, subject: string): string | undefined => {
  const path = relative(context.repository, resolve(context.root, subject))
  return path && !isAbsolute(path) && path !== '..' && !path.startsWith('../') ? path : undefined
}

/** Recover `folder` from legacy evidence shaped as `folder/folder.md`, including nested aliases. */
const zoneFolder = (subject: string): string | undefined => {
  if (!subject.endsWith('.md')) return undefined
  const repeated = subject.slice(0, -'.md'.length)
  for (let index = repeated.indexOf('/'); index >= 0; index = repeated.indexOf('/', index + 1)) {
    const folder = repeated.slice(0, index)
    if (folder && repeated.slice(index + 1) === folder) return folder
  }
  return undefined
}

const zoneIndexRepair = (context: NativeKbContext) => ({
  writes: violationSubjects(context, 'ZONE-2').flatMap((subject) => {
    const path = containedPath(context, subject)
    const folder = zoneFolder(subject)
    return path && folder ? [{ path, content: `# ${folder}\n`, create: true }] : []
  })
})

const memoryIndexRepair = (context: NativeKbContext) => ({
  writes: violationSubjects(context, 'ZONE-3').flatMap((subject) => {
    const path = containedPath(context, subject)
    return path ? [{ path, content: '# MEMORY\n\n## Active Pillars\n\n<!-- list active Pillars here -->\n', create: true }] : []
  })
})

const nativeItem = (item: RubricItem<KbRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'ZONE-2') return { ...native, repair: zoneIndexRepair }
  if (item.code === 'ZONE-3') return { ...native, repair: memoryIndexRepair }
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
  name: 'ki-kb',
  concern: catalogueDefinition.concern,
  createContext: ({ repository }: { readonly repository: string }): NativeKbContext => {
    const source = createKbContext(repository, true)
    return { repository, root: source.root, auditFindings: source.auditFindings }
  },
  families: catalogue.map((family) => ({
    ...family,
    selectContext: (context: unknown) => context,
    items: family.items.map((item) => directItem(item, nativeItem(item)))
  }))
} as const

export * from './catalogue.ts'
