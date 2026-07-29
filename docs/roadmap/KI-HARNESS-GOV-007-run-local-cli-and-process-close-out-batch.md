---
id: KI-HARNESS-GOV-007
title: Run local CLI and process close-out batch
theme: governance-consistency
horizon: next
status: ready
blocks: []
blocked-by: []
baseline-ref: null
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

1. Revalidate the named Ready items and record the immutable common baseline before starting any implementation.
2. Execute each named item only within its plan boundary, reviewing every result before the next dependent decision.
3. Park only an affected item when its stated stop condition occurs; continue the remaining independent items only within this authorisation.
4. Run the batch gates, record every result and decision, and stop all completed items at Acceptance for human review.

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

## Discussion

### Cross-repository exclusion

FND-001 and GOV-002 remain outside this authorisation because they need `ki-plugins` and a named pilot repository respectively.
