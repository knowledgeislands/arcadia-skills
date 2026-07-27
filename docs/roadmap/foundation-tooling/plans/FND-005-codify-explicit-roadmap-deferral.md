---
id: 'FND-005'
title: Codify explicit roadmap deferral
status: in-progress
roadmap: foundation-tooling/codify-explicit-roadmap-deferral-in-ki-next
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Make `defer` an explicit, user-confirmed `ki-next` horizon-transition operation without retaining temporary `_(promote)_` or `_(defer)_` annotations in canonical roadmap headings. It complements promotion and must remain distinct from the runtime-native `ki-plan promote` command.

## Current state

`ki-roadmap` defines readiness for Future-to-Soon, Soon-to-Next, and Waiting-for re-entry, while `ki-next` describes confirmed promotion. Neither names a reverse, later-horizon operation. Its handoff procedure still says empty `_HANDOFFS` directories and READMEs should be removed, contradicting the now-required `ki-repo` working-area scaffold.

## Steps

1. Define the portable transition vocabulary and ownership: `ki-roadmap` continues to own honest horizon rules; `ki-next` applies user-confirmed promote and defer operations; `ki-plan promote` remains a distinct runtime-plan conversion.
2. Specify valid deferral destinations and evidence: Next or Blocking work moves to Soon when understood but not immediate, to Waiting for only with a named external condition, or to Future with `_(candidate)_` when it needs re-scoping. Preserve ordinary-plan constraints and require explicit handling of any existing plan.
3. Update `ki-next` selection/relevance procedures, help/description, examples, and scenario table so every move presents exact wording, destination, order, and consequences for confirmation. Do not add persistent marker syntax to roadmap items.
4. Reconcile `ki-next` handoff guidance with the fixed `ki-repo` scaffold: resolved handoff briefs are removed, while the canonical direction, subdirectory, and README orientation remain.
5. Update `ki-roadmap` transition guidance and judgment criterion wording only where needed to express the shared vocabulary without taking process ownership. Add focused tests or scenarios for promotion, each deferral destination, plan constraints, and fixed-scaffold handoff cleanup.
6. Regenerate affected rubric publications, run focused process/roadmap/repository checks, and document the final user-facing invocation and terminology.

## Files touched

- `skills/process/ki-next/SKILL.md` and `references/standards-next-work.md`.
- `skills/governance/ki-roadmap/references/standards-repository-roadmaps.md` and its transition rubric only if shared vocabulary changes.
- `skills/keystone/ki-repo` references only if the fixed-scaffold contract needs a clarified cross-reference.
- Related focused tests, generated rubric publications, user process documentation, and this plan.

## Verify

- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-repo --repo .`
- `bun run test` and `bunx tsc --noEmit`
- Scenario review proves that no roadmap move occurs without explicit confirmation, Future deferrals retain `_(candidate)_`, working-area orientation persists after handoff resolution, and `ki-plan promote` remains unambiguous.

## Dependencies / blocks

No plan dependency. The fixed working-area scaffold is already committed; this plan reconciles the stale process wording before relying on its handoff flow.
