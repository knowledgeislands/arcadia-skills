---
id: 'FND-005'
title: Codify explicit roadmap deferral
status: done
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

1. ✓ Define the portable transition vocabulary and ownership: `ki-roadmap` continues to own honest horizon rules; `ki-next` applies user-confirmed promote and defer operations; `ki-plan promote` remains a distinct runtime-plan conversion.
2. ✓ Specify valid deferral destinations and evidence: Next or Blocking work moves to Soon when understood but not immediate, to Waiting for only with a named external condition, or to Future with `_(candidate)_` when it needs re-scoping. Preserve ordinary-plan constraints and require explicit handling of any existing plan.
3. ✓ Update `ki-next` selection/relevance procedures, help/description, examples, and scenario table so every move presents exact wording, destination, order, and consequences for confirmation. Do not add persistent marker syntax to roadmap items.
4. ✓ Reconcile `ki-next` handoff guidance with the fixed `ki-repo` scaffold: resolved handoff briefs are removed, while the canonical direction, subdirectory, and README orientation remain.
5. ✓ Update `ki-roadmap` transition guidance and judgment criterion wording only where needed to express the shared vocabulary without taking process ownership. Add focused tests or scenarios for promotion, each deferral destination, plan constraints, and fixed-scaffold handoff cleanup.
6. ✓ Regenerate affected rubric publications, run focused process/roadmap/repository checks, and document the final user-facing invocation and terminology.

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

## Acceptance

### Delivered

Codified `ki-next` deferral as an explicit, confirmed later-horizon operation and reconciled it with the permanent handoff working-area scaffold.

### Summary of changes

- Added `defer <item> <soon|waiting-for|future>` to `ki-next`, including exact confirmation, destination, wording, and plan-handling requirements.
- Defined the only honest destinations: Soon for understood but non-immediate work, Waiting for with a named external condition, and Future with `_(candidate)_` for re-scoping.
- Made ordinary plan state a hard stop for deferral; `ki-next` cannot silently detach, reopen, or delete a plan.
- Kept `ki-plan promote` distinct from roadmap promotion or deferral.
- Corrected `ki-next` so required `_HANDOFFS/README.md` orientation remains after briefs are resolved.
- Updated `ki-roadmap`’s transition criterion and regenerated its rubric publication.

### Verification

At `40737329`, the focused roadmap catalogue test, TypeScript, `ki repo audit --skill ki-roadmap --repo .`, and `ki repo audit --skill ki-skills --repo .` passed.

At `bb852f63`, `bun run test` passed with 190 tests, along with `bunx tsc --noEmit` and both focused audits.

### Outstanding concerns

None.

### Mini recap

Horizon movement is authored work, not a marker convention. A later-horizon move needs the same explicit evidence and confirmation discipline as a promotion, and it cannot be used to bypass a plan lifecycle.

## Done

Recorded done after explicit user acceptance. No residual concern or follow-up is required within this plan.
