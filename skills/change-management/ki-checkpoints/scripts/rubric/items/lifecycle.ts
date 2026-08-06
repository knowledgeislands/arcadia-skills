import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { CheckpointsRubricContext, LifecycleContext } from '../contexts/checkpoints.ts'

const SOURCE = 'standards-checkpoints.md'

const LIFECYCLE_1: RubricItem<LifecycleContext> = {
  code: 'LIFECYCLE-1',
  title: 'location, state, uniqueness, and timestamps agree',
  description:
    'An active path carries state active, a retired path carries state retired and retired_at, no thread is simultaneously active and retired, and UTC timestamps are chronologically coherent. Retired records never count as active resume candidates.',
  sources: [SOURCE],
  mechanical: { level: 'FAIL', audit: { phase: 'INSPECT', run: (context) => context.mechanical } }
}

const LIFECYCLE_2: RubricItem<LifecycleContext> = {
  code: 'LIFECYCLE-2',
  title: 'snapshot content is current and durable facts are promoted',
  description:
    'The active record is a concise current reconstruction snapshot. Decisions, accepted work state, and reusable knowledge already live with their canonical owners; retirement follows explicit direction and does not manufacture completion.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Is each active snapshot current and concise, with durable facts promoted to their canonical owners and any retirement grounded in explicit user direction rather than inferred completion?'
  }
}

export const LIFECYCLE: RubricFamily<CheckpointsRubricContext, LifecycleContext> = {
  code: 'LIFECYCLE',
  title: 'Checkpoint lifecycle',
  description: 'Update, resume, and retirement preserve one active snapshot without inventing lifecycle state.',
  standard: SOURCE,
  selectContext: (context) => context.lifecycle,
  items: [LIFECYCLE_1, LIFECYCLE_2]
}
