---
id: KI-HARNESS-FND-006
title: Standardise Prettier and Biome line width
theme: foundation-tooling
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Every Knowledge Islands repository that carries formatter configuration should use 160 columns for both Prettier and Biome.

## Boundary

Converge the shared standard and every repository configuration on 160 columns; do not leave a formatter mismatch undocumented.

## Current state

At the start of this work, the 10 governed TypeScript/Bun repositories used Prettier `printWidth: 160` and Biome `lineWidth: 140`; this change converges both values at 160.

`ki-authoring` owns the Prettier Markdown surface, whose `proseWrap: "never"` preserves one paragraph per line, while `ki-engineering` owns Biome's code formatter.

The shared engineering standard and checker currently record Biome at 140, so they must move with the fleet configurations.

## Steps

1. [x] Re-check every governed TypeScript/Bun repository's Prettier and Biome configuration against the recorded values.
2. [x] Confirm the separate Markdown and code-formatter ownership boundaries are still accurate in `ki-authoring` and `ki-engineering`.
3. [x] Update the shared Biome template, checker, and every repository carrying Biome configuration to `lineWidth: 160`.
4. [x] Record the convergence evidence and present the revised conclusion for acceptance.

## Files touched

- this work-item record
- `skills/governance/ki-authoring/` only if Markdown formatter ownership or configuration is inaccurate
- `skills/governance/ki-engineering/` only if the code formatter standard is inaccurate
- every Knowledge Islands repository carrying formatter configuration

## Verify

- Every Knowledge Islands repository carrying Prettier and/or Biome configuration has the applicable width set to 160.
- The shared engineering checker and template enforce the same 160-column budget.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-engineering --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This item is independent.

## Delegation

One bounded mechanical inventory pass may re-check the governed repository configuration files.

The orchestrator reviews the inventory against the two owning standards and decides whether any observed difference is drift or an intentional file-scope boundary.

## Acceptance

### Delivered

Converged every formatter configuration under `knowledgeislands/` on 160 columns and reformatted every repository carrying `biome.json`.

### Summary of changes

- Every `.prettierrc.json` under `knowledgeislands/` has `printWidth: 160`.
- Every `biome.json` under `knowledgeislands/` has `formatter.lineWidth: 160`.
- The canonical `ki-engineering` template, audit evidence, standard, and exemplar now require 160.
- The vendored `ki-engineering` copy in `ki-plugins` now requires 160 too.
- The ten Biome repositories were mechanically reformatted so the new read-only gate is clean.

### Verification

- Enumerated all 14 Git repositories under `knowledgeislands/`: every present Prettier or Biome width is 160.
- `bunx biome format .` passed in all ten repositories carrying `biome.json` after the change.
- `bun run test` passed in `ki-agentic-harness` (218 pass, 0 fail).
- `bunx tsc --noEmit` passed in `ki-agentic-harness`.
- `ki repo audit --skill ki-engineering --repo .` passed in `ki-agentic-harness`.

### Outstanding concerns

The focused engineering audit of `ki-arcadia-principal` still reports its pre-existing `GEN-1` generated-discovery exclusion mismatch. It is unrelated to formatter width and remains outside this work item.

### Mini recap

The earlier 160/140 formatter split has been replaced with one 160-column standard across the organisation.

## Done

Accepted by the user on 2026-07-29 after the organisation-wide formatter convergence.

## Discussion

### Convergence decision

The owner selected one 160-column budget for code and Markdown. The formatter ownership split remains: `ki-authoring` owns Prettier's Markdown configuration and `ki-engineering` owns Biome's code configuration.
