# Skill review inventory

The immutable baseline and current tree contain the same 50 canonical skills in dependency-safe review order.

Approved Phase 1–2 updates changed 17 implementations without changing identity or dependencies.

The [review index](README.md) records their commits and the 33 later review-only skills.

## Integrity

- Canonical skills: 50.
- Review-sequence entries: 50.
- Duplicate identities, missing entries, extra entries, unknown dependencies, cycles, and order violations: 0.
- Source lists: 42; structured rubrics: 41; focused tests: 38; exact-name eval scenario files: 21.
- Three ignored historical matrix logs exist locally but not in the baseline; they are advisory only.

## Coverage map

`D` means a dated source list, `U` an undated source list, and `—` no source list. `Y` records artifact presence only.

`M` means all three advisory matrix logs have rows for that skill.

Every row is reviewed and ungraded; `Review` is the proposed disposition.

`Update` is `applied` for 17 approved remediations and `awaiting` for 33 proposals.

|   # | Skill                                | Kind       | Review | Update   | Sources | Rubric | Tests | Eval | Matrix |
| --: | ------------------------------------ | ---------- | ------ | -------- | ------- | ------ | ----- | ---- | ------ |
|   1 | `ki-skills`                          | governance | revise | applied  | D       | Y      | Y     | Y    | M      |
|   2 | `ki-authoring`                       | governance | revise | applied  | D       | Y      | Y     | Y    | M      |
|   3 | `ki-git`                             | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|   4 | `ki-engineering`                     | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|   5 | `ki-repo`                            | governance | revise | applied  | D       | Y      | Y     | Y    | M      |
|   6 | `ki-delegation`                      | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|   7 | `ki-change-management`               | governance | revise | applied  | U       | Y      | —     | —    | —      |
|   8 | `ki-change-management-roadmap`       | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|   9 | `ki-change-management-github-issues` | governance | revise | applied  | U       | Y      | —     | —    | —      |
|  10 | `ki-change-management-linear`        | governance | revise | applied  | U       | Y      | —     | —    | —      |
|  11 | `ki-change-management-housekeeping`  | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  12 | `ki-recap`                           | process    | revise | applied  | —       | —      | Y     | —    | —      |
|  13 | `ki-next`                            | process    | revise | applied  | —       | —      | —     | —    | —      |
|  14 | `ki-plan`                            | process    | revise | applied  | —       | —      | —     | —    | —      |
|  15 | `ki-batch`                           | process    | revise | applied  | U       | —      | Y     | —    | —      |
|  16 | `ki-implement`                       | process    | revise | applied  | —       | —      | —     | —    | —      |
|  17 | `ki-accept`                          | process    | revise | applied  | —       | —      | —     | —    | —      |
|  18 | `ki-decision-records`                | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  19 | `ki-specs`                           | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  20 | `ki-guides`                          | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  21 | `ki-checkpoint`                      | governance | revise | awaiting | D       | Y      | —     | —    | —      |
|  22 | `ki-trades`                          | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  23 | `ki-trade`                           | process    | revise | awaiting | —       | —      | —     | —    | —      |
|  24 | `ki-agora`                           | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  25 | `ki-communication`                   | governance | retire | awaiting | —       | —      | —     | —    | —      |
|  26 | `ki-subagents`                       | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  27 | `ki-repo-project`                    | governance | revise | awaiting | U       | Y      | —     | —    | —      |
|  28 | `ki-repo-kb-activities`              | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  29 | `ki-repo-kb-live-artifacts`          | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  30 | `ki-repo-kb-streams`                 | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  31 | `ki-repo-kb`                         | governance | revise | awaiting | D       | Y      | Y     | Y    | M      |
|  32 | `ki-repo-kb-principal`               | governance | revise | awaiting | —       | Y      | Y     | —    | —      |
|  33 | `ki-repo-specifications`             | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  34 | `ki-repo-mcp`                        | governance | revise | awaiting | D       | Y      | Y     | Y    | M      |
|  35 | `ki-repo-website`                    | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  36 | `ki-repo-website-cloudflare`         | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  37 | `ki-repo-plugins`                    | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  38 | `ki-repo-tools`                      | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  39 | `ki-repo-homebrew-tap`               | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  40 | `ki-repo-dotfiles-chezmoi`           | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  41 | `ki-binding`                         | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  42 | `ki-binding-claude`                  | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  43 | `ki-binding-codex`                   | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  44 | `ki-binding-chezmoi`                 | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  45 | `ki-housekeeping-claude`             | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  46 | `ki-tokenomics`                      | governance | revise | awaiting | D       | Y      | Y     | Y    | —      |
|  47 | `ki-tokenomics-claude`               | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  48 | `ki-tokenomics-codex`                | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  49 | `ki-repo-harness`                    | governance | revise | awaiting | D       | Y      | Y     | —    | —      |
|  50 | `ki-bootstrap`                       | process    | revise | awaiting | D       | —      | —     | Y    | —      |

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
- Five source lists have no ISO review date; eight dated lists lack `## Last review`. These are evidence gaps, not automatic failures.
- Nine process or lightweight skills lack the structured-rubric entry point; twelve skills lack local focused tests.
- Twenty-nine skills lack an exact-name behavioural eval scenario. Missing evals are evidence gaps, not negative outcomes.
