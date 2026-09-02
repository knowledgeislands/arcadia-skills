---
id: KI-HARNESS-GOV-006
title: Reanchor MCP standard
area: GOV
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 6bf45f2b30fdcde36f4f65ee8b698955a7aa2bbd
---

## Goal

Bring the MCP server standard up to the released 2026-07-28 specification through a safe, evidence-backed rollout.

## Context

The current `ki-repo-mcp` standard remains anchored to the 2025-11-25 protocol profile even though its source list records the 2026-07-28 release and the TypeScript v2 package family. The modern profile adds required result discriminators and server discovery while moving several transport details into the supported SDK boundary.

Five sibling servers still use `@modelcontextprotocol/sdk` 1.x. The accepted `MCP-GIT-TOOL-005` pilot moved `mcp-git-audit` to the v2 server and client package families, a per-connection `serveStdio` boundary, SDK-owned modern discovery, complete result envelopes, and deliberate legacy fallback. Its implementation commit `1016e15`, merge `ffd9ec8`, and acceptance `0819f43` prove a dual-era rollout without making unmigrated siblings falsely non-conformant.

## Boundary

This item reanchors the `ki-repo-mcp` standard, sources, and rubric. It does not implement the resulting migrations in the five remaining v1 sibling servers. Each receiving repository retains priority, implementation, and acceptance authority for its own migration.

### Shaping

#### Selected rollout profile

Derive the applicable profile from the runtime dependency rather than adding a claimable `.ki.toml` switch:

- `@modelcontextprotocol/sdk` major 1 selects the legacy 2025-11-25 profile.
- `@modelcontextprotocol/server` major 2 selects the modern 2026-07-28 profile.
- Mixed families, unknown majors, and a claimed modern implementation retaining only the legacy SDK are violations.

A modern server uses the supported per-connection server factory and `serveStdio` boundary. Its synchronous `jsonResult` and `errorResult` helpers return `resultType: "complete"`. Discovery, protocol stamping, and conservative cache defaults remain SDK-owned and are proven live by the repository smoke boundary; the rubric must not demand a local `server/discover` literal or handler.

Legacy servers remain conformant without modern-only checks until their owning repositories accept and deliver migrations. A migrated v2 sibling retains deliberate legacy fallback during the transition, but fallback does not make it part of the legacy profile.

## Current state

The pilot comparison and rollout selection are complete. The remaining Harness work is the standard, source, rubric, and fixture implementation plus receiver-owned capture of five separate migration records. No external dependency remains.

## Steps

- [x] Capture a bounded v2 migration pilot in `mcp-git-audit` as `MCP-GIT-TOOL-005`.
- [x] Compare the pilot's package, result-envelope, discovery, stdio, smoke, and legacy-fallback delta against the v1 implementation.
- [x] Select explicit package-derived protocol-era applicability.
- [ ] Reanchor the portable `ki-repo-mcp` standard and source list.
- [ ] Add a dedicated protocol-profile rubric family covering valid v1, valid v2, missing modern result discriminators, legacy-only v2 claims, mixed dependency families, and unknown majors.
- [ ] Republish the generated rubric and prove the profile against the accepted pilot and at least one legacy sibling.
- [ ] Capture one receiver-owned migration record in each of the five remaining v1 sibling repositories without implementing those migrations here.

## Files touched

- `skills/repo-structure/ki-repo-mcp/references/standards-mcp-servers.md`
- `skills/repo-structure/ki-repo-mcp/references/sources.md`
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/` context, protocol-profile items, fixtures, and tests
- `skills/repo-structure/ki-repo-mcp/references/rubric.md`
- Generated catalogue publications affected by the rubric family
- This work item

## Verify

- Focused context, protocol-profile item, fixture, and publication tests
- `ki dev skill rubric ki-repo-mcp --write`
- `ki repo audit --skill ki-repo-mcp --repo <mcp-git-audit-pilot>`
- `ki repo audit --skill ki-repo-mcp --repo <legacy-v1-sibling>`
- Fleet audit across all six sibling servers without false legacy-profile failures
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

`MCP-GIT-TOOL-005` supplied accepted pilot evidence and settled the dual-era rollout profile. No dependency remains. Receiver migrations remain separately prioritised work and do not block this Harness item.

## Documentation impact

### Decision Records

The existing MCP governance decision remains sufficient; the selected profile applies its evidence-backed migration boundary.

### Specifications

No separate product specification is required.

### Guides

Update migration guidance only where the standard and fixtures leave a practical operator step not already evident.

### Roadmap

Five receiver-owned migration records follow in the remaining v1 sibling repositories.

## Discussion

### Pilot evidence

The accepted pilot is the evidence boundary for both the profile selection and the rubric fixtures. Fleet migrations must not be inferred from that acceptance.
