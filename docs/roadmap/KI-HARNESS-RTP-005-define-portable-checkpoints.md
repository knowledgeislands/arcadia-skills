---
id: KI-HARNESS-RTP-005
title: Define portable checkpoints
theme: runtime-portability
horizon: now
status: in-progress
blocks: [KI-HARNESS-RTP-006]
blocked-by: []
baseline-ref: a4c10e775a3f7c5a42b2c72c061de5c9ab0c409f
---

## Goal

Let a user resume one named active thread in any supported agent environment from a concise, repository-owned checkpoint rather than a vendor-specific conversation transcript.

## Context

`kit-legal` demonstrates the value of live checkpoints under `+/_RESUME/`: one high-signal, continuously overwritten snapshot per active human-named thread. Its checkpoint contains the objective, current state, decisions, touched files, open questions, and one immediate next step; Git holds its history. This item makes `+/_CHECKPOINTS/` the proposed canonical target rather than extending the existing name.

The existing practice is tied to Claude Desktop and Claude Code orientation, and retains legacy timestamped nested checkpoints beside the newer flat per-thread layout. A portable capability can preserve the proven checkpoint model while allowing Codex, Zed, VS Code, and other runtimes to discover and use the same repository artifact without claiming to reopen a private vendor session.

## Boundary

Do not create a shared transcript store, synchronise vendor session state, reopen a session in another runtime, or treat a checkpoint as a substitute for durable decisions, roadmap records, knowledge, or session recap. Do not retain Legal's legacy nested timestamp layout as a permanent compatibility surface.

## Shaping

### Selected checkpoint contract

`ki-checkpoints` will be an optional, repository-declared governance capability under `skills/change-management/`. It owns an optional `+/_CHECKPOINTS/` subarea and a checker; `ki-repo` continues to own only the generic `+/` working-area scaffold.

An active record is one regular Markdown file at `+/_CHECKPOINTS/<thread>.md`. `<thread>` is the human-selected portable thread name and must be a non-empty single path component; it cannot contain a path separator, be `.` or `..`, or encode a runtime session identifier. There is at most one active record for a thread.

The record has `type: ki-checkpoint`, `thread`, `state: active`, `created_at`, and `updated_at` frontmatter. Its H1 repeats the thread name, followed by exactly `Objective`, `Current state`, `Decisions made`, `Files touched`, `Open questions`, and `Next step` sections. Updating replaces the one current snapshot in place; it never appends a transcript or timestamped checkpoint history. Git is the history mechanism.

Retiring a thread is an explicit move from the active flat area to `+/_CHECKPOINTS/_RETIRED/<thread>.md`, with `state: retired` and a retirement timestamp. Retired records are inspectable recovery evidence but are never selected as active. Deletion or longer-term archival policy remains repository-owned; the portable capability does not impose retention or infer completion.

### Lifecycle and resume flow

The first portable flow is intentionally runtime-neutral: a user names a thread, an agent finds the active record by that name, reads it in full, verifies its `state: active`, and continues from `Next step`. A runtime may provide a discovery UI or hook later, but the capability claims neither session reopening nor a runtime identifier.

An agent updates a checkpoint only at an explicit user request or a documented local trigger, such as before context compaction, after a substantive decision, after a repository commit, or before a known pause. It must not invent a checkpoint from a Stop event, infer that a thread is complete, or write decisions and durable work into the checkpoint instead of their canonical homes. `ki-recap` remains the user-facing, judgment-led session recap; a checkpoint is only live reconstruction state.

### Migration and adoption

The Legal inventory confirms both the intended flat current snapshots and older nested timestamped records under `+/_RESUME/`. This Harness work will provide a recoverable migration procedure, but it will not change Legal. A Legal-owned follow-up will inventory each record, convert an active thread only when its owner confirms the thread name and current state, move historical nested records to a chosen retained location or retire them explicitly, update its local readers, and remove the legacy convention only after the new active set audits cleanly.

`ki-repo` will detect the specialised `_CHECKPOINTS` subarea only to require the matching `ki-checkpoints` declaration; it will not create, interpret, or repair checkpoint records. An absent subarea means the capability is not active.

### Readiness conditions

