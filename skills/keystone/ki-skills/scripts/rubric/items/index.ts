import type { RubricDefinition } from '../../shared/rubric.ts'
import type { KiSkillsRubricContext } from '../contexts/contexts.ts'
import { createKiSkillsExecutionDefinition } from '../contexts/execution.ts'
import { BODY } from './body.ts'
import { COLLISION } from './collision.ts'
import { DESC } from './description.ts'
import { FRONTMATTER } from './frontmatter.ts'
import { KI_CHECKER } from './ki-checker.ts'
import { KI_INVOKE } from './ki-invoke.ts'
import { KI_LINK } from './ki-link.ts'
import { KI_SHAPE } from './ki-shape.ts'
import { LAYOUT } from './layout.ts'
import { LONGEVITY } from './longevity.ts'
import { NAME } from './name.ts'
import { OPTIONAL } from './optional.ts'
import { PORTABILITY } from './portability.ts'
import { PROCESS } from './process.ts'
import { REFERENCES } from './references.ts'
import { SCRIPTS } from './scripts.ts'
import { SIZE } from './size.ts'

const rubric: RubricDefinition<KiSkillsRubricContext> = {
  name: 'ki-skills',
  concern: 'Agent Skills',
  families: [
    LAYOUT,
    FRONTMATTER,
    NAME,
    DESC,
    OPTIONAL,
    SIZE,
    REFERENCES,
    BODY,
    SCRIPTS,
    KI_CHECKER,
    KI_LINK,
    PORTABILITY,
    KI_SHAPE,
    KI_INVOKE,
    PROCESS,
    COLLISION,
    LONGEVITY
  ]
}

export default createKiSkillsExecutionDefinition(rubric)
