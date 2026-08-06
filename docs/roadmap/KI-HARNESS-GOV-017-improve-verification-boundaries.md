---
id: KI-HARNESS-GOV-017
title: Improve verification boundaries
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make shared engineering guidance favour observable public contracts over artificial internal test seams.

## Context

The `tools-ki` coverage recovery showed that every reachable implementation span should correspond to a legitimate end-to-end contract case; unreachable spans should be removed rather than preserved for coverage alone.

## Boundary

Do not prohibit justified interface-level fault injection or turn a coverage target into a requirement for artificial tests.

## Current state

The principle is evidenced by a host delivery but not yet expressed as portable engineering guidance.

## Steps

- [ ] Assess the principle against the existing engineering standard and its testing guidance.
- [ ] Define the observable-boundary rule and its justified exceptions.
- [ ] Add review and fixture guidance that distinguishes reachable contracts from dead code.

## Files touched

- `skills/governance/ki-engineering/`
- Its generated guidance and focused tests

## Verify

- Focused engineering rubric tests
- `ki repo audit --skill ki-engineering --repo .`

## Dependencies / blocks

This work is independently shapeable.

## Discussion

### Source

This item adopts [TRD-6b8cb3b4](../../+/_TRADES/knowledgeislands/tools-ki/TRD-6b8cb3b4.md).
