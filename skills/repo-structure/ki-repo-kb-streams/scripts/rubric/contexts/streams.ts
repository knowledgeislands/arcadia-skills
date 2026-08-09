import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import type {
  AuditOutcome,
  RubricContextOptions,
  RubricPublication,
  RubricPublicationContext,
  RubricSession,
  ViolationLevel
} from '../../shared/rubric.ts'

const OPERATIONAL_AREAS = ['Roadmap', 'Housekeeping', 'Trades'] as const
const REQUIRED_AREAS = ['Roadmap', 'Housekeeping'] as const
const EXECUTION_FAMILIES = ['STREAM', 'GATE', 'CONFIG'] as const
const LEGACY_FOLDERS = [
  'Active',
  'Background',
  'Dormant',
  'Now',
  'Next',
  'Soon',
  'Waiting for',
  'Parked',
  'Future'
] as const
const STREAMS_TABLE = 'ki-repo-kb-streams'

export type StreamsEvidence = {
  level: 'FAIL' | 'WARN' | 'INFO' | 'NOT_APPLICABLE' | 'PASS'
  message: string
  subject?: string
}

export type StreamRubricContext = {
  operationalAreas: readonly StreamsEvidence[]
  legacyFolders: readonly StreamsEvidence[]
}

export type GateRubricContext = {
  anchor: readonly StreamsEvidence[]
}

export type ConfigRubricContext = {
  knownKeys: readonly StreamsEvidence[]
  noteTypeScheme: readonly StreamsEvidence[]
}

export type StreamsRubricContext = {
  rubric: RubricPublicationContext
  stream: StreamRubricContext
  gate: GateRubricContext
  config: ConfigRubricContext
}

type StreamsConfiguration = {
  keys: Record<string, string>
  ownKeys: readonly string[]
  streams: string
}

export const auditEvidence = (
  evidence: readonly StreamsEvidence[],
  defaultLevel: ViolationLevel,
  overrideLevels?: readonly ViolationLevel[]
): readonly AuditOutcome[] =>
  evidence.map((finding): AuditOutcome => {
    if (finding.level === 'FAIL' || finding.level === 'WARN') {
      const level = finding.level
      return {
        status: 'VIOLATION',
        message: finding.message,
        ...(finding.subject ? { subject: finding.subject } : {}),
        ...(level !== defaultLevel && overrideLevels?.includes(level) ? { level } : {})
      }
    }
    return {
      status: finding.level,
      message: finding.message,
      ...(finding.subject ? { subject: finding.subject } : {})
    }
  })

const directory = (path: string): boolean => existsSync(path) && lstatSync(path).isDirectory()
const regularFile = (path: string): boolean =>
  existsSync(path) && lstatSync(path).isFile() && !lstatSync(path).isSymbolicLink()

