---
id: KI-HARNESS-GOV-009
title: Make audits conformable
area: GOV
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: 8c87acf049c13298d9314d0aac0c41241637a08f
---

## Goal

Make governance rubrics explicit about the relationship between what AUDIT detects and what CONFORM can safely repair, so most deterministic violations have an idempotent conform path and every exception has a visible reason.

## Context

The two-aspect model classifies each rubric criterion as mechanical, judgmental, or hybrid. A later remediation model already classifies every mechanical aspect as `automatic`, `diagnostic`, or `guarded`. The implementation therefore has the right conceptual axes, but the rubric-authoring standard still describes CONFORM as merely optional and the shared TypeScript shape does not encode the combinations that the host rejects at load time.

The Harness effectiveness review repeatedly found that clean mechanical audits can coexist with unresolved semantic or outcome questions. That distinction must remain intact. Improving audit/conform symmetry must not turn judgment into a synthetic finding, weaken a useful audit because it is hard to repair, or treat a proposed write as safe without containment, preservation, idempotence, and post-audit evidence.

The former scope of this item supplied the clearest concrete example: runtime coverage audit deterministically identifies missing governance tables and managed discovery links, but recovery is decomposed into manual `ki repo skill add` calls even though the required mapping and safeguards already exist. That case is now the first proof point within the wider rubric-repairability contract.

## Boundary

Keep evaluation method, audit execution, remediation path, and finding outcome as separate concepts. Do not mechanically rewrite judgment-led content, infer supported runtimes or other undeclared policy, mutate user-owned or unmanaged configuration, remove an audit merely to improve a conformance ratio, or present an external or unavailable repair as locally conformable.

The Harness owns criterion policy, focused evidence, safe draft capabilities, and the shared compile-time rubric contract. `tools-ki` continues to own generic execution, dry-run and publication safety, finding conversion, reporting, and post-CONFORM audit. Route any required host change to that repository without writing it directly or making receiver acceptance part of local authority.

## Current state

Structured rubric items already separate mechanical and judgment aspects. Every mechanical item declares remediation metadata, generated rubrics publish it, and the host safely derives `FIXED` only after a conform action and clean re-audit. The host also enforces the current combinations: `automatic` requires a conform action; `diagnostic` and `guarded` forbid one; and `guarded` requires a judgment aspect. The remaining contract drift is that the rubric-authoring standard omits this model, the materialised compile-time type permits combinations that the host rejects, and violating command output does not surface diagnostic or guarded guidance.

A source-tree baseline on 2026-08-14 covers 45 generated rubrics and 633 criteria. Of those, 435 carry a mechanical aspect and 233 carry a judgment aspect, with hybrid criteria counted on both axes. Mechanical remediation is 86 automatic, 336 diagnostic, and 13 guarded, so current automatic coverage is 19.8%. The classification is complete; the unanswered question is whether each of the 349 report-only mechanics has the correct boundary or is safe automation debt.

The existing runtime-coverage criterion `RUNTIMES-2` derives the required capabilities from declared `supported_runtimes`; the managed `ki repo skill add` path already contains the relevant trust and link safeguards. Its missing single-run CONFORM path remains in scope, now as one representative test of the general model rather than a standalone roadmap item.

This item retains the established classes rather than introducing a second taxonomy:

- **Automatic** means the desired state is derivable without a new policy decision and the host can apply a bounded, preserving, idempotent action. A conform callback is required.
- **Diagnostic** means AUDIT is deterministic but the correct repair still requires authorship, a local implementation choice, unavailable capability, or external state. Specific guidance is required and no conform callback is allowed.
- **Guarded** means the repair depends on explicit human judgment or authority. The item must be hybrid, publish the decision boundary, and have no conform callback.

An unimplemented safe deterministic repair is not a fourth remediation class and must not be hidden as `diagnostic`. It is an automation gap: promote it to `automatic` in this item when the repair is cross-cutting or already bounded, or route a named owner record when the repair is substantial and concern-specific.

Coverage uses all 435 criteria with a mechanical aspect as the denominator and `automatic` criteria as the numerator. Judgment aspects and guarded or diagnostic exceptions are reported separately, not removed from the denominator. The delivery target is semantic rather than an unsafe quota: review every report-only item, implement every safe bounded candidate in the approved tranche, and leave no remaining diagnostic or guarded item without specific guidance that states its real boundary. The numerical rate must rise and be published before and after, but it is not a release gate that can justify unsafe writes or weaker audits.

## Steps

