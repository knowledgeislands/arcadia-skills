---
id: 'FND-001'
title: Namespace governed plan identifiers by repository
status: open
roadmap: foundation-tooling/namespace-governed-plan-identifiers-by-repository
blocks: —
blocked-by: —
baseline-ref: —
---

# FND-001: Namespace governed plan identifiers by repository

## Context

Theme-scoped identifiers such as `FND-001` are ambiguous when plans, dependencies, and handoffs cross repositories. The canonical form will become `<REPO>-<THEME>-<NNN>`, for example `KAH-FND-001` and `TKI-CLI-004`.

## Current state

`ki-roadmap` currently owns and verifies the theme-only grammar, while `ki-plan`, `ki-next`, and `ki-recap` describe or consume it. The shared `.ki-config.toml` file has no repository code yet. There are no existing governed plan records in this harness, so it can serve as the clean exemplar.

## Steps

1. Define the `ki-roadmap`-owned `repo_code` schema, deterministic fallback derivation, validation, and `<REPO>-<THEME>-<NNN>` grammar in the harness standards, rubric, contexts, and tests.
2. Extend conform to add a missing `repo_code` and perform one guarded, all-or-nothing migration of canonical plan IDs, filenames, roadmap references, and dependency edges; reject any old identifier after the cutover.
3. Update `ki-plan`, `ki-next`, `ki-recap`, and the user documentation to use repository-qualified identifiers and clarify cross-repository references.
4. Add any `tools-ki` transaction capability needed for safe canonical file renames, then verify the harness and CLI source with focused tests, type checks, and audits.
5. Conform this repository to `repo_code = "KAH"`, review the fleet rollout route, and record any non-mechanical exception as a separately approved follow-up.

## Files touched

- `.ki-config.toml`
- `docs/roadmap/foundation-tooling/ROADMAP.md`
- `docs/roadmap/foundation-tooling/plans/FND-001-namespace-governed-plan-identifiers-by-repository.md`
- `skills/governance/ki-roadmap/`
- `skills/process/ki-plan/`
- `skills/process/ki-next/`
- `skills/process/ki-recap/`
- `docs/guides/user/`
- `/Users/krisbrown/workspaces/kis/knowledgeislands/tools-ki/` if the host needs rename support

## Verify

- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Focused `tools-ki` tests and type checks if its transaction contract changes.

## Dependencies / blocks

None.
