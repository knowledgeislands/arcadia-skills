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

The helper should distinguish a transcript that remains representative from one overtaken by repository changes. Shape an evidence model that reports observable divergence, such as commits, tracked-file changes, and working-tree changes since the transcript's last repository evidence, rather than declaring a transcript stale solely because it is old.

### Baseline limits

A transcript may not contain a recoverable repository revision or a successful Git observation. In that case, the helper must label the history as ungrounded and retain current Git state as the only authoritative source; it must not infer a false baseline from timestamp alone.

### Expected outcome

The eventual recap can say whether transcript-derived signals are representative, divergent, or unavailable, while keeping the existing fresh Git checks as the source of truth for commits, worktree state, and roadmap status.
