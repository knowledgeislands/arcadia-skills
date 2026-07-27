---
id: 'FND-004'
title: Codify Git workflow and commit conventions
status: in-progress
roadmap: foundation-tooling/codify-git-workflow-and-commit-conventions
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Give repository Git discipline one explicit owner: Conventional Commit messages, type/scope vocabulary, safe lock and cleanup behaviour, and the boundary between repository guidance, the shipped stale-lock hook, and user-environment binding.

## Current state

The harness has repository-local commit guidance and a tested `hooks/git-lock-check.sh` payload, but no governed owner for the full Git convention. The roadmap intentionally leaves open whether the correct end state is a dedicated `ki-git` skill or an extension of an existing governance skill; mechanical enforcement must wait until that decision is settled.

## Steps

1. ✓ Inventory current Git guidance, commit history conventions, hook ownership, lock recovery behaviour, and runtime-specific binding across the harness and representative KI repositories.
2. ✓ Compare the viable ownership models: a dedicated `ki-git` governance skill, an explicit `ki-repo` extension, or a split that keeps the hook/runtime binding with its existing owner. Record the chosen boundary and rejected alternatives in the appropriate durable decision surface.
3. ✓ Author the resulting standard: allowed Conventional Commit types/scopes, message shape, direct-main/branch expectations, safe lock recovery, cleanup limits, and the distinction between repository policy and user-environment hook registration.
4. ✓ Move or link the stale-lock guard, its documentation, and tests under the chosen owner without duplicating rules across `AGENTS.md`, skills, hooks, and guides.
5. Add only deterministic enforcement that the settled standard can justify; keep review-dependent commit quality as judgment guidance. Update onboarding/user documentation and run the full relevant gates.

## Files touched

- Decision record and chosen governance-skill directory, which is either a new `ki-git` skill or the selected existing owner.
- `hooks/git-lock-check.sh`, its tests, and hook documentation where ownership changes.
- Repository orientation and user guides that currently carry duplicate Git guidance.
- This plan and its derived roadmap reference.

## Verify

- The selected owner has one clear standard, source list, generated rubric where applicable, and no conflicting duplicate guidance.
- `bun hooks/git-lock-check.test.ts` passes after any hook movement or change.
- Relevant skill audits, `bun run test`, `bunx tsc --noEmit`, and roadmap/authoring checks pass.
- A sample of representative commits validates the chosen message vocabulary; any mechanical checker rejects only deterministic violations.

## Dependencies / blocks

No plan dependency. Ownership is the first decision gate; do not create a compatibility layer or apply mechanical enforcement before that decision is recorded.
