---
id: KI-HARNESS-GOV-001
title: Separate Knowledge Islands policy from portable governance
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Write a compact boundary matrix separating portable contract, Knowledge Islands estate policy, reusable Harness mechanics, and runtime-specific binding.

## Boundary

Do not split standards or redesign composition unless the matrix exposes a concrete ownership conflict.

## Shaping

### Intended approach

Inventory the current harness rules and classify each by portable contract, Knowledge Islands estate policy, reusable harness mechanic, or runtime-specific binding.

Publish one compact matrix in the existing canonical documentation area, cross-linked to its owning standards and decisions, then identify only concrete duplicate or conflicting ownership.

### Known dependencies

The relevant evidence already exists across the skills taxonomy, runtime-parity material, binding standards, and architecture decisions.

No split or new policy layer is presumed by this review.

### Decision still needed

Choose the matrix's canonical documentation home and the threshold for treating an observed overlap as a real ownership conflict rather than an intentional reference.

### Promotion conditions

Promote when the source set, matrix shape, canonical home, and review criteria are explicit enough to keep the work documentary unless evidence requires a narrowly named follow-up.

## Current state

The current ownership evidence is distributed across the skill taxonomy, runtime-parity references, binding standards, and architecture decisions.

No compact comparison makes the portable-contract, estate-policy, harness-mechanic, and runtime-binding boundaries inspectable together.

## Steps

1. Collect the existing canonical evidence for the four boundary classes without restating each source standard.
2. Publish one compact matrix in `docs/decisions/references/` that names the class, owner, representative surface, and boundary test.
3. Identify any genuine duplicate or conflicting ownership; route each to a specifically named owner or follow-up item rather than splitting a standard in this item.
4. Link the matrix from its nearest existing architecture orientation only if that orientation currently lacks a route to the boundary evidence.

## Files touched

- `docs/decisions/references/governance-boundary-matrix.md`
- `docs/decisions/` orientation only if a focused link is necessary
- this work-item record

## Verify

- Every matrix row has one owning class and a concrete boundary test.
- No new standard, composition split, or policy layer is introduced.
- Every identified conflict has a named receiving owner or remains explicitly unresolved.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This item is independent.

## Discussion

### Test for separation

The matrix should reveal a real portability or ownership problem before it causes any skill split; taxonomy alone is not a sufficient reason.

### Canonical home

`docs/decisions/references/` is the selected home because the matrix compares existing architectural boundaries without becoming a new governance standard.
