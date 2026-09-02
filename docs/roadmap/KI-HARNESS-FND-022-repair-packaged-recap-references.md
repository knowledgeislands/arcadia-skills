---
id: KI-HARNESS-FND-022
area: FND
title: Repair packaged recap references
theme: foundation-tooling
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: b897954d640e00412cbad81e6da7376e2916ec61
---

## Goal

Make every supported `ki-recap` projection able to reach the knowledge-promotion standard it requires.

## Context

The canonical `ki-recap` source links to `ki-authoring` through the harness's categorised `skills/change-management/` and `skills/governance/` tree. The active user installation at `~/.agents/skills/ki-recap` is a symlink to that canonical source, so resolving the real file preserves the link.

The generated `ki-plugins/knowledge-islands/skills/ki-recap` projection is flat. Its verbatim `../../governance/ki-authoring/` and `../../../governance/ki-authoring/` links resolve to paths that do not exist, preventing a packaged recap consumer from loading the required promotion procedure by following the documented references.

## Boundary

Do not hand-edit generated plugin projections, duplicate the full knowledge-promotion standard into `ki-recap`, or redesign every cross-skill dependency without evidence that the defect is broader. Preserve the separation between recap procedure and `ki-authoring`'s normative ownership.

## Shaping

Select a source-level reference or dependency form that works from the canonical harness, symlinked user activation, and flattened plugin projection. Add projection-focused verification so generation fails when a required Markdown reference becomes unreachable. Confirm whether the repair belongs wholly in harness skill authoring or also requires an approved `ki-plugins` generator change.

Promote to Next when the portable reference contract, affected projection boundary, and focused regression check are identified.

## Current state

The defect is isolated to two checkout-relative links from `ki-recap` into `ki-authoring`. Knowledge Islands already requires cross-skill relationships to use skill names rather than filesystem paths, and the generated plugin contains both skills. The portable repair is therefore to declare `ki-authoring` as a formal dependency, instruct the consumer to load its knowledge-promotion convention set by skill name, and make the plugin builder reject a projection whose declared dependency is absent.

No peer-repository edit is required: the Harness owns both the canonical skill relationship and the plugin generator. Regenerating or publishing `ki-plugins` remains outside this item.

## Steps

- [x] Declare `ki-authoring` as a `ki-recap` dependency and replace both checkout-relative knowledge-promotion links with name-based loading instructions.
- [x] Validate every projected skill's declared composition dependencies against the complete generated skill set before publication.
- [x] Add focused builder coverage for a present dependency and a missing dependency that fails before publication.
- [x] Prove the canonical Harness, symlinked activation, and flattened generated projection all retain a reachable knowledge-promotion route.

## Files touched

- `skills/change-management/ki-recap/SKILL.md`
- `skills/change-management/ki-recap/references/standards-session-recap.md`
- `skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`
- Generated capability publications affected by the dependency declaration
- This work item

## Verify

- Focused `ki-binding-claude` plugin-builder tests
- Generated plugin inspection for `ki-recap` and `ki-authoring`
- Symlink-resolution inspection for the active user `ki-recap`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No external dependency remains. The plugin generator already owns the flattened projection and both required skills are part of its governed source set.

## Documentation impact

### Decision Records

No Decision Record is needed because this applies the existing name-based cross-skill portability contract.

### Specifications

No product behaviour specification changes; this is a packaging-integrity repair.

### Guides

No operator guide changes because publication and activation commands remain unchanged.

### Roadmap

No receiver-owned roadmap item is required unless a later regeneration exposes a separate `ki-plugins` publication defect.

## Review

### Delivered

The recap-to-authoring relationship is portable from baseline `b897954d640e00412cbad81e6da7376e2916ec61`. `ki-recap` declares `ki-authoring` composition, both procedure references use the dependency by skill name, and plugin generation rejects any absent declared dependency before publication. No generated peer repository was changed or published.

### Summary of changes

Updated `ki-recap` and its session procedure, added dependency extraction and validation to the Claude plugin builder, and added focused present/missing dependency coverage plus generated projection assertions. The canonical source and active symlinked user projection now expose the same name-based route.

### Verification

The plugin-builder suite passed with 15 tests, including successful full projection and absent-dependency refusal. The active `~/.agents/skills/ki-recap` symlink resolves to the canonical Harness source with `ki-depends-on: [ki-authoring]` and no checkout-relative authoring link. The Harness full suite, TypeScript gate, and relevant repository audits passed.

### Outstanding concerns

None. Regenerating or publishing `ki-plugins` remains a receiver operation and was outside the approved boundary.

### Post-change review

The repair applies the existing cross-skill portability rule rather than copying normative prose or adding another path convention. The builder now makes the packaging dependency check general for every projected skill. The item is ready for acceptance.

### Mini recap

Formal name-based composition is the stable cross-projection seam; checkout-relative links are not. That learning already lives in the `ki-skills` portability standard and is now enforced at the projection boundary, so no additional learning route is proposed.

## Done

Accepted on 2026-09-02 under the approval-bound consolidated closure in `KI-HARNESS-BATCH-009`. The current review packet and evidence commit `d3ceb2068f0b3110747df8c90fa534ab3486eba5` were rechecked before closure.

## Discussion

### Evidence boundary

The defect is not present in the current symlinked user activation when the link is resolved relative to the canonical file. It is directly reproducible in the flattened `ki-plugins` projection, so the work must distinguish activation styles rather than label every installed copy broken.

### Ownership

The harness owns the canonical skill relationship and portable skill-authoring contract. `ki-plugins` owns generated projection shape and must receive any required downstream change through its normal repository authority rather than an untracked manual repair.

### Candidate approaches

A named formal dependency, a projection-safe source reference, or generator-supported link materialisation may preserve single ownership. Shaping should reject any approach that silently copies normative prose and lets the two skills drift.
