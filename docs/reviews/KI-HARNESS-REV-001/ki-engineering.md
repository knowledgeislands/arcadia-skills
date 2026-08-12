# `ki-engineering` effectiveness review

- **Position:** 4 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `e15fb4f390e51d3e7f69cf285fceb3385bed5dbf` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the common engineering layer; resolve source and decision authority, checker coverage, and outcome evidence before grading.

## Sources and mechanics

`ki repo audit --skill ki-engineering --repo .` passed with `FAIL=0 WARN=0`. Its focused catalogue test passed 8 tests and 87 assertions.

The tracked upstream set was re-fetched. Material repository evidence shows that the source record and live defaults have drifted: it records older Biome and TypeScript pins than the Harness's `2.5.7` and `^7.0.2`, while [rumdl 0.2.54](https://github.com/rvben/rumdl/releases) is newer than the local `^0.2.52` range. The source record's sibling-repository counts also disagree with current local inspection. Exact pins and fleet counts should be derived or refreshed, not copied across several prose surfaces.

There is a direct authority conflict: ADR-KI-HARNESS-TOOLCHAIN-001 still requires `ki:lint:*`, `ki:deps:*`, `ki:knip`, and `ki:verify`, while the current engineering standard says that ADR retired them and requires native rubric execution instead. Both cannot be current authority. The ADR must be amended or superseded before the standard can cite it for the opposite decision.

## Selection and outcome effectiveness

The description selects well for Knowledge Islands toolchain, testing-boundary, package-script, and architecture audits with reciprocal off-ramps. The broad “is this code too DRY” trigger risks selection for generic design advice and should be tested rather than assumed useful.

The skill materially improves house-specific outcomes: direct `ki repo` ownership, Bun test discovery traps, configuration-gated Vitest, common versus artifact-specific layering, generated-surface exclusions, script ownership, and executable-bit handling. These concerns justify a reusable skill rather than standing orientation or a single hook.

## Instruction economy and architecture

The 88-line entrypoint routes detail to one standard, generated rubric, sources, and exemplars. The common/artifact boundary is coherent, and splitting it would add selection cost.

Duplicated pin truth is the main economy defect. Source records, exemplars, generated defaults, and live packages can disagree, making REFRESH and CONFORM expensive and error-prone. The existing `KI-HARNESS-GOV-007` item already owns the move from hard-coded package-script matching to host-aggregated skill claims; this review does not create a duplicate candidate.

## Executability and safety

Audit invokes direct read-only tool checks; CONFORM exposes only bounded writes or guarded commands. Focused tests cover wrapper retirement, safe action coalescing, symlink refusal, KNIP non-repair, and emitter behavior. Fixed internal `/bin/sh -c` command strings contain no observed user interpolation, but the shell dependency weakens an otherwise portable claim and should remain explicit.

## Evidence and gaps

The structured checker does not cover every requirement it publishes. The build-profile standard names `rootDir`, `declarationMap`, and `allowImportingTsExtensions`, while current BUILD evidence checks only a subset. The `checks` subtable is documented as allowed but is not parsed into a validated key set. These are false-negative risks despite the clean focused audit.

Three behavioural scenarios exist but are regex recall checks, and the available matrix logs contain no `ki-engineering` rows. There is no checked-in assisted-versus-baseline result for stale-pin decisions, conditional profiles, generated exports, or ownership routing.

## Proposed remediation

These proposals are not approved implementation:

1. Reconcile source records, live pins, exemplars, generated defaults, and primary authority for each versioned claim.
2. Amend or supersede ADR-KI-HARNESS-TOOLCHAIN-001 so the decision record and current native-rubric standard agree.
3. Add fixtures for omitted build fields and validate the documented `checks` subtable without converting judgment into synthetic passes.
4. Replace recall-only evaluation with current assisted-versus-baseline tasks for stale pins, conditional profiles, and generated/public KNIP entries.
5. Retain `KI-HARNESS-GOV-007` as the owner of package-script claim aggregation.

No new skill, agent, hook, or standalone script is proposed.

## Applied changes

**State:** applied in `ba4bd18a`.

Reconciled declared tool ranges, lock resolutions, current upstream sources, and the toolchain decision. Replaced retired aliases with native operations, expanded build-field validation, made documented check records mechanically exact without manufacturing judgment passes, aligned generated defaults, and replaced recall-only evals with concrete scenarios.
