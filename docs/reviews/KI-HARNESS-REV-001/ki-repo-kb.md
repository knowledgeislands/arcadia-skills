# `ki-repo-kb` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised
- **Identity:** position 31 of 50; governance; depends on `ki-repo-kb-activities` (28), `ki-repo-kb-live-artifacts` (29), and `ki-repo-kb-streams` (30); baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-kb` usefully aggregates the five-zone Knowledge Base model and declares Activities, Live Artifacts, and KB Streams as prerequisites. Current Arcadia and Techne focused aggregate audits pass, and the host invokes the component skills before the aggregate.

That composition does not reconcile their contracts. The aggregate claims universal, location-constrained `type`; Activities and Live Artifacts use incompatible non-type schemas; Decision Records require a different prefix-derived `type` plus `type_url`; and KB Streams has moved to flat adapter-owned Roadmap records while the aggregate still prescribes Focus, proposals, lifecycle folders, and retired Stream types. The clean aggregate result is false reconciliation.

## Mechanical trace and limits

The checker validates zones, simple configuration, fences, configured required fields, and outbound placement. It does not semantically parse YAML, require the claimed universal `type`, enforce taxonomy or location, reconcile component findings, validate selected adapters or areas, or reject the stale Stream forms. Empty default `required_frontmatter` lets the aggregate pass with no universal frontmatter requirement.

The checker permits an intermediate-symlink zone proposal while the publishing host rejects symlink ancestors and physical escape. No proven escape exists, but the proposal is not executable through the host and lacks an end-to-end fail-closed diagnostic. Six tests and three recall-oriented evals do not cover these ownership, migration, or host boundaries. The source registry is stale against the current representative estates.

## Candidate improvements

1. Obtain one owner decision for KB `type`, dependent fields, Decision Record metadata, and exclusive `repo_type`; migrate estates and align every component and fixture.
2. Remove or explicitly migrate Focus, proposal, lifecycle-folder, and retired Stream-type guidance; validate the selected `kb-streams` adapter and resolved areas.
3. Distinguish structural success from unverified cross-owner semantics and mechanically enforce the selected aggregate schema.
4. Either make linked-zone conform executable through the publisher or fail closed before proposing it, with an end-to-end host test.

## Carry-forward criteria

Dependency composition is not semantic reconciliation. A clean aggregate audit proves cross-owner consistency only when one owner decision, a current-estate migration, and aligned component-plus-aggregate fixtures demonstrate the same contract.

## Local evidence

- `skills/repo-structure/ki-repo-kb/SKILL.md`
- `skills/repo-structure/ki-repo-kb/references/standards-frontmatter.md`
- `skills/repo-structure/ki-repo-kb/references/sources.md`
- `skills/repo-structure/ki-repo-kb/scripts/rubric/contexts/kb.ts`
- `skills/repo-structure/ki-repo-kb/scripts/rubric/items/index.test.ts`
- `docs/reviews/KI-HARNESS-REV-001/ki-decision-records.md`
- `docs/reviews/KI-HARNESS-REV-001/ki-repo-kb-streams.md`
