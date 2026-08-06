---
id: KI-HARNESS-GOV-019
title: Improve recap coverage
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a recap demonstrate, when evidence supports it, how material discussion points were captured, delivered, deferred, or left for decision.

## Context

A concise coverage matrix can help a reviewer verify that a multi-topic session has a durable destination for each material outcome without falsely claiming transcript completeness.

## Boundary

Do not mine unavailable transcripts, claim exhaustive coverage without evidence, or convert judgmental completeness into a mechanical finding.

## Current state

`ki-recap` records the session outcome but has no defined optional coverage-matrix model.

## Steps

- [ ] Assess when a coverage matrix adds review value.
- [ ] Define its evidence boundary, compact presentation, and result vocabulary.
- [ ] Separate mechanically checkable shape from reviewer judgment about completeness.

## Files touched

- `skills/change-management/ki-recap/`
- Its generated guidance and focused tests

## Verify

- Focused recap tests
- `ki repo audit --skill ki-skills --repo .`

## Dependencies / blocks

This work is independently shapeable.

## Discussion

### Source

This item adopts [TRD-cbef1f49](../../+/_TRADES/knowledgeislands/tools-ki/TRD-cbef1f49.md).
