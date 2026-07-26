import { existsSync, lstatSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gitignoresPath, runtimeAgentsDir, runtimeSkillsDir } from '../internal/repo-bootstrap/runtime-paths.ts'
import type { RubricItem } from '../vendored/ki-skills/rubric.ts'
import { type BootstrapRubricContext, createBootstrapContextFactory } from './contexts/bootstrap.ts'
import { KI_BOOTSTRAP_RUBRIC } from './items/index.ts'

type NativeBootstrapContext = Omit<BootstrapRubricContext, 'target' | 'publishProjectSkills'> & {
  readonly repository: string
  readonly gitignore?: string
}

type LegacyFamily = {
  readonly code: string
  readonly title: string
  readonly items: readonly RubricItem<BootstrapRubricContext>[]
}

const catalogue = KI_BOOTSTRAP_RUBRIC.families as unknown as readonly LegacyFamily[]

const mechanical = (item: RubricItem<BootstrapRubricContext>) => {
  const definition = item.mechanical
  if (!definition) throw new Error(`${item.code} must be mechanical`)
  return {
    kind: 'mechanical' as const,
    code: item.code,
    title: item.title,
    level: definition.level,
    phase: definition.audit.phase,
    audit: (context: NativeBootstrapContext) => definition.audit.run(context as unknown as BootstrapRubricContext)
  }
}

const judgment = (item: RubricItem<BootstrapRubricContext>) => {
  const definition = item.judgment
  if (!definition) throw new Error(`${item.code} must be a judgment item`)
  return { kind: 'judgment' as const, code: item.code, title: item.title, prompt: definition.prompt }
}

const appendGitignore = (existing: string, paths: readonly string[]): string => {
  const missing = paths.filter((path) => !gitignoresPath(existing, path))
  if (missing.length === 0) return existing
  const lead = existing === '' ? '' : existing.endsWith('\n') ? '\n' : '\n\n'
  return `${existing}${lead}# Generated project-local runtime payloads (ki-bootstrap) — never committed\n${missing.map((path) => `${path}/`).join('\n')}\n`
}

const missingIgnoredPaths = (context: NativeBootstrapContext): readonly string[] =>
  context.projectChecks.flatMap((check) => {
    if (check.level === 'PASS') return []
    if (check.code === 'BOOT-3') return [runtimeSkillsDir(check.runtime)]
    if (check.code === 'BOOT-8') {
      try {
        return [runtimeAgentsDir(check.runtime)]
      } catch {
        return []
      }
    }
    return []
  })

// The retired publisher also creates directories, copies complete skill trees, swaps
// managed links, and prunes manifest-proven payloads.  Those operations need a
// dedicated host transaction; only this regular-file `.gitignore` update is safe in
// the current native write/create contract.
const gitignoreRepair = (context: NativeBootstrapContext) => {
  if (context.gitignore === undefined) return { writes: [] }
  const content = appendGitignore(context.gitignore, [...new Set(missingIgnoredPaths(context))].sort())
  if (content === context.gitignore) return { writes: [] }
  return {
    writes: [
      {
        path: '.gitignore',
        content,
        ...(context.gitignore === '' && !existsSync(join(context.repository, '.gitignore')) ? { create: true } : {})
      }
    ]
  }
}

const nativeItem = (item: RubricItem<BootstrapRubricContext>) => {
  if (!item.mechanical) return judgment(item)
  const native = mechanical(item)
  if (item.code === 'BOOT-3' || item.code === 'BOOT-8') return { ...native, repair: gitignoreRepair }
  return native
}

const regularGitignore = (repository: string): string | undefined => {
  const path = join(repository, '.gitignore')
  if (!existsSync(path)) return ''
  const stat = lstatSync(path)
  return stat.isFile() && !stat.isSymbolicLink() ? readFileSync(path, 'utf8') : undefined
}

export default {
  contract: 1,
  skill: 'ki-bootstrap',
  createContext: ({ repository }: { readonly repository: string }): NativeBootstrapContext => {
    const {
      target: _target,
      publishProjectSkills: _publishProjectSkills,
      ...evidence
    } = createBootstrapContextFactory({
      target: repository,
      dryRun: true
    })()
    return { repository, ...evidence, gitignore: regularGitignore(repository) }
  },
  families: catalogue.map((family) => ({
    code: family.code,
    title: family.title,
    items: family.items.map(nativeItem)
  }))
} as const
