---
id: KI-HARNESS-FND-012
title: Automate roadmap progress
theme: foundation-tooling
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Provide a safe human-in-the-loop agent loop that keeps eligible roadmap work moving while surfacing decisions before they become blockers.

## Context

The current process can select, plan, implement, review, accept, and recap individual records, but it relies on a person to restart the next cycle. The estate needs a bounded mode that repeatedly grounds the queue, advances only explicitly authorised work, and asks the human early for the decisions it cannot make.

## Boundary

Do not create autonomous authority to select priorities, approve plans, accept work, push changes, modify another repository, or override a stop condition. The loop must not infer approval from a clean gate or silence.

## Current state

The process skills already define selection, planning, implementation, acceptance, recap, and batch authority. `ki-batch` supplies a reviewable authorisation and run ledger for named ready items, but no process surface evaluates one approved agenda cycle, records early questions, and stops before widening authority.

## Delivery design

Add a portable `ki-agenda` process skill. It consumes one explicit `ki-batch` authorisation and the named canonical records; it neither selects candidates nor creates a new authority store. Its only durable run state is the authorisation's existing ledger and recap.

The agenda performs one bounded cycle: re-ground repository and item state, validate the approved authority, ask all known decision questions before starting work, then coordinate only independent named items through their existing process skills. It stops the affected item on a failed gate, dirty tree, external dependency, unknown authority, scope change, or other mandatory stop. It may continue only a proven independent authorised item, and normally ends each delivery at `awaiting-review`.

## Locked decisions

- `ki-agenda` is a new portable process skill, not a daemon, CLI command, runtime hook, or scheduler.
- The reviewed `ki-batch` authorisation remains the sole durable execution authority and ledger; the agenda creates no tracker, queue, or hidden state.
- Agenda cycles are single-repository by default. A peer repository needs its own named record and authorisation, never an inferred cross-repository mutation.
- Selection, readiness approval, acceptance, pruning, pushing, releasing, and unapproved decisions remain terminal human gates.

## Steps

- [ ] Define the `ki-agenda` contract around an explicit `ki-batch` authorisation: allowed item states, single-repository scope, timebox, mandatory stops, ledger evidence, and normal `awaiting-review` completion.
- [ ] Specify the one-cycle sequence: fresh grounding, authorisation validation, early-question report, independent-item coordination, stop or park evidence, and concise recap without duplicating sibling lifecycle logic.
- [ ] Add a pure fixture-backed cycle model that proves absent authority, an unready item, a dirty tree, a failed gate, a dependency, and an unapproved decision produce a named no-write stop.
- [ ] Write the portable skill and its `ki-batch` integration guidance, including a dry-run example that reports candidate state and questions without changing a record.
- [ ] Run focused fixtures and repository gates; review that no result makes selection, readiness, acceptance, pruning, push, release, or external mutation appear automatic.

## Files touched

- `skills/change-management/ki-agenda/SKILL.md`
- `skills/change-management/ki-agenda/references/standards-agenda.md`
- `skills/change-management/ki-agenda/scripts/agenda-cycle.ts` and its focused test
- `skills/change-management/ki-batch/SKILL.md` and `references/standards-batch.md`
- This roadmap item

## Verify

- Fixture-backed cycles prove that an authorised item advances only through its allowed lifecycle stage, every decision point stops with a clear question, and a failed or blocked cycle leaves no hidden mutation or claimed progress.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

This item is independently shapeable. It must reuse, rather than replace, the authority boundaries of `ki-next`, `ki-plan`, `ki-implement`, `ki-accept`, and `ki-recap`.

## Stop conditions

Stop for a user decision if the proposed agenda would require a standing authority store, an automatic selection or readiness transition, a cross-repository write, a runtime-specific scheduler, or a retry that masks a failed gate. Capture any broader automation as separate work.

## Discussion

### Human authority

The outcome is continuous progress through work that is already authorised, not an autonomous maintainer. The loop is valuable precisely when it asks for a decision while the human can still make one cheaply.
