---
id: KI-HARNESS-GOV-009
title: Make audits conformable
area: GOV
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make governance rubrics explicit about the relationship between what AUDIT detects and what CONFORM can safely repair, so most deterministic violations have an idempotent conform path and every exception has a visible reason.

## Context

The current two-aspect model classifies each rubric criterion as mechanical, judgmental, or hybrid. That describes how a criterion is evaluated, but it does not describe whether a finding is safely repairable. In the shared rubric contract, a mechanical aspect always has an audit action and may have a conform action; the absence of that optional action does not distinguish unfinished automation from a deliberate safety, authority, or information boundary.

The Harness effectiveness review repeatedly found that clean mechanical audits can coexist with unresolved semantic or outcome questions. That distinction must remain intact. Improving audit/conform symmetry must not turn judgment into a synthetic finding, weaken a useful audit because it is hard to repair, or treat a proposed write as safe without containment, preservation, idempotence, and post-audit evidence.

The former scope of this item supplied the clearest concrete example: runtime coverage audit deterministically identifies missing governance tables and managed discovery links, but recovery is decomposed into manual `ki repo skill add` calls even though the required mapping and safeguards already exist. That case is now the first proof point within the wider rubric-repairability contract.

## Boundary

Keep evaluation method, audit execution, remediation path, and finding outcome as separate concepts. Do not mechanically rewrite judgment-led content, infer supported runtimes or other undeclared policy, mutate user-owned or unmanaged configuration, remove an audit merely to improve a conformance ratio, or present an external or unavailable repair as locally conformable.

The Harness owns criterion policy, focused evidence, safe draft capabilities, and the shared compile-time rubric contract. `tools-ki` continues to own generic execution, dry-run and publication safety, finding conversion, reporting, and post-CONFORM audit. Route any required host change to that repository without writing it directly or making receiver acceptance part of local authority.

## Current state

Structured rubric items already separate mechanical and judgment aspects, and the host safely derives `FIXED` only after a conform action and clean re-audit. Mechanical items without a conform action still participate in AUDIT, but neither the catalogue nor generated rubric says why they are report-only. Reviewers therefore cannot tell whether missing conformance is intentional, unsafe, externally owned, or simply unfinished, and the repository has no measure of audit-to-conform coverage.

The existing runtime-coverage criterion `RUNTIMES-2` derives the required capabilities from declared `supported_runtimes`; the managed `ki repo skill add` path already contains the relevant trust and link safeguards. Its missing single-run CONFORM path remains in scope, now as one representative test of the general model rather than a standalone roadmap item.

The shaping baseline is a multidimensional classification, not a replacement for the mechanical/judgment distinction:

- **Evaluation** distinguishes mechanical, judgment, and hybrid evidence.
- **Audit coverage** distinguishes host-executed checks from explicit review-only prompts.
- **Remediation** distinguishes safe deterministic conformance, reviewer-confirmed assistance, manual or external repair, and intentionally non-remedial information.
- **Outcome** remains the host result vocabulary and violation severity; it does not imply how a finding may be fixed.

The exact remediation vocabulary, allowed combinations, denominator, and target must be approved during planning. At minimum, every mechanically detected violation must either declare a conform path or an explicit non-conformability reason, and the measured result must not hide judgment or exclude difficult checks to make the ratio look better.

## Steps

- [ ] Inventory every structured rubric item and relevant effectiveness-review finding by evaluation aspect, audit execution, possible violation, current conform action, write boundary, verification, and reason for any missing repair path.
- [ ] Define the canonical remediation vocabulary, allowed combinations, and coverage measure; state which local deterministic violations should be conformable by default and which safety, authority, external-state, ambiguity, or information boundaries justify an exception.
- [ ] Update the rubric-authoring standard, shared type contract, catalogue validation, and generated publication so repairability and explicit exceptions are reviewable without duplicating criterion policy or inventing judgment findings.
- [ ] Prove the contract in `ki-skills`, including fixtures for safe conform, deliberate report-only mechanics, hybrid criteria, reviewer-confirmed assistance, malformed metadata, dry-run, repeat idempotence, byte preservation, and clean post-audit derivation of `FIXED`.
- [ ] Add high-confidence missing conform actions where the local deterministic evidence and bounded draft capability already exist; retain every non-conformable item with a named reason and owner rather than a vague manual fallback.
- [ ] Carry the former runtime-coverage work through the new model: preserve the declared-runtime mapping and existing trust safeguards, specify the exact single-run repair, and route any receiver-owned host implementation and two-runtime fixtures through one immutable `tools-ki` work submission.
- [ ] Publish baseline and post-change audit-to-conform coverage, then route genuinely distinct owner work without creating one roadmap item per rubric finding.

