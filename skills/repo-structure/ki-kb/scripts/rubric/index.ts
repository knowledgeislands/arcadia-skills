import { isAbsolute, relative, resolve } from 'node:path'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { createKbContext, type KbEvidenceFinding, type KbRubricContext } from './contexts/kb.ts'
import { KI_KB_RUBRIC } from './items/index.ts'

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

const catalogue = KI_KB_RUBRIC.families as unknown as readonly LegacyFamily[]

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

export default {
  contract: 1,
  skill: 'ki-kb',
  createContext: ({ repository }: { readonly repository: string }): NativeKbContext => {
    const source = createKbContext(repository, true)
    return { repository, root: source.root, auditFindings: source.auditFindings }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
