---
id: 'KI-HARNESS-FND-001'
title: Namespace governed plan identifiers by repository
status: done
roadmap: foundation-tooling/namespace-governed-plan-identifiers-by-repository
blocks: —
blocked-by: —
baseline-ref: 7b7f599353bc6ca6a60b266d4882df31a468b721
---

# KI-HARNESS-FND-001: Namespace governed plan identifiers by repository

## Context

Theme-scoped identifiers such as `FND-001` are ambiguous when plans, dependencies, and handoffs cross repositories. The canonical form is `<REPO>-<THEME>-<NNN>`, for example `KI-HARNESS-FND-001` and `TKI-CLI-004`.

## Current state

`ki-roadmap` currently owns and verifies the theme-only grammar, while `ki-plan`, `ki-next`, and `ki-recap` describe or consume it. The shared `.ki-config.toml` file has no repository code yet. Existing plan records are out of scope for this cutover; the new grammar applies to newly authored plans.

## Steps

1. ✓ Define the `ki-roadmap`-owned `repo_code` schema, deterministic fallback derivation, validation, and `<REPO>-<THEME>-<NNN>` grammar in the harness standards, rubric, contexts, and tests.
2. ✓ Extend conform to add a missing `repo_code` without changing existing plan records.
3. ✓ Update `ki-plan`, `ki-next`, `ki-recap`, and the user documentation to use repository-qualified identifiers and clarify cross-repository references.
4. ✓ Conform this repository to `repo_code = "KI-HARNESS"`, update this plan to the new grammar as the current exemplar, and verify with focused tests, type checks, and audits.

## Files touched

- `.ki-config.toml`
- `docs/roadmap/foundation-tooling/ROADMAP.md`
- `docs/roadmap/foundation-tooling/plans/KI-HARNESS-FND-001-namespace-governed-plan-identifiers-by-repository.md`
- `skills/governance/ki-roadmap/`
- `skills/process/ki-plan/`
- `skills/process/ki-next/`
- `skills/process/ki-recap/`
- `docs/guides/user/`

## Verify

- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

None.

## Acceptance

### Delivered

Repository-qualified governed-plan identifiers and `ki-roadmap`-owned `repo_code` conformance.

### Summary of changes

Added the `KI-HARNESS` repository code, adopted `<REPO>-<THEME>-<NNN>` plan identifiers, and aligned the roadmap, plan, next, recap, standards, rubric, and user documentation contracts.

### Verification

- `bun run test` — 214 passing.
- `bunx tsc --noEmit` — passing.
- `ki repo audit --skill ki-roadmap --repo .` — clean.
- `ki repo audit --skill ki-skills --repo .` — clean.

Evidence revision: `82f93581234b5caea944f512868df6f1186699f8`.

### Outstanding concerns

None.

### Mini recap

Configured repository prefixes may be intentionally hyphenated, so plan validation treats the configured `repo_code` as authoritative rather than relying on positional splitting.

## Done

Repository-qualified plan identifiers are implemented, verified, and explicitly accepted. No follow-up is required before pruning this completed plan.
