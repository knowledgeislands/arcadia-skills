---
id: KI-HARNESS-GOV-015
title: Define repository governance
theme: governance-consistency
horizon: next
status: done
blocks: [KI-HARNESS-GOV-016]
blocked-by: []
baseline-ref: 01a9a0d8a3a2ac4638553f2798be4d713e3764ec
---

## Goal

Define one portable repository-governance contract that makes repository structure, local authority, and repository-local managed state explicit and auditable.

## Context

The `tools-ki` submissions on repository kind and stores, cross-repository authority, and `ki-self` identify adjacent gaps in the `ki-repo` contract. They all concern what a selected repository is, what it may safely manage, and how its local derived state is governed.

## Boundary

Do not encode machine paths in tracked configuration, make sibling repositories writable by visibility alone, or turn a repository-local skill into a globally installed harness capability.

## Current state

`ki-repo` now owns the KB discriminator and closed store-role vocabulary; its `KIND` rubric family validates kind, roles, and compatible structure. Roadmap, Decision Records, and housekeeping each read that canonical table only. The two existing KBs declare their self-reference as `notes`, while physical external bindings remain user-local.

## Steps

- [x] Inventory every current `repo_type` consumer, then settle one `ki-repo`-owned repository-kind vocabulary and migration with no alias or fallback path.
- [x] Define the Knowledge Base store-role schema: `notes` is the required canonical repository self-reference, `sources` and `legacy` are optional roles, and physical bindings remain user-local rather than tracked configuration.
- [x] Add `ki-repo` validation for the kind, store roles, and compatible repository-structure skill declarations; migrate roadmap, Decision Record, and housekeeping consumers to the canonical parser.
- [x] Define selected-repository authority: task-scoped writes and commits stay local by default, sibling repositories remain read-only until a bounded write is explicitly approved, and each sibling commit needs separate approval after its target and staged scope are known.
- [x] Formalise optional repository-local `ki-self` as a committed `.agents/skills/ki-self/` source with derived runtime projections, a repository-specific rubric boundary, and no bootstrap or installed-harness status.
- [x] Align the Harness `ki-self` exemplar and `ki-skills` validation with that contract, while leaving native host discovery, inventory, activation, and repair implementation to separately accepted `tools-ki` work.
- [x] Add focused fixtures for valid and invalid kinds, stores, skill compatibility, local-source shape, projection, and authority judgment; regenerate every affected rubric publication once.

## Files touched

- `.ki-config.toml`
- `skills/keystone/ki-repo/SKILL.md`
- `skills/keystone/ki-repo/references/standards-configuration.md`
- `skills/keystone/ki-repo/references/standards-repository.md`
- `skills/keystone/ki-repo/scripts/rubric/contexts/{audit,repository}.ts`
- `skills/keystone/ki-repo/scripts/rubric/contexts/repository.test.ts`
- `skills/keystone/ki-repo/scripts/rubric/items/{index,structure,runtimes}.ts`, plus a focused kind/store or authority family if the catalogue remains clearer that way
- `.agents/skills/ki-self/` and the `ki-skills` local-governance criteria and fixtures that validate it
- Existing `repo_type` consumers and fixtures in `ki-decision-records`, `ki-roadmap`, and `ki-housekeeping`
- Generated `references/rubric.md` publications for every changed catalogue

## Verify

- `bunx vitest run skills/keystone/ki-repo/scripts/rubric/contexts/repository.test.ts skills/keystone/ki-repo/scripts/rubric/items/index.test.ts skills/keystone/ki-skills/scripts/rubric/contexts/skill.test.ts`
- Focused tests for the migrated `ki-decision-records`, `ki-roadmap`, and `ki-housekeeping` kind consumers
- `ki dev skill rubric ki-repo` and `ki dev skill rubric ki-skills`
- `ki repo audit --skill ki-repo --repo .` and `ki repo audit --skill ki-skills --repo .`
- `bun run test`, then `bunx tsc --noEmit`
- Assert that tracked configuration contains no physical store path, a sibling checkout remains untouched, and repository-local `ki-self` is not resolved as an installed harness capability.

## Dependencies / blocks

This work is independently shapeable and blocks [KI-HARNESS-GOV-016](KI-HARNESS-GOV-016-govern-documentation-topology.md), whose non-KB topology needs the canonical repository-kind signal. The Harness owns and may implement the portable contract only in this repository. The `tools-ki` checkout is read-only for this item: native host changes require a separately accepted `tools-ki` work item, explicit approval for that sibling write, and separate approval for its commit. Fleet adoption is follow-up work and must not be folded into this item.

## Delegation

Keep the schema and authority wording under one orchestrator in the first round. After that contract is reviewed, one bounded worker may implement `ki-repo` catalogue and fixture changes while another migrates the three existing kind consumers; a separate bounded lane may align the repository-local `ki-self` exemplar and `ki-skills` checks. Workers must not edit generated publications or sibling repositories. The orchestrator resolves cross-skill wording, generates publications once, reviews the combined diff, and runs the final audits and test gates.

## Review

Awaiting review of the portable KB kind/store contract, selected-repository authority boundary, and the two existing Knowledge Base migrations.

## Done

Accepted by the user on 2026-08-06. The portable contract, authority boundary, and Knowledge Base migrations are approved for retained completion.

## Discussion

### Consolidated sources

This item adopts [TRD-d2cd35f7](../../+/_TRADES/knowledgeislands/tools-ki/TRD-d2cd35f7.md), [TRD-480274d1](../../+/_TRADES/knowledgeislands/tools-ki/TRD-480274d1.md), and [TRD-af376594](../../+/_TRADES/knowledgeislands/tools-ki/TRD-af376594.md).

### Contract boundaries

Repository kind and repository structure are related but distinct: kind selects the KB or non-KB operating model, while the declared structure skill owns the repository's concrete layout. Named store roles are portable identities, not paths; local tooling binds optional external stores without turning them into canonical KI repositories.

An inbound or outbound trade records a handoff but grants no authority over its peer checkout. `ki-git` governs an already authorised commit's preparation and hygiene; `ki-repo` owns whether the selected or sibling repository may be changed at all.

Repository-local `ki-self` remains an optional escape hatch for genuinely local governance. Its source, any local rubric, and repository-specific inventory claims are committed by that repository; runtime links and host-managed state are derived. Reusable governance must move to a shared skill rather than accumulating in `ki-self`.
