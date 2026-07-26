import type { RubricItem } from '../../shared/rubric.ts'
import type { TokenomicsUserContext } from '../contexts/user.ts'

export const mechanical = (
  code: string,
  title: string,
  description: string,
  level: 'FAIL' | 'WARN' = 'WARN'
): RubricItem<TokenomicsUserContext> => ({
  code,
  title,
  description,
  sources: ['standards.md'],
  mechanical: {
    level,
    overrideLevels: level === 'FAIL' ? ['WARN'] : ['FAIL'],
    audit: {
      phase: 'INSPECT',
      run: (context) =>
        context.outcomes.get(code) ?? [{ status: 'NOT_APPLICABLE', message: 'No user-home evidence applies to this criterion.' }]
    }
  }
})
export const judgment = (code: string, title: string, description: string): RubricItem<TokenomicsUserContext> => ({
  code,
  title,
  description,
  sources: ['standards.md'],
  judgment: { prompt: description }
})