- [x] Correct the rubric-authoring standard to define evaluation and remediation as independent axes, state the three existing remediation classes and allowed combinations, and make safe deterministic conformance the default design expectation.
- [x] Strengthen the shared TypeScript contract so `automatic` requires `conform`, `diagnostic` and `guarded` exclude it, and `guarded` requires judgment at compile time; retain equivalent fail-closed host validation for dynamically loaded catalogues.
- [x] Generate a source-loaded inventory of every criterion by evaluation aspect and remediation class, then review all 349 diagnostic and guarded items against one candidate test: the desired state is fully derivable, the target is locally owned, and the action can prove containment, preservation, dry-run, idempotence, and clean post-audit.
- [x] Record each reviewed report-only item as a justified boundary or a promotion candidate. Keep specific guidance for every boundary; route only substantial concern-specific candidates to separate owner records, and keep cross-cutting or already bounded candidates in this item.
- [x] Implement the approved promotion tranche with focused context capabilities and item-owned conform actions. Include `RUNTIMES-2` as the required proof case, using declared runtimes and existing managed-install safeguards without inferring policy or touching unmanaged state.
- [x] Route one immutable `tools-ki` submission for the mirrored type and validator contract, violating-finding presentation of diagnostic and guarded guidance, any source-loaded coverage support, and the runtime-coverage host capability that the local proof requires.
- [x] Regenerate every affected rubric publication and publish the dated before-and-after totals for mechanical, automatic, diagnostic, guarded, judgment, and hybrid criteria.

## Files touched

- `skills/keystone/ki-skills/references/standards-rubric-authoring.md`
- `skills/keystone/ki-skills/scripts/shared/rubric.ts` and focused compile-time and runtime-parity tests
- `skills/keystone/ki-skills/scripts/rubric/` catalogue validation or inventory evidence and generated publication
- Other governance-skill rubric items, contexts, tests, and generated publications only where the approved inventory adds an explicit classification or a proven safe conform action
- One outbound `tools-ki` work trade for its mirrored contract, loader validation, finding presentation, coverage support if needed, and runtime-coverage execution
- This work item

No peer-repository source, user runtime settings, unmanaged configuration, bulk estate conformance, or unrelated rubric policy is in scope.

## Verify

- Every rubric item still has a mechanical aspect, a judgment aspect, or both, and every mechanical aspect retains an AUDIT action.
- The compile-time contract and host loader accept exactly the same remediation combinations, including rejection fixtures for automatic-without-conform, report-only-with-conform, guarded-without-judgment, and missing guidance.
- Every mechanical criterion is counted once as automatic, diagnostic, or guarded; every automatic item has a tested conform action, and every diagnostic or guarded item publishes specific guidance for its actual boundary.
- Coverage evidence reproduces the 435-item baseline and reports automatic, diagnostic, guarded, judgment, and hybrid counts before and after; no criterion disappears or changes evaluation type merely because it is difficult to repair.
- Violating diagnostic and guarded findings expose their remediation guidance in normal AUDIT and CONFORM output without emitting judgment as a synthetic mechanical finding.
- Safe conform fixtures prove bounded dry-run proposals, containment and symlink refusal, preservation of unrelated bytes, repeat idempotence, and `FIXED` only after a clean re-audit.
- Runtime coverage for a repository declaring both Claude Code and Codex has an exact proposal for its missing repository-owned tables and managed links while user and unmanaged settings remain untouched; ambiguous, incompatible, unavailable, or untrusted sources fail closed.
- Focused shared-rubric and affected catalogue tests, generated-rubric parity, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-change-management-roadmap --repo .`, `ki repo audit --skill ki-authoring --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The current structured rubric, remediation catalogue, host-gated CONFORM lifecycle, and effectiveness review provide the evidence baseline. The local standard, compile-time contract, inventory, classification review, and safe item actions can proceed independently. The mirrored runtime contract, generic reporting, and runtime-coverage executor remain owned by `tools-ki`; a submitted trade records that receiver boundary but grants no priority, implementation, or acceptance authority.

The user approved the retained taxonomy, complete-denominator measure, promotion test, required `RUNTIMES-2` proof, host boundary, and verification plan together on 2026-08-15. The full promotion list is implementation evidence produced by the source-loaded inventory; readiness does not require guessing that list from generated Markdown.

## Delegation

### Locked decisions

- Retain mechanical, judgment, and hybrid as the evaluation axis and `automatic`, `diagnostic`, and `guarded` as the remediation axis.
- Count every mechanical criterion once in the remediation denominator; the coverage rate is evidence, not a quota or release gate.
- Promote only locally owned, fully derivable repairs that can prove containment, preservation, dry-run, idempotence, and clean post-audit.
- Keep generic host execution, reporting, loader validation, and runtime activation in `tools-ki`; this repository may submit one immutable trade but may not write the peer.
- Preserve `RUNTIMES-2` as the required proof case without inferring runtime policy or touching user-owned or unmanaged settings.

### Escalate

