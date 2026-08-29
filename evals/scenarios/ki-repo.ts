/**
 * Eval scenarios for the `ki-repo` skill — the repo standard and the
 * `.ki.toml` contract. Each probes a house-specific rule (the compliance
 * marker, merge policy, the one-table-per-skill model) a baseline wouldn't know.
 */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-repo',
    id: 'repo-compliance-marker',
    prompt: 'What single file marks a git repository as Knowledge Islands–compliant, and what is its role?',
    assertions: [
      { name: 'names .ki.toml', re: /\.ki\.toml/ },
      { name: 'presence = compliance marker', re: /(presence|marker|compliance|opt(ed|s)? in|declares)/i }
    ],
    rubric:
      'House rule: a repo is Knowledge Islands–compliant by carrying a `.ki.toml` at its root — its PRESENCE is the compliance marker, and it is the shared, skill-sectioned config file. A correct answer names `.ki.toml` and explains its presence marks compliance.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-license-visibility-independence',
    prompt:
      'Our repository is private but distributed under MIT. Is that allowed under the KI repository contract, and how should licence and visibility be declared and checked?',
    assertions: [
      { name: 'recognises independent licence and visibility', re: /independent|separate|not.*depend/i },
      { name: 'permits private MIT', re: /private[^.\n]{0,40}MIT|MIT[^.\n]{0,40}private/i },
      { name: 'uses ki-repo table', re: /\[skills\.ki-repo\]|ki-repo/i },
      { name: 'checks SPDX licence and live visibility', re: /SPDX|license[^.\n]{0,40}GitHub|visibility[^.\n]{0,40}GitHub/i }
    ],
    rubric:
      'House contract: `[skills.ki-repo]` declares SPDX `license` and `visibility` independently. A private repository may be MIT and a public repository may be proprietary/`UNLICENSED`; the auditor checks the declared licence against GitHub, LICENSE, and package.json where present, and visibility against live GitHub.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-config-table-model',
    prompt:
      'Several of our skills need per-repo settings. How is that stored in `.ki.toml`, and what may a skill read or validate in that file?',
    assertions: [
      {
        name: 'one table per skill, named for the skill',
        re: /(one )?table per skill|\[<?skill>?\]|named (for|after) the skill/i
      },
      {
        name: 'validate/read only its own table',
        re: /(own|its own) (table|section)|validate down|never[^.\n]{0,30}other/i
      }
    ],
    rubric:
      'House contract: each skill that needs config owns exactly ONE `[skills.<name>]` table named for the skill, with sub-tables nested under it; a skill reads and validates ONLY its own table (warns on an unrecognised key in it) and never inspects another skill\'s — "validate down, ignore across". A correct answer states the one-table-per-skill model and the own-table-only rule.'
    },
    {
      skill: 'ki-repo',
      id: 'repo-local-provenance',
      prompt:
        'The local checkout has an unpushed `.ki.toml` change that differs from GitHub. What evidence should a KI repository audit use, and may it silently substitute the remote default branch?',
      assertions: [
        { name: 'uses local checkout first', re: /local|checkout/i },
        { name: 'does not silently substitute remote evidence', re: /not.*substitut|never.*substitut|no.*fallback|do not.*remote/i },
        { name: 'labels provenance', re: /provenance|source|local.*evidence|remote.*evidence/i }
      ],
      rubric:
        'House contract: a local KI audit reads the selected checkout first, including unpushed content. A remote-only audit reads the GitHub default branch only when no filesystem evidence is selected. Neither silently substitutes the other, and findings identify the evidence source.'
    },
    {
      skill: 'ki-repo',
      id: 'repo-live-github-confirmation',
      prompt:
        'I want the repository skill to enable GitHub security settings and change merge policy now. What must happen before it makes those live GitHub writes?',
      assertions: [
        { name: 'runs or reviews audit evidence first', re: /audit|inspect|evidence/i },
        { name: 'shows exact proposed change', re: /exact.*(diff|write|change)|show.*(diff|command|change)/i },
        { name: 'requires explicit confirmation', re: /confirm|approval|authori[sz]/i },
        { name: 'does not apply immediately', re: /before|not.*(apply|change|write)|do not/i }
      ],
      rubric:
        'House contract: live GitHub changes remain outside local CONFORM. First inspect current evidence and the exact commands/diff, then obtain explicit confirmation for the specified remote write set; never infer approval from a local audit or apply the changes immediately.'
    }
]
