import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RepoRubricContext } from '../contexts/repository.ts'

type WorkingAreasRubricContext = Record<string, never>

const WORK_J1: RubricItem<WorkingAreasRubricContext> = {
  code: 'WORK-J1',
  title: 'working-area direction and lifecycle',
  description:
    'Optional +/ and -/ working areas distinguish inbound from outbound material, retained handoffs have an owner and active disposition, and an empty handoff direction retains no README or directory placeholder.',
  sources: ['standards-repository.md'],
  judgment: {
    prompt:
      'Where +/ or -/ exists, review that it remains working material rather than a shadow canonical store or archive: each retained handoff has a receiving owner, active disposition, reason or request, and named review trigger; resolved copies are removed; and a direction with no handoffs retains neither `_HANDOFFS/README.md` nor the empty `_HANDOFFS/` directory.'
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
