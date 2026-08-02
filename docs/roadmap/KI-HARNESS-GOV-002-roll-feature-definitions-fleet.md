---
id: KI-HARNESS-GOV-002
title: Roll Feature Definitions out across the repository fleet
theme: governance-consistency
horizon: next
status: open
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

Use `tools-ki` as the explicitly accepted Feature Definitions pilot. Its owner will receive one local `KI-TOOL-CLI-011` work item for repository-operation behaviour, transferred from this item. The receiving record owns its own priority, execution, and verification; it is not an instruction to declare a feature corpus before the pilot is shaped.

After the receiving item is Ready, it will declare `ki-feature-definitions`, create one bounded as-built CLI area and its index, then test whether that corpus helps a named maintenance task. Use the resulting evidence to decide whether a fleet rollout is warranted.

### Known dependencies

The pilot repository has accepted its own roadmap item and remains the owner of every source, feature-corpus, and priority change.

This harness can prepare the selection criteria and handoff, but must not create or prioritise another repository's work unilaterally.

### Pilot acceptance and success evidence

The accepted pilot is `knowledgeislands/tools-ki`; its receiving work item is `KI-TOOL-CLI-011`. The pilot succeeds only if one as-built CLI area gives a maintainer a materially faster or clearer answer to a named behaviour-level maintenance question, while every numbered requirement remains tied to a concrete CLI test or observable assertion. The receiving owner records that review and any limitation before this harness item proposes a second repository.

### Promotion conditions

Promote when `KI-TOOL-CLI-011` is Ready, its owner and review window are named in the receiving record, and its success evidence is concrete.

## Current state

Only the harness currently declares `ki-feature-definitions` and carries a Feature Definitions corpus.

`tools-ki` is the accepted pilot because it has externally visible CLI behaviour, a bounded command surface, and an active local owner. It now carries the local adoption item; it does not declare the governing skill or author a corpus until that item has been shaped and approved.

## Steps

- [x] Have the `tools-ki` owner accept local item `KI-TOOL-CLI-011`, transferred from this harness item, for the bounded repository-operation Feature Definitions pilot.
- [ ] In the accepted pilot, declare `ki-feature-definitions`, create the flat `docs/features/` index and repository-operation area, and state only as-built command behaviour with verification hooks.
- [ ] Audit the pilot mechanically and review whether the corpus makes a concrete maintenance task easier to understand or verify.
- [ ] Record the pilot outcome in this item and create receiving-repository handoffs only for repositories that accept a follow-up.
- [ ] Decide whether a fleet rollout is warranted from the pilot evidence; do not treat pilot adoption as a fleet-wide mandate.

## Files touched

- This work item
- `tools-ki` `docs/roadmap/KI-TOOL-CLI-011-pilot-feature-definitions-for-repository-operations.md`
- The accepted pilot's later Feature Definitions corpus
- Later accepted receiving-repository handoffs only

## Verify

- `ki repo audit --skill ki-feature-definitions --repo <accepted-pilot>`
- The pilot's existing CLI verification proves each numbered requirement is as-built.
- A documented owner review identifies one maintenance outcome improved by the corpus.

## Dependencies / blocks

This harness item cannot become Ready until `KI-TOOL-CLI-011` has its review window and success evidence explicit, then reaches Ready under `tools-ki` ownership.

## Discussion

### Pilot selection

The first repository needs visible behaviour, a named owner, and a review path capable of showing whether the format improves maintenance before broader rollout.

### Receiving ownership

The `tools-ki` record is the acceptance boundary. This harness may supply the originating context and later read its durable evidence, but it neither prioritises the receiving work nor treats an accepted item as a fleet mandate.
