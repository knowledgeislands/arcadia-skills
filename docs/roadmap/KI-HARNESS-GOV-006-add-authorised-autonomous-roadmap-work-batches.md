---
id: KI-HARNESS-GOV-006
title: Add authorised autonomous roadmap-work batches
theme: governance-consistency
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Create `ki-batch`, a process skill for human-approved autonomous batches of governed roadmap-plan work.

Its charter must name plan IDs, dependency order, repositories, timebox, verification requirements, authorised decisions, and the intended lifecycle result.

The skill must preflight plan readiness and scope, execute only the approved work, commit coherent verified units, park ambiguity rather than infer authority, and finish with an auditable per-plan run ledger and recap.

Use [faff](https://github.com/shftwst/faff) for its eligible-work, park-protocol, and run-ledger model, and [gstack](https://github.com/garrytan/gstack) for separated planning, execution, review, and QA stages.

## Boundary

`ki-batch` orchestrates `ki-next`, `ki-plan`, `ki-delegate`, and `ki-recap`; it does not replace their responsibilities or add a KI CLI command.

It must stop for unapproved public-contract changes, material scope expansion, destructive or irreversible work, new external dependencies or coordination, required-verification failure, release or push, and any decision outside the charter.

Begin with the process skill, examples, and a reviewable plan/acceptance packet; do not import either external project's tracker, plugin, worktree, or runtime-specific machinery.
