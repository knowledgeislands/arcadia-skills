---
id: KI-HARNESS-FND-007
title: Detect repository change since the recap transcript
theme: foundation-tooling
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: 8d1342895cb8996881abca88187b5ee4e45614ec
---

## Goal

Let a recap say whether its saved transcript still reflects the repository as it is now.

## Context

`ki-recap` grounding can select an eligible historical transcript whose tool tally does not represent the live session. The useful question is not its age: it is whether the repository has materially changed since the transcript's last usable repository evidence.

## Boundary

Do not introduce a time-based freshness threshold, require a transcript for recap, or treat transcript-derived tool counts as a replacement for current Git checks. The helper remains read-only and must state uncertainty when it cannot establish a comparable repository baseline.

## Shaping

### Intended approach

Extend the read-only grounding helper with one small, serialisable repository-evidence record: resolved repository root, full `HEAD` when available, and the observed clean or dirty working-tree state. A recap emits that exact record with its grounded output.

On a later run, inspect only a deliberately marked, compatible record from the selected eligible transcript. Compare its recorded `HEAD` with current Git state, enumerate the commit range and changed tracked paths when Git can resolve both revisions, and report one factual result: `unchanged`, `changed`, or `unavailable`.

Keep the result separate from judgment. `ki-recap` continues to re-check live Git state and uses the comparison only to qualify transcript-derived tool tallies and high-cost suggestions.

### Known dependencies

The implementation is local to `ki-recap`: its grounding helper, its synthetic Claude/Codex transcript fixtures, and the recap procedure. It must recognise a record carried by both runtime transcript formats without treating arbitrary tool output, timestamps, or hash-like text as a baseline.

### Selected format

Emit one exact JSON member from the grounding helper: `"ki-recap-repository-evidence/v1"`. Its value is an object containing only `repo` (the resolved repository root), `head` (the full current `HEAD` or `null`), and `worktree` (`clean` or `dirty`).

On a later run, recover only an exact, type-valid marker from a prior helper-output record in the selected transcript, reject a marker for another repository, and use the most recent compatible marker. The decoder has one small runtime adapter for Claude tool-result blocks and one for Codex `custom_tool_call_output` blocks; both yield the same marker object without making either event schema portable.

### Promotion conditions

Promote when the exact evidence payload, compatible-record selection rule, unavailable behaviour, and fixture cases for unchanged, divergent, and ungrounded transcripts are specified. The user reviews this selected format before Ready.

## Current state

`recap-grounding.ts` selects an eligible Claude or Codex transcript and reports live repository state, but it neither emits a durable repository baseline nor compares one recovered from a later transcript.

## Steps

- [x] Define the `ki-recap-repository-evidence/v1` payload and emit it with the helper's live repository evidence.
- [x] Decode only exact, type-valid helper-output markers from Claude tool-result and Codex `custom_tool_call_output` records; reject malformed and foreign-repository markers.
- [x] Select the newest compatible marker and compare its `head` with current Git state, reporting `unchanged`, `changed`, or `unavailable`; include a commit range and changed tracked paths only when both revisions resolve.
- [x] Keep comparison evidence factual and advisory: qualify transcript-derived tool tallies and high-cost candidates without replacing fresh Git checks or altering transcript selection.
- [x] Add synthetic Claude and Codex fixtures for unchanged, changed, missing, malformed, foreign-repository, unavailable-head, and unavailable-baseline cases.
- [x] Update the recap procedure and output documentation with the marker, evidence statuses, and the rule that current Git state remains authoritative.

## Files touched

- `skills/process/ki-recap/scripts/recap-grounding.ts`
- `skills/process/ki-recap/scripts/recap-grounding.test.ts`
- `skills/process/ki-recap/SKILL.md`
- `skills/process/ki-recap/references/standards-session-recap.md`

## Verify

- `bun test skills/process/ki-recap/scripts/recap-grounding.test.ts`
- `bun run test`
- Fixture-backed JSON output proves each evidence status and that a missing, malformed, or incompatible baseline reports `unavailable` rather than a guessed comparison.
- Manual JSON output confirms the selected transcript's comparison evidence is advisory and fresh Git state remains the authority.

## Dependencies / blocks

The marker must be represented in fixtures for both runtime transcript formats before it becomes part of the portable recap procedure.

## Acceptance

### Delivered

The grounding helper now emits and recovers `ki-recap-repository-evidence/v1` for both supported transcript runtimes, reports its comparison status, and retains fresh Git state as the authority.

### Summary of changes

Added exact marker validation, compatible-record selection, conservative `unchanged` / `changed` / `unavailable` comparison, and commit-range/path evidence where Git can resolve both revisions.

Added Claude and Codex fixtures for representative, divergent, malformed, foreign, and ungrounded transcript evidence. Updated the recap procedure and reference standard to explain the status and its advisory role.

### Verification

- `bun test skills/process/ki-recap/scripts/recap-grounding.test.ts` — 7 passing, 0 failing.
- `bun run test` — 242 passing, 0 failing.
- `bunx tsc --noEmit` — passed.
- `ki repo audit --skill ki-roadmap --repo .`, `ki repo audit --skill ki-skills --repo .`, and `ki repo audit --skill ki-authoring --repo .` — passed.
- Manual Codex JSON output emitted the exact marker and reported `unavailable` for a transcript without a compatible baseline while correctly retaining live dirty-worktree evidence.

### Outstanding concerns

Transcript evidence is deliberately unavailable when a runtime does not retain a complete helper output or Git cannot establish a comparable baseline. That is a conservative limitation, not a false freshness claim.

### Mini recap

Transcript evidence now qualifies historical recap signals; it does not replace live Git checks or automatically decide whether work is material.

## Done

Accepted by the repository owner on 2026-08-02. Retain this record as the evidence for conservative, runtime-adapted transcript repository evidence.

## Discussion

### Change evidence

The helper should distinguish a transcript that remains representative from one overtaken by repository changes. Its evidence should name the selected transcript's captured baseline ref, the current `HEAD`, commits in the range, changed tracked paths, and current working-tree state.

The comparison result is factual — baseline unavailable, unchanged, or changed — while the significance of the change remains judgment. A concise range with one private test edit need not invalidate a recap; a changed public surface or broad cross-skill update should prompt the reviewer to treat transcript-derived tool tallies as historical context only.

### Baseline limits

A transcript may not contain a recoverable repository revision or a successful Git observation. In that case, the helper must label the history as ungrounded and retain current Git state as the only authoritative source; it must not infer a false baseline from timestamp alone.

The durable solution is to emit an explicit repository-evidence record — resolved root, `HEAD`, and clean/dirty state — whenever recap grounds a session, then recognise the most recent compatible record in a later transcript. Transcript modification time can assist candidate selection only; it is not a substitute for an observed revision and cannot establish a comparison range.

### Expected outcome

The eventual recap can say whether transcript-derived signals are representative, divergent, or unavailable, while keeping the existing fresh Git checks as the source of truth for commits, worktree state, and roadmap status.

### Conservative presentation

When divergence is established, surface transcript tool tallies and high-cost candidates as historical evidence with their baseline range. When it is unavailable, omit those derived recommendations rather than giving them a spurious live-session authority. The recap still runs its present-state Git and roadmap checks in every case.

### Implementation boundary

This is a provenance feature for historical transcript signals, not a session log or a general Git-history API. It does not alter transcript selection, write to a repository, or decide that a change is material.
