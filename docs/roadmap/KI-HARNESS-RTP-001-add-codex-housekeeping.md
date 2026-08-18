---
id: KI-HARNESS-RTP-001
title: Add Codex housekeeping
area: RTP
theme: runtime-portability
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 081922e8bf0651dfa44f8995df414c23a8b1ab29
---

## Goal

Add safe, repository-scoped Codex session housekeeping through the official Codex interfaces.

## Context

Create `ki-housekeeping-codex` as runtime-bound governance complementary to `ki-housekeeping-claude`. The portable `ki-work-housekeeping` skill continues to own recurring repository-maintenance templates; this item owns explicit cleanup of Codex runtime sessions and never creates scheduled work.

## Boundary

Do not infer ownership from undocumented caches, expose transcript content, silently delete sessions, or turn a Codex-specific operation into portable housekeeping policy. Retention configuration, archive-only tidying, memory cleanup, and other Codex state classes remain outside the first delivery.

## Current state

The return condition was met on 2026-08-17 and rechecked against the official Codex documentation on 2026-08-18. The stable CLI supports permanent deletion of one saved session by ID or name. The experimental app-server exposes paginated `thread/list` with exact `cwd` filtering for active and archived threads, experimental `ancestorThreadId` filtering for complete descendant inventory, and `thread/delete`, which permanently removes a persisted root and all spawned descendants.

Because complete pre-delete impact review needs the experimental descendant filter, the first delivery isolates app-server behind one version-negotiated adapter, opts into `experimentalApi`, validates every used request and response shape, and fails closed when the installed runtime does not match the tested contract. The stable CLI remains the documented one-session manual fallback; it is not used as a machine-readable inventory or forced bulk-deletion interface.

The first delivery is explicit cleanup, not automated retention. AUDIT enumerates active and archived sessions whose exact `cwd` matches the selected physical repository, returns identity and deletion-impact metadata without turns or items, and performs no mutation. CONFORM consumes a reviewed selection of exact thread IDs, re-lists immediately before deletion, refuses identity or descendant drift, and deletes only the unchanged selection.

## Steps

- [x] Add the runtime-bound `ki-housekeeping-codex` governance skill under the environment group with explicit AUDIT, CONFORM, EDUCATE, REFRESH, and HELP modes and no default destructive action.
- [x] Add one deterministic app-server adapter that starts a local stdio server, performs initialization with `experimentalApi`, records the installed Codex version, validates every used method and result shape, and exposes only repository-scoped inventory and reviewed selected deletion operations.
- [x] Resolve the selected physical repository and pass its exact canonical path to both active and archived `thread/list` queries; treat worktrees as distinct working directories and exclude missing, null, parent, child, and symlink-alias matches.
- [x] Make AUDIT page active and archived root results separately, then page `ancestorThreadId` results for every candidate; output a review artifact containing the root ID, exact working directory, archive state, creation/update evidence, complete descendant IDs, installed version, and protocol fingerprint without preview, turns, items, or transcript content.
- [x] Make CONFORM accept only that reviewed artifact and an explicit selection of root IDs, re-list every root and descendant immediately before mutation, reject version, identity, working-directory, archive-state, or descendant drift before any delete, and call `thread/delete` once per unchanged selected root.
- [x] Add focused protocol and safety fixtures, `ki-skills` publication tests, catalogue publication, skills-by-outcome guidance, and a tracked official-source refresh contract.
- [x] Declare the new skill in the Harness configuration but keep Codex housekeeping optional in `ki-repo` runtime coverage until separate rollout evidence justifies making an experimental binding mandatory across the estate.

## Files touched

- `.ki-config.toml`
- `skills/environment/ki-housekeeping-codex/SKILL.md`
- `skills/environment/ki-housekeeping-codex/references/mode-audit.md`
- `skills/environment/ki-housekeeping-codex/references/mode-conform.md`
- `skills/environment/ki-housekeeping-codex/references/mode-refresh.md`
- `skills/environment/ki-housekeeping-codex/references/rubric.md`
- `skills/environment/ki-housekeeping-codex/references/sources.md`
- `skills/environment/ki-housekeeping-codex/references/standards-codex-state.md`
- `skills/environment/ki-housekeeping-codex/scripts/app-server.ts`
- `skills/environment/ki-housekeeping-codex/scripts/app-server.test.ts`
- `skills/environment/ki-housekeeping-codex/scripts/rubric/`
- `skills/keystone/ki-repo/references/standards-configuration.md`
- `skills/README.md`
- `docs/guides/skills-by-outcome.md`
- `docs/roadmap/KI-HARNESS-RTP-001-add-codex-housekeeping.md`

