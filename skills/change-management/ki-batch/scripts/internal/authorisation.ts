import { lstatSync, readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const AUTHORISATION_DIRECTORY = '+/_AUTHORISATIONS'
const AUTHORISATION_FIELDS = new Set([
  'id',
  'repository',
  'approved',
  'approved_at',
  'timebox_ends_at',
  'item_ids',
  'completion_target',
  'mandatory_stops',
  'closure_item_ids'
])

export type BatchAuthorisation = {
  id: string
  repository: string
  approved: boolean
  approvedAt: string | null
  timeboxEndsAt: string
  itemIds: readonly string[]
  completionTarget: 'awaiting-review'
  mandatoryStops: readonly string[]
  closureItemIds: readonly string[]
}

export type BatchAuthorisationResolution =
  | { kind: 'resolved'; authorisation: BatchAuthorisation; writes: false }
  | { kind: 'stop'; reason: string; writes: false }

export type ResolveBatchAuthorisationInput = {
  repositoryRoot: string
  authorisationPath: string
  repositoryIdentity: string
  now: Date
}

const stop = (reason: string): BatchAuthorisationResolution => ({ kind: 'stop', reason, writes: false })

const frontmatter = (contents: string): Record<string, unknown> | undefined => {
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(contents)
  if (!match?.[1]) return undefined
  try {
    const value = Bun.YAML.parse(match[1])
    return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined
  } catch {
    return undefined
  }
}

const timestamp = (value: unknown): string | undefined =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) && !Number.isNaN(Date.parse(value))
    ? value
    : undefined

const identifiers = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) &&
  value.length > 0 &&
  value.every((item) => typeof item === 'string' && /^[A-Z][A-Z0-9-]*-\d{3}$/.test(item))
    ? (value as readonly string[])
    : undefined

const strings = (value: unknown): readonly string[] | undefined =>
  Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === 'string' && item.trim())
    ? (value as readonly string[])
    : undefined

export const resolveBatchAuthorisation = ({
  repositoryRoot,
  authorisationPath,
  repositoryIdentity,
  now
}: ResolveBatchAuthorisationInput): BatchAuthorisationResolution => {
  const root = resolve(repositoryRoot)
  const directory = resolve(root, AUTHORISATION_DIRECTORY)
  const path = resolve(authorisationPath)
  const pathWithinDirectory = relative(directory, path)
  if (
    !pathWithinDirectory ||
    pathWithinDirectory.startsWith('..') ||
    pathWithinDirectory.includes('/') ||
    !path.endsWith('.md')
  )
    return stop('batch authorisation is not a canonical local record')

  let contents: string
  try {
    const state = lstatSync(path)
    if (!state.isFile() || state.isSymbolicLink()) return stop('batch authorisation must be a regular local file')
    contents = readFileSync(path, 'utf8')
  } catch {
    return stop('batch authorisation does not exist')
  }

  const fields = frontmatter(contents)
  if (!fields) return stop('batch authorisation has invalid frontmatter')
  if (Object.keys(fields).some((field) => !AUTHORISATION_FIELDS.has(field)))
    return stop('batch authorisation has unsupported fields')

  const id = fields.id
  const repository = fields.repository
  const approved = fields.approved
  const approvedAt = fields.approved_at
  const timeboxEndsAt = timestamp(fields.timebox_ends_at)
  const itemIds = identifiers(fields.item_ids)
  const mandatoryStops = strings(fields.mandatory_stops)
  const closureItemIds = fields.closure_item_ids === undefined ? [] : identifiers(fields.closure_item_ids)

  if (typeof id !== 'string' || !/^[A-Z][A-Z0-9-]*-BATCH-\d{3}$/.test(id) || pathWithinDirectory !== `${id}.md`)
    return stop('batch authorisation has an invalid identity or filename')
  if (typeof repository !== 'string' || !repository) return stop('batch authorisation must name one repository')
  if (typeof approved !== 'boolean') return stop('batch authorisation must declare approval')
  if (approved ? !timestamp(approvedAt) : approvedAt !== null)
    return stop('batch authorisation has invalid approval evidence')
  if (!timeboxEndsAt || !itemIds || !mandatoryStops || !closureItemIds)
    return stop('batch authorisation has invalid required fields')
  if (fields.completion_target !== 'awaiting-review')
    return stop('batch authorisation has an invalid completion target')
  if (closureItemIds.some((item) => !itemIds.includes(item)))
    return stop('batch authorisation grants closure outside its named items')
  if (repository !== repositoryIdentity) return stop('batch authorisation names another repository')
  if (!approved) return stop('batch authorisation is not approved')
  if (Date.parse(timeboxEndsAt) <= now.getTime()) return stop('batch authorisation timebox has expired')

  return {
    kind: 'resolved',
    authorisation: {
      id,
      repository,
      approved,
      approvedAt: approvedAt as string,
      timeboxEndsAt,
      itemIds,
      completionTarget: 'awaiting-review',
      mandatoryStops,
      closureItemIds
    },
    writes: false
  }
}
