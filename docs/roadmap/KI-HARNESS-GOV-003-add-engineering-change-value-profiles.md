---
id: KI-HARNESS-GOV-003
title: Add engineering change value profiles to the verb map
theme: governance-consistency
horizon: soon
status: open
blocks: []
blocked-by: []
baseline-ref: null
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

## Discussion

### Comparison shape

The profile should retain several visible dimensions and their evidence so trade-offs remain inspectable rather than producing a single ranking number.

### Missing verb-map owner

The item title refers to a verb map that is not currently a repository artefact.

The shaping work therefore begins by resolving ownership rather than creating a second ungoverned map.
