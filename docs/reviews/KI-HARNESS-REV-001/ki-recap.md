# `ki-recap` effectiveness review

- **Position:** 12 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `bc6208ab9cc328487361e70c69a24a2f50f5f5e5` plus current runtime-source checks on 2026-08-12.
- **Kind / dependencies:** process / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the warm-recap capability and conservative writing boundary; correct runtime claims and make repository grounding fail closed before grading.
- **Change state:** applied in `76173ee7`.

## Sources and mechanics

The skill has no source list despite volatile Claude and Codex transcript and compaction claims. Current Anthropic documentation covers manual and automatic compaction and session storage. Current official OpenAI documentation exposes a user-invocable [`/compact`](https://learn.chatgpt.com/docs/developer-commands?surface=cli) as well as automatic compaction, and its [hook contract](https://learn.chatgpt.com/docs/hooks) includes manual and automatic `PreCompact` and `PostCompact` events. It also warns that the transcript path is convenient but its file format is not a stable hook interface.

This contradicts both recap surfaces, which say Codex compacts only automatically. It also makes the helper's direct parsing of Codex session JSONL a version-sensitive implementation rather than stable runtime evidence.

The repository-wide `ki-skills` audit passed. A focused repository audit is unavailable by design for this global process skill. The grounding helper passed seven tests and 39 assertions; its help path passed.

## Selection and outcome effectiveness

“Recap this session,” “what is outstanding,” and “harvest what we learned” select the warm in-session task well. The route away from backlog selection to `ki-next` is clear.

The three-leg order, fresh-state requirement, distinction between captured work and unfinished work, confirmation before durable learning writes, and bounded coverage matrix materially reduce common recap errors. The helper's advisory-only posture is sound: transcript evidence never replaces fresh Git checks.

## Instruction economy and architecture

The 44-line entrypoint and on-demand procedure use progressive disclosure appropriately. The duplicated compaction claim is costly because it is stale, not because the overall capability is too large.

`ki-recap` correctly owns recap judgment, `ki-next` owns future selection, `ki-authoring` owns knowledge placement, and `ki-accept` consumes only a record-scoped mini recap. The claimed `ki-tokenomics` ownership of compaction evidence is not reconciled with `ki-tokenomics-codex`, which presently excludes compaction and transcript metrics from its documented filesystem audit.

The portable boundary should say when a handoff is ready; runtime adapters should state whether the user or agent can invoke compaction and what evidence is observable. A user-invocable command is not automatically agent authority to execute it.

## Executability and safety

The helper rejects unsafe explicit transcript selectors and treats malformed or foreign transcript evidence as unavailable. Direct transcript parsing remains safe only because its output is advisory.

Repository grounding does not fail closed. The helper resolves the supplied directory rather than discovering Git's top-level root; its Git wrapper returns an empty string on every error; an empty status is classified as a clean worktree; and `diffStat` runs only unstaged `git diff --stat`, omitting staged changes. This can make a nested, non-repository, or Git-failure recap falsely claim clean or incomplete evidence.

## Evidence and gaps

Tests prove parser selection and marker handling, not real recap outcome quality, live format drift, staged-only changes, Git failure, compaction availability or refusal, hook effects, learning-write confirmation, or correct separation from `ki-next`. There is no recap eval scenario or result evidence.

## Proposed remediation

These proposals are not approved implementation:

1. Add dated Anthropic and OpenAI source records and distinguish automatic compaction, user-invocable `/compact`, and agent-side authority.
2. Treat runtime transcript formats as best-effort version-sensitive evidence and add drift/no-output regressions.
3. Resolve Git's physical top level or return explicit unavailable; include staged, unstaged, and untracked evidence and never map a Git error to clean.
4. Reconcile the portable recap boundary with the two `ki-tokenomics` runtime adapters.
5. Add cross-runtime assisted-versus-baseline scenarios for missed dirty work, false backlog Actions, learning confirmation, and future-work routing.

No new skill, agent, or hook is proposed.

## Applied changes

**State:** applied in `76173ee7`.

Grounding now resolves the physical Git root, reports staged, unstaged, and untracked evidence, combines diff statistics, and returns `unavailable` rather than clean on Git failure. Transcript parsing is advisory and version-sensitive. Runtime sources distinguish documented `/compact` availability from agent authority, with expanded failure and drift fixtures.
