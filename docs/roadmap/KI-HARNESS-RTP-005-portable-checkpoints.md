---
id: KI-HARNESS-RTP-005
title: Define portable checkpoints across agent runtimes
theme: runtime-portability
horizon: blocking
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a user resume one named active thread in any supported agent environment from a concise, repository-owned checkpoint rather than a vendor-specific conversation transcript.

## Context

`kit-legal` demonstrates the value of live checkpoints under `+/_RESUME/`: one high-signal, continuously overwritten snapshot per active human-named thread. Its checkpoint contains the objective, current state, decisions, touched files, open questions, and one immediate next step; Git holds its history. This item makes `+/_CHECKPOINTS/` the proposed canonical target rather than extending the existing name.

The existing practice is tied to Claude Desktop and Claude Code orientation, and retains legacy timestamped nested checkpoints beside the newer flat per-thread layout. A portable capability can preserve the proven checkpoint model while allowing Codex, Zed, VS Code, and other runtimes to discover and use the same repository artifact without claiming to reopen a private vendor session.

## Boundary

Do not create a shared transcript store, synchronise vendor session state, reopen a session in another runtime, or treat a checkpoint as a substitute for durable decisions, roadmap records, knowledge, or session recap. Do not retain Legal's legacy nested timestamp layout as a permanent compatibility surface.

## Current state

The Harness has no `ki-checkpoints` skill, checkpoint schema, owned scaffold, or runtime-adapter discovery contract. RTP-005 is shaped around the existing Legal practice, but that practice still needs an exact inventory and a deliberate migration from `+/_RESUME/` and its timestamped nested records.

## Steps

- [ ] Inventory the Legal checkpoint layouts and orientation; define a recoverable conversion or retirement path from `+/_RESUME/` and legacy timestamped nested records to one flat `+/_CHECKPOINTS/<thread>.md` layout.
- [ ] Decide and record the portable checkpoint schema, active/retired lifecycle, stale-check policy, and the boundary between checkpoints, `ki-recap`, runtime memory, and durable repository records.
- [ ] Create `ki-checkpoints` as the portable capability, owning only the optional `+/_CHECKPOINTS/` scaffold, record contract, and checker; preserve `ki-repo` ownership of the generic `+` working area.
- [ ] Define the runtime-adapter discovery boundary and at least one runtime-neutral resume flow without claiming vendor-session continuity or requiring a runtime-specific adapter.
- [ ] Add focused fixtures and documentation for thread identity, in-place updates, retirement, stale records, migration, and invalid or vendor-session-dependent checkpoint data.

## Files touched

- `skills/process/ki-checkpoints/`
- `skills/keystone/ki-repo/`
- `docs/decisions/` when the portable schema or ownership boundary requires a durable decision
- Colocated checker, rubric, and fixture tests
- This roadmap item and any receiving repository migration record

## Verify

- Focused `ki-checkpoints` checker and rubric tests
- `ki dev skill rubric ki-checkpoints --write`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Fixture-backed verification proves that one active checkpoint is selected by thread name, updates remain in place, retired records are not treated as active, and no checkpoint can imply access to a vendor session.

## Dependencies / blocks

`ki-repo` owns the generic working-area contract. `ki-recap` owns session-end recap and compaction boundaries. `ki-tokenomics` and its runtime adapters own context-cost and runtime-evidence boundaries. Cross-repository trades are unrelated: they govern proposals between repositories, whereas a checkpoint is local state for one active thread.

This item blocks any claim of a standard `ki-checkpoints` capability or runtime-specific checkpoint adapter until the portable schema, ownership split, lifecycle and migration policy, exact checker scope, and at least one runtime-neutral resume flow are reviewable. Runtime-specific adapters remain independently optional.

## Discussion

### Cross-runtime boundary

The portable unit is a distilled reconstruction prompt, not the original conversation. It must be useful to a fresh agent with no transcript access and must not expose or depend on an opaque runtime session identifier. A human-readable thread name provides the durable lookup key; the repository checkpoint provides the state.

### Lifecycle and durable knowledge

An active checkpoint is overwritten in place while the thread is live, then retired after durable facts and work have reached their proper owners. Its presence may signal an active thread, but it must not become a second roadmap, decision log, or memory system. Git history supplies checkpoint history without accumulating session logs in the active record.

### Migration evidence

Legal's flat checkpoint convention is a useful starting point, but the coexistence of stale nested-layout guidance and old timestamped records demonstrates why migration must be a first-class part of the contract. The portable result should have one current layout and an explicit, recoverable conversion or retirement path.
