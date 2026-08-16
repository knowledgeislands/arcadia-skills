---
id: KI-HARNESS-GOV-040
area: GOV
title: Resolve Knowledge Base authority
theme: governance-consistency
horizon: next
status: done
blocks: [KI-HARNESS-GOV-041, KI-HARNESS-GOV-043]
blocked_by: []
baseline_ref: 1219075b4d375be45c1b70d64a358b1b906dd343
---

## Goal

Choose one ownership and metadata contract for Knowledge Bases, Decision Records, and principal repositories.

## Context

`KI-HARNESS-REV-001` found three connected unresolved claims. `ki-repo-kb` called `type` a universal sole classifier while Activities and other collections used exceptions. `ki-decision-records` independently described a conflicting `type` and `type_url` shape. `ki-repo` exclusively owns `repo_type`, while principal-repository checks needed an explicit authority source without a competing configuration schema.

The review correctly made local checks truthful without selecting a policy. A decision is now needed before migration or further checker changes can safely proceed.

## Boundary

Set the authority contract and its local enforcement only. Do not rewrite existing Knowledge Base collections, introduce a second classifier, infer a principal role from prose, or change a receiving repository without a separately approved migration item.

## Current state

`GDR-KI-HARNESS-007` now names one owner for each shared field and principal authority claim. The skill contracts, templates, rubrics, and mechanical Decision Record conformer implement that policy. Separate estate migration remains GOV-043; it is not part of this item.

## Steps

- [x] Inventory representative Arcadia and Techne principal records plus the current `ki-repo`, `ki-repo-kb*`, and `ki-decision-records` contracts at field level; classify `repo_type`, `type`, `type_url`, and `decision_type` by current owner and collision.
- [x] Write one consolidated `GDR-KI-HARNESS-007` to assign universal Knowledge Base, Decision Record, and principal-authority ownership without a second classifier or authority schema.
- [x] Update the Decision Records index in reveal order and verify that the consolidated record is self-contained, independently reconsiderable, and preserves `[skills.ki-repo].repo_type`.
- [x] Apply the decision to the local KB and Decision Record contracts, templates, rubrics, and safe scalar conformer.
- [x] Record the exact migration consequence in GOV-043 without altering receiving repositories in this item.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-007-document-metadata-and-principal-authority.md`
- `docs/decisions/README.md`
- `skills/repo-structure/ki-repo-kb/`
- `skills/governance/ki-decision-records/`
- This work item
- `docs/roadmap/KI-HARNESS-GOV-043-conform-decision-record-normalisation.md`

## Verify

- One owner is named for every shared metadata field and role claim.
- The selected schema has no contradictory required fields across `ki-repo`, `ki-repo-kb*`, and `ki-decision-records`.
- Migration scope, compatibility stance, and representative fixtures are explicit before any estate migration begins.
- `ki repo audit --skill ki-decision-records --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The Decision Records, KB, and principal review records under `docs/reviews/KI-HARNESS-REV-001/` are available as the evidence baseline. This item blocks GOV-041 so the Specification decision does not rely on a Decision Record metadata contract that is simultaneously being reconsidered. It blocks dependent metadata and principal-role implementation, not the truthful checks already applied.

## Documentation impact

### Decision Records

This work delivers GDR-KI-HARNESS-007, recording the selected metadata and principal-authority policy.

### Specifications

No behaviour-level product specification is changed by the decision-only delivery.

### Guides

No contributor guide change is planned until a follow-on migration adopts the selected policy.

### Roadmap

The decision unblocks GOV-041 and GOV-043. GOV-043 owns the separate estate migration and Decision Record normalisation work.

## Review

### Delivered

The approved metadata-authority decision was delivered from immutable baseline `1219075b4d375be45c1b70d64a358b1b906dd343`. `fd1925db8eeb37adf298dc3bfc1ff4e3ab7b0b37` implements the policy, and `98e7b896ffd39dd9af0f317033a6514b7a87f89c` adds the safe Decision Record conformer. Estate migration is deliberately separated into GOV-043.

### Summary of changes

`GDR-KI-HARNESS-007` and the Decision Records index establish the consolidated decision. `ki-repo-kb` now uses `note_type` as the generic KB classifier, while `ki-decision-records` uses `decision_type` and `decision_type_url` and prohibits generic `type` and `type_url`. `ki-repo` retains `repo_type` ownership. Principal authority is a canonical governance Decision Record, not a portable configuration schema. The affected KB templates, standards, exemplars, rubric context and item tests, plus the Decision Record standard, rubric, context, frontmatter item, conform-mode guidance, and focused tests, were updated in the two cited commits.

### Verification

The implementation commits passed their focused KB and Decision Record tests, `bunx tsc --noEmit`, generated-rubric publication, and Decision Record and authoring audits. This review packet additionally requires a current roadmap audit and Markdown lint of this updated record.

### Outstanding concerns

No policy or local-enforcement concern remains. GOV-043 separately owns estate migration; its completion is not required for this decision to be reviewed.

### Post-change review

The delivered policy matches the approved boundary: each field and authority claim has one owner, no principal configuration schema was introduced, and no receiving repository was changed here. The scope extension to local enforcement is consistent with making the selected policy actionable; the separate migration boundary remains intact. The acceptance conditions are met and the item is ready for human review.

### Mini recap

GOV-040 resolves the KB/Decision Record/principal-authority collision and provides the safe local contract. Verification is recorded above; GOV-043 is the only follow-on for estate normalisation. No new durable learning is proposed beyond the governing GDR and updated skill standards.

## Done

Accepted on 2026-08-16.

The metadata-authority policy and local enforcement are complete; GOV-043 remains the separate estate-normalisation follow-on.

## Discussion

### Decision boundary

This is a governance choice, not a parser repair. Keeping the present exclusions is safer than making a local change that silently chooses one collection over another.
