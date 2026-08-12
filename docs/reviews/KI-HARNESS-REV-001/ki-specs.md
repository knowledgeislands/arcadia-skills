# `ki-specs` effectiveness review

**Review state:** complete, ungraded **Candidate disposition:** revise

## Dependency and ownership

`ki-specs` independently owns behaviour-level “what” documentation, while Decision Records and guides retain “why” and “how”. Its selection description and 61-line entrypoint are economical and concrete. The as-built/Gaps model plausibly improves on generic requirements guidance, but there is no assisted-versus-baseline or operational result evidence.

Two internal authority conflicts prevent a clean contract:

1. The entrypoint and NEW procedure allocate serials per prefix, while the standard and exemplar allocate them per file, and one file may contain multiple prefixes. The checker enforces neither interpretation.
2. ADR-007 says an incidental target without `docs/specs` is not applicable, while the current context emits an `INDEX-1` failure. Declared capability activation and incidental discovery need one host-visible applicability rule.

This review does not select either policy.

## Mechanical trace and limits

The 15-item catalogue and publication are in sync. Six focused tests and the hosted audit pass. Current checks cover the index and areas table, registered files, heading grammar, prefix-to-file assignment, duplicate current IDs, RFC keyword presence, `_Verify:_` text, containment, and symlink refusal.

Material false-assurance paths remain:

- A requirement envelope continues until the next valid requirement or end of file, so a normative word or `_Verify:_` in a later H2 or Gaps section can satisfy the previous requirement.
- Missing `_Verify:_` is only a warning despite being mandatory in the standard.
- A duplicate prefix mapping in the index is silently overwritten.
- Current-corpus uniqueness does not prove sequential allocation or historical non-reuse.
- H1, scope, H2 and Gaps placement, and most index content are stated but absent from the catalogue.
- Tests do not cover applicability, duplicate table ownership, requirement boundaries, serial policy, deprecated forms, or host-visible severity.

The existing evals are three regex recall scenarios, not executed outcome comparisons or adversarial audit results.

## Source authority

The source record incorrectly presents RFC 2119 alone as BCP 14 and does not give a reproducible locator for the Vallearmonia reference corpus. [RFC 2119](https://www.rfc-editor.org/info/rfc2119/) is updated by [RFC 8174](https://www.rfc-editor.org/info/rfc8174/); RFC 8174 establishes uppercase-only normative interpretation and includes `NOT RECOMMENDED`, which the checker accepts but the local standard omits. The RFC pair is portable primary authority. The local decision and standard are house authority. Vallearmonia remains supporting discovery until pinned to a stable source and sampled revision.

## Candidate improvements

1. Parse one bounded requirement envelope ending at every next H3 or H2, and make mandatory verification fail at the severity promised by the standard; add adversarial host-visible fixtures.
2. Reconcile serial scope and applicability policy once, then align SKILL, modes, standard, exemplar, catalogue, tests, publication, evals, and host behaviour without parallel interpretations.
3. Register RFC 2119 plus RFC 8174 as the primary BCP 14 pair and align the keyword list.
4. Give the supporting reference corpus a stable URL and immutable sampled revision, or remove/demote it.

## Carry-forward criteria

Identity scope must be singular and mechanically enforceable across every contract surface. Applicability must distinguish declared activation from incidental discovery. Evidence for a requirement must remain inside that requirement's envelope. A clean structural audit must not be presented as authoring or outcome effectiveness.

## Local evidence

- `skills/governance/ki-specs/SKILL.md`
- `skills/governance/ki-specs/references/standards-specs.md`
- `skills/governance/ki-specs/references/mode-new.md`
- `skills/governance/ki-specs/references/mode-conform.md`
- `skills/governance/ki-specs/references/exemplars.md`
- `skills/governance/ki-specs/references/sources.md`
- `skills/governance/ki-specs/scripts/rubric/contexts/specs.ts`
- `skills/governance/ki-specs/scripts/rubric/contexts/specs.test.ts`
- `skills/governance/ki-specs/scripts/rubric/items/index.ts`
- `skills/governance/ki-specs/scripts/rubric/items/verification.ts`
- `docs/decisions/GDR-KI-HARNESS-004-four-doc-repository-documentation-ownership.md`
- `docs/decisions/ADR-KI-HARNESS-007-uniform-skill-modes-bare-mode-scripts-and-a-coverage-scoped-aggregate-gate.md`
- `evals/scenarios/ki-specs.ts`
