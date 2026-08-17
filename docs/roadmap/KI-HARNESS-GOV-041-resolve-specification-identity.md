---
id: KI-HARNESS-GOV-041
area: GOV
title: Resolve Specification identity
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make `ki-specs` use one unambiguous, declaration-led identity contract and make its checker prove that contract.

## Context

The review found a contradiction: `ki-specs` permits multiple prefixes in one file, while parts of its guidance describe serials as file-scoped and its checker proves only complete-ID uniqueness.

`ADR-KI-HARNESS-SKILLS-008` now owns the settled policy: a requirement ID is append-only and sequential within its registered prefix; one file may host independent sequences for several prefixes; complete IDs are unique within the governed corpus.

Applicability is declaration-led. An incidental `docs/specs/` directory in a repository that does not declare `ki-specs` is not governed. Once declared, a missing, malformed, or unsafe corpus fails closed.

The 15-repository inventory found three declared corpora and no incidental ones: Harness (5 prefixes, 57 requirements), tools-ki (12, 63), and tools-mgit (1, 14). Every prefix maps to one file, serials are contiguous from `001`, and no IDs collide within a corpus. The policy therefore requires no identifier or index migration. Six short identifiers overlap between Harness and tools-ki, with no inbound references, confirming that identity is corpus-local rather than estate-global.

## Boundary

This item changes the portable `ki-specs` contract, checker, fixtures, and its owning ADR only.

It does not create a new Decision Record, renumber existing requirements, activate undeclared repositories, inspect or modify external repositories, or implement host-owned declared-skill selection. If the checker needs host selection evidence unavailable to a source-local audit, it must report that state truthfully and route the capability to tools-ki.

## Current state

The owning ADR records the policy, but `SKILL.md`, standard and exemplars still contain file-scoped wording. The checker lacks a declared-versus-undeclared applicability state and does not test per-prefix serial continuity or multiple prefixes in one file.

## Steps

- [ ] Align `ki-specs` guidance, standard, NEW procedure, and exemplars with prefix-scoped serials and declaration-led applicability.
- [ ] Add an explicit applicability input to the rubric context; return not-applicable for undeclared repositories and fail closed for declared missing, malformed, symlinked, or unsafe corpus evidence.
- [ ] Extend the checker to validate prefix ownership, per-prefix sequential serials, corpus-local complete-ID uniqueness, and independent sequences in a multi-prefix file.
- [ ] Add fixtures for declared valid, declared absent, missing index, malformed and symlinked evidence, undeclared absent/present directories, duplicate IDs, duplicate serials within a prefix, and equal serials across different prefixes.
- [ ] Re-run the three declared corpora and record confirmation that no identifier or index migration is needed; route any host-only selection capability as a coded tools-ki handoff instead of duplicating it here.

## Files touched

- `docs/decisions/ADR-KI-HARNESS-SKILLS-008-a-specifications-skill-for-the-what.md`
- `skills/governance/ki-specs/SKILL.md`
- `skills/governance/ki-specs/references/standards-specs.md`
- `skills/governance/ki-specs/references/mode-new.md`
- `skills/governance/ki-specs/references/exemplars.md`
- `skills/governance/ki-specs/scripts/rubric/`
- `skills/governance/ki-specs/references/rubric.md`

## Verify

- Focused `ki-specs` rubric tests prove every applicability and serial fixture above.
- `bunx tsc --noEmit` passes.
- `ki dev skill rubric ki-specs` reproduces the published rubric.
- `ki repo audit --skill ki-specs --repo .`, `ki repo audit --skill ki-decision-records --repo .`, and `ki repo audit --skill ki-work-roadmap --repo .` pass.
- The post-change inventory reports the same 134 existing requirement IDs and no index edits.

## Dependencies / blocks

The policy is settled in the amended ADR and the estate inventory is complete. The implementation may proceed locally. A host-resolved selection capability, if genuinely needed, is a separate tools-ki concern and must not block source-local contract alignment.

## Documentation impact

### Decision Records

`ADR-KI-HARNESS-SKILLS-008` is amended in place as the existing owner; no new Decision Record is needed.

### Specifications

No behaviour-level product Specification changes; this work governs the format of Specifications.

### Guides

No human guide change is expected unless the completed contract changes contributor-facing instructions.

### Roadmap

This record supplies the implementation boundary; any host capability discovered during the work becomes a separately coded tools-ki handoff.

## Delegation

### Locked decisions

- Requirement serials are append-only and sequential per registered prefix.
- Applicability is declaration-led; undeclared incidental directories are not governed, while declared invalid evidence fails closed.
- No existing ID is renumbered and no external repository is modified.

### Escalate

- A required capability cannot be expressed through source-local declaration evidence.
- Any corpus requires ID or index migration contrary to the inventory.
- A source conflicts with the amended ADR.

### Worker: specs-rubric

- **Deliverable:** Aligned `ki-specs` source, fixtures, regenerated rubric, and concise verification evidence.
- **Scope:** Only `skills/governance/ki-specs/`.
- **Authority:** Edit the named skill root and run its local tests; no external repository, runtime host, or Git publication writes.
- **Isolation:** Exclusive skill-root lane; use a worker-local Git index for any proposed commit.
- **Verify:** Coordinator reruns the named audits and compares the post-change inventory with this baseline.
- **Return:** Changed paths, test outcomes, rubric parity, any host handoff needed, and unresolved conflict.
- **Checkpoint:** Return before any external capability, migration, staging, or commit.

## Discussion

The implementation must preserve the difference between a corpus-local requirement identity and an estate-wide locator. Any future cross-repository reference needs repository or corpus context; it must not silently redefine requirement identifiers as estate-global.
