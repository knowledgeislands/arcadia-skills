---
id: KI-HARNESS-GOV-045
area: GOV
title: Record Agora contract ownership
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Record and verify the portable Agora contract's ownership, reciprocal declaration boundary, and relationship to local resolution and user-environment projections.

## Context

`ki-agora` already defines portable homes and memberships, while `ki` resolves registered repository identities and a user-environment repository consumes only resolved local paths. The nine current Agoras resolve successfully, but no Harness roadmap item records this cross-repository delivery ownership.

## Boundary

Preserve the existing `ki-agora` declaration schema and reciprocal-consent model. Do not infer a peer membership, write a peer configuration, or make editor targets part of portable declarations.

## Current state

`ki-agentic-harness` declares the `ki-all`, `ki-fnd`, and `ki-mcps` homes. Other registered homes declare Equal Remedy, HNR, Legal, Personal, Techmedix, and Vallearmonia. `tools-ki` resolves the declarations locally, and chezmoi keeps target-specific trust and workspace state separate.

## Steps

- [ ] Audit the nine declared Agoras and their resolvable reciprocal memberships.
- [ ] Record the ownership boundary between `ki-agora`, `tools-ki`, and user-environment projections.
- [ ] Link the evidence to the relevant skill standards and local resolver behaviour.
- [ ] Review the recorded contract without changing membership declarations or target application state.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-045-record-agora-contract-ownership.md`
- Existing Agora standards or guides only if the audit exposes a missing ownership statement.

## Verify

- `ki agora list` resolves all declared Agoras and their local roots.
- `ki repo audit --skill ki-agora` passes for the involved home and resolver repositories.
- The recorded boundary names one owner for declarations, local resolution, and target-specific projection.

## Dependencies / blocks

The existing registered-repository inventory and locally available declared homes must remain resolvable. No peer-repository mutation is authorised by this item.

## Documentation impact

### Decision Records

No decision record is planned unless the audit identifies an unresolved ownership conflict.

### Specifications

The existing `ki-agora` standard remains the portable declaration specification.

### Guides

Update a guide only if the current ownership boundary is not already discoverable from the capability documentation.

### Roadmap

This item supplies the cross-repository delivery evidence required before chezmoi can complete its local Agora-projection work.

## Discussion

The portable contract is already in use. This item records and verifies its ownership rather than redesigning it.
