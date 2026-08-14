---
id: KI-HARNESS-GOV-042
title: Make skills discoverable
area: GOV
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: dd1277b640c08863092ca231c29a917da43bb96c
---

## Goal

Make the Harness skill set understandable by outcome, keep its factual catalogue and maps aligned with the capabilities actually published, and detect future documentation drift mechanically.

## Context

The Harness currently publishes 51 skills: 43 governance skills and eight process skills. The existing public catalogue describes only 40, the checked-in dependency diagram omits 11 current shared skills, and explanatory material still names retired or renamed capabilities such as `ki-communication`, `ki-delegate`, and `ki-tools`. The Harness README also describes the set as entirely governance skills.

The current surfaces answer different fragments of the discovery problem: `ki harness info` lists installed names, individual skill descriptions and HELP explain a known capability, the catalogue describes named skills, and the map shows relationships. None gives a dependable task-oriented answer to “I want to achieve this outcome; which skill or journey should I use?”, and no mechanical check proves that the source skill set, catalogue facts, and diagrams agree.

## Boundary

Keep this delivery within `ki-agentic-harness`. Do not export or write documentation to KI Website, change the `tools-ki` command surface, alter skill semantics merely to simplify a diagram, or make generated facts replace the judgment needed for a task-oriented guide. Do not create another manually maintained 51-entry catalogue.

## Current state

The 51 canonical `SKILL.md` files already provide stable factual inputs including name, kind, source domain, description, dependencies, runtime binding, and invocation hints. The checked-in `docs/diagrams/skills-map.dot` and SVG are maintained separately, while repository-local guides currently cover contributor mechanics rather than capability selection. `skills/README.md` is already the required skill-shelf orientation, but it is also manually maintained and incorrectly describes every skill as governance.

The normal `ki-skills`, `ki-guides`, and roadmap audits all pass despite the observed documentation drift. Freshness therefore has no current mechanical owner. `ki-skills` owns individual skill quality; `ki-repo-harness` already owns the skill-shelf shape, capability inventory, and publication boundary, so it is the mechanical owner for a complete derived catalogue within `skills/README.md`. `ki-guides` remains the owner of the authored task-oriented guide.

The selected design keeps one generated catalogue section between stable markers in `skills/README.md`. A private `ki-repo-harness` context reads and validates the relevant YAML frontmatter with Bun's built-in YAML parser, renders exact counts, domain groups, descriptions, invocation hints, dependencies, runtime bindings, and a Mermaid composition view, and compares those bytes during AUDIT. CONFORM proposes only the marker-bounded replacement while preserving authored shelf guidance outside it. This needs no new shared parser, public script, package dependency, or external diagram renderer.

## Steps

- [x] Extend the private `ki-repo-harness` capability context to parse the required `SKILL.md` frontmatter fields safely and render one deterministic marker-bounded catalogue section for `skills/README.md`.
- [x] Add a mechanical capability-publication criterion that fails on a missing or stale generated section and makes CONFORM propose only the exact section update; declare the skill's contribution to `skills/README.md`.
- [x] Render exact skill counts, domain groups, full descriptions, invocation hints, dependencies, runtime bindings, and a Mermaid formal-composition view from source facts; keep lifecycle and conceptual relationships out of the dependency graph.
- [x] Retire `docs/diagrams/skills-map.dot` and `docs/diagrams/skills-map.svg`; use the generated catalogue for factual membership and composition, and retain the separately governed roadmap-cycle diagram for the delivery lifecycle.
- [x] Add `docs/guides/skills-by-outcome.md`, organised around repository governance, documentation instruments, delivery, delegation versus subagent roles, repository structures, runtime binding and tokenomics, and cross-repository trades; link it from the guide and root orientations.
- [x] Correct `README.md`, `AGENTS.md`, `docs/docs.md`, the authored portions of `skills/README.md`, and the current HELP decision so they describe the 43-governance/eight-process set and current local discovery surfaces without claiming removed CLI commands or Website freshness.
- [x] Add focused context and catalogue fixtures for add, rename, remove, kind, domain, dependency, runtime-binding, invocation-hint, malformed-frontmatter, stale-publication, and marker-preservation cases; regenerate the readable `ki-repo-harness` rubric once.

## Files touched

- `skills/repo-structure/ki-repo-harness/SKILL.md`
- `skills/repo-structure/ki-repo-harness/references/{standards-compatible-harness,rubric}.md`
- `skills/repo-structure/ki-repo-harness/scripts/rubric/contexts/` capability-publication implementation and focused tests
- `skills/repo-structure/ki-repo-harness/scripts/rubric/items/{capabilities,index.test}.ts`
- `skills/README.md`
- `docs/guides/README.md` and `docs/guides/skills-by-outcome.md`
- Retire `docs/diagrams/skills-map.dot` and `docs/diagrams/skills-map.svg`
- `README.md`, `AGENTS.md`, `docs/docs.md`, and `docs/decisions/ADR-KI-HARNESS-SKILLS-001-audit-conform-educate-refresh-canonical-modes-help.md`
- This roadmap item

## Verify

