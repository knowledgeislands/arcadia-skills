---
id: KI-HARNESS-GOV-015
title: Define repository governance
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Define one portable repository-governance contract that makes repository structure, local authority, and repository-local managed state explicit and auditable.

## Context

The `tools-ki` submissions on repository kind and stores, cross-repository authority, and `ki-self` identify adjacent gaps in the `ki-repo` contract. They all concern what a selected repository is, what it may safely manage, and how its local derived state is governed.

## Boundary

Do not encode machine paths in tracked configuration, make sibling repositories writable by visibility alone, or turn a repository-local skill into a globally installed harness capability.

## Current state

`ki-repo` has a canonical repository identity but no complete portable model for repository kind, named Knowledge Base stores, selected-repository authority, or the `ki-self` source/projection boundary.

## Steps

- [ ] Define the portable repository kind and named-store contract, with compatible declared-skill validation.
- [ ] Define selected-repository authority and the explicit approval boundary for sibling writes and commits.
- [ ] Formalise the repository-local `ki-self` contract, discovery, projection, and native rubric boundary.
- [ ] Add focused contract fixtures and update the affected standards and generated guidance.

## Files touched

- `skills/keystone/ki-repo/`
- Repository-local `ki-self` guidance and its supporting host contract
- Relevant rubric fixtures and generated publications

## Verify

- Focused `ki-repo` and `ki-self` fixture coverage
- `ki repo audit --skill ki-repo --repo .`
- `ki repo audit --skill ki-skills --repo .`

## Dependencies / blocks

This work is independently shapeable. Any host implementation changes require a separately accepted `tools-ki` work item.

## Discussion

### Consolidated sources

This item adopts [TRD-d2cd35f7](../../+/_TRADES/knowledgeislands/tools-ki/TRD-d2cd35f7.md), [TRD-480274d1](../../+/_TRADES/knowledgeislands/tools-ki/TRD-480274d1.md), and [TRD-af376594](../../+/_TRADES/knowledgeislands/tools-ki/TRD-af376594.md).
