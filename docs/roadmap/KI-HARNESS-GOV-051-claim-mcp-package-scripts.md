---
id: KI-HARNESS-GOV-051
title: Claim MCP package scripts
area: GOV
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 8ff3b56cfe4882fd4696233107816f719456a455
---

## Goal

Publish the exact `ki-repo-mcp` package-script claims needed by the delivered owner-driven package-script contract.

## Context

The first SDK-v2 pilot audit in `mcp-git-audit` proved `KI-HARNESS-GOV-007` correctly rejects five retained MCP scripts because `ki-repo-mcp` has not yet published its existing governed surface. The scripts are already described and checked by the MCP repository contract; the missing catalogue metadata is Harness-owned adoption work, not a reason for a repository exclusion or prefix inference.

## Boundary

Claim only `ki:generate:client`, `ki:server:mcp:dev`, `ki:server:mcp:inspect`, `ki:server:mcp:start`, and `ki:test:smoke`. Do not change their commands, MCP protocol policy, receiver repository manifests, or engineering exclusion semantics. Any further unclaimed script becomes separate owner work.

## Current state

The exact claims are absent from the `ki-repo-mcp` catalogue. The receiver audit fails only those five missing claims plus one receiver-local coverage-path issue, so the owner-side change is fully bounded and dependency-ready.

## Steps

- [ ] Add the five exact identities to the `ki-repo-mcp` catalogue.
- [ ] Extend only the local shared catalogue type needed to publish those claims.
- [ ] Add a focused catalogue assertion and verify the `mcp-git-audit` engineering audit consumes the claims.
- [ ] Return the passing receiver evidence to `MCP-GIT-TOOL-005` without editing that repository in this record.

## Files touched

- `skills/repo-structure/ki-repo-mcp/scripts/rubric/items/index.ts`
- `skills/repo-structure/ki-repo-mcp/scripts/rubric/items/index.test.ts`
- `skills/repo-structure/ki-repo-mcp/scripts/shared/rubric.ts`
- This work record and batch authorization ledger

## Verify

- Focused `ki-repo-mcp` catalogue tests
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- Read-only `ki repo audit --skill ki-engineering --repo <mcp-git-audit worktree>`
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

The host aggregation and consuming contract are accepted at `KI-TOOL-CLI-057` and `KI-HARNESS-GOV-007`. The failed pilot audit supplies exact receiver evidence. No dependency or owner decision remains.

## Documentation impact

### Decision Records

No Decision Record required; this is direct adoption of the accepted package-script ownership decision.

### Specifications

No product behavior changes.

### Guides

No guide change; the owning MCP standard already defines these commands.

### Roadmap

This record owns the Harness-side remedial blocking `MCP-GIT-TOOL-005`. The receiver retains implementation and acceptance authority.

## Discussion

### Exact ownership

These identities are claimed because `ki-repo-mcp` defines their semantics, not because they share `ki:` prefixes. The catalogue remains the authority consumed by the host.