## Files touched

- `skills/keystone/ki-skills/references/standards-rubric-authoring.md`
- `skills/keystone/ki-skills/scripts/shared/rubric.ts` and its focused tests
- `skills/keystone/ki-skills/scripts/rubric/` catalogue, contexts, fixtures, and generated publication
- Other governance-skill rubric items, contexts, tests, and generated publications only where the approved inventory adds an explicit classification or a proven safe conform action
- One outbound `tools-ki` work trade if generic host validation, reporting, or runtime-coverage execution must change
- This work item

No peer-repository source, user runtime settings, unmanaged configuration, bulk estate conformance, or unrelated rubric policy is in scope.

## Verify

- Every rubric item still has a mechanical aspect, a judgment aspect, or both, and every mechanical aspect retains an AUDIT action.
- Every mechanical violation-producing path either has a tested conform action or publishes one canonical non-conformability category and a specific reason.
- Coverage evidence reports the complete denominator, conformable count, exception count by reason, and judgment count before and after the change; no criterion disappears merely because it is difficult to repair.
- Safe conform fixtures prove bounded dry-run proposals, containment and symlink refusal, preservation of unrelated bytes, repeat idempotence, and `FIXED` only after a clean re-audit.
- Runtime coverage for a repository declaring both Claude Code and Codex has an exact proposal for its missing repository-owned tables and managed links while user and unmanaged settings remain untouched; ambiguous, incompatible, unavailable, or untrusted sources fail closed.
- Focused shared-rubric and affected catalogue tests, generated-rubric parity, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, `ki repo audit --skill ki-authoring --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The current structured rubric, host-gated CONFORM lifecycle, and effectiveness review provide the evidence baseline. The local classification and safe action work can proceed independently. Generic host changes and the runtime-coverage executor remain owned by `tools-ki`; a submitted trade records that receiver boundary but grants no priority, implementation, or acceptance authority.

This broader scope returns GOV-009 from Ready to Draft while it is shaped in Now. It becomes Ready only after the remediation vocabulary, complete inventory method, measurable target, initial conformer set, host boundary, and verification plan are reviewed together.

## Discussion

### Audit and conform symmetry

The desired default is not that every finding is automatically rewritten. It is that every deterministic local violation is designed with repairability in mind, and that absence of a conformer is an explicit policy decision rather than an invisible omission. Audit coverage remains valuable even when a safe repair is impossible.

### Consolidated runtime coverage

The previous GOV-009 runtime-coverage scope is preserved here rather than retained as a narrower duplicate. It is a strong first case because the audit already owns a deterministic mapping and the existing managed-link command already owns the principal safety checks. A clearer audit message alone would improve usability but would leave avoidable partial manual recovery in place.

### Related records kept separate

`KI-HARNESS-OPS-004` remains a read-only estate conformance review: it classifies dry-run proposals and never defines rubric architecture or applies peer writes. `KI-HARNESS-GOV-016` remains the documentation-topology delivery: its mechanical section-presence and judgment-truth split is useful hybrid evidence, but its user outcome and affected owners are distinct. Neither is duplicated or absorbed by this item.

### Ratio without gaming

A useful measure must count the complete mechanical audit surface and explain every exception. It must not reward deleting hard checks, splitting one rule to inflate the numerator, relabelling deterministic evidence as judgment, or calling an unsafe suggestion a conformer. The coverage trend is evidence for rubric quality, not an automatic score or release gate until the inventory establishes a defensible denominator.
