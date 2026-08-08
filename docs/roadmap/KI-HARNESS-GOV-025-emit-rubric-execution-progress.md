---
id: KI-HARNESS-GOV-025
title: Emit rubric execution progress
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: 8c06ae91a781efc72ba4c1ff4a7478481cbe7970
---

## Goal

Let a rubric session yield the event loop and report its own progress, so that a long-running audit shows what it is doing rather than freezing, and so that each criterion can say how expensive it expects to be.

## Context

The `ki` host brackets each rubric item with progress reports and refreshes its live display on a timer between them, so the elapsed clock and the sweep advance while one long item runs. That refresh is inert whenever the running work blocks the event loop, because a timer callback cannot be delivered while the loop is blocked. The display then sits frozen, and a user cannot distinguish that from a hang — precisely the state the refresh exists to rule out. `TRD-d7d00505` measured it: the refresh timer registered once and fired zero times across 26.5 seconds, where roughly a hundred and six firings were due, and the captured frames held three distinct clock values, jumping from `0.0s` to `30.5s`.

The trade attributes the blocking to rubric items that shell out. That is the right diagnosis of the mechanism but the wrong location in this catalogue. Under the house evidence pattern a criterion is a pure reader of already-gathered outcomes — `run: ({ outcomes }) => outcomes` — and the subprocesses run when the **context** is built. `collectAuditEvidence` in `ki-engineering` invokes Biome, `tsc`, `knip`, `syncpack`, and the full test suite through `execSync` before any criterion executes. So the loop is blocked during context creation, ahead of the first item edge the host reports, which is also why the display freezes on an item rather than between items.

Three capabilities are missing, and they are worth taking together because they share one contract: a session cannot yield, it cannot say anything between its edges, and it cannot tell the host that one criterion costs seconds while its sibling costs a single `lstat`.

## Boundary

This item owns the shared rubric contract, its vendored copies, and the evidence gathering inside this repository's skills. It does not change the host's renderer, its refresh interval, or its progress vocabulary; `tools-ki` owns those and consumes what this contract emits. It does not move the contract version, and it does not widen the inner execution seams — a criterion that wants to shell out directly is a later question, and the evidence today sits in contexts. It does not make emission load-bearing — a rubric must behave identically when no emitter is supplied, and must never depend on an event being observed.

## Current state

The contract now carries `emit` and `cost`, `createSession` may return a promise, and `ki-engineering` awaits its external commands and emits a step for each, so the frozen display is addressed at its source. `shared/rubric.ts` is vendored into thirty-five skills and is converged; it had drifted into two variants, nine copies carrying remediation and judgment helpers the other twenty-six lacked.

The cost channel now carries the six criteria whose evidence is a subprocess: `SYNC-1`, `BIO-1`, `TSC-1`, and `KNIP-2` in `ki-engineering` at 2, 4, 5, and 8 against measured wall-clock spans of 0.1s, 0.3s, 0.4s, and 0.6s in this repository; `TEST-5` at 60 for a full suite under coverage instrumentation; and `MD-mech` in `ki-authoring` at 2 for a whole-repository rumdl run measured at 0.24s. Every other criterion is a pure reader and keeps the default unit. The declared numbers are a ratio between subprocess-backed siblings, not a ratio against an `lstat`, which would be four orders of magnitude and would weight a bar into uselessness.

`ki-repo` is converted too, and it was the dearest context in the estate: its evidence is `gh` network calls rather than local subprocesses, and a full run measured 3.2 seconds of wall clock at 38% CPU — roughly two seconds of it blocked on the network with the loop frozen, the single longest inert span the display had to survive. The whole `gh` layer is now awaited, each round trip reports itself as a step, and the four criteria that own one — `BP-1`, `SEC-1`, and `ACT-1` at 4, with `DEP-1` at 12 for its three calls — carry a cost. The independent content reads in `remoteContentEvidence` now overlap through `Promise.all` rather than queueing, which only reaches an `--org` run, since a local checkout reads its content from disk.

`RubricExecution.run` and `RubricSubject.context` remain synchronous, which costs nothing while evidence is gathered in contexts.

