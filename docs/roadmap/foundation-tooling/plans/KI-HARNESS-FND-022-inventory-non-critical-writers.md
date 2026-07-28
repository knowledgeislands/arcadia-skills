---
id: 'KI-HARNESS-FND-022'
title: Inventory non-critical writers for bounded follow-up
status: open
roadmap: foundation-tooling/inventory-non-critical-writers-for-bounded-follow-up
blocks: —
blocked-by: —
baseline-ref: —
---

# KI-HARNESS-FND-022: Inventory non-critical writers for bounded follow-up

## Context

The rollout-critical filesystem work is complete, but several remaining writers need a bounded risk review before any more hardening is prioritised.

## Current state

The first review targets are the Cowork settings writer, native CLI merge, Claude housekeeping state writers, and recursive subagent-surface writer. Opaque subprocesses retain their existing exclusions pending a separate isolation design.

## Steps

1. Inventory remaining writers by mutation class, ownership boundary, and affected filesystem scope.
2. Inspect the named high-risk writers for dry-run, idempotence, symlink, and atomic-publication evidence.
3. Record only concrete, bounded follow-up work for writers that present material risk.

## Files touched

- `skills/**/scripts/`
- `docs/roadmap/foundation-tooling/`

## Verify

- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- Focused tests for any changed writer.

## Dependencies / blocks

None.
