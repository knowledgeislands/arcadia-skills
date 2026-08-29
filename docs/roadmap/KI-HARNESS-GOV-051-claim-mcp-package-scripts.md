---
id: KI-HARNESS-GOV-051
title: Claim MCP package scripts
area: GOV
theme: governance-consistency
horizon: next
status: done
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

- [x] Add the five exact identities to the `ki-repo-mcp` catalogue.
- [x] Extend only the local shared catalogue type needed to publish those claims.
- [x] Add a focused catalogue assertion and verify the `mcp-git-audit` engineering audit consumes the claims.
- [x] Return the passing receiver evidence to `MCP-GIT-TOOL-005` without editing that repository in this record.

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

## Review

### Delivered

Against immutable Harness baseline `8ff3b56cfe4882fd4696233107816f719456a455`, published the five exact package-script identities already governed by `ki-repo-mcp`.

### Summary of changes

The MCP catalogue now claims client generation, three server lifecycle commands, and the smoke test. Its local shared type accepts the metadata and its catalogue test pins the exact ordered identities.

### Verification

The focused MCP catalogue suite passes with 3 tests and 78 expectations; TypeScript passes. A read-only engineering audit of the stopped `mcp-git-audit` SDK-v2 worktree no longer reports any unclaimed scripts, leaving only that repository's local coverage-directory remedial.

### Outstanding concerns

No Harness concern remains. The receiver-local coverage path is explicitly outside this record and remains visible in `MCP-GIT-TOOL-005`.

### Post-change review

The fix remains at the accepted ownership boundary: the owning skill declares exact identities, the host aggregates them, and the receiver consumes them without exclusions or namespace inference.

### Mini recap

The MCP script-claim blocker is removed and the receiver pilot can resume for its final local gate.

## Done

Accepted at `2026-08-29T23:58:04Z` through closure authority bound to `KI-HARNESS-BATCH-008`. Delivery commit `81668ed8` contains the complete review packet and exact owner-side metadata. Focused tests, TypeScript, receiver proof, skill audit, roadmap audit, and authoring audit were clean before closure. No receiver repository write, push, release, or broader MCP policy change occurred.

## Discussion

### Exact ownership

These identities are claimed because `ki-repo-mcp` defines their semantics, not because they share `ki:` prefixes. The catalogue remains the authority consumed by the host.
