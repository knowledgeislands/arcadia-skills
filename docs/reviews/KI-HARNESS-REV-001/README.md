# KI-HARNESS-REV-001 review evidence

This directory records the ungraded evidence for [KI-HARNESS-REV-001](../../roadmap/KI-HARNESS-REV-001-review-skill-effectiveness.md).

- **Immutable baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`
- **Inventory:** [50-skill baseline](inventory.md)
- **Standing-guidance review:** recorded in the roadmap item
- **Grading:** not assigned; the vocabulary and final grades remain an approval gate
- **Remediation:** proposals only; review records do not authorise edits to a reviewed skill

## Common record

Every skill review records the same evidence:

1. Identity, review position, kind, declared dependencies, and dependency-order result.
2. Source-list presence or an explicit decision that one is unnecessary; current source checks and watch-items where applicable.
3. Exact repository and focused mechanical audit evidence, structured-rubric presence, and focused tests.
4. Selection effectiveness: trigger quality, false activation, off-ramps, and standing context cost.
5. Outcome effectiveness: assisted-versus-baseline evidence, negative evidence, and unnecessary ceremony.
6. Instruction economy: body size, progressive disclosure, repeated detail, tool round-trips, and automation opportunities.
7. Architecture and ownership: scope, portability, dependencies, shared modules, collisions, and correct delivery shape.
8. Executability and safety: commands, runtime assumptions, authority, stop conditions, recovery, and examples.
9. Evidence quality: eval scenarios, result limitations, fixture coverage, and false-positive or false-negative risk.
10. Explicit gaps, one proposed disposition, and any candidate findings in the `ki-skills` candidate shape.

The allowed proposed dispositions are `retain`, `revise`, `consolidate`, `split`, `replace with automation`, and `retire`. They are recommendations, not grades or accepted work.

## Progress

- Phase 0 standing guidance: complete.
- Inventory and dependency baseline: complete.
- Phase 1: complete. [`ki-skills`](ki-skills.md), [`ki-authoring`](ki-authoring.md), [`ki-git`](ki-git.md), [`ki-engineering`](ki-engineering.md), [`ki-repo`](ki-repo.md), and [`ki-delegation`](ki-delegation.md) each currently propose `revise` before grading.
- Phase 1 dependency and ownership reconciliation: [complete](phase-1-synthesis.md); no review-order change required.
- Phase 2: in progress. [`ki-change-management`](ki-change-management.md), [`ki-change-management-roadmap`](ki-change-management-roadmap.md), [`ki-change-management-github-issues`](ki-change-management-github-issues.md), and [`ki-change-management-linear`](ki-change-management-linear.md) propose `revise`; no order change is required.
- Phase 2 continued: [`ki-change-management-housekeeping`](ki-change-management-housekeeping.md), [`ki-recap`](ki-recap.md), and [`ki-next`](ki-next.md) also propose `revise`; lifecycle and runtime conflicts are recorded without remediation.
- Phases 3–6: pending.

## Evidence rules

- Facts cite a repository path, immutable commit, command result, or current source.
- Inferences and gaps are labelled; missing evidence never becomes a synthetic pass or failure.
- Historical eval logs are advisory and are not baseline evidence when absent from the baseline commit.
- A source refresh separates portable authority, runtime overlays, house authority, and supporting discovery material.
- No review record edits the skill it assesses.
