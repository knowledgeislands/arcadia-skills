---
id: KI-HARNESS-FND-013
title: Persist batch authorisations
theme: foundation-tooling
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Give `ki-batch` and `ki-agenda` one canonical, repository-local authorisation record that retains explicit approval, timebox, scope, mandatory stops, and the run ledger.

## Context

The batch and agenda procedures require a durable authorisation and ledger, but the current contract supplies only an exemplar and no record location, identity rule, resolver, or retention boundary. The first intended agenda run exposed that gap before any unsafe execution occurred.

## Boundary

Do not create a standing task tracker, scheduler, daemon, secondary roadmap lifecycle, or implied execution authority. A record remains bounded to its named work, repository, approval, and timebox; closure and pruning stay with `ki-accept`.

## Current state

Individual explicitly approved ready items can use `ki-implement` normally. Multi-item delivery will use one repository-local record below `+/_AUTHORISATIONS/`; no current batch can start until FND-013 delivers its resolver and fixture coverage.

## Steps

- [ ] Choose one adapter-compatible location and identifier shape for a bounded authorisation record.
- [ ] Define explicit approval, repository, item order, timebox, completion target, mandatory-stop, and ledger fields.
- [ ] Make `ki-batch` and `ki-agenda` resolve only a safe, local, approved record and stop on every malformed or expired form.
- [ ] Add focused fixture coverage for authority resolution, no-write stops, and retention after review.

## Files touched

- `skills/change-management/ki-batch/`
- `skills/change-management/ki-agenda/`
- The selected canonical authorisation-record location and this roadmap item

## Verify

- Focused batch and agenda fixture tests prove that absent, malformed, foreign, expired, and unapproved authority cannot begin delivery.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Shaping

### Intended approach

Choose one adapter-compatible record location and shape, define the exact identifier and approval fields, resolve it safely from `ki-batch` and `ki-agenda`, and add fixture coverage for absent, malformed, expired, foreign, or unapproved authority. Keep the existing roadmap item as the canonical delivery record and the authorisation as its bounded execution evidence.

### Locked design

`+/_AUTHORISATIONS/` is the canonical working-zone home. Its README defines one regular Markdown record per bounded batch, named `<REPO>-BATCH-<NNN>.md`. Each record declares its local repository identity, explicit approval, ordered work-item IDs, active timebox, completion target, mandatory stops, and append-only run ledger. It grants no closure authority unless that grant expressly names the records.

An absent, malformed, foreign, expired, or unapproved record remains a no-write stop. After review of every named item and its ledger, `ki-accept` may explicitly prune the selected authority record; no process automatically deletes it. Git history is sufficient historical evidence after that explicit cleanup.

### Promotion conditions

The storage location, retention rule, approval model, scope resolver, and no-write failure modes are explicitly approved. The item is ready for implementation without introducing a tracker or duplicating lifecycle ownership.

## Dependencies / blocks

This item is independently shapeable. It unblocks practical use of `ki-agenda` for a reviewed multi-item batch; it does not block individually approved delivery.

## Discussion

### First-use finding

The agenda's refusal to infer authority worked as designed. The missing record contract is a specification gap, not permission to use a conversational summary as durable approval.
