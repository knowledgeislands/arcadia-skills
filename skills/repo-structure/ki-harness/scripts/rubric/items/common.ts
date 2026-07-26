import type { AuditOutcome, RubricOutcomes } from '../../shared/rubric.ts'
export const outcomes = <Result>(values: Result[]): RubricOutcomes<Result> => {
  if (values.length === 0) throw new Error('rubric execution must return at least one outcome')
  return values as unknown as RubricOutcomes<Result>
}
export const result = (status: AuditOutcome['status'], message: string, subject?: string): RubricOutcomes<AuditOutcome> => [
  { status, message, ...(subject ? { subject } : {}) }
]
