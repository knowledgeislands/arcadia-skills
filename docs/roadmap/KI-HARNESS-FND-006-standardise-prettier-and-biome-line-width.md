---
id: KI-HARNESS-FND-006
title: Standardise Prettier and Biome line width
theme: foundation-tooling
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Every KI repository uses Prettier `printWidth: 160` and Biome `lineWidth: 140`, split by file scope rather than a single chosen value.

## Boundary

Decide whether to converge or record why the split is intentional; update shared scaffolds and existing repositories together rather than leaving mismatch undocumented.

## Current state

The current 10 governed TypeScript/Bun repositories each use Prettier `printWidth: 160` and Biome `lineWidth: 140`.

`ki-authoring` owns the Prettier Markdown surface, whose `proseWrap: "never"` preserves one paragraph per line, while `ki-engineering` owns Biome's code formatter at 140 columns.

The shared engineering standard already records both values and their separate file scopes.

## Steps

1. Re-check every governed TypeScript/Bun repository's Prettier and Biome configuration against the recorded values.
2. Confirm the separate Markdown and code-formatter ownership boundaries are still accurate in `ki-authoring` and `ki-engineering`.
3. Change a shared scaffold and every affected governed repository only if the inventory identifies actual drift; otherwise retain the intentional split without a no-op configuration rewrite.
4. Record the evidence and present the conclusion for acceptance.

## Files touched

- this work-item record
- `skills/governance/ki-authoring/` only if Markdown formatter ownership or configuration is inaccurate
- `skills/governance/ki-engineering/` only if the code formatter standard is inaccurate
- affected repository formatter configuration only if the inventory finds drift

## Verify

- Every governed TypeScript/Bun repository has Prettier `printWidth: 160` and Biome `lineWidth: 140`, or every evidenced exception is explicitly routed.
- The shared standards explain the different values by formatter and file scope rather than treating them as a mismatch.
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-engineering --repo .`
- `ki repo audit --skill ki-roadmap --repo .`

## Dependencies / blocks

This item is independent.

## Discussion

### Convergence decision

The shaping pass must compare formatter ownership and actual file scopes before deciding whether one width is clearer than an explicitly documented split.

### Inventory evidence

The current inventory already shows the intended values across all 10 governed TypeScript/Bun repositories.

The expected result is an evidence-only closure unless a fresh check finds drift.
