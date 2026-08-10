---
id: KI-HARNESS-BATCH-002
repository: https://github.com/knowledgeislands/ki-agentic-harness
approved: false
approved_at: null
timebox_ends_at: 2026-08-10T13:30:00Z
item_ids: [KI-HARNESS-GOV-036, KI-HARNESS-GOV-037]
completion_target: awaiting-review
mandatory_stops: [public-contract-change, material-scope-expansion, destructive-or-irreversible-work, external-coordination, verification-failure, unapproved-decision, push-or-release]
---

# KI-HARNESS-BATCH-002 — Route accepted estate evidence

## Purpose

Submit four independent, receiver-owned work proposals from the accepted estate evidence without changing a peer repository or inferring a peer decision.

## Named plans and order

1. [KI-HARNESS-GOV-036](../../docs/roadmap/KI-HARNESS-GOV-036-route-specifications-evidence.md) — three route-ready `ki-specs` proposals.
2. [KI-HARNESS-GOV-037](../../docs/roadmap/KI-HARNESS-GOV-037-route-command-follow-up.md) — one KI Website remote-upload follow-up.

The two records are independent. They share the same Harness-owned trade format and final audit, but retain separate sender payloads, receiver boundaries, baselines, verification, and review packets.

## Scope

- Repositories: write only the Harness; inspect KI Website, dotfiles, and tools-mgit route declarations read-only.
- Files: the two named roadmap records and four new outbound records below `-/_TRADES/`.
- Excluded: peer records, receiver copies or decisions, all trade-route configuration, local specifications corpora, package commands, uploads, source changes, dependency changes, push, release, closure, and pruning.

## Timebox and completion target

- Proposed timebox: four hours from explicit approval. Replace the frontmatter expiry with the approved window before this record becomes active.
- Completion target: both records reach `awaiting-review` with independent review packets, or the affected record is parked with route or payload evidence and the exact human decision required.

## Required verification

- Recheck the four active typed route halves immediately before authoring any record.
- `ki repo audit --skill ki-trades --repo .` passes after every authored submission set.
- Each item passes its roadmap and authoring audits; the orchestrator compares every sender payload against its accepted source evidence.
- No package command, peer write, receiver copy, receipt, disposition, push, release, closure, or prune occurs.

## Allowed decisions and delegation

- Delegation: the two non-overlapping packet workers may author their item's outbound records after fresh preflight; the orchestrator reviews all content, runs audits, and serialises commits.
- Runtime allocation: use a reasoning-purpose worker with high reasoning for each payload lane because the value is in preserving authority and safety boundaries, not volume.
- Decisions: apply only the accepted GOV-002 and GOV-028 evidence plus the fresh active-route facts. Escalate any changed route, payload ambiguity, external coordination request, or peer-write request.
- Closure: not authorised. Both records stop at `awaiting-review`.

## Mandatory stops

- Any public-contract change, material scope expansion, destructive or irreversible work, external coordination, verification failure, push, release, or unapproved decision.
- Any dirty Harness worktree at fresh preflight, non-reciprocal route, unavailable accepted evidence, attempted peer write, or request to invoke `ki:site:upload`; park the affected record rather than widening the batch.

## Approval

Pending explicit user approval for this exact named set and timebox. The current record grants no execution authority.
