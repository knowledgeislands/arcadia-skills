---
id: KI-HARNESS-GOV-007
title: Govern skill-owned package-script namespaces
theme: governance-consistency
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Ensure every supported `ki:` package script has a clear governing skill and no ambiguous ownership.

## Context

`ki-engineering` currently verifies that every non-lifecycle package script begins with `ki:`, but that prefix alone does not establish an accountable owner. The `ki-tools` manual gate exposed the gap: `ki:lint-man` passed the prefix check despite being an ambiguous tool alias, whereas `ki:tools:lint-man` makes its governing skill explicit and is now verified by the `ki-tools` rubric.

The existing families use meaningful namespaces — including `ki:site:*`, `ki:server:*`, `ki:test:*`, and `ki:generate:*` — that are not mechanically derivable from a declared capability name. A reusable rule therefore needs an explicit ownership registry rather than a simplistic string comparison against `.ki-config.toml` declarations.

## Boundary

Do not add package-script aliases for native `ki repo audit` or `ki repo conform`, loosen the retired generic tool aliases, or require every capability to publish a package script. Do not infer ownership from an undeclared naming convention or retain legacy aliases during a migration.

## Shaping

### Selected registry contract

Each repository declares one exact-key registry in its existing `ki-engineering` configuration table:

```toml
["knowledgeislands/ki-agentic-harness:ki-engineering".script_owners]
"ki:deps:update" = "ki-engineering"
"ki:harness:eval" = "ki-harness"
"ki:binding:build-plugin" = "ki-binding-claude"
```

Every non-lifecycle `ki:*` script key must appear once in `script_owners`; every owner value must name a declared, resolved capability in the same repository; and the registry may name no missing script. The key is exact, not a wildcard or a namespace prefix, so every supported script is expressly admitted by its owning skill. `ki-engineering` owns the required `ki:deps:update` entry. A repository-local `ki:self:*` entry is permitted only when `ki-self` is declared and resolved.

`ki-engineering` validates registry grammar, exact key coverage, duplicate-free TOML shape, and owner selection. The named owner skill remains responsible for the command's semantics, its artefact boundary, and any CI requirement. This removes the current hard-coded `scriptOwner()` family map without turning a colon-shaped key into implicit authority.

Inventory the harness and core public repositories before writing the rule. For each existing key, either identify the owning skill and its artifact-level check, or retire the script. Migrate ambiguous keys directly to their final owned form and update CI and documented invocations in the same cut.

### Known dependencies

The harness contains both a capability-specific build script and an evaluation script, while the website has a site-owned namespace. The inventory must establish whether each already has a governing skill and whether that skill is declared in the repository configuration; an undeclared or absent owner is a design finding, not a reason to grandfather the key.

`ki-engineering` owns universal registry membership and grammar. The owner skill validates command semantics and CI only where those concern its artifact. This change affects the harness first and can then be rolled through the other primary public repositories under their own work items.

### Clean-cut migration rule

An owner must be selected before its script is retained. If a repository cannot declare and resolve the proposed owner, it removes the script rather than registering a placeholder, relying on a prefix convention, or keeping a compatibility alias. The harness replaces `ki:eval` with `ki:harness:eval` in the same change; no legacy key remains.

### Promotion conditions

Promote when the registry fixture contract, complete core-repository inventory, clean-cut migration map, and focused harness verification are reviewable.

## Current state

The core inventory already distinguishes a clear `ki:tools:*` owner in `tools-ki` and `ki:site:*` owner in `ki-website`, while the harness has `ki:binding:build-plugin` and the ambiguous `ki:eval` key. The selected exact-key registry replaces that implicit mapping.

No repository-local declaration currently maps every non-lifecycle `ki:*` key to a selected governing skill.

## Steps

- [ ] Add the exact-key `script_owners` table to the `ki-engineering` configuration contract and parse it without inspecting other skills' tables.
- [ ] Add a mechanical `ki-engineering` criterion that validates registry membership, no stale entries, and a declared resolved owner without taking artifact-command semantics from the owner skill.
- [ ] Replace the hard-coded owner-family map with registry evidence; rename the harness evaluation command to `ki:harness:eval`, record `ki-binding-claude` as the builder's owner, and remove `ki:eval` without an alias.
- [ ] Add each accepted core repository's registry entries, using its existing selected capability as the owner and routing any unowned key to a local decision rather than grandfathering it.
- [ ] Update CI and documented invocations in the same cut, then add focused catalogue fixtures for valid ownership, absent owners, invalid owners, and legacy-key removal.

## Files touched

- `skills/governance/ki-engineering/` standard, rubric, catalogue, and tests
- `.ki-config.toml`, `package.json`, CI, and relevant documentation in the harness
- Accepted receiving changes in `tools-ki` and `ki-website`

## Verify

- Focused `ki-engineering` rubric tests
- `ki repo audit --skill ki-engineering --repo .`
- Equivalent audits in each accepted receiving repository
- `bun run test` and `bunx tsc --noEmit` in each changed TypeScript repository

## Dependencies / blocks

The configuration syntax and owner/command validation split remain an explicit architecture decision. Do not mark this item Ready or modify receiving repositories until that decision is reviewed.

## Discussion

### Ownership registry

The registry uses exact keys because namespaces are a readability aid, not authority. A key is supported only when the repository explicitly maps it to one selected owner; the mapping preserves declarative repository control while letting the owner skill enforce its own command contract.

### Mechanical layers

Keep the common and artifact layers distinct. `ki-engineering` should validate the universal grammar and registry membership; each artifact skill should validate the exact script command and its CI wiring where those are part of its contract. `ki-tools`' `MAN-SCRIPT` and `MAN-LINT` criteria are the reference case.

### Migration inventory

Inventory every current `ki:` key, assign its namespace to a skill, and replace one-segment or ambiguous forms directly. The migration must preserve the clean-end-state rule: no compatibility aliases or duplicated script keys. Update documented invocations and CI in the same change.

### Promotion condition

Promote once the registry representation, backward-incompatible migration scope, and native checker ownership are concrete enough to plan and verify across the affected repositories.

### Ownership before naming

The namespace communicates ownership only after the registry makes that ownership checkable. A plausible key such as `ki:eval` is not sufficient evidence by itself: its owner must be explicit, or the key must disappear. This prevents the common engineering rule from becoming a broad prefix allow-list.
