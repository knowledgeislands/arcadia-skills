---
id: KI-HARNESS-GOV-004
title: Review interpretable context methodology and agentic practice
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Assess Interpretable Context Methodology alongside current agent models, runtimes, and orchestration approaches once the harness's governance contracts are stable.

## Boundary

Extract only evidence-backed improvements and retain differences that serve this architecture.

## Shaping

### Intended approach

Review primary Interpretable Context Methodology material against the current KI delegation, recap/compaction, roadmap, batch, and runtime-portability contracts.

Record a comparison that distinguishes reusable evidence from incompatible assumptions, then route each concrete improvement to its owning skill or a named follow-up item rather than importing an external operating model wholesale.

### Known dependencies

The lifecycle, delegation, compaction, and first batch contracts are now stable enough to serve as comparison evidence.

The review remains source research and documentation until a specific owner accepts a follow-up.

### Decision still needed

Select the primary source set and the comparison dimensions that make a recommendation traceable without turning the review into a broad runtime survey.

### Promotion conditions

Promote when the source set, comparison structure, expected durable output, and receiving-owner routes are explicit.

## Current state

The first local batch established explicit Ready → Acceptance delivery, durable delegation briefs, safe recap/compaction boundaries, and a retained batch ledger.

The primary ICM paper frames filesystem structure and staged Markdown context as an alternative to framework-level orchestration, making its comparison with those contracts now concrete.

## Steps

1. [x] Review the primary ICM paper and canonical project material alongside the current KI lifecycle, delegation, recap, batch, and runtime-portability sources.
2. [x] Publish a concise comparison of durable file structure, scoped context, stage contracts and human gates, orchestration mechanics, and deliberate KI differences.
3. [x] Identify only evidence-backed improvements, routing each to its owning skill or a named follow-up work item; retain no recommendation that requires a new runtime framework or filesystem workflow architecture.
4. [x] Record the source review date and outcome in the durable comparison reference.

## Files touched

- `docs/decisions/references/interpretable-context-methodology-review.md`
- this work-item record
- a named receiving work item only if the review identifies a concrete bounded improvement

## Verify

- Every conclusion distinguishes primary-source evidence from KI inference.
- The comparison names both an ICM claim and the relevant current KI owner or boundary.
- No external methodology is imported wholesale and no runtime-specific mechanism is added.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This item is independent.

## Acceptance

### Delivered

Published the [ICM review](../decisions/references/interpretable-context-methodology-review.md) against current KI contracts.

### Summary of changes

The review identifies alignment around durable files, scoped context, human gates, and deterministic work, while retaining KI's flat work-item lifecycle and runtime-neutral process boundary.

It does not adopt numbered-stage directories, an ICM runner, or a filesystem workflow architecture.

### Verification

- Reviewed the primary ICM paper and canonical Model Workspace Protocol material.
- Traced every comparison to a current KI surface or an explicitly labelled inference.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

### Outstanding concerns

The possible worker-brief source-artifact locator is a separately scoped `ki-delegate` decision, not an implied change.

### Mini recap

ICM reinforces KI's file-backed evidence and explicit gates without replacing its lifecycle model.

## Done

Accepted by the user on 2026-07-29 with the local close-out batch.

## Discussion

### Review timing

The methodology review becomes useful only after the harness contracts are stable enough to distinguish an external improvement from churn in the local model.

### Selected sources

The primary source set is the [ICM paper](https://arxiv.org/abs/2603.16021) and its canonical project material.

The comparison is not a review of secondary implementations or vendor-specific templates.
