---
id: KI-HARNESS-RTP-006
title: Define Stop checkpoint hook
area: RTP
theme: runtime-portability
horizon: next
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

## Steps

- [ ] Inventory the supported Stop-event contracts for each intended runtime, including payload identity, repeated invocation, cancellation or interruption semantics, timeout and exit behaviour, and writable-state boundaries; retain primary-source evidence for every claimed capability.
- [ ] Decide the opt-in configuration, selection rule, and exact action contract: a hook may emit a compact reminder or invoke one bounded checkpoint operation, but it must do nothing when repository identity, active-thread selection, or event safety is uncertain.
- [ ] Define the relationship to `ki-recap` and portable checkpoints: recap remains the judgment-led durable summary, while the hook may only use an already-selected active record and must never fabricate decisions, work status, or prose from a transcript.
- [ ] Implement isolated runtime adapters only after their event contracts are verified; keep shared checkpoint validation runtime-neutral and do not assume a Claude executable works in Codex.
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

- Primary-source evidence identifies the native Stop semantics and hook environment for every supported adapter.
- Focused fixture tests prove that uncertain state produces no write, repeated Stop events remain idempotent, and only an explicitly selected valid checkpoint can be addressed.
- The native adapter tests prove a compact success result and actionable failure result without emitting routine transcript, test, or progress detail.
- `ki repo audit --skill ki-skills --repo .`, the relevant focused tests, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The portable record, lifecycle, and authority boundaries a hook needs before it can safely select, update, or retire a checkpoint are already established by `ki-checkpoint`. Primary-source evidence is a delivery gate: an adapter without it is parked, while independently evidenced adapters may proceed.

The runtime-portability decision and runtime adapters define event-specific evidence; `ki-recap` retains its explicit in-session judgment and grounding role.

## Discussion

### Stop is not completion

A Stop event can be useful as a narrow session-boundary signal, but it cannot establish whether the user is finished, whether an agent result is correct, or whether durable records have been updated.

The safe default is therefore no-op on uncertainty, not an invented checkpoint or a noisy warning.

### Output and response policy

The immediate noise problem is largely raw command output and over-detailed agent updates, not the existing hook implementation.

Routine verification should use compact reporters and expose detailed logs only on failure or explicit request.

The broader policy should support user-wide, repository, and per-session overrides such as quiet, standard, and detailed, with the more specific declared preference taking precedence.

A Stop hook may keep its own success output quiet, but it cannot reliably constrain an LLM's reasoning updates or final response; that policy needs its own portable configuration and capability rather than an event-hook workaround.
