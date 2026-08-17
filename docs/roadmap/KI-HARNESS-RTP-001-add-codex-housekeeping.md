---
id: KI-HARNESS-RTP-001
title: Add Codex housekeeping
area: RTP
theme: runtime-portability
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Add Codex housekeeping only when an official contract makes it safe and supportable.

## Context

Create `ki-work-housekeeping-codex` only after Codex exposes an official selected-repository identity together with supported retention, cleanup, and safe-conform boundaries.

## Boundary

Do not add an empty symmetric capability or infer ownership from undocumented caches.

## Current state

The return condition was met on 2026-08-17. Codex CLI 0.147.0 provides the stable `codex delete` command for deleting a named or identified saved session, while the official app-server contract exposes canonical working-directory identity through `thread/list` and exact persisted-thread deletion through `thread/delete`.

Shape the capability around those supported surfaces. It must enumerate sessions whose canonical working directory matches the selected repository, present the exact candidates for review, and delete only confirmed thread identities. It must not infer repository ownership from cache layout, use forced bulk deletion as its normal conform path, or broaden deletion to sessions outside the selected repository.

## Steps

- [ ] Inventory the stable Codex CLI and app-server operations needed for repository-scoped session listing, retention inspection, and deletion.
- [ ] Define how the selected physical repository maps to canonical Codex working-directory identity, including worktrees, missing directories, and sessions with no working directory.
- [ ] Define AUDIT output that presents each exact candidate, its thread identity, working directory, archive state, age evidence, and descendant-session effect without exposing transcript content.
- [ ] Define CONFORM so deletion requires explicit reviewed selection, uses supported thread identities, fails closed on identity drift or ambiguity, and never treats forced bulk deletion as the normal path.
- [ ] Add the Codex housekeeping skill, focused fixtures, generated catalogue publication, and contributor-facing invocation guidance.

## Files touched

- A new `ki-work-housekeeping-codex` skill root and focused tests
- Generated skill catalogue and rubric publication
- The skills-by-outcome guide if the new invocation adds a distinct user outcome
- This work item

## Verify

- Focused fixtures prove exact working-directory matching, worktree handling, descendant disclosure, ambiguous identity refusal, and selected deletion.
- AUDIT performs no deletion and reveals no transcript content.
- CONFORM refuses unreviewed, stale, missing, cross-repository, or ambiguous candidates.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The required official Codex identity and deletion surfaces are available. Planning must confirm whether retention inspection is fully supported or whether the first delivery should scope itself to reviewable deletion of repository-matched sessions. This item blocks no other roadmap work.

## Documentation impact

### Decision Records

No new decision is expected unless planning exposes a cross-runtime retention or deletion policy that exceeds the skill-local contract.

### Specifications

No product Specification change is planned.

### Guides

Document the supported Codex surface, selected-repository matching rule, review requirement, deletion consequences, and the difference between retention configuration and explicit cleanup. Do not document cache paths or unsupported recovery guarantees.

### Roadmap

Keep any unsupported retention automation or additional Codex state classes as explicit follow-up work rather than widening this delivery.

## Discussion

### Return condition

Met on 2026-08-17 by the official working-directory-filtered thread inventory and supported session-deletion contracts. Planning must still define retention policy, review evidence, descendant-session handling, and the safe AUDIT / CONFORM boundary before the item can become Ready.
