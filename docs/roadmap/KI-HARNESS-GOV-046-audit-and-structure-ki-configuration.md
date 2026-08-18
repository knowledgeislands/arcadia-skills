---
id: KI-HARNESS-GOV-046
title: Audit KI configuration structure
area: GOV
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Establish an estate-wide approach that keeps `.ki-config.toml` files expressive, concise, consistently ordered, and easy to navigate as they grow.

## Context

KI configuration files are accumulating more declared skills and larger relationship datasets. That growth is valid, but the files currently provide little shared guidance about ordering, conceptual grouping, section boundaries, or when repeated configuration has become unnecessarily verbose.

The Harness illustrates the navigation problem. Repository identity and structure declarations such as `skills.ki-repo` and `skills.ki-repo-harness` are foundational and should be easy to find near the front, while operational relationship data such as trade routes and Agora homes and memberships may read more clearly toward the end under recognisable sections.

## Boundary

Audit before standardising. This delivery reads the registered estate and records an evidence-backed recommendation in this item; it does not change any `.ki-config.toml`, add a checker, impose comment headings, split files, rename tables, or change configuration semantics. Any standard, checker, or multi-repository conformance becomes separately reviewed follow-up work after the recommendation is accepted.

## Current state

The current registered estate contains 27 repositories. Fifteen are under the `knowledgeislands` workspace, but the registry also includes personal configuration, Knowledge Bases, websites, harnesses, and other Projects elsewhere. The audit therefore uses the registered estate selected by `ki repo --estate`, re-resolved at execution time, rather than assuming one filesystem parent or organisation is complete.

The initial direction is intentionally provisional. Repository identity and structural skills such as `skills.ki-repo` and `skills.ki-repo-harness` appear to belong near the front, while data-heavy relationship sections such as trade routes and Agora homes and memberships may belong toward the end under recognisable boundaries. The audit must test that direction across repository kinds before it becomes a convention.

The existing `ki-repo` contract fixes one shared root `.ki-config.toml`, `[repo]` plus the `[skills]` namespace, one owner table per skill, explicit root markers, and validate-down / ignore-across ownership. Ordering and navigational section comments are not currently semantic. The audit may recommend presentation and checkable ordering rules, but it cannot weaken those ownership boundaries or make comments meaningful to consumers.

## Steps

