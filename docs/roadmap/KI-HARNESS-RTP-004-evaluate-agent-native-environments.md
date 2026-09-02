---
id: KI-HARNESS-RTP-004
title: Evaluate remote agent sessions
area: RTP
theme: runtime-portability
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Decide how to run durable agent terminals on a personal server and reach them comfortably through the current Zed-centred workflow.

## Context

Zed remote development keeps its UI local while running source access, terminals, tasks, and language tooling on a host reached through SSH. Its reconnect behaviour covers editor transport continuity, not ownership or supervision of a long-running terminal process. Herdr targets that separate gap with a persistent background server, named local and SSH-remote sessions, detach and reattach, terminal observation and control, agent-state reporting, and native session restoration. Mosh is an independent roaming terminal transport, not a Zed remote-development transport.

## Boundary

Do not replace the working Zed setup, expose an unauthenticated remote service, or add installation instructions and compatibility claims before a supported server-side boundary is proven. Keep editor transport continuity, terminal persistence, agent orchestration, process survival, and native agent-session restoration distinct.

## Shaping

### Intended approach

Describe the target workflow first: start or resume a long-lived agent terminal on the server, survive client disconnect, reconnect from Zed, and retain clear repository, agent, and session identity. Establish the supported Zed-only baseline, then test Herdr specifically for terminal ownership and agent status on the same SSH-reached server. Mosh remains outside the first proof unless an independent roaming terminal client is required.

### Current evidence

Zed provides local unsaved-state and recent-project recovery while its remote daemon supports reconnection to an SSH host. Herdr documents named sessions, detached persistence, remote operation over OpenSSH, observer and controller roles, agent-state reporting, and CLI or socket automation. A Herdr server restart can restore layout and terminal history but not arbitrary child processes; native Codex or Claude Code session restoration is a separate recovery path. The proof must therefore distinguish client disconnect, dropped SSH, Herdr restart, child-process survival, and native agent-session restoration.

The local Zed settings contain no named SSH connection, and the local SSH configuration contains no personal-server host. There is therefore no inspectable target on which to run the required proof yet.

### Promotion conditions

Readiness requires the server operating system, canonical repository root, SSH host or access path, and intended Herdr service mode to be named. The Zed-only baseline and exact Herdr pass or fail criteria must cover detach and reattach, dropped SSH, server-side process survival, blocked or idle state, repository identity, simultaneous observation and control, and restart recovery.

## Current state

The documented comparison and proof design are complete enough to execute once a target exists. The item is selected for current preparation, but remains Draft because no personal-server target or access path is declared locally. Installation, network exposure, and service-mode choices wait for that target.

## Steps

- [x] Separate editor transport, durable terminal ownership, agent-state visibility, and roaming terminal transport.
- [x] Refresh the supported-interface comparison from current Zed, Herdr, and Mosh primary documentation.
- [x] Select Herdr as the first bounded candidate and keep Mosh outside that proof unless an independent terminal client is required.
- [ ] Name the personal server OS, canonical repository root, SSH host or access path, and intended Herdr service mode.
- [ ] Observe the Zed-only baseline through an intentional SSH disconnect and reconnect.
- [ ] Run the Herdr proof through detach and reattach, dropped SSH, durable child-process survival, blocked or idle agent state, repository identity, and simultaneous observer versus controller behaviour.
- [ ] Restart Herdr and separately record layout restoration, terminal-process loss or survival, and native Codex session restoration.
- [ ] Record authentication, network exposure, repository permissions, data-egress boundary, recovery instructions, and an adopt, monitor, or reject decision.
- [ ] Evaluate Mosh only if the proof leaves an independent roaming-terminal gap.

## Files touched

- This evaluation record
- A focused guide or decision record only if the hands-on proof supports adoption
- No installation or service configuration before the target and exposure boundary are approved

## Verify

- The named server is reachable through the declared SSH path without adding an unauthenticated listener.
- Zed reconnect evidence distinguishes editor recovery from terminal-process ownership.
- Herdr evidence records session identity, repository identity, process identity before and after disconnect, agent state, and observer or controller role.
- Restart evidence distinguishes layout restoration, arbitrary child-process survival, and native agent-session restoration.
- Any Mosh conclusion records the separate UDP and server requirements rather than implying Zed integration.

## Dependencies / blocks

Readiness remains blocked on a named personal-server target and access path. None is declared in the locally inspectable Zed or SSH configuration.

## Documentation impact

### Decision Records

Create or amend a decision record only if the hands-on proof supports adopting a durable remote-session component.

### Specifications

No behaviour-level Harness specification changes are planned because this item evaluates an operating environment rather than a Harness capability.

### Guides

Add focused setup and recovery guidance only after a supported server, authentication, exposure, and service boundary has passed the proof.

### Roadmap

Capture any adopted implementation or unsupported capability gap as separately bounded follow-on work; an evaluation conclusion alone creates no delivery authority.

## Discussion

### Evaluation boundary

The review must distinguish editor, agent runtime, orchestration, and remote-session capabilities so superficial feature overlap does not become a compatibility claim.

### Evidence comparison

Use [Zed remote-development documentation](https://zed.dev/docs/remote-development), [Herdr's primary repository](https://github.com/herdrdev/herdr), [Herdr remote persistence documentation](https://herdr.dev/docs/persistence-remote/), [Herdr session-state documentation](https://herdr.dev/docs/session-state/), [Herdr socket API documentation](https://herdr.dev/docs/socket-api/), and [Mosh documentation](https://mosh.org/) for the supported-interface baseline. Compare local-first operation, filesystem and Git access, authentication, data egress, extension and automation surfaces, remote-session model, and whether a capability is portable or runtime-vendor-specific. Do not score a product by feature count or infer an integration from adjacent capability.

### Decision outputs

The hands-on review may conclude that Zed alone is sufficient or may adopt, monitor, or reject Herdr or Mosh for a specific demonstrated gap.
