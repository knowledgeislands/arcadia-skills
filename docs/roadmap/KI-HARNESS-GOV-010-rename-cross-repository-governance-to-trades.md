---
id: KI-HARNESS-GOV-010
title: Rename cross-repository governance to ki-trades
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked-by: []
baseline-ref: b3a9d5cf476a99a3a72322230d0dfed82dfe7aa7
---

## Goal

Make `ki-trades` the unambiguous, portable Harness capability for governed cross-repository work and knowledge exchanges, matching the `ki trades` public CLI surface.

## Context

The Harness currently publishes a `ki-handoffs` skill, configuration table, owned `_HANDOFFS` scaffold, `HND-` record identity, and cross-skill references. Its actual contract already governs typed, directional trades, and `tools-ki` has adopted `ki trades` as the public command surface. The two names describe the same capability inconsistently and make discovery, configuration, and peer coordination needlessly ambiguous.

The prior delegation-readiness doctrine named `ki-handoffs` is retired. The current capability is neither delegation nor generic handoff guidance: it is a governed trade protocol with route eligibility, sender and receiver authority boundaries, and observable release.

## Boundary

Do not change the route, authority, disposition, immutable-payload, or release-observation model merely by renaming it. Do not retain `ki-handoffs` as a compatibility alias, migrate a peer checkout without its owner, or rewrite historical records as though their original terminology had never existed.

## Current state

The Harness now publishes `ki-trades`, declares its `ki-trades` configuration table, and uses `_TRADES` paths with `TRD-` identities. The active standard, checker, route configuration, composition boundaries, generated rubrics, and owned scaffolds use that vocabulary consistently. Legacy `ki-handoffs`, `_HANDOFFS`, and `HND-` uses remain only as historical evidence in completed records and session material.

## Steps

- [x] Record the current-state migration decision: `ki-trades` is the capability and configuration identity; choose and document the canonical working-area and record-identity vocabulary, including any `_TRADES` and `TRD-` replacements.
- [x] Rename the governance skill, structured catalogue, generated rubric, configuration table, owned scaffold, and every active Harness reference to the approved `ki-trades` vocabulary.
- [x] Update the `ki-repo`, `ki-roadmap`, and `ki-next` composition boundaries and fixtures so they discover and audit the renamed capability without reintroducing the retired delegation doctrine.
- [x] Provide an explicit, recoverable migration for current Harness-owned records and scaffolds; request separately owned peer changes through their local roadmap rather than writing another repository.
- [x] Add checker and fixture coverage for the renamed configuration, route eligibility, owned directories, record identity, authority boundary, and refusal of legacy aliases.
- [x] Reconcile public orientation and runtime-discovery surfaces, and publish a superseding terminology decision while retaining historic decisions and completed work items as evidence.

## Files touched

- `skills/governance/ki-handoffs/` → `skills/governance/ki-trades/`
- `.ki-config.toml`
- `skills/keystone/ki-repo/`
- `skills/governance/ki-roadmap/`
- `skills/process/ki-next/`
- `docs/decisions/`
- Matching rubric fixtures and tests
- This roadmap item and any separately owned peer migration record

## Verify

- Focused `ki-trades` checker and rubric tests
- `ki dev skill rubric ki-trades --write`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-trades --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Fixture-backed verification proves that the approved configuration, scaffold, route, record identity, sender/receiver authority, and release semantics work only under the `ki-trades` contract and that legacy aliases fail clearly.

## Dependencies / blocks

This is a blocking terminology migration. It must complete before the Harness publishes new trade guidance, configuration, or peer-integration material under a mixture of `ki-handoffs` and `ki-trades`. No existing local work item supplies a valid dependency edge.

## Review

### Delivered

The Harness now has one active cross-repository contract: `ki-trades`, `+/_TRADES/` and `-/_TRADES/`, and `TRD-<uuid>` record identities. No `ki-handoffs` compatibility capability remains.

### Summary of changes

The migration renamed the governance skill, configuration table, owned working areas, record identity, standards, checker, fixtures, generated rubrics, composition boundaries, and decision-record terminology. The final reconciliation renamed the roadmap's public trade-review family and added a fixture that rejects legacy `HND-` identities.

### Verification

- `bun test` — 269 passing tests.
- `bunx tsc --noEmit` — passed.
- `ki dev skill rubric ki-trades` and `ki dev skill rubric ki-roadmap` — both publications in sync.
- `ki repo audit --skill ki-trades --repo .`, `ki repo audit --skill ki-roadmap --repo .`, and `ki repo audit --skill ki-skills --repo .` — passed.
- Active contract scan found no `ki-handoffs`, `_HANDOFFS`, `HND-`, or `HANDOFF-*` references in `ki-trades`, `ki-roadmap`, `ki-repo`, `ki-next`, configured trade paths, or the repository configuration.

### Outstanding concerns

Peer repositories remain responsible for their separately owned migrations. Historical decision, roadmap, and session evidence retains the old terms by design.

### Mini recap

The migration retained the typed-route, immutable-payload, receiver-disposition, and release-observation model while making the capability's active public identifiers unambiguously trade-specific. No learning route is proposed.

## Done

Accepted on 2026-08-05 after review of the committed acceptance packet and its stated verification evidence.

## Discussion

### A capability name is part of the protocol

The skill name, table name, owned directory, record identity, generated documentation, and CLI vocabulary are discoverable protocol surfaces rather than cosmetic labels. A user should not need to know that `ki-handoffs` is the old name for a system whose public command and semantic model are trades.

### Current-state migration

The project convention is one current contract, not permanent compatibility paths. The migration must therefore select exact trade vocabulary for every active surface and convert every owned footprint together. Historic Decision Records, completed work items, and Git history remain evidence and need not be falsified; a superseding decision makes the terminology change legible.

### Approved vocabulary

The current-state migration uses `ki-trades` for the capability and configuration table, `+/_TRADES/` and `-/_TRADES/` for the owned working areas, and `TRD-<uuid>` for the canonical record identifier. Active prose describes a trade, trade submission, sender, receiver, route, and disposition; historic use of `ki-handoffs`, `_HANDOFFS`, and `HND-` remains evidence only.

### Peer authority

The Harness can publish the portable contract and migrate its own files. Each peer repository remains responsible for its configuration, records, roadmap, and implementation. A cross-repository request may state the required migration evidence, but it cannot silently rewrite peer state.
