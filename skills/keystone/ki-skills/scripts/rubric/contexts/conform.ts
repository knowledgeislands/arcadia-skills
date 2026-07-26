import { readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { frontmatterLine, parseFrontmatter, replaceFrontmatterScalar } from './frontmatter.ts'
import type { SkillWritableCapabilities } from './skill.ts'

export type ConformWrite = {
  readonly path: string
  readonly content: string
}

export type ConformDocumentState = {
  read: () => string
  write: (content: string) => void
  proposal: () => ConformWrite | undefined
}

export type SkillConformState = {
  capabilities: SkillWritableCapabilities
  document: ConformDocumentState
}

/** Hold one mutable document in memory and expose its host-owned write proposal. */
export const createConformDocumentState = (file: string, repository: string): ConformDocumentState => {
  const original = readFileSync(file, 'utf8')
  let working = original
  return {
    read: () => working,
    write: (content) => {
      working = content
    },
    proposal: () => (working === original ? undefined : { path: relative(repository, file), content: working })
  }
}

/** Add item-owned frontmatter transformations to the shared SKILL.md draft. */
export const createSkillConformState = (directory: string, repository: string): SkillConformState => {
  const document = createConformDocumentState(join(directory, 'SKILL.md'), repository)
  const updateFrontmatter = (update: (block: string) => string): void => {
    const content = document.read()
    const block = parseFrontmatter(content).raw
    if (block !== null) document.write(content.replace(block, update(block)))
  }

  return {
    document,
    capabilities: {
      readContent: document.read,
      setName: (name) => {
        updateFrontmatter((block) => {
          const line = frontmatterLine(block, 'name')
          return line ? block.replace(line, `name: ${name}`) : block
        })
      },
      setArgumentHint: (argumentHint) => {
        updateFrontmatter((block) => replaceFrontmatterScalar(block, 'argument-hint', argumentHint))
      }
    }
  }
}
