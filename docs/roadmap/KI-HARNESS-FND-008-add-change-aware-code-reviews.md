---
id: KI-HARNESS-FND-008
title: Add change-aware code reviews
area: FND
theme: foundation-tooling
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: f6159032ac8ba657c48695f5342da0c218db6319
---

## Goal

Give maintainers a lightweight way to decide when accumulated code changes deserve a focused consistency review.

## Context

Mechanical engineering checks establish formatting, types, tests, and configured toolchain consistency, but they do not replace a human or model review of evolving code structure. The useful review trigger is not elapsed time: it is how much relevant code has changed since the last explicit consistency review.

## Boundary

Do not introduce a calendar cadence, a numeric quality score, a mandatory CI gate, automatic code rewrites, or a claim that Git history can judge consistency. The eventual review remains judgmental and advisory.

## Shaping

### Intended approach

Add a concise change-aware consistency-review practice to `ki-engineering`, then expose it as an explicit judgmental rubric prompt rather than a mechanical pass/fail check. The review starts from an explicit Git boundary, uses the intervening commits and changed paths as its evidence scope, and asks whether the implementation remains coherent in structure, naming, ownership, duplication, and public-surface treatment.

Record the completed review in one durable, repository-owned place with the boundary revision, scope examined, reviewer outcome, and any follow-up work. Reuse existing durable project records where they fit; do not create a generated ledger or a CI-maintained score.

### Known dependencies

`ki-engineering` owns the portable principle and rubric prompt. `ki-git` continues to own commit hygiene. FND-007 may provide useful wording and evidence conventions, but this review must work from ordinary Git history even when no recap transcript exists.

### Selected record model

Record a completed change-aware review in the Git commit that publishes its outcome, using one standard trailer block rather than a generated ledger or routine documentation log:

```text
KI-Consistency-Review-Base: <full-40-character commit>
KI-Consistency-Review-Scope: <repository | pathspec list>
KI-Consistency-Review-Outcome: consistent | follow-up:<work-item-id>
```

The reviewed result is the commit carrying the trailers; the base names the exclusive lower bound of the examined range. `Scope` states the paths actually considered, and `Outcome` is either `consistent` or one canonical follow-up work-item identifier. A review that is not warranted emits no record. A follow-up remains an ordinary roadmap item, so the trailers document judgment without becoming a second planning system.

### Approved planning basis

The trailer parser and record-selection rule, exact judgment prompt, outcome vocabulary, and representative examples are the approved delivery boundary for this work. A review remains advisory; the implementation must not introduce a threshold that turns it into a mechanical gate.

## Current state

`ki-engineering` contains judgment prompts for individual rubric concerns, but no portable prompt or durable evidence convention for a whole-change consistency review.

## Steps

- [x] Define and parse the `KI-Consistency-Review-Base`, `-Scope`, and `-Outcome` trailer block; select the newest valid record whose base remains resolvable, and report unavailable evidence rather than guessing from an arbitrary commit.
- [x] Add one advisory `ki-engineering` judgment prompt that first asks whether the change since the selected boundary warrants review and, when it does, applies structural questions to the explicit range and scope.
- [x] Document the two outcomes — `consistent` and `follow-up:<work-item-id>` — plus representative "review now" and "not yet warranted" cases without turning either into an automatic threshold.
- [x] Confirm the convention with `ki-git` so the trailer shape remains portable commit metadata rather than a competing Git-hygiene policy.
- [x] Add focused catalogue and documentation verification for valid trailers, malformed or unresolved evidence, review selection, and the advisory prompt.

## Files touched

- `skills/governance/ki-engineering/SKILL.md`
- `skills/governance/ki-engineering/references/standards-engineering.md`
- `skills/governance/ki-engineering/references/rubric.md`
- `skills/governance/ki-engineering/scripts/rubric/items/`
- Matching colocated rubric tests

## Verify

- Focused `ki-engineering` rubric tests
- `ki dev skill rubric ki-engineering --write`
- `ki repo audit --skill ki-engineering --repo .`
- `bun run test`
- Fixture-backed Git history selects the newest valid review boundary and never treats an absent, malformed, or unreachable trailer as a completed review.

## Dependencies / blocks

The approved trailer record is the only durable review evidence introduced by this work. `ki-git` remains the owner of portable commit hygiene; any conflict with its existing contract is a stop rather than a reason to add a competing policy.

## Review

### Delivered

Added an advisory `REVIEW-1` engineering criterion and Git-trailer evidence selector for change-aware consistency review.

### Summary of changes

The selector accepts only a final contiguous Base, Scope, Outcome trailer block with a reachable earlier base, chooses the newest usable record, and reports absent, malformed, or unreachable evidence as unavailable. `ki-git` now identifies this as engineering-owned commit metadata, not hygiene policy.

### Verification

Focused evidence and catalogue tests (12 passing), `bun run test`, `bunx tsc --noEmit`, rubric publication, engineering/roadmap/authoring audits, Biome, rumdl, and `git diff --check` passed.

### Outstanding concerns

No trailer in current history is expected to report unavailable evidence, not a failed review. The review decision remains human or model judgment; this change adds no cadence, threshold, or gate.

### Post-change review

Fixture-backed history selects the newest valid boundary and never promotes malformed or unreachable trailers to completed-review evidence.

### Mini recap

Maintainers now have portable, inspectable review-boundary evidence without a second planning system or automated quality claim.

## Done

Accepted on 2026-08-13 following explicit human approval. The delivered advisory review contract, Git-trailer evidence boundary, and recorded verification are accepted with no blocking concern. This record is retained as completion history pending the separately authorised prune.

## Discussion

### Ownership

`ki-engineering` should own the reusable review principle because it governs the code-toolchain layer. `ki-git` remains the owner of portable commit hygiene; this item must not create a competing commit policy merely to track a review.

### Change-aware evidence

Shape a minimal, inspectable way to compare the current code with the last explicit review evidence. Git history can provide the candidate range and materiality signals — commits, changed files, public-surface changes, and churn — but the reviewer decides whether the change warrants review and what consistency means in that repository.

### Review record

The review record is one explicit Git trailer block on the outcome commit. It names the reviewed lower boundary, scope, and outcome without a generated ledger, a documentation activity log, or a separate no-change commit. The commit itself is the upper boundary and durable evidence of the reviewer's conclusion.

Malformed, foreign, or unreachable trailer evidence is unavailable rather than a freshness signal. The reviewer may inspect Git history again, but the audit must not pretend that it can recover a last-reviewed boundary from commit time, ordinary commit prose, or a changed-path heuristic.

### Relationship to recap grounding

FND-007, since completed and pruned from the roadmap, established how to measure whether a transcript remains representative. This item applies the same change-evidence idea to a different decision: whether a judgmental engineering review is worthwhile.

### Review boundary

The boundary is evidence for a reviewer, not a trigger that turns a review into automation. A public API change, a cross-cutting rewrite, or repeated local work can justify review; a small isolated edit may not. The record makes that judgment legible for the next reviewer without presenting it as an objective quality measure.
