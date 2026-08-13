---
id: KI-HARNESS-BATCH-002
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: true
approved_at: 2026-08-13T05:45:13Z
approved_payload_sha256: 3cc99c93dfe5b3837ce93b613775155f394d8793d42a93a55541c2a14308beab
run_id: KI-HARNESS-BATCH-002-RUN-001
timebox_ends_at: 2026-08-13T13:45:13Z
item_ids: [KI-HARNESS-GOV-035, KI-HARNESS-FND-008]
completion_target: awaiting-review
mandatory_stops: [public-contract-change, material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-decision, push-or-release]
---

# KI-HARNESS-BATCH-002 — Harden plan provenance and code review evidence

## Purpose

Deliver two independent, local, bounded maintenance changes in one Harness cycle. Each item retains its own baseline, verification, review packet, and `awaiting-review` destination.

## Named plans and order

1. [KI-HARNESS-GOV-035](../../docs/roadmap/KI-HARNESS-GOV-035-remove-plan-fallback.md) — remove the retired plaintext plan-sync ingress while retaining strict JSON V1.
2. [KI-HARNESS-FND-008](../../docs/roadmap/KI-HARNESS-FND-008-add-change-aware-code-reviews.md) — add advisory change-aware engineering review evidence through the approved Git trailer shape.

The items have no dependency edge and touch disjoint implementation surfaces. Their shared advantage is one bounded Harness maintenance window and one final repository verification cycle; the order is review and ledger order, not a dependency.

## Scope

- Repository: this Harness only.
- GOV-035: `hooks/plan-sync.sh`, its tests, `hooks/README.md`, `docs/specs/harness.md`, and its canonical roadmap record.
- FND-008: `ki-engineering` and `ki-git` contract, rubric, and focused-test surfaces, plus its canonical roadmap record.
- Excluded: user configuration, peer repositories, external systems, runtime installation, push, release, closure, pruning, and any work not named above.

## Required verification

- Each item's stated focused verification and its own review packet.
- `ki repo audit --skill ki-change-management-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Allowed decisions and delegation

- The approved JSON V1-only migration and the approved consistency-review trailer contract are locked.
- Delegate only a bounded, non-overlapping implementation lane when it does not expand authority; the coordinator integrates, verifies, and commits.
- Escalate a public-contract change beyond either approved record, an unapproved Git-policy change, unavailable verification, source conflict, or any scope overlap.
- Closure authority is not granted. Both items stop at `awaiting-review`.

## Mandatory stops

- Public-contract change outside a named plan, material scope expansion, destructive or irreversible work, external coordination, verification failure, push, release, or unapproved decision.
- A cross-skill ownership conflict that the approved records do not already resolve.

## Approval

Approved by the user on 2026-08-13 for the exact named set, an eight-hour timebox, and the `awaiting-review` completion target. It grants no authority beyond this record.

## Run ledger

<!-- ki-batch-run: KI-HARNESS-BATCH-002-RUN-001 3cc99c93dfe5b3837ce93b613775155f394d8793d42a93a55541c2a14308beab -->

| Item | Start | Result | Evidence | Next human action |
| --- | --- | --- | --- | --- |
