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

### Intended approach

Define one explicit, repository-local registry that maps every non-lifecycle `ki:*` package-script key to the skill that owns its contract. Keep the registry declarative and exact: the owning skill declares the permitted keys or namespace, while `ki-engineering` reads the registry to reject keys with no owner or an invalid shape.

Inventory the harness and core public repositories before writing the rule. For each existing key, either identify the owning skill and its artifact-level check, or retire the script. Migrate ambiguous keys directly to their final owned form and update CI and documented invocations in the same cut.

### Known dependencies

The harness contains both a capability-specific build script and an evaluation script, while the website has a site-owned namespace. The inventory must establish whether each already has a governing skill and whether that skill is declared in the repository configuration; an undeclared or absent owner is a design finding, not a reason to grandfather the key.

`ki-engineering` owns universal registry membership and grammar. The owner skill validates command semantics and CI only where those concern its artifact. This change affects the harness first and can then be rolled through the other primary public repositories under their own work items.

### Decision still needed

Choose the registry's concrete `.ki-config.toml` shape and its relationship to capability declaration. In particular, decide how a repository records ownership for a script whose owning harness skill is not otherwise selected for that repository's audit coverage.

### Promotion conditions

Promote when the registry syntax, validation ownership split, complete core-repository inventory, clean-cut migration map, and focused harness verification are reviewable.

## Current state

The core inventory already distinguishes a clear `ki:tools:*` owner in `tools-ki` and `ki:site:*` owner in `ki-website`, while the harness has `ki:binding:build-plugin` and the ambiguous `ki:eval` key.

No repository-local declaration currently maps every non-lifecycle `ki:*` key to a selected governing skill.

## Steps

1. Define a declarative `ki-engineering` configuration table that maps each non-lifecycle `ki:*` script key to one declared owning skill.
2. Add a mechanical `ki-engineering` criterion that validates key grammar, registry membership, and the selected owner without taking artifact-command semantics from the owner skill.
3. Give the harness evaluation command the final `ki:harness:*` name and record `ki-binding-claude` as the builder's owner; remove the ambiguous legacy key without an alias.
4. Add each accepted core repository's registry entries, using its existing selected capability as the owner and routing any unowned key to a local decision rather than grandfathering it.
5. Update CI and documented invocations in the same cut, then add focused catalogue fixtures for valid ownership, absent owners, invalid owners, and legacy-key removal.

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

Shape a portable way for an owning skill to declare its allowed package-script namespace or exact keys, together with the conditions under which each is valid. The declaration must let `ki-engineering` reject malformed or unowned `ki:` keys while leaving artifact-specific command semantics with the owning skill.

### Mechanical layers

Keep the common and artifact layers distinct. `ki-engineering` should validate the universal grammar and registry membership; each artifact skill should validate the exact script command and its CI wiring where those are part of its contract. `ki-tools`' `MAN-SCRIPT` and `MAN-LINT` criteria are the reference case.

### Migration inventory

Inventory every current `ki:` key, assign its namespace to a skill, and replace one-segment or ambiguous forms directly. The migration must preserve the clean-end-state rule: no compatibility aliases or duplicated script keys. Update documented invocations and CI in the same change.

### Promotion condition

Promote once the registry representation, backward-incompatible migration scope, and native checker ownership are concrete enough to plan and verify across the affected repositories.

### Ownership before naming

The namespace communicates ownership only after the registry makes that ownership checkable. A plausible key such as `ki:eval` is not sufficient evidence by itself: its owner must be explicit, or the key must disappear. This prevents the common engineering rule from becoming a broad prefix allow-list.
