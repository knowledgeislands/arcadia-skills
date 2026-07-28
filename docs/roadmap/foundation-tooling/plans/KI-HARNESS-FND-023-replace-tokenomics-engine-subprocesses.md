---
id: 'KI-HARNESS-FND-023'
title: Replace local tokenomics engine subprocesses
status: ready
roadmap: foundation-tooling/replace-local-tokenomics-engine-subprocesses
blocks: —
blocked-by: —
baseline-ref: —
---

# KI-HARNESS-FND-023: Replace local tokenomics engine subprocesses

## Context

The tokenomics checker currently launches Bun for adjacent source modules. A direct evidence and findings API would remove that local subprocess boundary while retaining the CLI's external behaviour.

## Current state

The direct CLI, JSONL/reporting contracts, and external Git boundary must remain intact. Aggregate rendering is explicitly out of scope.

## Steps

1. Map tokenomics audit and conform engine entry points, callers, and externally observable contracts.
2. Extract a pure evidence and findings API with the existing CLI as a thin adapter.
3. Replace adjacent local Bun subprocess calls with direct imports and preserve report behaviour.
4. Add focused contract tests and verify no aggregate-rendering change is coupled to the cutover.

## Files touched

- `skills/environment/ki-tokenomics/`
- `skills/environment/ki-tokenomics-claude/`
- `skills/environment/ki-tokenomics-codex/`

## Verify

- Focused tokenomics tests.
- `bun run test`
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`

## Dependencies / blocks

None.
