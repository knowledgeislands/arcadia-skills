---
id: KI-HARNESS-GOV-016
title: Govern documentation topology
area: GOV
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: 4b566140fd2b645f4c0075b2dfc98c4572817a7b
---

## Goal

Make the shared documentation topology clear so repository authors can place decision, feature, guide, and roadmap material consistently without duplicating authority.

## Context

The imported documentation submissions establish a useful division: decisions explain why, Specifications state observable behaviour, guides explain how, and roadmap items explain planned change. The repository shape needs to name that topology while specialist skills retain content ownership.

## Boundary

Do not require every repository to create every documentation category, make guides restate feature contracts, or make `ki-guides` own the full repository topology.

## Current state

[GDR-KI-HARNESS-004](../decisions/GDR-KI-HARNESS-004-four-doc-repository-documentation-ownership.md) establishes the four-document split, and the Guides and Specifications standards repeat it, but `ki-repo` does not yet own the non-KB physical topology. `ki-guides` does not route a procedure that relies on stable behaviour to an absent or incomplete Specifications corpus, and the roadmap execution contract has no mechanically required documentation-impact section.

## Steps

- [x] Make `ki-repo` the topology owner for non-KB `docs/decisions/`, `docs/specs/`, `docs/guides/`, and `docs/roadmap/`, while keeping each category optional until its specialist skill is declared and avoiding duplicate specialist checks.
- [x] Add a `ki-repo` judgment criterion that checks whether durable material is routed to the correct authority without treating an absent optional category as drift.
- [x] Strengthen `ki-guides` AUDIT, CONFORM, and judgment guidance so a guide links to an existing Specification when it relies on stable behaviour, or routes an actual contract gap to `ki-specs` without requiring a corpus for unrelated guides.
- [x] Align the Specifications topology wording with the `ki-repo` owner while preserving its flat area, requirement, and Gaps contracts unchanged.
- [x] Add `## Documentation impact` to the immediate roadmap shape, with explicit Decision Record, Specification, Guide, and roadmap outcomes or justified non-applicability; check section presence mechanically and assessment truth by judgment.
- [x] Update the roadmap evidence parser and fixtures, then migrate every retained Now or Next item to the new section without changing its horizon, status, or delivery scope.
- [x] Regenerate the four affected rubric publications once and run focused and aggregate verification.

## Files touched

- `skills/keystone/ki-repo/{SKILL.md,references/standards-repository.md}`
- `skills/keystone/ki-repo/scripts/rubric/items/{index,documentation}.ts` and `references/rubric.md`
- `skills/governance/ki-guides/{SKILL.md,references/standards-guides.md,references/mode-audit.md,references/mode-conform.md}`
- `skills/governance/ki-guides/scripts/rubric/items/routing.ts`, its catalogue test, and `references/rubric.md`
- `skills/governance/ki-specs/{SKILL.md,references/standards-specs.md}` and its generated publication only if its catalogue wording changes
- `skills/change-management/ki-change-management-roadmap/references/{standards-repository-roadmaps,standards-work-item-format}.md`
- `skills/change-management/ki-change-management-roadmap/scripts/rubric/contexts/roadmap-evidence.ts`
- `skills/change-management/ki-change-management-roadmap/scripts/rubric/items/{plans,index.test}.ts` and `references/rubric.md`
- Retained `docs/roadmap/*.md` records at `horizon: now` or `horizon: next`

## Verify

- `bunx vitest run skills/keystone/ki-repo/scripts/rubric/items/index.test.ts skills/governance/ki-guides/scripts/rubric/items/index.test.ts skills/governance/ki-specs/scripts/rubric/items/index.test.ts skills/change-management/ki-change-management-roadmap/scripts/rubric/items/index.test.ts`
- A roadmap fixture without `## Documentation impact` fails the mechanical gate; one with the section passes even though the four assessments remain judgment-reviewed.
- Guide fixtures preserve independent use: a procedure with no stable-behaviour dependency does not require Specifications, while a dependent procedure is routed to the existing corpus or a named gap.
- `ki dev skill rubric ki-repo`, `ki dev skill rubric ki-guides`, `ki dev skill rubric ki-specs`, and `ki dev skill rubric ki-change-management-roadmap`
- `ki repo audit --skill ki-repo --repo .`, `ki repo audit --skill ki-guides --repo .`, `ki repo audit --skill ki-specs --repo .`, and `ki repo audit --skill ki-change-management-roadmap --repo .`
- `bun run test`, then `bunx tsc --noEmit`

## Dependencies / blocks

The accepted repository-governance work supplied the canonical non-KB repository-kind signal; its retained record has now been pruned. This work must preserve specialist-skill ownership and the independent usability of all four skills. All implementation is local to this repository; trade records remain evidence, sibling repositories remain read-only, and fleet documentation migration requires separate receiver-owned work.

## Documentation impact

### Decision Records

GDR-KI-HARNESS-004 remains authoritative; this work makes its four-concern ownership model executable without changing the decision.

### Specifications

The topology clarifies where Specifications belong but does not alter any behaviour-level contract.

### Guides

Guides gain explicit routing for stable behaviour and missing Specification gaps while retaining ownership of human-oriented guidance.

### Roadmap

Immediate work records gain an explicit four-concern documentation-impact statement, so follow-on documentation work is visible without becoming a fifth category.

