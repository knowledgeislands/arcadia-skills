---
id: KI-HARNESS-GOV-034
area: GOV
title: Migrate Streams identities
theme: governance-consistency
horizon: now
status: in-progress
candidate: false
blocks: []
blocked-by: []
baseline-ref: 4a17d3bf7c5c64edd35c45ebfd07a1b61d80da91
---

## Goal

Give KB Streams the same durable repository, area, and serial identity model as area-enabled repository roadmaps.

## Context

Streams currently require a bespoke `code` field and an owner-approved migration map. The agreed direction is a stable `id`, fixed issuing `area`, optional multi-valued `groups`, and a `Streams/_ISSUES.md` ledger, while Focus and category remain navigational structure. Arcadia has 23 retained proposals and Techne has two.

## Boundary

Do not move Streams into repo operations, alter canonical knowledge, or derive identities from Focus, category, title, or path. The migration must preserve retained proposal history and non-reuse guarantees.

## Current state

The shared Streams standard still requires the bespoke `code` field, while Arcadia has 23 retained full proposals and Techne has two without the intended common identifier or allocation ledger. The seven previously missed local `.ki-config.toml` migrations are complete; this item now supplies the remaining shared Streams baseline.

## Locked design

- A full proposal has one scalar `id`, not a `code`. Its grammar is `<REPO>-<AREA>-<NNN>`: the configured stable repository code, a configured fixed issuing area, and a zero-padded positive serial.
- Every current Knowledge Base declares the fixed `STR = "streams"` area. `groups` is an optional, multi-valued frontmatter field for future subject grouping; it does not affect allocation and no historical group membership is inferred during this migration.
- Each `Streams/` zone owns `_ISSUES.md`, the durable ledger of per-area high-water marks and the explicit retained migration map. A serial is never reused after closure or pruning.
- Focus, category, title, path, lifecycle status, approval evidence, and canonical outputs remain unchanged. The migration assigns immutable IDs once; it does not derive them from any of those navigational or descriptive values.

## Steps

- [ ] Replace the shared Streams `code` contract with the repository / area / serial `id` contract, including configuration, ledger, checker, exemplars, and creation guidance.
- [ ] Add the `STR` area, `_ISSUES.md` ledger, and explicit retained-proposal identifier map to Arcadia without altering proposal content or placement.
- [ ] Add the `STR` area, `_ISSUES.md` ledger, and explicit retained-proposal identifier map to Techne without altering proposal content or placement.
- [ ] Regenerate derived rubric and plugin projections; audit the Harness and both migrated Knowledge Bases.

## Files touched

- `skills/repo-structure/ki-repo-kb-streams/`
- `docs/roadmap/KI-HARNESS-GOV-034-migrate-streams-identities.md`
- `ki-arcadia-principal/.ki-config.toml` and `Streams/`
- `ki-techne-principal/.ki-config.toml` and `Streams/`

## Verify

- The Streams checker rejects missing or malformed proposal IDs, an undeclared area, a missing ledger, duplicate IDs, and a serial at or below its ledger high-water mark when allocating a new proposal.
- Arcadia retains 23 proposals, all with unique `KI-ARCADIA-STR-*` identifiers; Techne retains two with unique `KI-TECHNE-STR-*` identifiers.
- No proposal title, path, lifecycle status, approval evidence, or canonical knowledge changes.
- Focused Streams tests, `bun run test`, `bunx tsc --noEmit`, and the relevant repository audits pass.

## Dependencies / blocks

The user has approved this current-state migration. The shared Harness contract lands before the receiver-owned Arcadia and Techne metadata migrations; no external adapter implementation or website publication is part of this item.

## Discussion

### Migration contract

First establish the shared Streams contract and allocation ledger, then migrate each base's proposal metadata through its receiving Knowledge Base work. Existing proposal titles, paths, status, and approval evidence remain stable.
