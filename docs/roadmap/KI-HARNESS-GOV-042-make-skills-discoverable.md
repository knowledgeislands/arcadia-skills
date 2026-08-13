---
id: KI-HARNESS-GOV-042
title: Make skills discoverable
area: GOV
theme: governance-consistency
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
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

- [ ] Extend the private `ki-repo-harness` capability context to parse the required `SKILL.md` frontmatter fields safely and render one deterministic marker-bounded catalogue section for `skills/README.md`.
- [ ] Add a mechanical capability-publication criterion that fails on a missing or stale generated section and makes CONFORM propose only the exact section update; declare the skill's contribution to `skills/README.md`.
- [ ] Render exact skill counts, domain groups, full descriptions, invocation hints, dependencies, runtime bindings, and a Mermaid formal-composition view from source facts; keep lifecycle and conceptual relationships out of the dependency graph.
- [ ] Retire `docs/diagrams/skills-map.dot` and `docs/diagrams/skills-map.svg`; use the generated catalogue for factual membership and composition, and retain the separately governed roadmap-cycle diagram for the delivery lifecycle.
- [ ] Add `docs/guides/skills-by-outcome.md`, organised around repository governance, documentation instruments, delivery, delegation versus subagent roles, repository structures, runtime binding and tokenomics, and cross-repository trades; link it from the guide and root orientations.
- [ ] Correct `README.md`, `AGENTS.md`, `docs/docs.md`, the authored portions of `skills/README.md`, and the current HELP decision so they describe the 43-governance/eight-process set and current local discovery surfaces without claiming removed CLI commands or Website freshness.
- [ ] Add focused context and catalogue fixtures for add, rename, remove, kind, domain, dependency, runtime-binding, invocation-hint, malformed-frontmatter, stale-publication, and marker-preservation cases; regenerate the readable `ki-repo-harness` rubric once.

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

## Discussion

### Four discovery questions

Capability documentation should answer four different questions without forcing one artifact to do all four jobs: what a named skill does, which capability fits an intended outcome, how related skills compose into a journey, and which capabilities are actually published or active in the current scope.

### Mechanical facts and authored guidance

Names, kinds, domains, dependencies, runtime bindings, modes, and membership are source facts and should be generated or checked. Choosing useful user outcomes, explaining adjacent boundaries, and deciding which focused views reduce cognitive load remain authored judgment. Keeping that division explicit prevents both stale inventories and unreadable generated prose.

### Selected publication shape

`skills/README.md` is the smallest durable factual home because every source harness already requires that shelf orientation. Its generated section can be exact without taking ownership of the surrounding contributor guidance. The authored `docs/guides/skills-by-outcome.md` starts from user intent and links into that catalogue; it does not repeat all 51 entries.

The current DOT/SVG map mixes formal dependencies, contextual links, lifecycle hand-offs, runtime components, and a repository-local skill in one manually maintained graph. Replacing it with the generated formal-composition view and the existing focused roadmap-cycle diagram reduces both drift and cognitive load.

### Local publication boundary

This item deliberately improves the canonical Harness repository without coupling completion to KI Website. A future Website refresh may consume the resulting facts independently, but it is neither a deliverable nor a dependency here.
