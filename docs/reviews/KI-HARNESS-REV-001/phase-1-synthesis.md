# Phase 1 synthesis

Phase 1 reviewed all six foundation skills against the immutable baseline. Every review is complete and ungraded. Each currently proposes `revise`; none proposes retirement, consolidation, splitting, or replacement with automation.

## Dependency and ownership reconciliation

The existing order remains valid. No cycle, unknown dependency, or new hard dependency was found.

- `ki-repo` remains the semantic owner of `.ki-config.toml`, including table identity and the one-table-per-skill contract. `ki-authoring` should own TOML presentation rather than duplicate that judgment.
- `ki-delegation` remains independent as a governance capability, but its defensible scope is the durable, portable packet delta. Ordinary runtime delegation and process execution guidance should not be restated as its unique value.
- `ki-engineering` remains the shared toolchain owner, but its decision-record authority and hard-coded version evidence need reconciliation.
- `ki-skills` remains the review-method owner and requires a final whole-set recheck after later phases expose additional rubric and evaluation patterns.

These findings do not require a review-order change before Phase 2.

## Cross-cutting findings

1. **Mechanical conformance is substantially stronger than outcome evidence.** All six focused audits pass, but most checks prove structure, catalogue integrity, or bounded mutation rather than assisted-versus-baseline value.
2. **Historical eval evidence is not a reliable baseline.** Result logs are ignored and absent from the immutable baseline; several scenarios encode retired syntax or recall instead of outcome improvement.
3. **Source authority has drifted.** Current upstream versions, moved documentation, missing primary authorities, and contradictory local decisions recur across the phase.
4. **Judgment-only criteria are easy to overread.** A clean report can coexist with unresolved usefulness, scope, and authority questions because the host does not mechanically execute those judgments.
5. **Ownership must be exclusive at semantic boundaries.** TOML semantics and delegation procedure both show how duplicated judgment increases context and permits conflicting contracts.

## Phase boundary decision

Phase 2 may proceed in the existing order. The foundation findings are sufficiently reconciled for evidence collection, but they do not authorise source-record edits, normative changes, remediation, or grades. The final matrix must keep structural passes separate from outcome evidence and apply the same standard to every change-management skill.
