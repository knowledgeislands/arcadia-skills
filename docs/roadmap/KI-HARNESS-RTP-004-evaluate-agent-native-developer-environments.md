---
id: KI-HARNESS-RTP-004
title: Evaluate agent-native developer environments and remote session workflows
theme: runtime-portability
horizon: future
status: draft
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Decide which agent-native developer environments or remote-session workflows genuinely improve KI work.

## Context

Evaluate Zed, Herdr, and Pi as potential runtime or session-integration surfaces, with Mosh as remote-terminal context.

## Boundary

Do not add runtime configuration, installation instructions, or compatibility claims until a target exposes a precise, supportable integration boundary.

## Discussion

### Evaluation boundary

The review should distinguish editor, agent runtime, orchestration, and remote-session capabilities so superficial feature overlap does not become a compatibility claim.

### Questions to answer

Assess each candidate against a named workflow rather than its general popularity: local repository editing, agent supervision and delegation, durable session/context handoff, remote terminal continuity, and compatibility with the current `ki`-centred harness. State which workflow a candidate improves, leaves unchanged, or cannot support from its documented interface.

### Evidence and comparison

Use primary documentation and a small hands-on proof only when a candidate exposes a plausible integration boundary. Compare local-first operation, filesystem and Git access, authentication and data egress, extension or automation surface, remote-session model, and whether the capability is portable or runtime-vendor-specific. Do not score a product by feature count or infer an integration from adjacent capability.

### Decision outputs

The review may conclude adopt, monitor, or reject for each named workflow. An adoption needs a concrete owner, supported configuration boundary, verification path, and an explicit decision on what existing workflow it replaces; monitoring retains the source and a named change trigger rather than an open-ended watch list.
