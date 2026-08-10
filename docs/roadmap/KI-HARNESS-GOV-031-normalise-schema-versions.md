---
id: KI-HARNESS-GOV-031
title: Normalise schema versions
area: GOV
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: ba91c843419820f6c37679abd8691c665bed951d
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
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This inventory and migration-map phase is read-only. It does not authorise a cross-repository cutover; each proven map routes to separately confirmed receiving work.

## Delegation

### Locked decisions

- Only this roadmap item may be written; no schema, protocol, fixture, parser, generated publication, or peer repository may be changed.
- External-standard references and historical evidence remain exclusions unless current internal producer, consumer, fixture or validator, documentation, and receiver ownership are proven.

### Escalate

- An inaccessible declared member or incomplete search surface that prevents an honest estate reconciliation.
- Any unclear version axis, unknown active consumer, incomplete generated target, or request to renumber a contract, preserve an alias, or alter a peer record.

### Rounds

- Round 1: `active-schema-version-inventory`.

### Worker: active-schema-version-inventory

- **Deliverable:** Complete active-schema inventory, classifications, receiver-owned V1 migration maps, explicit exclusions, incomplete findings, and raw-search reconciliation in this item.
- **Files:** Write only `docs/roadmap/KI-HARNESS-GOV-031-normalise-schema-versions.md`; read estate schema, protocol, fixture, validator, generated-publication, and documentation evidence.
- **Definition of done:** Every proposed internal V1 cutover names a producer, consumer, fixture or validator, documentation surface, receiver, and verification gate; all other markers are explicitly excluded or incomplete.
- **Model:** reasoning — version-axis and producer-consumer classification requires evidence-led judgment.
- **Verify:** Orchestrator samples every proposed cutover and exclusion, confirms no schema or peer changed, then runs the item's roadmap and authoring audits.
- **Checkpoint:** Return with the completed record and all unknown consumers, external references, and required receiver decisions; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-001-gov031.index` for any Git staging and do not commit.

## Discussion

### Version meaning

V1 is the first externally credible current contract. It must not coexist with a retained internal V2 merely to preserve local change history.