Emission is now proven inert rather than asserted to be, in both converted skills. Each carries a test that runs the same session with and without a recording emitter and compares both the outcomes and the proposal, and that also confirms the emitter reaches the evidence gathering rather than stopping at the session, by recording what the injected inspector was handed. `ki-engineering` sweeps every criterion in all thirteen non-`RUBRIC` families rather than one family, reading them through the erased `RubricFamily<EngineeringRubricContext, unknown>` because the focused contexts are heterogeneous and their union is not assignable to any one of them.

Two migration routes were measured rather than argued. Widening the inner seams — `RubricSubject.context` and `RubricExecution.run` — produces 238 type errors across sixty-one files, because 121 call sites in twenty-eight test files consume a result synchronously, most inline as `item.audit.run(context)[0]?.message`. Widening only `createSession` instead reaches the same capability and touches twenty-eight test files by one line each, none of them for async. The entry point is therefore the seam to move: a concrete synchronous `createSession` stays assignable to the widened type, so no skill breaks until it chooses to become async.

The contract version does not move. Every addition here is source-compatible, and the host validates the version it is given: declaring an unsupported one fails every audit in the estate immediately with `rubric catalogue has an unsupported contract version`. The host also already awaits `createSession`, so an asynchronous session needs no host change at all.

## Steps

- [x] Converge the thirty-five vendored `shared/rubric.ts` copies, which had drifted into two variants, so the contract change lands once rather than twice.
- [x] Add `emit?: RubricEmitter` to `RubricContextOptions`, with a closed vocabulary of bracketed stages and named steps carrying optional `completed`/`total` counts.
- [x] Add an optional `cost` to `MechanicalRubric` as a relative estimate against its siblings, defaulting to a unit when unset.
- [x] Widen `createSession` to return a session or a promise of one, which is the seam that restores the refresh.
- [x] Convert `collectAuditEvidence` in `ki-engineering` from `execSync` to awaited subprocesses, emitting a step per external command.
- [x] Declare a cost on the subprocess-backed criteria in `ki-engineering` and any sibling whose expense is comparable, so weighting stops being item count.
- [x] Convert the remaining contexts that gather evidence expensively, one skill at a time, as each earns it. `ki-repo` earned it and is converted. `ki-authoring` runs rumdl in 0.24s and `ki-tools` spawns `--version`; neither blocks long enough to justify the change, and both stay synchronous until they do.
- [x] Add the emitter-inertness test to `ki-engineering` that `ki-repo` now carries, closing the one place where the Verify claim rests on reading rather than on a test.

## Files touched

- `skills/*/*/scripts/shared/rubric.ts` — thirty-five vendored copies of the contract.
- `skills/governance/ki-engineering/scripts/rubric/contexts/` — the evidence gathering and its session.
- `skills/*/*/scripts/rubric/items/` — the criteria that will declare a cost.
- Further `skills/*/*/scripts/rubric/contexts/` as each skill's gathering earns conversion.

## Verify

`bun run test` and `bunx tsc --noEmit` pass, and a full `ki repo audit` reports `FAIL=0 WARN=0`.

The behavioural proof is the measurement the trade supplies: re-run `ki repo audit --skill ki-engineering` against a repository with a real test suite and confirm the refresh timer fires at roughly the configured interval rather than zero times, and that captured frames carry advancing clock values instead of jumping from `0.0s` to the total.

A session created without an emitter must produce byte-identical findings to one created with a recording emitter, proving emission is observational only.

## Dependencies / blocks

Nothing blocks this item. It supersedes the local half of `TRD-d7d00505` and supplies what `KI-TOOL-CLI-022` needs to weight its progress bar by anything other than item count; that item is `tools-ki`'s to sequence, and this repository does not block on it.

## Review

### Delivered

All eight steps. The contract carries `emit` and `cost` across its thirty-five converged vendored copies, `createSession` may return a promise, and the two skills whose evidence blocked the loop measurably — `ki-engineering` on local subprocesses and `ki-repo` on `gh` network calls — now await that work and report each external command as a step. Six subprocess-backed criteria in `ki-engineering` and `ki-authoring` and four `gh`-backed criteria in `ki-repo` declare a cost. Both converted skills carry a test proving emission observational.

