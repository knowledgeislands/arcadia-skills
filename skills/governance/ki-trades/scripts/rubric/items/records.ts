import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { OutcomeContext, TradesRubricContext } from '../contexts/trades.ts'

const SOURCE = 'standards-trades.md'

const RECORD_1: RubricItem<OutcomeContext> = {
  code: 'RECORD-1',
  title: 'preparation and submission shape is canonical',
  description:
    'Every trade uses one `TRD-` eight lower-case hexadecimal identity repeated in filename, metadata, and H1, a closed sender envelope with kind and observation policy, and non-empty payload sections. A mutable preparation alone uses the `_PREPARATIONS` peer layout and `phase: preparing`; a submitted record uses the canonical peer layout without phase.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    remediation: { class: 'diagnostic', guidance: 'Correct the locally owned trade record, then rerun the audit.' },
    audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes }
  }
}

export const RECORD: RubricFamily<TradesRubricContext, OutcomeContext> = {
  code: 'RECORD',
  title: 'Record shape',
  description: 'One concise identity moves atomically from mutable preparation to immutable submitted record.',
  standard: SOURCE,
  selectContext: (context) => context.records,
  items: [RECORD_1]
}
