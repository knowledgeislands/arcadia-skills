import { createRubricPublicationFamily } from '../../shared/rubric.ts'
import type { FeatureDefinitionsRubricContext } from '../contexts/feature-definitions.ts'

export const RUBRIC = createRubricPublicationFamily<FeatureDefinitionsRubricContext>(
  ({ rubric }) => rubric,
  '../../../keystone/ki-skills/references/standards-rubric-authoring.md',
  ['../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication']
)
