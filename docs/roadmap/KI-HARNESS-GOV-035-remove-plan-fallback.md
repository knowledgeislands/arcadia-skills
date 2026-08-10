---
id: KI-HARNESS-GOV-035
title: Remove plan fallback
area: GOV
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make the Harness plan-provenance contract JSON V1-only, so stale plaintext state cannot silently enter the current plan-sync path.

## Context

The accepted GOV-031 inventory proved that `hooks/plan-stamp.sh` produces JSON V1 and `hooks/plan-sync.sh` consumes it, while the consumer still accepts one legacy plaintext absolute-path form. The current documentation and positive fixtures retain that temporary compatibility branch. Removing it is a local Harness change with established focused gates; it must remain separate from the evidence inventory that identified it.

## Boundary

Do not alter the JSON V1 fields, create a V2 contract, preserve a plaintext alias, or change a peer repository. Do not fold the four incomplete GOV-031 schema maps or GOV-006's external MCP migration into this work.

## Current state

`hooks/plan-sync.sh` accepts validated JSON V1 plus a legacy plaintext path input. `hooks/plan-sync.test.ts` covers both forms, `hooks/README.md` describes the temporary compatibility state, and `docs/specs/harness.md` names the current contract.

## Steps

- [ ] Remove the plaintext compatibility branch from `hooks/plan-sync.sh` while preserving strict JSON V1 validation.
- [ ] Replace positive legacy fixtures with rejection coverage and keep the valid JSON V1 cases.
- [ ] Update the hook and Harness specification documentation to describe the JSON V1-only boundary.
- [ ] Run the focused hook tests, full Harness tests, TypeScript gate, and relevant roadmap and authoring audits.

## Files touched

- `hooks/plan-sync.sh`
- `hooks/plan-sync.test.ts`
- `hooks/README.md`
- `docs/specs/harness.md`
- This roadmap item

## Verify

- `bun hooks/plan-stamp.test.ts && bun hooks/plan-sync.test.ts` passes.
- `bun run test` and `bunx tsc --noEmit` pass.
- A plaintext state record fails closed while valid JSON V1 state continues to synchronise.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

GOV-031 is accepted and provides the evidence boundary. No peer repository or outstanding receiver decision blocks this local cleanup.

## Discussion

### Migration boundary

The intended result removes only an obsolete ingress form. It does not change the current V1 producer, data shape, or plan lifecycle semantics.
