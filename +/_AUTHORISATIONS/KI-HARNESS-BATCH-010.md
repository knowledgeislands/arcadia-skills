---
id: KI-HARNESS-BATCH-010
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: true
approved_at: 2026-09-02T20:29:45Z
authority_mode: outcome
authority_evidence: User instructed the agent to keep progressing all six current Now records; the current thread defines this autonomous authority as a batch with consolidated acceptance.
approved_payload_sha256: 1cc7ace46cf081e877280b83c5aae170b78ddc1d04096b74d9264583ced5e710
run_id: KI-HARNESS-BATCH-010-RUN-001
timebox_ends_at: 2026-09-02T23:29:45Z
item_ids: [KI-HARNESS-GOV-047, KI-HARNESS-GOV-052]
completion_target: done
mandatory_stops:
  [
    material-scope-expansion,
    destructive-or-irreversible-work,
    external-coordination,
    verification-failure,
    unapproved-public-contract-decision,
    push-or-release,
  ]
closure_item_ids: [KI-HARNESS-GOV-047, KI-HARNESS-GOV-052]
---

# KI-HARNESS-BATCH-010 — Deliver Now governance contracts

## Outcome authority

Deliver the two Ready, independent Harness governance records to stable verified outcomes. Apply only the policy choices already locked in their canonical plans, retain each lifecycle and review packet, and consolidate acceptance after item-scoped evidence passes.

## Selected plans

1. `KI-HARNESS-GOV-047` — add exact, two-sided standing knowledge intake with receiver-owned subtype vocabulary, inline provenance, Agora independence, itemized fallback, and historical revocation safety.
2. `KI-HARNESS-GOV-052` — add owner-selected external Agora references while preserving reciprocal membership, strict canonical identity, explicit projection classification, and fail-closed conflicts.

The two records touch separate governance skills and decisions. They share the Harness publication and validation surface but remain independently implementable, reviewable, and reversible.

## Excluded current records

- `KI-HARNESS-OPS-005` and `KI-HARNESS-OPS-006` are already in progress and cannot be restarted as Ready batch candidates. Resume their existing evidence and authority separately.
- `KI-HARNESS-FND-014` remains Draft until an authorised GitHub pilot repository, Issue, and mutation authority are named.
- `KI-HARNESS-RTP-004` remains Draft until a personal-server operating system, repository root, SSH path, and Herdr service mode are named.

## Repositories and files in scope

The batch may change only the `ki-agentic-harness` repository: the two canonical roadmap records, `GDR-KI-HARNESS-005`, `GDR-KI-HARNESS-006`, the `ki-trades`, `ki-next`, and `ki-agora` capability roots, generated publications, tests, and this authorisation. Receiver-owned tooling roadmap capture occurs separately after the corresponding Harness contract is accepted.

## Required verification

- Focused `ki-trades`, `ki-next`, and `ki-agora` tests.
- Generated rubric publication parity for every changed governance skill.
- `ki repo audit --skill ki-trades --repo .`.
- `ki repo audit --skill ki-agora --repo .`.
- `ki repo audit --skill ki-work-roadmap --repo .`.
- `ki repo audit --skill ki-authoring --repo .`.
- `ki repo audit --skill ki-skills --repo .`.
- `bun run test`.
- `bunx tsc --noEmit`.

## Allowed decisions and delegation

Apply the exact default-deny standing-intake model and the exact owner-only external-reference model recorded in the Ready plans. Compatibility behavior must preserve existing configurations. No runtime subagent delegation is authorised because neither plan defines a durable delegation lane.

## Completion and remedial policy

Each item must pass independently through `in-progress` and `awaiting-review`, with its immutable baseline and complete review packet. This batch may close exactly the two named records through `ki-accept` after rechecking their evidence. Non-blocking tooling work and operating improvements become receiver-owned roadmap items; they do not widen this Harness batch.

## Run ledger

<!-- ki-batch-run: KI-HARNESS-BATCH-010-RUN-001 1cc7ace46cf081e877280b83c5aae170b78ddc1d04096b74d9264583ced5e710 -->

## Run outcome

- `KI-HARNESS-GOV-047` reached Done through implementation `cee9613d`, review `fe9308d6`, and acceptance `02b22991`; receiver-owned CLI follow-on is ready as `KI-TOOL-CLI-062` at `f378982`.
- `KI-HARNESS-GOV-052` reached Done through implementation `829f7efc`, review `b589e8d3`, and acceptance `47a0b2a8`; receiver-owned host follow-on is ready as `KI-TOOL-CLI-063` at `d245838`.
- Focused TypeScript, tests, generated-rubric publication, `ki-trades`, `ki-agora`, and roadmap audits passed for each item before closure.
- `OPS-005` and `OPS-006` remained outside this batch because they entered it already in progress; they were re-grounded and advanced separately. `FND-014` and `RTP-004` remained outside because their named external execution prerequisites are still absent.
