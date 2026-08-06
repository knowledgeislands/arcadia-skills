<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — Knowledge Islands Codex MCP binding

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-binding-codex --write`.

Line-by-line criteria for auditing ki-binding-codex. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [CODEXBIND — Codex binding](#codexbind--codex-binding)
- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)

## CODEXBIND — Codex binding

→ [standard](standards-codex-binding.md)

Codex TOML comparison and merge-safe render boundary.

- **CODEXBIND-1 [M] — Codex TOML agrees with targeted source** — The native Codex TOML MCP section contains canonical Codex-targeted servers without touching unrelated application entries. (standards-codex-binding.md)
  - _Remediation:_ diagnostic — Review the canonical source and run the native Codex renderer after confirming the intended client targets; do not overwrite unrelated application configuration.
- **CODEXBIND-J1 [J] — Native merge remains appropriate** — The Codex native writer remains the safe merge boundary for the live TOML file. (standards-codex-binding.md)
  - _Evidence scope:_ The native Codex renderer, the live TOML configuration, and non-KI application entries it must preserve.
  - _Review prompt:_ Does the native Codex writer still preserve non-KI application configuration better than whole-file ownership would?
  - _Outcomes:_ conforming; merge boundary revision required; ownership decision required
  - _Conforming guidance:_ Keep native merge ownership where it preserves unrelated configuration; otherwise record the owning runtime decision before changing the write boundary.

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)
  - _Remediation:_ automatic
