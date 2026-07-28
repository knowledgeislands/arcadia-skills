---
id: 'FND-001'
title: 'Complete qualified declaration cutover'
status: in-progress
roadmap: foundation-tooling/complete-qualified-repository-declaration-migration
blocks: —
blocked-by: —
baseline-ref: d9613dac558aa8a466d1a27cb16e5eb2c7f0087f
transferred-from: 'knowledgeislands/tools-ki:CLI-006'
---

## Context

CLI-006 makes a repository declaration a quoted `<harness-id>:<skill-name>` TOML root and rejects bare `[ki-*]` declarations. The initial harness cutover migrated the central `ki-repo` paths, but audit evidence shows remaining bare-table readers, conformers, standards, examples, generated rubric text, and fixtures across the harness. `ki-tools` visibly misreads the qualified marker and mistakes a Bun/TypeScript CLI’s command and test layout for missing container capabilities.

## Current state

- The harness's `.ki-config.toml` and central `ki-repo` rubric paths use qualified roots.
- `ki-tools` reads `parsed['ki-tools']`, writes a bare marker during conform, and documents the old syntax.
- Other skill-owned configuration readers and generated documentation still contain bare declaration assumptions and test fixtures.
- `tools-ki` CLI-006 is implemented and its local engineering baseline is clean, but full repository acceptance remains blocked by this incomplete harness migration and live repository evidence.

## Steps

1. Inventory every remaining skill-owned bare repository-declaration read, write, fixture, standard, example, and generated publication; classify it as a runtime configuration path, a conformance path, or explanatory material.
2. Establish one harness-local helper or equivalent settled pattern for resolving a skill's own qualified repository configuration without compatibility fallback, preserving nested settings and unrelated TOML.
3. Migrate every affected skill rubric and conformer to the qualified pattern; update its tests, standards, examples, and generated rubric publication together.
4. Correct `ki-tools` container evidence so it invokes the primary executable for `--version` and recognises the declared TypeScript/Bun test layout without requiring a shell-only `tests/` directory.
5. Verify the harness migration and run `tools-ki`'s full repository audit against the updated harness; retain unrelated live-GitHub findings separately.
6. Record the receiving adoption and report the resulting CLI-006 acceptance and release prerequisites.

## Files touched

- Affected `skills/**/scripts/rubric/`, standards, examples, generated rubric publications, and focused tests
- `docs/roadmap/foundation-tooling/ROADMAP.md`, this plan, and the generated root `ROADMAP.md`

## Verify

1. Focused rubric tests demonstrate exact qualified-root discovery, conform output, nested-setting preservation, and rejection of bare repository declarations wherever a skill owns configuration.
2. Every affected generated rubric publication matches its canonical item definitions.
3. `ki-tools` recognises `tools-ki`'s executable version command and `src/tests/` suite, with no `CONFIG-1`, `TOOL-VERSION`, or `TOOL-TESTS` warning.
4. `bun run test`, `bunx tsc --noEmit`, relevant direct skill audits, and `ki repo audit --skill ki-roadmap --repo .` pass.
5. `tools-ki` passes `ki repo audit --repo .` once its separately confirmed GitHub settings and pushed local evidence are available.

## Execution record

- Completed the inventory across the tracked harness, supporting evaluation and hook fixtures, standards, generated publications, and decision/reference material; no bare repository-table header remains.
- Settled the harness-local pattern as a quoted `knowledgeislands/ki-agentic-harness:<skill>` TOML root, with quoted nested tables such as `["knowledgeislands/ki-agentic-harness:ki-kb".zones]`; skill dependency metadata remains name-based because it is not repository configuration.
- Migrated the remaining configuration readers and conformers for `ki-plugins`, `ki-kb`, `ki-kb-streams`, `ki-kb-live-artifacts`, `ki-mcp`, `ki-homebrew-tap`, `ki-website`, `ki-website-cloudflare`, and `ki-specifications`, with their focused tests and generated rubric publications.
- Corrected `ki-tools` to emit and validate the qualified marker, invoke the physical primary executable with a bounded `--version` command, and recognise either `tests/` or `src/tests/` for container evidence while preserving shell-specific Bats requirements.
- Verified with `bun run test` (212 passing), `bunx tsc --noEmit`, `bunx biome check .`, all generated rubric publications, `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-roadmap --repo .`, and the full `ki repo audit --repo .` (no FAIL or WARN findings).

## Dependencies / blocks

This work was adopted from `knowledgeislands/tools-ki` CLI-006. It blocks CLI-006 acceptance and release coordination, but has no local plan dependency and does not block unrelated harness governance work.
