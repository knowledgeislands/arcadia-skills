---
id: KI-HARNESS-GOV-031
title: Normalise schema versions
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make every active schema describe the current contract as V1, eliminating legacy version lineage before external adoption.

## Context

The estate has made breaking current-state changes while remaining privately controlled. A V2 label would imply a compatibility history that the operating contract deliberately does not carry; V1 should mean the present pre-release candidate, not an obsolete predecessor.

## Boundary

Do not preserve V1/V2 aliases, add compatibility parsers, rewrite historical trade or roadmap evidence, or renumber a schema without proving every active producer, consumer, fixture, and documentation surface moves together.

## Shaping

### Intended approach

Inventory active schemas, protocol versions, fixtures, validation logic, and generated publications. Classify each version marker as active contract, external-standard reference, or historical evidence. For active internal schemas, make the current shape V1 in one mechanical cutover and let any missed consumer fail loudly.

### Promotion conditions

Promote when the inventory identifies every active versioned contract, each consumer owner, and the exact boundary between internal normalisation and an external protocol version that must retain its source-defined label.

## Discussion

### Version meaning

V1 is the first externally credible current contract. It must not coexist with a retained internal V2 merely to preserve local change history.
