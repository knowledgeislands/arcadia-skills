---
id: KI-HARNESS-BATCH-004
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: true
approved_at: 2026-08-29T05:29:52Z
authority_mode: outcome
authority_evidence: User explicitly instructed the agent to deliver roughly 80% of the Harness roadmap autonomously and use the batch contract for consolidated acceptance.
approved_payload_sha256: 3e87bd5665093b2c0e810bab4720bb3cdb5b151756ad8816b06398a9d08e737b
run_id: KI-HARNESS-BATCH-004-RUN-001
timebox_ends_at: 2026-08-29T09:29:52Z
item_ids: [KI-HARNESS-GOV-048, KI-HARNESS-GOV-049]
completion_target: done
mandatory_stops: [public-contract-change, material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-decision, push-or-release]
closure_item_ids: [KI-HARNESS-GOV-048, KI-HARNESS-GOV-049]
---

# KI-HARNESS-BATCH-004 — Deliver governance repairs

## Outcome authority

Select and deliver stable, non-contentious Harness roadmap work while the user is unavailable. Keep policy choices, external coordination, destructive work, pushes, releases, and failed verification outside the run.

## Selected plans

1. KI-HARNESS-GOV-048 — add scoped Standard Readme guidance to `ki-authoring`.
2. KI-HARNESS-GOV-049 — repair the WEB-6 declared warning level and regression coverage.

The records are independent, modify distinct skill surfaces, and retain separate verification and review packets.

## Scope

- Repository: `knowledgeislands/ki-agentic-harness`
- Files: the named records and their approved `ki-authoring` or `ki-repo-website-content` implementation surfaces
- Batch control: this authorisation and append-only run ledger
- Excluded: peer writes, dependency changes, unrelated refactors, pushes, releases, pruning

## Excluded candidates

- KI-HARNESS-GOV-047 — standing-intake representation and subtype ownership remain material policy decisions.
- Current operations and remote-session records — already in progress or dependent on live external state.

## Required verification

- Each named plan’s focused checks
- `bun run test`
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Allowed decisions and acceptance

Apply only the locked boundaries in each record. No runtime delegation is needed. Each item must reach `awaiting-review` with the exact six-heading review packet before `ki-accept` records `done`. Non-blocking improvements become separately scoped remedial records.

## Mandatory stops

Stop the affected item for any frontmatter mandatory stop. Continue only the other item if its scope and verification remain independent.

## Run ledger

<!-- ki-batch-run: KI-HARNESS-BATCH-004-RUN-001 3e87bd5665093b2c0e810bab4720bb3cdb5b151756ad8816b06398a9d08e737b -->

| Item | Start | Result | Evidence | Verification |
| --- | --- | --- | --- | --- |
| KI-HARNESS-GOV-048 | `ready`; `6507ba87` | `done` | `74787850`; accepted `d44ade89` | Authoring, skill, roadmap, 531-test, and TypeScript gates pass. |
| KI-HARNESS-GOV-049 | `ready`; `5f4263ae` | `done` | `6507ba87`; accepted `d44ade89` | Focused six-test, skill, roadmap, 531-test, and TypeScript gates pass. |

## Batch recap

Both admitted records reached `done` through their own verified review packets and the exact consolidated-acceptance scope. GOV-047 remained excluded because standing-intake policy choices are not covered by the outcome authority. Independently completed FND-019 and FND-020 were accepted before this run. No destructive action, peer write, push, release, prune, failed verification, or remedial record occurred.
