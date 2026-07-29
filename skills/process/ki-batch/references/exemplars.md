# Batch authorisation example

Use this as a reviewable record, not as a new tracker or a substitute for the canonical work items.

```md
# BATCH-2026-07-01 — Harden compatible-harness release evidence

## Purpose

Deliver the named independent release-evidence work items before the end of the current maintenance window.

## Named plans and order

1. KI-HARNESS-FND-001 — verify hosted release evidence
2. KI-HARNESS-FND-002 — protect generated rubric publications

FND-002 may start only after FND-001 has recorded its shared host result.

## Scope

- Repositories: `knowledgeislands/tools-ki`, `knowledgeislands/ki-agentic-harness`
- Files: the named plans, their stated implementation files, and generated rubric publications
- Excluded: releases, pushes, website changes, new dependencies, and unrelated refactors

## Timebox and completion target

- Timebox: two hours from explicit approval
- Completion target: every named item reaches `acceptance` with its own verification packet, or is parked with evidence and a required human decision

## Required verification

- Each plan's stated checks
- Repository TypeScript and focused test gates where the plan changes TypeScript
- Generated rubric publication verification where the plan changes a structured catalogue

## Allowed decisions and delegation

- Delegation: permitted only for the bounded mechanical units named in each plan
- Decisions: apply locked plan decisions; escalate any new interface, external coordination, scope, or safety decision
- Acceptance: not authorised in this batch; each item stops at `acceptance`

## Mandatory stops

- Any public-contract change outside a named plan
- Material scope expansion, destructive or irreversible work, a new external dependency or coordination need
- Required-verification failure, push, release, or an unapproved decision

## Approval

Approved by: <human name and timestamp>
```

The approval must be explicit and must cover this exact record.

If acceptance authority is intended, name the exact items and state it separately under **Allowed decisions and delegation**.

Pruning needs its own explicit roadmap-item path or glob selection even when batch acceptance is authorised.

## Parked-item and post-gate example

Append the outcome to the approved authorisation; do not create a parallel tracking system.

```md
## Run ledger

| Item               | Start | Result     | Evidence                                             | Next human action                             |
| ------------------ | ----- | ---------- | ---------------------------------------------------- | --------------------------------------------- |
| KI-HARNESS-FND-001 | ready | acceptance | `<baseline>` → `<commit>`; stated checks pass        | Review acceptance packet                      |
| KI-HARNESS-FND-002 | ready | parked     | FND-001 exposed a public API choice outside the plan | Decide the API contract, then re-plan FND-002 |

## Batch recap

FND-001 reached Acceptance with its recorded verification. FND-002 was parked rather than widened because its dependent API decision was not authorised. No independent remaining item was admitted. The batch stopped at its normal Acceptance target; no item was accepted, marked Done, pruned, pushed, or released.
```

The ledger accounts for every admitted item, including a parked one.

It names the evidence and the exact decision needed rather than recasting a stop as an incomplete success.
