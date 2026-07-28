---
id: 'GOV-001'
title: Align KB Stream focus with non-KB roadmap horizons
status: in-progress
roadmap: governance-consistency/align-kb-stream-focus-with-non-kb-roadmap-horizons
blocks: —
blocked-by: —
baseline-ref: 6f5019f42da5fd1717948d8dbcffe036407ae401
---

## Context

Knowledge Bases and non-KB repositories both carry forward work, but they express it differently: KB Streams organise attention and proposal enactment, while repository roadmaps organise horizon priority and governed plans.

The shared lifecycle should route work correctly in either structure without forcing either one to adopt the other’s files or vocabulary wholesale.

## Current state

`ki-roadmap` now defines `Blocking`, `Next`, `Soon`, `Waiting for`, `Parked`, and `Future` for non-KB repositories.

`ki-kb-streams` now defines `Blocking`, `Active`, `Background`, `Waiting for`, `Dormant`, and `Future` Focus folders, with proposal status as a separate lifecycle.

`ki-recap`, `ki-next`, and `ki-plan` are being aligned to route to the repository's own forward-work structure rather than treating a KB as a roadmap repository.

## Confirmed semantic mapping

Focus and horizons express attention and priority; a KB proposal's `status` remains its separate enactment lifecycle.

| Concern | Non-KB roadmap | KB Streams Focus |
| --- | --- | --- |
| Urgent blocker | `Blocking` | `Blocking` |
| Immediate work | `Next` | `Active` |
| Understood, not immediate | `Soon` | `Background` |
| Waiting on a named condition | `Waiting for` | `Waiting for` |
| Intentionally paused | `Parked` | `Dormant` |
| Speculative or unscoped | `Future` | `Future` |
| Completed history | Removed from the roadmap | No `Settled` Focus; retain durable outcomes in canonical documentation and transient history in Git |

A KB item in `Waiting for` names its dependency or external condition. Once it changes, `ki-next` re-evaluates the item and moves it to `Active` or `Background` by the ordinary attention rules.

## Steps

1. [x] Establish a precise cross-structure mapping that distinguishes priority, attention, dependency waiting, and proposal status; confirm the semantic changes before editing either contract.
2. [x] Update the KB Streams structure and enactment contract, rubric catalogue, and generated publication for the approved Focus model, including its replacement for `Settled` and the handling of parked work.
3. [x] Make `ki-recap`, `ki-next`, and `ki-plan` dispatch on repository structure: non-KB repositories retain roadmaps and governed plans; KB repositories use Streams and proposal Checklists.
4. [x] Align user documentation, skill descriptions, and composition boundaries so cross-repository handoffs and everyday lifecycle requests select the correct local structure.
5. [x] Add or revise focused tests and run the relevant mechanical audits against both adapters.

## Files touched

- `skills/knowledge-bases/ki-kb-streams/`
- `skills/governance/ki-roadmap/`
- `skills/process/ki-recap/`
- `skills/process/ki-next/`
- `skills/process/ki-plan/`
- Relevant user guides, generated rubric publications, and focused tests.

## Verify

- `bun test skills/knowledge-bases/ki-kb-streams/scripts/rubric/contexts/streams.test.ts`
- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No implementation blocker is known. The semantic mapping in step 1 is the first review gate; do not begin a base rollout until the harness contract and its tests are accepted.
