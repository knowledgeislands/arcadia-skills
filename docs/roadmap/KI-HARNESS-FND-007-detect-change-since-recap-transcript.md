---
id: KI-HARNESS-FND-007
title: Detect repository change since the recap transcript
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

`ki-recap` grounding can select an eligible historical transcript whose tool tally does not represent the live session. The useful question is not its age: it is whether the repository has materially changed since the transcript's last usable repository evidence.

## Boundary

Do not introduce a time-based freshness threshold, require a transcript for recap, or treat transcript-derived tool counts as a replacement for current Git checks. The helper remains read-only and must state uncertainty when it cannot establish a comparable repository baseline.

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
