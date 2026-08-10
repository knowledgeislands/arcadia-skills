import { execFile } from 'node:child_process'
import { lstatSync, readdirSync, readFileSync, realpathSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'
import type {
  AuditOutcome,
  ConformWrite,
  RubricContextOptions,
  RubricEmitter,
  RubricPublicationContext,
  RubricSession
} from '../../shared/rubric.ts'

const FORMULA_DIRECTORY = 'Formula'
const CONFIG_FILE = '.ki-config.toml'
const CONFIG_SECTION = 'ki-repo-homebrew-tap'
const run = promisify(execFile)

type NodeKind = 'missing' | 'file' | 'directory' | 'unsafe'
type FormulaDirectoryState = 'missing' | 'present' | 'unsafe'
type ConfigState = 'missing' | 'unsafe' | 'malformed' | 'absent' | 'present'

export type FormulaEvidence = {
  readonly name: string
  readonly file: string
  readonly text: string
}

export type TapContext = {
  readonly targetExists: boolean
  readonly applicable: boolean
  readonly formulaDirectory: FormulaDirectoryState
  readonly formulae: readonly FormulaEvidence[]
  readonly homebrewValidation: readonly AuditOutcome[]
  readonly readme: string | null
}

export type HomebrewCommandResult = {
  readonly ok: boolean
  readonly stdout: string
  readonly detail?: string
  readonly unavailable?: boolean
}

export type HomebrewCommandRunner = (arguments_: readonly string[], cwd: string) => Promise<HomebrewCommandResult>

export type HomebrewValidationCollector = (
  target: string,
  formulae: readonly FormulaEvidence[],
  runCommand?: HomebrewCommandRunner,
  emit?: RubricEmitter
) => Promise<readonly AuditOutcome[]>

type ActiveTap = {
  readonly name: string
  readonly repository: string
}

export type TapConfigContext = {
  readonly targetExists: boolean
  readonly applicable: boolean
  readonly config: ConfigState
  readonly configKeys: readonly string[]
  readonly addMarker?: () => void
}

export type HomebrewTapRubricContext = {
  readonly rubric: RubricPublicationContext
  readonly tap: TapContext
  readonly config: TapConfigContext
}

const nodeKind = (path: string): NodeKind => {
  try {
    const stat = lstatSync(path)
    if (stat.isSymbolicLink()) return 'unsafe'
    if (stat.isFile()) return 'file'
    if (stat.isDirectory()) return 'directory'
    return 'unsafe'
  } catch {
    return 'missing'
  }
}

const inspectConfig = (
  path: string,
  kind: NodeKind
): { readonly state: ConfigState; readonly keys: readonly string[]; readonly content: string | null } => {
  if (kind === 'missing') return { state: 'missing', keys: [], content: null }
  if (kind !== 'file') return { state: 'unsafe', keys: [], content: null }
  const content = readFileSync(path, 'utf8')
  try {
    const parsed = Bun.TOML.parse(content) as Record<string, unknown>
    const candidate = (parsed.skills as Record<string, unknown> | undefined)?.[CONFIG_SECTION]
    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate))
      return { state: 'present', keys: Object.keys(candidate as Record<string, unknown>), content }
    return { state: 'absent', keys: [], content }
  } catch {
    return { state: 'malformed', keys: [], content }
  }
}

const commandText = (value: unknown): string => {
  if (typeof value === 'string') return value.trim()
  if (Buffer.isBuffer(value)) return value.toString('utf8').trim()
  return ''
}

const runHomebrew: HomebrewCommandRunner = async (arguments_, cwd) => {
  try {
    const result = await run('brew', [...arguments_], {
      cwd,
      env: { ...process.env, HOMEBREW_NO_AUTO_UPDATE: '1' },
      maxBuffer: 1024 * 1024,
      timeout: 120_000
    })
    return { ok: true, stdout: commandText(result.stdout) }
  } catch (error) {
    const failure = error as {
      readonly code?: string
      readonly message?: string
      readonly stderr?: unknown
      readonly stdout?: unknown
    }
    const detail = [commandText(failure.stderr), commandText(failure.stdout), failure.message]
      .filter((value): value is string => Boolean(value))
      .join('\n')
    return { ok: false, stdout: commandText(failure.stdout), detail, unavailable: failure.code === 'ENOENT' }
  }
}

const activeTap = async (
  target: string,
  formulae: readonly FormulaEvidence[],
  runCommand: HomebrewCommandRunner
): Promise<ActiveTap | null> => {
  const targetPath = realpathSync(target)
  const taps = await runCommand(['tap'], target)
  if (!taps.ok) return null
  for (const tap of taps.stdout
    .split('\n')
    .map((value) => value.trim())
    .filter(Boolean)) {
    const repository = await runCommand(['--repository', tap], target)
    if (!repository.ok || repository.stdout.length === 0) continue
    try {
      const activeRepository = realpathSync(repository.stdout)
      if (activeRepository === targetPath) return { name: tap, repository: activeRepository }
      const sourceMatches = formulae.every((formula) => {
        const activeFormula = join(activeRepository, FORMULA_DIRECTORY, formula.file)
        return nodeKind(activeFormula) === 'file' && readFileSync(activeFormula, 'utf8') === formula.text
      })
      if (sourceMatches) return { name: tap, repository: activeRepository }
    } catch {
      // A stale `brew tap` record is irrelevant to this checkout.
    }
  }
  return null
}

