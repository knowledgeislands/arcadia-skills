---
id: KI-HARNESS-FND-013
title: Persist batch authorisations
area: FND
theme: foundation-tooling
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: 16b31e6ca0a4a485fe38142c479c39381931bfbc
---

## Goal

Give `ki-batch` one canonical, repository-local authorisation record that retains explicit approval, timebox, scope, mandatory stops, and the run ledger.

## Context

The batch procedure requires a durable authorisation and ledger, but the current contract supplies only an exemplar and no record location, identity rule, resolver, or retention boundary. The first intended batch run exposed that gap before any unsafe execution occurred.

## Boundary

Do not create a standing task tracker, scheduler, daemon, secondary roadmap lifecycle, or implied execution authority. A record remains bounded to its named work, repository, approval, and timebox; closure and pruning stay with `ki-accept`.

## Current state

Individual explicitly approved ready items can use `ki-implement` normally. Multi-item delivery will use one repository-local record below `+/_AUTHORISATIONS/`; no current batch can start until FND-013 delivers its resolver and fixture coverage.

## Steps

- [x] Choose one adapter-compatible location and identifier shape for a bounded authorisation record.
- [x] Define explicit approval, repository, item order, timebox, completion target, mandatory-stop, and ledger fields.
- [x] Make `ki-batch` resolve only a safe, local, approved record and stop on every malformed or expired form.
- [x] Add focused fixture coverage for authority resolution, no-write stops, and retention after review.

## Files touched

- `skills/change-management/ki-batch/`
- The selected canonical authorisation-record location and this roadmap item

## Verify

- Focused batch fixture tests prove that absent, malformed, foreign, expired, and unapproved authority cannot begin delivery.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Shaping

### Intended approach

Choose one adapter-compatible record location and shape, define the exact identifier and approval fields, resolve it safely from `ki-batch`, and add fixture coverage for absent, malformed, expired, foreign, or unapproved authority. Keep the existing roadmap item as the canonical delivery record and the authorisation as its bounded execution evidence.

### Locked design

`+/_AUTHORISATIONS/` is the canonical working-zone home. Its README defines one regular Markdown record per bounded batch, named `<REPO>-BATCH-<NNN>.md`. Each record declares its local repository identity, explicit approval, ordered work-item IDs, active timebox, completion target, mandatory stops, and append-only run ledger. It grants no closure authority unless that grant expressly names the records.

An absent, malformed, foreign, expired, or unapproved record remains a no-write stop. After review of every named item and its ledger, `ki-accept` may explicitly prune the selected authority record; no process automatically deletes it. Git history is sufficient historical evidence after that explicit cleanup.

### Promotion conditions

The storage location, retention rule, approval model, scope resolver, and no-write failure modes are explicitly approved. The item is ready for implementation without introducing a tracker or duplicating lifecycle ownership.

## Dependencies / blocks

This item is independently shapeable. It unblocks practical use of `ki-batch` for a reviewed multi-item batch; it does not block individually approved delivery.

## Review

### Delivered

`+/_AUTHORISATIONS/` now defines the sole repository-local record home. `ki-batch` documents and tests a read-only resolver that accepts only a regular direct child with canonical identity, exact local repository identity, explicit timestamped approval, an active timebox, `awaiting-review` target, named work, mandatory stops, and an optional exact closure list.

The resolver returns a no-write stop for absent, malformed, foreign, expired, unapproved, non-canonical, and over-broad closure records. The working-zone README retains the record until an explicit `ki-accept` review and prune.

### Verification

- Delivery: `66732390 feat(batch): resolve canonical authorisations`.
- Focused authority and batch-cycle fixtures: 7 pass, 0 fail.
- `bun run test`, `bunx tsc --noEmit`, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

## Discussion

### First-use finding

The batch procedure's refusal to infer authority worked as designed. The missing record contract is a specification gap, not permission to use a conversational summary as durable approval.
