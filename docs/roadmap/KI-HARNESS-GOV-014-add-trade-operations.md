---
id: KI-HARNESS-GOV-014
title: Add trade operations
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make declared cross-repository trade routes usable through a local, confirmation-led process without weakening the receiver's authority or adding peer transport.

## Context

`ki-trades` defines and audits routes, record shape, immutable sender payload, receiver-only decisions, and release observation. Its current modes intentionally do not author a trade record: the sender's outbound record and the receiver's inbound copy remain explicitly authored local actions.

That boundary is safe but leaves a practical gap. For example, a receiver that has an active import route must manually locate the sender's record, create the correctly placed inbound copy, add `decision_status: unconsidered`, and then run the audit. Nothing guides the route check, exact paths, immutable-copy rule, or required confirmation.

The recent intake from `tools-ki` and `tools-mgit` also shows that receiver review needs a proportional local-work rule. Some submissions need a separately prioritised roadmap item; a bounded, independently verifiable local correction may instead be directly applied after the receiver has made and recorded its decision.

## Boundary

Do not add network transport, peer-checkout writes, automatic receiver decisions, roadmap prioritisation, implementation authority, or automated record pruning.

Do not make `ki-trades` CONFORM create records. Its existing governance modes remain limited to their safe owned scaffold and validation responsibilities.

## Shaping

### Intended approach

Introduce a companion process surface, tentatively `ki-trade`, operated by the `ki` host and governed by `ki-trades`. It should validate the relevant active typed route before preparing an explicitly confirmed, local-only record write and run the `ki-trades` audit afterward.

`submit <receiver> <kind>` should prepare an outbound sender record with a generated `TRD-<eight-hex>` identity and the complete immutable envelope and payload. `receive <sender> <trade-id>` should prepare the matching inbound receiver copy, preserve the sender fields and body byte-for-byte, and add only `decision_status: unconsidered`.

Receiver disposition remains with `ki-next`: its existing human-confirmed workflow chooses `in_progress`, `parked`, `clarify`, `adopted`, `retained`, `declined`, or `superseded`, with the required rationale and local linkage. Adoption remains separate from creating or prioritising local roadmap work.

The disposition workflow must state when a local follow-on is direct: only a bounded local update with clear authority, no material design decision, no cross-repository write, and a proportionate verification gate. Otherwise it proposes one or more local roadmap items, which retain their normal horizon and planning decisions. Neither route is inferred from trade receipt or adoption.

### Known dependencies

`ki-trades` needs a stable local-record contract and a clean active-route check. The `ki` host needs a bounded command surface capable of reading registered repositories and writing only the selected local repository.

### Decisions still needed

Confirm the companion process-skill name and invocation grammar, including whether review remains solely in `ki-next` or receives a read-only `ki-trade` orientation command. Confirm how the host locates a sender's observable outbound copy while preserving the standard's no-transport boundary.

### Promotion conditions

Promote when the local-write confirmation boundary, route-validation failure messages, record-template or copy mechanics, audit handoff, and relationship with `ki-next` are reviewable through fixtures for both work and knowledge trades.

## Current state

The trade contract already validates reciprocal routes, record placement, immutable-copy agreement, receiver-only decision fields, and release observation. It provides no guided command for creating an outbound record or accepting an observable outbound record as a local inbound copy, so those safe but error-prone steps are currently manual.

## Steps

- [ ] Define the companion process skill's name, trigger guidance, command grammar, and explicit off-ramps to `ki-trades` and `ki-next`.
- [ ] Specify local-only submit and receive flows, including active-route validation, exact peer paths, `TRD-<eight-hex>` generation, required confirmation, and post-write audit.
- [ ] Add host fixtures proving that inactive, missing, ambiguous, or kind-mismatched routes create no record and that a process invocation cannot write a peer checkout.
- [ ] Prove inbound copying preserves the sender envelope and full body byte-for-byte, adding only valid receiver-local fields.
- [ ] Document that a received record starts `unconsidered` and route all receiver disposition and local-roadmap follow-on work through `ki-next`.
- [ ] Specify the reviewed choice between a directly applied, bounded local update and a separately confirmed roadmap proposal, including the evidence and verification required for the direct path.
- [ ] Update the `ki-trades` standard, rubric, generated guidance, and host help only where the companion process contract requires a cross-reference.

## Files touched

- `skills/change-management/` companion trade-process skill and its references
- `skills/governance/ki-trades/` cross-references and, if needed, contract clarifications
- `tools-ki` host command, validation, help, and fixtures through a separately accepted local work item
- This roadmap item

## Verify

- Focused companion process-skill and `ki-trades` fixture coverage
- `ki repo audit --skill ki-trades --repo .`
- `ki repo audit --skill ki-skills --repo .`
- Harness focused tests, `bun run test`, and `bunx tsc --noEmit`
- Host fixtures prove confirmed local-only writes, byte-stable inbound payloads, clean post-write audits, and no peer-checkout or transport operation.

## Dependencies / blocks

This item is independently shapeable. A `tools-ki` implementation item is required before host-command changes; the Harness retains ownership of the companion process contract and `ki-trades` cross-references.

## Discussion

### Governance and operation split

The receive example exposes a usability gap, not a defect in the `ki-trades` authority model. `ki-trades` should continue to audit the contract and keep CONFORM unable to author records. A companion process skill can make the same contract executable while retaining explicit local confirmation.

### Locality and receiver authority

The sender creates and later releases only its outbound copy. The receiver creates and changes only its inbound copy. The process may inspect registered peer records to validate the relationship, but it must never write outside its selected repository or infer a receiver decision from record presence.

### Lifecycle boundary

Creating an inbound record means it is available for consideration, not adopted. `ki-next` remains the only process surface that presents and records a human-confirmed disposition; any local roadmap item follows its own confirmed queue transition and plan lifecycle.

### Consolidated submissions

This item adopts [TRD-27279159](../../+/_TRADES/knowledgeislands/tools-ki/TRD-27279159.md), [TRD-2f417537](../../+/_TRADES/knowledgeislands/tools-ki/TRD-2f417537.md), [TRD-e5ad514f](../../+/_TRADES/knowledgeislands/tools-ki/TRD-e5ad514f.md), [TRD-0f0b10a2](../../+/_TRADES/knowledgeislands/tools-mgit/TRD-0f0b10a2.md), [TRD-43b5c5e6](../../+/_TRADES/knowledgeislands/tools-mgit/TRD-43b5c5e6.md), and [TRD-67a0c878](../../+/_TRADES/knowledgeislands/tools-mgit/TRD-67a0c878.md).
