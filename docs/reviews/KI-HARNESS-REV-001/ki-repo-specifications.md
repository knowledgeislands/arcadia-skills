# `ki-repo-specifications` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 4 remediation is authorised
- **Identity:** position 33 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-repo-specifications` is an economical, narrow specialisation for the canonical KIP/KIS repository. It owns a keyless marker and seven top-level seams without colliding with `ki-specs`, which governs feature-level contracts in `docs/specs/`. Base repository and primary-kind coverage remain separate and must not be inferred from its focused pass.

The current `ki-specifications` working tree is the appropriate primary authority and agrees with the declared structure.

## Mechanical trace and limits

`SPEC-1` validates the own-table marker, `SPEC-2` fails missing core seams, and `SPEC-3` warns on missing supporting seams. Focused audit, dry-run conform, publication sync, and four tests pass. Filesystem checks reject final-component symlinks and non-physical paths, and conform does not create empty untrackable directories.

The sole behavioral test covers a normal idempotent marker proposal. It omits malformed TOML, unsafe paths, unknown keys, missing-seam outcomes, and hosted no-write behavior. There is no exact eval or result evidence. `SPEC-J1` claims stability across time from one dated source review; the current clean estate is not longitudinal evidence.

## Candidate improvements

1. Add host-visible negative fixtures for malformed configuration, symlinks, unknown keys, missing seams, severity, and no-write behavior.
2. Record dated longitudinal estate evidence for each governed seam or narrow the stability claim.
3. Add an assisted-versus-baseline structural-drift evaluation before treating the clean audit as outcome evidence.

## Carry-forward criteria

A specialised-structure pass proves only its delta. Filesystem criteria need hosted negative and no-write tests, and a temporal-stability claim needs longitudinal primary evidence.

## Local evidence

- `skills/repo-structure/ki-repo-specifications/SKILL.md`
- `skills/repo-structure/ki-repo-specifications/references/standards-specifications.md`
- `skills/repo-structure/ki-repo-specifications/references/sources.md`
- `skills/repo-structure/ki-repo-specifications/scripts/rubric/contexts/specifications.ts`
- `skills/repo-structure/ki-repo-specifications/scripts/rubric/items/index.test.ts`
