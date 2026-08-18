---
id: KI-HARNESS-BATCH-003
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: true
approved_at: 2026-08-18T09:08:56Z
approved_payload_sha256: 63e7f7fbe3b6d7aeadcebd24dd7ecdd4ac22595ec3a6eabead0d5cb45a99078d
run_id: KI-HARNESS-BATCH-003-RUN-001
timebox_ends_at: 2026-08-18T17:08:56Z
item_ids: [KI-HARNESS-GOV-046, KI-HARNESS-FND-015, KI-HARNESS-RTP-001]
completion_target: awaiting-review
mandatory_stops: [public-contract-change, material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-decision, push-or-release]
---

# KI-HARNESS-BATCH-003 — Deliver current Harness capabilities

## Purpose

Implement the three approved Now records in one bounded Harness cycle: complete the read-only KI configuration-structure audit, add portable Pulse, and add opt-in Codex session housekeeping. Each item retains its own baseline, lifecycle, verification, review packet, and `awaiting-review` destination.

## Named plans and order

1. [KI-HARNESS-GOV-046](../../docs/roadmap/KI-HARNESS-GOV-046-audit-and-structure-ki-configuration.md) — audit the registered estate and recommend the smallest useful configuration-ordering convention.
2. [KI-HARNESS-FND-015](../../docs/roadmap/KI-HARNESS-FND-015-explore-knowledge-acquisition.md) — add the bounded, on-demand `ki-pulse` process.
3. [KI-HARNESS-RTP-001](../../docs/roadmap/KI-HARNESS-RTP-001-add-codex-housekeeping.md) — add opt-in, repository-scoped Codex session housekeeping through a fail-closed app-server adapter.

GOV-046 and the isolated Pulse core may start in parallel. The coordinator integrates Pulse's shared catalogue, guide, and evaluation-harness surfaces before starting RTP-001's shared publication integration. RTP-001 remains coordinator-owned because it establishes a destructive-runtime safety boundary. There is no dependency edge between the canonical records; this order prevents shared-file collisions.

## Scope

- Repository: this Harness only; registered estate roots are read-only evidence for GOV-046.
- GOV-046: only its canonical roadmap record may be written.
- FND-015: its named `ki-pulse` skill, evaluation, publication, guide, and canonical roadmap files.
- RTP-001: its named `ki-housekeeping-codex` skill, app-server adapter, rubric, tests, Harness declaration, `ki-repo` runtime note, publication, guide, and canonical roadmap files.
- Batch control: this authorisation and its append-only run ledger.
- Excluded: peer-repository writes, configuration conformance, standing Pulse storage, authenticated or scheduled discovery, mandatory Codex-housekeeping rollout, unsupported retention inspection, unrelated refactors, dependency changes, external writes, pushes, releases, closure, and pruning.

## Timebox and completion target

- Proposed timebox: eight hours from explicit approval.
- Completion target: every named record reaches `awaiting-review` with its own canonical review packet, or is parked with evidence and the exact human decision required.

## Required verification

- Each item’s stated focused verification and exact review packet.
- `ki repo audit --skill ki-delegation --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- No peer write, destructive live-session test, external write, push, release, closure, or prune.

## Allowed decisions and delegation

- Locked decisions: use the three approved plans and their stated ownership, safety, and follow-up boundaries; do not reopen those decisions during delivery.
- Delegation: permitted only for the `configuration-audit` and `pulse-core` packets embedded in their canonical work items. The coordinator reviews and integrates both results, owns all shared files, serialises lifecycle and Git writes, and performs final verification.
- RTP-001 remains on the coordinator lane. Protocol fixtures use local fakes only; no live session may be deleted during development or verification.
- Decisions: apply only the locked plan decisions. Escalate any new public contract, destructive behaviour, external coordination, owner conflict, shared-file scope expansion, or unavailable required verification.
- Closure: not authorised. Every record stops at `awaiting-review`.

## Mandatory stops

- Any public-contract change outside a named plan, material scope expansion, destructive or irreversible action, new external dependency or coordination need, required-verification failure, push, release, or unapproved decision.
- Any attempted peer write, live Codex session deletion, standing Pulse storage, mandatory estate rollout, unresolved skill-ownership conflict, or inability to preserve the worker isolation declared in the roadmap packets.

## Approval

Approved by the user at 2026-08-18T09:08:56Z for this exact candidate set, scope, delegation, eight-hour timebox, completion target, and mandatory stops. Approval grants no closure, pruning, push, or release authority.

## Run ledger

<!-- ki-batch-run: KI-HARNESS-BATCH-003-RUN-001 63e7f7fbe3b6d7aeadcebd24dd7ecdd4ac22595ec3a6eabead0d5cb45a99078d -->

| Item | Start | Result | Evidence | Verification and decisions |
| --- | --- | --- | --- | --- |
| KI-HARNESS-GOV-046 | `ready`; baseline `081922e8bf0651dfa44f8995df414c23a8b1ab29` | `awaiting-review` | `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8`; configuration-audit packet | Read-only estate and focused checks passed; no peer writes. |
| KI-HARNESS-FND-015 | `ready`; baseline `081922e8bf0651dfa44f8995df414c23a8b1ab29` | `awaiting-review` | `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8`; pulse-core packet | Focused checks passed; standing storage remained excluded. |
| KI-HARNESS-RTP-001 | `ready`; baseline `081922e8bf0651dfa44f8995df414c23a8b1ab29` | `awaiting-review` | `029ca173e1be0cd751a8cf66d6f77f26e8b01cf8`; coordinator implementation | Focused checks passed; fake clients only and no live deletion. |

The coordinator integrated both authorised delegates and retained shared-file, lifecycle, Git, and destructive-runtime ownership. `ki-delegation`, `ki-skills`, and `ki-work-roadmap` audits passed or had no FAIL; TypeScript and all item-focused checks passed. The full suite's unrelated aggregate-remediation assertion and the authoring audit's six pre-existing generated-anchor defects were explicitly accepted by the user on 2026-08-18 as verification exceptions. No peer write, external write, push, release, closure, prune, or live-session deletion occurred.
