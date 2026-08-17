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

Zed is already the effective local client and its remote-session experience is valuable. Its current remote-development contract runs terminals, tasks, language servers, and source on a headless server reached through SSH; its daemon reconnects after a dropped connection and locally persisted unsaved changes can be restored. The remaining gap is not editor reconnection but durable ownership and visibility of long-running agent terminals.

Herdr directly targets that gap: it runs as a background server that owns terminals, supports detach and reattach over SSH, reports agent-pane state, and exposes CLI and socket APIs. Mosh improves a standalone interactive terminal across roaming and intermittent connectivity, but Zed's remote-development transport is SSH and already reconnects its daemon. Mosh is therefore an alternative terminal access path, not an additional Zed transport. Pi is not part of the current evaluation.

## Boundary

Do not replace the working Zed setup, expose an unauthenticated remote service, or add installation instructions and compatibility claims before a supported server-side boundary is proven. Keep transport continuity, terminal persistence, and agent orchestration distinct.

## Shaping

### Intended approach

Describe the target workflow first: start or resume a long-lived agent terminal on the server, survive a client disconnect, reconnect from Zed, and retain clear repository, agent, and session identity. Establish the supported Zed-only baseline, then test Herdr specifically for terminal and process persistence plus blocked or idle visibility. Evaluate Mosh only if a separate non-Zed terminal workflow is required.

### Known dependencies

Primary documentation establishes the architectural split: Zed owns the editor-side SSH remote daemon and reconnect behaviour; Herdr can own persistent terminals and agent status on the server; Mosh can own a separate roaming terminal connection. A bounded hands-on proof against the intended server remains necessary. Authentication, network exposure, repository access, terminal ownership, and recovery behaviour must be explicit before adoption.

### Decisions still needed

Identify the server operating system, repository root, SSH access path, and whether Herdr should run as a user service or only within an interactive login. Define the required disconnect duration, restart behaviour, agent-state visibility, and recovery test. The desired durable unit is a Herdr-owned terminal containing an agent process; Zed remains the editor and connection entry point. Mosh remains out of the first proof unless an independent terminal client is required.

### Promotion conditions

Promote when the server target and access path are named, the Zed-only baseline is observed, and the Herdr proof has pass or fail criteria for detach and reattach, dropped SSH, server-side process survival, blocked or idle state, repository identity, and restart recovery.

## Discussion

### Evaluation boundary

The review should distinguish editor, agent runtime, orchestration, and remote-session capabilities so superficial feature overlap does not become a compatibility claim.

### Questions to answer

Assess each candidate against server-hosted repository work, agent supervision, durable session handoff, remote terminal continuity, and compatibility with the current `ki`-centred Harness. State which gap a candidate improves, leaves unchanged, or cannot support from its documented interface.

### Evidence and comparison

Use [Zed remote-development documentation](https://zed.dev/docs/remote-development), [Herdr's primary repository](https://github.com/herdrdev/herdr), and [Mosh documentation](https://mosh.org/) for the supported interface baseline. Compare local-first operation, filesystem and Git access, authentication and data egress, extension or automation surface, remote-session model, and whether the capability is portable or runtime-vendor-specific. Do not score a product by feature count or infer an integration from adjacent capability.

### Decision outputs

The review may conclude that Zed alone is sufficient, or adopt, monitor, or reject Herdr or Mosh for a specific demonstrated gap. An adoption needs a supported configuration boundary, verification path, and an explicit statement of what existing layer it replaces or complements; monitoring retains a primary source and a named change trigger rather than an open-ended watch list.
