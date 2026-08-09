---
id: KI-HARNESS-GOV-034
area: GOV
title: Reshape KB Streams
theme: governance-consistency
horizon: now
status: in-progress
candidate: false
blocks: []
blocked-by: []
baseline-ref: 4a17d3bf7c5c64edd35c45ebfd07a1b61d80da91
---

## Goal

Make KB Streams the operational container for roadmap and housekeeping work, aligned with the project-repository change-management model.

## Context

Streams currently retain a bespoke proposal process and Focus-style navigation. The agreed direction is `Streams/Roadmap/` for flat roadmap work and `Streams/Housekeeping/` for recurring-work templates. Roadmap identity and allocation follow the shared roadmap contract at `Streams/Roadmap/_ISSUES.md`.

## Boundary

Do not move Streams into repo operations, alter canonical knowledge, or derive identities from legacy paths, titles, or state folders. Each receiving base owns its classification and migration map.

## Current state

The seven live bases with a Streams zone retain 44 proposal-shaped records—Arcadia 23, Techne two, Kit Legal 12, Kit Principal four, TechMedix two, and Valle Armonia Principal one—in legacy structures. Equal Remedy has an empty Streams zone. The seven previously missed local `.ki-config.toml` taxonomy migrations are complete; this item now supplies the shared target structure and receiver brief.

## Locked design

- `Streams/` is the KB equivalent of an operational `docs/` surface, with initial `Roadmap/` and `Housekeeping/` areas. `Trades/` is reserved for later explicit adoption.
- `Streams/Roadmap/` uses the shared flat roadmap record, ID, lifecycle, horizon, and `_ISSUES.md` ledger contract. Each receiving base chooses its repository code, issuing areas, high-water marks, and retained-ID map.
- `Streams/Housekeeping/` contains recurring-work templates. A due run becomes a linked roadmap record; it does not move through attention folders.
- `Active`, `Background`, `Dormant`, and Focus-style folders are legacy migration inputs. They are neither target paths nor a replacement topical-group vocabulary.

## Steps

- [ ] Replace the legacy Focus/proposal model with the Streams operational-container contract, including guidance, checker, exemplars, and adapter routing.
- [ ] Publish the receiver-migration brief for every current base with a Streams zone: proposal inventory, legacy state-folder drift, and the choices it must make for roadmap identity and record classification.
- [ ] Let each receiving Knowledge Base classify its legacy records and choose its own repository code, roadmap area code(s), serial map, retained-ID map, and path migration without altering canonical knowledge.
- [ ] Regenerate derived rubric and plugin projections; audit the Harness. Each receiving base is audited as its own migration completes.

## Files touched

- `skills/repo-structure/ki-repo-kb-streams/`
- `docs/roadmap/KI-HARNESS-GOV-034-migrate-streams-identities.md`

## Verify

- The shared standard requires `Streams/Roadmap/` and `Streams/Housekeeping/`, with no Focus or state folders. Roadmap work is flat and uses the shared roadmap contract.
- The receiver brief names all seven live Streams zones and their retained proposal counts, including Legal's proposal-shaped `workstream-note`.
- Focused Streams tests, `bun run test`, `bunx tsc --noEmit`, and the Harness audit pass.

## Dependencies / blocks

The user has approved the shared contract and the receiver-owned migration direction. No base is migrated automatically: each owner chooses its own roadmap naming, numbering, record classification, and path changes. No website publication is part of this item.

## Discussion

### Migration contract

First establish the shared Streams container and roadmap placement contract, then migrate each base through receiver-owned Knowledge Base work. Existing canonical knowledge remains stable.

### Receiver migration brief

### Receiver request

Ask each receiving base: "Restructure `Streams/` as the KB operational container. Establish `Streams/Roadmap/` for flat finite work and `Streams/Housekeeping/` for recurring templates; do not retain `Active`, `Background`, `Dormant`, or Focus folders. Classify every retained stream deliberately, choose the repository and roadmap issuing codes, retained ID map, and `Streams/Roadmap/_ISSUES.md` high-water marks locally, and preserve canonical knowledge. Do not infer a new ID or topical group from a legacy path."

| Base | Retained full proposals | Local decision required |
| --- | ---: | --- |
| Equal Remedy Research | 0 | Establish `Roadmap/` and `Housekeeping/` before its first work record. |
| Arcadia Principal | 23 | Classify retained records and choose its roadmap ID map. |
| Techne Principal | 2 | Classify retained records and choose its roadmap ID map. |
| Kit Legal | 12 | Replace `Active` / `Background` / `Dormant`; choose roadmap classification and ID map. One proposal-shaped record currently uses `type: workstream-note`; include or reclassify it explicitly. |
| Kit Principal | 4 | Classify retained records and choose its roadmap ID map. |
| TechMedix | 2 | Classify retained records and choose its roadmap ID map. |
| Valle Armonia Principal | 1 | Classify retained records and choose its roadmap ID map. |
