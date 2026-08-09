---
id: KI-HARNESS-FND-012
title: Automate roadmap progress
theme: foundation-tooling
horizon: next
status: draft
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

The process skills already define the lifecycle and explicit confirmation boundaries. No orchestration surface currently carries the state, stop rules, prompt timing, or recovery evidence for repeated cycles.

## Steps

- [ ] Define the loop's durable authority model: selected records, approved operations, explicit stops, and the smallest carry-forward state.
- [ ] Design the per-cycle grounding, candidate screening, early-question, planning, implementation, review, and recap sequence using the existing process skills rather than duplicate lifecycle logic.
- [ ] Specify how the loop detects and reports no-progress, external dependencies, conflicting working trees, failed gates, and unapproved decisions without retrying destructively.
- [ ] Build and test the smallest runtime-neutral orchestration surface, including a controlled dry-run or fixture path.
- [ ] Review whether the loop reduces human coordination without making a decision or an external write appear automatic.

## Files touched

The owning process-skill guidance and tests, plus any bounded runtime adapter or orchestration artefact selected during planning. No peer repository is changed without its own receiving work.

## Verify

Fixture-backed cycles prove that an authorised item advances only through its allowed lifecycle stage, all decision points stop with a clear question, and a failed or blocked cycle leaves no hidden mutation or claimed progress.

## Dependencies / blocks

This item is independently shapeable. It must reuse, rather than replace, the authority boundaries of `ki-next`, `ki-plan`, `ki-implement`, `ki-accept`, and `ki-recap`.

## Discussion

### Human authority

The outcome is continuous progress through work that is already authorised, not an autonomous maintainer. The loop is valuable precisely when it asks for a decision while the human can still make one cheaply.
