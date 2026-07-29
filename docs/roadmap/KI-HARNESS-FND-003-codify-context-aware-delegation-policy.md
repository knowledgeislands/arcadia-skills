---
id: KI-HARNESS-FND-003
title: Codify context-aware delegation policy
theme: foundation-tooling
horizon: next
status: ready
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Extend `ki-delegate` with an explicit dispatch decision: whether work needs originating conversation context, frontier-level reasoning, or a fresh lower-cost worker.

## Boundary

Require delegation briefs to carry durable constraints and decisions; context forks are hygiene, not a substitute for an adequate brief.

Do not add runtime-specific spawning machinery, a new agent type, a persistent transcript store, or an ambient model default.

## Current state

`ki-delegate` already requires a cold-agent readiness test, a bounded brief, an explicit per-spawn model, and an orchestrator gate.

It does not yet make the initial dispatch decision explicit: whether the originating agent must retain the work because its active reasoning is not transferable, whether a fresh worker is safe from a complete brief, or whether a higher-reasoning worker is justified by the decision risk.

The compact-context rule now reinforces this distinction: a recap is a safe boundary for native compaction only after durable constraints have been preserved.

## Steps

1. Define one concise dispatch decision in `ki-delegate`: retain work with the originating agent when essential reasoning cannot be made durable; use a fresh worker when the cold-agent test passes; select stronger reasoning only when the decision risk requires it.
2. Make the decision use the existing brief, task classification, minimum-viable-model, and escalation vocabulary rather than introducing a parallel score or context metric.
3. State the compaction boundary: preserve and verify the brief before a fresh worker or native context compaction; never treat a context fork or compacted summary as evidence by itself.
4. Add worked before/after examples for one retained-origin judgment task and one cold-ready mechanical or research task.
5. Align `ki-batch` and the public process guidance only where their existing delegation language would otherwise contradict the clarified dispatch decision.
6. Run the skill and authoring audits, then present the policy for acceptance.

## Files touched

- `skills/process/ki-delegate/SKILL.md`
- `skills/process/ki-delegate/references/standards-delegation.md`
- `skills/process/ki-delegate/references/exemplars.md` if a focused example is clearer than the procedure
- `skills/process/ki-batch/` only for a necessary relationship-boundary alignment
- public process guidance only if its current wording conflicts

## Verify

- The three dispatch outcomes are mutually comprehensible and use no ambient model or runtime-specific fallback.
- Every fresh-worker example passes the cold-agent readiness test from the written brief alone.
- Retaining origin context is a stated exception, not an excuse to omit a durable brief or gate.
- Compaction occurs only after durable constraints are preserved and never while an active delegated worker remains un-gated.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

This item is independent of FND-005.

It may use the established `ki-recap` context-pressure boundary as evidence, but does not change its runtime mechanics.

## Delegation

Use one judgment-focused review of the dispatch vocabulary and one independent mechanical pass for examples and cross-skill wording.

The orchestrator decides any policy trade-off, reviews the combined diff, and runs the final audits.

## Discussion

### Dispatch decision

Shaping should distinguish context that must remain with the originating agent from work whose reasoning demand or independence justifies a fresh worker.

### Readiness rationale

The existing delegation standard already supplies the necessary primitives, and the intended addition is a bounded clarification rather than new runtime infrastructure.

The item can therefore move directly from Future to Ready without a Soon-only discovery phase.
