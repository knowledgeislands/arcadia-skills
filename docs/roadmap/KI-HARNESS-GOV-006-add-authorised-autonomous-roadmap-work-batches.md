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

The aim is not simply to let an agent continue unattended. It is to make a reviewed set of ready work safely executable while the human is away: each admitted plan has explicit authority, verification, and an accountable outcome.

The durable control surface is a **batch authorisation**. It records the batch identifier and purpose; named plan IDs in dependency order; repositories and file boundaries; timebox; required verification; permitted agent decisions; permitted use of delegation; stop conditions; and whether each plan may reach acceptance or done without another human decision.

The batch pre-gate must reject incomplete or ambiguous authorisations and plans that are not sufficiently specified, ordered, scoped, dependency-clean, or verifiable. It should say why a plan is ineligible rather than quietly omitting it.

## Boundary

`ki-batch` orchestrates `ki-next`, `ki-plan`, `ki-delegate`, and `ki-recap`; it does not replace their responsibilities or add a KI CLI command.

It must not introduce a tracker, plugin, worktree scheme, runtime-specific machinery, automatic push or release, or an open-ended "agent may decide" authority. A batch authorisation is bounded to the named work and expires at its declared completion target or timebox.

## Operating model

1. **Authorise** — a human prepares and explicitly approves the batch authorisation after reviewing the plans.
2. **Preflight** — `ki-batch` verifies readiness, dependency order, permitted scope, required checks, and the stop conditions before it changes a file.
3. **Execute** — it processes plans in dependency order, delegates only work permitted by the authorisation, and commits independently verified coherent units.
4. **Park** — it stops the affected plan when it reaches ambiguity or a stop condition. It records the reason, evidence, and required human decision; it may continue only plans proven independent of the parked plan.
5. **Review and verify** — implementation evidence is distinct from the batch's final review and required verification. A plan is never self-certified merely because an implementor reported success.
6. **Close** — the post-gate writes a per-plan run ledger and concise recap: commits, checks, decisions, skipped or deferred work, parks, failures, and the resulting lifecycle state.

## Mandatory stops

Stop rather than infer authority for a public-contract change outside the approved plan, material scope expansion, destructive or irreversible action, a new external dependency or coordination, required-verification failure, release or push, or any decision the authorisation does not expressly permit.

## Reference analysis

[faff](https://github.com/shftwst/faff) is the principal operational reference. Its unattended-work model distinguishes eligible work from work that needs human intervention, uses a park protocol rather than silently discarding a loose end, and records a run ledger so the human can inspect the morning outcome. KI should retain those properties, but make the roadmap plans and batch authorisation the control plane rather than adopting a tracker or autonomy-level framework.

[gstack](https://github.com/garrytan/gstack) is the quality-process reference. Its staged flow separates thinking and planning from implementation, review, QA, and reflection; its scope guard shows the value of an explicit boundary. KI should retain the separation of execution from review and verification, but not import its broad, product-focused, Claude-specific command surface.

The KI-specific contribution is therefore an auditable authority boundary tied to roadmap items and their lifecycle evidence: the batch may progress approved work autonomously, but cannot silently broaden, ship, or declare an unapproved result complete.

## First deliverable

Start with the `ki-batch` process skill, a batch-authorisation example, a parked-plan example, and a reviewable plan/acceptance packet. Do not add KI CLI commands until the process has been exercised and accepted.