- Any proposed fourth remediation class, denominator change, or weakening of a mechanical audit.
- Any conform action whose desired state, ownership, containment, preservation, or idempotence cannot be proved from local evidence.
- Any need to edit `tools-ki`, a user runtime, unmanaged configuration, or another repository rather than recording the receiver-owned work.
- Any inventory result that cannot reproduce the dated baseline or exposes a material ownership conflict not already bounded by this item.

### Worker: inventory-classification

- **Deliverable:** A source-loaded count and concise classification of every diagnostic and guarded criterion, including safe promotion candidates and justified boundaries.
- **Inputs:** The approved GOV-009 record, structured rubric catalogues, generated publications, and the 2026-08-14 baseline counts.
- **Scope:** Read-only inspection of rubric sources under `skills/`; no repository or external writes.
- **Authority:** Run read-only searches and local analysis commands; do not edit, stage, commit, conform, or contact external systems.
- **Isolation:** Read-only worker lane in the shared repository with no Git write authority.
- **Verify:** Coordinator reproduces the totals from source and reviews every proposed promotion against the locked candidate test.
- **Return:** Counts, candidate list with owning criterion and rationale, justified-boundary summary, and unresolved discrepancies; no raw command transcript.
- **Checkpoint:** Return after all source-loaded rubric catalogues are counted and every report-only item is classified.

### Worker: runtime-proof-boundary

- **Deliverable:** A bounded design and evidence map for the `RUNTIMES-2` local proof and the exact receiver-owned `tools-ki` requirements.
- **Inputs:** GOV-009, `ki-repo-harness` runtime criteria and contexts, managed-link standards, existing trade route, and current host contracts.
- **Scope:** Read-only inspection of Harness and locally available host sources; no repository, peer, user-state, or external writes.
- **Authority:** Read the named sources and run read-only searches or tests; do not edit, stage, commit, conform, install, activate, or submit a trade.
- **Isolation:** Read-only worker lane; peer repositories remain evidence only.
- **Verify:** Coordinator checks the proposed local capability against the locked safety test and validates the trade boundary against `ki-trades`.
- **Return:** Exact local files and tests to change, host-owned requirements, safety stops, and unresolved conflicts; no implementation or peer mutation.
- **Checkpoint:** Return once the local proof boundary and receiver requirements are concrete enough for coordinator implementation.

### Worker: diagnostic-guidance

- **Deliverable:** Replace the generic `ki-skills` diagnostic fallback with criterion-specific guidance that states each actual authorship, policy, safety, or ownership boundary.
- **Inputs:** The approved GOV-009 contract and only the `ki-skills` rubric item modules that currently use `DIAGNOSTIC_REMEDIATION`.
- **Scope:** Exclusive writes to `skills/keystone/ki-skills/scripts/rubric/items/*.ts` files that already use `DIAGNOSTIC_REMEDIATION`; no shared contract, context, standard, generated publication, roadmap, or other skill files.
- **Authority:** Edit those item declarations and their imports only; run focused read-only tests and formatting; do not stage, commit, conform, or write outside the exclusive scope.
- **Isolation:** Exclusive non-overlapping source-file boundary in the shared worktree; coordinator owns all generated publications and integration.
- **Verify:** No item in scope uses the generic diagnostic constant, every replacement guidance is non-empty and criterion-specific, focused `ki-skills` item tests and Biome pass.
- **Return:** Changed path list, guidance-boundary summary, focused verification, and any criterion whose true boundary is ambiguous.
- **Checkpoint:** Return after all in-scope generic diagnostics are replaced or an ambiguity requires coordinator review.

## Review

### Delivered

Implemented the approved GOV-009 boundary from immutable baseline `8c87acf049c13298d9314d0aac0c41241637a08f`. The Harness now encodes evaluation and remediation independently, source-loads and validates all 45 structured catalogues, records the disposition of every original report-only criterion, promotes two bounded repairs, and submits the receiver-owned host work without writing `tools-ki` or user runtime state.

The resulting evidence is committed in `5fa55b52`, `474cd424`, `73813389`, and immutable submitted trade `TRD-65db6d36` at `e6e401ff`. Readiness, start, and delegation authority were committed separately before implementation.

### Summary of changes

- Strengthened the materialised rubric type so automatic remediation requires a conform action, diagnostic and guarded remediation exclude one, guarded remediation requires judgment, and report-only guidance is mandatory.
- Reworked four catalogue factories into explicit automatic or diagnostic branches so the compile-time and dynamically loaded contracts agree without weakening either.
- Added a source-loaded inventory and focused assertions for 45 catalogues, 633 criteria, exact remediation totals, six candidate dispositions, and the exhaustive report-only complement.
- Replaced 40 generic `ki-skills` diagnostics with criterion-specific authorship, ambiguity, safety, or ownership guidance.
- Promoted `ki-skills/NAME-1` with a preserving physical-source-only frontmatter insertion and `ki-repo/RUNTIMES-2` with an exact typed host-native activation request.
- Published the dated evidence under `docs/reviews/KI-HARNESS-REV-001/`, routed Decision Records work to GOV-043, routed Engineering work to GOV-044, and submitted `TRD-65db6d36` to `tools-ki`.
- Corrected the catalogue count from 44 to 45. The criterion totals and approved denominator were unchanged.

