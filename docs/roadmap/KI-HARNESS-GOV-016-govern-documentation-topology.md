---
id: KI-HARNESS-GOV-016
title: Govern documentation topology
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make the shared documentation topology clear so repository authors can place decision, feature, guide, and roadmap material consistently without duplicating authority.

## Context

The imported documentation submissions establish a useful division: decisions explain why, Feature Definitions explain observable behaviour, guides explain how, and roadmap items explain planned change. The repository shape needs to name that topology while specialist skills retain content ownership.

## Boundary

Do not require every repository to create every documentation category, make guides restate feature contracts, or make `ki-guides` own the full repository topology.

## Current state

The boundaries exist across specialist skills but are not yet coherently owned by the repository-shape standard or assessed by immediate roadmap work.

## Steps

- [ ] Define the shared `docs/` topology and its ownership boundaries in `ki-repo`.
- [ ] Define how `ki-guides` routes authors to relevant Feature Definitions without creating a duplicate requirement.
- [ ] Require immediate roadmap work to assess the four documentation authorities and record justified non-applicability.
- [ ] Add focused rubric checks and generated guidance.

## Files touched

- `skills/keystone/ki-repo/`
- `skills/governance/ki-guides/`
- `skills/governance/ki-feature-definitions/`
- `skills/change-management/ki-roadmap/`

## Verify

- Focused rubric fixture coverage for each affected skill
- `ki repo audit --skill ki-repo --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This work is independently shapeable and must preserve specialist-skill ownership.

## Discussion

### Consolidated sources

This item adopts [TRD-6f63fb71](../../+/_TRADES/knowledgeislands/tools-ki/TRD-6f63fb71.md) and [TRD-24095e01](../../+/_TRADES/knowledgeislands/tools-ki/TRD-24095e01.md).
