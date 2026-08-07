import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type {
  ConformCommand,
  ConformWrite,
  RubricContextOptions,
  RubricPublicationContext,
  RubricSession
} from '../../shared/rubric.ts'

export const PRETTIER_DEFAULT = `{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "proseWrap": "never",
  "trailingComma": "none",
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "parser": "markdown"
      }
    }
  ]
}
`

export const EDITORCONFIG_DEFAULT = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
`

// Trade records are formatted like any other Markdown. Their integrity is proven by the
// ki-trades AUTH-1 comparison against the sender's copy, which is insensitive to formatting
// and sensitive to meaning — an exclusion list only avoided touching them and never checked
// them, and it never covered Biome at all.
export const PRETTIER_IGNORE_DEFAULT = `# Generated output and dependencies are never formatted.

dist/
node_modules/
`

export const MARKDOWNLINT_DEFAULT = `{
  // Base: enable all rules, then selectively adjust below.
  "config": {
    "default": true,

    // MD013 - line length: disabled. Prettier owns line length via printWidth / proseWrap.
    "MD013": false,

    // MD024 - duplicate headings: allow in sibling sections only.
    "MD024": { "siblings_only": true },

    // MD025 - single H1: ignore the frontmatter title field.
    "MD025": { "front_matter_title": "" },

    // MD033 - inline HTML: disabled. <br> is used in table cells and skills use angle-bracket placeholders.
    "MD033": false,

    // MD036 - bold as heading: disabled. Bold labels are used intentionally in skill bodies.
    "MD036": false
  },

  // Skill bodies, references, and repo docs are all markdown content.
  "globs": ["**/*.md"],

  // Never lint generated output, dependencies, or runtime projections. Trade records
  // are in scope like any other Markdown: ki-trades AUTH-1 proves their integrity by
  // comparing meaning against the sender's copy, so formatting them is safe.
  "ignores": [
    "dist/**",
    "**/node_modules/**",
    "src/generated/**",
    ".claude/commands/**",
    ".claude/skills/**",
    ".claude/agents/**",
    ".agents/skills/**"
  ]
}
`

const MARKDOWN_PATHS = [
  '**/*.md',
  '!src/generated/**',
  '!.claude/commands/**',
  '!.claude/skills/**',
  '!.claude/agents/**',
  '!.agents/skills/**'
] as const

const MARKDOWN_AUDIT_COMMANDS: readonly ConformCommand[] = [
  {
    program: 'bunx',
    arguments: [
      'prettier',
      '--check',
      ...MARKDOWN_PATHS,
      '--ignore-path',
      '.gitignore',
      '--ignore-path',
      '.prettierignore'
    ]
  },
  { program: 'bunx', arguments: ['markdownlint-cli2', '**/*.md'] }
]

const MARKDOWN_CONFORM_COMMANDS: readonly ConformCommand[] = [
  {
    program: 'bunx',
    arguments: [
      'prettier',
      '--write',
      ...MARKDOWN_PATHS,
      '--ignore-path',
      '.gitignore',
      '--ignore-path',
      '.prettierignore'
    ]
  },
  { program: 'bunx', arguments: ['markdownlint-cli2', '--fix'] }
]

export type OwnedFile = '.prettierrc.json' | '.editorconfig' | '.prettierignore' | '.markdownlint-cli2.jsonc'
export type OwnedFileState = 'missing' | 'canonical' | 'drifted' | 'unsafe'
export type MarkdownAudit = { clean: boolean; detail?: string }
export type FrontmatterFileEvidence = {
  path: string
  count: number
  normalise?: () => void
}
export type FrontmatterRubricContext = {
  files: readonly FrontmatterFileEvidence[]
}
export type MarkdownRubricContext = {
  target: string
  exists: boolean
  audit: MarkdownAudit
  frontmatter: FrontmatterRubricContext
  normalise?: () => void
}
export type OwnedFileEvidence = {
  name: OwnedFile
  state: OwnedFileState
  synchronise?: () => void
}
export type OwnedRubricContext = {
  targetExists: boolean
  files: readonly OwnedFileEvidence[]
}
export type TomlRubricContext = Record<string, never>
export type SynchronisationRubricContext = Record<string, never>
export type AuthoringRubricContext = {
  rubric: RubricPublicationContext
  markdown: MarkdownRubricContext
  owned: OwnedRubricContext
  toml: TomlRubricContext
  synchronisation: SynchronisationRubricContext
}

type OwnedFileDraft = {
  evidence: OwnedFileEvidence
  proposal: () => ConformWrite | undefined
}

type FrontmatterFileDraft = {
  evidence: FrontmatterFileEvidence
  proposal: () => ConformWrite | undefined
}

const canonical: Record<OwnedFile, string> = {
  '.prettierrc.json': PRETTIER_DEFAULT,
  '.editorconfig': EDITORCONFIG_DEFAULT,
  '.prettierignore': PRETTIER_IGNORE_DEFAULT,
  '.markdownlint-cli2.jsonc': MARKDOWNLINT_DEFAULT
}

const sha256 = (content: string): string => createHash('sha256').update(content).digest('hex')

const FRONTMATTER_IGNORED_DIRECTORIES = new Set(['.git', 'dist', 'node_modules'])
const FRONTMATTER_IGNORED_PATHS = [
  'src/generated',
  '.claude/commands',
  '.claude/skills',
  '.claude/agents',
  '.agents/skills'
]
const YAML_SIGNIFICANT_SCALARS = /^(?:true|false|null|y|n|yes|no|on|off|\.nan|\.inf)$/i
const BARE_SAFE_SCALAR = /^[A-Za-z_][A-Za-z0-9_-]*$/

const frontmatterPathIsIgnored = (path: string): boolean =>
  FRONTMATTER_IGNORED_PATHS.some((ignored) => path === ignored || path.startsWith(`${ignored}/`))

const markdownFiles = (repository: string, directory = '', files: string[] = []): readonly string[] => {
  for (const entry of readdirSync(join(repository, directory), { withFileTypes: true })) {
    const path = directory ? `${directory}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (!FRONTMATTER_IGNORED_DIRECTORIES.has(entry.name) && !frontmatterPathIsIgnored(path))
        markdownFiles(repository, path, files)
      continue
    }
    if (entry.isFile() && !entry.isSymbolicLink() && path.endsWith('.md') && !frontmatterPathIsIgnored(path))
      files.push(path)
  }
  return files
}

