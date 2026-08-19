---
id: KI-HARNESS-FND-016
area: FND
title: Scope MCP tool evidence
theme: foundation-tooling
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: cfc93b5c8e5f4258836f423a8877f08b884e5a67
---

## Goal

Make MCP tool-output evidence inspect only the source files that are allowed to construct MCP envelopes.

## Context

`TOOL-1` currently searches every non-test `src/**` file for `structuredContent` or `jsonResult`, despite the `ki-repo-mcp` standard assigning response shaping to `src/tools/**` and prohibiting it in `main/`. This incorrectly reports helper and implementation files in five sibling MCP repositories. Fleet grounding confirms Git Audit, KBFS, Notion Mirror, GSuite, and M365 have tool-local `outputSchema` declarations; Claude Housekeeping has one genuine `claude-desktop` tool schema gap.

## Boundary

Do not weaken handler-level output-schema pairing, suppress findings by configuration, or change MCP public behaviour. This change only makes the evidence selector match the stated source boundary.

## Current state

The MCP context already identifies `src/tools/**` files, but `TOOL-1` derives result candidates from an all-source `resultFiles` collection instead.

## Steps

- [x] Derive `TOOL-1` result candidates from the existing tool-file collection.
- [x] Remove the obsolete all-source result-file context if it has no remaining consumer.
- [x] Retain the handler-without-schema regression and add helper- and `main/`-source regression cases.
- [x] Regenerate the rubric publication and run the focused Harness tests and fleet MCP audits.

## Files touched

- `skills/repo-structure/ki-repo-mcp/scripts/rubric/items/tools.ts` — select tool-local result candidates.
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/contexts/mcp.ts` — remove obsolete context state if unused.
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/contexts/mcp.test.ts` — protect the source-boundary contract.
- generated rubric publication and this roadmap record.

## Verify

- The focused MCP rubric tests cover tool, helper, and `main/` result-shaping cases.
- `ki repo audit --skill ki-repo-mcp --repo <each MCP>` clears the five false-positive `TOOL-1` findings while retaining a tool handler without `outputSchema` as a failure.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record is needed; the change aligns existing checker behaviour with the published source boundary.

### Specifications

No behaviour-level specification change is expected.

### Guides

Update MCP contributor guidance only if it presently describes the broader, incorrect evidence scope.

### Roadmap

Re-assess the six MCP ownership records after the corrected fleet audit; retain only genuine local work.

## Review

### Delivered

`TOOL-1` now derives result-envelope evidence only from the existing `src/tools/**` collection. The obsolete all-source context is removed, and the focused regression suite proves that `utils/` and `main/` values do not trigger tool-handler schema warnings.

### Summary of changes

The correction aligns the checker with the MCP source-boundary contract without weakening handler-local `outputSchema` enforcement.

### Verification

Focused MCP rubric tests pass (7 tests); Biome and TypeScript pass; the published rubric was regenerated. Fleet re-audits pass cleanly for Git Audit, GSuite, KBFS, Notion Mirror, and M365. Claude Housekeeping now exposes only its genuine `src/tools/claude-desktop/index.ts` schema warning.

### Outstanding concerns

The Harness skill audit retains its unrelated overdue source-refresh warning. Claude Housekeeping still needs its local schema work; GSuite and M365 may later choose architecture cleanups for response shaping in `main/`.

### Post-change review

The result pairing remains strict for tool handlers. The new tests prevent regressions toward all-source scanning.

### Mini recap

Five false-positive MCP warnings were removed at the shared evidence boundary; one genuine local warning remains.

## Done

Accepted on 2026-08-19 after the focused Harness verification and fleet MCP audits recorded above.

## Discussion

The checker must continue to catch a tool handler that constructs an MCP result without an `outputSchema`; it must not make ordinary helper or implementation code impossible to satisfy.
