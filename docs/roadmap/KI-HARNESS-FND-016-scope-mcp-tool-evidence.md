---
id: KI-HARNESS-FND-016
area: FND
title: Scope MCP tool evidence
theme: foundation-tooling
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
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

- [ ] Derive `TOOL-1` result candidates from the existing tool-file collection.
- [ ] Remove the obsolete all-source result-file context if it has no remaining consumer.
- [ ] Retain the handler-without-schema regression and add helper- and `main/`-source regression cases.
- [ ] Regenerate the rubric publication and run the focused Harness tests and fleet MCP audits.

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

## Discussion

The checker must continue to catch a tool handler that constructs an MCP result without an `outputSchema`; it must not make ordinary helper or implementation code impossible to satisfy.