const normaliseFrontmatter = (content: string): { content: string; count: number } => {
  const frontmatter = /^(---\n)([\s\S]*?)(\n---(?:\n|$))/.exec(content)
  if (!frontmatter) return { content, count: 0 }
  let count = 0
  const fields = frontmatter[2].replace(
    /^([a-z][a-z0-9-]*: )(['"])([A-Za-z_][A-Za-z0-9_-]*)\2$/gm,
    (line, prefix, _quote, value) => {
      if (!BARE_SAFE_SCALAR.test(value) || YAML_SIGNIFICANT_SCALARS.test(value)) return line
      count += 1
      return `${prefix}${value}`
    }
  )
  return count === 0
    ? { content, count }
    : { content: `${frontmatter[1]}${fields}${frontmatter[3]}${content.slice(frontmatter[0].length)}`, count }
}

const createFrontmatterDrafts = (repository: string, mutable: boolean): readonly FrontmatterFileDraft[] =>
  markdownFiles(repository).flatMap((path) => {
    const original = readFileSync(join(repository, path), 'utf8')
    const normalised = normaliseFrontmatter(original)
    if (normalised.count === 0) return []
    let requested = false
    return [
      {
        evidence: {
          path,
          count: normalised.count,
          ...(mutable
            ? {
                normalise: () => {
                  requested = true
                }
              }
            : {})
        },
        proposal: () => (requested ? { path, content: normalised.content } : undefined)
      }
    ]
  })

const inspectOwnedFile = (repository: string, name: OwnedFile): OwnedFileState => {
  const path = join(repository, name)
  if (!existsSync(path)) return 'missing'
  const metadata = lstatSync(path)
  if (!metadata.isFile() || metadata.isSymbolicLink()) return 'unsafe'
  const original = readFileSync(path, 'utf8')
  return sha256(original) === sha256(canonical[name]) ? 'canonical' : 'drifted'
}

const createOwnedFileDraft = (repository: string, name: OwnedFile, mutable: boolean): OwnedFileDraft => {
  const state = inspectOwnedFile(repository, name)
  let requested = false
  return {
    evidence: {
      name,
      state,
      ...(mutable && state !== 'unsafe'
        ? {
            synchronise: () => {
              requested = true
            }
          }
        : {})
    },
    proposal: () =>
      requested && state !== 'canonical'
        ? {
            path: name,
            content: canonical[name],
            ...(state === 'missing' ? { create: true } : {})
          }
        : undefined
  }
}

const commandDetail = (stdout: string | null, stderr: string | null, fallback?: string): string | undefined => {
  const detail = [stdout, stderr, fallback]
    .filter((value): value is string => Boolean(value?.trim()))
    .join('\n')
    .trim()
  return detail ? detail.split('\n').slice(0, 8).join('\n    ') : undefined
}

const inspectMarkdown = (repository: string): MarkdownAudit => {
  for (const command of MARKDOWN_AUDIT_COMMANDS) {
    const result = spawnSync(command.program, command.arguments, {
      cwd: repository,
      encoding: 'utf8',
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    if (!result.error && result.status === 0) continue
    const detail = commandDetail(result.stdout, result.stderr, result.error?.message)
    return { clean: false, ...(detail ? { detail } : {}) }
  }
  return { clean: true }
}

export type MarkdownInspector = (repository: string) => MarkdownAudit

export const createAuthoringSession = (
  { mode, repository, publication }: RubricContextOptions,
  markdownInspector: MarkdownInspector = inspectMarkdown
): RubricSession<AuthoringRubricContext> => {
  const target = resolve(repository)
  const targetExists = existsSync(target) && lstatSync(target).isDirectory()
  const mutable = mode === 'conform' && targetExists
  let normaliseMarkdown = false
  const ownedDrafts = (Object.keys(canonical) as OwnedFile[]).map((name) => createOwnedFileDraft(target, name, mutable))
  const frontmatterDrafts = targetExists ? createFrontmatterDrafts(target, mutable) : []
  const context: AuthoringRubricContext = {
    rubric: { publication },
    markdown: {
      target,
      exists: targetExists,
      audit: targetExists ? markdownInspector(target) : { clean: false },
      frontmatter: { files: frontmatterDrafts.map((draft) => draft.evidence) },
      ...(mutable
        ? {
            normalise: () => {
              normaliseMarkdown = true
            }
          }
        : {})
    },
    owned: {
      targetExists,
      files: ownedDrafts.map((draft) => draft.evidence)
    },
    toml: {},
    synchronisation: {}
  }

  return {
    subjects: [
      { families: ['RUBRIC'], context: () => context },
      { families: ['MD', 'OWN', 'TOML', 'SYNC'], context: () => context }
    ],
    proposal: () => ({
      writes: ownedDrafts
        .flatMap((draft) => {
          const write = draft.proposal()
          return write ? [write] : []
        })
        .concat(
          frontmatterDrafts.flatMap((draft) => {
            const write = draft.proposal()
            return write ? [write] : []
          })
        ),
      ...(normaliseMarkdown ? { commands: MARKDOWN_CONFORM_COMMANDS } : {})
    })
  }
}
