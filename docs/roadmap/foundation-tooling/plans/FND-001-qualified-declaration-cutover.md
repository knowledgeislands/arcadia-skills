---
id: 'FND-001'
title: 'Complete qualified declaration cutover'
status: done
roadmap: foundation-tooling/complete-qualified-repository-declaration-migration
blocks: —
blocked-by: —
baseline-ref: d9613dac558aa8a466d1a27cb16e5eb2c7f0087f
transferred-from: 'knowledgeislands/tools-ki:CLI-006'
---

## Context

CLI-006 makes a repository declaration a quoted `<harness-id>:<skill-name>` TOML root and rejects bare `[ki-*]` declarations. The initial harness cutover migrated the central `ki-repo` paths, but audit evidence shows remaining bare-table readers, conformers, standards, examples, generated rubric text, and fixtures across the harness. `ki-tools` visibly misreads the qualified marker and mistakes a Bun/TypeScript CLI’s command and test layout for missing container capabilities.

## Current state

- The harness uses qualified `knowledgeislands/ki-agentic-harness:<skill>` roots throughout its repository configuration contract.
- Skill-owned readers and conformers preserve nested settings while rejecting bare declarations without a compatibility fallback.
- `ki-tools` recognises the Bun/TypeScript CLI's primary `--version` command and `src/tests/` layout.
- Current tools-ki source (`0.2.11`) audits cleanly against the migrated harness. The installed `ki 0.2.6` binary is a separate release-update concern.

## Steps

1. [x] Inventory every remaining skill-owned bare repository-declaration read, write, fixture, standard, example, and generated publication; classify it as a runtime configuration path, a conformance path, or explanatory material.
2. [x] Establish one harness-local helper or equivalent settled pattern for resolving a skill's own qualified repository configuration without compatibility fallback, preserving nested settings and unrelated TOML.
3. [x] Migrate every affected skill rubric and conformer to the qualified pattern; update its tests, standards, examples, and generated rubric publication together.
4. [x] Correct `ki-tools` container evidence so it invokes the primary executable for `--version` and recognises the declared TypeScript/Bun test layout without requiring a shell-only `tests/` directory.
5. [x] Verify the harness migration and run `tools-ki`'s full repository audit against the updated harness; retain unrelated live-GitHub findings separately.
6. [x] Record the receiving adoption and report the resulting CLI-006 acceptance and release prerequisites.

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

This work was adopted from `knowledgeislands/tools-ki` CLI-006. CLI-006 is now accepted and pruned in its receiving repository. The installed `ki 0.2.6` binary lagging tools-ki source `0.2.11` is release-update work, not a remaining harness-migration dependency.

## Acceptance

### Delivered

The harness now uses qualified repository skill declarations throughout its owned configuration contract, and every affected reader, conformer, test, standard, example, and generated rubric publication follows that one clean contract.

### Summary of changes

The cutover replaced bare `[ki-*]` declaration assumptions with quoted `knowledgeislands/ki-agentic-harness:<skill>` roots, preserving nested configuration ownership without a compatibility path. `ki-tools` now recognises the primary Bun/TypeScript executable and test layout. `52d421d0` restored the generated root roadmap projection after the later GOV-001 prune.

### Verification

- `bun run test` — 213 passing tests.
- `bunx tsc --noEmit` and `bunx biome check .` — passed.
- `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-roadmap --repo .`, and `ki repo audit --repo .` — no FAIL or WARN findings.
- `bun /Users/krisbrown/workspaces/kis/knowledgeislands/tools-ki/src/main.ts repo audit --repo /Users/krisbrown/workspaces/kis/knowledgeislands/tools-ki` — no FAIL or WARN findings across 60 evaluated findings.

### Outstanding concerns

The installed `ki 0.2.6` binary predates the verified tools-ki source at `0.2.11`; releasing or upgrading that binary is separate from this completed harness migration.

### Mini recap

No new durable learning route is proposed. The root portfolio drift was repaired through the existing `ki-roadmap` CONFORM contract.

## Done

Completed the qualified repository-declaration cutover across the harness and verified it against current tools-ki source. The only residual concern is the separately owned release update from installed `ki 0.2.6` to source `0.2.11`.
