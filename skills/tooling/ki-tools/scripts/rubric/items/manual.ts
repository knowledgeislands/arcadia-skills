import type { AuditOutcome, RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { ManualToolsContext, ToolsRubricContext } from '../contexts/tools.ts'

const STANDARD = 'standards-tool-repositories.md'
const one = (outcome: AuditOutcome): readonly AuditOutcome[] => [outcome]

const MAN_LINT: RubricItem<ManualToolsContext> = {
  code: 'MAN-LINT',
  title: 'Manual lint CI',
  description: 'A physical man/<tool>.1 page has a CI workflow that runs mandoc -T lint.',
  sources: [STANDARD],
  mechanical: {
    level: 'WARN',
    audit: {
      phase: 'INSPECT',
      run: (context) => {
        if (!context.applicable) return one({ status: 'NOT_APPLICABLE', message: 'No qualified ki-tools declaration or bin/ structural marker is present.' })
        if (context.manual === 'missing') return one({ status: 'NOT_APPLICABLE', message: `No ${context.manualPath} source page is present.` })
        if (context.manual === 'unsafe')
          return one({ status: 'VIOLATION', message: `${context.manualPath} is not a physical regular file.`, subject: context.manualPath })
        if (context.workflows === 'unsafe' || context.unsafeWorkflowEntries.length > 0)
          return one({ status: 'VIOLATION', message: 'CI workflow evidence is unsafe or unreadable.', subject: '.github/workflows/' })
        return /\bmandoc\b[^\r\n]*\s-T\s*lint\b/.test(context.workflowText)
          ? one({ status: 'PASS', message: `A CI workflow runs mandoc -T lint for ${context.manualPath}.`, subject: context.manualPath })
          : one({ status: 'VIOLATION', message: `${context.manualPath} has no CI mandoc -T lint gate.`, subject: context.manualPath })
      }
    }
  }
}

export const MAN: RubricFamily<ToolsRubricContext, ManualToolsContext> = {
  code: 'MAN',
  title: 'manual capabilities',
  description: 'Man-page linting requirements.',
  standard: STANDARD,
  selectContext: (context) => context.manual,
  items: [MAN_LINT]
}
