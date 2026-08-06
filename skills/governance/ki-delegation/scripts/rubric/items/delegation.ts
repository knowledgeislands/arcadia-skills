import type { RubricFamily } from '../../shared/rubric.ts'
import type { DelegationRubricContext } from '../types.ts'

export const PACKET: RubricFamily<DelegationRubricContext, DelegationRubricContext['packets']> = {
  code: 'PACKET',
  title: 'delegation packets',
  description: 'Opted-in delegation-packet structure and the isolated safe legacy-heading repair.',
  standard: 'standards-delegation-packets.md',
  selectContext: (context) => context.packets,
  items: [
    {
      code: 'PACKET-1',
      title: 'packet structure and delegation quality',
      description:
        'An opted-in delegation packet has the required durable brief structure; its worker boundaries, model choices, and gates are fit for the work.',
      sources: ['standards-delegation-packets.md'],
      mechanical: {
        level: 'FAIL',
        remediation: {
          class: 'guarded',
          guidance: 'Supply the missing packet evidence or revise the worker brief only through the planner with the relevant delegation authority.'
        },
        audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes }
      },
      judgment: {
        scope: 'Every opted-in delegation packet, its rounds, worker briefs, and referenced governing work record.',
        prompt:
          'Are the worker boundaries, model choices, locked decisions, escalation boundaries, rounds, and verification gates appropriate for the delegated work?',
        outcomes: ['conforming', 'revise packet', 'escalate to planner'],
        guidance:
          'Keep execution authority with the planner. Record a packet revision only after the responsible authority chooses the worker scope, model purpose, and escalation boundary.'
      }
    },
    {
      code: 'PACKET-2',
      title: 'legacy escalation heading is normalised',
      description:
        'An opted-in packet with only the legacy `### Escalation` heading is safely normalised to `### Escalate` without altering its content or authority boundary.',
      sources: ['standards-delegation-packets.md'],
      mechanical: {
        level: 'FAIL',
        remediation: { class: 'automatic' },
        audit: { phase: 'NORMALISE', run: ({ legacyEscalationOutcomes }) => legacyEscalationOutcomes },
        conform: { phase: 'NORMALISE', run: ({ normaliseLegacyEscalation }) => normaliseLegacyEscalation?.() }
      }
    }
  ]
}
