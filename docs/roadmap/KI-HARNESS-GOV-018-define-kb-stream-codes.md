---
id: KI-HARNESS-GOV-018
title: Define KB stream codes
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Give Knowledge Base stream proposals stable concise identifiers suitable for display and durable reference.

## Context

Human-readable stream names and paths can repeat or change. A frontmatter code would make a proposal unambiguous without deriving identity from mutable wording.

## Boundary

Do not infer codes from titles or paths, or hide missing or malformed values with a generated substitute.

## Current state

The `tools-ki` reader can expose an existing code but the `ki-kb-streams` contract does not define one.

## Steps

- [ ] Define code grammar, requiredness, uniqueness scope, and lifecycle stability.
- [ ] Define creation and migration guidance for existing proposals.
- [ ] Add rubric checks and CLI-facing fixture expectations.

## Files touched

- `skills/keystone/ki-kb-streams/`
- Its generated guidance and fixtures

## Verify

- Focused stream rubric tests
- `ki repo audit --skill ki-kb-streams --repo <KB-fixture>`

## Dependencies / blocks

This work needs representative Knowledge Base fixtures but has no known delivery dependency.

## Discussion

### Source

This item adopts [TRD-c8a23b80](../../+/_TRADES/knowledgeislands/tools-ki/TRD-c8a23b80.md).
