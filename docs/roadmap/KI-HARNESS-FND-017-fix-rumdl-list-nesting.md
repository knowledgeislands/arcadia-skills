---
id: KI-HARNESS-FND-017
area: FND
title: Fix rumdl structural guards
theme: foundation-tooling
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 8099a5ec038d567d669b27c9e640e6e46281cc58
---

## Goal

Keep the canonical authoring template from rejecting valid Markdown that rumdl cannot safely diagnose or repair.

## Context

The 2026-08-12 authoring refresh enabled rumdl `MD005` and `MD075`, even though its source record says both remain unsafe. Applying the canonical template to Kit Principal proves each discrepancy: valid three-space nested blockquotes containing ordered lists fail `MD005`, while pipe-formatted rows following a blockquote fail `MD075`. De-indenting the first or rewriting the second would corrupt established Markdown structure.

## Boundary

Do not alter consumer documents to accommodate a false positive, add a repository-specific exception, or weaken unrelated authoring rules. Resolve only the documented `MD005` and `MD075` canonical-template and evidence mismatches, with regression fixtures for both valid structures.

## Current state

`RUMDL_DEFAULT` omits `MD005` and `MD075` from `disable`, and its test asserts those omissions. The authoring source list simultaneously records both reproductions as unresolved. Consumer repositories retaining the previous documented guards therefore report owned-file drift.

## Steps

- [x] Reproduce the valid nested list-and-blockquote and post-blockquote pipe-row fixtures with the pinned rumdl version and record their current diagnostic and fix behaviour.
- [x] Restore the documented safe `MD005` and `MD075` treatment in the canonical template, or adopt an upstream-supported alternative only if the reproductions prove the false positives are fixed.
- [x] Add focused fixtures that protect both structures from false diagnostics and destructive conform output.
- [x] Refresh the authoring source evidence and generated rubric publication, then audit the Harness and one affected consumer repository.

## Files touched

- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` — canonical rumdl template.
- `skills/governance/ki-authoring/scripts/rubric/items/index.test.ts` and a focused fixture — regression contract.
- `skills/governance/ki-authoring/references/sources.md` — current reproduction evidence.
- `.rumdl.toml` — the Harness's adopted canonical template.
- generated authoring rubric publication and this work record.

## Verify

- The focused fixtures pass under the pinned rumdl version without changing either valid Markdown structure.
- `ki repo audit --skill ki-authoring` passes in the Harness and Kit Principal after conforming the latter.
- The Harness typecheck, formatter, and test gates pass.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record is expected; this restores a documented safe formatter boundary.

### Specifications

No public behaviour specification changes.

### Guides

No guide change is expected unless the supported nesting guidance changes.

### Roadmap

This item supersedes the local Kit Principal template-drift warning once verified.

## Review

### Delivered

The canonical rumdl template again disables `MD005` and `MD075`, with direct pinned-version fixtures proving it preserves valid nested blockquotes and post-blockquote pipe rows.

### Summary of changes

Updated the authoring template, its regression contract, and source evidence; conformed the Harness and Kit Principal to the repaired template. The widened scope covers the two documented unsafe rules from the same 2026-08-12 template change.

### Verification

Focused authoring tests pass (12 tests). TypeScript, focused Biome, `ki dev skill rubric ki-authoring --write`, the Harness authoring and roadmap audits, and Kit Principal authoring conform plus audit all pass.

### Outstanding concerns

The full Harness suite still fails its pre-existing remediation-inventory assertion. `git blame` attributes the failing assertion to `5fa55b52`, and comparison with this item's immutable baseline shows neither that test nor its source changed during this work.

### Post-change review

The canonical template now matches its tracked source evidence and is proven against both affected consumer structures. The repair is limited to rules known to misdiagnose or rewrite valid Markdown; unrelated rumdl rules remain unchanged.

### Mini recap

Restored the two safe rumdl guards, removed Kit Principal's authoring warning, and retained reproducible regression coverage. The unrelated Harness suite failure needs separate disposition.

## Discussion

The canonical template and its tracked source evidence must agree. A formatter rule is not safe to enable merely because its configuration is accepted; the check and fix behaviour must preserve valid authored structure.
