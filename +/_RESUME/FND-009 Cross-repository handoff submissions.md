---
type: admin-resume-checkpoint
title: 'FND-009 Cross-repository handoff submissions'
thread: 'FND-009 Cross-repository handoff submissions'
created: 2026-08-03T10:22:03Z
updated: 2026-08-03T10:22:03Z
---

# FND-009 Cross-repository handoff submissions

## Objective

Publish a safe, portable cross-repository submission contract without giving a sending repository authority over a receiver's roadmap, priorities, implementation, or acceptance.

## Current state

The Harness-side contract is complete and committed as `34dbf448` (`feat(handoffs): define local submission contract`).

`GDR-KI-HARNESS-005` makes the eight contract choices durable: canonical `owner/repo` identity, reciprocal routes, independent `HND-` UUID identities, immutable sender evidence, receiver-only dispositions, no transfer or automatic adoption, conditional sender release, and observed receiver pruning.

The new `ki-handoffs` governance skill owns `_HANDOFFS`; `ki-repo` retains the generic `+` and `-` working areas.

FND-009 remains `in-progress` solely because the published contract has not yet been recorded in `tools-ki` item `KI-TOOL-CLI-012`.

## Decisions made

- A route grants submission visibility only; it never grants cross-repository write authority.
- A route is active only when both registered repositories declare matching, reciprocal peer entries.
- The sender owns its outbound record; the receiver owns its inbound copy and disposition.
- Only `adopted`, `declined`, and `superseded` permit sender release; receiver pruning requires observing that release.
- The earlier Feature Definitions pilot remains a direct-super-trust bootstrap bridge, not a compatibility path or protocol exception.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-005-cross-repository-handoff-submissions.md` — governing contract.
- `skills/governance/ki-handoffs/` — new governance capability, standard, and native checker.
- `skills/keystone/ki-repo/` — generic working-area ownership only.
- `skills/governance/ki-roadmap/` and `skills/process/ki-next/` — handoff lifecycle routing.
- `docs/roadmap/KI-HARNESS-FND-009-define-cross-repository-handoff-submissions.md` — implementation status.

## Read first

- `docs/roadmap/KI-HARNESS-FND-009-define-cross-repository-handoff-submissions.md` — work-item scope and final unchecked step.
- `docs/decisions/GDR-KI-HARNESS-005-cross-repository-handoff-submissions.md` — governing contract.
- `skills/governance/ki-handoffs/SKILL.md` — capability boundary and operating model.
- `skills/governance/ki-handoffs/references/standards-handoffs.md` — record, route, and lifecycle shape.

## Verification

Before commit `34dbf448`, the Harness suite, TypeScript check, focused `ki-handoffs` checker/rubric tests, and the relevant `ki repo audit` checks passed. Re-check current Git state before relying on this record.

## Open questions

None for the local contract.

The future remote interchange remains intentionally out of scope; it needs a separately trusted transport design.

## Next step

In `tools-ki`, read `KI-TOOL-CLI-012` and record this published contract as its incoming dependency/context, preserving `tools-ki`'s ownership of its roadmap and CLI delivery. Do not add host commands, remote transport, or cross-repository write behaviour in the Harness.
