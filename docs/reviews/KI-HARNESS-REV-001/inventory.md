# Skill review inventory

The immutable baseline and the current tree both contain the same 50 canonical skills in the dependency-safe review order. The only `skills/` change since the baseline is the approved Phase 0 rubric-authoring clarification in `ki-skills`; no skill identity, dependency, or evidence-coverage count changed.

## Integrity

- Canonical skills: 50.
- Review-sequence entries: 50.
- Duplicate identities, missing entries, extra entries, unknown dependencies, cycles, and order violations: 0.
- Source lists: 42; structured rubrics: 41; focused tests: 38; exact-name eval scenario files: 21.
- Three historical matrix logs are available locally but ignored by Git and absent from the baseline. They are advisory current-worktree evidence only.

## Coverage map

`D` means a source list with an observed review date, `U` an undated source list, and `—` no source list. `Y` records artifact presence only, not quality or effectiveness. `M` means all three local historical matrix logs contain result rows for that skill.

| # | Skill | Kind | Sources | Rubric | Tests | Eval | Matrix |
| -: | --- | --- | --- | --- | --- | --- | --- |
| 1 | `ki-skills` | governance | D | Y | Y | Y | M |
| 2 | `ki-authoring` | governance | D | Y | Y | Y | M |
| 3 | `ki-git` | governance | D | Y | Y | — | — |
| 4 | `ki-engineering` | governance | D | Y | Y | Y | — |
| 5 | `ki-repo` | governance | D | Y | Y | Y | M |
| 6 | `ki-delegation` | governance | D | Y | Y | Y | — |
| 7 | `ki-change-management` | governance | U | Y | — | — | — |
| 8 | `ki-change-management-roadmap` | governance | D | Y | Y | Y | — |
| 9 | `ki-change-management-github-issues` | governance | U | Y | — | — | — |
| 10 | `ki-change-management-linear` | governance | U | Y | — | — | — |
| 11 | `ki-change-management-housekeeping` | governance | D | Y | Y | — | — |
| 12 | `ki-recap` | process | — | — | Y | — | — |
| 13 | `ki-next` | process | — | — | — | — | — |
| 14 | `ki-plan` | process | — | — | — | — | — |
| 15 | `ki-batch` | process | U | — | Y | — | — |
| 16 | `ki-implement` | process | — | — | — | — | — |
| 17 | `ki-accept` | process | — | — | — | — | — |
| 18 | `ki-decision-records` | governance | D | Y | Y | Y | — |
| 19 | `ki-specs` | governance | D | Y | Y | Y | — |
| 20 | `ki-guides` | governance | D | Y | Y | — | — |
| 21 | `ki-checkpoint` | governance | D | Y | — | — | — |
| 22 | `ki-trades` | governance | D | Y | Y | — | — |
| 23 | `ki-trade` | process | — | — | — | — | — |
| 24 | `ki-agora` | governance | D | Y | Y | — | — |
| 25 | `ki-communication` | governance | — | — | — | — | — |
| 26 | `ki-subagents` | governance | D | Y | Y | Y | — |
| 27 | `ki-repo-project` | governance | U | Y | — | — | — |
| 28 | `ki-repo-kb-activities` | governance | D | Y | Y | Y | — |
| 29 | `ki-repo-kb-live-artifacts` | governance | D | Y | Y | Y | — |
| 30 | `ki-repo-kb-streams` | governance | D | Y | Y | Y | — |
| 31 | `ki-repo-kb` | governance | D | Y | Y | Y | M |
| 32 | `ki-repo-kb-principal` | governance | — | Y | Y | — | — |
| 33 | `ki-repo-specifications` | governance | D | Y | Y | — | — |
| 34 | `ki-repo-mcp` | governance | D | Y | Y | Y | M |
| 35 | `ki-repo-website` | governance | D | Y | Y | Y | — |
| 36 | `ki-repo-website-cloudflare` | governance | D | Y | Y | Y | — |
| 37 | `ki-repo-plugins` | governance | D | Y | Y | Y | — |
| 38 | `ki-repo-tools` | governance | D | Y | Y | — | — |
| 39 | `ki-repo-homebrew-tap` | governance | D | Y | Y | — | — |
| 40 | `ki-repo-dotfiles-chezmoi` | governance | D | Y | Y | — | — |
| 41 | `ki-binding` | governance | D | Y | Y | Y | — |
| 42 | `ki-binding-claude` | governance | D | Y | Y | — | — |
| 43 | `ki-binding-codex` | governance | D | Y | Y | — | — |
| 44 | `ki-binding-chezmoi` | governance | D | Y | Y | — | — |
| 45 | `ki-housekeeping-claude` | governance | D | Y | Y | Y | — |
| 46 | `ki-tokenomics` | governance | D | Y | Y | Y | — |
| 47 | `ki-tokenomics-claude` | governance | D | Y | Y | — | — |
| 48 | `ki-tokenomics-codex` | governance | D | Y | Y | — | — |
| 49 | `ki-repo-harness` | governance | D | Y | Y | — | — |
| 50 | `ki-bootstrap` | process | D | — | — | Y | — |

## Declared dependency edges

Every edge points to an earlier review entry:

- `ki-repo` → `ki-authoring`, `ki-git`.
- `ki-trade` → `ki-trades`.
- `ki-repo-kb` → `ki-repo-kb-activities`, `ki-repo-kb-live-artifacts`, `ki-repo-kb-streams`.
- `ki-repo-kb-principal` → `ki-repo-kb`, `ki-decision-records`.
- `ki-repo-website-cloudflare` → `ki-repo-website`.
- `ki-repo-dotfiles-chezmoi` → `ki-authoring`.
- `ki-binding-claude` and `ki-binding-codex` → `ki-binding`.
- `ki-binding-chezmoi` → `ki-binding`, `ki-repo-dotfiles-chezmoi`.
- `ki-tokenomics-claude` and `ki-tokenomics-codex` → `ki-tokenomics`.
- `ki-repo-harness` → `ki-skills`, `ki-subagents`, `ki-decision-records`, `ki-change-management-roadmap`.

## Evidence gaps to carry forward

- Eight skills lack a source list. Each review must decide whether local stable governance makes that appropriate.
- Five present source lists have no observed ISO review date; eight dated lists lack a `## Last review` block. These are source-record observations, not automatic effectiveness failures.
- Nine process or lightweight skills lack the structured-rubric entry point; twelve skills lack local focused tests.
- Twenty-nine skills lack an exact-name behavioural eval scenario. Missing evals are evidence gaps, not negative outcomes.