- [ ] Re-resolve the registered estate with `ki repo --estate`, record the exact in-scope roots and missing or unreadable configurations, and keep those access findings distinct from configuration-structure findings.
- [ ] Parse every accessible root `.ki-config.toml` and record line and byte size, root-table order, declared skill-root order, nested-table placement, comment boundaries, and the line share occupied by large repeated structures such as routes and memberships.
- [ ] Classify each repository by its declared `ki-repo` kind and structural markers, then compare Harness, Knowledge Base, website, MCP, tools, personal-configuration, and ordinary Project profiles without forcing every profile to contain the same groups.
- [ ] Test the provisional ordering against representative configurations: `[repo]`, `skills.ki-repo`, repository-kind and structural declarations, general governance and runtime declarations, change-management declarations, then data-heavy relationship sections such as `ki-trades` and `ki-agora` toward the end.
- [ ] Compare no headings, stable comment boundaries, and any file-splitting alternative against navigation, diff quality, TOML validity, consumer compatibility, and the one-file / one-owner-table contract.
- [ ] Identify values that appear duplicated or derivable, but route each semantic simplification to its owning skill rather than proposing a cross-owner rewrite from `ki-repo`.
- [ ] Record in this item the inventory summary, representative examples, rejected alternatives, recommended ordering and optional section vocabulary, and the boundary between judgment guidance and deterministic checks.
- [ ] Propose separately scoped follow-up records for any accepted standard change, checker implementation, owner-specific schema simplification, or estate rollout; do not implement them in this delivery.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-046-audit-and-structure-ki-configuration.md`

Registered estate `.ki-config.toml` files are read-only evidence. No skill standard, rubric, script, test, generated publication, or sibling repository changes in this delivery.

## Verify

- The recorded root count and identities reconcile with a fresh registered-estate selection, with every missing or unreadable config listed explicitly rather than silently omitted.
- Every accessible config parses before analysis; the recorded table sequence and size totals reconcile with the source files.
- The evidence includes at least one representative of every repository profile present in the selected estate and explains any profile with no representative.
- The recommended order preserves `[repo]`, exact skill-root declarations, nested owner tables, and validate-down / ignore-across semantics; comments remain semantically inert.
- The recommendation explicitly classifies each proposed rule as judgment guidance, a deterministic `ki-repo` check, or an owner-specific follow-up, with a positive and negative example for every proposed deterministic check.
- `ki repo audit --skill ki-work-roadmap --repo .` and the targeted Markdown check pass after the evidence and recommendation are recorded.

## Dependencies / blocks

This item has no prerequisite and blocks no current work. It depends only on read access to the registered estate; inaccessible repositories remain explicit inventory gaps and do not authorise filesystem or remote writes. Estate repositories are evidence sources only, and changing them requires separately confirmed repository-local authority.

## Delegation

### Locked decisions

- Estate means the repository registry selected by `ki repo --estate`, freshly resolved at execution time.
- This delivery writes only this work item and produces a recommendation; it does not alter configuration, standards, checkers, scripts, tests, publications, or peer repositories.

### Escalate

- Any inaccessible repository that prevents representative coverage, ambiguous repository identity or kind, need for a peer write, semantic configuration change, new checker, standard change, or recommendation that would weaken one-file or owner-table boundaries.

### Worker: configuration-audit

- **Deliverable:** A complete estate inventory, representative analysis, alternatives, ownership classification, and evidence-backed recommendation recorded in this work item.
- **Inputs:** This work item, the registered estate, the `ki-repo` configuration standard, the `ki-authoring` TOML conventions, and each accessible root `.ki-config.toml`.
- **Scope:** Read registered repository roots and their `.ki-config.toml` files; write only this work item. Do not change configuration, standards, source, tests, generated files, registry state, or external systems.
- **Authority:** Run read-only registry, filesystem, TOML parsing, and Git inspection commands; update the named work item only. Perform no Git write, network write, peer write, message, deployment, push, release, or destructive action.
- **Isolation:** Read-only estate access plus exclusive write access to this roadmap file in the shared worktree; no Git staging or commit commands.
- **Verify:** Coordinator reconciles the inventory with a fresh estate selection, samples every cited configuration class, reviews the recommendation against `ki-repo` and `ki-authoring`, and runs the work item's gates.
- **Return:** Concise inventory totals, representative findings, recommendation, proposed follow-ups, exact file changed, and verification result; no raw diagnostic transcript.
- **Checkpoint:** Return after the recommendation and required evidence are complete in the work item, or immediately on an escalation condition.

## Documentation impact

### Decision Records

No Decision Record changes in this delivery. Propose one as follow-up only if the accepted recommendation changes the durable one-file or ownership architecture rather than presentation guidance.

### Specifications

No product Specification change is expected.

### Guides

No guide changes in this delivery. Update guidance only through accepted follow-up work after the configuration convention and its examples are settled; do not publish the provisional Harness ordering as an estate rule.

### Roadmap

This item is the durable audit record. Create separately scoped implementation or rollout work if the accepted recommendation calls for standard changes, new checks, semantic simplification, file splitting, or multi-repository conformance.

## Discussion

### Candidate outcome

The audit should recommend the smallest useful convention: a documented ordering and grouping model, bounded section-comment guidance where it materially improves navigation, and checks only for rules that can be enforced without understanding user intent. It may conclude that some large data sections are already appropriately expressive and need only clearer placement.

### Evidence required

Any recommendation must include the estate inventory, representative configurations from materially different repository kinds, before-and-after navigation examples, compatibility implications for TOML consumers, and a distinction between safe mechanical conformance and changes requiring repository-owner judgment.

### Ownership boundary

`ki-repo` owns the shared file contract, cross-skill ordering guidance, and any check that reasons only about table identity and placement. `ki-authoring` owns TOML presentation, including whether comments communicate their purpose clearly. Each declared skill continues to own the contents and schema of its own table; suspected duplication or verbosity inside an owner table is evidence for that skill, not permission for a cross-owner conformer.
