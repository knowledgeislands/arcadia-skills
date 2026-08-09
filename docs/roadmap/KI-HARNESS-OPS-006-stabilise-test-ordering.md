---
id: KI-HARNESS-OPS-006
title: Stabilise test ordering
theme: operations
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: f96ca978b0dea5a7b1cf12ffaa83e72b22e1e0ff
---

## Goal

Make authoring frontmatter evidence deterministic across filesystem directory orders.

## Context

`KI-HARNESS-OPS-005` established that Harness CI consistently fails only because `markdownFiles()` preserves `readdirSync()` order while its test asserts one particular order. The same checkout passes locally when its filesystem happens to enumerate entries in that expected order.

## Boundary

Do not weaken frontmatter coverage or make CI order-dependent. Keep any repair within the authoring session evidence and its focused test; do not change CI workflow configuration.

## Current state

`markdownFiles()` recurses through the raw `readdirSync()` entries and returns its accumulated relative paths unchanged. The frontmatter evidence therefore depends on filesystem enumeration order, and the focused trade-record fixture asserts that incidental order.

## Delivery design

Sort the final relative-path collection with JavaScript's default code-unit ordering at the `markdownFiles()` evidence boundary. This preserves the complete Markdown scope and recursive traversal rules while making the public evidence sequence independent of directory enumeration and locale.

Retain the existing trade-record fixture, but assert its canonical sorted sequence — `+/_TRADES/README.md`, then the inbound record, then the outbound record — even though the fixture creates the paths in a different traversal order. The test therefore covers both ordinary Markdown scope and the ordering contract without mocking the filesystem or changing CI configuration.

## Steps

- [ ] Sort the final `markdownFiles()` result by default code-unit ordering after recursive collection, preserving every existing inclusion, exclusion, regular-file, and symlink rule.
- [ ] Update the focused trade-record fixture to assert the canonical path order rather than the filesystem traversal order, including the README and both inbound and outbound records.
- [ ] Run the focused Authoring rubric test, `bun run test`, `bunx tsc --noEmit`, and the Authoring and roadmap audits; inspect the changed evidence scope and test assertion.
- [ ] Commit the local repair and prepare its review packet. Treat a subsequent GitHub Actions run as remote verification, not as evidence available at local completion.

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
