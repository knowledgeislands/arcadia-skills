---
id: KI-HARNESS-012
title: Normalise schema versions
theme: governance-consistency
horizon: now
status: ready
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

## Current state

No estate-wide active-schema inventory currently distinguishes internal contract markers from external protocol references and historical evidence. A blind global rename would risk changing an external standard or leaving an active producer and consumer on different labels.

## Steps

- [ ] Define the inventory fields: schema or protocol surface, repository, active producer, active consumer, validator or fixture, rendered documentation, version marker, and classification.
- [ ] Search the estate for versioned schemas, protocol records, fixtures, validators, and generated publications; classify each hit as active internal contract, external-standard reference, or historical evidence.
- [ ] For each active internal contract, establish a complete producer-consumer-fixture-documentation migration map to the present V1 shape, with the receiving repository owner and verification gate.
- [ ] Record separately owned cutover work only where the full map is proven; retain unknown or external markers as explicit exclusions rather than renumbering them.
- [ ] Reconcile the inventory with the raw search results and review that no V1/V2 compatibility alias, historical rewrite, or partial migration is proposed.

## Files touched

This roadmap item only, containing the active-schema inventory, classifications, and receiver-owned migration map. No schema, consumer, fixture, documentation, or peer repository is changed in this audit.

## Verify

- Every active internal version marker has a producer, consumer, fixture or validator, documentation surface, owner, and named gate—or is reported as incomplete rather than changed.
- External-standard and historical markers are explicitly excluded with their source or evidence boundary.
- Every proposed V1 cutover is receiver-owned and remains unimplemented in this item.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This inventory and migration-map phase is read-only. It does not authorise a cross-repository cutover; each proven map routes to separately confirmed receiving work.

## Discussion

### Version meaning

V1 is the first externally credible current contract. It must not coexist with a retained internal V2 merely to preserve local change history.
