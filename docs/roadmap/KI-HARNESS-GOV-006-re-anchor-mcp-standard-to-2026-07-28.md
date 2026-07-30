---
id: KI-HARNESS-GOV-006
title: Re-anchor the MCP standard to specification 2026-07-28
theme: governance-consistency
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

MCP specification revision 2026-07-28 was published on 2026-07-28 and the live specification index now names it as the latest release. The `ki-mcp` standard is anchored to 2025-11-25, so sections 12 and 13 and the annotation semantics in section 4 describe a superseded revision.

Two changes reach into house rules rather than the transport. Every result now carries a required `resultType`, which is the envelope shape the `jsonResult` and `errorResult` helpers produce in each server's `utils/`. A new `server/discover` RPC is a per-server MUST, advertising supported protocol versions, capabilities, and identity. The remainder is absorbed by the SDK: a stateless core with the initialize handshake removed, protocol sessions and `Mcp-Session-Id` removed, Multi Round-Trip Requests replacing server-initiated sampling and elicitation, tasks moved to an official extension, SSE resumability removed, an `extensions` capability field, and cacheable list results.

The external SDK condition is now met. The TypeScript SDK published its v2 package family with 2026-07-28 support on 2026-07-27, including a migration path for v1 consumers. All six sibling `mcp-*` repositories still declare `@modelcontextprotocol/sdk` 1.x, so the decision is now whether and how to move the workspace to the v2 package family before the `ki-mcp` standard makes the new protocol requirements universal.

## Boundary

This item covers re-anchoring the `ki-mcp` standard and its rubric to the released revision, and updating the source list. It does not implement the resulting conformance changes in the six `mcp-*` servers; those become separate work in each repository once the standard states the target. It does not adopt the specification's remote-transport features for servers that remain local stdio.

## Shaping

### Intended approach

Compare the v1-to-v2 migration requirements against one representative stdio sibling before changing the portable standard. Decide whether the standard should require dual-era operation, target 2026-07-28 only for new or migrated servers, or retain a 2025-11-25 profile until every sibling accepts a local migration item.

Update the source list to record that SDK support is available while the deployed sibling fleet remains on v1. The standard must describe the selected delivery contract accurately; it must not claim that the SDK is unavailable or make every current sibling fail before it has a migration path.

### Known dependencies

All six sibling repositories declare `@modelcontextprotocol/sdk` 1.x. The TypeScript v2 package family changes imports and stdio serving mechanics, so each repository needs its own bounded migration item once the standard and rollout profile are agreed.

### Decision still needed

Choose the rollout profile and the pilot repository. In particular, decide whether `server/discover` and required `resultType` become universal house requirements only after every sibling migrates, or whether the standard carries explicit protocol-era applicability while the fleet transitions.

### Promotion conditions

Promote when the v2 migration delta has been proven in a named stdio pilot, the standard's protocol-era applicability is exact, each sibling's local follow-up is identified, and the rubric can verify the chosen profile without false failures.

## Current state

The `ki-mcp` source list is already anchored to the released 2026-07-28 specification and TypeScript SDK v2 availability, while all six sibling servers still declare SDK 1.x and implement the older profile.

`mcp-git-audit` is the proposed named stdio pilot because its scope is local and its migration can be evaluated before a fleet-wide standard change.

## Steps

1. Ask the `mcp-git-audit` owner to accept a bounded v2 migration pilot with its own local work item and verification boundary.
2. Compare the pilot's SDK-v2 migration delta, result-envelope change, `server/discover` surface, and stdio entry point against its current v1 implementation.
3. Select and document one rollout profile: retain the older profile until every sibling migrates, or introduce explicit protocol-era applicability that keeps unmigrated servers conformant.
4. Re-anchor the portable `ki-mcp` standard, sources, and rubric only after the pilot proves the selected profile can be checked without false fleet failures.
5. Create one receiving migration item per affected sibling; no sibling implementation is included in this harness item.

## Files touched

- `skills/agentic-systems/ki-mcp/` standard, source, rubric, and catalogue files after pilot evidence
- This work item
- Receiving pilot and sibling migration items in their owning repositories

## Verify

- The accepted pilot's focused SDK-v2, tool-result, discovery, and stdio tests
- `ki repo audit --skill ki-mcp --repo <pilot>`
- Harness `ki-mcp` rubric tests and `ki dev skill rubric ki-mcp --write`
- A fleet audit that demonstrates the selected protocol-era profile does not create false failures.

## Dependencies / blocks

This item cannot become Ready until `mcp-git-audit` accepts the pilot and the owner selects the fleet rollout profile.

## Discussion

### SDK availability changes the decision

The earlier waiting condition was correct for the v1 package but is no longer correct for the SDK family. The remaining issue is a deliberate compatibility and rollout decision: adopting the new revision changes the package family and the stdio server entry point, so a standard-only update would make every existing sibling non-conformant without a verified migration route.

### Where the evidence lives

The `ki-mcp` source list records the released protocol and the published v2 SDK evidence. This roadmap item owns the unfinished selection, standard re-anchor, and migration choreography; a source list remains evidence rather than a delivery queue.

### Scope of the eventual repository work

The `resultType` requirement touches a shared helper that each server implements separately, so the change is small per repository but uniform across six. `server/discover` is genuinely new surface. Whether both arrive together, and whether the standard should describe them as required only for servers negotiating the new revision, is the first decision when this unblocks.
