---
id: KI-HARNESS-FND-019
area: FND
title: Declare ledger creation
theme: foundation-tooling
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
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

- [ ] Declare explicit creation intent when the roadmap adapter proposes a missing issue ledger.
- [ ] Update focused proposal coverage to require that intent.
- [ ] Verify the Harness proposal and the CLI publication contract together.

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

## Discussion

### Safety boundary

Creation intent belongs in the producer proposal. The CLI must continue refusing missing ordinary-write targets and must retain its atomicity, containment, and symlink checks for explicit creates.

### Verification strategy

The Harness regression should assert the exact proposal shape. The existing CLI publication regression remains the end-to-end host proof, so the change does not duplicate the host's safety suite inside the Harness.
