---
id: KI-HARNESS-GOV-027
title: Adopt Specifications corpus
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 4f614a239891ee6e5ed335d59ddb0d5edef6dc05
---

## Goal

Replace Feature Definitions with one Specifications contract: `ki-specifications` governs the as-built, normative corpus in `docs/specs/`. The migration is a single current-state change across the estate, with no legacy skill name, directory, alias, redirect, compatibility switch, or transition period.

## Context

The present Feature Definitions contract already describes behaviour-level specifications: each requirement is normative, as-built, append-only, and has a verification hook. Its name and `docs/features/` root overstate one perspective of that contract. A specification can describe an external feature from a consumer's perspective or an internal architectural boundary; both are legitimate requirements in the same corpus.

Consumer-facing requirements must name observable public behaviour in language a product user can understand and verify at the public surface. Architectural requirements may state internal boundaries and invariants. The distinction affects judgment, wording, and verification evidence; it does not create two document types, duplicate requirement IDs, or turn the corpus into a feature-listing site.

The current contract conflicts with this model: `ki-feature-definitions` owns `docs/features/`, while GDR-KI-HARNESS-004 retires `docs/spec/` as a parallel documentation root. Three repositories currently declare the skill and carry thirty-two corpus files: ki-agentic-harness (6), tools-ki (13), and vallearmonia-website (13). The Harness's published skill copy, documentation site, evaluator fixtures, and the live tools-ki host also name the old capability.

## Boundary

This item changes the current operating contract, not historical evidence. New and current documentation, configuration, skill trees, checkers, publication surfaces, and corpus roots use only `ki-specifications` and `docs/specs/` when this work is complete. GDR-KI-HARNESS-004 and ADR-KI-HARNESS-SKILLS-008 are current living Decision Records and change in place with the contract. Roadmap items and trade records retain their original wording as history; they are not compatibility surfaces and must not be rewritten merely to erase a search result.

Do not retain `ki-feature-definitions`, `docs/features/`, `docs/spec/`, a forwarding directory, dual registration, an alias, or a migration flag. A repository is either on the Specifications contract or is not governed by it. Do not split public and architectural specifications into parallel corpora or make public-surface coverage a synthetic mechanical finding.

This item does not decide the separate disposition of `TRD-094f7987`, or send any work to tools-ki. A later, independently scoped trade may carry a tools-ki change once the Harness has evaluated it.

## Current state

The active corpus remains on the Feature Definitions contract in all three declared repositories. The Harness skill, its published copy, the tools-ki host, and current configuration resolve only `ki-feature-definitions`; the thirty-two corpus files remain beneath `docs/features/`. No compatibility path is being introduced while this item is shaped.

## Shaping

### Intended approach

First establish the Specifications contract by updating the two current Decision Records in place. Rename the skill and its checker-facing capability in the Harness, then migrate every active estate footprint in one coordinated pass: the three declared repositories, their `docs/specs/` corpora, configuration, published plugin copy, documentation site, evaluator fixtures, and tools-ki host support.

Keep every as-built requirement, identifier, RFC-2119 statement, verification hook, and Gap semantically unchanged unless a wording correction is independently justified. The migration changes the governed naming and placement, not the corpus's substantive claims. Update the standard's judgment guidance so public requirements are legible from the consumer's perspective and architecture requirements remain clear about their boundary and verification evidence.

### Current-state rule

This is deliberately a fast, breaking mechanical migration. Set the new contract as the only contract, move every active footprint immediately, and let a missed footprint fail its native audit rather than masking it with a fallback. The estate is privately controlled today; the purpose is to establish a clean contract before external adoption begins.

### Locked decisions

- The sole canonical capability is `ki-specifications`; its corpus root is `docs/specs/`.
- Public and architectural requirements share one normative corpus. Their differing audience changes the judgment review, not the directory layout or mechanical grammar.
- GDR-KI-HARNESS-004 and ADR-KI-HARNESS-SKILLS-008 are revised in place as living current decisions. Roadmap and trade history is not rewritten.
- The Harness and vallearmonia-website migrate first. tools-ki is changed last, after a fresh clean-tree check, because it is the live `ki` host.

