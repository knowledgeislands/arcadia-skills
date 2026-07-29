---
id: KI-HARNESS-GOV-003
title: Add engineering change value profiles to the verb map
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 02df2024e850dc64ce5c757bfc54ee870ecaaadd
---

## Context

Define an evidence-backed way to compare engineering changes across capability, comprehensibility, maintenance reduction, reliability, leverage, delivery cost, and reversibility.

## Boundary

Inform roadmap ordering without collapsing work into one misleading score or adding ceremony to small fixes.

## Shaping

### Intended approach

Identify the canonical owner of the existing multi-factor comparison language, which currently appears only in `ki-next`'s selection procedure.

Define one concise, evidence-oriented profile that exposes capability, comprehensibility, maintenance reduction, reliability, leverage, delivery cost, reversibility, readiness, and dependency availability without computing a score.

Apply it only when `ki-next` compares viable candidates or a human asks for a material engineering-change comparison; focused fixes keep the existing lightweight selection path.

### Known dependencies

The `ki-next` procedure already requires a visible multi-factor comparison and provides the starting vocabulary.

No CLI command, tracker, scoring system, or repository-wide metadata field is in scope.

### Decision still needed

Decide whether the profile belongs solely in `ki-next`'s procedure or needs a shared standard with a named receiving owner.

The current repository has no independent verb map, so this cannot yet be an additive update to one.

### Promotion conditions

Promote when one canonical owner and one concise presentation shape are selected, and the change can be bounded to named process or standard files without introducing score-driven ceremony.

## Current state

`ki-next` already asks for an evidence-backed comparison of benefit, leverage, risk reduction, delivery cost, reversibility, readiness, and dependency availability.

It does not name the comparison as a reusable profile or include comprehensibility, maintenance reduction, and reliability explicitly.

## Steps

1. Make `ki-next` the sole owner of a concise change-value profile used only when ranking viable material candidates or when a human requests a material comparison.
2. State the visible dimensions: capability, comprehensibility, maintenance reduction, reliability, leverage, delivery cost, reversibility, readiness, and dependency availability.
3. Require short evidence for relevant dimensions and prohibit a composite score, stored per-item metadata, or a new tracker.
4. Add one worked comparison illustrating a trade-off without pretending that the profile chooses work automatically.

## Files touched

- `skills/process/ki-next/SKILL.md` only if its concise ownership statement needs alignment
- `skills/process/ki-next/references/standards-next-work.md`
- `skills/process/ki-next/references/exemplars.md` if the worked comparison is clearer there
- this work-item record

## Verify

- The dimensions are visible and evidence-oriented, not scored or collapsed into a rank.
- Focused single-step work retains the lightweight path.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

This item is independent.

## Discussion

### Comparison shape

The profile should retain several visible dimensions and their evidence so trade-offs remain inspectable rather than producing a single ranking number.

### Missing verb-map owner

The item title refers to a verb map that is not currently a repository artefact.

The shaping work therefore begins by resolving ownership rather than creating a second ungoverned map.

### Ownership decision

The profile belongs to `ki-next`, the existing owner of candidate comparison; no independent verb-map artefact is created.
