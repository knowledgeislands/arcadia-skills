---
id: KI-HARNESS-GOV-007
title: Govern skill package scripts
area: GOV
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: 42f680fa0fc51e15b95c14ca22ec3e674e4d34ad
---

## Goal

Ensure every supported package script is either declared by exactly one governing skill or explicitly excluded as repository-owned external tooling.

## Context

`ki-engineering` currently verifies common package-script shape, but a name alone does not establish an accountable owner. The `ki-repo-tools` manual gate exposed the gap: `ki:lint-man` passed a generic prefix check despite being ambiguous, whereas `ki:tools:lint-man` is meaningfully governed by the `ki-repo-tools` rubric.

The existing families use meaningful namespaces — including `ki:deps:*`, `ki:binding:claude:*`, `ki:site:*`, `ki:server:*`, and `ki:test:*` — that are not mechanically derivable from a capability name. The owning skill already has the durable knowledge of which keys it supports; asking every repository to restate that ownership in configuration creates drift rather than authority.

Accepted GOV-028 found one concrete ownership gap: KI Website's `ki:site:upload` runs `cd site && bunx wrangler versions upload` and changes remote state, but the current `ki-repo-website-cloudflare` script family neither claims it nor defines its safety boundary. Website history identifies Workers Builds as its intended purpose. The script therefore needs an explicit outcome under this ownership contract rather than a separate sender-side routing item.

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

The harness contains an engineering-owned dependency update, a Claude-binding plugin builder, and an evaluation script; the Website has site-owned scripts, including the unresolved `ki:site:upload` command. The inventory must establish the declaring skill and its own rubric rule for every retained key. In particular, `ki-repo-website-cloudflare` must either claim `ki:site:upload` with a semantic check and explicit remote-effect safety boundary or reject it from the house script family so receiver-owned work can remove it. An unclaimed key is a design finding, not a reason to grandfather it.

This change needs a shared rubric-catalogue metadata contract and host aggregation. It affects the harness first, then rolls through other primary public repositories under their own work items. A repository can add an exclusion only for an actual external key that its resolved skills deliberately do not govern.

### Clean-cut migration rule

A skill must claim a script before it is retained. If no resolved skill claims a proposed key and it is not genuinely user-owned external tooling, remove the script rather than creating a placeholder, relying on a prefix convention, or keeping a compatibility alias. The harness replaces `ki:eval` with `ki:harness:eval` and `ki:binding:build-plugin` with `ki:binding:claude:build-plugin` in the same change; no legacy key remains.

### Approved planning basis

The catalogue metadata shape, host aggregation contract, exact exclusion semantics, clean-cut migration rule, and focused verification are the approved delivery boundary. The estate inventory establishes the receiving scope during implementation; a missing owner or receiver is a named follow-up, not a compatibility exception.

## Current state

All delivery prerequisites are now available. Harness commit `0e11c4a` publishes the shared `packageScripts` metadata shape and three local claims. `tools-ki` commit `e58ff49`, accepted by `KI-TOOL-CLI-057` at `cba86e1`, validates and aggregates deterministic canonical claims from every declared resolved skill and passes them through the repository rubric-session boundary. KI Website accepted `KI-WEB-SITE-003` at `6f7f074`, retaining `ki:site:upload` as the intentional Workers Builds preview-upload hook with an explicit credentialed remote-effect authority boundary.

The remaining work is Harness-local consolidation: make `ki-engineering` consume the host inventory, remove its temporary hard-coded owner-family map, claim the accepted Website upload operation in `ki-repo-website-cloudflare`, complete exact exclusion and command-alignment fixtures, and verify the clean-cut local migration. No external dependency blocks implementation.

## Progress

Commit `0e11c4a` establishes the Harness-local claim metadata and the three exact claims: `ki:deps:update`, `ki:harness:eval`, and `ki:binding:claude:build-plugin`. It also removes the two retired local script keys without aliases. Focused tests, TypeScript, Biome, Markdown checks, and command help pass.

`tools-ki` delivered the final receiver dependency with 696 tests at 100% coverage; both its built and installed CLIs pass the engineering audit. Website's accepted outcome supplies the exact retained command, purpose, safe manifest-only verification, and prohibition on audit-time Wrangler execution. The parent is now dependency-ready for one Harness implementation batch.

## Steps

- [x] Add exact `packageScripts` metadata to the shared rubric-catalogue contract, with validation that a skill claims each key at most once and retains the owner-specific rule and judgment alongside its claim.
- [x] Make the host aggregate static claims from resolved skills and expose one read-only inventory to `ki-engineering`; reject duplicate claims as cross-skill contract errors.
- [x] Add a mechanical `ki-engineering` criterion that validates every package script as an engineering claim, one aggregated skill claim, or an exact `script_exclusions` entry; reject stale, duplicate, patterned, and overlapping exclusions.
- [x] Replace the hard-coded owner-family map with rubric claims; rename the harness evaluation command to `ki:harness:eval`, rename the builder to `ki:binding:claude:build-plugin`, and remove `ki:eval` and `ki:binding:build-plugin` without aliases.
- [x] Add claims and skill-owned semantic checks for each accepted core repository; explicitly decide whether `ki-repo-website-cloudflare` claims `ki:site:upload` with a remote-effect safety boundary or rejects it for receiver-owned removal, and route every other unclaimed non-external key to its owning skill or remove it rather than grandfathering it.
- [x] Update CI and documented invocations in the same cut, then add focused fixtures for aggregation, duplicate and absent claims, exact exclusions, misaligned skill-owned commands, and legacy-key removal.

