---
id: KI-HARNESS-FND-008
title: Add change-aware code consistency reviews
theme: foundation-tooling
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

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

### Decision still needed

Choose the canonical review-record location and the minimum evidence shape. The record must be durable enough to name the last reviewed boundary, but unobtrusive enough that a low-change repository does not accumulate routine activity logs.

### Promotion conditions

Promote when the record location, exact judgment prompt, review outcome vocabulary, and a representative example of "review now" versus "not yet warranted" are agreed.

## Current state

`ki-engineering` contains judgment prompts for individual rubric concerns, but no portable prompt or durable evidence convention for a whole-change consistency review.

## Steps

1. Compare repository-native recording options, beginning with review evidence in an ordinary change commit, against a dedicated durable review record; reject any option that creates a routine activity log or a CI-maintained score.
2. Specify the minimum review evidence: Git boundary, examined range and paths, reviewer outcome, and any follow-up identifier.
3. Add one advisory `ki-engineering` judgment prompt that asks whether change scope warrants review and, when it does, applies the structural questions to the bounded range.
4. Document outcome vocabulary and one representative "review now" and "not yet warranted" example without turning either into an automatic threshold.
5. Add focused catalogue and documentation verification for the new prompt and its record convention.

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

## Dependencies / blocks

The durable record model remains an explicit design decision. Do not mark this item Ready or add a generic review ledger until that model is approved.

## Discussion

### Ownership

`ki-engineering` should own the reusable review principle because it governs the code-toolchain layer. `ki-git` remains the owner of portable commit hygiene; this item must not create a competing commit policy merely to track a review.

### Change-aware evidence

Shape a minimal, inspectable way to compare the current code with the last explicit review evidence. Git history can provide the candidate range and materiality signals — commits, changed files, public-surface changes, and churn — but the reviewer decides whether the change warrants review and what consistency means in that repository.

### Review record

The design needs a lightweight durable review record naming the reviewed Git boundary, scope, findings, and outcome. Prefer evidence already native to repository history where it is sufficient; add no state file unless Git history cannot represent the boundary unambiguously.

### Relationship to recap grounding

[FND-007](KI-HARNESS-FND-007-detect-change-since-recap-transcript.md) establishes how to measure whether a transcript remains representative. This item applies the same change-evidence idea to a different decision: whether a judgmental engineering review is worthwhile.

### Review boundary

The boundary is evidence for a reviewer, not a trigger that turns a review into automation. A public API change, a cross-cutting rewrite, or repeated local work can justify review; a small isolated edit may not. The record makes that judgment legible for the next reviewer without presenting it as an objective quality measure.
