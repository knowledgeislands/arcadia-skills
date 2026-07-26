import type { AuditOutcome, RubricItem, RubricOutcomes } from '../../shared/rubric.ts'
import { auditOutcome, type RoadmapContext } from '../contexts/roadmap.ts'

export const outcomes = <T>(values: readonly T[], fallback: T): RubricOutcomes<T> => [values[0] ?? fallback, ...values.slice(1)]

export const audit = (code: string, context: RoadmapContext): RubricOutcomes<AuditOutcome> =>
  outcomes(context.audit.filter((finding) => finding.area === code).map(auditOutcome), { status: 'PASS', message: 'No violations found.' })

export const mechanical = (
  code: string,
  title: string,
  description: string,
  level: 'FAIL' | 'WARN' = 'FAIL'
): RubricItem<RoadmapContext> => ({
  code,
  title,
  description,
  sources: [code.startsWith('PLAN-') ? 'plan-format.md' : 'standards.md'],
  mechanical: {
    level,
    audit: { phase: 'INSPECT', run: (context) => audit(code, context) }
  }
})
