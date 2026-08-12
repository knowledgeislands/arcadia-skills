# Skill review inventory

The immutable baseline contains 50 canonical skills in dependency-safe review order. The approved retirement of `ki-communication` and addition of two subagent adapters leave 51 in the current tree while retaining the retired review row as historical evidence.

Approved Phase 1–4 updates have changed 39 baseline implementations. The subagent remediation also added two current adapter identities.

The [review index](README.md) records the baseline set, applied changes, and remaining approved remediation.

## Integrity

- Baseline canonical skills: 50; current canonical skills: 51 after one retirement and two additions.
- Review-sequence entries: 50 in the immutable baseline; two post-baseline adapter records are listed separately.
- Duplicate identities, missing entries, extra entries, unknown dependencies, cycles, and order violations: 0.
- Source lists: 42; structured rubrics: 41; focused tests: 38; exact-name eval scenario files: 21.
- Three ignored historical matrix logs exist locally but not in the baseline; they are advisory only.

## Coverage map

`D` means a dated source list, `U` an undated source list, and `—` no source list. `Y` records artifact presence only.

`M` means all three advisory matrix logs have rows for that skill.

Every row is reviewed and graded; `Review` is the approved disposition.

`Update` is `applied` for 39 completed baseline revisions, `retired` for one completed retirement, and `awaiting` for 10 approved revisions.

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
|  18 | `ki-decision-records`                | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  19 | `ki-specs`                           | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  20 | `ki-guides`                          | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  21 | `ki-checkpoint`                      | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  22 | `ki-trades`                          | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  23 | `ki-trade`                           | process    | revise | applied  | —       | —      | —     | —    | —      |
|  24 | `ki-agora`                           | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  25 | `ki-communication`                   | governance | retire | retired  | —       | —      | —     | —    | —      |
|  26 | `ki-subagents`                       | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  27 | `ki-repo-project`                    | governance | revise | applied  | U       | Y      | Y     | —    | —      |
|  28 | `ki-repo-kb-activities`              | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  29 | `ki-repo-kb-live-artifacts`          | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  30 | `ki-repo-kb-streams`                 | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  31 | `ki-repo-kb`                         | governance | revise | applied  | D       | Y      | Y     | Y    | M      |
|  32 | `ki-repo-kb-principal`               | governance | revise | applied  | —       | Y      | Y     | —    | —      |
|  33 | `ki-repo-specifications`             | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  34 | `ki-repo-mcp`                        | governance | revise | applied  | D       | Y      | Y     | Y    | M      |
|  35 | `ki-repo-website`                    | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  36 | `ki-repo-website-cloudflare`         | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  37 | `ki-repo-plugins`                    | governance | revise | applied  | D       | Y      | Y     | Y    | —      |
|  38 | `ki-repo-tools`                      | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  39 | `ki-repo-homebrew-tap`               | governance | revise | applied  | D       | Y      | Y     | —    | —      |
|  40 | `ki-repo-dotfiles-chezmoi`           | governance | revise | applied  | D       | Y      | Y     | —    | —      |
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

## Post-baseline additions

These adapters were created by the approved `ki-subagents` remediation and therefore have no immutable-baseline grade or matrix row.

| Skill                  | Kind       | Update  | Sources | Rubric | Tests | Depends on     |
| ---------------------- | ---------- | ------- | ------- | ------ | ----- | -------------- |
| `ki-subagents-claude`  | governance | applied | D       | Y      | Y     | `ki-subagents` |
| `ki-subagents-codex`   | governance | applied | D       | Y      | Y     | `ki-subagents` |

## Declared dependency edges

Every edge points to an earlier review entry:

- `ki-repo` → `ki-authoring`, `ki-git`.
- `ki-trade` → `ki-trades`.
- `ki-subagents` → `ki-skills`.
- `ki-subagents-claude` and `ki-subagents-codex` → `ki-subagents`.
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
