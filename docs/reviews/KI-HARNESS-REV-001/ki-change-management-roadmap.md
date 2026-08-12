# `ki-change-management-roadmap` effectiveness review

- **Position:** 8 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `28ca93c80e74cc9b59e0f2b4596ef474e183190d` plus current house-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none; it consumes `ki-repo` repository-kind evidence without declaring an executable dependency.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the operational flat-record adapter, but repair two high-severity audit false negatives and strengthen source and outcome evidence before grading.

## Sources and mechanics

The source list contains three house authorities: Knowledge Islands planning history, a chezmoi roadmap, and the KB Streams standard. No external source is needed for this intentionally local model, but the first two rows are labels rather than reproducible locators. Current house contracts continue to support a concise non-duplicating root orientation and a shared record format under the Streams container.

`ki repo audit --skill ki-change-management-roadmap --repo .` passed with `FAIL=0 WARN=0`. Its focused test passed 20 tests and 86 assertions, TypeScript passed, and the generated rubric is in sync. Those results do not reveal two independently confirmed code-to-catalogue defects.

## Selection and outcome effectiveness

The description precisely selects local work-item shape, identity, horizons, lifecycle, dependencies, and root-orientation drift. Repository-kind scope is valid: `ki-repo` owns `repo_type`, and a Knowledge Base must use the Streams container rather than create project roadmap artifacts.

One flat record enriched in place avoids duplicate issue and plan documents. The high-water ledger, immutable implementation baseline, required review packet, reciprocal dependencies, and explicit retained-completion/prune boundary materially improve local record safety and continuity. This is a real operational adapter, not merely configuration guidance.

## Instruction economy and architecture

The 57-line entrypoint progressively discloses detailed record and lifecycle rules through two standards. The surface is substantial but coherent for an owned artifact; splitting it would increase selection and composition cost.

The base selector owns the abstract adapter choice and interface. This skill owns the concrete five-status local lifecycle and work-item format, including its reuse inside the `ki-repo-kb-streams` container. Later process skills own authorised transitions. No dependency or review-order change is required.

## Executability and safety

CONFORM is appropriately bounded to the exact root orientation and an absent allocation ledger. It refuses malformed-ledger overwrite, record invention, lifecycle movement, prose rewriting, identifier reallocation, and unsafe work-item shapes. Focused tests cover both permitted repairs.

Audit correctness has two high-severity gaps:

1. The inspector emits `PROFILE-1` when `docs/roadmap/` is missing, not a directory, or contains a non-file. No published rubric criterion consumes `PROFILE-1`, so these findings disappear from the hosted audit.
2. Dependency failures are emitted as `ITEM-4`, but the mechanical dependency criterion consumes `ITEM-5`; `ITEM-4` is the judgment-only plain-language Goal criterion. Because hosted outcomes filter by exact code, missing, non-reciprocal, and active blockers can report a synthetic pass.

Existing tests assert raw inspector findings, not that every emitted failure reaches a hosted mechanical criterion.

## Evidence and gaps

Four prompt/regex scenarios cover in-place planning, identity/theme/horizon, one record home, and dependency recall. Historical logs are ignored and absent from the baseline, and no current result row exists. There is no assisted-versus-baseline evidence or end-to-end inspector-to-rubric coverage invariant.

## Proposed remediation

These proposals are not approved implementation:

1. Align `PROFILE-1` with a published criterion and emit dependency failures as `ITEM-5`.
2. Add a catalogue-to-inspector coverage assertion and host-visible outcome tests so no failure code can be orphaned or mapped to a judgment-only criterion.
3. Give every house source an exact repository/path or immutable reference and review date.
4. Add current outcome scenarios for missing roots, dependency failures, lifecycle integrity, guarded CONFORM, and KB scoping.
5. Retain selector-resolution work with the base owner rather than duplicating it in this adapter.

No new skill, agent, or hook is proposed. The code-alignment work is a candidate for a separately confirmed direct amendment to this skill.

## Later-process implications

`ki-next`, `ki-plan`, `ki-implement`, and `ki-accept` must be reviewed against this adapter's concrete record and state contract without treating a clean hosted audit as trustworthy until the confirmed publication mismatches are fixed. They must also resolve the base-selected adapter rather than infer a local path when a remote adapter is selected.
