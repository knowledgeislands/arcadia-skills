---
type: ki-checkpoint
thread: rubric-v1-migration
state: active
created_at: 2026-08-06T21:04:16Z
updated_at: 2026-08-06T21:51:13Z
---

# rubric-v1-migration

## Objective

Migrate every Harness rubric catalogue to the strict `contract: 1` remediation and judgment metadata that `tools-ki` already enforces, without retaining legacy fallback behaviour.

## Current state

26 of 36 catalogues are committed. The latest three are `ki-tokenomics` (`a9e91225`), `ki-tokenomics-claude` (`4cf701b4`), and `ki-tokenomics-codex` (`d1aadb10`).

The active rolling lanes are `ki-kb`, `ki-kb-activities`, and `ki-kb-live-artifacts`. Each worker edits and verifies one skill, leaves it unstaged, and reports exact paths; the orchestrator commits each verified skill through a unique temporary `GIT_INDEX_FILE` and serialises `HEAD` updates.

## Decisions made

- Rubric contract remains `1`; there is no contract-2 path.
- Every mechanical aspect declares `automatic`, `diagnostic`, or `guarded`; only safe, idempotent local callbacks are automatic.
- Every judgment aspect supplies scope, prompt, unique outcomes, and guidance; the host does not synthesize judgment findings.
- Migrate and commit one skill at a time. Reuse the three available worker slots immediately when a worker finishes.
- A worker never commits concurrently with another worker: a dedicated temporary index isolates staging, while the orchestrator retains commit authority and checks the expected baseline.
- Report a timestamped task start and finish, with a heartbeat at least once per minute while work remains active.
- Legacy compatibility is cleanup work, never an executable fallback. Remove actual old footprints before retiring migration-only checks.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-012-separate-rubric-evidence.md` records the active migration boundary.
- `tools-ki` host commits `23b7f88` and `6652290` provide v1 validation, rendering, automatic-only execution, and the `--allow-commands` wording.
- Harness migration commits are discoverable with `git log --grep='migrate .* evidence'`.
- `docs/roadmap/KI-HARNESS-FND-010-standardise-120-column-formatting.md` has been structurally corrected and committed as `593d69e1`.

## Open questions

- None for the v1 contract. Remaining catalogue classifications should follow the established exemplars and escalate only a genuine mixed-remediation criterion that needs splitting.
- The 120-column formatting item is planned, not yet implemented.

## Next step

Collect and serialise the three active Knowledge Base migrations, then immediately dispatch the next three unmigrated catalogues. Update this checkpoint after every three skill commits, after any shared gate failure, and immediately before any context compaction or hand-off. A fresh agent resumes by reading this exact file, checking `git status`, and running `git log --grep='migrate .* evidence'`.
