---
id: KI-HARNESS-BATCH-001
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: false
approved_at: null
timebox_ends_at: 2026-08-17T18:00:00Z
item_ids: [KI-HARNESS-GOV-028, KI-HARNESS-GOV-031, KI-HARNESS-GOV-002]
completion_target: awaiting-review
mandatory_stops: [public-contract-change, material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-decision, push-or-release]
---

# KI-HARNESS-BATCH-001 — Establish estate governance evidence

## Purpose

Run three independent, read-only estate inventories in one bounded evidence pass. Each item updates only its own Harness roadmap record, routes any concrete change to the receiving repository, and stops at `awaiting-review`.

## Named plans and order

1. [KI-HARNESS-GOV-028](../../docs/roadmap/KI-HARNESS-GOV-028-audit-package-commands.md) — package-command estate inventory
2. [KI-HARNESS-GOV-031](../../docs/roadmap/KI-HARNESS-GOV-031-normalise-schema-versions.md) — active-schema and version inventory
3. [KI-HARNESS-GOV-002](../../docs/roadmap/KI-HARNESS-GOV-002-deploy-specifications-fleetwide.md) — `ki-specs` rollout evidence and receiver proposals

The records are independent and may run in parallel after fresh preflight. The order is the review and ledger order, not a dependency: each record retains its own baseline, verification, and review packet.

## Scope

- Repositories: the Harness and declared `ki-all` estate members are read-only evidence sources.
- Files: only the three named Harness roadmap records may be written.
- Excluded: peer roadmap or source changes, schema or package-script edits, configuration writes, running side-effecting scripts, dependency changes, pushes, releases, and closure or pruning.

## Timebox and completion target

- Proposed timebox: four hours from explicit approval. The frontmatter expiry must be replaced with the approved window before this record becomes active.
- Completion target: every named record reaches `awaiting-review` with its own review packet, or is parked with evidence and the exact human decision required.

## Required verification

- Each named plan's stated evidence and roadmap/authoring audits.
- A fresh per-item baseline, explicit estate-scope reconciliation, and sampling of every cited source or proposed receiver route.
- No peer write, side-effecting script invocation, push, release, closure, or prune.

## Allowed decisions and delegation

- Delegation: only the bounded workers recorded in each work item's `## Delegation` packet.
- Runtime allocation: GOV-002 uses a frontier-purpose worker (`gpt-5.6-sol`, high reasoning); GOV-028 and GOV-031 use reasoning-purpose workers (`gpt-5.6-sol`, high reasoning). The orchestrator reviews all evidence, integrates writes, and serialises commits.
- Decisions: apply the locked inventory and receiving-ownership boundaries. Escalate any uncertain estate membership, inaccessible source, incomplete owner or verification, public-contract question, or peer write.
- Closure: not authorised. No record may move beyond `awaiting-review`.

## Mandatory stops

- Any public-contract change outside a named plan, material scope expansion, destructive or irreversible work, new external dependency or coordination need, failed required verification, push, release, or unapproved decision.
- Any incomplete estate scope, unresolved source conflict, unavailable receiver, or request to change a peer repository; record the affected item as parked rather than widening this batch.

## Excluded ready work

- FND-008 and RTP-006 need their own contract and primary-source decisions.
- GOV-007's resulting implementation scope depends on package-inventory evidence.
- GOV-016 changes the immediate-work format and multiple shared skill surfaces, including every named record here.
- GOV-009 is in Next and requires a separate receiver-owned `tools-ki` implementation decision.

## Approval

This is an unapproved preparation record only. It grants no implementation authority until a human approves its exact named set and an active four-hour timebox in frontmatter.
