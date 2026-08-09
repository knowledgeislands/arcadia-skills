---
id: KI-HARNESS-FND-014
area: FND
title: Implement remote adapters
theme: foundation-tooling
horizon: future
status: draft
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let the shared change-management lifecycle operate authorised GitHub Issues and Linear records rather than stopping at their configuration and standards.

## Context

The selector and both remote adapter standards now define identity, authority, conflict, and closure semantics, but the process skills have no authorised remote execution path. Repositories using their native issue tracker therefore cannot yet use the common lifecycle commands end to end.

## Boundary

Do not introduce a parallel local tracker, synchronisation layer, or unauthorised remote writes. Repository-roadmap and KB Streams adapters remain their own local implementations.

## Discussion

### Execution boundary

Resolve the configured adapter at runtime and require explicit authority for each remote mutation. Preserve the remote system's native identifier and lifecycle evidence.
