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

Same-filesystem worktrees are useful local isolation but need not be the portable coordination model. A deployed agent should own an independent filesystem and fresh repository clone while the selected change manager, Git remote, and review boundary coordinate work. Local installation, credentials, capability projection, recovery, and result integration therefore need explicit contracts.

The substrate must sit above any personal dotfiles implementation. `DOTFILES-UE-020` in the `krisb/dotfiles` repository now treats Cheztoi as one personal bootstrap profile and projection of this contract, not as its owner.

## Boundary

Do not select a provider, provision infrastructure, incur spend, move secrets into repository or dotfiles state, or imply that an agent runtime, orchestration cockpit, and execution sandbox are the same layer.

## Shaping

Specify the minimum topology: authoritative change record, persistent agent controller, isolated task environment, fresh checkout and branch, pinned bootstrap profile, runtime-injected credentials, health check, bounded network policy, commit and push boundary, review evidence, cleanup, and recovery. Treat a worktree as one same-host checkout adapter and an independent clone as the remote equivalent.

Define a small provider-neutral lifecycle covering create, inspect, execute, transfer, checkpoint, suspend, resume, destroy, and evidence collection. Express required capabilities and policy independently from provider configuration so an adapter may use containers, hardened containers, or microVMs without changing the task contract.

Use open artifacts at the portability boundary: Dev Container configuration for the development environment, OCI images for distribution, Git references for source and results, and ordinary manifests and logs for evidence. Provider snapshots may accelerate startup but must never be the only authoritative copy of state.

Require a conformance proof that the same bootstrap profile can create a fresh clone, pass its health check, execute a bounded task, emit review evidence, and clean up on at least two materially independent adapters. The first proof may be local; the second should detect hidden vendor assumptions before provider selection.

## Discussion

### Candidate layers

[Fly.io agent infrastructure](https://fly.io/ai-agents/) presents Machines as persistent agent homes and Sprites as isolated, checkpointable execution environments. [Grok Bot](https://x.ai/bot) presents managed always-on teammates with their own computers and multi-bot hand-offs, while [Grok Build](https://github.com/xai-org/grok-build) is an open-source coding-agent harness and TUI. These should be compared by layer rather than treated as interchangeable products.

The landscape review on 2026-09-08 found no settled single winner. The leading signals differ by layer:

- **Portable environment:** [the Development Container specification](https://github.com/devcontainers/spec/blob/main/docs/specs/devcontainer-reference.md) provides an open environment declaration and lifecycle hooks, while [Dev Container Features](https://github.com/devcontainers/spec/blob/main/docs/specs/devcontainer-features.md) provide modular OCI-distributed installation units. [The OCI Image specification](https://github.com/opencontainers/image-spec/blob/main/spec.md) supplies interoperable image packaging, not session lifecycle.
- **Emerging neutral control plane:** [Kubernetes SIG Apps Agent Sandbox](https://agent-sandbox.sigs.k8s.io/docs/) defines `Sandbox`, `SandboxTemplate`, `SandboxClaim`, and `SandboxWarmPool` APIs for stateful isolated workloads. Its v1beta1 status makes it the most important neutral API to follow, but not a mandatory first implementation.
- **Immediate local proof:** [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/) runs supported coding agents in isolated environments and its clone workflow avoids granting the sandbox direct write access to the host checkout. It is a useful first adapter, not the canonical contract.
- **Portability-oriented hosted or self-hosted proof:** [Daytona](https://github.com/daytonaio/daytona) combines an open-source control plane, OCI compatibility, persistence, snapshots, and managed, self-hosted, or bring-your-own-cloud operation. It is the strongest current second-adapter candidate when deployment portability matters.
- **Managed developer API:** [E2B](https://docs.e2b.dev/) offers a focused hosted sandbox SDK with pause, resume, and snapshot persistence. It is a strong ergonomics reference, but its provider API should remain behind an adapter.
- **Self-hosted organisational control plane:** [Coder's agent architecture](https://coder.com/docs/ai-coder/agents/architecture) separates the persistent control-plane loop from workspace compute and can keep model credentials outside the workspace. It is relevant when enterprise policy and existing infrastructure outweigh a lightweight SDK.
- **Specialised providers:** [Cloudflare Sandbox SDK](https://developers.cloudflare.com/sandbox/), [Modal Sandboxes](https://modal.com/docs/guide/sandboxes), and [Fly Sprites](https://fly.io/sprites/) are valuable adapters for edge control, elastic compute, and durable agent homes respectively, but none should define the core schema.

The recommended proving sequence is Docker Sandboxes locally, using a private clone; the same profile rendered through Dev Container and OCI artifacts; then Daytona or Kubernetes Agent Sandbox as a second implementation. E2B is the alternative when fastest hosted validation matters more than self-hosting.

### Bootstrap profile

Extract only the portable agent subset of current dotfiles work: pinned KI CLI and harness, agent runtimes, Git and shell prerequisites, XDG configuration shape, repository bootstrap, and readiness diagnostics. Keep personal workstation preferences and secrets outside the profile.

Cheztoi is the working name for that personal profile. The harness owns the profile capability schema and conformance tests; dotfiles owns one profile instance and its source-to-artifact projection. A provider-neutral implementation may begin in `tools-ki`, while a dedicated tool or repository should wait until more than one adapter proves the abstraction.

### Authority and security

The persistent controller should own session identity, policy, credential brokerage, and result integration. A sandbox receives only scoped, short-lived credentials and bounded egress needed for its task. Where practical, model and repository credentials remain in the controller or a proxy rather than being written into the sandbox filesystem.

Classify sandbox state as ephemeral task data, reconstructible cache, or explicitly persistent data. Git commits, patches, canonical work records, manifests, and review evidence remain the recovery and hand-off boundary; provider snapshots remain disposable optimisations.

### Coordination and conflict

Define claim and lease evidence, immutable input baseline, optimistic concurrency, branch integration rules, heartbeat and last-update semantics, and abandonment recovery. Independent filesystems remove local path contention but do not remove competing Git or change-record writes.

### Evaluation route

Use this contract to shape provider proofs including `KI-HARNESS-RTP-010`. Keep the personal-server terminal continuity in `KI-HARNESS-RTP-004` separate from unattended agent execution.
