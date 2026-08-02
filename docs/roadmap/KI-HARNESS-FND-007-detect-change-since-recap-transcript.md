---
id: KI-HARNESS-FND-007
title: Detect repository change since the recap transcript
theme: foundation-tooling
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
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

### Decision still needed

Choose the smallest stable marker and payload format that a later helper can recover from both transcript formats without coupling the record to a particular host's event schema. The record must be observable in the recap output and testable through synthetic transcript fixtures.

### Promotion conditions

Promote when the exact evidence payload, compatible-record selection rule, unavailable behaviour, and fixture cases for unchanged, divergent, and ungrounded transcripts are specified.

## Current state

`recap-grounding.ts` selects an eligible Claude or Codex transcript and reports live repository state, but it neither emits a durable repository baseline nor compares one recovered from a later transcript.

## Steps

1. Define a versioned, explicitly labelled repository-evidence payload containing only the resolved repository root, full `HEAD` when available, and observed clean or dirty worktree state.
2. Emit that payload in the recap's grounded output and recognise only that marker from the selected eligible transcript; never infer a baseline from timestamps, arbitrary JSON, or hash-like text.
3. Compare a compatible recovered baseline with current Git state and report `unchanged`, `changed`, or `unavailable`, including the resolvable commit range and changed tracked paths only when both revisions are valid.
4. Keep the comparison factual and advisory: qualify transcript-derived tool tallies and high-cost candidates without replacing fresh Git checks or altering transcript selection.
5. Add synthetic Claude and Codex fixtures for unchanged, changed, missing, malformed, foreign-repository, and unavailable-baseline cases.

## Files touched

- `skills/process/ki-recap/scripts/recap-grounding.ts`
- `skills/process/ki-recap/scripts/recap-grounding.test.ts`
- `skills/process/ki-recap/SKILL.md`
- `skills/process/ki-recap/references/standards-session-recap.md`

## Verify

- `bun test skills/process/ki-recap/scripts/recap-grounding.test.ts`
- `bun run test`
- Manual JSON output confirms that a missing or incompatible baseline reports `unavailable` rather than a guessed comparison.

## Dependencies / blocks

The marker must be represented in fixtures for both runtime transcript formats before it becomes part of the portable recap procedure.

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
