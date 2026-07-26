import type { EngineeringRubricContext, EngineeringRepairProposal } from '../contexts/engineering.ts'

export type EngineeringRubricCode = `${string}-${number}`
export type EngineeringViolationLevel = 'FAIL' | 'WARN'
export type EngineeringAuditOutcome = {
  readonly status: 'PASS' | 'VIOLATION' | 'NOT_APPLICABLE' | 'INFO'
  readonly message: string
  readonly subject?: string
  readonly level?: EngineeringViolationLevel
}

type EngineeringMechanicalAspect = {
  readonly level: EngineeringViolationLevel
  readonly overrideLevels?: readonly EngineeringViolationLevel[]
  readonly audit: {
    readonly phase: 'INSPECT'
    readonly run: (context: EngineeringRubricContext) => readonly EngineeringAuditOutcome[]
  }
  readonly repair?: {
    readonly phase: 'PRIMARY'
    readonly run: (context: EngineeringRubricContext) => EngineeringRepairProposal
  }
}

export type EngineeringRubricItem = {
  readonly code: EngineeringRubricCode
  readonly title: string
  readonly description: string
  readonly sources: readonly [string, ...string[]]
  readonly mechanical?: EngineeringMechanicalAspect
  readonly judgment?: { readonly prompt: string }
}

const SOURCE = ['standards.md'] as const
const SAFE_REPAIRS = new Set<EngineeringRubricCode>([
  'PKG-1',
  'PKG-2',
  'PKG-3',
  'PKG-5',
  'PKG-6',
  'MISE-1',
  'SCR-2',
  'SCR-3',
  'SCR-5',
  'TSC-2',
  'BIO-1',
  'BIO-2',
  'KNIP-1',
  'KNIP-2',
  'SYNC-1',
  'DEPS-1',
  'TOML-1'
])

const audit = (
  code: EngineeringRubricCode,
  defaultLevel: EngineeringViolationLevel,
  overrideLevels: readonly EngineeringViolationLevel[] | undefined,
  context: EngineeringRubricContext
): readonly EngineeringAuditOutcome[] => {
  const outcomes = context
    .audit(code)
    .filter((finding) => finding.code === code)
    .map((finding) => ({
      status:
        finding.level === 'PASS'
          ? ('PASS' as const)
          : finding.level === 'NOT_APPLICABLE'
            ? ('NOT_APPLICABLE' as const)
            : finding.level === 'FAIL' || finding.level === 'WARN'
              ? ('VIOLATION' as const)
              : ('INFO' as const),
      message: finding.message,
      ...(finding.subject ? { subject: finding.subject } : {}),
      ...(finding.level !== defaultLevel && overrideLevels?.includes(finding.level as EngineeringViolationLevel)
        ? { level: finding.level as EngineeringViolationLevel }
        : {})
    }))
  return outcomes.length ? outcomes : [{ status: 'NOT_APPLICABLE', message: `${code} did not apply to this target` }]
}

export const mechanical = (
  code: EngineeringRubricCode,
  title: string,
  description: string,
  level: EngineeringViolationLevel,
  overrideLevels?: readonly EngineeringViolationLevel[]
): EngineeringRubricItem => ({
  code,
  title,
  description,
  sources: SOURCE,
  mechanical: {
    level,
    ...(overrideLevels ? { overrideLevels } : {}),
    audit: { phase: 'INSPECT', run: (context) => audit(code, level, overrideLevels, context) },
    ...(SAFE_REPAIRS.has(code) ? { repair: { phase: 'PRIMARY' as const, run: (context: EngineeringRubricContext) => context.repair(code) } } : {})
  }
})

export const judgment = (
  code: EngineeringRubricCode,
  title: string,
  description: string,
  prompt: string
): EngineeringRubricItem => ({
  code,
  title,
  description,
  sources: SOURCE,
  judgment: { prompt }
})
