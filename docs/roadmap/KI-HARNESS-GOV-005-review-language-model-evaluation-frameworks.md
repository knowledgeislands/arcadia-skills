---
id: KI-HARNESS-GOV-005
title: Review language-model evaluation frameworks
theme: governance-consistency
horizon: soon
status: open
blocks: []
blocked-by: []
baseline-ref: null
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

## Discussion

### Transferability

The review should separate general evaluation evidence from benchmark-specific assumptions and retain only practices that improve agentic harness evaluation.
