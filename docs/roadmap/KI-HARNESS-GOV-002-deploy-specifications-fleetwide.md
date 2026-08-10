---
id: KI-HARNESS-GOV-002
title: Deploy Specifications fleetwide
area: GOV
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: ba91c843419820f6c37679abd8691c665bed951d
---

## Goal

Prepare a receiver-owned rollout of `ki-specs` across eligible estate repositories, using current as-built evidence rather than a central mandate.

## Context

The former Feature Definitions concept is now the `ki-specs` concern: Decision Records explain why, Specifications state what is true and verifiable, Guides explain how, and roadmap items record when work will happen. Existing pilot evidence must therefore be re-grounded against `docs/specs/` and the `ki-specs` contract rather than the retired terminology or layout.

## Boundary

Do not create, prioritise, or edit a receiving repository's specifications corpus. This work prepares evidence and receiver-owned proposals only; an accepted receiving record remains the authority for every repository-local change.

## Shaping

### Intended approach

Use the Harness and `tools-ki` as current `ki-specs` evidence. Reconcile the existing `tools-ki` repository-audit corpus with the `docs/specs/` index, requirement, and verification contract, then classify every eligible estate repository as already covered, a bounded receiver-owned adoption candidate, or not applicable.

For each adoption candidate, prepare a concise receiver-owned proposal that names the first as-built area, its verification hooks, the local owner, and the boundary that excludes aspirational work. Do not treat a prepared proposal, historic pilot, or a shared standard as acceptance.

### Known dependencies

`ki-specs` defines the only active specification format. Every receiving repository remains the owner of its source, corpus, priority, and verification. The Harness may inspect those repositories and record a proposed handoff, but may not infer a receiving disposition.

### Rollout evidence

An eligible repository has a stable, observable area that can be described truthfully in `docs/specs/`, with named verification evidence and a receiver able to own the corpus. The `tools-ki` repository-audit corpus demonstrates this shape: its numbered requirements lead a maintainer to concrete CLI tests and behaviour.

### Approved planning basis

This plan authorises an evidence-led rollout preparation. It deliberately stops before every receiving decision, adoption, or corpus write.

## Current state

The Harness and `tools-ki` declare `ki-specs`. `tools-ki` carries an as-built repository-audit area at `docs/specs/repository-audit.md`, registered from `docs/specs/index.md`. Its requirements cover `ki repo audit` selection, reporting, output controls, failure status, and multi-repository summaries.

The corpus makes a concrete maintenance question easier to route to the relevant behaviour and focused CLI tests. Its qualitative evidence and deliberately bounded scope are sufficient to prepare receiver-owned candidates, not to imply estate-wide adoption.

## Steps

- [ ] Inventory every estate repository's declared `ki-specs` state, `docs/specs/` corpus, and viable as-built areas; record covered and not-applicable repositories explicitly.
- [ ] Reconcile the `tools-ki` repository-audit corpus against the current `ki-specs` contract and capture the bounded maintenance outcome as rollout evidence.
- [ ] Classify eligible repositories into receiver-owned adoption candidates, naming the proposed first area, verification hook, local owner, and exclusion boundary for each.
- [ ] Prepare one receiver-facing proposal per candidate without editing a peer repository or inferring acceptance; park any candidate that lacks an owner, stable behaviour, or truthful verification.
- [ ] Reconcile totals to the estate inventory and record every proposal, exclusion, and park in this work item.

## Files touched

- This work item, containing the estate inventory, classifications, and receiver-facing proposals

No peer `docs/specs/`, configuration, or roadmap file changes in this item.

## Verify

- Every estate repository appears once with a declared `ki-specs` disposition, including explicit not-applicable and parked results.
- `ki repo audit --skill ki-specs --repo ../tools-ki` passes, and each cited requirement names a concrete existing verification hook.
- Every adoption candidate names a receiving repository, first area, owner, verification, and exclusion boundary; no receiving state changes here.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The `tools-ki` corpus is available as evidence. A proposal cannot progress past this work item until its receiving repository confirms a local disposition; absence of a receiver, stable as-built area, or verification is a named park, not an inferred rollout.

## Delegation

### Locked decisions

- Only this roadmap item may be written; every estate repository remains read-only and owns its own disposition.
- The estate inventory includes the Harness and the declared `ki-all` members; missing access, an absent owner, or insufficient evidence is a named park, never an inferred adoption.

### Escalate

- An inaccessible declared member, disputed estate boundary, or incomplete source inventory that prevents an honest complete count.
- Any candidate without a receiving owner, stable as-built area, or truthful verification hook, and any request to create or alter a peer record or specifications corpus.

### Rounds

- Round 1: `specifications-estate-inventory`.

### Worker: specifications-estate-inventory

- **Deliverable:** Complete estate inventory, `tools-ki` pilot reconciliation, classifications, receiver-facing proposals, exclusions, and reconciled totals in this item.
- **Files:** Write only `docs/roadmap/KI-HARNESS-GOV-002-deploy-specifications-fleetwide.md`; read estate configuration, `docs/specs/`, and existing verification evidence.
- **Definition of done:** Every declared estate repository has a covered, candidate, not-applicable, or parked disposition; every candidate names its proposed first area, receiver, verification, and exclusion boundary.
- **Model:** frontier — cross-repository evidence synthesis under strict receiving-authority boundaries.
- **Verify:** Orchestrator confirms no peer write, samples every cited evidence source, checks totals, then runs the item's roadmap and authoring audits.
- **Checkpoint:** Return with the completed record and a concise list of every park or human decision; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-001-gov002.index` for any Git staging and do not commit.

## Discussion

### Current terminology

Historic Feature Definitions terminology describes superseded work. `ki-specs` and `docs/specs/` are the current contract, so this item does not preserve a parallel format or an alternate documentation category.

### Receiving ownership

The Harness supplies the originating evidence and proposals. Each receiving repository chooses whether to adopt, park, clarify, decline, or supersede its proposal and owns its local specification corpus.

### Evidence boundary

The existing `tools-ki` corpus demonstrates a bounded use case; it does not make any other repository's behaviour, priority, or specification scope a Harness decision.
