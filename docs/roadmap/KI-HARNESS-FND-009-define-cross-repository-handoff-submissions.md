---
id: KI-HARNESS-FND-009
title: Define cross-repository handoff submissions
theme: foundation-tooling
horizon: next
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 59156a47570d61460c27913f0a400de925c224b6
---

## Goal

Give Knowledge Islands repositories a safe, shared way to submit work to one another while each receiving repository remains the sole owner of its priorities, roadmap, and acceptance decisions.

## Context

The current `+/_HANDOFFS/` and `-/_HANDOFFS/` areas are only local working-area scaffolding owned by `ki-repo`. They do not define stable handoff identity, reciprocal permission, submission lifecycle, or how the sender learns a receiving repository's decision.

The Harness and `tools-ki` are currently operating under direct super trust: the accepted `KI-TOOL-CLI-011` Feature Definitions pilot is recorded directly in this repository's roadmap rather than through a new transport protocol. That bridge provides evidence for the design but does not itself establish a route.

The archived delegation-readiness `ki-handoffs` doctrine is a distinct, retired concept. This item creates a new cross-repository submission capability; it must not revive the old delegation semantics or command surface.

## Boundary

Do not implement `ki handoffs` host commands, allow one repository to write another's roadmap or configuration, auto-accept a submission, or add remote interchanges in this item. A route authorises submission visibility only; the receiver still decides whether to adopt, park, clarify, decline, or supersede the proposed work.

## Current state

`ki-next` can include the local inbound and outbound working areas in roadmap judgment, but no governed protocol says which peer may submit work, where a record belongs, or when either side may remove its local copy.

The agreed initial model is local registered-repository visibility. A sender writes only its own outbound item; a receiver reads it and, if the reciprocal route is active, creates and updates only its own inbound item. Remote visibility will require a future trusted interchange rather than an exception to this authority boundary.

## Steps

- [x] Write a decision record defining cross-repository handoff submissions, including repository identity as canonical `owner/repo`, submission versus transfer semantics, authority boundaries, and the direct-super-trust bootstrap bridge.
- [x] Create a new governance `ki-handoffs` skill that defines the two-level `owner/repo` layout, a globally unique `HND-...` identity, required metadata, allowed receiver statuses, and the sender-deletion pruning signal.
- [x] Define local route declarations and reciprocal route checking: each side records its willingness to exchange with the other, and only matching declarations form an active bi-directional route.
- [x] Move `_HANDOFFS` scaffolding and lifecycle ownership from `ki-repo` to the new capability while preserving `+` and `-` as generic working areas.
- [x] Add focused verification for route and submission shape, reciprocal-route eligibility, sender and receiver write boundaries, lifecycle status handling, and safe pruning observations.
- [ ] Record the published contract directly in `tools-ki` item `KI-TOOL-CLI-012` so its CLI delivery can proceed independently.

## Files touched

- A new decision record under `docs/decisions/`
- `skills/governance/ki-handoffs/`
- `skills/keystone/ki-repo/` standards and references that currently own `_HANDOFFS`
- Colocated governance-skill checker and rubric tests
- This work item and the directly linked `tools-ki` roadmap item

## Verify

- `ki repo audit --skill ki-skills --repo .`
- Focused `ki-handoffs` checker and rubric tests
- `bun run test`
- A fixture-backed review proves that an unreciprocated route, a peer write, a mismatched identity, and premature pruning are all refused or reported rather than inferred as acceptance.

## Dependencies / blocks

`tools-ki` item `KI-TOOL-CLI-012` is immediate follow-on work but cannot implement the public command surface until this item publishes the decision record and `ki-handoffs` contract. The present roadmap schema validates dependency fields locally only, so the cross-repository dependency is recorded here and in that receiving item rather than in `blocks` or `blocked-by`.

## Delegation

### Locked decisions

- Define a local registered-repository submission capability only. A route grants visibility, never authority to modify another repository's roadmap, configuration, or acceptance state.
- Use canonical `owner/repo` peer identities, two-level inbound and outbound storage, and globally unique `HND-...` identifiers.
- Preserve `+` and `-` as `ki-repo` generic working areas; move only `_HANDOFFS` scaffold and lifecycle ownership to `ki-handoffs`.
- Keep the direct-super-trust Feature Definitions pilot as a documented bootstrap bridge. Do not add host commands, remote interchange, or a revival of the retired delegation-readiness doctrine.

### Escalate

- Stop for owner direction if the decision record or skill would make a receiving repository's adoption, priority, or acceptance automatic.
- Stop for owner direction before any `tools-ki` write, transport implementation, or change outside the decision, new skill, `ki-repo` ownership boundary, local fixtures, and this work item.

### Round 1 — surface and contract discovery

- **Class / worker / model:** Research / fresh general-purpose worker / `gpt-5.6-terra` at medium reasoning, sufficient for a bounded read-only repository and peer-record inventory.
- **Scope:** Read-only inspection of the harness's current working-area and roadmap contracts, adjacent governance-skill patterns, and the existing `tools-ki` `KI-TOOL-CLI-012` record.
- **Definition of done:** Return a concise, cited inventory of exact files, existing data shapes, receiving-item constraints, and contradictions or missing decisions that affect the locked contract. Do not create, edit, or commit files.
- **Verification gate:** The orchestrator re-reads every source that shapes the next decision or file boundary before authoring; unsupported inferences are escalated.
- **Checkpoint:** Report the findings only. The next implementation round starts only after orchestrator review turns them into a bounded decision-and-skill brief.

## Discussion

### Authority model

An inbound handoff is a submission from an allowed peer, never a command to create or prioritise local work. The receiver's agent reads the sender's outbound record, creates its own inbound copy when the route is active, and records its local judgment. The source work-item identifier remains provenance only; the handoff receives an independent globally unique identity and any adopted receiver work receives its own local identifier.

### Lifecycle

The sender creates `-/_HANDOFFS/<owner>/<repo>/HND-<id>.md`. The receiver may read that record and create `+/_HANDOFFS/<owner>/<repo>/HND-<id>.md`, then updates only its inbound copy with `received`, `adopted`, `parked`, `clarify`, `declined`, or `superseded`. The sender reads that outcome and removes only its outbound copy when it has acted on it; that absence is the receiver's signal that it may prune the inbound copy. No separate receipt file is needed.

### Route model

Routes use canonical repository addresses, not internal repository codes. Each repository independently declares peers it is willing to exchange with. Two matching declarations create an active bi-directional route; one declaration is a proposal, and absent or diverging declarations are reported as drift rather than silently trusted.

### Future interchange

A later interchange may be a trusted, scoped transport module for repositories without direct mutual visibility. It may relay permitted handoff records or statuses, but it never makes receiving decisions or gains authority to mutate either repository's roadmap.
