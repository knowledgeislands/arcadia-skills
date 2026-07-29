---
id: KI-HARNESS-GOV-007
title: Run local CLI and process close-out batch
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Coordinate the approved local CLI and process close-out work as one bounded batch while preserving each named item's own lifecycle, evidence, and human acceptance boundary.

## Boundary

This batch does not write another repository, install or change user-level configuration, push, release, prune, add a dependency, or create a KI CLI command.

It does not accept or mark any named item Done.

## Current state

FND-002, FND-006, GOV-001, GOV-003, GOV-004, and GOV-005 are independent Ready items in this repository.

FND-002 is the sole source-code change; FND-006 is expected to close from current fleet evidence; the GOV items are bounded documentation, process, or source-review work.

## Steps

1. [x] Revalidate the named Ready items and record the immutable common baseline before starting any implementation.
2. [x] Execute each named item only within its plan boundary, reviewing every result before the next dependent decision.
3. [x] Park only an affected item when its stated stop condition occurs; continue the remaining independent items only within this authorisation.
4. [x] Run the batch gates, record every result and decision, and stop all completed items at Acceptance for human review.

## Files touched

- this work-item record
- the six named work-item records
- only the files explicitly listed by each named item

## Verify

- Every admitted item starts Ready and reaches Acceptance or a documented park.
- Every source change passes its stated focused checks plus the batch gates.
- No excluded action is taken.
- `bun run test`
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

All named items are independent.

## Delegation

Bounded research and mechanical documentation units may be delegated with separate file ownership.

The orchestrator retains FND-002 recovery judgment, source-comparison conclusions, integration, and every verification gate.

## Batch authorisation

### BATCH-2026-07-29-LOCAL-CLOSEOUT

The user approved this local batch on 2026-07-29: “ok - do the first batch”.

Named plans in independent order are `KI-HARNESS-FND-006`, `KI-HARNESS-FND-002`, `KI-HARNESS-GOV-001`, `KI-HARNESS-GOV-003`, `KI-HARNESS-GOV-004`, and `KI-HARNESS-GOV-005`.

Scope is this repository and only the files named by those plans, plus this authorisation record.

The timebox is four hours from the recorded baseline.

Required verification is every named plan's stated checks plus the batch gates in this item.

Allowed decisions are the locked local ownership choices in the named plans, deterministic documentation alignment, and bounded delegation with reviewed results.

The completion target is Acceptance; batch acceptance, Done transitions, and pruning are not authorised.

Mandatory stops are a public-contract change outside a named plan, material scope expansion, destructive or irreversible work, a new external dependency or coordination need, failure of a required verification, user-level configuration change, push, release, or an unapproved decision.

An affected parked item does not stop another named item unless the evidence establishes a dependency.

### Run ledger

`KI-HARNESS-FND-006` initially reached Acceptance through verified fleet evidence with no configuration change (`ed3d4c7b`). The user subsequently selected organisation-wide 160-column convergence; its revised acceptance evidence is recorded in the FND-006 item, outside this completed batch.

`KI-HARNESS-FND-002` reached Acceptance after the supported native recovery implementation (`2c669a1d`) and its item evidence packet (`c3e5c712`).

`KI-HARNESS-GOV-001` and `KI-HARNESS-GOV-003` reached Acceptance through the governance-boundary matrix and `ki-next` change-value profile (`f5edf778`, `c5784b65`).

`KI-HARNESS-GOV-004` and `KI-HARNESS-GOV-005` reached Acceptance through their durable source-led reviews (`0764c80b`, `c5784b65`).

All six items passed their stated focused verification and the batch gates: `bun run test` (218 pass), `bunx tsc --noEmit`, and clean `ki-skills`, `ki-authoring`, and `ki-roadmap` audits.

No item was parked, skipped, or deferred; no stop condition occurred; no user-level configuration, external repository, dependency, push, release, acceptance, Done transition, or pruning action occurred.

During the run, separately owned MCP roadmap commits landed on `main`; they were not admitted to this batch and are excluded from this delivery ledger.

The next required human action is normal `ki-accept` review for this item and each named item.

## Acceptance

### Delivered

Executed the approved local CLI and process close-out batch to its normal Acceptance target.

### Summary of changes

All six independent items reached Acceptance with individual evidence packets and a complete batch ledger.

The sole source-code change adds narrowly supported native Codex MCP replacement recovery; the remaining work records formatter evidence, governance/process clarification, and evidence-led methodology reviews.

### Verification

- Revalidated every named item before implementation from the common baseline `02df2024e850dc64ce5c757bfc54ee870ecaaadd`.
- `bun run test` — 218 pass, 0 fail.
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

### Outstanding concerns

Every admitted item awaits normal human acceptance.

FND-001 and GOV-002 remain outside this local batch because they require separate cross-repository authority.

### Mini recap

The batch exercised six independent local items without crossing a user, runtime, repository, release, or closure boundary.

## Done

Accepted by the user on 2026-07-29 after reviewing the complete batch ledger and named item packets.

## Discussion

### Cross-repository exclusion

FND-001 and GOV-002 remain outside this authorisation because they need `ki-plugins` and a named pilot repository respectively.