## Verify

- Focused fixtures prove app-server initialization and experimental-capability refusal, pagination, exact working-directory matching, separate worktree identity, active and archived inventory, descendant disclosure, version and protocol mismatch, stale-selection refusal, atomic pre-delete validation, and selected deletion.
- AUDIT performs no deletion and reveals no transcript content.
- CONFORM refuses unreviewed, stale, missing, cross-repository, protocol-incompatible, descendant-drifted, or ambiguous candidates without partially deleting the selection.
- The installed Codex CLI's one-session deletion remains a documented manual fallback and is not invoked by the adapter or through forced bulk deletion.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The required official identity and deletion surfaces are documented, but the machine-readable binding and descendant filter are experimental. The first delivery therefore depends on a version-negotiated app-server wrapper and tracked source refresh; it does not depend on unsupported retention inspection or on making the capability mandatory across the estate. This item blocks no other roadmap work.

## Documentation impact

### Decision Records

No new decision is expected. The first delivery is explicitly opt-in; making Codex housekeeping mandatory runtime coverage or defining cross-runtime retention requires separately reviewed follow-up work.

### Specifications

No product Specification change is planned.

### Guides

Document the supported Codex surface, selected-repository matching rule, review requirement, deletion consequences, and the difference between retention configuration and explicit cleanup. Do not document cache paths or unsupported recovery guarantees.

### Roadmap

Keep mandatory estate rollout, unsupported retention automation, and additional Codex state classes as explicit follow-up work rather than widening this delivery.

## Review

### Delivered

Implemented opt-in repository-scoped Codex housekeeping from baseline `081922e8bf0651dfa44f8995df414c23a8b1ab29`, with resulting implementation evidence in `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8`. Verification used fake protocol clients only; no live Codex session was deleted.

### Summary of changes

Added the `ki-housekeeping-codex` governance skill, official-source and operating-mode references, structured rubric and publication, and a version-bound app-server adapter. Inventory pages exact active and archived repository matches plus descendants without content; deletion requires an explicit reviewed artifact and confirmation, then refuses all selection, version, protocol, repository, root, archive-state, or descendant drift before the first delete.

### Verification

All eight focused adapter and rubric tests passed, TypeScript passed, the hosted `ki-housekeeping-codex` audit passed, and formatting checks passed. The full repository suite reports one unrelated aggregate-remediation review assertion, while the authoring audit reports six pre-existing generated-anchor defects. On 2026-08-18, the user explicitly accepted both unrelated failures as review exceptions.

### Outstanding concerns

The app-server binding remains experimental and opt in; it cannot provide multi-root atomic deletion, so partial execution is reported explicitly. Mandatory estate rollout, retention automation, unsupported state classes, and the unrelated repository maintenance failures remain outside this item.

### Post-change review

The implementation meets the approved safety boundary: exact physical-repository selection, content-free review artifacts, complete descendant disclosure, and fail-closed pre-delete revalidation. Stable CLI deletion remains a documented one-session manual fallback. Focused evidence supports acceptance review without exercising destructive live behavior.

### Mini recap

Delivered opt-in Codex session inventory and reviewed deletion with strict stale-selection refusal and local fake-client coverage. No live session, peer repository, or external system was changed; unrelated repository-wide failures were accepted as exceptions.

## Discussion

### Return condition

Met on 2026-08-17 and rechecked on 2026-08-18 against official OpenAI documentation for stable `codex delete` and experimental app-server `thread/list`, `ancestorThreadId`, and `thread/delete`. The plan fixes the first delivery to explicit repository-scoped cleanup, complete descendant-impact review, atomic stale-selection refusal, and opt-in publication while the binding remains experimental.
