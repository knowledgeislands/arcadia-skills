import type { RubricFamily, RubricItem } from '../../shared/rubric.ts'
import type { AuthoringRubricContext, TomlRubricContext } from '../contexts/authoring.ts'

const TOML_VALUES: RubricItem<TomlRubricContext> = {
  code: 'TOML-values',
  title: 'TOML values use the house formatting',
  description: 'Strings are double-quoted and short lists remain inline (`["a", "b"]`).',
  sources: ['standards-toml.md#keys-and-values'],
  judgment: {
    scope: 'Every authored TOML string and short list in the convention scope.',
    prompt: 'Assess whether TOML strings and short lists follow the house formatting.',
    outcomes: ['conforming', 'reformat required', 'exception required'],
    guidance: 'Use double-quoted strings and inline short lists, or record the external-contract exception.'
  }
}

const TOML_STRUCTURE: RubricItem<TomlRubricContext> = {
  code: 'TOML-structure',
  title: 'TOML configuration remains compact and navigable',
  description:
    'Substantial `.ki.toml` files use needed neighbourhood banners, while readable short subordinate maps use dotted keys under their explicit owner root.',
  sources: ['standards-toml.md#configuration-structure'],
  judgment: {
    scope: 'Every substantial `.ki.toml` and each short subordinate map in convention scope.',
    prompt:
      'Assess whether configuration uses helpful neighbourhood banners, contiguous owner blocks, and dotted child keys where the complete entry remains readable.',
    outcomes: ['conforming', 'restructure recommended', 'nested form justified'],
    guidance:
      'Use only needed neighbourhood banners and compact dotted child keys; retain a nested table when comments, length, or further structure make it clearer.'
  }
}

const TOML_COMMENTS: RubricItem<TomlRubricContext> = {
  code: 'TOML-comments',
  title: 'non-obvious TOML keys explain their rationale',
  description: 'Non-obvious keys carry a preceding `#` comment explaining why they exist.',
  sources: ['standards-toml.md#keys-and-values'],
  judgment: {
    scope: 'Every non-obvious authored TOML key in the convention scope.',
    prompt: 'Assess whether non-obvious TOML keys carry a preceding rationale comment.',
    outcomes: ['conforming', 'comment required', 'self-evident'],
    guidance: 'Add a preceding rationale comment or record why the key is self-evident in its local context.'
  }
}

export const TOML: RubricFamily<AuthoringRubricContext, TomlRubricContext> = {
  code: 'TOML',
  title: 'TOML formatting',
  description: 'Reviewer-applied TOML formatting conventions.',
  standard: 'standards-toml.md',
  selectContext: (context: AuthoringRubricContext) => context.toml,
  items: [TOML_VALUES, TOML_STRUCTURE, TOML_COMMENTS]
}
