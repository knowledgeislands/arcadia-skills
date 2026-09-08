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

Define a portable execution contract in which autonomous agents can run independently with small, reproducible footprints and return evidence-backed repository changes.

## Context

Same-filesystem worktrees are useful local isolation but need not be the portable coordination model. A deployed agent should own an independent filesystem and fresh repository clone while the selected change manager, Git remote, and review boundary coordinate work. Local installation, credentials, capability projection, recovery, and result integration therefore need explicit executable contracts.

`TECHNE-GOV-005` is accountable for the isolated-agent-execution principle, layer taxonomy, technology landscape, and cross-repository coherence. This item consumes that model to define reusable sandbox capability semantics and conformance tests. `DOTFILES-UE-020` retains the residual implementation of Cheztoi as one personal bootstrap profile.

## Boundary

Do not redefine the Techne engineering model, become the authoritative provider-comparison record, select a provider, provision infrastructure, incur spend, move secrets into repository or dotfiles state, or imply that an agent runtime, orchestration cockpit, and execution sandbox are the same layer.

## Shaping

Specify the minimum topology received from Techne as executable capabilities: authoritative change record, persistent agent controller, isolated task environment, fresh checkout and branch, pinned bootstrap profile, runtime-injected credentials, health check, bounded network policy, commit and push boundary, review evidence, cleanup, and recovery. Treat a worktree as one same-host checkout adapter and an independent clone as the remote equivalent.

Define a small provider-neutral lifecycle covering create, inspect, execute, transfer, checkpoint, suspend, resume, destroy, and evidence collection. Express required capabilities and policy independently from provider configuration so an adapter may use containers, hardened containers, or microVMs without changing the task contract.

Use the open artifact boundaries selected by Techne: Dev Container configuration for the development environment, OCI images for distribution, Git references for source and results, and ordinary manifests and logs for evidence. Provider snapshots may accelerate startup but must never be the only authoritative copy of state.

Require a conformance proof that the same bootstrap profile can create a fresh clone, pass its health check, execute a bounded task, emit review evidence, and clean up on at least two materially independent adapters. The first proof may be local; the second should detect hidden vendor assumptions before provider selection.

## Discussion

### Upstream engineering model

`TECHNE-GOV-005` owns the durable technique, comparison of Agent Sandbox, Docker Sandboxes, Cheztoi, Dev Container, OCI, and provider candidates, and the recommended proving sequence. This item should reference that analysis rather than duplicate it. Changes in provider evidence should return to Techne when they affect the engineering model and remain local here when they affect only the executable contract or adapter conformance.

### Bootstrap profile

Accept the portable agent subset defined by Techne: pinned KI CLI and harness, agent runtimes, Git and shell prerequisites, XDG configuration shape, repository bootstrap, state classes, and readiness diagnostics. Keep personal workstation preferences and secrets outside the profile.

The harness owns the profile capability schema and conformance tests; dotfiles owns the Cheztoi instance and source-to-artifact projection. A provider-neutral implementation may begin in `tools-ki`, while a dedicated tool or repository should wait until more than one adapter proves the abstraction.

### Authority and security

The persistent controller should own session identity, policy, credential brokerage, and result integration. A sandbox receives only scoped, short-lived credentials and bounded egress needed for its task. Where practical, model and repository credentials remain in the controller or a proxy rather than being written into the sandbox filesystem.

Classify sandbox state as ephemeral task data, reconstructible cache, or explicitly persistent data. Git commits, patches, canonical work records, manifests, and review evidence remain the recovery and hand-off boundary; provider snapshots remain disposable optimisations.

### Coordination and conflict

Define claim and lease evidence, immutable input baseline, optimistic concurrency, branch integration rules, heartbeat and last-update semantics, and abandonment recovery. Independent filesystems remove local path contention but do not remove competing Git or change-record writes.

### Evaluation route

Implement the proving sequence and evaluation criteria governed by `TECHNE-GOV-005`, including provider proofs already represented by `KI-HARNESS-RTP-010`. Keep personal-server terminal continuity in `KI-HARNESS-RTP-004` separate from unattended agent execution.