export const collectHomebrewValidation: HomebrewValidationCollector = async (
  target,
  formulae,
  runCommand = runHomebrew,
  emit
) => {
  emit?.({ kind: 'stage', edge: 'start', label: 'Homebrew validation', code: 'TAP-7' })
  try {
    const available = await runCommand(['--version'], target)
    if (!available.ok) {
      const message = available.unavailable
        ? 'Homebrew is unavailable, so TAP-7 could not validate the formulae.'
        : `Homebrew could not start validation: ${available.detail ?? 'unknown command error'}`
      return [{ status: 'VIOLATION', message, subject: 'Formula/' }]
    }
    const tap = await activeTap(target, formulae, runCommand)
    if (!tap)
      return [
        {
          status: 'VIOLATION',
          message:
            'No active Homebrew tap has matching formula source, so TAP-7 cannot safely run `brew audit` against this checkout. Register or synchronise the tap, then retry.',
          subject: 'Formula/'
        }
      ]
    const outcomes: AuditOutcome[] = []
    for (const [index, formula] of formulae.entries()) {
      emit?.({
        kind: 'step',
        label: `Homebrew validation: ${formula.file}`,
        code: 'TAP-7',
        completed: index + 1,
        total: formulae.length
      })
      const style = await runCommand(['style', `Formula/${formula.file}`], target)
      const audit = await runCommand(['audit', '--strict', `${tap.name}/${formula.name}`], target)
      const failures = [
        ...(!style.ok ? [`style: ${style.detail ?? 'unknown command error'}`] : []),
        ...(!audit.ok ? [`audit: ${audit.detail ?? 'unknown command error'}`] : [])
      ]
      outcomes.push(
        failures.length === 0
          ? {
              status: 'PASS',
              message: 'Homebrew style and strict audit passed.',
              subject: `Formula/${formula.file}`
            }
          : {
              status: 'VIOLATION',
              message: `Homebrew validation failed. ${failures.join('\n')}`,
              subject: `Formula/${formula.file}`
            }
      )
    }
    return outcomes
  } finally {
    emit?.({ kind: 'stage', edge: 'end', label: 'Homebrew validation', code: 'TAP-7' })
  }
}

export const createHomebrewTapSession = async (
  { mode, repository, publication, emit }: RubricContextOptions,
  collectValidation: HomebrewValidationCollector = collectHomebrewValidation
): Promise<RubricSession<HomebrewTapRubricContext>> => {
  const target = resolve(repository)
  const targetExists = nodeKind(target) === 'directory'
  const formulaPath = join(target, FORMULA_DIRECTORY)
  const formulaKind = targetExists ? nodeKind(formulaPath) : 'missing'
  const formulaDirectory: FormulaDirectoryState =
    formulaKind === 'directory' ? 'present' : formulaKind === 'missing' ? 'missing' : 'unsafe'
  const formulae =
    formulaDirectory === 'present'
      ? readdirSync(formulaPath, { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith('.rb'))
          .map((entry) => entry.name)
          .sort()
          .map((file) => ({
            name: file.replace(/\.rb$/, ''),
            file,
            text: readFileSync(join(formulaPath, file), 'utf8')
          }))
      : []
  const configPath = join(target, CONFIG_FILE)
  const configEvidence = targetExists
    ? inspectConfig(configPath, nodeKind(configPath))
    : { state: 'missing' as const, keys: [], content: null }
  const applicable =
    configEvidence.state === 'present' ||
    configEvidence.state === 'malformed' ||
    configEvidence.state === 'unsafe' ||
    formulaDirectory !== 'missing'
  const homebrewValidation =
    applicable && formulae.length > 0 ? await collectValidation(target, formulae, undefined, emit) : []
  const readmePath = join(target, 'README.md')
  const readme = targetExists && nodeKind(readmePath) === 'file' ? readFileSync(readmePath, 'utf8') : null
  const originalConfig = configEvidence.content
  let configDraft = originalConfig

  const context: HomebrewTapRubricContext = {
    rubric: { publication },
    tap: {
      targetExists,
      applicable,
      formulaDirectory,
      formulae,
      homebrewValidation,
      readme
    },
    config: {
      targetExists,
      applicable,
      config: configEvidence.state,
      configKeys: configEvidence.keys,
      ...(mode === 'conform' &&
      formulaDirectory === 'present' &&
      configEvidence.state === 'absent' &&
      originalConfig !== null
        ? {
            addMarker: () => {
              if (configDraft !== originalConfig) return
              configDraft = `${originalConfig.replace(/\n*$/, '\n')}\n# This repo is a Knowledge Islands Homebrew tap.\n[skills.${CONFIG_SECTION}]\n`
            }
          }
        : {})
    }
  }

  return {
    subjects: [
      { families: ['RUBRIC'], context: () => context },
      { families: ['TAP', 'CONFIG'], context: () => context }
    ],
    proposal: () => {
      const writes: ConformWrite[] =
        configDraft !== null && originalConfig !== null && configDraft !== originalConfig
          ? [{ path: CONFIG_FILE, content: configDraft }]
          : []
      return { writes }
    }
  }
}
