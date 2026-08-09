---
type: ki-checkpoint
thread: rubric-v1-migration
state: retired
created_at: 2026-08-06T21:04:16Z
updated_at: 2026-08-06T21:59:18Z
retired_at: 2026-08-06T22:22:31Z
---

# rubric-v1-migration

## Objective

Migrate every Harness rubric catalogue to the strict `contract: 1` remediation and judgment metadata that `tools-ki` already enforces, without retaining legacy fallback behaviour.

## Current state

All 36 rubric catalogues are committed to the strict v1 evidence contract. The final five commits are `a5d0b5bc` (Claude housekeeping), `5cf673a9` (Homebrew tap), `a925542d` (tools), `a8696d10` (website), and `6c5070a1` (website Cloudflare).

The strict-v1 migration and compatibility cleanup are complete. `ki-repo-tools` (`e9d77f85`), `ki-repo-website-cloudflare` (`b0324d45`), and `ki-subagents` (`6910f1a9`) now declare required metadata at source; `ki-delegation` removed its obsolete heading normalizer in `d79aa32e`.

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
- None. The residual scan found no executable rubric-v1 metadata fallback or enrichment path.

## Next step

Run the final combined gates after the current local `tools-ki` progress-refactor work is committed or its Bun cache is disabled. A fresh agent resumes by reading this exact file, checking `git status`, and running `git log --grep='migrate .* evidence'`.
