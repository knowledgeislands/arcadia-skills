---
id: KI-HARNESS-GOV-006
title: Reanchor MCP standard
area: GOV
theme: governance-consistency
horizon: next
status: done
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
- [x] Reanchor the portable `ki-repo-mcp` standard and source list.
- [x] Add a dedicated protocol-profile rubric family covering valid v1, valid v2, missing modern result discriminators, legacy-only v2 claims, mixed dependency families, and unknown majors.
- [x] Republish the generated rubric and prove the profile against the accepted pilot and at least one legacy sibling.
- [x] Capture one receiver-owned migration record in each of the five remaining v1 sibling repositories without implementing those migrations here.

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

## Review

### Delivered

The approved package-derived legacy and modern MCP profiles are implemented from baseline `6bf45f2b30fdcde36f4f65ee8b698955a7aa2bbd`. The Harness standard, source memory, executable rubric, fixtures, generated publication, read-only fleet proof, and five receiver-owned migration captures are complete. No sibling migration, release, publication, or push was performed.

### Summary of changes

Added the `PROTO-1` rubric family and focused MCP source evidence, reanchored sections 12–14 of the MCP standard and current sources, regenerated `references/rubric.md`, and updated the global remediation inventory. The receiver repositories independently committed `MCP-CH-FND-004`, `MCP-GSUITE-FND-003`, `MCP-M365-FND-002`, `MCP-KBFS-FND-002`, and `MCP-NOTION-TOOL-006` as Soon drafts.

### Verification

Focused protocol and publication suites passed with 16 tests. The modern `mcp-git-audit` pilot and all five legacy siblings passed the profile audit; `mcp-m365` retained one unrelated pre-existing `CFG-1` warning. The Harness full suite passed, `bunx tsc --noEmit` passed, and the `ki-work-roadmap`, `ki-authoring`, `ki-skills`, `ki-binding-claude`, and `ki-engineering` audits passed.

### Outstanding concerns

None within the approved profile-reanchor boundary. Each receiver migration remains deliberately unimplemented and separately prioritised. The existing `mcp-m365` configuration warning was not caused by this change and is not represented as profile failure.

### Post-change review

The dependency-derived applicability rule keeps the five v1 servers conformant while making modern requirements enforceable on the accepted v2 pilot. Fixtures cover valid v1, valid v2, missing discriminators, mixed families, unknown majors, and a legacy-only modern claim. The item is ready for acceptance.

### Mini recap

The rollout now has one enforceable portable profile contract and five receiver-owned migration queues. No additional learning route is proposed; the durable profile and migration boundary are already recorded in the owning standard, source list, rubric, and roadmap records.

## Done

Accepted on 2026-09-02 under the approval-bound consolidated closure in `KI-HARNESS-BATCH-009`. The current review packet and evidence commit `d3ceb2068f0b3110747df8c90fa534ab3486eba5` were rechecked before closure.

## Discussion

### Pilot evidence

The accepted pilot is the evidence boundary for both the profile selection and the rubric fixtures. Fleet migrations must not be inferred from that acceptance.

### Receiver records

Receiver-owned Soon drafts were committed independently as `MCP-CH-FND-004` (`0ba72a2`), `MCP-GSUITE-FND-003` (`e3336af`), `MCP-M365-FND-002` (`c763a52`), `MCP-KBFS-FND-002` (`620a213`), and `MCP-NOTION-TOOL-006` (`1b334ab`). Each receiver retains priority, implementation, acceptance, release, and publication authority.
