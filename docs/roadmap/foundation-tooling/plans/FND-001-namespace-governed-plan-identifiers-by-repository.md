---
id: 'FND-001'
title: Namespace governed plan identifiers by repository
status: in-progress
roadmap: foundation-tooling/namespace-governed-plan-identifiers-by-repository
blocks: —
blocked-by: —
baseline-ref: 7b7f599353bc6ca6a60b266d4882df31a468b721
---

# FND-001: Namespace governed plan identifiers by repository

## Context

Theme-scoped identifiers such as `FND-001` are ambiguous when plans, dependencies, and handoffs cross repositories. The canonical form will become `<REPO>-<THEME>-<NNN>`, for example `KAH-FND-001` and `TKI-CLI-004`.

## Current state

`ki-roadmap` currently owns and verifies the theme-only grammar, while `ki-plan`, `ki-next`, and `ki-recap` describe or consume it. The shared `.ki-config.toml` file has no repository code yet. Existing plan records are out of scope for this cutover; the new grammar applies to newly authored plans.

## Steps

1. Define the `ki-roadmap`-owned `repo_code` schema, deterministic fallback derivation, validation, and `<REPO>-<THEME>-<NNN>` grammar in the harness standards, rubric, contexts, and tests.
2. Extend conform to add a missing `repo_code` without changing existing plan records.
3. Update `ki-plan`, `ki-next`, `ki-recap`, and the user documentation to use repository-qualified identifiers and clarify cross-repository references.
4. Conform this repository to `repo_code = "KAH"`, update this plan to the new grammar as the current exemplar, and verify with focused tests, type checks, and audits.

## Files touched

- `.ki-config.toml`
- `docs/roadmap/foundation-tooling/ROADMAP.md`
- `docs/roadmap/foundation-tooling/plans/FND-001-namespace-governed-plan-identifiers-by-repository.md`
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
