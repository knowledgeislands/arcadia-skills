---
id: KI-HARNESS-GOV-007
title: Govern skill-owned package-script namespaces
theme: governance-consistency
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

`ki-engineering` currently verifies that every non-lifecycle package script begins with `ki:`, but that prefix alone does not establish an accountable owner. The `ki-tools` manual gate exposed the gap: `ki:lint-man` passed the prefix check despite being an ambiguous tool alias, whereas `ki:tools:lint-man` makes its governing skill explicit and is now verified by the `ki-tools` rubric.

The existing families use meaningful namespaces — including `ki:site:*`, `ki:server:*`, `ki:test:*`, and `ki:generate:*` — that are not mechanically derivable from a declared capability name. A reusable rule therefore needs an explicit ownership registry rather than a simplistic string comparison against `.ki-config.toml` declarations.

## Boundary

Do not add package-script aliases for native `ki repo audit` or `ki repo conform`, loosen the retired generic tool aliases, or require every capability to publish a package script. Do not infer ownership from an undeclared naming convention or retain legacy aliases during a migration.

## Discussion

### Ownership registry

Shape a portable way for an owning skill to declare its allowed package-script namespace or exact keys, together with the conditions under which each is valid. The declaration must let `ki-engineering` reject malformed or unowned `ki:` keys while leaving artifact-specific command semantics with the owning skill.

### Mechanical layers

Keep the common and artifact layers distinct. `ki-engineering` should validate the universal grammar and registry membership; each artifact skill should validate the exact script command and its CI wiring where those are part of its contract. `ki-tools`' `MAN-SCRIPT` and `MAN-LINT` criteria are the reference case.

### Migration inventory

Inventory every current `ki:` key, assign its namespace to a skill, and replace one-segment or ambiguous forms directly. The migration must preserve the clean-end-state rule: no compatibility aliases or duplicated script keys. Update documented invocations and CI in the same change.

### Promotion condition

Promote once the registry representation, backward-incompatible migration scope, and native checker ownership are concrete enough to plan and verify across the affected repositories.
