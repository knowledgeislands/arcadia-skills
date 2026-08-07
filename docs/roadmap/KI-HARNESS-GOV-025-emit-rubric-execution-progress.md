---
id: KI-HARNESS-GOV-025
title: Emit rubric execution progress
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a rubric session yield the event loop and report its own progress, so that a long-running audit shows what it is doing rather than freezing, and so that each criterion can say how expensive it expects to be.

## Context

The `ki` host brackets each rubric item with progress reports and refreshes its live display on a timer between them, so the elapsed clock and the sweep advance while one long item runs. That refresh is inert whenever the running work blocks the event loop, because a timer callback cannot be delivered while the loop is blocked. The display then sits frozen, and a user cannot distinguish that from a hang — precisely the state the refresh exists to rule out. `TRD-d7d00505` measured it: the refresh timer registered once and fired zero times across 26.5 seconds, where roughly a hundred and six firings were due, and the captured frames held three distinct clock values, jumping from `0.0s` to `30.5s`.

The trade attributes the blocking to rubric items that shell out. That is the right diagnosis of the mechanism but the wrong location in this catalogue. Under the house evidence pattern a criterion is a pure reader of already-gathered outcomes — `run: ({ outcomes }) => outcomes` — and the subprocesses run when the **context** is built. `collectAuditEvidence` in `ki-engineering` invokes Biome, `tsc`, `knip`, `syncpack`, and the full test suite through `execSync` before any criterion executes. So the loop is blocked during context creation, ahead of the first item edge the host reports, which is also why the display freezes on an item rather than between items.

Three capabilities are missing, and they are worth taking together because they share one contract: a session cannot yield, it cannot say anything between its edges, and it cannot tell the host that one criterion costs seconds while its sibling costs a single `lstat`.

## Boundary

This item owns the shared rubric contract, its vendored copies, and the evidence gathering inside this repository's skills. It does not change the host's renderer, its refresh interval, or its progress vocabulary; `tools-ki` owns those and consumes what this contract emits. It does not introduce a compatibility path: the contract version moves and every catalogue moves with it. It does not make emission load-bearing — a rubric must behave identically when no emitter is supplied, and must never depend on an event being observed.

## Current state

`RubricExecution.run` returns `Result`, and `RubricSubject.context` returns `RootContext`; neither may be a promise, so nothing in a session can await. `MechanicalRubric` has no cost or weight field, so the host weights every criterion equally — the defect `KI-TOOL-CLI-022` describes from the other side. `RubricContextOptions` carries `mode`, `repository`, `userHome`, `configuration`, and an optional `publication`, with no channel for progress.

`shared/rubric.ts` is vendored into thirty-five skills and has already drifted into two variants: nine copies carry `DIAGNOSTIC_REMEDIATION`, `AUTOMATIC_REMEDIATION`, and a `judgment()` helper that the other twenty-six lack. The nine are a strict superset, so convergence has a direction and this item should settle it rather than propagate the split.

A trial migration measured the cost precisely. Widening both seams to `Result | Promise<Result>` leaves the runtime correct — the host already awaits each item — but produces 238 type errors across sixty-one files, because 121 call sites in twenty-eight test files consume a result synchronously, most inline as `item.audit.run(context)[0]?.message`. A regex transform over those call sites did not converge and was reverted; the migration is mechanical but needs to be done deliberately, file by file, with the suite green at each step.

## Steps

- [ ] Converge the thirty-five vendored `shared/rubric.ts` copies on the nine-copy superset before changing anything, so the contract change lands once rather than twice.
- [ ] Widen `RubricSubject.context` to `RootContext | Promise<RootContext>`, since this is where the blocking work actually happens and it alone restores the refresh.
- [ ] Widen `RubricExecution.run` to `Result | Promise<Result>`, so a criterion that shells out directly can also yield.
- [ ] Add an optional `cost` to `MechanicalRubric` as a relative estimate against its siblings in the same catalogue, defaulting to a unit when unset, and declare it only where an item is materially cheaper or dearer.
- [ ] Add `emit?: RubricEmitter` to `RubricContextOptions`, with a closed event vocabulary bracketing context creation and item execution and carrying named steps with optional `completed`/`total` counts.
- [ ] Move the contract version and update every catalogue declaring it.
- [ ] Convert `collectAuditEvidence` in `ki-engineering` from `execSync` to an awaited subprocess, emitting a step per external command, since it is the largest single blocking span in the estate.
- [ ] Migrate the 121 test call sites, keeping `bun run test` and `bunx tsc --noEmit` green at each file rather than in one sweep.
- [ ] Declare a cost on the subprocess-backed criteria in `ki-engineering` and any sibling whose expense is comparable.

## Files touched

- `skills/*/*/scripts/shared/rubric.ts` — thirty-five vendored copies of the contract.
- `skills/*/*/scripts/rubric/items/index.ts` — thirty-six catalogues declaring the contract version.
- `skills/governance/ki-engineering/scripts/rubric/contexts/audit-evidence.ts` — the `execSync` evidence gathering.
- `skills/*/*/scripts/rubric/**/*.test.ts` — the twenty-eight test files consuming a result synchronously.
- `skills/keystone/ki-skills/references/standards-rubric-authoring.md` — the authoring standard, which shows the contract version and would otherwise document a retired shape.

## Verify

`bun run test` and `bunx tsc --noEmit` pass, and a full `ki repo audit` reports `FAIL=0 WARN=0`.

The behavioural proof is the measurement the trade supplies: re-run `ki repo audit --skill ki-engineering` against a repository with a real test suite and confirm the refresh timer fires at roughly the configured interval rather than zero times, and that captured frames carry advancing clock values instead of jumping from `0.0s` to the total.

A session created without an emitter must produce byte-identical findings to one created with a recording emitter, proving emission is observational only.

## Dependencies / blocks

Nothing blocks this item. It supersedes the local half of `TRD-d7d00505` and supplies what `KI-TOOL-CLI-022` needs to weight its progress bar by anything other than item count; that item is `tools-ki`'s to sequence, and this repository does not block on it.

## Discussion

### Why the trade's diagnosis needed relocating

The trade reasons from the host outward and lands on "items that shell out", which is true of a rubric in general and false of this catalogue in particular. Accepting it verbatim would have widened the item execution seam, paid 121 test edits, and left the display frozen, because the blocking span sits earlier — in the context. Both seams are worth widening, but only one of them is the fix, and an item that recorded the wrong one would have looked delivered while the symptom persisted.

### Why cost is an estimate rather than a measurement

`KI-TOOL-CLI-022` proposes learning per-item durations by observation and persisting them, which is the more accurate basis and is that repository's to build. A declared cost is not a competitor to it: it is the first-run signal that observation cannot supply, since an item runs at most once per invocation and a cold repository has no history at all. The two compose — a declared cost seeds the weighting, an observed duration corrects it.

### Why emission must be inert

A rubric that behaved differently when observed would make progress reporting part of the contract under audit, and a finding that depended on whether a display was attached would be indefensible. Emission is therefore optional at the type level and must remain unobservable in the findings, which the verification above tests directly rather than assuming.
