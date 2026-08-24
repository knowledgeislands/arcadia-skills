import { judgment, type RubricFamily } from '../../shared/rubric.ts'
import type { HousekeepingRubricContext } from '../contexts/housekeeping.ts'

export const STATE = {
  code: 'STATE',
  title: 'ChatGPT opaque-store acquisition safety',
  standard: '../SKILL.md',
  description: 'Physical-store containment, opaque content preservation, and source immutability.',
  selectContext: (context) => context,
  items: [
    {
      code: 'STATE-1',
      title: 'discovery is physical and content-minimised',
      description:
        'Discovery accepts one configured physical store, enumerates only recognised non-symlinked record paths, and returns provenance without decoded conversation content.',
      sources: ['../SKILL.md#chatgpt-session-acquisition'],
      judgment: judgment(
        'Does the runtime evidence prove path containment, opaque handling, and content-minimised discovery?'
      )
    },
    {
      code: 'STATE-2',
      title: 'source mutation is unavailable during acquisition',
      description:
        'The provider exposes only discover, list, read, and checkpoint; KI staging and any later archive/delete decision remain separate.',
      sources: ['../SKILL.md#chatgpt-session-acquisition'],
      judgment: judgment('Does the provider preserve its no-decrypt, no-write, no-delete boundary?')
    }
  ]
} satisfies RubricFamily<HousekeepingRubricContext, HousekeepingRubricContext>
