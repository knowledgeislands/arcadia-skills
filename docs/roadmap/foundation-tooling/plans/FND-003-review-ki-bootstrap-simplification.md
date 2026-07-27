---
id: 'FND-003'
title: Review ki-bootstrap for further simplification
status: open
roadmap: foundation-tooling/review-ki-bootstrap-for-further-simplification
blocks: —
blocked-by: —
baseline-ref: —
---

## Context

Confirm that `ki-bootstrap` has reached the intended clean boundary: guidance lives in the harness while execution, publication, and transaction mechanics live in `tools-ki`. Remove only stale documentation or unnecessary local complexity; retain real external-command and user-space failure boundaries.

## Current state

`ki-bootstrap` is guidance-only: it has no executable scripts tree, publisher, synchroniser, scaffold, or HELP generator. User bootstrap and rubric rendering are already in-process in `tools-ki`. The remaining product subprocess executes validated external `ConformCommand` values and is not an adjacent bootstrap-module launch. Several harness feature documents still claim retired bootstrap scripts and legacy executor contracts.

## Steps

1. Inventory current `ki-bootstrap` ownership across the harness and `tools-ki`, classifying each boundary as in-process local, external command, or user-space mutation with its safety evidence.
2. Confirm that no local bootstrap process launch remains to replace. Preserve validated external commands and per-agent/per-skill user-install failure isolation unless the inventory proves a boundary is only an adjacent local module.
3. Reconcile stale feature-definition and engineering-exemplar claims with the current CLI-hosted rubric and bootstrap model; remove claims about retired scripts, vendored executors, generated HELP, and legacy project-copy contracts.
4. Refresh the bootstrap source-review record: direct CLI ownership is current, no local process boundary remains, and any user-space publication hardening belongs to the existing `tools-ki` follow-up.
5. Run focused skill, feature-definition, roadmap, documentation, and read-only CLI-boundary verification; commit the harness-only clarification unless the inventory identifies a real regression.

## Files touched

- `docs/features/modes.md`, `docs/features/governance.md`, and `docs/features/harness.md`.
- `skills/governance/ki-engineering/references/exemplars.md`.
- `skills/keystone/ki-bootstrap/references/sources.md` and, only for wording drift, its `SKILL.md` or bootstrap standard.
- This plan and its derived roadmap reference.

## Verify

- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-feature-definitions --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- Relevant Markdown formatting checks.
- Read-only `tools-ki` confirmation that its bootstrap, skill-rubric, and repository CLI suites remain green before the boundary is described as current.

## Dependencies / blocks

No blocking dependency. The separate `tools-ki` publication-hardening follow-up remains independent; do not change its implementation while reconciling this harness documentation.

## Delegation

- Round 1 — research: produce the boundary matrix from the current harness and `tools-ki` sources; files: read-only scope; gate: each boundary is classified with evidence.
- Round 2 — mechanical: reconcile stale documentation after the matrix is approved; files: exclusive harness documentation paths; gate: focused documentation and skill checks.
- Orchestrator: decide whether a discovered boundary is genuine, review the final wording, and run the verification gate.
