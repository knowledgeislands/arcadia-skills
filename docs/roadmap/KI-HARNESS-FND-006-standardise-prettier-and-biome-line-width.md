---
id: KI-HARNESS-FND-006
title: Standardise Prettier and Biome line width
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Every KI repository uses Prettier `printWidth: 160` and Biome `lineWidth: 140`, split by file scope rather than a single chosen value.

## Boundary

Decide whether to converge or record why the split is intentional; update shared scaffolds and existing repositories together rather than leaving mismatch undocumented.
