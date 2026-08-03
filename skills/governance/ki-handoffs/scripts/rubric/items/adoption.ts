import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { HandoffJudgmentContext, HandoffsRubricContext } from '../contexts/handoffs.ts'

const SOURCE = 'standards-handoffs.md'

const ADOPTION_1: RubricItem<HandoffJudgmentContext> = {
  code: 'ADOPTION-1',
  title: 'adoption preserves receiver roadmap authority',
  description: 'A receiver disposition is submission review only; adoption does not automatically create, prioritize, implement, or accept a roadmap item.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Confirm that every proposed adoption remains a separately confirmed local roadmap decision and grants no sender or process skill priority, implementation, or acceptance authority.'
  }
}

export const ADOPTION: RubricFamily<HandoffsRubricContext, HandoffJudgmentContext> = {
  code: 'ADOPTION',
  title: 'Receiver roadmap authority',
  description: 'Human-confirmed disposition remains distinct from local work selection and acceptance.',
  standard: SOURCE,
  selectContext: (context) => context.judgment,
  items: [ADOPTION_1]
}
