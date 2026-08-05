---
id: KI-HARNESS-GOV-002
title: Deploy Feature Definitions fleetwide
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Prove that Feature Definitions help one real repository before asking the wider fleet to adopt them.

## Context

Select one named repository with externally visible behaviour and an owner, then pilot the Feature Definition format there.

## Boundary

Do not begin fleet rollout before that pilot exists.

## Shaping

### Intended approach

Use `tools-ki` as the explicitly accepted Feature Definitions pilot. Its owner received and completed local item `KI-TOOL-CLI-011` for repository-audit behaviour. The receiving record owned its own priority, execution, and verification; this item records the resulting evidence without treating it as a fleet mandate.

The pilot declared `ki-feature-definitions`, created one bounded as-built CLI area and its index, then tested the corpus against a named maintenance task. Use the resulting evidence to decide whether a fleet rollout is warranted.

### Known dependencies

The pilot repository accepted, completed, and pruned its own roadmap item and remains the owner of every source, feature-corpus, and priority change.

This harness can prepare the selection criteria and handoff, but must not create or prioritise another repository's work unilaterally.

### Pilot acceptance and success evidence

The accepted pilot is `knowledgeislands/tools-ki`; its receiving work item was `KI-TOOL-CLI-011`. The pilot succeeds only if one as-built CLI area gives a maintainer a materially faster or clearer answer to a named behaviour-level maintenance question, while every numbered requirement remains tied to a concrete CLI test or observable assertion. The receiving owner records that review and any limitation before this harness item proposes a second repository.

### Promotion conditions

Promote only when the completed `KI-TOOL-CLI-011` evidence is concrete and this repository has decided what, if anything, the pilot justifies for another repository.

## Current state

The Harness and `tools-ki` now declare `ki-feature-definitions`. `tools-ki` carries an as-built `REPO-AUDIT` corpus at `docs/features/index.md` and `docs/features/repository-audit.md`, covering `ki repo audit` selection, reporting, output controls, failure status, and multi-repository summaries.

The `tools-ki` owner found the corpus materially clearer and faster for the question: “When changing multi-repository audit failure reporting, which observable contract and focused CLI tests must change together?” The answer is `REPO-AUDIT-006` and `REPO-AUDIT-007`, with their named `repo.test.ts` and `repo-targets.test.ts` verification hooks.

The evidence is qualitative rather than timed. The bounded corpus deliberately excludes `ki repo conform`, registration, initialization, and target-resolution edge cases, so the pilot alone does not decide a fleet rollout.

## Steps

- [x] Have the `tools-ki` owner accept local item `KI-TOOL-CLI-011`, transferred from this harness item, for the bounded repository-operation Feature Definitions pilot.
- [x] In the accepted pilot, declare `ki-feature-definitions`, create the flat `docs/features/` index and repository-operation area, and state only as-built command behaviour with verification hooks.
- [x] Audit the pilot mechanically and review whether the corpus makes a concrete maintenance task easier to understand or verify.
- [x] Record the pilot outcome in this item through the temporary direct-super-trust bridge between the Harness and `tools-ki`; create no fleet follow-up or route claim.
- [ ] Decide whether a fleet rollout is warranted from the pilot evidence; do not treat pilot adoption as a fleet-wide mandate.

## Files touched

- This work item
- The completed and pruned `tools-ki` `KI-TOOL-CLI-011` record
- `tools-ki` `docs/features/index.md` and `docs/features/repository-audit.md`
- Any later accepted receiving-repository follow-up only

## Verify

- `ki repo audit --skill ki-feature-definitions --repo <accepted-pilot>`
- The pilot's existing CLI verification proves each numbered requirement is as-built.
- A documented owner review identifies one maintenance outcome improved by the corpus.

## Dependencies / blocks

The local pilot outcome now satisfies the evidence dependency. This item remains open because fleet rollout still requires an explicit governance decision, not because `tools-ki` must do more work.

## Discussion

### Pilot selection

The first repository needs visible behaviour, a named owner, and a review path capable of showing whether the format improves maintenance before broader rollout.

### Receiving ownership

The `tools-ki` record is the acceptance boundary. This harness may supply the originating context and later read its durable evidence, but it neither prioritises the receiving work nor treats an accepted item as a fleet mandate.

### Direct super-trust bridge

During the handoff-protocol bootstrap, the Harness and `tools-ki` record accepted evidence directly in the owning repository's roadmap. The accepted CLI-011 pilot is therefore recorded above rather than retained as an outbound handoff artifact. `KI-HARNESS-FND-009` will define future cross-repository submissions; this bridge neither activates a route nor authorises a fleet rollout.
