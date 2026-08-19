---
id: KI-HARNESS-FND-017
area: FND
title: Fix rumdl list nesting
theme: foundation-tooling
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 8099a5ec038d567d669b27c9e640e6e46281cc58
---

## Goal

Keep the canonical authoring template from rejecting valid blockquotes nested within list items.

## Context

The 2026-08-12 authoring refresh enabled rumdl `MD005`, even though its source record says rumdl 0.2.54 still mishandles this nesting. Applying the canonical template to Kit Principal proves the discrepancy: valid three-space nested blockquotes containing ordered lists fail `MD005`, while de-indenting them would corrupt their Markdown structure.

## Boundary

Do not alter consumer documents to accommodate a false positive, add a repository-specific exception, or weaken unrelated authoring rules. Resolve only the canonical-template and evidence mismatch, with a regression fixture for the valid nesting.

## Current state

`RUMDL_DEFAULT` omits `MD005` from `disable`, and its test asserts that omission. The authoring source list simultaneously records the nested-list reproduction as unresolved. Consumer repositories retaining the previous documented guard therefore report owned-file drift.

## Steps

- [ ] Reproduce the valid nested list-and-blockquote fixture with the pinned rumdl version and record its current diagnostic and fix behaviour.
- [ ] Restore the documented safe `MD005` treatment in the canonical template, or adopt an upstream-supported alternative only if the reproduction proves the false positive is fixed.
- [ ] Add a focused fixture that protects valid nesting from both false diagnostics and destructive conform output.
- [ ] Refresh the authoring source evidence and generated rubric publication, then audit the Harness and one affected consumer repository.

## Files touched

- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` — canonical rumdl template.
- `skills/governance/ki-authoring/scripts/rubric/items/index.test.ts` and a focused fixture — regression contract.
- `skills/governance/ki-authoring/references/sources.md` — current reproduction evidence.
- generated authoring rubric publication and this work record.

## Verify

- The focused fixture passes under the pinned rumdl version without changing valid nested Markdown.
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

## Discussion

The canonical template and its tracked source evidence must agree. A formatter rule is not safe to enable merely because its configuration is accepted; the check and fix behaviour must preserve valid authored structure.
