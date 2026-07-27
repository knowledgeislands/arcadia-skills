import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { RepoRubricContext, WorkingAreasRubricContext } from '../contexts/repository.ts'

const SOURCE = 'standards-repository.md'

const WORK_1: RubricItem<WorkingAreasRubricContext> = {
  code: 'WORK-1',
  title: 'Working-area scaffold',
  description: 'Every KI repository has the canonical inbound and outbound working areas, handoff subdirectories, and README orientation.',
  sources: [SOURCE],
  mechanical: {
    level: 'FAIL',
    audit: { phase: 'INSPECT', run: (context) => context.workingAreas1 },
    conform: {
      phase: 'PRIMARY',
      run: (context) => {
        context.ensureWorkingAreaScaffold?.()
      }
    }
  }
}

const WORK_J1: RubricItem<WorkingAreasRubricContext> = {
  code: 'WORK-J1',
  title: 'working-area direction and lifecycle',
  description:
    'The required +/ and -/ working areas distinguish inbound from outbound material, and every retained handoff has an owner and active disposition.',
  sources: [SOURCE],
  judgment: {
    prompt:
      'Review that +/ and -/ remain working material rather than a shadow canonical store or archive: each retained handoff has a receiving owner, active disposition, reason or request, and named review trigger; resolved copies are removed while the required scaffold remains.'
  }
}

export const WORK: RubricFamily<RepoRubricContext, WorkingAreasRubricContext> = {
  code: 'WORK',
  title: 'Working areas',
  description: 'Required inbound and outbound working-area scaffold and handoff lifecycle.',
  standard: SOURCE,
  selectContext: (context) => context.workingAreas,
  items: [WORK_1, WORK_J1]
}
