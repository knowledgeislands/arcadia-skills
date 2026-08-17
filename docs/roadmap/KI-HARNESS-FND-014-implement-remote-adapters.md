---
id: KI-HARNESS-FND-014
area: FND
title: Implement remote adapter execution
theme: foundation-tooling
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let the shared change-management lifecycle operate authorised GitHub Issues and Linear records rather than stopping at their configuration and standards.

## Context

The selector and both remote adapter standards define identity, authority, conflict, and closure semantics, but the process skills have no authorised remote execution path. Repositories using their native issue tracker therefore cannot yet use the common lifecycle commands end to end.

`ki-work` already selects the configured adapter and resolves its owning skill. The GitHub Issues adapter records an `owner/repository` namespace; the Linear adapter records a team prefix but not yet the workspace URL needed to locate that team unambiguously. The missing work is to turn the resolved adapter configuration into authenticated, reviewable remote reads and writes through a capability available to the current runtime.

## Boundary

Do not introduce a parallel local tracker, synchronisation layer, runtime-vendor-specific adapter contract, or unauthorised remote writes. Repository-roadmap and KB Streams adapters remain their own local implementations. Do not add process-specific fallbacks or duplicate adapter resolvers.

## Shaping

### Intended approach

Keep selection and execution separate. `ki-work` resolves the declared adapter; the owning adapter supplies its provider-native locator and lifecycle mapping; the process skill uses an available authenticated connector, CLI, or API capability to operate that remote record. If the runtime cannot prove a suitable capability, authentication, current identity, or write authority, the process stops.

Strengthen the Linear configuration with an inspectable workspace URL alongside its team locator. Retain GitHub's configured `owner/repository` namespace, from which the current Issues URL can be derived without storing a second locator. Re-read every record and its lifecycle metadata immediately before an approved mutation.

### Known dependencies

The adapter standards own provider identity, lifecycle mapping, transfer or move stops, and closure semantics. `ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` each retain their existing authority boundary and require an operation-specific result rather than generic permission to mutate the tracker.

### Decisions still needed

Define the runtime-neutral operation contract exposed by an authenticated remote capability, including read evidence, stale-read detection, conflict reporting, mutation confirmation, and the durable reference returned to the process record. Decide the minimum operation set that proves both GitHub Issues and Linear without coupling the shared process skills to either provider.

### Promotion conditions

Promote when the provider locator contract, operation result shape, capability-resolution rule, concurrency stop, and first end-to-end process slice are concrete enough to plan and verify.

## Discussion

### Execution boundary

Resolve the configured adapter at runtime, then resolve an authenticated capability that can operate its provider. Require explicit authority for each mutation and preserve the remote system's current native locator, historical aliases where relevant, and lifecycle evidence.

### Process consumers

Extend the selected-adapter execution contract to `ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` as one owner-selected capability. Each process must preserve its existing authority boundary: selection does not grant planning, planning does not grant implementation, implementation does not grant acceptance, and remote execution must fail closed whenever the host lacks proven operation, identity, concurrency, or review evidence.
