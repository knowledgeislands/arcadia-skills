import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const RECORD_1: RubricItem<OutcomeContext> = {
  code: 'RECORD-1',
  title: 'record identity, placement, and payload are canonical',
  description:
    'Every trade record uses the two-level peer layout, an `TRD-` eight lower-case hexadecimal-character identity repeated in filename, metadata, and its first non-blank body H1, a closed sender envelope with `kind: work | knowledge`, and non-empty Context, Submission, and Constraints payload sections.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes } }
}

export const RECORD: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'RECORD',
  title: 'Record shape',
  description: 'Trade-record identity is concise and corroborated by canonical content rather than inferred from a filename.',
  standard: SOURCE,
  selectContext: (context) => context.records,
  items: [RECORD_1]
}
