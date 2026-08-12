---
id: KI-HARNESS-GOV-040
area: GOV
title: Resolve Knowledge Base authority
theme: governance-consistency
horizon: next
status: draft
blocks: []
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

## Steps

- [ ] Decide the owner for universal Knowledge Base frontmatter and which fields are universal, collection-specific, or prohibited.
- [ ] Decide how Decision Record metadata composes with that schema, including ownership of `type`, `type_url`, `decision_type`, and `repo_type`.
- [ ] Decide whether a principal role requires explicit configuration, a canonical authority record, both, or no portable representation.
- [ ] Define migration evidence for current collections and capture a separate implementation item only after the choices are approved.

## Files touched

- A Decision Record or equivalent canonical policy artifact
- This work item
- A follow-on migration item if the decision changes the current estate

## Verify

- One owner is named for every shared metadata field and role claim.
- The selected schema has no contradictory required fields across `ki-repo`, `ki-repo-kb*`, and `ki-decision-records`.
- Migration scope, compatibility stance, and representative fixtures are explicit before any implementation begins.

## Dependencies / blocks

Depends on the Decision Records, KB, and principal review records under `docs/reviews/KI-HARNESS-REV-001/`. It blocks dependent metadata and principal-role implementation, not the truthful checks already applied.

## Discussion

### Decision boundary

This is a governance choice, not a parser repair. Keeping the present exclusions is safer than making a local change that silently chooses one collection over another.
