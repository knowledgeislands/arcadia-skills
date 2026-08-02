---
id: KI-HARNESS-GOV-008
title: Require plain-language roadmap goals
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: df6d6bf413641ba2be4e438175edd41e709cdd44
---

## Goal

Make every roadmap item immediately understandable by stating the intended user or system outcome before its technical detail.

## Context

Roadmap items currently start with Context, which often combines their outcome with implementation rationale. That makes a technically dense item hard to scan or prioritise without reading its full detail.

## Boundary

Make the Goal section mandatory in the portable `ki-roadmap` contract and migrate this harness. Do not rewrite sibling repositories in this change; each repository adopts the new required shape in its own rollout.

## Current state

The work-item format and its mechanical checker require Context as the first section, and existing harness items have no separate plain-language outcome.

## Steps

- [x] Define Goal as the first required body section and distinguish it from Context.
- [x] Require a non-empty Goal mechanically and add a plain-language review prompt.
- [x] Backfill every current harness work item with a concise Goal.
- [x] Regenerate the rubric and verify the standard, checker, fixtures, and migrated items.

## Files touched

- `skills/governance/ki-roadmap/`
- `docs/roadmap/`

## Verify

- `bun test skills/governance/ki-roadmap/scripts/rubric/items/index.test.ts`
- `ki dev skill rubric ki-roadmap --write`
- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-skills --repo .`

## Dependencies / blocks

No dependencies.

## Acceptance

### Delivered

Every KI repository roadmap item now requires a non-empty, first-position `## Goal` section. The harness's canonical items have been migrated with concise, plain-language outcomes.

### Summary of changes

`ki-roadmap` now distinguishes Goal from technical Context in its format standard, mechanical checker, and judgment rubric. The harness applies the current contract immediately; sibling repositories migrate their own items when they adopt the updated standard.

### Verification

- `bun test skills/governance/ki-roadmap/scripts/rubric/items/index.test.ts` — passed.
- `bunx tsc --noEmit` — passed.
- `bun run test` — passed: 238 tests, 0 failures.
- `ki dev skill rubric ki-roadmap --write` — published the generated rubric.
- `ki repo audit --skill ki-roadmap --repo .` — passed.
- `ki repo audit --skill ki-skills --repo .` — passed.
- `ki repo audit --skill ki-authoring --repo .` — passed.

### Outstanding concerns

Sibling repositories with canonical roadmap items need their own adoption migration. Their work items are deliberately not changed by this harness-owned standard update.

### Mini recap

The new Goal requirement turns the intended outcome into an immediately visible part of every roadmap record while retaining Context for the technical reasoning needed to shape and deliver it.

## Done

Accepted by the repository owner on 2026-08-02. Retain this record as the evidence of the portable Goal requirement and the harness migration.

## Discussion

### Rollout

This is a current-contract migration. The harness becomes conformant now; repositories that declare `ki-roadmap` migrate their own canonical items when they next adopt the updated standard.
