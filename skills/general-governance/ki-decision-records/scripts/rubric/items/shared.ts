import type { AuditOutcome, RubricOutcomes } from '../../../../../shared/rubric-contract.ts'

export const outcomes = (values: AuditOutcome[], passMessage: string): RubricOutcomes<AuditOutcome> =>
  (values.length > 0 ? values : [{ status: 'PASS', message: passMessage }]) as unknown as RubricOutcomes<AuditOutcome>
