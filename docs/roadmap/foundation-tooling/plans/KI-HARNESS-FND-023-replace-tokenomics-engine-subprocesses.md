---
id: 'KI-HARNESS-FND-023'
title: Replace local tokenomics engine subprocesses
status: in-progress
roadmap: foundation-tooling/replace-local-tokenomics-engine-subprocesses
blocks: —
blocked-by: —
baseline-ref: ab4c941e95546367ac2548f2036b453a15c5594e
---

# KI-HARNESS-FND-023: Replace local tokenomics engine subprocesses

## Context

The tokenomics checker currently launches Bun for adjacent source modules. A direct evidence and findings API would remove that local subprocess boundary while retaining the CLI's external behaviour.

## Current state

The intended cutover is already present. Commit `24b99d37` (`refactor(tokenomics): adopt native rubric session`) removed the legacy `scripts/govern.ts` engine and report publication, replacing it with the direct `create*Session` catalogue contracts now loaded by `ki`.

The three tokenomics capabilities contain no local Bun or adjacent-source subprocess call. Their sessions expose audit outcomes and empty conform proposals directly; external Git remains outside these contexts, and there is no aggregate rendering path to preserve or change.

## Steps

1. ✓ Map tokenomics audit and conform engine entry points, callers, and externally observable contracts.
2. ✓ Confirm the direct session contracts are the pure evidence and findings API; no local CLI adapter remains.
3. ✓ Confirm there are no adjacent local Bun subprocess calls or report-rendering compatibility path remaining.
4. ✓ Verify focused portable, Claude, and Codex session tests cover the direct contract and report-only conform proposal.

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
