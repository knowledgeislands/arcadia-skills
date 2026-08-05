---
id: KI-HARNESS-GOV-011
title: Unify forward work and recurring housekeeping
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: 8cf83d6fd243d853a6ca9241ca310678acc535a6
---

## Goal

Give normal repositories and Knowledge Bases one process-command family for forward work, while preserving their distinct roadmap and Streams record shapes.

Make recurring housekeeping a declared template system that `ki-next` can turn into ordinary due work.

## Context

The current roadmap and Streams standards use divergent horizons, delivery states, and process boundaries. `ki-plan` partially dispatches to Streams, but implementation, acceptance, batching, and recurring work lack one coherent dual-repository contract.

## Boundary

Do not retain compatibility vocabularies, parallel lifecycle paths, or a separate backlog mechanism for housekeeping. Do not make a KB create repository-roadmap artifacts.

## Current state

Repository roadmap work uses `blocking` / `next` / `soon` / `waiting-for` / `parked` / `future` and `open` / `ready` / `in-progress` / `acceptance` / `done`.

KB Streams use a different Focus vocabulary and `draft` / `ready` / `in-progress` / `rolled-out` / `reviewed` / `completed` lifecycle, including automatic retirement. Process skills only partially bridge the two models.

## Steps

- [x] Define the shared `now` / `next` / `soon` / `future` / `waiting-for` / `parked` queue and `draft` / `ready` / `in-progress` / `awaiting-review` / `done` lifecycle in the roadmap contract, including a required review packet.
- [x] Add `ki-housekeeping` as the recurring-work template owner, with non-KB templates in `docs/housekeeping/`, stable identities, cadence and last-run evidence, and due-run spawning rules for `ki-next`.
- [x] Adapt `ki-kb-streams` to the shared queue and lifecycle, including `Streams/Housekeeping/`, retained done proposals, explicit pruning, and the KB template binding.
- [x] Simplify `ki-next`, `ki-plan`, `ki-implement`, `ki-accept`, `ki-batch`, `ki-recap`, and `ki-delegate` around the shared command family and their explicit adapter boundaries.
- [x] Update affected rubric contexts, generated publications, and focused tests; add the new skill to repository configuration.
- [x] Run the relevant direct audits, focused tests, TypeScript, the full test suite, and formatting checks.

## Files touched

- `skills/governance/ki-roadmap/`
- `skills/governance/ki-housekeeping/`
- `skills/knowledge-bases/ki-kb-streams/`
- `skills/process/ki-next/`
- `skills/process/ki-plan/`
- `skills/process/ki-implement/`
- `skills/process/ki-accept/`
- `skills/process/ki-batch/`
- `skills/process/ki-recap/`
- `skills/process/ki-delegate/`
- `.ki-config.toml`

## Verify

- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-housekeeping --repo .`
- `ki repo audit --skill ki-kb-streams --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

The design was explicitly agreed: the shared queue includes a `housekeeping` horizon for Streams, and recurring templates use cadence plus last-run evidence to spawn normal work through `ki-next`.

## Delegation

### Locked decisions

- One public command family operates both adapters; repository shape decides the backing record and implementation details.
- The common delivery lifecycle is `draft` → `ready` → `in-progress` → `awaiting-review` → `done`.
- `ki-housekeeping` owns templates; `ki-next` owns due-run selection and spawning; each run uses the common delivery cycle.
- `ki-delegate` supplies embedded delegation guidance to `ki-implement` and `ki-batch`, not a separate required lifecycle invocation.

### Escalate

- Stop if an existing rubric or host contract cannot represent a required invariant without an unapproved host change.
- Stop before changing another repository or performing a destructive prune.

## Review

### Delivered

The roadmap contract, Streams adapter, and all six process skills now use one queue and delivery lifecycle. `ki-housekeeping` owns portable recurring templates, and `ki-next` can spawn due ordinary work into the appropriate adapter's delivery horizon.

### Summary of changes

Added `ki-housekeeping` with a native rubric and focused tests; migrated repository work records and Streams proposals to `draft` → `ready` → `in-progress` → `awaiting-review` → `done`; and made `ki-accept` the shared human-review closure and explicit-pruning boundary.

### Verification

- `bun run test` — pass: 273 tests, 0 failures.
- `bunx tsc --noEmit` — pass.
- `ki repo audit --skill ki-roadmap --repo .` — pass.
- `ki repo audit --skill ki-housekeeping --repo .` — pass.
- Focused roadmap, Streams, and housekeeping rubric tests — pass.
- `ki repo audit --skill ki-skills --repo .` — no failures; 12 known classifier warnings because process skills intentionally do not expose governance modes.
- `ki repo audit --skill ki-kb-streams --repo .` — not applicable in this non-KB repository; the Streams focused context tests pass.

### Outstanding concerns

The host's `ki-skills` classifier still reports process skills as if they were governance skills. This is a pre-existing audit-model limitation, not a lifecycle-contract failure.

### Mini recap

The common-command design is implemented and verified through the human-review boundary. No new durable learning route is proposed.

## Discussion

### Shared contract and adapters

The roadmap standard holds the canonical command and lifecycle contract. `ki-kb-streams` explicitly maps its proposal records and Focus folders to that contract, then adds the Enactment gate and canonical-knowledge destination semantics.

### Housekeeping horizon

`Housekeeping` is a Streams horizon requested for visible recurring work. In non-KB repositories, templates remain separately discoverable under `docs/housekeeping/`; due runs enter the normal priority queue according to their declared spawning rule.
