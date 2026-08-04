import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { TradeJudgmentContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const ADOPTION_1: RubricItem<TradeJudgmentContext> = {
  code: 'ADOPTION-1',
  title: 'disposition preserves receiver authority',
  description:
    'A receiver disposition is trade review only; adoption does not automatically create, prioritize, implement, or accept a roadmap item, and retention does not alter local knowledge authority.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Confirm that every proposed adoption remains a separately confirmed local roadmap decision, every proposed retention remains a local knowledge decision, and neither grants a sender or process skill priority, implementation, acceptance, or knowledge authority.'
  }
}

export const ADOPTION: RubricFamily<TradesRubricContext, TradeJudgmentContext> = {
  code: 'ADOPTION',
  title: 'Receiver local authority',
  description: 'Human-confirmed disposition remains distinct from local work selection, acceptance, and knowledge stewardship.',
  standard: SOURCE,
  selectContext: (context) => context.judgment,
  items: [ADOPTION_1]
}
