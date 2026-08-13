---
id: KI-HARNESS-GOV-040
area: GOV
title: Resolve Knowledge Base authority
theme: governance-consistency
horizon: next
status: ready
blocks: [KI-HARNESS-GOV-041]
blocked_by: []
baseline_ref: null
---

## Goal

Choose one ownership and metadata contract for Knowledge Bases, Decision Records, and principal repositories.

## Context

`KI-HARNESS-REV-001` found three connected unresolved claims. `ki-repo-kb` calls `type` a universal sole classifier while Activities and other collections use exceptions. `ki-decision-records` independently describes a conflicting `type` and `type_url` shape. `ki-repo` exclusively owns `repo_type`, while `ki-repo-kb-principal` has structural entry points but no representation of principal role, authority, or cross-island relationship.

The review correctly made local checks truthful without selecting a policy. A decision is now needed before migration or further checker changes can safely proceed.

## Boundary

Make the authority and migration decision only. Do not rewrite existing Knowledge Base collections, introduce a second classifier, infer a principal role from prose, or change a receiving repository without a separately approved migration item.

## Current state

The aggregate Knowledge Base audit excludes universal metadata, adapter, and canonical-role policy from a clean result. Existing repositories may use activity-specific fields, legacy Stream forms, or Decision Record metadata that cannot all be canonical simultaneously.

The delivery is two independently readable governance decisions rather than one mixed schema change. `GDR-KI-HARNESS-007` owns universal Knowledge Base and Decision Record metadata authority; `GDR-KI-HARNESS-008` owns whether and how a principal repository declares its authority role. The current exclusive ownership of `[skills.ki-repo].repo_type` is the baseline, not an outcome silently reopened by this plan.

## Steps

- [ ] Inventory representative Arcadia and Techne principal records plus the current `ki-repo`, `ki-repo-kb*`, and `ki-decision-records` contracts at field level; classify `repo_type`, `type`, `type_url`, and `decision_type` by current owner and collision.
- [ ] Write `GDR-KI-HARNESS-007` to choose one owner for universal Knowledge Base metadata, distinguish universal, collection-specific, and prohibited fields, and state how Decision Record metadata composes without a second classifier.
- [ ] Write `GDR-KI-HARNESS-008` to choose among explicit configuration, a canonical authority record, both, or no portable representation for principal role and cross-island authority.
- [ ] Update the Decision Records index in reveal order and verify that both records are self-contained, independently reconsiderable, and preserve `[skills.ki-repo].repo_type` unless the first decision explicitly changes it.
- [ ] Record the exact clean-cut migration consequences and capture separate implementation work; do not alter repository schemas, collections, or receiving repositories in this item.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-007-knowledge-base-metadata-authority.md`
- `docs/decisions/GDR-KI-HARNESS-008-principal-repository-authority.md`
- `docs/decisions/README.md`
- This work item
- A separate roadmap item only when an approved decision requires implementation

## Verify

- One owner is named for every shared metadata field and role claim.
- The selected schema has no contradictory required fields across `ki-repo`, `ki-repo-kb*`, and `ki-decision-records`.
- Migration scope, compatibility stance, and representative fixtures are explicit before any implementation begins.
- `ki repo audit --skill ki-decision-records --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The Decision Records, KB, and principal review records under `docs/reviews/KI-HARNESS-REV-001/` are available as the evidence baseline. This item blocks GOV-041 so the Specification decision does not rely on a Decision Record metadata contract that is simultaneously being reconsidered. It blocks dependent metadata and principal-role implementation, not the truthful checks already applied.

## Discussion

### Decision boundary

This is a governance choice, not a parser repair. Keeping the present exclusions is safer than making a local change that silently chooses one collection over another.
