import type { RubricContextOptions, RubricPublicationContext, RubricSession } from '../../shared/rubric.ts'

export type HousekeepingRubricContext = { readonly rubric: RubricPublicationContext }

export const createHousekeepingSession = ({
  publication
}: RubricContextOptions): RubricSession<HousekeepingRubricContext> => {
  const context: HousekeepingRubricContext = { rubric: { publication } }
  return {
    subjects: [
      { families: ['STATE'], context: () => context },
      { families: ['RUBRIC'], context: () => context }
    ],
    proposal: () => ({ writes: [] })
  }
}
