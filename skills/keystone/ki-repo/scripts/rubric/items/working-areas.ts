import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RepoRubricContext } from '../contexts/repository.ts'

type WorkingAreasRubricContext = Record<string, never>

const WORK_J1: RubricItem<WorkingAreasRubricContext> = {
  code: 'WORK-J1',
  title: 'working-area direction and lifecycle',
  description:
    'Optional +/ and -/ working areas distinguish inbound from outbound material, and any _HANDOFFS contents have a clear adoption, follow-up, or closure route.',
  sources: ['standards-repository.md'],
  judgment: {
    prompt:
      'Where +/ or -/ exists, review that it is working material rather than a shadow canonical store, and that each handoff has an identifiable receiving owner and next route.'
  }
}

export const WORK: RubricFamily<RepoRubricContext, WorkingAreasRubricContext> = {
  code: 'WORK',
  title: 'Working areas',
  description: 'Judgment-led review of optional inbound and outbound working material.',
  standard: 'standards-repository.md',
  selectContext: (context) => context.workingAreas,
  items: [WORK_J1]
}
