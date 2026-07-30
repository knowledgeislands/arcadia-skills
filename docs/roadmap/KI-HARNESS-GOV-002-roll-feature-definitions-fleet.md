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

## Context

Select one named repository with externally visible behaviour and an owner, then pilot the Feature Definition format there.

## Boundary

Do not begin fleet rollout before that pilot exists.

## Shaping

### Intended approach

Nominate one repository with externally visible behaviour, a responsible owner, and a bounded review path as the Feature Definitions pilot.

Use the existing `ki-feature-definitions` standard to assess the pilot's starting corpus, create only the pilot's local adoption item, and use its evidence to decide whether a fleet rollout is warranted.

### Known dependencies

The pilot repository must accept its own roadmap item and own any source changes.

This harness can prepare the selection criteria and handoff, but must not create or prioritise another repository's work unilaterally.

### Decision still needed

Choose the pilot repository and its receiving owner, then agree the observable maintenance outcome that would count as a successful pilot.

### Promotion conditions

Promote when the pilot repository, owner, local receiving item, review window, and success evidence are named.

## Current state

Only the harness currently declares `ki-feature-definitions` and carries a Feature Definitions corpus.

`tools-ki` is the proposed pilot because it has externally visible CLI behaviour, a bounded command surface, and an active local owner, but it has not accepted a local adoption item or declared the governing skill.

## Steps

1. Ask the `tools-ki` owner to accept a local pilot item that names the CLI behaviours and the review window.
2. In the accepted pilot, declare `ki-feature-definitions`, create the flat `docs/features/` index and CLI area, and state only as-built command behaviour with verification hooks.
3. Audit the pilot mechanically and review whether the corpus makes a concrete maintenance task easier to understand or verify.
4. Record the pilot outcome in this item and create receiving-repository handoffs only for repositories that accept a follow-up.
5. Decide whether a fleet rollout is warranted from the pilot evidence; do not treat pilot adoption as a fleet-wide mandate.

## Files touched

- This work item
- A receiving `tools-ki` roadmap item and its accepted Feature Definitions corpus
- Later accepted receiving-repository handoffs only

## Verify

- `ki repo audit --skill ki-feature-definitions --repo <accepted-pilot>`
- The pilot's existing CLI verification proves each numbered requirement is as-built.
- A documented owner review identifies one maintenance outcome improved by the corpus.

## Dependencies / blocks

This harness item cannot become Ready until `tools-ki` accepts the pilot and its owner, review window, and success evidence are explicit.

## Discussion

### Pilot selection

The first repository needs visible behaviour, a named owner, and a review path capable of showing whether the format improves maintenance before broader rollout.
