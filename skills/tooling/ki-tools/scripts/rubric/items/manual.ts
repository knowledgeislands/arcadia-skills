import type { AuditOutcome, RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { ManualToolsContext, ToolsRubricContext } from '../contexts/tools.ts'

const STANDARD = 'standards-tool-repositories.md'
const SCRIPT = 'ki:tools:lint-man'
const one = (outcome: AuditOutcome): readonly AuditOutcome[] => [outcome]

const MAN_SCRIPT: RubricItem<ManualToolsContext> = {
  code: 'MAN-SCRIPT',
  title: 'Manual lint command',
  description: 'A physical man/<tool>.1 page has a ki:tools:lint-man command that runs mandoc -T lint.',
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
        if (context.packageJson === 'unsafe')
          return one({ status: 'VIOLATION', message: 'package.json is not a physical regular file.', subject: 'package.json' })
        const expected = `mandoc -T lint ${context.manualPath}`
        return context.manualCommand === expected
          ? one({ status: 'PASS', message: `${SCRIPT} runs ${expected}.`, subject: 'package.json' })
          : one({ status: 'VIOLATION', message: `${context.manualPath} requires ${SCRIPT} = ${JSON.stringify(expected)}.`, subject: 'package.json' })
      }
    }
  }
}

const MAN_LINT: RubricItem<ManualToolsContext> = {
  code: 'MAN-LINT',
  title: 'Manual lint CI',
  description: 'A physical man/<tool>.1 page has CI that invokes ki:tools:lint-man.',
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
        return /\bbun\s+run\s+ki:tools:lint-man\b/.test(context.workflowText)
          ? one({ status: 'PASS', message: `A CI workflow invokes ${SCRIPT} for ${context.manualPath}.`, subject: context.manualPath })
          : one({ status: 'VIOLATION', message: `${context.manualPath} has no CI ${SCRIPT} gate.`, subject: context.manualPath })
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
  items: [MAN_SCRIPT, MAN_LINT]
}
