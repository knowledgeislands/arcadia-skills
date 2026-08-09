---
id: KI-HARNESS-GOV-019
title: Improve recap coverage
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: c0db8fac017276521c1ec304d2c109ad5e637e70
---

## Goal

Let a recap demonstrate, when evidence supports it, how material discussion points were captured, delivered, deferred, or left for decision.

## Context

A concise coverage matrix can help a reviewer verify that a multi-topic session has a durable destination for each material outcome without falsely claiming transcript completeness.

## Boundary

Do not mine unavailable transcripts, claim exhaustive coverage without evidence, or convert judgmental completeness into a mechanical finding.

## Current state

`ki-recap` grounds a three-leg recap from warm context, current repository evidence, and an eligible runtime transcript when available. It already distinguishes completed work, outstanding work, and proposed learning routes, but it has no optional cross-leg view that lets a reviewer trace several material discussion points to their durable homes and dispositions.

The grounding helper emits evidence inputs; it does not classify discussion topics or establish transcript completeness. The coverage matrix therefore belongs in the recap procedure, not in the helper or a governance rubric.

## Steps

- [x] Add an optional discussion-coverage step after the three recap legs and before the final Actions section. Use it when the user requests coverage or when multiple materially distinct discussion points would otherwise be difficult to trace; omit it for a simple single-thread recap.
- [x] Define one compact four-column shape—discussion point, owning home, disposition, and evidence—with short cells and linked canonical records where a durable home exists.
- [x] Define the closed disposition vocabulary: `delivered` for evidence-backed completed work, `captured` for work placed in its durable queue or record, `deferred` for an explicit deferral with a named home or return condition, and `decision-needed` for an unresolved user-owned choice.
- [x] Require a short evidence-scope statement immediately before the matrix. Rows may use warm in-session context, the selected eligible transcript, and freshly checked repository evidence, but the recap must label the matrix bounded and non-exhaustive whenever transcript evidence is absent, ambiguous, changed, or otherwise unavailable.
- [x] Preserve the existing leg and Actions boundaries: a captured roadmap item remains part of what happened rather than an action; a deferred point without a durable home and a decision-needed point remain outstanding and must reconcile with the final Actions checklist.
- [x] Add concise procedure scenarios covering omission for a simple recap, a multi-topic evidence-backed matrix, degraded transcript evidence, and reconciliation between matrix dispositions and Actions.
- [x] Update the concise `ki-recap` router to mention the optional matrix without duplicating the full template or implying that the grounding helper produces it.

## Files touched

- `skills/change-management/ki-recap/SKILL.md`
- `skills/change-management/ki-recap/references/standards-session-recap.md`
- This roadmap item

## Verify

- `bun test skills/change-management/ki-recap/scripts/recap-grounding.test.ts`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Scenario review confirms that a simple recap omits the matrix, a multi-topic recap uses only the four dispositions, degraded transcript evidence is labelled non-exhaustive, and every outstanding matrix row reconciles with Actions.

## Dependencies / blocks

This work is independently executable and requires no grounding-helper change. The adopted trade supplies the proposal, while the Harness retains authority over the procedure and wording.

Escalate before expanding scope if implementation would require transcript topic extraction, a mandatory matrix for every recap, a new rubric or parser, or changes to runtime-specific transcript formats. Those would be separate automation or runtime-adapter work, not this bounded procedure update.

## Delegation

Keep the procedure and router edits in one implementation lane so trigger, vocabulary, evidence limits, and Actions reconciliation are reviewed together. It can run in parallel with `KI-HARNESS-GOV-017` because their file boundaries do not overlap. The batch orchestrator owns the final cross-item authoring audit and confirms that neither lane turns reviewer judgment into a mechanical claim; no durable delegation packet is warranted.

## Discussion

### Source

This item adopts `TRD-cbef1f49`.

### Selected matrix model

The matrix is an optional reviewer aid, not a fourth source of truth. Its rows summarise conclusions already reached through the three recap legs and point to the evidence or durable home that supports each disposition. It appears before Actions so unresolved rows can be checked against the final imperative checklist.

### Mechanical and judgment boundary

The procedure can prescribe a stable table shape and closed vocabulary, but `ki-recap` is a process skill and has no governance audit mode. Selecting material discussion points, judging whether the evidence covers them, and deciding whether the matrix adds value remain human or model judgment. This item adds no parser, completeness score, or synthetic PASS/FAIL result.
