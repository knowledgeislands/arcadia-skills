---
id: KI-HARNESS-GOV-049
title: Fix WEB-6 level declaration
area: GOV
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: 5f4263aeae7d66064f745273084375ee018bad3f
transferred_from: TRD-8b69fe1b
---

## Goal

Keep whole-repository audits running when `ki-repo-website-content` reports a flat Eleventy configuration as the intended WEB-6 warning.

## Context

The 5G Emerge testbed website reported that WEB-6 aborts `ki repo audit` with an undeclared-level error. The rubric item is declared mechanically at `FAIL`, but its flat-configuration branch returns `level: 'WARN'` without listing `WARN` in `overrideLevels`. The host correctly rejects that undeclared outcome before other repository skills can finish auditing.

This record directly retains the defect and reproduction previously carried by `TRD-8b69fe1b`, whose source reference was `DBR-GOV-003`. The trade projection can be retired once this receiver-owned record is committed.

## Boundary

Preserve the existing policy: a missing Eleventy configuration remains a failure, while a physical root-level configuration remains a warning because the standard requires the `site/` workspace. Do not change unrelated website criteria, the shared rubric host's undeclared-level guard, or the originating website repository.

## Current state

`WEB_6` in `skills/repo-structure/ki-repo-website-content/scripts/rubric/items/web.ts` declares `FAIL` and returns `WARN` for the flat configuration branch. Existing focused coverage asserts only that a symlinked marker returns a violation and does not execute the physical flat-file warning through the catalogue contract.

## Steps

- [x] Add `WARN` as an explicit WEB-6 override level without weakening its default failure level.
- [x] Add a physical flat-configuration fixture proving the item emits a declared warning and the aggregate audit continues.
- [x] Regenerate or verify the published rubric if the catalogue metadata changes its generated surface.
- [x] Re-run the originating flat Eleventy configuration scenario or an equivalent isolated fixture.

## Files touched

- `skills/repo-structure/ki-repo-website-content/scripts/rubric/items/web.ts`
- `skills/repo-structure/ki-repo-website-content/scripts/rubric/contexts/website.test.ts`
- Generated `ki-repo-website-content` rubric publication if its exact output changes
- `docs/roadmap/KI-HARNESS-GOV-049-fix-web-6-level-declaration.md`

## Verify

- Run the focused `ki-repo-website-content` rubric tests.
- `ki dev skill rubric ki-repo-website-content --write`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- `bunx biome check`
- Confirm a repository with a physical root `eleventy.config.ts` completes its whole-repository audit and reports WEB-6 as WARN.

## Dependencies / blocks

There are no local blockers. The defect is reproducible from current source and the intended WARN policy is already documented by the rubric description.

## Documentation impact

### Decision Records

No Decision Record is required because the work repairs declared rubric metadata without changing the existing website policy.

### Specifications

No behaviour-level specification changes are required; the standard already distinguishes the flat configuration warning from the missing configuration failure.

### Guides

No guide change is expected because this is an audit-host compatibility repair rather than a user workflow change.

### Roadmap

Retain this record through review. No follow-on item is currently required.

## Review

### Delivered

Delivered the WEB-6 level declaration repair from baseline `5f4263aeae7d66064f745273084375ee018bad3f` in implementation commit `6507ba871a60358a8196fead4ed19ddccc051022`.

### Summary of changes

Declared `WARN` as WEB-6’s allowed override while retaining `FAIL` as the default, and added a physical root-level Eleventy fixture that proves the emitted warning belongs to the catalogue contract. The generated readable rubric remained byte-stable because the human-facing criterion text was already correct.

### Verification

The focused website-context suite passes six tests, including the new flat configuration path. The batch-wide `bun run test` gate passes 531 tests; `bunx tsc --noEmit`, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-work-roadmap --repo .`, and `ki repo audit --skill ki-authoring --repo .` pass.

### Outstanding concerns

None. Missing configuration remains a failure, flat physical configuration remains a warning, and the host’s undeclared-level guard remains strict.

### Post-change review

The repair is narrowly scoped, regression-covered, and preserves existing website policy. It is ready for consolidated acceptance.

### Mini recap

WEB-6 can now report its intended flat-layout warning without aborting the repository-wide audit.

## Done

Accepted through KI-HARNESS-BATCH-004 under its current outcome authority and exact consolidated-acceptance scope after the review packet and current repository evidence passed.

## Discussion

### Failure mechanism

The host's undeclared-level rejection is a safety feature and should remain strict. The repair belongs on WEB-6's catalogue declaration, where `overrideLevels: ['WARN']` makes the already-intended alternate outcome explicit and mechanically reviewable.

### Originating evidence

The report came from `5g-emerge/5g-emerge-testbed-landing-site`, where a root-level Eleventy configuration caused the full audit to abort even though nine other declared skills passed individually. The receiver-owned record preserves that evidence so neither repository needs a continuing trade projection.
