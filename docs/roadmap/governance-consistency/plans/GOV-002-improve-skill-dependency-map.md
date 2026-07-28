---
id: 'GOV-002'
title: Improve skill dependency map and implementation review
status: open
roadmap: governance-consistency/review-the-skill-dependency-graph-and-implementation-quality
blocks: —
blocked-by: —
baseline-ref: —
---

## Context

The skills map should make the harness’s groups and relationships easy to understand without conflating executable prerequisites with composition, coverage, runtime binding, or materialised dependencies.

Graphviz DOT remains the authoritative diagram model. SVG is a generated rendering output, not a second hand-maintained source.

## Current state

`docs/diagrams/skills-map.dot` publishes a one-page Graphviz map and regenerates `skills-map.svg`; `skills-map.html` is an interactive companion with its own presentation data.

`ki-depends-on` records only required governance prerequisites. The existing diagram also shows curated implication, composition, process, and runtime relationships, but group-level structure and relation semantics are not yet sufficiently legible.

## Steps

1. Inventory the current map sources and classify every represented relationship: executable dependency, implication, composition, process handoff, runtime binding, coverage, or materialised dependency.
2. Define a compact diagram information architecture that makes skill groups and cross-group relationships legible while preserving the distinction between relationship classes.
3. Refactor the DOT source and its generated SVG to implement the agreed structure, retaining Graphviz as the canonical model and removing duplicated topology where a deterministic source can own it.
4. Bring the interactive companion and skills documentation into alignment with the canonical graph, without introducing a parallel hand-maintained diagram contract.
5. Record any implementation-quality findings that exceed this bounded map work as separately scoped roadmap items or plans.

## Files touched

- `docs/diagrams/skills-map.dot`
- `docs/diagrams/skills-map.svg`
- `docs/diagrams/skills-map.html`
- `docs/guides/user/skills.md`
- Relevant dependency sources, diagram-generation support, and focused tests if the review identifies drift.

## Verify

- Regenerate the SVG from the canonical DOT source and confirm no hand-maintained topology remains in the rendered output.
- Verify all documented skill and diagram links.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

This plan does not redesign `ki-depends-on`; it makes the existing dependency contract and other relationship types comprehensible. Any change to dependency semantics is a separate decision and plan.
