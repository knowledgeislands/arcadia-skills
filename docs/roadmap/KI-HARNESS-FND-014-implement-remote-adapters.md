---
id: KI-HARNESS-FND-014
area: FND
title: Implement remote adapters
theme: foundation-tooling
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let the shared change-management lifecycle operate authorised GitHub Issues and Linear records rather than stopping at their configuration and standards.

## Context

The selector and both remote adapter standards now define identity, authority, conflict, and closure semantics, but the process skills have no authorised remote execution path. Repositories using their native issue tracker therefore cannot yet use the common lifecycle commands end to end.

The completed Harness effectiveness review also confirmed that `ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` correctly refuse remote execution rather than falling back to local paths. This item is their single implementation route: the host must provide one selected-adapter resolver and explicit remote operation evidence before any of those processes can execute a remote record.

## Boundary

Do not introduce a parallel local tracker, synchronisation layer, or unauthorised remote writes. Repository-roadmap and KB Streams adapters remain their own local implementations. Do not add process-specific remote fallbacks or duplicate adapter resolvers.

## Discussion

### Execution boundary

Resolve the configured adapter at runtime and require explicit authority for each remote mutation. Preserve the remote system's native identifier and lifecycle evidence.

### Process consumers

Extend the selected-adapter execution contract to `ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` as one owner-selected capability. Each process must preserve its existing authority boundary: selection does not grant planning, planning does not grant implementation, implementation does not grant acceptance, and remote execution must fail closed whenever the host lacks proven operation, identity, concurrency, or review evidence.
