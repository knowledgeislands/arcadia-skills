<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — Safe repository-scoped ChatGPT session housekeeping

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-housekeeping-chatgpt --write`.

Line-by-line criteria for auditing ki-housekeeping-chatgpt. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [STATE — ChatGPT opaque-store acquisition safety](#state--chatgpt-opaque-store-acquisition-safety)
- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)

## STATE — ChatGPT opaque-store acquisition safety

→ [standard](../SKILL.md)

Physical-store containment, opaque content preservation, and source immutability.

- **STATE-1 [J] — discovery is physical and content-minimised** — Discovery accepts one configured physical store, enumerates only recognised non-symlinked record paths, and returns provenance without decoded conversation content. (../SKILL.md#chatgpt-session-acquisition)
  - _Evidence scope:_ The target skill and the evidence named by this criterion.
  - _Review prompt:_ Does the runtime evidence prove path containment, opaque handling, and content-minimised discovery?
  - _Outcomes:_ conforming; gap; exclusion
  - _Conforming guidance:_ Record the review as conforming, a named Gap with its next action, or an explicit justified exclusion.
- **STATE-2 [J] — source mutation is unavailable during acquisition** — The provider exposes only discover, list, read, and checkpoint; KI staging and any later archive/delete decision remain separate. (../SKILL.md#chatgpt-session-acquisition)
  - _Evidence scope:_ The target skill and the evidence named by this criterion.
  - _Review prompt:_ Does the provider preserve its no-decrypt, no-write, no-delete boundary?
  - _Outcomes:_ conforming; gap; exclusion
  - _Conforming guidance:_ Record the review as conforming, a named Gap with its next action, or an explicit justified exclusion.

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)
  - _Remediation:_ automatic
