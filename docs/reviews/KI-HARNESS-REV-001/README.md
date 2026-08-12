# KI-HARNESS-REV-001 review evidence

This directory records the ungraded evidence for [KI-HARNESS-REV-001](../../roadmap/KI-HARNESS-REV-001-review-skill-effectiveness.md).

- **Immutable baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`
- **Inventory:** [50-skill baseline](inventory.md)
- **Standing-guidance review:** recorded in the roadmap item
- **Grading:** not assigned; the vocabulary and final grades remain an approval gate
- **Remediation:** Phase 1 and Phase 2 proposals were approved on 2026-08-12; each skill record distinguishes applied work from remaining gaps

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

Phase 0 and dependency ordering are complete. Phase 1 and Phase 2 review and remediation are complete. Phase 3 is complete. Phase 4 review is in progress; Phases 5–6 are pending.

| #  | Skill                                        | Review   | Change state | Evidence   |
| -: | -------------------------------------------- | -------- | ------------ | ---------- |
| 1  | [`ki-skills`](ki-skills.md)                  | complete | applied      | `ba4bd18a` |
| 2  | [`ki-authoring`](ki-authoring.md)            | complete | applied      | `ba4bd18a` |
| 3  | [`ki-git`](ki-git.md)                        | complete | applied      | `ba4bd18a` |
| 4  | [`ki-engineering`](ki-engineering.md)        | complete | applied      | `ba4bd18a` |
| 5  | [`ki-repo`](ki-repo.md)                      | complete | applied      | `ba4bd18a` |
| 6  | [`ki-delegation`](ki-delegation.md)          | complete | applied      | `ba4bd18a` |
| 7  | [`ki-change-management`](ki-change-management.md) | complete | applied  | `76173ee7` |
| 8  | [`ki-change-management-roadmap`](ki-change-management-roadmap.md) | complete | applied | `76173ee7` |
| 9  | [`ki-change-management-github-issues`](ki-change-management-github-issues.md) | complete | applied | `76173ee7` |
| 10 | [`ki-change-management-linear`](ki-change-management-linear.md) | complete | applied | `76173ee7` |
| 11 | [`ki-change-management-housekeeping`](ki-change-management-housekeeping.md) | complete | applied | `76173ee7` |
| 12 | [`ki-recap`](ki-recap.md)                     | complete | applied      | `76173ee7` |
| 13 | [`ki-next`](ki-next.md)                       | complete | applied      | `a1483153` |
| 14 | [`ki-plan`](ki-plan.md)                       | complete | applied      | `a1483153` |
| 15 | [`ki-batch`](ki-batch.md)                     | complete | applied      | `cab06c4e` |
| 16 | [`ki-implement`](ki-implement.md)             | complete | applied      | `cab06c4e` |
| 17 | [`ki-accept`](ki-accept.md)                   | complete | applied      | `7143bf33` |
| 18 | [`ki-decision-records`](ki-decision-records.md) | complete | review only | —          |
| 19 | [`ki-specs`](ki-specs.md)                     | complete | review only  | —          |
| 20 | [`ki-guides`](ki-guides.md)                   | complete | review only  | —          |
| 21 | [`ki-checkpoint`](ki-checkpoint.md)           | complete | review only  | —          |
| 22 | [`ki-trades`](ki-trades.md)                   | complete | review only  | —          |
| 23 | [`ki-trade`](ki-trade.md)                     | complete | review only  | —          |
| 24 | [`ki-agora`](ki-agora.md)                     | complete | review only  | —          |
| 25 | [`ki-communication`](ki-communication.md)     | complete | review only  | —          |
| 26 | [`ki-subagents`](ki-subagents.md)             | complete | review only  | —          |
| 27 | [`ki-repo-project`](ki-repo-project.md)       | complete | review only  | —          |
| 28 | [`ki-repo-kb-activities`](ki-repo-kb-activities.md) | complete | review only | —          |
| 29 | [`ki-repo-kb-live-artifacts`](ki-repo-kb-live-artifacts.md) | complete | review only | —          |
| 30 | [`ki-repo-kb-streams`](ki-repo-kb-streams.md) | complete | review only  | —          |
| 31 | [`ki-repo-kb`](ki-repo-kb.md)                 | complete | review only  | —          |
| 32 | [`ki-repo-kb-principal`](ki-repo-kb-principal.md) | complete | review only | —          |
| 33 | [`ki-repo-specifications`](ki-repo-specifications.md) | complete | review only | —          |
| 34 | [`ki-repo-mcp`](ki-repo-mcp.md)               | complete | review only  | —          |
| 35 | [`ki-repo-website`](ki-repo-website.md)       | complete | review only  | —          |
| 36 | [`ki-repo-website-cloudflare`](ki-repo-website-cloudflare.md) | complete | review only | —          |
| 37 | [`ki-repo-plugins`](ki-repo-plugins.md)       | complete | review only  | —          |

The [Phase 1 synthesis](phase-1-synthesis.md) and [Phase 2 synthesis](phase-2-synthesis.md) retain cross-skill conclusions. Detailed applied changes and remaining gaps live only in each skill record.

## Evidence rules

- Facts cite a repository path, immutable commit, command result, or current source.
- Inferences and gaps are labelled; missing evidence never becomes a synthetic pass or failure.
- Historical eval logs are advisory and are not baseline evidence when absent from the baseline commit.
- A source refresh separates portable authority, runtime overlays, house authority, and supporting discovery material.
- Every later review applies the cumulative calibration checklist; phase synthesis adds only genuinely new, generalised checks.
- No review record edits the skill it assesses.
