import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import type { ConformWrite, RubricContextOptions, RubricSession } from '../../shared/rubric.ts'

const SKIP_DIRECTORIES = new Set(['node_modules', '.git', 'dist', '.ki', '.attic', '.claude'])

export type HandoffArtifact = {
  path: string
  subject: string
  content: string
  frontmatterBlock: string
  frontmatterMatch: string
  frontmatter: Readonly<Record<string, string>>
  body: string
  writeContent?: (content: string) => void
}

export type HandoffsRubricContext = {
  target: string
  targetExists: boolean
  artifacts: readonly HandoffArtifact[]
}

type HandoffDocument = {
  read: () => string
  write: (content: string) => void
  proposal: () => ConformWrite | undefined
}

const parseFrontmatter = (block: string): Record<string, string> => {
  const frontmatter: Record<string, string> = {}
  for (const line of block.split('\n')) {
    const match = line.match(/^([a-zA-Z-]+):\s*(.*)$/)
    if (!match) continue
    frontmatter[match[1] as string] = (match[2] as string)
      .trim()
      .replace(/\s+#.*$/, '')
      .replace(/^['"]|['"]$/g, '')
  }
  return frontmatter
}

const discoverMarkdown = (target: string): string[] => {
  if (!existsSync(target)) return []
  if (statSync(target).isFile()) return [target]
  const files: string[] = []
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRECTORIES.has(entry.name)) walk(join(directory, entry.name))
      } else if (entry.isFile() && entry.name.endsWith('.md')) files.push(join(directory, entry.name))
    }
  }
  walk(target)
  return files.sort()
}

const createDocument = (path: string, repository: string): HandoffDocument => {
  const original = readFileSync(path, 'utf8')
  let working = original
  return {
    read: () => working,
    write: (content) => {
      working = content
    },
    proposal: () => (working === original ? undefined : { path: relative(repository, path), content: working })
  }
}

const readOptedInArtifact = (target: string, path: string, document?: HandoffDocument): HandoffArtifact | null => {
  const content = document?.read() ?? readFileSync(path, 'utf8')
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  const frontmatterBlock = match[1] as string
  const frontmatter = parseFrontmatter(frontmatterBlock)
  if (frontmatter.handoff !== 'true') return null
  return {
    path,
    subject: relative(target, path) || path,
    content,
    frontmatterBlock,
    frontmatterMatch: match[0],
    frontmatter,
    body: content.slice(match[0].length),
    ...(document ? { writeContent: document.write } : {})
  }
}

export const hasDecisionsHeading = (artifact: HandoffArtifact): boolean => /^#{2,}\s+.*decisions/im.test(artifact.body)
export const namesLocked = (artifact: HandoffArtifact): boolean => /locked/i.test(artifact.body)
export const namesEscalate = (artifact: HandoffArtifact): boolean => /escalate/i.test(artifact.body)
export const hasReadinessMarker = (artifact: HandoffArtifact): boolean =>
  'readiness' in artifact.frontmatter || /^#{2,}\s+readiness/im.test(artifact.body) || /\[[ xX]\]\s*readiness test/i.test(artifact.body)

export const createHandoffsSession = ({ mode, repository }: RubricContextOptions): RubricSession<HandoffsRubricContext> => {
  const target = resolve(repository)
  const targetExists = existsSync(target)
  const documents = new Map<string, HandoffDocument>()
  const artifacts = targetExists
    ? discoverMarkdown(target)
        .map((path) => {
          const document = mode === 'conform' ? createDocument(path, target) : undefined
          const artifact = readOptedInArtifact(target, path, document)
          if (artifact && document) documents.set(path, document)
          return artifact
        })
        .filter((artifact): artifact is HandoffArtifact => artifact !== null)
    : []
  const context: HandoffsRubricContext = { target, targetExists, artifacts }

  return {
    subjects: [{ families: ['HAND'], context: () => context }],
    proposal: () => ({
      writes: [...documents.values()].flatMap((document) => {
        const write = document.proposal()
        return write ? [write] : []
      })
    })
  }
}
