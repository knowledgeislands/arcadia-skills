<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki skill rubric <skill> --write`. -->

# Generated rubric — KI Specifications repository structure

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki skill rubric ki-specifications --write`.

Line-by-line criteria for auditing ki-specifications. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)
- [SPEC — Repository structure](#spec--repository-structure)
- [SYNC — Standard synchronisation](#sync--standard-synchronisation)

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)

## SPEC — Repository structure

→ [standard](standards-specifications.md)

Repository identity and stable top-level seams.

- **SPEC-1 [M] — Repository identity marker** — `.ki-config.toml` declares a keyless `["knowledgeislands/ki-agentic-harness:ki-specifications"]` table. Unknown keys WARN because the marker has no options yet. (standards-specifications.md)
- **SPEC-2 [M] — Authority areas** — `proposals/`, `specifications/`, and `schemas/` exist as directories. Their absence FAILs. (standards-specifications.md)
- **SPEC-3 [M] — Supporting areas** — `templates/`, `examples/`, `docs/`, and `tooling/` exist as directories. Their absence WARNs. (standards-specifications.md)
- **SPEC-J1 [J] — Minimal floor** — Every asserted structure has proved stable enough to govern across time. (standards-specifications.md)
  - _Review prompt:_ Has every asserted structure proved stable enough to govern across time?
- **SPEC-J2 [J] — Authority boundary** — The skill checks repository shape without claiming canonical ownership of normative specification meaning. (standards-specifications.md)
  - _Review prompt:_ Does the skill preserve the authority boundary around normative specification meaning?

## SYNC — Standard synchronisation

→ [standard](standards-specifications.md)

Alignment across the knowledge chain.

- **SYNC-1 [J] — Knowledge-chain synchronisation** — The standard, rubric, catalogue, tests, and source review agree. (standards-specifications.md)
  - _Review prompt:_ Do the standard, rubric, catalogue, tests, and source review agree?
