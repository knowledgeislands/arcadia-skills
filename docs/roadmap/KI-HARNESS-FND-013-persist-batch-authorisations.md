---
id: KI-HARNESS-FND-013
title: Persist batch authorisations
theme: foundation-tooling
horizon: next
status: draft
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

Individual explicitly approved ready items can use `ki-implement` normally. A multi-item `ki-agenda` cycle must stop because no canonical durable authorisation record can yet be resolved.

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

### Promotion conditions

Promote when the storage location, retention rule, approval model, scope resolver, and no-write failure modes are reviewable without introducing a tracker or duplicating lifecycle ownership.

## Dependencies / blocks

This item is independently shapeable. It unblocks practical use of `ki-agenda` for a reviewed multi-item batch; it does not block individually approved delivery.

## Discussion

### First-use finding

The agenda's refusal to infer authority worked as designed. The missing record contract is a specification gap, not permission to use a conversational summary as durable approval.
