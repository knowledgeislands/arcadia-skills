---
type: ki-checkpoint
thread: rubric-v1-migration
state: active
created_at: 2026-08-06T21:04:16Z
updated_at: 2026-08-06T21:04:16Z
---

# rubric-v1-migration

## Objective

Migrate every Harness rubric catalogue to the strict `contract: 1` remediation and judgment metadata that `tools-ki` already enforces, without retaining legacy fallback behaviour.

## Current state

15 of 36 catalogues are committed: `ki-feature-definitions`, `ki-engineering`, `ki-skills`, `ki-trades`, `ki-authoring`, `ki-repo`, `ki-decision-records`, `ki-git`, `ki-delegation`, `ki-roadmap`, `ki-specifications`, `ki-guides`, `ki-housekeeping`, `ki-mcp`, and `ki-subagents`.

`ki-harness` is implemented and focused-verified in the worktree; its former dependency blocker, `ki-subagents`, is now committed as `6e11e98a`, so re-run its focused audit and commit it as one skill. The worktree also contains the uncommitted correction to roadmap item `KI-HARNESS-FND-010`, adding required item sections after the Roadmap audit found the original shape incomplete.

## Decisions made

- Rubric contract remains `1`; there is no contract-2 path.
- Every mechanical aspect declares `automatic`, `diagnostic`, or `guarded`; only safe, idempotent local callbacks are automatic.
- Every judgment aspect supplies scope, prompt, unique outcomes, and guidance; the host does not synthesize judgment findings.
- Migrate and commit one skill at a time. Reuse the three available worker slots immediately when a worker finishes.
- Legacy compatibility is cleanup work, never an executable fallback. Remove actual old footprints before retiring migration-only checks.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-012-separate-rubric-evidence.md` records the active migration boundary.
- `tools-ki` host commits `23b7f88` and `6652290` provide v1 validation, rendering, automatic-only execution, and the `--allow-commands` wording.
- Harness migration commits are discoverable with `git log --grep='migrate .* evidence'`.
- `docs/roadmap/KI-HARNESS-FND-010-standardise-120-column-formatting.md` is committed as `9e3c1bf5` and currently has an uncommitted structural correction.

## Open questions

- None for the v1 contract. Remaining catalogue classifications should follow the established exemplars and escalate only a genuine mixed-remediation criterion that needs splitting.
- The 120-column formatting item is planned, not yet implemented.

## Next step

Commit the verified `ki-harness` migration after its now-unblocked focused audit, then dispatch the next three independent unmigrated catalogues. Update this checkpoint after every three skill commits, after any shared gate failure, and immediately before any context compaction or hand-off. A fresh agent resumes by reading this exact file, checking `git status`, and running `git log --grep='migrate .* evidence'`.