### Summary of changes

| Commit | Change |
| --- | --- |
| `a6f7b2c3` | `emit` and `cost` added to the contract, across the thirty-five vendored copies converged first |
| `19c5976a` | `createSession` widened to return a session or a promise of one |
| `b0cdf90a` | `ki-engineering` evidence gathering converted from `execSync` to awaited subprocesses |
| `4d7f80f1` | cost declared on `SYNC-1`, `BIO-1`, `TSC-1`, `KNIP-2`, `TEST-5`, and `MD-mech` |
| `7bfdf1fd` | `ki-repo` `gh` layer awaited and emitting, with `Promise.all` over independent content reads |
| this change | the `ki-engineering` emitter-inertness test, and this record |

### Verification

`bunx tsc --noEmit` is clean and `bun run test` reports 316 pass, 0 fail across 83 files.

`ki repo audit --skill ki-engineering` completes in 2.07s wall against 3.89s of CPU — 188% — where the pre-change run spent its time on a blocked loop. `ki-repo` was measured at 3.17s wall and 38% CPU before conversion, roughly two seconds of it inert. CPU exceeding wall clock is the direct evidence that the loop is no longer parked, and it is what makes the host's refresh timer deliverable.

The full `ki repo audit` reports `FAIL=0 WARN=0` for every skill this item touches. Two unrelated `ki-roadmap` failures against `FND-010` and `FND-011` were found in the same sweep and are recorded as outstanding below rather than absorbed here.

Emission is proven inert in both skills by a test that runs one session silent and one watched against the same injected inspector, and compares outcomes and proposal. Each also records what the inspector was handed, so the test fails if the emitter stops at the session and never reaches the evidence gathering.

### Outstanding concerns

`RubricExecution.run` and `RubricSubject.context` remain synchronous. That is deliberate and costs nothing while evidence is gathered in contexts, but a criterion that ever wants to shell out directly will need the inner seams, and widening them was measured at 238 type errors across sixty-one files.

`ki-authoring` and `ki-tools` are not converted, on the measurement that 0.24s and a `--version` spawn do not block long enough to earn it. If either grows, the judgment should be re-taken rather than inherited.

### Post-change review

Not yet performed.

### Mini recap

The trade's diagnosis had to be relocated before anything could be built: it named "items that shell out", but under the house evidence pattern the subprocesses run when the context is built, ahead of the first item edge the host reports. Accepting it verbatim would have widened the inner seams, paid 121 test edits, and left the display frozen.

The lasting judgment is that cost is a ratio between subprocess-backed siblings and never a ratio against an `lstat`, which would be four orders of magnitude and would weight a bar into uselessness. TypeScript 7.0.2 inverted the usual intuition here — `tsc --noEmit` runs in 0.4s at 400% CPU, so `tsc` is no longer the expensive gate and its cost is 5 rather than the largest.

Writing the `ki-repo` inertness test is what revealed that `ki-engineering` had none, which was raised as a step rather than papered over, and is the step this change closes.

## Discussion

### Why the trade's diagnosis needed relocating

The trade reasons from the host outward and lands on "items that shell out", which is true of a rubric in general and false of this catalogue in particular. Accepting it verbatim would have widened the item execution seam, paid 121 test edits, and left the display frozen, because the blocking span sits earlier — in the context. Both seams are worth widening, but only one of them is the fix, and an item that recorded the wrong one would have looked delivered while the symptom persisted.

### Why cost is an estimate rather than a measurement

`KI-TOOL-CLI-022` proposes learning per-item durations by observation and persisting them, which is the more accurate basis and is that repository's to build. A declared cost is not a competitor to it: it is the first-run signal that observation cannot supply, since an item runs at most once per invocation and a cold repository has no history at all. The two compose — a declared cost seeds the weighting, an observed duration corrects it.

### Why emission must be inert

A rubric that behaved differently when observed would make progress reporting part of the contract under audit, and a finding that depended on whether a display was attached would be indefensible. Emission is therefore optional at the type level and must remain unobservable in the findings, which the verification above tests directly rather than assuming.
