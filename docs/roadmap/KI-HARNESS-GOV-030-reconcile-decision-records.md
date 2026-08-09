---
id: KI-HARNESS-GOV-030
title: Reconcile decision records
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
housekeeping-template: KI-HARNESS-HK-002
scheduled-for: 2026-08-09
---

## Goal

Leave one coherent, current decision-record surface in which active decisions are easy to find and obsolete or duplicated reasoning is explicitly reconciled.

## Context

Living Decision Records have been updated in place during recent contract migrations, while the estate also retains historical roadmap and trade records. The growing decision corpus needs a deliberate review for duplicate current decisions, stale supersession claims, and records whose actual status no longer matches their content.

## Boundary

Do not rewrite roadmap or trade history, delete a record merely because it is old, or collapse materially distinct decisions into a vague summary. Preserve durable reasoning and record any consolidation or retirement explicitly.

## Shaping

### Intended approach

Inventory decision records by owner, decision scope, current applicability, related records, and any stated supersession. Review potentially overlapping records against the current contract, then propose only evidence-backed in-place revisions, explicit links, or separately confirmed prune selections.

### Promotion conditions

Promote when the review criteria distinguish living current decisions from historical evidence, and the approach specifies how a proposed consolidation preserves each decision's reasoning and links.

## Current state

Decision Records are distributed across the estate with current contracts updated in place, while roadmap and trade artifacts intentionally retain historical wording. No current inventory distinguishes active decision authority from historical evidence or proves whether stated supersession relationships still match the live contract.

## Steps

- [ ] Define the review fields: repository, record identity and type, decision scope, current applicability, status, stated predecessor or successor, related current contract, and proposed disposition.
- [ ] Inventory only canonical Decision Record collections across the estate; classify roadmap items, trade records, generated publications, and unmarked historical notes as evidence outside this item's rewrite scope.
- [ ] Review every potentially overlapping or superseded current decision against its named contract and record whether to retain, add an explicit link, revise in place, or propose a separately approved prune.
- [ ] Capture receiver-owned follow-ups for any record change, consolidation, or collection cleanup; do not rewrite, delete, or renumber a Decision Record in this audit.
- [ ] Reconcile inventory totals with each inspected collection and review the proposed dispositions for preservation of distinct reasoning.

## Files touched

This roadmap item only, as the estate decision-record inventory and routing evidence. No Decision Record, roadmap item, trade record, or sibling repository file is changed.

## Verify

- Every inspected Decision Record collection and record has one inventory disposition.
- Every proposed consolidation names the preserved records, their reasoning relationship, and a receiving owner.
- Historical roadmap and trade evidence is classified but neither rewritten nor treated as a current Decision Record.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The inventory is read-only and independently reviewable. Any decision-content change requires its own owner review and explicit authority after this item.

## Discussion

### Current over chronological

The review should improve the current operating surface without pretending that past decisions did not happen. Historical records are evidence; active Decision Records are the current contract.
