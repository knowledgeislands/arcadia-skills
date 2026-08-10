---
id: KI-HARNESS-GOV-007
title: Govern skill package scripts
area: GOV
theme: governance-consistency
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Ensure every supported package script is either declared by exactly one governing skill or explicitly excluded as repository-owned external tooling.

## Context

`ki-engineering` currently verifies common package-script shape, but a name alone does not establish an accountable owner. The `ki-repo-tools` manual gate exposed the gap: `ki:lint-man` passed a generic prefix check despite being ambiguous, whereas `ki:tools:lint-man` is meaningfully governed by the `ki-repo-tools` rubric.

The existing families use meaningful namespaces — including `ki:deps:*`, `ki:binding:claude:*`, `ki:site:*`, `ki:server:*`, and `ki:test:*` — that are not mechanically derivable from a capability name. The owning skill already has the durable knowledge of which keys it supports; asking every repository to restate that ownership in configuration creates drift rather than authority.

## Boundary

Do not add package-script aliases for native `ki repo audit` or `ki repo conform`, loosen the retired generic tool aliases, require every capability to publish a package script, or let a repository configuration assign script ownership. Do not infer ownership from a namespace alone or retain legacy aliases during a migration.

## Shaping

### Selected declaration contract

Each rubric catalogue may publish the exact `packageScripts` keys its skill supports:

```ts
export default {
  // …normal rubric definition…
  packageScripts: ['ki:binding:claude:build-plugin']
}
```

The `ki` host aggregates the static declarations from every resolved repository skill into a read-only inventory. `ki-engineering` consumes that inventory while auditing `package.json`: every script must be a standard entry claimed by `ki-engineering`, a key declared by exactly one other resolved skill, or an exact repository exclusion. A duplicate claim is a cross-skill error; an unclaimed and unexcluded script is an engineering finding. The host, not `ki-engineering`, performs catalogue discovery so the common engineering layer does not scan or trust arbitrary skill files.

The owning skill's rubric states the exact key and supplies the judgment that its name, command, artifact boundary, and CI treatment remain aligned. `ki-engineering` supplies only the complete-set and uniqueness check. This permits `ki-engineering` to own several coherent keys, such as `ki:deps:update`, without pretending that every valid key shares one namespace.

Repository configuration may contain only an exact `script_exclusions` list under its `ki-engineering` table for user-owned external tooling:

```toml
["knowledgeislands/ki-agentic-harness:ki-engineering"]
script_exclusions = ["vendor:generate"]
```

Every exclusion must name an existing script exactly, be unique, use no pattern syntax, and must not overlap a skill claim. It is an escape hatch for local external tooling, never an ownership registry or a way to suppress a governed key.

### Known dependencies

The harness contains an engineering-owned dependency update, a Claude-binding plugin builder, and an evaluation script; the website has site-owned scripts. The inventory must establish the declaring skill and its own rubric rule for every retained key. An unclaimed key is a design finding, not a reason to grandfather it.

This change needs a shared rubric-catalogue metadata contract and host aggregation. It affects the harness first, then rolls through other primary public repositories under their own work items. A repository can add an exclusion only for an actual external key that its resolved skills deliberately do not govern.

### Clean-cut migration rule

A skill must claim a script before it is retained. If no resolved skill claims a proposed key and it is not genuinely user-owned external tooling, remove the script rather than creating a placeholder, relying on a prefix convention, or keeping a compatibility alias. The harness replaces `ki:eval` with `ki:harness:eval` and `ki:binding:build-plugin` with `ki:binding:claude:build-plugin` in the same change; no legacy key remains.

### Approved planning basis

The catalogue metadata shape, host aggregation contract, exact exclusion semantics, clean-cut migration rule, and focused verification are the approved delivery boundary. The estate inventory establishes the receiving scope during implementation; a missing owner or receiver is a named follow-up, not a compatibility exception.

## Current state

