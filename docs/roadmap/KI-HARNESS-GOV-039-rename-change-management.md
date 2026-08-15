---
id: KI-HARNESS-GOV-039
area: GOV
title: Rename to ki-work
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Rename the portable `ki-change-management` parent skill to `ki-work` so its name is concise, natural, and accurately describes its role as the shared work-adapter and lifecycle contract.

## Context

The effectiveness review in [`KI-HARNESS-REV-001`](../reviews/KI-HARNESS-REV-001/README.md) tightened the boundary between the portable adapter-selection parent and the process skills `ki-next`, `ki-plan`, `ki-batch`, `ki-implement`, and `ki-accept`. With that boundary established, `ki-work` is clearer and less cumbersome than `ki-change-management`; the abbreviation `ki-cm` would save characters at the cost of meaning.

This is a breaking canonical-identity migration. The current-state migration policy prohibits aliases, compatibility shims, dual names, or an indefinite transition period.

## Boundary

Rename the parent capability to exactly `ki-work`. Do not rename the process skills or silently assume that every adapter child should receive the same shorter prefix. Any child-skill rename requires an explicit naming and migration decision during planning.

Do not mutate installed runtime projections or external repositories directly. Route consumer changes through their owning repository or an approved handoff.

## Current state

The canonical parent is `ki-change-management`. Its identity appears in its directory and frontmatter, repository configuration, dependency declarations, standards, rubrics, tests, evaluations, documentation, generated publications, and host or external-consumer references. No `ki-work` compatibility surface exists.

A 2026-08-13 estate scan finds broad local and external impact rather than one bounded rename: ninety-nine non-review Harness source files, the generated `ki-plugins` projection, and owner-controlled references in KI Website, `tools-ki`, kit-legal, and Techne Principal, plus repository declarations across the wider governed estate. The record remains Draft until the parent-only versus whole-adapter-family decision is explicit and each external owner has a valid migration route.

## Steps

- [ ] Turn the fresh reference scan into an exact path-classified inventory: canonical Harness source, generated projection, installed runtime projection, host integration, and each owner-controlled external repository.
- [ ] Confirm whether adapter children retain their current names or move as one explicitly named family; do not infer this from the parent rename.
- [ ] Rename the canonical parent directory and `name:` to `ki-work`, then update declarations, dependencies, source links, standards, rubrics, tests, evaluations, and documentation atomically.
- [ ] Remove every obsolete exact parent-name reference without adding an alias, fallback, redirect, or compatibility shim.
- [ ] Route required `tools-ki` and other repository migrations through coded owner-visible handoffs.
- [ ] Regenerate publications and verify selection, dependency resolution, audits, tests, and type checking under the new identity.

## Files touched

- `skills/change-management/ki-change-management/` and its replacement path
- `.ki-config.toml`
- Exact parent-identity consumers across `skills/`, `evals/`, `docs/`, and repository orientation
- Generated rubric publications affected by dependency or identity changes
- Coded handoff records for external owners where required
- This work item and `docs/roadmap/_ISSUES.md`

## Verify

- No exact canonical reference to `ki-change-management` remains except historical review or decision evidence that must preserve the name used at that time.
- The new `ki-work` skill resolves through repository configuration, retains the reviewed adapter and lifecycle boundary, and has no alias or dual activation path.
- Dependency and collision checks report no unknown target, duplicate identity, or cycle.
- Focused skill tests and generated rubric checks pass.
- `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-work --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.
- Every external consumer discovered by the inventory has either migrated under its owner or has a coded, observable handoff.

## Dependencies / blocks

The completed effectiveness evidence under `docs/reviews/KI-HARNESS-REV-001/` is the naming and boundary baseline. Planning is blocked on the child-family naming decision and valid owner-visible routes for every external consumer; generated projections are regenerated from source rather than edited directly.

## Documentation impact

### Decision Records

A naming decision is required before any child-family migration; this draft records the unresolved decision rather than creating an alias policy.

### Specifications

No behaviour-level product contract changes are planned.

### Guides

Canonical skill-selection and command guidance must move with an approved clean-cut rename; no transition guidance is introduced now.

### Roadmap

The child-family naming decision and receiver-owned consumer migrations remain explicit dependencies before implementation.

## Discussion

### Naming decision

`ki-work` is preferred over `ki-cm`: it is shorter than the current name without requiring users to decode an abbreviation. The parent remains a governance capability for adapter selection and shared lifecycle vocabulary; it does not absorb prioritisation, planning, implementation, acceptance, or cross-repository trade execution.

### Historical evidence

The completed review records keep the old name because they describe the audited baseline. They should link to this migration where helpful, but must not be rewritten as though the reviewed capability had always been named `ki-work`.
