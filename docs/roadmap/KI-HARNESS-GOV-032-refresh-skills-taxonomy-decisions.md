---
id: KI-HARNESS-GOV-032
title: Refresh skills taxonomy decisions
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Restore two current Harness skills-taxonomy Decision Records to their current, mechanically valid state.

## Context

GOV-030 found that `ADR-KI-HARNESS-SKILLS-008` has a filename that abbreviates, rather than slugifies, its current title. It also found that `ADR-KI-HARNESS-SKILLS-006` presents an exhaustive list of change-management process skills but omits the newly added `ki-agenda`.

## Boundary

Update only the two identified living Decision Records and their exact local citations or index entry. Do not revise historical roadmap or trade records, rename unrelated files, alter decision scope, or create a supersession chain.

## Current state

The native Decision Records audit fails only on the ADR-008 filename. The current taxonomy list needs the agenda addition for truthful present-state reading, but that omission is judgmental rather than a mechanical audit failure.

## Steps

- [ ] Rename ADR-008 to `ADR-KI-HARNESS-SKILLS-008-a-specifications-skill-for-the-what.md` and update its exact local citations in ADR-009, GDR-004, and the Decision Records index.
- [ ] Update ADR-006's process-skill taxonomy list to include `ki-agenda` without changing its architectural decision.
- [ ] Run focused Decision Records, roadmap, and authoring audits; inspect the rename diff and every changed citation.

## Files touched

- `docs/decisions/ADR-KI-HARNESS-SKILLS-006-concern-first-skill-taxonomy-and-implication-graph.md`
- ADR-008, its renamed canonical filename, `docs/decisions/README.md`, and exact local citations
- This roadmap item

## Verify

- `ki repo audit --skill ki-decision-records --repo .` passes.
- Every former ADR-008 link resolves to the canonical renamed file.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This item is independently shapeable and carries GOV-030's evidence. It does not require or authorise any sibling-repository Decision Record change.

## Shaping

### Delivery design

The ADR-008 filename will be corrected with a single Git rename, preserving its ID, title, date, status, and body. The cited files are the only local links to retarget. ADR-006 will receive the one missing process name in its present-tense current taxonomy list; it will not reinterpret the decision, rename another skill, or change any historical record.

### Promotion conditions

The bounded file set, target filename, citation inventory, and no-scope-expansion rule are now explicit. The item is ready for an implementation review once this plan is approved.

## Discussion

### Living currentness

The records are refreshed in place because a Decision Record describes the current decision. The archived handoff doctrine remains separate historical evidence.
