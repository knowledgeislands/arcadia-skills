import type { DelegationRubricContext, RubricFamily } from '../types.ts'

export const PACKET: RubricFamily<DelegationRubricContext> = {
  code: 'PACKET',
  title: 'delegation packets',
  description: 'Opted-in delegation-packet structure and its safe legacy-heading repair.',
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
        audit: { phase: 'INSPECT', run: ({ outcomes }) => outcomes },
        conform: { phase: 'NORMALISE', run: ({ normaliseLegacyEscalation }) => normaliseLegacyEscalation?.() }
      },
      judgment: {
        prompt:
          'Are the worker boundaries, model choices, locked decisions, escalation boundaries, rounds, and verification gates appropriate for the delegated work?'
      }
    }
  ]
}