Before this item can become Ready, review the active and retired record locations, required schema fields and section set, the no-write-on-uncertainty rule, the repository declaration/detection boundary, and the Legal migration handoff. No runtime-specific hook is part of this item; [RTP-006](KI-HARNESS-RTP-006-define-stop-checkpoint-hook.md) remains a separately planned consumer.

## Current state

The Harness has no `ki-checkpoints` skill, checkpoint schema, owned scaffold, checker, or runtime-adapter discovery contract. Legal provides the evidence base: seven current flat snapshots are keyed by human-readable thread names, while repository orientation still describes the older nested timestamp form. Its working tree is independently dirty, so this item remains read-only against Legal.

## Steps

- [ ] Add the `ki-checkpoints` governance capability with the selected active and retired record contract, update/retirement operations, resume guidance, and an explicit no-transcript/no-session-continuity boundary.
- [ ] Extend `ki-repo` coverage detection only for an opted-in `_CHECKPOINTS` subarea, retaining its generic `+/` ownership and leaving absent capability directories untouched.
- [ ] Add a native checker and fixtures for valid active and retired records, duplicate or invalid thread names, unsupported state/section/frontmatter, stale checkpoint evidence, and vendor-session-dependent data; CONFORM must not create content, choose a thread, or retire a record.
- [ ] Document a Legal-owned recovery migration from `+/_RESUME/`: inventory current flat and legacy nested records, confirm active records with the owner, migrate or explicitly retire each, update local readers, and remove legacy orientation only after validation. Do not write to Legal in this item.
- [ ] Prove the manual runtime-neutral resume flow from a fresh context and verify that an absent optional subarea is quiet, a retired record is never selected as active, and runtime-specific adapters remain out of scope.

## Files touched

- `skills/change-management/ki-checkpoints/`
- `skills/keystone/ki-repo/`
- Colocated checker, rubric, and fixture tests
- This roadmap item

## Verify

- Focused `ki-checkpoints` checker and rubric tests
- `ki dev skill rubric ki-checkpoints --write`
- `ki repo audit --skill ki-checkpoints --repo .`, `ki repo audit --skill ki-repo --repo .`, and `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Fixture-backed verification proves that one active checkpoint is selected by thread name, updates remain in place, retired records are not treated as active, and no checkpoint can imply access to a vendor session.

## Dependencies / blocks

`ki-repo` owns the generic working-area contract and only the declaration coverage signal. `ki-recap` owns session-end recap and compaction boundaries. `ki-tokenomics` and its runtime adapters own context-cost and runtime-evidence boundaries. Cross-repository trades are unrelated: they govern proposals between repositories, whereas a checkpoint is local state for one active thread.

This item blocks any claim of a standard `ki-checkpoints` capability or runtime-specific checkpoint adapter until the portable schema, ownership split, lifecycle and migration policy, exact checker scope, and at least one runtime-neutral resume flow are reviewable. Runtime-specific adapters remain independently optional, including the proposed Stop-hook adapter in `KI-HARNESS-RTP-006`.

## Delegation

Keep the portable record contract, `ki-repo` coverage boundary, checker, and documentation under one orchestrator. They share one new capability and an unsettled schema, so parallel implementation would create overlapping decisions rather than an independent delivery advantage. The Legal migration is a separate receiver-owned follow-up and is not delegated or implemented here.

## Discussion

### Cross-runtime boundary

The portable unit is a distilled reconstruction prompt, not the original conversation. It must be useful to a fresh agent with no transcript access and must not expose or depend on an opaque runtime session identifier. A human-readable thread name provides the durable lookup key; the repository checkpoint provides the state.

### Lifecycle and durable knowledge

An active checkpoint is overwritten in place while the thread is live, then retired after durable facts and work have reached their proper owners. Its presence may signal an active thread, but it must not become a second roadmap, decision log, or memory system. Git history supplies checkpoint history without accumulating session logs in the active record.

### Migration evidence

Legal's flat checkpoint convention is a useful starting point, but the coexistence of stale nested-layout guidance and old timestamped records demonstrates why migration must be a first-class part of the contract. The portable result should have one current layout and an explicit, recoverable conversion or retirement path.
