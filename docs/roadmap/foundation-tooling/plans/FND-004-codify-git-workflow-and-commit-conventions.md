---
id: 'FND-004'
title: Codify Git workflow and commit conventions
status: acceptance
roadmap: foundation-tooling/codify-git-workflow-and-commit-conventions
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Give repository Git discipline one explicit owner: Conventional Commit messages, type/scope vocabulary, safe lock and cleanup behaviour, and the boundary between repository guidance, the shipped stale-lock hook, and user-environment binding.

## Current state

`ki-git` is now the governed owner of portable commit shape, branch-selection guidance, Git hygiene, and stale-lock semantics. Its initial host-loadable catalogue is judgment-only, while `hooks/` retains payload layout, `ki-dotfiles-chezmoi` retains Claude Code registration, and `ki-repo` retains repository and GitHub configuration. Mechanical enforcement remains deliberately absent until a deterministic host contract is separately designed.

## Steps

1. ✓ Inventory current Git guidance, commit history conventions, hook ownership, lock recovery behaviour, and runtime-specific binding across the harness and representative KI repositories.
2. ✓ Compare the viable ownership models: a dedicated `ki-git` governance skill, an explicit `ki-repo` extension, or a split that keeps the hook/runtime binding with its existing owner. Record the chosen boundary and rejected alternatives in the appropriate durable decision surface.
3. ✓ Author the resulting standard: allowed Conventional Commit types/scopes, message shape, direct-main/branch expectations, safe lock recovery, cleanup limits, and the distinction between repository policy and user-environment hook registration.
4. ✓ Move or link the stale-lock guard, its documentation, and tests under the chosen owner without duplicating rules across `AGENTS.md`, skills, hooks, and guides.
5. ✓ Add only deterministic enforcement that the settled standard can justify; keep review-dependent commit quality as judgment guidance. Updated onboarding/user documentation, added the initial judgment-only native catalogue, and ran the full relevant gates. No mechanical enforcement was justified before a separate deterministic host-contract design.

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

## Acceptance

### Delivered

Established `ki-git` as the single portable owner of Git and commit policy, with a host-loadable initial judgement catalogue and explicit boundaries for hook payload and runtime registration.

### Summary of changes

- Added [GDR-KI-HARNESS-003](../../../decisions/GDR-KI-HARNESS-003-portable-git-governance-ownership.md), selecting a dedicated `ki-git` owner and rejecting `ki-repo` extension or split policy ownership.
- Added `ki-git`'s portable standard, provenance record, local rubric type vendoring, native `createSession` catalogue, four judgement families, generated rubric, and focused tests.
- Declared `ki-git` in this harness and added it to the user skills map and catalogue.
- Routed hook payload, stale-lock semantics, and chezmoi runtime registration to their respective owners without changing hook behaviour or user settings.
- Deliberately left deterministic commit-message enforcement for a separate host-contract design rather than introducing an unreviewed hook or compatibility path.

### Verification

At `e488939c`, all relevant gates passed:

- `bun hooks/git-lock-check.test.ts`
- `bun run test` (193 passing tests)
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-git --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `git diff --check`

### Outstanding concerns

No mechanical enforcement exists yet by design. A future deterministic host-contract plan must define its scope, false-positive boundary, and rollout before any commit hook or repository-wide enforcement is added.

### Mini recap

One policy owner can coexist cleanly with specialised payload and runtime owners. The initial native catalogue makes the human judgment explicit without pretending that subjective commit quality can safely be automated.
