---
id: KI-HARNESS-RTP-004
title: Evaluate remote agent sessions
area: RTP
theme: runtime-portability
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Decide how to run durable agent terminals on a personal server and reach them comfortably through the current Zed-centred workflow.

## Context

Zed is already the effective local client and its remote-session experience is valuable. The remaining question is how the remote terminals and agent processes should run on the server: whether Zed's supported remote workflow is sufficient, whether Herdr adds useful session orchestration, and whether Mosh improves connection continuity. Pi is not part of the current evaluation.

## Boundary

Do not replace the working Zed setup, expose an unauthenticated remote service, or add installation instructions and compatibility claims before a supported server-side boundary is proven. Keep transport continuity, terminal persistence, and agent orchestration distinct.

## Shaping

### Intended approach

Describe the target workflow first: start or resume a long-lived agent terminal on the server, survive a client disconnect where the chosen layer supports it, reconnect from Zed, and retain a clear repository and session identity. Establish the simplest supported Zed-only baseline, then compare Herdr and Mosh only for gaps the baseline demonstrates.

### Known dependencies

The review needs primary documentation for Zed remote development, Herdr, and Mosh, plus a bounded hands-on proof against the intended server. Authentication, network exposure, repository access, terminal ownership, and recovery behaviour must be explicit before adoption.

### Decisions still needed

Identify the server operating environment and access path, the required disconnect and reconnection behaviour, and whether the desired durable unit is a terminal, an agent process, or a named higher-level session. Decide what Herdr or Mosh would replace or complement rather than layering both by default.

### Promotion conditions

Promote when the server target, named session workflow, security boundary, baseline proof, and acceptance criteria for any additional layer are concrete enough to plan.

## Discussion

### Evaluation boundary

The review should distinguish editor, agent runtime, orchestration, and remote-session capabilities so superficial feature overlap does not become a compatibility claim.

### Questions to answer

Assess each candidate against server-hosted repository work, agent supervision, durable session handoff, remote terminal continuity, and compatibility with the current `ki`-centred Harness. State which gap a candidate improves, leaves unchanged, or cannot support from its documented interface.

### Evidence and comparison

Use primary documentation and a small hands-on proof only when a candidate exposes a plausible integration boundary. Compare local-first operation, filesystem and Git access, authentication and data egress, extension or automation surface, remote-session model, and whether the capability is portable or runtime-vendor-specific. Do not score a product by feature count or infer an integration from adjacent capability.

### Decision outputs

The review may conclude that Zed alone is sufficient, or adopt, monitor, or reject Herdr or Mosh for a specific demonstrated gap. An adoption needs a supported configuration boundary, verification path, and an explicit statement of what existing layer it replaces or complements; monitoring retains a primary source and a named change trigger rather than an open-ended watch list.
