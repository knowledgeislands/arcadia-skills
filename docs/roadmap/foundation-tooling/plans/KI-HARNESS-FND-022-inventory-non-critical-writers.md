---
id: 'KI-HARNESS-FND-022'
title: Inventory non-critical writers for bounded follow-up
status: done
roadmap: foundation-tooling/inventory-non-critical-writers-for-bounded-follow-up
blocks: —
blocked-by: —
baseline-ref: ab4c941e95546367ac2548f2036b453a15c5594e
---

# KI-HARNESS-FND-022: Inventory non-critical writers for bounded follow-up

## Context

The rollout-critical filesystem work is complete, but several remaining writers need a bounded risk review before any more hardening is prioritised.

## Current state

The review found two host-mediated conformers and two direct external writers.

- `ki-housekeeping-claude` proposes only changed drafts under the selected repository's Claude memory directory; the host owns publication, and its focused tests refuse symlinked Claude roots, memory directories, and memory indexes.
- `ki-subagents` proposes only changed repository-relative agent drafts; the host owns publication, recursive discovery refuses unsafe paths, and focused tests refuse symlinked agent files without traversal.
- `ki-binding-claude` regenerates a separate Cowork marketplace projection after target and symlink guards, but deletes generated paths before recreating them. It has no inspection-only mode or staged replacement.
- `ki-binding-codex` has a no-write `--check` mode, but its native `codex mcp remove` / `add` sequence can leave a partial result if a later native command fails.

The two direct writers have bounded candidate follow-ups on the thematic roadmap. Other opaque subprocesses retain their existing exclusions pending a separate isolation design.

## Steps

1. ✓ Inventory remaining writers by mutation class, ownership boundary, and affected filesystem scope.
2. ✓ Inspect the named high-risk writers for dry-run, idempotence, symlink, and atomic-publication evidence.
3. ✓ Record only concrete, bounded follow-up work for writers that present material risk.

## Files touched

- `skills/**/scripts/`
- `docs/roadmap/foundation-tooling/`

## Verify

- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- Focused tests for any changed writer.

## Dependencies / blocks

None.

## Acceptance

### Delivered

Completed the bounded review of non-critical writers and recorded the only two material risks as future candidate work.

### Summary of changes

- Classified the Claude housekeeping and subagent conformers as host-mediated writers with existing scope and symlink evidence.
- Identified the separate Cowork projection and native Codex MCP update sequence as the only direct external writers needing follow-up.
- Added bounded candidates to `docs/roadmap/foundation-tooling/ROADMAP.md` for recoverable Cowork publication and Codex MCP rendering.

### Verification

- `bun run test` — 216 passing tests.
- `bunx tsc --noEmit` — passed.
- `ki repo audit --skill ki-skills --repo .` — clean.
- `ki repo audit --skill ki-roadmap --repo .` — clean.
- Evidence revision: `5293231a9bf91bed1aecc37d4bd1b4b52457e158`.

### Outstanding concerns

None. The two external-writer risks are deliberately retained as bounded candidate work rather than implied implementation.

### Mini recap

Direct writers need evidence proportionate to their target and mutation scope; report-only rubric sessions should remain on the host-owned transaction path.

## Done

Completed the writer inventory and recorded the bounded external-writer follow-up candidates.

Residual concern: None.

Follow-up: Review the two recorded candidates only when their respective external writer is next prioritised.
