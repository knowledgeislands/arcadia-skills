---
id: KI-HARNESS-RTP-012
area: RTP
title: Define remote agent substrate
theme: runtime-portability
horizon: soon
status: draft
blocks: [KI-HARNESS-RTP-010]
blocked_by: []
baseline_ref: null
---

# Define Remote Agent Substrate

## Goal

Define a portable execution model in which autonomous agents can run independently with small, reproducible footprints and return evidence-backed repository changes.

## Context

Same-filesystem worktrees are useful local isolation but need not be the portable coordination model. A deployed agent can own an independent filesystem and fresh repository clone while the selected change manager, Git remote, and review boundary coordinate work. Local installation, credentials, capability projection, recovery, and result integration therefore need explicit contracts.

## Boundary

Do not select a provider, provision infrastructure, incur spend, move secrets into repository or dotfiles state, or imply that an agent runtime, orchestration cockpit, and execution sandbox are the same layer.

## Shaping

Specify the minimum topology: authoritative change record, persistent agent or controller, isolated task environment, fresh checkout and branch, pinned bootstrap profile, runtime-injected credentials, health check, bounded network policy, commit and push boundary, review evidence, cleanup, and recovery. Treat a worktree as one same-host checkout adapter and an independent clone as the remote equivalent.

## Discussion

### Candidate layers

[Fly.io agent infrastructure](https://fly.io/ai-agents/) presents Machines as persistent agent homes and Sprites as isolated, checkpointable execution environments. [Grok Bot](https://x.ai/bot) presents managed always-on teammates with their own computers and multi-bot hand-offs, while [Grok Build](https://github.com/xai-org/grok-build) is an open-source coding-agent harness and TUI. These should be compared by layer rather than treated as interchangeable products.

### Bootstrap profile

Extract only the portable agent subset of the current dotfiles work: pinned KI CLI and harness, agent runtimes, Git and shell prerequisites, XDG configuration shape, repository bootstrap, and readiness diagnostics. Keep personal workstation preferences and secrets outside the profile.

### Coordination and conflict

Define claim or lease evidence, immutable input baseline, optimistic concurrency, branch and integration rules, heartbeat or last-update semantics, and abandonment recovery. Independent filesystems remove local path contention but do not remove competing Git or change-record writes.

### Evaluation route

Use this contract to shape provider proofs including `KI-HARNESS-RTP-010`. Keep the personal-server terminal continuity in `KI-HARNESS-RTP-004` separate from unattended agent execution.
