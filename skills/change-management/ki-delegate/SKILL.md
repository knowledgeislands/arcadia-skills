---
name: ki-delegate
ki-kind: process
ki-depends-on: [ki-delegation]
description: >
  Applies the ki-delegation standard to multi-task execution: decide whether the origin must retain non-durable reasoning, classify tasks, use the minimum viable worker, sequence dependency-ordered rounds, and gate every result through orchestrator review. A process skill: ki-implement and ki-batch apply this guidance automatically when parallel work would help, while it remains available for an explicit delegation-design request. Use when asked "delegate this", "make this delegable", "fan this out", "split this across agents", or "how should I parallelise this work". Not cross-repository work transfer, model-cost policy (`ki-tokenomics`), or the plan lifecycle (`ki-plan`).
argument-hint: 'delegate [plan-or-task-list] | help'
---

# ki-delegate

**Kind:** process. Applies the `ki-delegation` packet standard to round-sequenced execution guidance for `ki-implement` and `ki-batch`; an explicit invocation is optional when a caller wants to design or run delegation itself. The model cost/selection policy it draws on is owned by `ki-tokenomics`. Full procedure in [the delegation process](references/standards-delegation-process.md).

## What this skill does

Five legs, always in this order:

1. **Decide dispatch** — preserve the brief, then retain the originating agent only when essential reasoning cannot be made durable; otherwise dispatch a fresh worker when the cold-agent test passes. Choose stronger reasoning only where decision risk requires it.
2. **Classify** — bank the planning reasoning once, record decisions as **locked** or **escalate**, then sort each task into **judgment** (wrong framing is expensive to unwind), **mechanical** (precise spec, low ambiguity), or **research** (an unknown that gates later work).
3. **Assign** — map each task to an agent type and an explicit **per-spawn model**. Choose the **minimum viable model**: the least capable available model that can safely meet the task's judgment, reliability, and verification needs. Mechanical → the cheapest sufficient model; judgment → the standard-encoding specialist agent (or a stronger model); research → a general-purpose agent. Agents declare `model: inherit`, so the model is the caller's dial per spawn, not baked into the agent.
4. **Sequence** — order into **rounds**: blockers and citation-targets first, then fan out mutually-independent tasks in parallel. Name any write-contention so two agents never edit one file at once.
5. **Gate** — the orchestrator reviews **every** worker result against its definition of done and verification gate before it commits; any auto-executing hook or script gets a dedicated adversarial safety-review pass, regardless of which model produced it.

**Operating invariant — banked reasoning, bounded delegation, protected orchestrator lane.** The planner discharges load-bearing reasoning into the worker brief before dispatch; a cold agent with no shared context must be able to execute its first step from that brief alone. Retaining the originating agent is the exception: use it only when essential reasoning cannot be made durable, and still preserve the brief for recovery and review. Every worker receives one bounded deliverable, a pass/fail definition of done, file boundary, verification gate, and expected completion checkpoint. The orchestrator remains available for caller steering, decisions, progress, review, and integration while workers own implementation lanes. The full communication and completion cadence lives in the procedure.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action. `ki-implement` and `ki-batch` consult its five legs automatically when bounded parallel work may improve delivery; this does not create authority or require a separate user command. Given an explicit delegation-design request, a plan file, or a task list, first apply the `ki-delegation` packet standard, then decide dispatch, classify, assign, sequence, and gate the work. Apply the cold-agent readiness test from the procedure and refine the packet before dispatch when it fails.

## Notes

- No universal AUDIT/CONFORM/EDUCATE/REFRESH modes — this is a process skill (ADR-KI-HARNESS-SKILLS-001, ADR-KI-HARNESS-SKILLS-006); `ki-delegation` owns the auditable standard and it has one procedure of five legs.
- The **method** (decide dispatch / classify / assign / sequence / gate) is runtime-neutral; the **mechanics** it uses to spawn work (the Agent tool, subagent types, the per-spawn model override, background / worktree isolation) are Claude-Code-specific and tagged `CC` in the procedure — so the skill itself models the portability discipline it helps deliver.
- Draws on `ki-tokenomics` for model cost/selection policy and operationalises `ADR-KI-HARNESS-003` (mechanical-first, cheapest model that suffices) — it restates neither.
- Installed as a core user skill by `ki bootstrap` — usable in any repo on the machine. Like `ki-bootstrap`, it is not a repository-governance root and has no `["knowledgeislands/ki-agentic-harness:ki-delegate"]` table.
- Owns execution delegation only. Cross-repository transfer is adopted and prioritised through the receiving repository's roadmap lifecycle, not this skill.