### Promotion conditions

Promote only when the superseding decision and canonical names are fixed; the complete list of active footprints is confirmed; the three corpus moves preserve their requirement identities and content; and the host can audit the new capability without accepting either legacy name or root.

## Steps

- [ ] Rewrite GDR-KI-HARNESS-004 and ADR-KI-HARNESS-SKILLS-008 in place for the Specifications contract, preserving their role as current living decisions rather than adding a supersession chain.
- [ ] Rename the canonical Harness skill from `ki-feature-definitions` to `ki-specifications`, including its declared name, checker capability, standards, rubric, evaluator fixtures, and active references. Do not leave a compatibility alias.
- [ ] Move the Harness, tools-ki, and vallearmonia-website corpora from `docs/features/` to `docs/specs/`; update each index, internal link, and bare skill declaration in the same pass.
- [ ] Update the published skill copy, documentation site, and tools-ki host so they expose only `ki-specifications` and the `docs/specs/` contract.
- [ ] Add judgment guidance distinguishing consumer-facing observable behaviour from architectural boundaries without creating a separate corpus, requirement grammar, or automatic coverage score.
- [ ] Prove all thirty-two moved files preserve their requirement identities and substantive content, and run the new capability's audit in every declared repository.
- [ ] Search active operating surfaces for the retired skill name and roots; resolve every hit other than explicitly historical roadmap records and trades.

## Execution plan

1. In the Harness, update the two current decisions, move the canonical skill and `docs/features/` corpus, then change the declared skill, evaluator fixtures, active guidance, and skill map. Run focused source tests, TypeScript, Markdown, and direct corpus checks; do not create a legacy capability.
2. In vallearmonia-website, move the complete corpus to `docs/specs/`, update its declaration and active documentation or tests, then prove each requirement file's content and identifiers are unchanged apart from the path and terminology migration.
3. Re-check the tools-ki working tree immediately before touching it. If it is not clean, stop rather than mix this migration with its active work. If clean, update the host's resolved skill model, its corpus, configuration, tests, and active references as the final implementation lane.
4. Run the new hosted audit in all three repositories only after tools-ki supports the new name. Compare the pre-move and post-move corpus inventories, then search active surfaces for the retired name and roots.

## Stop conditions

Stop if a repository is no longer clean, a current Decision Record cannot be made coherent in place, a moved requirement changes substantively, the tools-ki host needs a compatibility alias to execute, or any audit would require a second active name or root. Resolve the issue within the new contract or escalate it; do not add a migration path.

## Files touched

The canonical skill under `skills/governance/ki-specifications/`, the Harness `docs/specs/` corpus, `.ki-config.toml`, current Decision Records, evaluator fixtures, skill-map and documentation surfaces, plus the corresponding active roots and declarations in tools-ki and vallearmonia-website. The published ki-plugins copy changes only as the normal result of publishing the renamed canonical skill.

## Verify

`ki repo audit --skill ki-specifications` passes in the Harness, tools-ki, and vallearmonia-website. Their corpus inventories prove the same thirty-two requirements files and append-only IDs survived the root move, with no accidental substantive rewrite.

The tools-ki host rejects `ki-feature-definitions` and recognises only `ki-specifications`. An active-surface search finds no `docs/features/`, `docs/spec/`, or `ki-feature-definitions` footprint outside intentionally historical roadmap and trade records. Repository test and TypeScript gates pass where source changes occur.

## Dependencies / blocks

Nothing external blocks this work. The superseding decision and the new canonical names are part of this item's shaping, not a transition dependency.

## Discussion

### Why Specifications rather than features

The existing requirement shape is a specification: it says what a system does now and how that claim is checked. Calling the corpus Features makes public product behaviour appear to be its sole concern, even though internal operating and architectural boundaries are equally contractual.

### Why no migration path

Keeping the old root or skill name would create two apparent contracts at exactly the point the estate should establish one clear public standard. A private, controlled estate can absorb the breaking move now; every missed footprint should surface as an error to fix, not as a compatibility case to carry forward.
