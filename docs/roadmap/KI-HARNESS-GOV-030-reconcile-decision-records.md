---
id: KI-HARNESS-GOV-030
title: Reconcile decision records
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked-by: []
baseline-ref: c9cc2443f78562529378d3634b42176389ed903f
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

- [x] Define the review fields: repository, record identity and type, decision scope, current applicability, status, stated predecessor or successor, related current contract, and proposed disposition.
- [x] Inventory only canonical Decision Record collections across the estate; classify roadmap items, trade records, generated publications, and unmarked historical notes as evidence outside this item's rewrite scope.
- [x] Review every potentially overlapping or superseded current decision against its named contract and record whether to retain, add an explicit link, revise in place, or propose a separately approved prune.
- [x] Capture receiver-owned follow-ups for any record change, consolidation, or collection cleanup; do not rewrite, delete, or renumber a Decision Record in this audit.
- [x] Reconcile inventory totals with each inspected collection and review the proposed dispositions for preservation of distinct reasoning.

## Inventory

| Collection | Records | Result | Disposition |
| --- | ---: | --- | --- |
| `ki-agentic-harness` `docs/decisions/` | 40 | One filename does not match its current title slug | Route GOV-032; no record body changes in this audit |
| `ki-arcadia-principal` `Admin/Governance/Decisions/` | 10 | Native audit passes | Retain |
| `ki-specifications` `docs/decisions/` | 2 | Native audit passes | Retain |
| `ki-techne-principal` `Admin/Governance/Decisions/` | 1 | Native audit passes | Retain |
| `ki-website` `docs/decisions/` | 2 | Native audit passes | Retain |
| `tools-ki` `docs/decisions/` | 4 | Native audit passes | Retain |

The estate has 59 canonical Decision Records: 58 `current` and one `archive`. The only repeated identifier, `GDR-KI-FUNDAMENTALS-001`, has six copies. Every copy declares `shared_record: true` and the same SHA-256 digest, so it is a deliberate shared record rather than a duplicate local decision.

The archived `ADR-KI-HARNESS-SKILLS-005` explicitly preserves the retired handoff doctrine as historical evidence and is not a current-contract conflict. Current records contain no unmarked supersession chain or duplicate identifier. Two Harness-local records need a separately reviewed refresh: `ADR-KI-HARNESS-SKILLS-008` needs its filename aligned to its title, and `ADR-KI-HARNESS-SKILLS-006` needs its exhaustive process-skill list to include `ki-agenda`. Both are routed to GOV-032.

## Files touched

This roadmap item and the separately owned GOV-032 follow-up. No Decision Record, trade record, or sibling repository file is changed.

## Verify

- Every inspected Decision Record collection and record has one inventory disposition.
- Every proposed consolidation names the preserved records, their reasoning relationship, and a receiving owner.
- Historical roadmap and trade evidence is classified but neither rewritten nor treated as a current Decision Record.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The inventory is read-only and independently reviewable. Any decision-content change requires its own owner review and explicit authority after this item.

## Review

### Delivered

Completed a six-collection, estate-wide inventory of canonical Decision Records, verified the shared fundamentals record, and routed the two current Harness refreshes to GOV-032.

### Summary of changes

The result is evidence and one receiver-owned follow-up only. It does not rewrite, delete, renumber, or reclassify a Decision Record, roadmap item, trade record, generated publication, or sibling repository file.

### Verification

- Inventory reconciles to 59 records: 58 `current`, one `archive`, across six canonical collections.
- All six fundamentals copies declare `shared_record: true` and share SHA-256 `ff8eb4e10d60775afa30389d6d743862783a1c64066f4b47a613fed70e033691`.
- Native `ki-decision-records` audits pass in Arcadia Principal, KI Specifications, KI Techne Principal, KI Website, and tools-ki. The Harness audit isolates the routed filename finding.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass before review publication.

### Outstanding concerns

Semantic currentness remains a human judgment. The inventory identified no reason to collapse distinct decisions, and it intentionally did not infer a rewrite from similar terminology or historical retirement prose.

### Post-change review

The review preserves the living-record standard for current decisions and the evidentiary value of archived material. GOV-032 is limited to the two identified Harness records and must still receive its own owner review.

### Mini recap

One native audit per collection and one byte-level check for the shared record were sufficient; broad rewrite or repo-wide conform work was neither needed nor authorised.

## Done

Accepted on 2026-08-09 by explicit user approval. GOV-032 owned and delivered the two identified Harness Decision Record refreshes.

## Discussion

### Current over chronological

The review should improve the current operating surface without pretending that past decisions did not happen. Historical records are evidence; active Decision Records are the current contract.
