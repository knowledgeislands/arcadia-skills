---
id: KI-HARNESS-OPS-004
title: Conform estate safely
area: OPS
theme: operations
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 4677aa94c96f8b165ee85feaf1f5f044f20a6b8c
---

## Goal

Resolve the bounded estate conformance preconditions without applying an estate-wide write or disturbing unrelated peer-repository work.

## Context

The estate has accumulated configuration, documentation, and toolchain changes across many repositories. GOV-026 is accepted, so kit-legal's protective `.rumdl.toml` variation is now expressible; the immediate work is to classify current-state dry-run evidence before any separately authorised repository write.

## Boundary

Do not apply CONFORM, run an estate-wide write command, treat a clean tool result as proof that an autofix preserved meaning, overwrite declared owned-file exceptions, or absorb repository-specific defects into a central standards change. This item produces evidence and follow-up proposals only.

## Shaping

### Intended approach

Freeze one repository-membership snapshot from the locally registered governed estate, audit each available repository, and inspect `ki repo conform --dry-run` evidence without applying it. Record each proposed path by owner, safety class, declared exception, verification, and recovery boundary. Future writes become separately selected repository-local work.

### Dependencies

GOV-026 is accepted and its retained record has been pruned. Each repository remains the owner of any finding that requires a local decision or substantive content change.

### Approved planning basis

The delivery boundary is verified resolution of the local source mappings and repository-local authoring failures found in the initial read-only review. The frozen registry snapshot and unavailable repositories remain explicit evidence rather than inferred coverage.

## Current state

The governed estate has no current conformance matrix that connects each proposed change to its repository, checked revision, dry-run diff, declared owned-file exception, verification gate, and recovery boundary. The accepted kit-legal guard removes the known blocker, but it does not prove that any other automated write preserves meaning.

## Steps

- [x] Freeze the locally registered governed-estate membership and checked revision for every available repository; record missing or inaccessible members without substituting another checkout.
- [x] Run the applicable audits and `ki repo conform --dry-run` only, capturing each proposed path, governing skill, declared safety variation, and required post-write gate without applying a change.
- [x] Classify every result as `no-change`, `safe-mechanical-proposal`, `receiver-decision`, or `blocked`; record a named reason for every non-mechanical or unavailable result.
- [x] Review every formatter or structural-Markdown proposal for meaning and mark uncertainty as `receiver-decision` or `blocked`, never as mechanically safe.
- [x] Resolve separately authorised repository-local work without an estate-wide conform; remove the transient matrix once every recorded blocker has fresh verification.

## Files touched

- This work item

No peer-repository content, configuration, Git state, push, release, or destructive cleanup is in scope.

## Verify

- Every repository in the frozen registry snapshot appears once with its checked revision or explicit availability failure.
- Every dry-run result has its governing skill, exact proposed paths, declared safety treatment, classification, verification, recovery, and disposition.
- Every formatter or structural-Markdown proposal is reviewed for meaning before it can be labelled mechanically safe.
- Git status and checked revisions prove that no peer-repository write occurred during the inventory.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

GOV-026 is satisfied. The local registry and repository checkouts are evidence inputs, not write authority; an unavailable repository is recorded as blocked. Every conform apply, receiver-owned decision, and repository-local commit remains separate future work requiring its own authority.

## Delegation

Read-only repository lanes may run in parallel when each worker is bound to an explicit repository set and returns only revision, audit, dry-run, classification, and stop evidence. Workers may not run CONFORM without `--dry-run`, edit, stage, commit, contact a receiver, or broaden the frozen registry. The coordinator owns the registry snapshot, classification consistency, matrix synthesis, and final proof that peer Git state is unchanged.

## Documentation impact

### Decision Records

No decision record is needed: this is a read-only evidence collection and does not select receiver-owned changes.

### Specifications

No behaviour-level product specification changes are planned.

### Guides

No guide changes are planned; each discovered repository-local concern remains with its receiving owner.

### Roadmap

The estate review records any safe proposal, receiver decision, or blocked repository as explicit follow-on work.

## Review

### Delivered

Resolved the five bounded estate preconditions and removed the temporary conformance matrix.

### Summary of changes

Registered the verified `Resources/` source roots for `er-research`, `kit-techmedix`, `vallearmonia-principal`, and `kit-principal` in the local KI registry.

Applied and committed rumdl-safe Markdown repairs and eight verified relative-link corrections in `kit-legal`, and two rumdl-safe Calendar repairs in `kit-principal`.

### Verification

All four affected Knowledge Bases now pass `ki repo conform --skill ki-repo --dry-run`.

`kit-legal` and `kit-principal` now pass `ki repo audit --skill ki-authoring`; each retains only its declared `.rumdl.toml` exception warning.

### Outstanding concerns

Pre-existing worktree changes in `tools-ki`, `kit-legal`, and `kit-principal` remain outside this work.

### Post-change review

Repeat an estate review only from a newly frozen registry snapshot when there is a specific reason to assess it.

### Mini recap

The transient review exposed four missing local source mappings and two bounded authoring repairs; all have now been resolved without an estate-wide write.

## Discussion

### Conform is evidence gathering

Conform is not a permission slip for bulk rewriting. Its value here is an inspectable proposal whose dry-run evidence can be compared before any repository is separately selected for change.