### Verification

- `bun run test` passed: 459 tests, 0 failures.
- `bunx tsc --noEmit` passed.
- All 45 `ki dev skill rubric <skill>` publication checks passed; the affected `ki-skills` and `ki-repo` publications were regenerated first.
- `ki repo audit --skill ki-skills --repo .` passed.
- `ki repo audit --skill ki-repo --repo .` passed with its `ki-authoring` and `ki-git` dependencies.
- Focused `ki-change-management-roadmap`, `ki-authoring`, `ki-delegation`, and `ki-trades` audits passed.
- The source-loaded result is 435 mechanical, 88 automatic, 334 diagnostic, 13 guarded, 233 judgment, and 35 hybrid criteria; automatic coverage rose from 19.8% to 20.2% without removing a criterion or evidence aspect.

### Outstanding concerns

The Harness-local work has no failing or unchecked gate. `tools-ki` still owns loader parity, normal-output remediation guidance, the native activation proposal, publication safety, and post-CONFORM `FIXED` proof; submitted trade `TRD-65db6d36` requests that work without assigning receiver priority or acceptance.

Four safe but substantial concern-specific candidates remain intentionally diagnostic: Decision Records `FM-3`, `FM-4`, and `INDEX-4` are routed to GOV-043, which is blocked by the existing GOV-040 metadata authority decision; Engineering `GEN-1` is routed to GOV-044. They remain visible automation debt with specific guidance.

### Post-change review

The goal and approved scope are satisfied. Mechanical evaluation was not weakened, judgment was not manufactured, and the coverage change came only from two actions with bounded ownership and negative-path evidence. `NAME-1` preserves unrelated bytes and refuses symbolic sources. `RUNTIMES-2` derives only exact names and exposes no direct config write, link write, subprocess, provider choice, or user-setting capability.

The largest regression surface is the shared rubric type copied into 43 consumers. Exact hash parity, whole-repository TypeScript, the complete 459-test suite, all 45 generated publications, and the staged-snapshot skill audit passed, so the item is ready for acceptance review.

### Mini recap

GOV-009 delivered a stricter rubric contract, exhaustive remediation evidence, specific report-only guidance, two safe promotions, two coded owner follow-ups, and one immutable host trade. The reusable learning is already encoded in the rubric-authoring standard, source-loaded inventory, focused failure fixtures, and the effectiveness review evidence; no additional guide, idea note, or skill extraction is proposed.

## Done

Accepted by the user on 2026-08-15 after review of the stricter remediation contract, complete source-loaded inventory, specific diagnostic guidance, bounded `NAME-1` and `RUNTIMES-2` promotions, coded owner follow-ups, and immutable `tools-ki` submission. The accepted delivery is recorded by commits `5fa55b52`, `474cd424`, `73813389`, `e6e401ff`, and `e6374887`.

## Discussion

### Audit and conform symmetry

The desired default is not that every finding is automatically rewritten. It is that every deterministic local violation is designed with repairability in mind, and that absence of a conformer is an explicit policy boundary rather than a convenience label for unfinished work. Audit coverage remains valuable even when a safe repair is impossible.

The existing remediation model is now the starting point, not proposed future vocabulary. `automatic` is executable, `diagnostic` is a deterministic report whose correction still needs authorship or another unavailable input, and `guarded` is a hybrid decision boundary. Evaluation type still answers how evidence is assessed; remediation class answers what the host may do after a mechanical finding.

### Consolidated runtime coverage

The previous GOV-009 runtime-coverage scope is preserved here rather than retained as a narrower duplicate. It is a strong first case because the audit already owns a deterministic mapping and the existing managed-link command already owns the principal safety checks. A clearer audit message alone would improve usability but would leave avoidable partial manual recovery in place.

### Related records kept separate

`KI-HARNESS-OPS-004` remains a read-only estate conformance review: it classifies dry-run proposals and never defines rubric architecture or applies peer writes. `KI-HARNESS-GOV-016` remains the documentation-topology delivery: its mechanical section-presence and judgment-truth split is useful hybrid evidence, but its user outcome and affected owners are distinct. Neither is duplicated or absorbed by this item.

### Ratio without gaming

A useful measure counts the complete mechanical audit surface and explains every exception. The dated baseline is 86 automatic of 435 mechanical criteria, or 19.8%. It must not reward deleting hard checks, splitting one rule to inflate the numerator, relabelling deterministic evidence as judgment, or calling an unsafe suggestion a conformer. The coverage trend is evidence for rubric quality, not an automatic score or release gate.
