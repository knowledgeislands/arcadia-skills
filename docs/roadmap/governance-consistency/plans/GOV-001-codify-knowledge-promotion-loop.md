---
id: 'GOV-001'
title: Codify convention placement and the knowledge-promotion loop
status: in-progress
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

1. Define the runtime-neutral placement ladder, promotion evidence, durable destinations, and reconciliation actions in `ki-authoring`.
2. Add the new reference to `ki-authoring`'s router and authoring surface without creating a new guide area or automatic transcript miner.
3. Align `ki-recap`'s learning-harvest procedure with the shared routing contract and retain its runtime-neutral boundary.
4. Run focused and full mechanical verification, then record the outcome for acceptance.

## Files touched

- `skills/governance/ki-authoring/SKILL.md`
- `skills/governance/ki-authoring/references/standards-knowledge-promotion.md`
- `skills/process/ki-recap/SKILL.md`
- `skills/process/ki-recap/references/standards-session-recap.md`
- This plan and its canonical roadmap reference.

## Verify

- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --repo .`
- `ki repo conform --repo . --dry-run`
- Prettier and Markdown lint for every changed Markdown file.

## Dependencies / blocks

None.