The core inventory already distinguishes a clear `ki:tools:*` claim in `tools-ki` and `ki:site:*` claims in `ki-repo-website`, while the harness has `ki:deps:update`, `ki:binding:build-plugin`, and the ambiguous `ki:eval` key. Static skill declarations replace the retired owner-family map.

No rubric-catalogue metadata currently publishes script claims, the host does not aggregate them, and `ki-engineering` has no exact exclusion contract.

## Steps

- [ ] Add exact `packageScripts` metadata to the shared rubric-catalogue contract, with validation that a skill claims each key at most once and retains the owner-specific rule and judgment alongside its claim.
- [ ] Make the host aggregate static claims from resolved skills and expose one read-only inventory to `ki-engineering`; reject duplicate claims as cross-skill contract errors.
- [ ] Add a mechanical `ki-engineering` criterion that validates every package script as an engineering claim, one aggregated skill claim, or an exact `script_exclusions` entry; reject stale, duplicate, patterned, and overlapping exclusions.
- [ ] Replace the hard-coded owner-family map with rubric claims; rename the harness evaluation command to `ki:harness:eval`, rename the builder to `ki:binding:claude:build-plugin`, and remove `ki:eval` and `ki:binding:build-plugin` without aliases.
- [ ] Add claims and skill-owned semantic checks for each accepted core repository; route any unclaimed non-external key to its owning skill or remove it rather than grandfathering it.
- [ ] Update CI and documented invocations in the same cut, then add focused fixtures for aggregation, duplicate and absent claims, exact exclusions, misaligned skill-owned commands, and legacy-key removal.

## Files touched

- `skills/keystone/ki-skills/` shared rubric-catalogue contract and tests
- `skills/governance/ki-engineering/` standard, rubric, catalogue, and tests
- Relevant owning-skill rubrics, catalogues, and tests
- `.ki-config.toml`, `package.json`, CI, and relevant documentation in the harness
- Receiver-owned changes in `tools-ki` and `ki-website`, if their owners accept the resulting proposals

## Verify

- Focused shared-rubric, `ki-engineering`, and owning-skill rubric tests
- `ki repo audit --skill ki-engineering --repo .`
- A host fixture proves that only resolved skill claims enter the inventory and duplicate claims fail deterministically.
- A repository fixture proves that every script is claimed or exactly excluded, and that exclusions cannot hide claimed, missing, duplicate, or patterned entries.
- Equivalent audits in each accepted receiving repository
- `bun run test` and `bunx tsc --noEmit` in each changed TypeScript repository

## Dependencies / blocks

The static metadata shape, host aggregation boundary, exact exclusions, and clean-cut migration rule are approved. Each receiving repository remains a separate acceptance boundary; an unclaimed key, duplicate claim, or unavailable receiver is a stop with a routed local follow-up.

## Discussion

### Skill declarations

The owning skill publishes exact keys because namespaces are a readability aid, not authority. A claim is source-controlled alongside the rubric that explains why the key exists and whether its command remains aligned. Repository configuration does not duplicate that stable ownership fact.

### Mechanical layers

Keep the common and artifact layers distinct. The host aggregates resolved catalogue declarations; `ki-engineering` validates complete coverage and uniqueness; each claiming skill validates its exact command and CI wiring where those are part of its contract. `ki-repo-tools`' `MAN-SCRIPT` and `MAN-LINT` criteria are the reference case.

### Migration inventory

Inventory every current package-script key, identify a static skill claim or an exact user-owned exclusion, and replace ambiguous forms directly. The migration must preserve the clean-end-state rule: no compatibility aliases, duplicated claims, or unaccounted scripts. Update documented invocations and CI in the same change.

### Promotion condition

Promote once the static declaration representation, host aggregation, backward-incompatible migration scope, exclusion semantics, and native checker ownership are concrete enough to plan and verify across the affected repositories.

### Ownership before naming

The namespace communicates intent only after a skill claim makes that intent checkable. A plausible key such as `ki:eval` is not sufficient evidence by itself: an owning rubric must claim it, the user must explicitly exclude it as external tooling, or it must disappear. This prevents the common engineering rule from becoming a broad prefix allow-list.
