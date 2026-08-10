---
id: KI-HARNESS-OPS-004
title: Conform estate safely
area: OPS
theme: operations
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Bring the governed estate to its current standards through reviewed, repository-bounded conform runs that preserve content and safety constraints.

## Context

The estate has accumulated configuration, documentation, and toolchain changes across many repositories. GOV-026 is accepted, so kit-legal's protective `.rumdl.toml` variation is now expressible; the remaining work is to classify current-state changes before any estate write.

## Boundary

Do not run an unreviewed estate-wide write command, treat a clean tool result as proof that an autofix preserved meaning, overwrite declared owned-file exceptions, or absorb repository-specific defects into a central standards change.

## Shaping

### Intended approach

Audit the estate first, classify each proposed write by repository and safety class, inspect dry-run diffs, and apply only independent bounded batches with explicit path staging and a post-write audit. Read every formatter diff where content or structural Markdown may change.

### Dependencies

GOV-026 is accepted and its retained record has been pruned. Each repository remains the owner of any finding that requires a local decision or substantive content change.

### Promotion conditions

Promote when the initial inventory is cleanly separated into safe mechanical writes, repository-owned decisions, and blocked work; all declared safety variations are protected; and each batch has a verification and recovery boundary.

## Current state

The governed estate has no current conformance matrix that connects each proposed change to its repository, dry-run diff, declared owned-file exception, verification gate, and recovery boundary. The accepted kit-legal guard removes the known blocker, but it does not prove that any other automated write preserves meaning.

## Steps

- [ ] Audit every governed repository and collect each proposed conform write, its owning skill, dry-run diff, declared safety variation, and required post-write gate.
- [ ] Classify every proposal as a safe mechanical write, a receiver-owned decision or substantive content change, or blocked work; record a named reason for every non-mechanical result.
- [ ] Review every formatter or structural-Markdown diff and park any proposal whose meaning, ownership, or safety treatment is uncertain.
- [ ] Group only independent safe mechanical writes into repository-local batches, each with an explicit authorisation, path staging boundary, verification, recovery method, and no implied push or release.
- [ ] Run each approved repository-local batch, inspect its resulting diff, rerun the relevant audit, and record receiver-owned follow-up for every parked or decision-bound finding.

## Files touched

- This work item, holding the conformance matrix and batch classification evidence
- Only explicitly authorised repository-local conform targets in later batches

No estate-wide write command, peer-repository content change, push, release, or destructive cleanup is authorised by this planning record alone.

## Verify

- Every governed repository appears once in the matrix with a proposed-write, no-change, decision, or blocked disposition.
- Every approved write has a reviewed dry-run diff, declared safety treatment, path staging boundary, recovery method, and post-write audit.
- Every formatter or structural-Markdown diff is reviewed for meaning before a write is admitted.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

GOV-026 is satisfied. This item remains draft until the matrix establishes bounded write sets and their verification and recovery evidence; every receiver-owned decision remains outside an unattended batch.

## Discussion

### Conform is evidence gathering

Conform is not a permission slip for bulk rewriting. Its value is an inspectable proposal whose actual diff is reviewed before a repository changes.
