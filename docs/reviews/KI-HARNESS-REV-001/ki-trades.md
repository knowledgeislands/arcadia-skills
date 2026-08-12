# `ki-trades` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised

## Dependency and ownership

`ki-trades` owns the typed directional protocol, its two `_TRADES` scaffolds, and configuration. It correctly separates sender publication from receiver priority, implementation, and acceptance. Its immutable sender projection and independent receipt, decision, and release axes provide value that ordinary local work guidance does not.

No live records exist beyond scaffolds, so outcome value is demonstrated only by fixture logic rather than estate use.

## Mechanical trace and limits

The hosted audit, publication check, and 24 focused tests with 67 expectations pass. The checker covers closed fields, routes, phases, paths, identities, receiver-local fields, projection integrity, observation-led release, and local-only scaffold conformance.

Material gaps remain:

- The standard permits non-default partners as full canonical HTTPS keys, but checker grammar, two-segment paths, and peer projection are GitHub owner/repository-only.
- Completion release accepts any matching `id` and `status: done` Markdown file under hard-coded local paths. It bypasses the selected adapter and owner-valid canonical-record checks.
- `received_from_ref` and `applied_commit` are checked as hexadecimal strings, not verified Git objects or relations, despite stronger wording.
- There is no exact eval, live two-repository lifecycle result, non-default-host fixture, adapter-negative completion fixture, or Git-object validation fixture.

## Source authority

The internal GDR and `ki-repo` registry contract are the house authorities. GitHub documentation provides supporting committed-history context but does not define this protocol. The non-default HTTPS portability claim requires reconciliation with the registry identity owner before implementation chooses a representation.

## Candidate improvements

1. Resolve adopted completion through the selected adapter and require an owner-valid canonical record; unresolved and remote adapters must fail closed.
2. Reconcile non-default HTTPS identities across `ki-repo`, configuration, record paths, and peer projection before claiming portability.
3. Validate Git object/reference integrity before calling a reference verified, or narrow the claim to syntax.
4. Add end-to-end two-repository and negative lifecycle evidence.

## Carry-forward criteria

Completion, release, and pruning evidence must not come from a path scan detached from selected-adapter authority. A portable identity claim must be representable by its configuration grammar, filesystem projection, checker, and host.

## Local evidence

- `skills/governance/ki-trades/SKILL.md`
- `skills/governance/ki-trades/references/standards-trades.md`
- `skills/governance/ki-trades/references/sources.md`
- `skills/governance/ki-trades/scripts/rubric/contexts/trades.ts`
- `skills/governance/ki-trades/scripts/rubric/contexts/trades.test.ts`
- `docs/decisions/GDR-KI-HARNESS-005-cross-repository-trade-routes.md`
