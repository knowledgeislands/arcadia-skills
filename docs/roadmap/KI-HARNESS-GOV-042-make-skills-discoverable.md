---
id: KI-HARNESS-GOV-042
title: Make skills discoverable
area: GOV
theme: governance-consistency
horizon: next
status: draft
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

The 51 canonical `SKILL.md` files already provide stable factual inputs including name, kind, source domain, description, dependencies, runtime binding, and modes. The checked-in `docs/diagrams/skills-map.dot` and SVG are maintained separately, while repository-local guides currently cover contributor mechanics rather than capability selection.

The normal `ki-skills`, `ki-guides`, and roadmap audits all pass despite the observed documentation drift. Freshness therefore has no current mechanical owner. `ki-skills` owns individual skill quality, while the Harness bundle and its published capability inventory point toward `ki-repo-harness` as the likely owner of cross-capability publication parity.

## Steps

- [ ] Define one canonical capability-inventory projection from the Harness skill sources, separating mechanically derived facts from authored explanation and naming the rubric owner for parity.
- [ ] Add deterministic generation or validation for complete catalogue membership, current identities, kind and domain grouping, declared dependencies, runtime adapters, and retired-name absence.
- [ ] Replace the overloaded manually maintained map with focused generated views for the delivery lifecycle, capability families, portable-to-runtime adapters, and formal dependency composition.
- [ ] Add a concise repository-local guide organised by user outcome, including the important boundaries between documentation instruments, delivery process skills, delegation and subagent roles, repository structures, runtime binding, and cross-repository trades.
- [ ] Correct the Harness README and other local explanatory surfaces against the canonical inventory, without copying Website-owned public guidance into this repository.
- [ ] Add focused fixtures that prove a new, renamed, removed, reclassified, or re-dependent skill cannot leave the catalogue facts or generated maps silently stale.

## Files touched

- The chosen canonical capability-inventory projection and generator or validator
- `skills/repo-structure/ki-repo-harness/` standard, rubric, tests, and generated publication if it owns parity
- `docs/diagrams/skills-map.dot`, `docs/diagrams/skills-map.svg`, and any focused replacement views
- `docs/guides/README.md` and one task-oriented capability guide
- `README.md` and directly affected local orientation
- This roadmap item

## Verify

- A fixture with one added, renamed, removed, reclassified, or dependency-changed skill produces an exact mechanical finding until the derived publication is refreshed.
- Generated catalogue membership equals the 51 canonical skill identities with no retired identifiers.
- Generated dependency edges equal every current `ki-depends-on:` declaration, while contextual relationships remain explicitly separate.
- The task-oriented guide lets a reader select the correct capability or journey for representative repository, documentation, delivery, delegation, runtime, and trade outcomes without first knowing a skill name.
- Focused owner tests, `ki repo audit --skill ki-repo-harness --repo .`, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-guides --repo .`, `ki repo audit --skill ki-authoring --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

No external repository or Website publication is required. Planning must confirm the mechanical owner and exact generated-artifact boundary before marking this item Ready. GOV-016 may refine the shared documentation-topology vocabulary, but this item remains independently executable because it concerns Harness capability discovery and publication parity rather than the four-document repository topology.

## Discussion

### Four discovery questions

Capability documentation should answer four different questions without forcing one artifact to do all four jobs: what a named skill does, which capability fits an intended outcome, how related skills compose into a journey, and which capabilities are actually published or active in the current scope.

### Mechanical facts and authored guidance

Names, kinds, domains, dependencies, runtime bindings, modes, and membership are source facts and should be generated or checked. Choosing useful user outcomes, explaining adjacent boundaries, and deciding which focused views reduce cognitive load remain authored judgment. Keeping that division explicit prevents both stale inventories and unreadable generated prose.

### Local publication boundary

This item deliberately improves the canonical Harness repository without coupling completion to KI Website. A future Website refresh may consume the resulting facts independently, but it is neither a deliverable nor a dependency here.
