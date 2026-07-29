---
id: KI-HARNESS-GOV-006
title: Re-anchor the MCP standard to specification 2026-07-28
theme: governance-consistency
horizon: waiting-for
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

MCP specification revision 2026-07-28 was published on 2026-07-28 and the live specification index now names it as the latest release. The `ki-mcp` standard is anchored to 2025-11-25, so sections 12 and 13 and the annotation semantics in section 4 describe a superseded revision.

Two changes reach into house rules rather than the transport. Every result now carries a required `resultType`, which is the envelope shape the `jsonResult` and `errorResult` helpers produce in each server's `utils/`. A new `server/discover` RPC is a per-server MUST, advertising supported protocol versions, capabilities, and identity. The remainder is absorbed by the SDK: a stateless core with the initialize handshake removed, protocol sessions and `Mcp-Session-Id` removed, Multi Round-Trip Requests replacing server-initiated sampling and elicitation, tasks moved to an official extension, SSE resumability removed, an `extensions` capability field, and cacheable list results.

The work is blocked on the TypeScript SDK, not on scheduling. `@modelcontextprotocol/sdk` reports `LATEST_PROTOCOL_VERSION = '2025-11-25'` in both 1.29.0 and 1.30.0, and the string `2026-07-28` appears nowhere in its published `types.js`. Version 1.30.0 was published on 2026-07-27, one day before the specification, so it predates the revision it would need to implement. No prerelease implements it. Every `mcp-*` server therefore already targets the newest revision its SDK supports, and re-anchoring the standard before the SDK ships would make the audit assert conformance no server could reach.

The named condition for revisiting is that `LATEST_PROTOCOL_VERSION` in the published SDK changes. That constant, not the specification's publication date, is the gate.

## Boundary

This item covers re-anchoring the `ki-mcp` standard and its rubric to the released revision, and updating the source list. It does not implement the resulting conformance changes in the six `mcp-*` servers; those become separate work in each repository once the standard states the target. It does not adopt the specification's remote-transport features for servers that remain local stdio.

## Discussion

### Why this is not simply overdue

The 2026-07-04 review staged this re-anchor as a watch-item expecting the release, and the release landed on target. The reason it did not proceed is specific and verifiable rather than a matter of priority: the reference implementation has not caught up with the text. Recording the SDK constant as the trigger keeps a future review from re-deriving that judgement, and makes the check two commands rather than an assessment.

### Where the trigger lives

The condition is currently recorded as a watch-item in the `ki-mcp` source list, which is the skill's memory of where its standard comes from. That remains the right place for the provenance. This item exists because the follow-on is unfinished work needing execution rather than recall, and a source list is not a delivery queue.

### Scope of the eventual repository work

The `resultType` requirement touches a shared helper that each server implements separately, so the change is small per repository but uniform across six. `server/discover` is genuinely new surface. Whether both arrive together, and whether the standard should describe them as required only for servers negotiating the new revision, is the first decision when this unblocks.
