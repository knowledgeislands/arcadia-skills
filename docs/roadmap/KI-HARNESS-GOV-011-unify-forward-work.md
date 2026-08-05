---
id: KI-HARNESS-GOV-011
title: Unify forward work
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
- [x] Simplify `ki-next`, `ki-plan`, `ki-implement`, `ki-accept`, `ki-batch`, and `ki-recap` around the shared command family and their explicit adapter boundaries.
- [x] Update affected rubric contexts, generated publications, and focused tests; add the new skill to repository configuration.
- [x] Run the relevant direct audits, focused tests, TypeScript, the full test suite, and formatting checks.
- [x] Enforce compact four-word roadmap titles and normalize every registered repository roadmap.
- [x] Align the native `ki repo roadmap` parser, ordering, promotion help, and CLI coverage in `tools-ki` with the shared lifecycle and horizon names.

## Files touched

- `skills/change-management/ki-roadmap/`
- `skills/change-management/ki-housekeeping/`
- `skills/knowledge-bases/ki-kb-streams/`
- `skills/change-management/ki-next/`
- `skills/change-management/ki-plan/`
- `skills/change-management/ki-implement/`
- `skills/change-management/ki-accept/`
- `skills/change-management/ki-batch/`
- `skills/change-management/ki-recap/`
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
- Runtime subagent delegation supplies bounded execution; optional `ki-delegation` supplies durable packet guidance to `ki-plan`, `ki-implement`, and `ki-batch` when active.

### Escalate

- Stop if an existing rubric or host contract cannot represent a required invariant without an unapproved host change.
- Stop before changing another repository or performing a destructive prune.

## Review

### Delivered

The roadmap contract now limits every work-item title to four words, every registered non-KB roadmap conforms, and the native `ki repo roadmap` command accepts the shared lifecycle and horizon names.

### Summary of changes

Added the title limit to the roadmap standard, mechanical auditor, generated rubric publication, and focused test. Normalized 70 registered roadmap titles without renaming files or changing their bodies. Updated `tools-ki` from `blocking` / `open` / `acceptance` to `now` / `draft` / `awaiting-review` in its native parser, ordering, help, tests, and remaining roadmap records.

### Verification

- `bun run test` — pass: 274 tests, 0 failures.
- `bunx tsc --noEmit` — pass.
- `ki repo audit --skill ki-roadmap --repo .` — pass.
- Every registered non-KB roadmap was checked for titles over four words — 0 remain.
- The ten external changed roadmaps and chezmoi, KI Specifications, KI Website, MCP, tools, and Valle Armonia repositories each have a focused title-only commit.
- `tools-ki` `bun run test` — pass: 475 tests, 0 failures.
- `tools-ki` `bunx tsc --noEmit` and focused Biome check — pass.
- `ki repo roadmap list` — pass: lists GOV-007 as `[draft]`; no invalid lifecycle diagnostic.

### Outstanding concerns

Several registered repositories have pre-existing roadmap lifecycle/body-shape audit failures. The title migration introduced none; their title fields meet the new limit.

### Post-change review

Confirm that the concise title choices retain sufficient recognition in roadmap lists; identifiers and stable filename slugs preserve the fuller context.

### Mini recap

No new durable learning route is proposed.

## Discussion

### Shared contract and adapters

The roadmap standard holds the canonical command and lifecycle contract. `ki-kb-streams` explicitly maps its proposal records and Focus folders to that contract, then adds the Enactment gate and canonical-knowledge destination semantics.

### Housekeeping horizon

`Housekeeping` is a Streams horizon requested for visible recurring work. In non-KB repositories, templates remain separately discoverable under `docs/housekeeping/`; due runs enter the normal priority queue according to their declared spawning rule.