- Focused `ki-repo-harness` tests prove parsing, deterministic rendering, marker preservation, safe failure, and exact stale-publication findings for every named source change.
- Generated catalogue membership equals the 51 canonical skill identities, reports 43 governance and eight process skills, and contains no retired identifiers.
- Generated dependency edges equal every current `ki-depends-on:` declaration, while lifecycle and contextual relationships remain explicitly separate.
- The task-oriented guide lets a reader select the correct capability or journey for representative repository, documentation, delivery, delegation, runtime, and trade outcomes without first knowing a skill name.
- `ki dev skill rubric ki-repo-harness` reports an exact generated publication.
- `ki repo audit --skill ki-repo-harness --repo .`, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-guides --repo .`, `ki repo audit --skill ki-authoring --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

No external repository or Website publication is required. `ki-repo-harness` owns the generated capability section in the required skill-shelf orientation; `ki-guides` owns the separate authored selection guide. GOV-016 may refine the shared documentation-topology vocabulary, but this item remains independently executable because it concerns Harness capability discovery and publication parity rather than the four-document repository topology.

The implementation is tightly coupled across one inventory renderer, one rubric context, its exact publication, and the documents consuming it. Parallel delegation would create shared-file and regeneration conflicts without a bounded delivery advantage, so this item should remain local to one implementation context.

## Review

### Delivered

Implemented the approved Harness-local boundary from immutable baseline `dd1277b640c08863092ca231c29a917da43bb96c`. Commit `9e09b943` adds the generated catalogue and mechanical parity check, the task-oriented guide, current orientation and HELP documentation, and retires only the obsolete skill-map DOT/SVG pair. It makes no KI Website or `tools-ki` change and does not alter skill semantics to simplify the graph.

### Summary of changes

Added a private Bun-YAML capability parser and deterministic marker renderer to `ki-repo-harness`, plus mechanical criterion `CAP-2` and its automatic CONFORM proposal. The generated `skills/README.md` section now publishes all 51 canonical skills, the 43-governance/eight-process split, domain groups, descriptions, invocation hints, dependencies, runtime bindings, and a Mermaid graph containing only formal `ki-depends-on` edges.

Added `docs/guides/skills-by-outcome.md` and routed the root, agent, documentation, and guide indexes to it and the generated catalogue. Updated the current HELP Decision Record to describe in-session skill-owned HELP and the current cross-skill discovery surfaces without retired renderers or CLI aliases. Removed `docs/diagrams/skills-map.dot` and `docs/diagrams/skills-map.svg`; the separately governed roadmap-cycle diagram remains.

### Verification

- `bun run test` — passed the complete isolated Harness and hook suite, including the new 14 focused capability-publication/catalogue tests.
- `bunx tsc --noEmit` — passed.
- `ki dev skill rubric ki-repo-harness` — reported `references/rubric.md` in sync.
- `ki repo audit --skill ki-repo-harness --repo .` — passed with zero FAIL and WARN across the selected dependency chain.
- Focused `ki-skills`, `ki-guides`, `ki-decision-records`, and `ki-authoring` audits — each passed with zero FAIL and WARN.
- Catalogue evidence — 51 generated `ki-*` entries exactly match 43 governance and eight process source declarations; searches found no retired skill-map references or removed HELP/audit aliases in the current discovery surfaces.

### Outstanding concerns

None within the approved boundary. Public Website guidance may remain independently stale, but Website export and publication were explicitly excluded and are not required for this item.

### Post-change review

The delivery meets the goal: a reader can start from an intended outcome, then reach exact source-derived capability facts without relying on a separately maintained public catalogue or mixed-purpose map. Regression risk is bounded to the new private parser and marker replacement; fail-closed validation, exact-byte audit, marker-preservation fixtures, full tests, TypeScript, and focused governance audits cover that boundary. The item is ready for human acceptance.

### Mini recap

GOV-042 now separates authored judgment from mechanical facts: the guide owns outcome selection, while `ki-repo-harness` owns catalogue membership and formal composition parity. The useful durable learning is already encoded in the Harness standard, rubric criterion, Decision Record, and guide, so no additional knowledge promotion is proposed.

## Discussion

### Four discovery questions

Capability documentation should answer four different questions without forcing one artifact to do all four jobs: what a named skill does, which capability fits an intended outcome, how related skills compose into a journey, and which capabilities are actually published or active in the current scope.

### Mechanical facts and authored guidance

Names, kinds, domains, dependencies, runtime bindings, modes, and membership are source facts and should be generated or checked. Choosing useful user outcomes, explaining adjacent boundaries, and deciding which focused views reduce cognitive load remain authored judgment. Keeping that division explicit prevents both stale inventories and unreadable generated prose.

### Selected publication shape

`skills/README.md` is the smallest durable factual home because every source harness already requires that shelf orientation. Its generated section can be exact without taking ownership of the surrounding contributor guidance. The authored `docs/guides/skills-by-outcome.md` starts from user intent and links into that catalogue; it does not repeat all 51 entries.

The retired DOT/SVG map mixed formal dependencies, contextual links, lifecycle hand-offs, runtime components, and a repository-local skill in one manually maintained graph. The generated formal-composition view and the existing focused roadmap-cycle diagram now keep those concerns separate, reducing both drift and cognitive load.

### Local publication boundary

This item deliberately improves the canonical Harness repository without coupling completion to KI Website. A future Website refresh may consume the resulting facts independently, but it is neither a deliverable nor a dependency here.
