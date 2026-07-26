import type { AuditOutcome, RubricItem, RubricOutcomes, ViolationLevel } from '../../shared/rubric.ts'
import type { ToolsContext } from '../contexts/tools.ts'
export const one = (outcome: AuditOutcome): RubricOutcomes<AuditOutcome> => [outcome]
export const mechanical = (
  code: string,
  title: string,
  description: string,
  level: ViolationLevel,
  run: (context: ToolsContext) => RubricOutcomes<AuditOutcome>
): RubricItem<ToolsContext> => ({
  code,
  title,
  description,
  sources: ['standards.md'],
  mechanical: {
    level,
    audit: { phase: 'INSPECT', run }
  }
})
export const judgment = (code: string, title: string, description: string): RubricItem<ToolsContext> => ({
  code,
  title,
  description,
  sources: ['standards.md'],
  judgment: { prompt: description }
})
