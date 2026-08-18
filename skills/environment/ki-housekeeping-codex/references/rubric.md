<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — Safe repository-scoped Codex session housekeeping

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-housekeeping-codex --write`.

Line-by-line criteria for auditing ki-housekeeping-codex. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [STATE — Codex session housekeeping safety](#state--codex-session-housekeeping-safety)
- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)

## STATE — Codex session housekeeping safety

→ [standard](standards-codex-state.md)

Repository identity, content minimisation, reviewed selection, and fail-closed permanent deletion.

- **STATE-1 [J] — inventory is exact and content-minimised** — Inventory resolves one selected physical repository, matches only exact returned working directories, covers active and archived roots plus complete descendants, and excludes preview, turns, items, and transcript content. (standards-codex-state.md#repository-identity, standards-codex-state.md#inventory)
  - _Evidence scope:_ The target skill and the evidence named by this criterion.
  - _Review prompt:_ Does the runtime evidence prove exact physical-repository matching, complete active/archive and descendant coverage, and content minimisation?
  - _Outcomes:_ conforming; gap; exclusion
  - _Conforming guidance:_ Record the review as conforming, a named Gap with its next action, or an explicit justified exclusion.
- **STATE-2 [J] — permanent deletion is explicitly reviewed and fail-closed** — Deletion requires a reviewed artifact, exact root selection, destructive confirmation, complete pre-delete revalidation, and explicit partial-execution reporting without blind retry. (standards-codex-state.md#deletion)
  - _Evidence scope:_ The target skill and the evidence named by this criterion.
  - _Review prompt:_ Does the proposed deletion remain inside the reviewed artifact, revalidate every selected root and descendant before mutation, and preserve the permanent and partial-execution boundaries?
  - _Outcomes:_ conforming; gap; exclusion
  - _Conforming guidance:_ Record the review as conforming, a named Gap with its next action, or an explicit justified exclusion.

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)
  - _Remediation:_ automatic
