---
id: KI-HARNESS-GOV-013
title: Reorganise skill taxonomy
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: a333ece9e91a4aca416dc8d699f3f19b1f519a7b
---

## Goal

Organise the skill set by the concern each capability serves, while recording whether it is a governance or process skill in explicit metadata.

Make delegation quality a reusable governance standard without turning the operational delegation procedure into a repository-governance command.

## Context

The current physical `skills/process/` directory makes kind look like the primary taxonomy, despite the intended concern-first model.

The `ki-skills` checker infers process kind from an incidental description convention, which currently misclassifies valid process skills as governance skills and emits false mode warnings.

`ki-kb-streams` is a Knowledge Base specialisation of `ki-roadmap`; it belongs in `knowledge-bases`, not change management.

`ki-delegate` currently contains both the reusable delegation quality doctrine and the process that applies it.

## Boundary

Do not change canonical skill names, add cross-repository writes, or make every repository declare `ki-delegation`.

Do not move `ki-kb-streams` out of `skills/knowledge-bases/`.

## Current state

Governance and process kind are described in prose, but not uniformly declared in frontmatter.

Seven forward-work process skills live under a kind-first `skills/process/` directory, while `ki-roadmap` and `ki-housekeeping` already hold related standards elsewhere.

## Steps

- [x] Replace the old physical taxonomy decision with the concern-first directory model and explicit `ki-kind` frontmatter contract.
- [x] Add and mechanically enforce `ki-kind: governance | process` for every KI skill; use it for mode and shape routing.
- [x] Move the forward-work process skills into `skills/change-management/` and move `ki-roadmap` and `ki-housekeeping` there with their governance kind unchanged.
- [x] Introduce `ki-delegation` under `skills/governance/` with sources, a delegation-packet standard, and a native rubric that audits declared delegation sections and safely repairs only the legacy mechanical heading.
- [x] Reduce `ki-delegate` to the process that applies `ki-delegation` to an approved plan or delivery run, retaining no duplicate packet standard.
- [x] Update all source references, discovery/projection paths, diagrams, configuration, generated rubrics, and tests.
- [x] Verify focused migrations, the full test and type gates, and affected native audits.

## Files touched

- `docs/decisions/`
- `docs/roadmap/`
- `README.md`
- `docs/diagrams/`
- `.ki-config.toml`
- `skills/change-management/`
- `skills/governance/ki-delegation/`
- `skills/keystone/ki-skills/`
- `skills/knowledge-bases/ki-kb-streams/`
- affected source references and tests

## Verify

- `bun test skills/keystone/ki-skills/scripts/rubric/contexts/skill.test.ts`
- `bun test skills/governance/ki-delegation/scripts/rubric/contexts/delegation.test.ts`
- `ki dev skill rubric ki-skills --write`
- `ki dev skill rubric ki-delegation --write`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

The migration deliberately precedes GOV-012 because the rubric work needs a reliable, explicit kind signal before it can classify evidence and remediation responsibilities.

The `ki bootstrap` implementation change is submitted to `tools-ki` as `TRD-9ab83d52`; the receiver retains adoption, priority, and implementation authority.

## Delegation

### Locked decisions

- Concern is the physical taxonomy; kind is explicit `ki-kind` metadata and never inferred from a directory or prose convention.
- `ki-kb-streams` remains a Knowledge Base specialisation of `ki-roadmap` under `skills/knowledge-bases/`.
- `ki-delegation` is a governance standard; `ki-delegate` is a process skill under change management that applies it.
- `ki-delegation` may inspect a named roadmap item's `## Delegation` packet, but it does not grant execution authority, spawn workers, or change repository priority.
- CONFORM may supply only missing mechanical delegation-packet structure; it does not invent a model selection, task partition, locked decision, or escalation boundary.

### Escalate

- Stop if the current `ki` host cannot route explicit kind metadata without an unapproved host change.
- Stop before editing an installed projection, another repository, or any user-owned delegation plan beyond the safe mechanical shape.

## Review

### Delivered

The skill tree is now concern-first, every local skill declares its kind, and delegation has separate governance and process capabilities.

An outbound work trade asks `tools-ki` to activate the new governance standard alongside the process during bootstrap.

### Summary of changes

Moved forward-work skills to `skills/change-management/`, leaving `ki-kb-streams` in `skills/knowledge-bases/`.

Added `ki-kind` metadata and a mechanical `ki-skills` criterion that routes mode requirements from metadata rather than description wording.

Added `ki-delegation`, its delegation-packet standard, native packet audit, safe legacy-heading conform, generated rubric, configuration marker, and skills-map relationship.

### Verification

- `ki repo audit --repo .` — pass: 20 skills, zero findings.
- `bun run test` — pass: 278 tests, zero failures.
- `bunx tsc --noEmit` — pass.
- Focused delegation, rubric-context, roadmap, housekeeping, and recap tests — pass.

### Outstanding concerns

`ki bootstrap` still needs the receiver-owned `tools-ki` change represented by `TRD-9ab83d52` before the documented nine-skill core inventory becomes executable there.

### Post-change review

Confirm that the concern grouping remains intuitive as future skills are added, and that the delegation-packet scope stays concrete rather than absorbing runtime-specific orchestration mechanics.

### Mini recap

The existing rubric-remediation work can now rely on explicit kind metadata rather than correcting a false process-skill diagnosis.

## Discussion

### Ordering

The current rubric-remediation work assumes a reliable classification of mechanical versus judgment responsibilities.

Repairing kind identification first removes a false governance-mode diagnosis and gives later rubric work a durable metadata anchor.

### Delegation boundary

The retired `ki-handoffs` capability had no concrete governed artifact and conflated execution delegation with cross-repository transfer.

The new `ki-delegation` standard instead owns a bounded delegation packet embedded in an approved work record; `ki-delegate` remains the procedure that decides, classifies, assigns, sequences, and gates actual execution.
