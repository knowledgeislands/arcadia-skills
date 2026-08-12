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

## Cumulative calibration

Each completed review or phase may expose a reusable effectiveness check. Distil that pattern here once, without copying the originating skill's line-by-line findings. Apply the resulting checklist to every later review, and recheck the earlier records against the complete checklist during final synthesis. A new pattern supplements the common record; it does not silently change a normative skill rubric or authorise remediation.

- Separate structural conformance from demonstrated outcome value; a clean audit is not effectiveness evidence.
- For every deterministic contract, trace criterion policy through inspector output, published catalogue, host-visible result, and focused tests. Reject orphan finding codes, incorrect criterion mappings, and tests that assert raw inspector output while missing the hosted outcome.
- Mechanise deterministic evidence as far as practical while leaving usefulness, authority, and other genuine judgment visibly unevaluated rather than manufacturing a pass.
- Test the contract users depend on, including negative paths, false positives, false negatives, failure propagation, and assisted-versus-baseline value, rather than only file shape or recall.
- Classify source authority explicitly, refresh volatile runtime and platform claims, and reconcile current primary sources with local standards and decision records.
- Give each semantic rule and lifecycle transition one owner; detect duplicated or contradictory guidance across skills, standards, processes, and standing instructions.
- Resolve selected adapters, dependencies, repository kinds, and runtime capabilities rather than validating only a literal name or assuming a local implementation path.
- Treat identifiers, locators, namespace moves, aliases, and record migrations as explicit continuity contracts; do not assume a displayed key is stable identity.
- Verify that approval scope and integrity cannot widen through unparsed prose, duplicate identifiers, stale reads, or an unverified handoff between producers and consumers.
- Make failures and unavailable evidence fail closed; never translate an error, unsupported runtime, or incomplete observation into clean state.
- Reconcile exact schemas and state machines across every producer and consumer, including completion, abandonment, replacement, retention, and recovery paths.
- Keep descriptions and operational claims within demonstrated execution capability; configuration or guidance alone must not imply that a process can execute.
- Exercise destructive and filesystem boundaries with exact roots, containment, regular-file and symlink checks, retention guards, and independently resolved targets.
- Count ceremony, loaded context, repeated procedures, and tool round-trips as costs; retain them only where evidence shows a portable benefit.

## Progress

- Phase 0 standing guidance: complete.
- Inventory and dependency baseline: complete.
- Phase 1: complete. [`ki-skills`](ki-skills.md), [`ki-authoring`](ki-authoring.md), [`ki-git`](ki-git.md), [`ki-engineering`](ki-engineering.md), [`ki-repo`](ki-repo.md), and [`ki-delegation`](ki-delegation.md) each currently propose `revise` before grading.
- Phase 1 dependency and ownership reconciliation: [complete](phase-1-synthesis.md); no review-order change required.
- Phase 2: in progress. [`ki-change-management`](ki-change-management.md), [`ki-change-management-roadmap`](ki-change-management-roadmap.md), [`ki-change-management-github-issues`](ki-change-management-github-issues.md), and [`ki-change-management-linear`](ki-change-management-linear.md) propose `revise`; no order change is required.
- Phase 2 continued: [`ki-change-management-housekeeping`](ki-change-management-housekeeping.md), [`ki-recap`](ki-recap.md), and [`ki-next`](ki-next.md) also propose `revise`; lifecycle and runtime conflicts are recorded without remediation.
- Phase 2: complete. [`ki-plan`](ki-plan.md), [`ki-batch`](ki-batch.md), [`ki-implement`](ki-implement.md), and [`ki-accept`](ki-accept.md) propose `revise`; the [phase synthesis](phase-2-synthesis.md) reconciles ownership and preserves the existing order.
- Phases 3–6: pending.
- Phases 3–6: pending.

## Evidence rules

- Facts cite a repository path, immutable commit, command result, or current source.
- Inferences and gaps are labelled; missing evidence never becomes a synthetic pass or failure.
- Historical eval logs are advisory and are not baseline evidence when absent from the baseline commit.
- A source refresh separates portable authority, runtime overlays, house authority, and supporting discovery material.
- Every later review applies the cumulative calibration checklist; phase synthesis adds only genuinely new, generalised checks.
- No review record edits the skill it assesses.
