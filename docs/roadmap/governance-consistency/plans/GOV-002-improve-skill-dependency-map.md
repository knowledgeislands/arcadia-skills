---
id: 'GOV-002'
title: Improve skill dependency map and implementation review
status: done
roadmap: governance-consistency/review-the-skill-dependency-graph-and-implementation-quality
blocks: —
blocked-by: —
baseline-ref: 73d4a53d0606b52b8434ea6c8c78ea241b18db76
---

## Context

The skills map should make the harness’s groups and relationships easy to understand without conflating executable prerequisites with composition, coverage, runtime binding, or materialised dependencies.

Graphviz DOT remains the authoritative diagram model. SVG is a generated rendering output, not a second hand-maintained source.

## Current state

`docs/diagrams/skills-map.dot` publishes a one-page Graphviz map and regenerates `skills-map.svg`. The former interactive companion duplicated its topology and therefore cannot remain a second diagram source.

`ki-depends-on` records only required governance prerequisites. The existing diagram also shows curated implication, composition, process, and runtime relationships, but group-level structure and relation semantics are not yet sufficiently legible.

The map will flow from general foundations on the left to specialised capabilities on the right. Colour identifies a skill family; every node also names that family, so spatial grouping does not need to create a competing hierarchy.

## Steps

1. [x] Inventory the current map sources and classify every represented relationship: executable dependency, implication, composition, process handoff, runtime binding, coverage, or materialised dependency.
2. [x] Define a compact diagram information architecture that makes skill groups and cross-group relationships legible while preserving the distinction between relationship classes.
3. [x] Refactor the DOT source and its generated SVG to implement the agreed structure, retaining Graphviz as the canonical model and removing duplicated topology where a deterministic source can own it.
4. [x] Retire the duplicate interactive companion and align the skills documentation with the canonical graph.
5. [x] Record any implementation-quality findings that exceed this bounded map work as separately scoped roadmap items or plans.

## Findings

The interactive D3 companion duplicated the skill and relationship topology in a second hand-maintained source, so it was removed rather than kept in parallel with the DOT graph.

No further implementation-quality work arose from this bounded review.

## Files touched

- `docs/diagrams/skills-map.dot`
- `docs/diagrams/skills-map.svg`
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

## Acceptance

### Delivered

The canonical Graphviz skills map now flows from general foundations on the left to specialised capabilities on the right, with no rigid family clusters.

### Summary of changes

The DOT graph and generated SVG now show every skill’s name, family, and concise purpose; include `ki-git`; distinguish formal `ki-repo` prerequisites from contextual baseline links; and retain runtime arms as visually secondary non-skill nodes.

The duplicate hand-maintained D3 companion was removed, and the skills guide now directs readers to the canonical SVG.

### Verification

At `f2f6c189`, Graphviz regenerated `docs/diagrams/skills-map.svg`; `bunx prettier --check` passed for the changed Markdown; `ki repo audit --skill ki-skills --repo .` and `ki repo audit --repo .` reported zero FAIL and zero WARN; `bun run test` passed 210 tests; and `bunx tsc --noEmit` passed.

### Outstanding concerns

None.

### Mini recap

The map reads most clearly when rank encodes generality and specialisation while colour and a visible family label encode taxonomy. No follow-up is required for this bounded change.

## Done

Completed the single-source, left-to-right dependency map and its documentation alignment. Residual concern: None. Intended follow-up: prune this retained done record only when the user selects it in a later prune batch.
