# `ki-repo-kb-activities` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved Phase 4 remediation applied
- **Identity:** position 28 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-kb-activities` defines a useful Activities collection and passes focused and aggregate audits against the current Arcadia estate. Its activity frontmatter requires `status`, `realization`, and `author`, while the parent `ki-repo-kb` contract calls `type` the universal sole classifier and admits Activities as an unresolved exception. A clean aggregate audit does not reconcile that schema collision.

The source record is also stale: it describes the estate as pre-adoption and unconfigured even though the current collection uses the activity-specific fields and passes the host.

## Mechanical trace and limits

`ACT-S-1` checks `index.content.includes(note.indexLink)`. Any prose or code occurrence of a filename can therefore satisfy the criterion without an actual Markdown index link. Frontmatter is read through a handwritten parser, and an arbitrary Harness path is checked only for file existence.

The Harness itself does not declare this skill, so focused host evidence comes from Arcadia. That pass demonstrates present structural agreement only; it does not resolve the aggregate metadata contract or prove link semantics.

## Candidate improvements

1. Reconcile Activities with the aggregate KB frontmatter owner, then migrate standards, estate records, fixtures, and checker together.
2. Refresh the source record against the present adopted estate.
3. Parse actual Markdown links for index coverage and add false-positive fixtures for prose, code, malformed frontmatter, and unsafe paths.

## Applied changes

Activity frontmatter now uses semantic YAML parsing, and index coverage requires real Markdown link targets rather than filename text in prose or code. Malformed YAML, lookalikes, and symlinked collection paths fail closed. The KB-wide `type` schema remains owner-gated.

## Carry-forward criteria

Aggregate conformance must reconcile child schemas rather than allow incompatible children to pass independently. Semantic link claims require parsed link evidence, not substring presence.

## Local evidence

- `skills/repo-structure/ki-repo-kb-activities/SKILL.md`
- `skills/repo-structure/ki-repo-kb-activities/references/standards-activities.md`
- `skills/repo-structure/ki-repo-kb-activities/references/sources.md`
- `skills/repo-structure/ki-repo-kb-activities/scripts/rubric/items/activities.ts`
- `skills/repo-structure/ki-repo-kb/references/standards-frontmatter.md`
