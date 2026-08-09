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

The shared Streams standard still requires the bespoke `code` field. The seven live bases with a Streams zone retain 44 full proposals—Arcadia 23, Techne two, Kit Legal 12, Kit Principal four, TechMedix two, and Valle Armonia Principal one—without the intended common identifier or allocation ledger. Equal Remedy has an empty Streams zone. The seven previously missed local `.ki-config.toml` taxonomy migrations are complete; this item now supplies the remaining shared Streams baseline.

## Locked design

- A full proposal has one scalar `id`, not a `code`. Its grammar is `<REPO>-<AREA>-<NNN>`: the configured stable repository code, a configured fixed issuing area, and a zero-padded positive serial.
- The shared standard supplies no default area code or group vocabulary. Each receiving Knowledge Base chooses its own stable repository code, fixed issuing area(s), serial map, and migration plan.
- `groups` is optional, multi-valued topical metadata selected by the receiving base. It does not affect allocation. Legacy state folders such as `Active`, `Background`, and `Dormant` are not groups and must not become a new group vocabulary.
- Each `Streams/` zone owns `_ISSUES.md`, the durable ledger of per-area high-water marks and the explicit retained migration map. A serial is never reused after closure or pruning.
- Focus, category, title, path, lifecycle status, approval evidence, and canonical outputs remain unchanged. The migration assigns immutable IDs once; it does not derive them from any of those navigational or descriptive values.

## Steps

- [ ] Replace the shared Streams `code` contract with the repository / area / serial `id` contract, including configuration, ledger, checker, exemplars, and creation guidance.
- [ ] Publish the receiver-migration brief for every current base with a Streams zone: proposal inventory, legacy state-folder drift, and the choices it must make for its own identifier and group vocabulary.
- [ ] Let each receiving Knowledge Base choose its own repository code, area code(s), serial map, group vocabulary, and path migration; it then adds `_ISSUES.md` and its explicit retained-proposal ID map without altering canonical knowledge.
- [ ] Regenerate derived rubric and plugin projections; audit the Harness. Each receiving base is audited as its own migration completes.

## Files touched

- `skills/repo-structure/ki-repo-kb-streams/`
- `docs/roadmap/KI-HARNESS-GOV-034-migrate-streams-identities.md`
- `skills/repo-structure/ki-repo-kb-streams/`
- This roadmap item, carrying the receiver-migration brief

## Verify

- The Streams checker rejects missing or malformed proposal IDs, an undeclared area, a missing ledger, duplicate IDs, and a ledger below any retained proposal serial; allocation must use a serial above the selected ledger high-water mark.
- The shared standard distinguishes topical `groups` from lifecycle status, attention navigation, and fixed identity areas; it does not impose a group or area name on a base.
- The receiver brief names all seven live Streams zones and their retained proposal counts, including Legal's proposal-shaped `workstream-note`.
- Focused Streams tests, `bun run test`, `bunx tsc --noEmit`, and the Harness audit pass.

## Dependencies / blocks

The user has approved the shared contract and the receiver-owned migration direction. No base is migrated automatically: each owner chooses its own naming, numbering, group vocabulary, and path changes. No external adapter implementation or website publication is part of this item.

## Discussion

### Migration contract

First establish the shared Streams contract and allocation ledger, then migrate each base's proposal metadata through its receiving Knowledge Base work. Existing proposal titles, paths, status, and approval evidence remain stable.

### Receiver migration brief

| Base | Retained full proposals | Local decision required |
| --- | ---: | --- |
| Equal Remedy Research | 0 | Choose its future identity and group vocabulary before its first proposal. |
| Arcadia Principal | 23 | Choose topical groups and its retained ID map. |
| Techne Principal | 2 | Choose topical groups and its retained ID map. |
| Kit Legal | 12 | Replace `Active` / `Background` / `Dormant` navigation with topical groups and choose its retained ID map. One proposal-shaped record currently uses `type: workstream-note`; include or reclassify it explicitly. |
| Kit Principal | 4 | Choose topical groups and its retained ID map. |
| TechMedix | 2 | Choose topical groups and its retained ID map. |
| Valle Armonia Principal | 1 | Choose topical groups and its retained ID map. |