const directories = (path: string): string[] =>
  directory(path)
    ? readdirSync(path, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : []

const markdownPaths = (path: string, values: string[] = []): string[] => {
  for (const entry of directory(path) ? readdirSync(path, { withFileTypes: true }) : []) {
    if (entry.name.startsWith('.')) continue
    const child = join(path, entry.name)
    if (entry.isDirectory()) markdownPaths(child, values)
    else if (entry.isFile() && entry.name.endsWith('.md')) values.push(child)
  }
  return values
}

const parseConfiguration = (text: string): StreamsConfiguration => {
  try {
    const document = Bun.TOML.parse(text) as Record<string, unknown>
    const own = (document.skills as Record<string, unknown> | undefined)?.[STREAMS_TABLE] as
      | Record<string, unknown>
      | undefined
    const kb = (document.skills as Record<string, unknown> | undefined)?.['ki-repo-kb'] as
      | Record<string, unknown>
      | undefined
    const zones = kb?.zones as Record<string, unknown> | undefined
    return {
      keys: Object.fromEntries(
        Object.entries(own ?? {})
          .filter(([key]) => ['process_note', 'note_type_scheme'].includes(key))
          .map(([key, value]) => [key, String(value)])
      ),
      ownKeys: Object.keys(own ?? {}),
      streams: typeof zones?.Streams === 'string' ? zones.Streams : 'Streams'
    }
  } catch {
    return { keys: {}, ownKeys: [], streams: 'Streams' }
  }
}

const sample = (values: readonly string[]): string => values.slice(0, 10).join('; ')

const unavailableContext = (
  publication: RubricPublication | undefined,
  level: 'FAIL' | 'NOT_APPLICABLE',
  message: string,
  subject?: string
): StreamsRubricContext => {
  const evidence: StreamsEvidence = { level, message, ...(subject ? { subject } : {}) }
  const notApplicable: StreamsEvidence[] = [{ level: 'NOT_APPLICABLE', message: 'Streams evidence is unavailable.' }]
  return {
    rubric: { publication },
    stream: { operationalAreas: [evidence], legacyFolders: notApplicable },
    gate: { anchor: notApplicable },
    config: { knownKeys: notApplicable, noteTypeScheme: notApplicable }
  }
}

export const createStreamsSession = ({
  repository,
  publication
}: RubricContextOptions): RubricSession<StreamsRubricContext> => {
  const root = resolve(repository)
  if (!directory(root)) {
    const context = unavailableContext(publication, 'FAIL', 'Target is not a directory.', root)
    return {
      subjects: [
        { families: ['RUBRIC'], context: () => context },
        { families: EXECUTION_FAMILIES, context: () => context }
      ],
      proposal: () => ({ writes: [] })
    }
  }

  const configPath = join(root, '.ki-config.toml')
  const configuration = parseConfiguration(regularFile(configPath) ? readFileSync(configPath, 'utf8') : '')
  const streamsPath = join(root, configuration.streams)
  if (!directory(streamsPath)) {
    const context = unavailableContext(
      publication,
      'NOT_APPLICABLE',
      `No ${configuration.streams}/ zone; its presence is owned by ki-repo-kb.`
    )
    return {
      subjects: [
        { families: ['RUBRIC'], context: () => context },
        { families: EXECUTION_FAMILIES, context: () => context }
      ],
      proposal: () => ({ writes: [] })
    }
  }

  const present = directories(streamsPath)
  const missingAreas = REQUIRED_AREAS.filter((area) => !present.includes(area))
  const unexpectedAreas = present.filter(
    (name) => !OPERATIONAL_AREAS.includes(name as (typeof OPERATIONAL_AREAS)[number])
  )
  const legacy = present.filter((name) => LEGACY_FOLDERS.includes(name as (typeof LEGACY_FOLDERS)[number]))
  const operationalAreas: StreamsEvidence[] = [
    {
      level: missingAreas.length || unexpectedAreas.length ? 'WARN' : 'PASS',
      message:
        missingAreas.length || unexpectedAreas.length
          ? `Streams operational areas need review: missing ${missingAreas.join(', ') || 'none'}; unexpected ${unexpectedAreas.join(', ') || 'none'}.`
          : 'Streams contains the configured Roadmap and Housekeeping operational areas.',
      subject: configuration.streams
    }
  ]
  const legacyFolders: StreamsEvidence[] = [
    {
      level: legacy.length ? 'WARN' : 'PASS',
      message: legacy.length
        ? `Legacy Streams state or Focus folders: ${sample(legacy)}.`
        : 'No legacy Streams state or Focus folders are present.',
      subject: configuration.streams
    }
  ]
  const roadmapPath = join(streamsPath, 'Roadmap')
  const hasRoadmapRecords = markdownPaths(roadmapPath).some((path) => basename(path) !== '_ISSUES.md')
  const anchorFiles = ['CLAUDE.md', 'AGENTS.md'].filter((name) => regularFile(join(root, name)))
  const anchored = anchorFiles.some((name) => {
    const content = readFileSync(join(root, name), 'utf8')
    return /Enactment Process|ki-repo-kb-streams/i.test(content) && /Roadmap|canonical/i.test(content)
  })
  const anchor: StreamsEvidence[] = [
    {
      level: !hasRoadmapRecords ? 'NOT_APPLICABLE' : anchored ? 'PASS' : 'WARN',
      message: !hasRoadmapRecords
        ? 'No roadmap records yet; the gate is not required.'
        : anchored
          ? 'Enactment gate is anchored.'
          : 'Enactment gate is not anchored in root CLAUDE.md or AGENTS.md.',
      ...(anchorFiles.length ? { subject: anchorFiles.join(', ') } : {})
    }
  ]
  const unknownKeys = configuration.ownKeys.filter(
    (key) => !['process_note', 'note_type_scheme', 'areas'].includes(key)
  )
  const knownKeys: StreamsEvidence[] = [
    {
      level: unknownKeys.length ? 'WARN' : 'PASS',
      message: unknownKeys.length
        ? `Unrecognised ki-repo-kb-streams key(s): ${unknownKeys.join(', ')}.`
        : 'Only recognised ki-repo-kb-streams keys are present.',
      subject: '.ki-config.toml'
    }
  ]
  const scheme = configuration.keys.note_type_scheme
  const noteTypeScheme: StreamsEvidence[] = [
    {
      level: scheme && !['type', 'tags'].includes(scheme) ? 'WARN' : 'PASS',
      message:
        scheme && !['type', 'tags'].includes(scheme)
          ? `Invalid note_type_scheme: ${scheme}.`
          : 'Note type scheme is canonical or absent.',
      subject: '.ki-config.toml'
    }
  ]
  const context: StreamsRubricContext = {
    rubric: { publication },
    stream: { operationalAreas, legacyFolders },
    gate: { anchor },
    config: { knownKeys, noteTypeScheme }
  }

  return {
    subjects: [
      { families: ['RUBRIC'], context: () => context },
      { families: EXECUTION_FAMILIES, context: () => context }
    ],
    proposal: () => ({ writes: [] })
  }
}