## Files touched

- `skills/keystone/ki-skills/` shared rubric-catalogue contract and tests
- `skills/governance/ki-engineering/` standard, rubric, catalogue, and tests
- Relevant owning-skill rubrics, catalogues, and tests
- `.ki.toml`, `package.json`, CI, and relevant documentation in the harness
- Receiver-owned changes in `tools-ki` and `ki-website`, if their owners accept the resulting proposals

## Verify

- Focused shared-rubric, `ki-engineering`, and owning-skill rubric tests
- `ki repo audit --skill ki-engineering --repo .`
- A host fixture proves that only resolved skill claims enter the inventory and duplicate claims fail deterministically.
- A repository fixture proves that every script is claimed or exactly excluded, and that exclusions cannot hide claimed, missing, duplicate, or patterned entries.
- Equivalent audits in each accepted receiving repository
- `bun run test` and `bunx tsc --noEmit` in each changed TypeScript repository

## Dependencies / blocks

The static metadata shape, host aggregation boundary, exact exclusions, and clean-cut migration rule are approved. Website disposition `KI-WEB-SITE-003` and host aggregation `KI-TOOL-CLI-057` are delivered and accepted. No dependency remains; an unclaimed key or duplicate claim remains a stop rather than permission to weaken the contract.

## Documentation impact

### Decision Records

GOV-028 remains the governing decision for script ownership; this work applies its contract without creating a new decision record.

### Specifications

No behaviour-level product specification changes are planned.

### Guides

Owner-specific script invocations and CI references will be updated with the declared claim, rather than adding generic package-script guidance.

### Roadmap

Receiver-owned Website script ownership is accepted at `KI-WEB-SITE-003`, and `tools-ki` aggregation is accepted at `KI-TOOL-CLI-057`. This Harness record now owns the remaining consuming-rule implementation and verification.

## Review

### Delivered

Against immutable Harness baseline `42f680fa0fc51e15b95c14ca22ec3e674e4d34ad`, completed the Harness consuming half of the package-script ownership contract delivered by `KI-TOOL-CLI-057`. `ki-engineering` now evaluates the host-supplied exact claim inventory, and no longer infers ownership from prefixes or repository declarations.

### Summary of changes

The shared rubric context carries canonical script-and-skill claims into engineering evidence. Exact exclusions now reject stale, duplicate, patterned, and claimed entries using the canonical skill identity. `ki-repo-tools`, `ki-repo-website`, and `ki-repo-website-cloudflare` publish their retained script identities. Cloudflare criterion `WCF-25` accepts only `cd site && bunx wrangler versions upload`, treats absence as optional, and makes credentialed remote mutation operator-or-Workers-Builds-only while all audit, conform, build, test, and dry-evaluation paths remain manifest-only.

### Verification

Focused engineering, catalogue, and Cloudflare session tests pass, including arbitrary exact claims, unclaimed keys, exclusions, optional upload absence, exact upload acceptance, command mismatch, and non-execution during conform. The complete Harness suite passes with 533 tests and 2,560 expectations; TypeScript passes. Generated Cloudflare rubric publication is current. `ki-engineering` audits pass in Harness, `tools-ki`, and KI Website. Harness `ki-skills`, `ki-authoring`, and `ki-work-roadmap` audits pass.

### Outstanding concerns

This batch deliberately does not migrate further estate repositories. Any future script introduced without one resolved exact claim now fails visibly and should be assigned to its owning skill, explicitly excluded only when genuinely repository-owned external tooling, or removed. The Cloudflare upload remains a credentialed remote operation and was not executed.

### Post-change review

The contract is viable and stable at the intended boundary: catalogues declare ownership, the host validates and aggregates the complete resolved set, and `ki-engineering` consumes that inventory without scanning arbitrary skill files or maintaining a namespace allow-list. The accepted Website command now has both ownership and an explicit execution authority boundary.

### Mini recap

Package-script governance is now exact, duplicate-safe, and owner-driven across the host, Harness, tools, and Website proof repositories. Remaining estate adoption is ordinary follow-on migration rather than unfinished work in this record.

## Done

Accepted at `2026-08-29T23:43:10Z` through closure authority bound to `KI-HARNESS-BATCH-007`. Delivery commit `74c9ce8e33839c085d0a4aa93e385a4075cfaf66` contains the complete six-part review packet and intended Harness boundary. The 533-test suite, TypeScript, focused tests, generated publication, cross-repository engineering audits, roadmap audit, and authoring audit were clean before closure. No Wrangler command, sibling write, push, release, or estate migration occurred.

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

### Workers Builds upload

The `ki:site:upload` command is not treated as accidental merely because no checked-in caller invokes it: its introducing Website commit records Workers Builds as the purpose. That evidence does not by itself make the command governed. GOV-007 must decide whether version upload is a supported part of the `ki-repo-website-cloudflare` contract and, if so, codify its remote-state authority and safe invocation boundary. If the skill rejects the command, removal belongs to Website-owned work after an available receiver path and explicit acceptance.
