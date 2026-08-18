---
id: KI-HARNESS-RTP-001
title: Add Codex housekeeping
area: RTP
theme: runtime-portability
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Add safe, repository-scoped Codex session housekeeping through the official Codex interfaces.

## Context

Create `ki-housekeeping-codex` as the Codex runtime counterpart to `ki-housekeeping-claude`. The portable `ki-work-housekeeping` skill continues to own recurring repository-maintenance templates; this item owns explicit cleanup of Codex runtime sessions and never creates scheduled work.

## Boundary

Do not infer ownership from undocumented caches, expose transcript content, silently delete sessions, or turn a Codex-specific operation into portable housekeeping policy. Retention configuration, archive-only tidying, memory cleanup, and other Codex state classes remain outside the first delivery.

## Current state

The return condition was met on 2026-08-17. The official Codex command reference describes stable `codex delete` support for one named or identified saved session. The official app-server contract exposes exact working-directory filtering through `thread/list` and permanent identity-based deletion through `thread/delete`; deletion also removes spawned descendants. App-server remains an experimental Codex surface, so the skill must isolate that binding behind one small script and fail closed when the installed protocol does not match the tested contract.

The first delivery is explicit cleanup, not automated retention. AUDIT enumerates active and archived sessions whose exact `cwd` matches the selected physical repository, returns identity and deletion-impact metadata without turns or items, and performs no mutation. CONFORM consumes a reviewed selection of exact thread IDs, re-lists immediately before deletion, refuses identity or descendant drift, and deletes only the unchanged selection. The stable CLI remains the documented manual fallback for one session; it is not a machine-readable inventory API.

## Steps

- [ ] Add the runtime-bound `ki-housekeeping-codex` process skill with explicit AUDIT, CONFORM, HELP, and no default destructive action.
- [ ] Add one deterministic script that starts or connects to app-server, performs the required handshake, validates the supported method and result shape, and exposes only repository-scoped inventory and selected deletion operations.
- [ ] Resolve the selected physical repository and pass its exact canonical path to both active and archived `thread/list` queries; treat worktrees as distinct working directories and exclude missing, null, parent, child, and symlink-alias matches.
- [ ] Make AUDIT output a review artifact containing each thread ID, exact working directory, active or archived state, creation/update evidence available from the contract, and complete spawned-descendant IDs without turn or item content.
- [ ] Make CONFORM accept only that reviewed artifact, re-read every selected root and descendant immediately before mutation, reject drift or ambiguity atomically, and call `thread/delete` once per unchanged selected root.
- [ ] Add focused protocol fixtures, catalogue publication, skills-by-outcome guidance, and a source list that tracks the experimental app-server contract.

## Files touched

- `skills/change-management/ki-housekeeping-codex/`
- Focused protocol and safety fixtures under that skill root
- Generated skill catalogue and rubric publication
- `docs/guides/skills-by-outcome.md`
- This work item

## Verify

- Focused fixtures prove app-server handshake and capability refusal, exact working-directory matching, separate worktree identity, active and archived inventory, descendant disclosure, stale-selection refusal, and selected deletion.
- AUDIT performs no deletion and reveals no transcript content.
- CONFORM refuses unreviewed, stale, missing, cross-repository, protocol-incompatible, descendant-drifted, or ambiguous candidates without partially deleting the selection.
- The installed Codex CLI's one-session deletion remains a documented manual fallback and is not invoked through forced bulk deletion.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The required official identity and deletion surfaces are documented, but the machine-readable inventory and deletion binding is experimental. The first delivery therefore depends on a version-negotiated app-server wrapper and a tracked source refresh; it does not depend on unsupported retention inspection. This item blocks no other roadmap work.

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

Met on 2026-08-17 by the official working-directory-filtered thread inventory and supported session-deletion contracts. The plan now fixes the first delivery to explicit repository-scoped cleanup and records the app-server maturity risk; human review is still required before any Ready transition.
