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

[GDR-KI-HARNESS-004](../decisions/GDR-KI-HARNESS-004-four-doc-repository-documentation-ownership.md) establishes the four-document split, and the Guides and Feature Definitions standards repeat it, but `ki-repo` does not yet own the non-KB physical topology. `ki-guides` does not route a procedure that relies on stable behaviour to an absent or incomplete Feature Definitions corpus, and the roadmap execution contract has no mechanically required documentation-impact section.

## Steps

- [ ] Make `ki-repo` the topology owner for non-KB `docs/decisions/`, `docs/features/`, `docs/guides/`, and `docs/roadmap/`, while keeping each category optional until its specialist skill is declared and avoiding duplicate specialist checks.
- [ ] Add a `ki-repo` judgment criterion that checks whether durable material is routed to the correct authority without treating an absent optional category as drift.
- [ ] Strengthen `ki-guides` AUDIT, CONFORM, and judgment guidance so a guide links to an existing Feature Definition when it relies on stable behaviour, or routes an actual contract gap to `ki-feature-definitions` without requiring a corpus for unrelated guides.
- [ ] Align the Feature Definitions topology wording with the `ki-repo` owner while preserving its flat area, requirement, and Gaps contracts unchanged.
- [ ] Add `## Documentation impact` to the immediate roadmap shape, with explicit Decision Record, Feature Definition, Guide, and roadmap outcomes or justified non-applicability; check section presence mechanically and assessment truth by judgment.
- [ ] Update the roadmap evidence parser and fixtures, then migrate every retained Now or Next item to the new section without changing its horizon, status, or delivery scope.
- [ ] Regenerate the four affected rubric publications once and run focused and aggregate verification.

## Files touched

- `skills/keystone/ki-repo/{SKILL.md,references/standards-repository.md}`
- `skills/keystone/ki-repo/scripts/rubric/items/{index,documentation}.ts` and `references/rubric.md`
- `skills/governance/ki-guides/{SKILL.md,references/standards-guides.md,references/mode-audit.md,references/mode-conform.md}`
- `skills/governance/ki-guides/scripts/rubric/items/routing.ts`, its catalogue test, and `references/rubric.md`
- `skills/governance/ki-feature-definitions/{SKILL.md,references/standards-feature-definitions.md}` and its generated publication only if its catalogue wording changes
- `skills/change-management/ki-roadmap/references/{standards-repository-roadmaps,standards-work-item-format}.md`
- `skills/change-management/ki-roadmap/scripts/rubric/contexts/roadmap-evidence.ts`
- `skills/change-management/ki-roadmap/scripts/rubric/items/{plans,index.test}.ts` and `references/rubric.md`
- Retained `docs/roadmap/*.md` records at `horizon: now` or `horizon: next`

## Verify

- `bunx vitest run skills/keystone/ki-repo/scripts/rubric/items/index.test.ts skills/governance/ki-guides/scripts/rubric/items/index.test.ts skills/governance/ki-feature-definitions/scripts/rubric/items/index.test.ts skills/change-management/ki-roadmap/scripts/rubric/items/index.test.ts`
- A roadmap fixture without `## Documentation impact` fails the mechanical gate; one with the section passes even though the four assessments remain judgment-reviewed.
- Guide fixtures preserve independent use: a procedure with no stable-behaviour dependency does not require Feature Definitions, while a dependent procedure is routed to the existing corpus or a named gap.
- `ki dev skill rubric ki-repo`, `ki dev skill rubric ki-guides`, `ki dev skill rubric ki-feature-definitions`, and `ki dev skill rubric ki-roadmap`
- `ki repo audit --skill ki-repo --repo .`, `ki repo audit --skill ki-guides --repo .`, `ki repo audit --skill ki-feature-definitions --repo .`, and `ki repo audit --skill ki-roadmap --repo .`
- `bun run test`, then `bunx tsc --noEmit`

## Dependencies / blocks

The accepted repository-governance work supplied the canonical non-KB repository-kind signal; its retained record has now been pruned. This work must preserve specialist-skill ownership and the independent usability of all four skills. All implementation is local to this repository; trade records remain evidence, sibling repositories remain read-only, and fleet documentation migration requires separate receiver-owned work.

## Delegation

The orchestrator first fixes the topology ownership and exact `## Documentation impact` template. After that gate, one bounded worker may update Guides and Feature Definitions wording, while another updates the roadmap contract, parser, fixtures, and retained immediate records. Keep `ki-repo` catalogue integration and all generated publications with the orchestrator to avoid shared-file conflicts. The orchestrator reviews the cross-skill boundary, generates publications once, and runs the final audits and full gates.

## Discussion

### Consolidated sources

This item adopts [TRD-6f63fb71](../../+/_TRADES/knowledgeislands/tools-ki/TRD-6f63fb71.md) and [TRD-24095e01](../../+/_TRADES/knowledgeislands/tools-ki/TRD-24095e01.md).

### Documentation-impact shape

The immediate-work section should use four explicit entries: **Decision records**, **Feature Definitions**, **Guides**, and **Roadmap**. Each names the file or behaviour to update, or says why that authority is not applicable. The checker proves only that the section exists in the required order; review decides whether all four assessments are truthful and whether a proposed documentation change belongs to the named owner.

### Ownership model

`ki-repo` owns which top-level documentation concerns exist and when the non-KB topology applies. Each specialist skill continues to own its own directory, authored shape, and rubric. `ki-authoring` governs writing and knowledge-placement judgment across those files; it does not acquire a fifth documentation category.
