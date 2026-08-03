import { createRubricPublicationFamily } from '../../shared/rubric.ts'
import type { HandoffsRubricContext } from '../contexts/handoffs.ts'

export const RUBRIC = createRubricPublicationFamily<HandoffsRubricContext>(
  ({ rubric }) => rubric,
  '../../../keystone/ki-skills/references/standards-rubric-authoring.md',
  ['../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication']
)
