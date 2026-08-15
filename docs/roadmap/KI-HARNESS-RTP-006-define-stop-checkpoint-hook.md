---
id: KI-HARNESS-RTP-006
title: Define Stop checkpoint hook
area: RTP
theme: runtime-portability
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Define an opt-in, runtime-specific Stop-hook capability that can safely preserve or surface a compact portable checkpoint when a session ends with unfinished work.

The capability must improve resumability without treating a Stop event as proof that work is complete, a user approved a summary, or a vendor session can be resumed.

## Context

The harness currently has one Stop handler, `hooks/git-lock-check.sh`, which only removes proven-stale Git locks and exits quietly when safety cannot be established.

`ki-recap` provides a deliberate, in-context recap and grounding procedure. The portable checkpoint record and lifecycle it builds on are already delivered by the `ki-checkpoint` capability.

A Stop event may fire repeatedly, after an interruption, or at a runtime-specific boundary whose meaning does not establish that the user has finished the thread.

Claude Code and Codex expose Stop events, but their hook payloads and executable environments are not a shared portability contract.

## Boundary

Do not make a Stop hook generate or control model commentary, final handoffs, reasoning, or the amount of tool output shown in a conversation.

Do not make a shared shell hook, mutate global runtime settings, create a checkpoint without explicit opt-in and a defined checkpoint contract, infer acceptance or completion, or expose a vendor-session identifier as portable state.

Do not fold response-verbosity preferences into the checkpoint hook; that is a separate user, repository, and session-precedence concern.

## Current state

The existing Git-lock guard is a fail-safe, non-interactive recovery hook and has no checkpoint or recap behaviour.

The portable checkpoint schema and lifecycle exist in `ki-checkpoint`. What is missing is the selected-checkpoint marker, the Stop-event contract, the runtime-adapter implementation, and fixture coverage for this capability.

The approved delivery boundary is opt-in only: an adapter may address an already-selected valid checkpoint only when its native event contract proves the action safe, and it must no-op on uncertainty. Unsupported or insufficiently evidenced runtimes remain explicitly unsupported rather than acquiring a shared fallback.

The first delivery is reminder-only. A Stop adapter may report that one already-selected valid checkpoint needs an explicit update; it does not create or mutate checkpoint content. Before any adapter implementation, a contained fresh-agent reconstruction trial must show that the existing portable checkpoint can restore the named task, constraints, current state, and next action without transcript or vendor-session access. A failed trial stops hook work and routes a checkpoint-contract follow-up.

## Steps

- [ ] Run one contained fresh-agent reconstruction trial against a representative valid checkpoint, recording whether task, constraints, current state, and next action can be recovered without transcript or vendor-session access; stop and route a checkpoint-contract follow-up if it fails.
- [ ] Inventory Claude Code and Codex Stop-event contracts independently, including payload identity, repeated invocation, cancellation or interruption semantics, timeout and exit behaviour, and writable-state boundaries; retain primary-source evidence for every claimed capability and omit an unsupported adapter.
- [ ] Define the opt-in configuration, selected-checkpoint rule, and reminder-only action contract; do nothing when repository identity, active-thread selection, checkpoint validity, or event safety is uncertain.
- [ ] Define the relationship to `ki-recap` and portable checkpoints: recap remains the judgment-led durable summary, while the hook may only use an already-selected active record and must never fabricate decisions, work status, or prose from a transcript.
- [ ] Implement each isolated reminder adapter only after its native event contract is verified; keep shared checkpoint validation runtime-neutral and do not assume a Claude executable works in Codex.
- [ ] Make successful execution quiet by default and failure actionable but compact; document that response verbosity belongs to a separate precedence-aware policy, not hook output filtering.
- [ ] Add fixture-backed tests for absent opt-in, unknown repository, no selected checkpoint, repeated Stop events, interrupted work, malformed records, a safe no-op, and each supported adapter's native invocation.

## Files touched

- `hooks/` and its runtime-specific registration guidance
- `skills/change-management/ki-recap/`
- The `ki-checkpoint` portable checkpoint capability
- Runtime-specific environment adapters and their tests
- `docs/decisions/` if the event or ownership model needs a durable decision
- This roadmap item and any receiver-owned implementation record

## Verify

- The fresh-agent trial either proves reconstruction of task, constraints, current state, and next action or stops adapter delivery with a named checkpoint follow-up.
- Primary-source evidence identifies the native Stop semantics and hook environment for every supported adapter; unsupported runtimes produce no adapter.
- Focused fixture tests prove that uncertain state produces no write, repeated Stop events remain idempotent, and only an explicitly selected valid checkpoint can be addressed.
- The native adapter tests prove a compact success result and actionable failure result without emitting routine transcript, test, or progress detail.
- `ki repo audit --skill ki-skills --repo .`, the relevant focused tests, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The portable record, lifecycle, and authority boundaries a hook needs are established by `ki-checkpoint`, but its effectiveness review records no fresh-agent reconstruction outcome. That trial is the first delivery gate. Primary-source event evidence is the second: an adapter without it is omitted, while independently evidenced reminder adapters may proceed.

The runtime-portability decision and runtime adapters define event-specific evidence; `ki-recap` retains its explicit in-session judgment and grounding role.

## Documentation impact

### Decision Records

An implementation decision record is needed only if primary-source runtime evidence supports an opt-in Stop-hook adapter.

### Specifications

The portable checkpoint contract remains unchanged; this work evaluates only a runtime-specific reminder adapter.

### Guides

Any supported opt-in hook requires concise runtime-specific setup guidance; no universal contributor workflow is assumed.

### Roadmap

The fresh-agent reconstruction trial and any runtime-adapter delivery remain explicit follow-on work.

## Discussion

### Stop is not completion

A Stop event can be useful as a narrow session-boundary signal, but it cannot establish whether the user is finished, whether an agent result is correct, or whether durable records have been updated.

The safe default is therefore no-op on uncertainty, not an invented checkpoint or a noisy warning.

### First-delivery authority

Reminder-only keeps Stop handling outside checkpoint mutation authority and is independently reversible. A later proposal may consider one bounded checkpoint update only after outcome evidence and a separately approved authority contract; it is not latent scope in this item.

### Output and response policy

The immediate noise problem is largely raw command output and over-detailed agent updates, not the existing hook implementation.

Routine verification should use compact reporters and expose detailed logs only on failure or explicit request.

The broader policy should support user-wide, repository, and per-session overrides such as quiet, standard, and detailed, with the more specific declared preference taking precedence.

A Stop hook may keep its own success output quiet, but it cannot reliably constrain an LLM's reasoning updates or final response; that policy needs its own portable configuration and capability rather than an event-hook workaround.
