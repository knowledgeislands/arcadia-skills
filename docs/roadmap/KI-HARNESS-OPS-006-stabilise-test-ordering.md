---
id: KI-HARNESS-OPS-006
title: Stabilise test ordering
theme: operations
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make authoring frontmatter evidence deterministic across filesystem directory orders.

## Context

`KI-HARNESS-OPS-005` established that Harness CI consistently fails only because `markdownFiles()` preserves `readdirSync()` order while its test asserts one particular order. The same checkout passes locally when its filesystem happens to enumerate entries in that expected order.

## Boundary

Do not weaken frontmatter coverage or make CI order-dependent. Keep any repair within the authoring session evidence and its focused test; do not change CI workflow configuration.

## Current state

The implementation recurses through Markdown files without sorting the returned paths. The test checks the collected path sequence, so different valid filesystem enumeration orders produce different results.

## Proposed plan

- Sort the collected Markdown paths at the deterministic session-evidence boundary, then retain the existing complete expected list.
- Add a focused fixture or assertion showing that traversal order cannot alter the evidence order.
- Run the authoring focused test, `bun run test`, TypeScript, and the applicable audits; do not change the GitHub workflow.

## Steps

- [ ] Shape the deterministic evidence repair and confirm it does not alter the Markdown scope.
- [ ] Implement, verify locally, and prepare a review packet; wait for a later GitHub Actions run before treating remote CI as verified.

## Files touched

- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts`
- `skills/governance/ki-authoring/scripts/rubric/items/index.test.ts`
- This roadmap item

## Verify

- The focused authoring test proves a stable path order regardless of directory enumeration.
- `bun run test` and `bunx tsc --noEmit` pass locally.
- A later GitHub Actions run on the committed repair passes the Test step.

## Dependencies / blocks

This is the Harness-owned follow-up from `KI-HARNESS-OPS-005`; it is independent of workflow configuration and external services.

## Discussion

### Source

Diagnosed by `KI-HARNESS-OPS-005` from run `31301952513`.
