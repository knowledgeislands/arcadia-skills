# `ki-repo-project` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved Phase 4 remediation applied
- **Identity:** position 27 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-project` usefully names the explicit default Project primary structure and distinguishes it from a Knowledge Base. Its sole `PRIMARY-1` check, however, repeats the Project/KB cardinality already owned by `ki-repo` through `STRUCT-1` and `STRUCT-2`.

The description also says Project work is governed through a selected change-management adapter, but the skill neither declares nor validates that activation. A focused pass therefore does not prove the operational property used to justify the specialisation.

## Mechanical trace and limits

The structured criterion is executable, but it contributes only the duplicated cardinality check. There is no focused test or exact eval scenario, and conform has no migration evidence. The clean structural path must not be treated as evidence that a selected adapter exists or works.

The source decision is explicit and current-on-change: the Project contract is Harness-owned and requires review when a primary structure, inheritance rule, or Project/KB boundary changes. No external source is required for that house-owned classification.

## Candidate improvements

1. Retain only a distinct Project educational, activation, or migration delta; route shared primary-kind cardinality to `ki-repo`.
2. Validate the claimed selected change-management adapter through its owning contract, without reimplementing adapter resolution.
3. Add negative fixtures and an outcome scenario for actual Project activation or narrow the capability claim to the demonstrated structural marker.

## Applied changes

The duplicated primary-kind checker was removed. `ki-repo` remains the primary-structure owner and `ki-change-management` remains the forward-work selector; this skill now explains only the Project baseline delta.

## Carry-forward criteria

A specialisation must contribute a mechanically or educationally distinct delta. A description must not claim activation or runtime behavior that its dependencies and audit cannot establish.

## Local evidence

- `skills/repo-structure/ki-repo-project/SKILL.md`
- `skills/repo-structure/ki-repo-project/references/standards-project.md`
- `skills/repo-structure/ki-repo-project/scripts/rubric/items/project.ts`
- `skills/keystone/ki-repo/scripts/rubric/items/structure.ts`
