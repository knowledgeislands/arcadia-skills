---
id: 'GOV-001'
title: Align KB Stream focus with non-KB roadmap horizons
status: ready
roadmap: governance-consistency/align-kb-stream-focus-with-non-kb-roadmap-horizons
blocks: —
blocked-by: —
baseline-ref: —
---

## Context

Knowledge Bases and non-KB repositories both carry forward work, but they express it differently: KB Streams organise attention and proposal enactment, while repository roadmaps organise horizon priority and governed plans.

The shared lifecycle should route work correctly in either structure without forcing either one to adopt the other’s files or vocabulary wholesale.

## Current state

`ki-roadmap` defines `Blocking`, `Next`, `Soon`, `Waiting for`, and `Future` for non-KB repositories.

`ki-kb-streams` currently defines `Active`, `Background`, `Dormant`, `Future`, and `Settled` Focus folders, with proposal status as a separate lifecycle.

`ki-next` and `ki-plan` deliberately stop for KB repositories, while `ki-recap` currently names the non-KB roadmap and plan destinations directly.

## Steps

1. Establish a precise cross-structure mapping that distinguishes priority, attention, dependency waiting, and proposal status; confirm the semantic changes before editing either contract.
2. Update the KB Streams structure and enactment contract, rubric catalogue, and generated publication for the approved Focus model, including its replacement for `Settled` and the handling of parked work.
3. Make `ki-recap`, `ki-next`, and `ki-plan` dispatch on repository structure: non-KB repositories retain roadmaps and governed plans; KB repositories use Streams and proposal Checklists.
4. Align user documentation, skill descriptions, and composition boundaries so cross-repository handoffs and everyday lifecycle requests select the correct local structure.
5. Add or revise focused tests and run the relevant mechanical audits against both adapters.

## Files touched

- `skills/knowledge-bases/ki-kb-streams/`
- `skills/governance/ki-roadmap/`
- `skills/process/ki-recap/`
- `skills/process/ki-next/`
- `skills/process/ki-plan/`
- Relevant user guides, generated rubric publications, and focused tests.

## Verify

- `ki skill rubric ki-kb-streams --write`
- `ki repo audit --skill ki-kb-streams --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No implementation blocker is known. The semantic mapping in step 1 is the first review gate; do not begin a base rollout until the harness contract and its tests are accepted.
