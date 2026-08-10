---
id: KI-HARNESS-GOV-036
title: Route specifications evidence
area: GOV
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Give the three receivers with active reciprocal work routes a concise, immutable proposal to decide whether to adopt their bounded `ki-specs` area.

## Context

Accepted GOV-002 established eleven receiver-owned `ki-specs` candidates. A fresh Harness route audit confirms active reciprocal work routes only for `krisb/dotfiles`, `knowledgeislands/ki-website`, and `knowledgeislands/tools-mgit`; the other eight candidates have no active receipt path and must remain evidence, not artificially created peer work.

## Boundary

Write only Harness outbound trade records. Do not alter a peer configuration, create an inbound copy, claim receipt, choose a receiver disposition, run a peer verification command, or submit any proposal where reciprocal work receipt is unavailable.

## Current state

The three active routes export `work` from the Harness and import it at the named receiver. GOV-002 contains the agreed first area, current verification hook, owner, and exclusions for each. No trade preparation or submission currently exists.

## Steps

- [ ] Re-ground the three active reciprocal work routes and the corresponding GOV-002 proposal boundaries.
- [ ] Create one immutable `work` submission for each of `krisb/dotfiles`, `knowledgeislands/ki-website`, and `knowledgeislands/tools-mgit`, using `observation: decision` and the accepted GOV-002 source reference.
- [ ] Audit the Harness trade records and confirm that no receiver copy, peer write, receipt, or disposition was inferred.
- [ ] Record the individual submission identities, evidence, and receiver-owned next condition in this item's review packet.

## Files touched

- This roadmap item
- `-/_TRADES/krisb/dotfiles/TRD-<eight-hex>.md`
- `-/_TRADES/knowledgeislands/ki-website/TRD-<eight-hex>.md`
- `-/_TRADES/knowledgeislands/tools-mgit/TRD-<eight-hex>.md`

## Verify

- `ki repo audit --skill ki-trades --repo .` passes before and after the submission records are authored.
- Each record has a distinct valid `TRD-<eight-hex>` identity, `kind: work`, `phase: submitted`, `observation: decision`, and all required non-empty sender sections.
- Every payload matches its accepted GOV-002 receiver-facing proposal and preserves its exclusions.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

GOV-002 is accepted and supplies the source evidence. The fresh route audit proves the three delivery paths; the other eight candidate paths are deliberately out of scope until their repositories independently configure a reciprocal route.

## Delegation

### Locked decisions

- Submit only the three route-ready GOV-002 proposals, with their current first areas, verification hooks, and exclusion boundaries unchanged.
- Every receiver retains exclusive receipt, disposition, priority, and implementation authority.

### Escalate

- A route no longer being reciprocal, a changed or unavailable accepted source proposal, any ambiguous sender-owned payload, or any request to create a peer copy or configuration route.

### Rounds

- Round 1: `author-route-ready-specification-submissions` after orchestration confirms the fresh routes and item baseline.

### Worker: author-route-ready-specification-submissions

- **Deliverable:** Three valid outbound `work` submissions that faithfully project the named GOV-002 proposals.
- **Files:** Write only the three named paths under `-/_TRADES/`; do not stage or commit.
- **Definition of done:** Three distinct submitted records pass the local `ki-trades` audit and contain no receiver-local field.
- **Model:** reasoning — high-confidence authority and boundary preservation across three independent receiver projections.
- **Verify:** Orchestrator compares each payload against GOV-002, rechecks routes and record shape, then runs the stated audits.
- **Checkpoint:** Return with the three record paths, identities, and any route or payload stop; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-002-gov036.index` for any Git staging and do not commit.

## Discussion

### Submission is not adoption

The outward record makes a bounded proposal visible. It neither creates a receiver roadmap record nor obliges the receiver to review, accept, or implement it.

### Deferred candidates

The remaining eight GOV-002 candidates remain retained evidence in the accepted source record. A sender-side export alone is not a reason to change their repositories' trade configuration or to manufacture an inbound record.
