---
id: KI-HARNESS-GOV-041
area: GOV
title: Resolve Specification identity
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Choose one unambiguous Specification identifier and applicability contract, then align its standard, checker, host selection, and fixtures.

## Context

`KI-HARNESS-REV-001` found that `ki-specs` says serials are per prefix while its standard permits multiple prefixes per file and describes sequencing differently. The checker enforces global uniqueness, which matches neither reading. A separate conflict exists between the Decision Record’s not-applicable rule for a target without `docs/specs` and the native context’s missing-index failure.

The current implementation preserves trustworthy structural checks while leaving both policy choices visible. It must not manufacture an answer from incidental directory shape.

## Boundary

Decide the policy and its migration only. Do not renumber existing Specifications, turn undeclared directories into activation, or weaken malformed-document failures before the intended scope is approved.

## Current state

Serial scope and applicability are explicitly unresolved in the review record. The checker already fails closed for malformed local evidence and duplicate prefix ownership, but cannot establish the intended serial sequence or activation boundary without a governing choice.

The work is fully shapeable as two independently reconsiderable governance decisions, but it cannot become Ready until the corpus inventory supplies the migration evidence and both decisions are approved. `GDR-KI-HARNESS-008` will own Specification serial identity and `GDR-KI-HARNESS-009` will own capability applicability.

## Steps

- [ ] Inventory the retained Specification corpus by file, prefix, serial, multi-prefix ownership, repository declaration, and incidental-directory state; record the migration count for each alternative.
- [ ] Write `GDR-KI-HARNESS-008` to choose global, per-prefix, or per-file serial identity and define exactly how multi-prefix files participate.
- [ ] Write `GDR-KI-HARNESS-009` to choose whether an undeclared incidental `docs/specs/` directory is not applicable or a repository conformance failure, while preserving malformed declared evidence as a failure.
- [ ] Update the Decision Records index and define one clean-cut migration for identifiers, indexes, host selection, and fixtures with no dual semantics or compatibility fallback.
- [ ] Capture separate implementation work for the checker and estate only after both decisions are approved.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-008-specification-serial-identity.md`
- `docs/decisions/GDR-KI-HARNESS-009-specification-capability-applicability.md`
- `docs/decisions/README.md`
- This work item
- A separate roadmap item only when the approved decisions require implementation

## Verify

- The skill, standard, host selection, checker, and fixtures state the same serial scope and applicability rule.
- Existing identifiers have an explicit continuity or migration path.
- Undeclared, malformed, and declared Specifications have distinct expected outcomes covered by fixtures.
- `ki repo audit --skill ki-decision-records --repo .`, `ki repo audit --skill ki-work-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

Depends on the `ki-specs` review record. It becomes Ready only after the corpus inventory is recorded and the two pending decisions are approved. It blocks dependent identity and applicability implementation; it does not reopen the completed review.

## Documentation impact

### Decision Records

The resulting specification-identity authority requires durable decision records; GOV-040 has resolved the shared Knowledge metadata baseline.

### Specifications

This work defines the identity and authority boundary for Specifications; it does not silently rewrite existing contracts.

### Guides

No guide change is planned until the decision identifies the contributor-facing workflow.

### Roadmap

The GOV-040 prerequisite is resolved; any migration or checker change becomes explicit follow-on work after the two pending decisions and corpus inventory.

## Discussion

### Why a decision comes first

The alternatives have different user-visible identity and activation consequences. A narrow code fix would choose policy accidentally, so it is intentionally deferred until the governing contract is explicit.
