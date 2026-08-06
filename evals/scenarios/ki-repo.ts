/**
 * Eval scenarios for the `ki-repo` skill — the repo standard and the
 * `.ki-config.toml` contract. Each probes a house-specific rule (the compliance
 * marker, merge policy, the one-table-per-skill model) a baseline wouldn't know.
 */
import type { Scenario } from '../harness.ts'

export const scenarios: Scenario[] = [
  {
    skill: 'ki-repo',
    id: 'repo-compliance-marker',
    prompt: 'What single file marks a git repository as Knowledge Islands–compliant, and what is its role?',
    assertions: [
      { name: 'names .ki-config.toml', re: /\.ki-config\.toml/ },
      { name: 'presence = compliance marker', re: /(presence|marker|compliance|opt(ed|s)? in|declares)/i }
    ],
    rubric:
      'House rule: a repo is Knowledge Islands–compliant by carrying a `.ki-config.toml` at its root — its PRESENCE is the compliance marker, and it is the shared, skill-sectioned config file. A correct answer names `.ki-config.toml` and explains its presence marks compliance.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-merge-policy',
    prompt: 'What are the house GitHub settings for merging and the default branch on our repos?',
    assertions: [
      { name: 'squash-only merges', re: /squash/i },
      { name: 'auto-delete branch on merge', re: /(delete|auto-delete)[^.\n]{0,30}branch|branch[^.\n]{0,30}(delete)/i },
      { name: 'default branch main', re: /\bmain\b/ }
    ],
    rubric:
      'House standard: squash-only merges (merge commits and rebase OFF), auto-delete head branch on merge, default branch `main`, Issues on / Wiki+Projects off, MIT license. A correct answer states squash-only, auto-delete-branch, and main.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-config-table-model',
    prompt:
      'Several of our skills need per-repo settings. How is that stored in `.ki-config.toml`, and what may a skill read or validate in that file?',
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
      'House contract: each skill that needs config owns exactly ONE table named for the skill (e.g. ["knowledgeislands/ki-agentic-harness:ki-repo"]), with sub-tables nested under it; a skill reads and validates ONLY its own table (warns on an unrecognised key in it) and never inspects another skill\'s — "validate down, ignore across". A correct answer states the one-table-per-skill model and the own-table-only rule.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-review-interviews-material-uncertainty',
    prompt:
      'Review our repository architecture. The deployment process might be deliberately manual, but I am not sure whether it is a gap. Please decide whether we should automate it and create the required changes.',
    assertions: [
      { name: 'distinguishes evidence from uncertainty', re: /evidence|uncertain|unknown|assumption/i },
      { name: 'asks about intent', re: /ask|confirm|whether.*deliberate|intent/i },
      { name: 'does not create work unilaterally', re: /not.*create|before.*confirm|approval|propose/i }
    ],
    rubric:
      'The REVIEW mode is human-led. When a recommendation depends on whether a manual process is deliberate, it presents evidence and competing interpretations, interviews the user, and does not create delivery work without separate confirmation.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-review-routes-finding-by-durability',
    prompt:
      'Our review found a stale deployment script, an unresolved data-retention policy, and undocumented recovery steps. Put all three into one permanent architecture review document.',
    assertions: [
      { name: 'routes delivery work to a plan', re: /plan|roadmap/i },
      { name: 'routes policy to a Decision Record', re: /decision record/i },
      { name: 'routes operational steps to a guide', re: /guide/i },
      { name: 'rejects one permanent review document', re: /not.*permanent|working evidence|rather than/i }
    ],
    rubric:
      'REVIEW routes bounded repair work to a plan, durable rationale to a Decision Record, and durable procedures to a guide. Review records are working evidence and should not become a permanent duplicate of those destinations.'
  },
  {
    skill: 'ki-repo',
    id: 'repo-review-prunes-only-unretained-evidence',
    prompt:
      'The delivery plan is done. Delete REV-004 immediately, even though ADR-012 still cites finding REV-004-F002.',
    assertions: [
      { name: 'recognises the retained dependency', re: /ADR-012|retained-by|depend/i },
      { name: 'does not delete immediately', re: /not.*delete|retain|cannot.*prune/i },
      { name: 'requires explicit review of closure', re: /confirm|review|after.*remove/i }
    ],
    rubric:
      'A review record remains while a concrete plan or Decision Record depends on it. REVIEW must not delete it merely because the owning plan closed, and any later prune requires an explicit review of the dependency state and user confirmation.'
  }
]
