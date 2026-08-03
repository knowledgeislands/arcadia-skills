import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffsRubricContext, OutcomeContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const CONFIG_1: RubricItem<OutcomeContext> = {
  code: 'CONFIG-1',
  title: 'repository identity and peers are canonical',
  description:
    'A participating repository declares one canonical lower-case `owner/repo` identity and a required lexically ordered, duplicate-free peer list in its own ki-handoffs table.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes }, overrideLevels: ['WARN'] }
}

export const CONFIG: RubricFamily<HandoffsRubricContext, OutcomeContext> = {
  code: 'CONFIG',
  title: 'Declared participation',
  description: 'Repository identity and allowed peers are explicit, canonical, and owned locally.',
  standard: SOURCE,
  selectContext: (context) => context.configuration,
  items: [CONFIG_1]
}
