---
id: KI-HARNESS-RTP-005
title: Define portable resume checkpoints across agent runtimes
theme: runtime-portability
horizon: soon
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a user resume one named active thread in any supported agent environment from a concise, repository-owned checkpoint rather than a vendor-specific conversation transcript.

## Context

`kit-legal` demonstrates the value of live resume checkpoints under `+/_RESUME/`: one high-signal, continuously overwritten snapshot per active human-named thread. Its checkpoint contains the objective, current state, decisions, touched files, open questions, and one immediate next step; Git holds its history.

The existing practice is tied to Claude Desktop and Claude Code orientation, and retains legacy timestamped nested checkpoints beside the newer flat per-thread layout. A portable capability can preserve the proven checkpoint model while allowing Codex, Zed, VS Code, and other runtimes to discover and use the same repository artifact without claiming to reopen a private vendor session.

## Boundary

Do not create a shared transcript store, synchronise vendor session state, reopen a session in another runtime, or treat a checkpoint as a substitute for durable decisions, roadmap records, knowledge, or session recap. Do not retain Legal's legacy nested timestamp layout as a permanent compatibility surface.

## Shaping

### Intended approach

Define a portable `ki-resume` capability that owns a repository-local `+/_RESUME/` checkpoint contract: one active record per human-readable `thread`, required snapshot fields, in-place update semantics, active/retired lifecycle, and a clear boundary from `ki-recap`, activity logs, and runtime memory.

Make the checkpoint the canonical cross-runtime handoff artifact. A runtime adapter may discover a matching checkpoint and render a fresh resume prompt or user interface, but it must not define the checkpoint semantics or imply vendor-session continuity. The generic `+` working area remains with `ki-repo`; `ki-resume` owns only its optional `_RESUME` subdirectory, records, and scaffold when declared.

### Known dependencies

`ki-repo` owns the generic working-area contract. `ki-recap` owns session-end recap and compaction boundaries. `ki-tokenomics` and its runtime adapters own context-cost and runtime-evidence boundaries. `ki-handoffs` is unrelated: it governs proposals between repositories, whereas a resume checkpoint is local state for one active thread.

The Legal checkpoint conventions and their Session Threads dashboard are primary practice evidence. Any migration must inventory and deliberately convert or retire the legacy nested timestamped records and stale orientation, rather than supporting two canonical layouts.

### Decisions still needed

Decide the portable checkpoint frontmatter and body schema, including whether `priority` is portable or base-specific; the retirement and stale-check policy; whether the process capability should offer explicit checkpoint/resume/retire operations or provide only governed guidance; and the minimal runtime-adapter discovery contract.

Decide whether the capability belongs in the standard compatible payload by default or is an opt-in repository skill. Confirm which runtimes have a safe, documented way to surface a repository checkpoint before promising a native integration.

### Promotion conditions

Promote when the portable schema, ownership split, lifecycle and migration policy, exact checker scope, and at least one runtime-neutral resume flow are reviewable. Runtime-specific adapters require their own documented discovery evidence and must remain independently optional.

## Discussion

### Cross-runtime boundary

The portable unit is a distilled reconstruction prompt, not the original conversation. It must be useful to a fresh agent with no transcript access and must not expose or depend on an opaque runtime session identifier. A human-readable thread name provides the durable lookup key; the repository checkpoint provides the state.

### Lifecycle and durable knowledge

An active checkpoint is overwritten in place while the thread is live, then retired after durable facts and work have reached their proper owners. Its presence may signal an active thread, but it must not become a second roadmap, decision log, or memory system. Git history supplies checkpoint history without accumulating session logs in the active record.

### Migration evidence

Legal's flat checkpoint convention is a useful starting point, but the coexistence of stale nested-layout guidance and old timestamped records demonstrates why migration must be a first-class part of the contract. The portable result should have one current layout and an explicit, recoverable conversion or retirement path.
