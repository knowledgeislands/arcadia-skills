import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const CONFIG_1: RubricItem<OutcomeContext> = {
  code: 'CONFIG-1',
  title: 'typed routes are canonical',
  description:
    'A participating repository declares every closed trade kind as a lexically ordered, duplicate-free canonical HTTPS GitHub repository URL array under each of its own `exports_to` and `imports_from` tables; its identity comes only from `ki-repo.repository`.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes }, overrideLevels: ['WARN'] }
}

export const CONFIG: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'CONFIG',
  title: 'Declared participation',
  description: 'Typed trade routes are explicit, canonical, and owned locally.',
  standard: SOURCE,
  selectContext: (context) => context.configuration,
  items: [CONFIG_1]
}
