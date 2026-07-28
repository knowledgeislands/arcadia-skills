---
id: 'GOV-001'
title: Codify convention placement and the knowledge-promotion loop
status: done
roadmap: governance-consistency/codify-convention-placement-and-the-knowledge-promotion-loop
blocks: —
blocked-by: —
baseline-ref: 6506c8526c702f09c2e4bb8f27874837a57c9d5c
---

## Context

Useful lessons currently have several possible destinations: ephemeral session context, runtime memory, repository orientation, reference material, standards, and skills. A single runtime-neutral routing contract is needed so useful knowledge is promoted deliberately and lower-layer duplicates do not persist.

## Current state

`AGENTS.md` already distinguishes portable orientation from runtime-specific guidance, and `ki-recap` already harvests learning. Neither provides the complete placement ladder, promotion evidence, and reconciliation loop. `ki-recap` still names a Claude-specific learned-pattern destination where its portable procedure should defer to the shared routing contract.

## Steps

- [x] Define the runtime-neutral placement ladder, promotion evidence, durable destinations, and reconciliation actions in `ki-authoring`.
- [x] Add the new reference to `ki-authoring`'s router and authoring surface without creating a new guide area or automatic transcript miner.
- [x] Align `ki-recap`'s learning-harvest procedure with the shared routing contract and retain its runtime-neutral boundary.
- [x] Run focused and full mechanical verification, then record the outcome for acceptance.

## Files touched

- `skills/governance/ki-authoring/SKILL.md`
- `skills/governance/ki-authoring/references/standards-knowledge-promotion.md`
- `skills/process/ki-recap/SKILL.md`
- `skills/process/ki-recap/references/standards-session-recap.md`
- `docs/guides/user/overview.md`
- This plan and its canonical roadmap reference.

## Verify

- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --repo .`
- `ki repo conform --repo . --dry-run`
- Prettier and Markdown lint for every changed Markdown file.

## Dependencies / blocks

None.

## Acceptance

### Delivered

- Added the runtime-neutral knowledge-promotion standard and surfaced it through `ki-authoring`.
- Routed `ki-recap`'s learning-harvest procedure through that standard instead of naming a Claude-specific durable destination.
- Corrected the user overview so portable repository guidance belongs in `AGENTS.md`, with runtime files reserved for runtime-specific detail.

### Summary of changes

The new shared reference defines the placement ladder, evidence threshold, durable destination, and lower-layer reconciliation for each learning. `ki-recap` now delegates that judgment to the shared contract, keeping its process portable across runtimes.

### Verification

- `ki repo audit --skill ki-authoring --repo .` — PASS: 0 FAIL, 0 WARN.
- `ki repo audit --repo .` — PASS: 0 FAIL, 0 WARN across all declared skills.
- `ki repo conform --repo . --dry-run` — PASS: 0 FAIL, 0 WARN, 0 proposed fixes.
- Prettier and markdownlint-cli2 — PASS for all changed Markdown files.

### Outstanding concerns

None. The standard deliberately does not add automatic transcript mining or a new guide area.

### Mini recap

The placement ladder provides one owner for each durable learning and instructs reconciliation of lower-layer duplicates. The user approved this work through done.

## Done

Completed 2026-07-28 under the user's approval through done. Retain this completed plan until explicit prune approval.