## Delegation

The orchestrator first fixes the topology ownership and exact `## Documentation impact` template. After that gate, one bounded worker may update Guides and Specifications wording, while another updates the roadmap contract, parser, fixtures, and retained immediate records. Keep `ki-repo` catalogue integration and all generated publications with the orchestrator to avoid shared-file conflicts. The orchestrator reviews the cross-skill boundary, generates publications once, and runs the final audits and full gates.

### Locked decisions

- `ki-repo` owns non-Knowledge-Base topology and durable documentation-routing judgment; `ki-guides`, `ki-specs`, and the roadmap adapter retain their specialised content and lifecycle boundaries.
- The work establishes a four-concern documentation-impact model only: Decision Records, Specifications, Guides, and Roadmap. It neither adds a fifth documentation category nor changes feature contracts.
- Sibling repositories, externally owned trade records, and fleet migrations remain read-only evidence; no receiver repository is modified.

### Escalate

Return to the coordinator before changing Decision Record policy, Specification identity, roadmap lifecycle semantics beyond the approved documentation-impact shape, shared rubric-host behaviour, or any file outside the stated lane. Stop on a contradictory existing owner contract or a required external-repository change.

### Worker: guides-specs

- **Deliverable:** Bounded Guides and Specifications wording plus focused rubric updates that route durable documentation to their owners without changing topology ownership.
- **Inputs:** This record, `GDR-KI-HARNESS-004`, current `ki-guides` and `ki-specs` standards, rubrics, contexts, tests, and generated publications.
- **Scope:** `skills/governance/ki-guides/` and `skills/governance/ki-specs/` only.
- **Authority:** Edit only the named skill roots, regenerate only their rubric publications, and add focused tests where the approved documentation-routing rule needs mechanical evidence.
- **Isolation:** Do not edit `ki-repo`, roadmap-adapter, root documentation, other skill roots, external repositories, or Git state.
- **Verify:** Focused Guides and Specifications tests, their rubric-publication parity, relevant focused audits, and formatting checks.
- **Return:** Changed files, rule/ownership summary, exact checks, and every unresolved or escalated issue; do not stage or commit.
- **Checkpoint:** Return after both skill roots are internally consistent, or immediately on an ownership or scope conflict.

### Worker: roadmap-impact

- **Deliverable:** The approved roadmap documentation-impact shape, parser evidence, fixtures, and generated publication for immediate work records.
- **Inputs:** This record, current roadmap standards, context, item catalogue, tests, and generated rubric.
- **Scope:** `skills/change-management/ki-change-management-roadmap/` only.
- **Authority:** Edit only the named adapter root and regenerate only its rubric publication. Preserve existing horizon, status, identity, dependency, and lifecycle semantics except for the locked documentation-impact rule.
- **Isolation:** Do not edit `ki-repo`, Guides, Specifications, root roadmap records, external repositories, or Git state.
- **Verify:** Focused roadmap tests, rubric-publication parity, focused roadmap audit, and formatting checks.
- **Return:** Changed files, exact parsed rule and refusal cases, checks, and every unresolved or escalated issue; do not stage or commit.
- **Checkpoint:** Return after the adapter root is internally consistent, or immediately on a lifecycle or ownership conflict.

## Review

### Delivered

The four durable non-KB documentation concerns now have explicit topology and specialist ownership, and immediate work records carry a structured documentation-impact statement.

### Summary of changes

`ki-repo` adds the topology judgment criterion and its dedicated standard.

`ki-guides` and `ki-specs` clarify their routing boundary.

The roadmap adapter adds structural `EXEC-4` evidence for ordered, non-empty Decision Records, Specifications, Guides, and Roadmap statements in Now and Next records.

The current immediate records now meet that shape.

### Verification

`bun run test`, `bunx tsc --noEmit`, focused audits for `ki-repo`, `ki-guides`, `ki-specs`, `ki-change-management-roadmap`, `ki-authoring`, and `ki-delegation`, generated-rubric parity, and `git diff --check` pass.

### Outstanding concerns

This is a structural routing contract, not a corpus migration or a judgment that each documentation-impact statement is substantively correct.

Receiver-owned documentation changes in sibling repositories remain outside this repository's authority.

### Post-change review

Review future immediate records for concise, truthful non-applicability statements rather than boilerplate.

### Mini recap

GOV-016 made the existing four-concern decision executable across repository topology, human guides, specifications, and forward-work records without creating a fifth documentation category.

## Done

Approved on 2026-08-15 after review of the committed implementation and verification evidence.

## Discussion

### Consolidated sources

This item adopts `TRD-6f63fb71` and `TRD-24095e01`.

### Documentation-impact shape

The immediate-work section should use four explicit entries: **Decision Records**, **Specifications**, **Guides**, and **Roadmap**. Each names the file or behaviour to update, or says why that authority is not applicable. The checker proves only that the section exists in the required order; review decides whether all four assessments are truthful and whether a proposed documentation change belongs to the named owner.

### Ownership model

`ki-repo` owns which top-level documentation concerns exist and when the non-KB topology applies. Each specialist skill continues to own its own directory, authored shape, and rubric. `ki-authoring` governs writing and knowledge-placement judgment across those files; it does not acquire a fifth documentation category.
