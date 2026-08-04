---
id: KI-HARNESS-GOV-010
title: Rename cross-repository governance to ki-trades
theme: governance-consistency
horizon: blocking
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make `ki-trades` the unambiguous, portable Harness capability for governed cross-repository work and knowledge exchanges, matching the `ki trades` public CLI surface.

## Context

The Harness currently publishes a `ki-handoffs` skill, configuration table, owned `_HANDOFFS` scaffold, `HND-` record identity, and cross-skill references. Its actual contract already governs typed, directional trades, and `tools-ki` has adopted `ki trades` as the public command surface. The two names describe the same capability inconsistently and make discovery, configuration, and peer coordination needlessly ambiguous.

The prior delegation-readiness doctrine named `ki-handoffs` is retired. The current capability is neither delegation nor generic handoff guidance: it is a governed trade protocol with route eligibility, sender and receiver authority boundaries, and observable release.

## Boundary

Do not change the route, authority, disposition, immutable-payload, or release-observation model merely by renaming it. Do not retain `ki-handoffs` as a compatibility alias, migrate a peer checkout without its owner, or rewrite historical records as though their original terminology had never existed.

## Current state

`ki-handoffs` remains the current Harness skill directory and configuration identity. The active standards and checker use `_HANDOFFS` paths and `HND-` identities, while user-facing CLI language already says `trades`. The exact canonical replacement for the owned working-area and record identifiers has not yet been decided, so a mechanical rename would risk mixing two contracts.

## Steps

- [ ] Record the current-state migration decision: `ki-trades` is the capability and configuration identity; choose and document the canonical working-area and record-identity vocabulary, including any `_TRADES` and `TRD-` replacements.
- [ ] Rename the governance skill, structured catalogue, generated rubric, configuration table, owned scaffold, and every active Harness reference to the approved `ki-trades` vocabulary.
- [ ] Update the `ki-repo`, `ki-roadmap`, and `ki-next` composition boundaries and fixtures so they discover and audit the renamed capability without reintroducing the retired delegation doctrine.
- [ ] Provide an explicit, recoverable migration for current Harness-owned records and scaffolds; request separately owned peer changes through their local roadmap rather than writing another repository.
- [ ] Add checker and fixture coverage for the renamed configuration, route eligibility, owned directories, record identity, authority boundary, and refusal of legacy aliases.
- [ ] Reconcile public orientation and runtime-discovery surfaces, and publish a superseding terminology decision while retaining historic decisions and completed work items as evidence.

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

## Discussion

### A capability name is part of the protocol

The skill name, table name, owned directory, record identity, generated documentation, and CLI vocabulary are discoverable protocol surfaces rather than cosmetic labels. A user should not need to know that `ki-handoffs` is the old name for a system whose public command and semantic model are trades.

### Current-state migration

The project convention is one current contract, not permanent compatibility paths. The migration must therefore select exact trade vocabulary for every active surface and convert every owned footprint together. Historic Decision Records, completed work items, and Git history remain evidence and need not be falsified; a superseding decision makes the terminology change legible.

### Peer authority

The Harness can publish the portable contract and migrate its own files. Each peer repository remains responsible for its configuration, records, roadmap, and implementation. A cross-repository request may state the required migration evidence, but it cannot silently rewrite peer state.
