---
id: KI-HARNESS-FND-019
area: FND
title: Declare ledger creation
theme: foundation-tooling
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 14a4163e38db7be396040e43873a1888b4de7788
---

# Declare ledger creation intent

## Goal

Make roadmap conformance safely create a missing issue-allocation ledger as the repository-roadmap standard promises.

## Context

The roadmap adapter detects a missing `docs/roadmap/_ISSUES.md` and reconstructs its high-water marks from retained work records. Its conform proposal currently describes that result as an ordinary write. The `ki` CLI correctly rejects ordinary writes to nonexistent targets and requires an explicit `create: true` declaration for atomic creation.

The producer and host therefore enforce individually valid contracts that do not compose: the Harness says the ledger can be scaffolded, while the CLI refuses the proposal because creation intent is absent.

## Boundary

This work does not relax CLI publication safety, change the issue-ledger format, alter identifier allocation, or permit general undeclared file creation.

## Current state

`ki-work-roadmap` proposes `{ path, content }` for a missing ledger. `tools-ki` already supports `{ path, content, create: true }` and verifies atomic creation, containment, target absence, and symlink safety.

## Steps

- [x] Declare explicit creation intent when the roadmap adapter proposes a missing issue ledger.
- [x] Update focused proposal coverage to require that intent.
- [x] Verify the Harness proposal and the CLI publication contract together.

## Files touched

- `skills/change-management/ki-work-roadmap/scripts/rubric/contexts/roadmap-drafts.ts`
- `skills/change-management/ki-work-roadmap/scripts/rubric/items/index.test.ts`
- `docs/roadmap/KI-HARNESS-FND-019-declare-ledger-creation-intent.md`
- `docs/roadmap/_ISSUES.md`

## Verify

Run the focused `ki-work-roadmap` rubric test, the Harness typecheck and test suite, and the existing `tools-ki` conform-write test that proves explicitly declared files are created atomically.

## Dependencies / blocks

No unresolved dependency blocks implementation. `tools-ki` already exposes and verifies the required creation protocol.

## Documentation impact

### Decision Records

No Decision Record is needed because this repairs conformance to the existing repository-roadmap and publication-safety contracts.

### Specifications

No specification change is needed; the implementation makes the roadmap adapter honour the existing conform-write creation contract.

### Guides

No guide change is needed because the user-facing promise that CONFORM scaffolds a missing ledger is already documented.

### Roadmap

This record reserves and delivers `KI-HARNESS-FND-019`; no follow-on roadmap work is anticipated.

## Review

### Delivered

Delivered explicit issue-ledger creation intent from baseline `14a4163e38db7be396040e43873a1888b4de7788` in implementation commit `91c95e84`, with verification evidence recorded by `6f1c3efd`.

### Summary of changes

The roadmap proposal now emits `create: true` only for a missing canonical issue ledger, and focused coverage proves the exact safe-create proposal without relaxing malformed-ledger or ordinary-write behavior.

### Verification

The focused roadmap tests pass. The current repository-wide `bun run test` gate passes 530 tests, `bunx tsc --noEmit` passes, and the roadmap and authoring audits pass. The previously recorded remediation-inventory drift is no longer present.

### Outstanding concerns

None within this item. The CLI retains containment, target-absence, symlink, and atomic-create enforcement.

### Post-change review

The implementation is narrow, backward-compatible for existing ledgers, and closes the producer/host contract mismatch. It is ready for consolidated acceptance.

### Mini recap

Missing roadmap ledgers can now be created through the same explicit safety contract already enforced by `tools-ki`.

## Discussion

### Full-suite blocker

The focused Harness test, TypeScript check, Biome check, and `tools-ki` conform-write suite pass. The repository-wide Harness suite remains red because the pre-existing remediation-inventory fixture expects 46 catalogues and 643 criteria while the current repository contains 47 catalogues and 646 criteria. FND-019 changes neither catalogues nor structured criteria, so that separate drift must be resolved before this item can move to `awaiting-review` under the required clean-gate policy.

### Safety boundary

Creation intent belongs in the producer proposal. The CLI must continue refusing missing ordinary-write targets and must retain its atomicity, containment, and symlink checks for explicit creates.

### Verification strategy

The Harness regression should assert the exact proposal shape. The existing CLI publication regression remains the end-to-end host proof, so the change does not duplicate the host's safety suite inside the Harness.
