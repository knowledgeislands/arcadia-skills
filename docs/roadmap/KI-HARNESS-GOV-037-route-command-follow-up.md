---
id: KI-HARNESS-GOV-037
title: Route command follow-up
area: GOV
theme: governance-consistency
horizon: waiting-for
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Give KI Website a receiver-owned decision record for its unclassified remote `ki:site:upload` package entrypoint.

## Context

Accepted GOV-028 found one follow-up across the estate: KI Website's `ki:site:upload` runs `cd site && bunx wrangler versions upload`, has a remote effect, and lacks an identified checked-in caller or governing safety standard. The Harness-to-KI Website work route is reciprocally active, so the factual finding can be submitted without altering the Website repository.

## Boundary

Do not run the upload command, modify any Website script, create a receiver copy, choose its disposition, or combine this command decision with GOV-002's separate `ki-specs` adoption proposal.

## Current state

The accepted GOV-028 inventory records the exact command, evidence boundary, and two valid receiver options: establish it as an intentional operational entrypoint with a documented owner and safety boundary, or remove it through receiver-owned work. No outbound follow-up exists.

The required route is not currently available. The Harness exports only `knowledge` to KI Website and KI Website imports only `knowledge` from the Harness, while this item requires a `work` submission. The earlier Ready state therefore cannot author the planned record safely.

## Steps

- [ ] Re-ground the reciprocal KI Website work route and the accepted GOV-028 finding.
- [ ] Create one immutable `work` submission for KI Website, with `observation: decision`, presenting the two receiver-owned options without selecting either.
- [ ] Audit the Harness trade record and confirm that no upload, peer write, receipt, or receiver disposition occurred.
- [ ] Record the submission identity, evidence, and receiver-owned next condition in this item's review packet.

## Files touched

- This roadmap item
- `-/_TRADES/knowledgeislands/ki-website/TRD-<eight-hex>.md`

## Verify

- `ki repo audit --skill ki-trades --repo .` passes before and after the submission record is authored.
- The record has a valid `TRD-<eight-hex>` identity, `kind: work`, `phase: submitted`, `observation: decision`, and all required non-empty sender sections.
- The payload preserves GOV-028's factual finding, remote-effect safety boundary, and receiver-owned options without choosing an outcome.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

GOV-028 is accepted and supplies the factual finding. Return this item to Next only after both repositories independently declare a reciprocal `work` route and the local `ki-trades` audit confirms it. The future receiver decision remains independent.

## Delegation

### Locked decisions

- Preserve the accepted GOV-028 finding and its two receiver-owned options without choosing an outcome.
- Do not execute the package command or write any KI Website file.

### Escalate

- A route no longer being reciprocal, unavailable source evidence, ambiguity in the factual record, or a request to perform upload, deletion, configuration, or any peer write.

### Rounds

- Round 1: `author-upload-follow-up-submission` after orchestration confirms the fresh route and item baseline.

### Worker: author-upload-follow-up-submission

- **Deliverable:** One valid outbound `work` submission that presents the GOV-028 finding and receiver-owned options exactly.
- **Inputs:** The accepted GOV-028 record, the current reciprocal route evidence, and the `ki-trades` submission contract.
- **Scope:** Write only the named path under `-/_TRADES/knowledgeislands/ki-website/`; do not stage or commit.
- **Authority:** Create the named outbound submission only; do not upload, write to the receiver, set a disposition, stage, or commit.
- **Isolation:** Shared worktree with exclusive write scope over the named submission path and no Git write commands.
- **Definition of done:** One submitted record passes the local `ki-trades` audit and contains no receiver-local field.
- **Model:** reasoning — remote-effect safety and receiver-ownership boundaries must remain exact.
- **Verify:** Coordinator compares the payload against GOV-028, rechecks the route and record shape, then runs the stated audits.
- **Return:** Submission path and identity, verification evidence, and any route or payload stop; no receiver action.
- **Checkpoint:** Return when the record and local audit evidence are complete, or at the first route or payload stop.

## Discussion

### Receiver decision

The receiver may retain and document the operation, create local work to remove it, or use another valid trade disposition. This sender-side record intentionally makes no recommendation between those outcomes.
