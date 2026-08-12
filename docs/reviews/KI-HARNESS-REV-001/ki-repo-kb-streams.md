# `ki-repo-kb-streams` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved Phase 4 remediation applied
- **Identity:** position 30 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-kb-streams` usefully establishes the `Streams/Roadmap/` and `Streams/Housekeeping/` containers, and the current Arcadia and Techne estates pass. Its configuration accepts `[skills.ki-repo-kb-streams.areas]` but never validates or uses that table. The roadmap adapter separately owns issuing areas at `[skills.ki-change-management-roadmap.areas]`, which is absent when KB Streams is the selected adapter.

This leaves area identity and allocation advertised in one contract but operationally owned by another unavailable adapter.

## Mechanical trace and limits

`GATE-1` uses a weak keyword anchor rather than validating the authoritative gate. Most operating modes redirect elsewhere, and there are no negative fixtures for record integrity, ledger resolution, selected-adapter behavior, or symlinks. The exact eval still uses retired Focus/proposal terminology and statuses.

Clean estate audits demonstrate current container shape, not the configured areas or lifecycle promises.

The canonical on-change source was reviewed on 2026-08-09. Nine focused tests with 19 assertions pass; they cover catalogue shape, read-only conform, absent-zone applicability, current containers, legacy Focus detection, and the gate trigger, but not the semantic gaps above.

## Candidate improvements

1. Give selected KB Streams area configuration one executable owner and reconcile it with the roadmap adapter and base selector.
2. Replace the obsolete eval with current record, ledger, identity, and lifecycle scenarios.
3. Strengthen gate validation and add selected-adapter, malformed-record, and filesystem-boundary fixtures.

## Applied changes

The checker rejects inert `areas` and retired configuration, consumes `process_note` as a contained regular-file binding, and uses the current flat Roadmap and Housekeeping layout. Selected-adapter execution remains outside this structural skill.

## Carry-forward criteria

Accepted configuration must be consumed or rejected; silently inert tables create false assurance. Adapter-specific concepts must remain executable when that adapter is selected.

## Local evidence

- `skills/repo-structure/ki-repo-kb-streams/SKILL.md`
- `skills/repo-structure/ki-repo-kb-streams/references/standards-streams.md`
- `skills/repo-structure/ki-repo-kb-streams/scripts/rubric/contexts/streams.ts`
- `skills/repo-structure/ki-change-management-roadmap/references/standards-roadmap.md`
- `evals/scenarios/ki-repo-kb-streams.ts`
