---
id: KI-HARNESS-FND-008
title: Add change-aware code consistency reviews
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Mechanical engineering checks establish formatting, types, tests, and configured toolchain consistency, but they do not replace a human or model review of evolving code structure. The useful review trigger is not elapsed time: it is how much relevant code has changed since the last explicit consistency review.

## Boundary

Do not introduce a calendar cadence, a numeric quality score, a mandatory CI gate, automatic code rewrites, or a claim that Git history can judge consistency. The eventual review remains judgmental and advisory.

## Discussion

### Ownership

`ki-engineering` should own the reusable review principle because it governs the code-toolchain layer. `ki-git` remains the owner of portable commit hygiene; this item must not create a competing commit policy merely to track a review.

### Change-aware evidence

Shape a minimal, inspectable way to compare the current code with the last explicit review evidence. Git history can provide the candidate range and materiality signals — commits, changed files, public-surface changes, and churn — but the reviewer decides whether the change warrants review and what consistency means in that repository.

### Review record

The design needs a lightweight durable review record naming the reviewed Git boundary, scope, findings, and outcome. Prefer evidence already native to repository history where it is sufficient; add no state file unless Git history cannot represent the boundary unambiguously.

### Relationship to recap grounding

[FND-007](KI-HARNESS-FND-007-detect-change-since-recap-transcript.md) establishes how to measure whether a transcript remains representative. This item applies the same change-evidence idea to a different decision: whether a judgmental engineering review is worthwhile.
