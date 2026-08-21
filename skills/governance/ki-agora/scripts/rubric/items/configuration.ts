import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { AgoraRubricContext, OutcomeContext } from '../contexts/agora.ts'

const SOURCE = 'standards-agora.md'

const CONFIG_1: RubricItem<OutcomeContext> = {
  code: 'CONFIG-1',
  title: 'Agora homes are canonical',
  description:
    'A declared Agora home uses a stable identifier, explicitly names the canonical identity of its declaring owner repository, and records only its non-empty purpose, optional duplicate-free ordered projection prefix, and canonical HTTPS GitHub member repositories with lower-case hyphenated roles. Ordered identities must name the owner or a declared member and affect projection order only. Unknown fields fail closed. The owner is an automatic projection participant, not a reciprocal member, and local declaration shape is not reciprocal-consent evidence.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    overrideLevels: ['WARN'],
    remediation: {
      class: 'diagnostic',
      guidance: 'Correct the local ki-agora home declaration, then rerun the audit.'
    },
    audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes }
  }
}

export const CONFIG: RubricFamily<AgoraRubricContext, OutcomeContext> = {
  code: 'CONFIG',
  title: 'Agora home declaration',
  description: 'Owner identity, purpose, ordered projection, and approved member roles are explicit and portable.',
  standard: SOURCE,
  selectContext: (context) => context.configuration,
  items: [CONFIG_1]
}
