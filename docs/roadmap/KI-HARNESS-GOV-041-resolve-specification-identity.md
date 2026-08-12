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

## Steps

- [ ] Choose whether serials are global, per prefix, or per file, and define how multi-prefix files participate.
- [ ] Choose whether an undeclared incidental `docs/specs` directory is not applicable or a repository conformance failure.
- [ ] Define how existing identifiers, indexes, host selection, and fixtures migrate without dual semantics.
- [ ] Record the policy in a Decision Record and capture a separate implementation item for any code or estate migration.

## Files touched

- A Decision Record or equivalent canonical policy artifact
- This work item
- A follow-on implementation item if the decision changes the current contract

## Verify

- The skill, standard, host selection, checker, and fixtures state the same serial scope and applicability rule.
- Existing identifiers have an explicit continuity or migration path.
- Undeclared, malformed, and declared Specifications have distinct expected outcomes covered by fixtures.

## Dependencies / blocks

Depends on the `ki-specs` review record. It blocks dependent identity and applicability implementation; it does not reopen the completed review.

## Discussion

### Why a decision comes first

The alternatives have different user-visible identity and activation consequences. A narrow code fix would choose policy accidentally, so it is intentionally deferred until the governing contract is explicit.
