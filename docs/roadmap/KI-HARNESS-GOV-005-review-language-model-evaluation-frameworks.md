---
id: KI-HARNESS-GOV-005
title: Review language-model evaluation frameworks
theme: governance-consistency
horizon: next
status: acceptance
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Review robust evaluation frameworks such as EuroEval alongside agentic and harness-focused approaches to find transferable improvements for `evals/`.

## Boundary

Treat external frameworks as research sources, not dependencies or adoption commitments; record only evidence-backed improvements in their owning standard or item.

## Shaping

### Intended approach

Review a small primary-source set covering EuroEval and agentic or harness-focused evaluation practice against the current `evals/` scenarios, result matrices, and skill verification model.

Separate transferable evaluation design from benchmark-specific datasets, metrics, and infrastructure, then route each concrete improvement to the owning evaluation surface or a named follow-up item.

### Known dependencies

The review is read-only research and does not require a benchmark account, dataset download, new dependency, or evaluation-runner adoption.

Any proposed execution change belongs to the owner of the affected harness evaluation surface.

### Decision still needed

Select the small primary source set and the comparison dimensions that distinguish a reusable harness evaluation practice from benchmark-specific machinery.

### Promotion conditions

Promote when the sources, comparison structure, intended output, and receiving-owner routes are concrete enough for a bounded research pass.

## Current state

The harness has scenario and result-matrix evaluation material, but no current comparison of its agent-oriented evaluation shape with external language-model benchmark frameworks.

EuroEval is a primary benchmark-framework source; its repository provides a concrete comparison point without committing KI to its datasets or runner.

## Steps

1. [x] Review EuroEval's primary documentation and one bounded agent- or harness-evaluation source against the current `evals/` structure and verification model.
2. [x] Publish a concise comparison of task definition, fixtures, scoring, reproducibility, result evidence, and benchmark-specific assumptions.
3. [x] Identify only transferable evaluation practices and route each to the owning harness evaluation surface or a named follow-up item.
4. [x] Record the source review date and non-adoption rationale for any datasets, framework dependency, or benchmark infrastructure outside the harness boundary.

## Files touched

- `docs/decisions/references/evaluation-frameworks-review.md`
- this work-item record
- a named receiving work item only if the review identifies a concrete bounded improvement

## Verify

- Every conclusion distinguishes primary-source evidence from KI inference.
- Benchmark-specific datasets, metrics, and infrastructure are not adopted by implication.
- Every proposed harness change has a named owner and evidence.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This item is independent.

## Acceptance

### Delivered

Published the [evaluation-frameworks review](../decisions/references/evaluation-frameworks-review.md).

### Summary of changes

The review retains explicit task intent, self-contained fixtures, deterministic checks, advisory model judgment, and reproducible source evidence as the transferable practice.

It does not adopt EuroEval datasets or metrics, an external runner, trace infrastructure, or an OpenAI-specific runtime facility.

### Verification

- Reviewed EuroEval, its source repository, OpenAI trace-grading material, and the current local `evals/` implementation.
- Traced every conclusion to source evidence or an explicitly labelled KI inference.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

### Outstanding concerns

Any real-agent trace or fixture work needs a separately authorised portable evaluation-artifact design.

### Mini recap

The current harness already captures the useful separation between intent, deterministic checks, advisory judgment, and reproducible evidence.

## Discussion

### Transferability

The review should separate general evaluation evidence from benchmark-specific assumptions and retain only practices that improve agentic harness evaluation.

### Selected sources

The primary source set begins with [EuroEval](https://github.com/EuroEval/EuroEval) and one agent- or harness-evaluation source selected for a direct comparison with the local `evals/` model.

The review is not a benchmark adoption exercise.
