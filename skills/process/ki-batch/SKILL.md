---
name: ki-batch
ki-depends-on: []
description: >
  Coordinates an explicitly authorised batch of independent repository work-item cycles in two phases: prepare a reviewed batch authorisation from named candidates, then run repeated bounded ki-implement cycles with per-item ledgers and a concise recap. A process skill (kind: process): it does not select work, reshape plans, bypass lifecycle gates, infer acceptance, prune, push, release, or introduce a tracker. Use when asked to "prepare a work batch", "authorise these plans as a batch", "run this approved batch", "coordinate several ready plans", or "record a batch run". For selection use ki-next; plan shape use ki-plan; single-item delivery use ki-implement; closure use ki-accept; delegation use ki-delegate.
argument-hint: 'prepare <candidate-item>... | implement <batch-authorisation> | help'
---

# ki-batch

**Kind:** process.

Coordinates a reviewed, explicitly authorised set of independent implementation cycles.

Read [the batch procedure](references/standards-batch.md) before acting, [the authorisation example](references/exemplars.md) when preparing a record, and [the source notes](references/sources.md) only for their bounded ideas.

## What this skill does

`ki-batch` has two distinct phases.

### Preparation

Use the normal roadmap cycle over an explicit candidate set.

`ki-next` selects and prioritises work; `ki-plan` shapes it; `ki-implement` does not begin during preparation.

The phase produces a reviewed batch authorisation that names exactly what may run and what must stop.

### Implementation

Under that authorisation, coordinate repeated independent `ki-implement` cycles in dependency order.

Every item retains its own `ready` → `in-progress` → `acceptance` lifecycle, baseline, verification, and acceptance evidence.

Park ambiguity rather than resolving it by inference, then record a per-item ledger and concise `ki-recap`-shaped batch recap.

`ki-accept` remains the only closure owner.

`ki-batch` may request batched acceptance only when the authorisation expressly grants it for named items.

Pruning always requires separate explicit destructive authority.

## Relationship boundary

`ki-recap` grounds delivered work, outstanding concerns, and learning routes; it does not grant authority.

`ki-next` owns selection, promotion, and deferral.

`ki-plan` owns work-item shape, planning detail, and readiness material.

`ki-implement` owns each single-item delivery cycle.

`ki-accept` owns human-approved closure and pruning.

`ki-delegate` owns bounded worker preparation and integration gates where the authorisation permits delegation.

This skill coordinates these siblings; it does not duplicate their procedures or create a tracker, plugin, worktree scheme, runtime-specific mechanic, wrapper, or KI CLI command.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

`prepare <candidate-item>...` evaluates only the named candidates through the normal roadmap cycle and produces a reviewed proposed authorisation.

`implement <batch-authorisation>` validates one approved authorisation and coordinates its named items in dependency order.

With no target, identify whether a candidate set or an approved authorisation is required and stop.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- A batch authorisation is bounded authority, not a standing permission for autonomous work.
- Stop on any mandatory stop rather than widening the batch or silently skipping a concern.
- The sources offer the useful ideas of eligibility, parking, review, and clear scope; their trackers, autonomy frameworks, and runtime machinery are not imported.
