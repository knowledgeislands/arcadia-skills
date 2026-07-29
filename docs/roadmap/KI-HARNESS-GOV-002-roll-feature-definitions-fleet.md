---
id: KI-HARNESS-GOV-002
title: Roll Feature Definitions out across the repository fleet
theme: governance-consistency
horizon: soon
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

## Discussion

### Pilot selection

The first repository needs visible behaviour, a named owner, and a review path capable of showing whether the format improves maintenance before broader rollout.
