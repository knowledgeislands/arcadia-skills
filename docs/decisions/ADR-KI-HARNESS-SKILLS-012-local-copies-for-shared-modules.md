---
id: ADR-KI-HARNESS-SKILLS-012
title: 'Local copies for shared modules'
date: 2026-07-17
status: current
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-012: Local copies for shared modules

## Context

Every governance rubric catalogue must compile and type-check within its own skill root while the `ki` host owns execution.

The canonical rubric type contract belongs to `ki-skills`, but each catalogue needs that same contract without importing a path in the `ki-skills` source tree or assuming another skill is adjacent.

The existing composition rule correctly prevents either of those assumptions, but it does not yet distinguish reusable implementation payload from governance coverage or mode composition.

## Decision

`ki-skills` owns the canonical compile-time `rubric` contract.

It uses that owned module directly and has no shared-module dependency on itself. Generic catalogue loading, validation, execution, progress, transactions, and reporting belong to the `ki` host.

Shared modules are a narrow packaging relationship, declared separately from `ki-depends-on:`.

A provider declares the modules it offers with `ki-shared-modules:`.

A dependent declares the exact `provider:module` references it needs with `ki-shared-dependencies:`.

The module identifier has no extension and resolves to exactly one provider file at `scripts/shared/<module>.ts`.

The dependency materialiser validates those declarations and places a regular-file copy at the matching `scripts/shared/<module>.ts` path in the dependent skill.

Published and materialised modules share that one local namespace, so their module names must not collide.

The source and local copy must be regular, non-symlinked files.

A dependent imports only its local copied module.

Shared modules may use builtins but must otherwise be self-contained; they never import a sibling skill path.

Shared-module declarations do not add a `ki-depends-on:` edge, select a skill for governance coverage, or alter composition order.

## Consequences

The rubric contract has one owned implementation while every consuming catalogue remains independently compilable and portable.

Each consumer gains an explicit, attributable local module that tooling can validate against its declaration.

The `ki-skills` checker can mechanically reject a direct or escaping import while allowing the declared local copy.

The materialiser must resolve, copy, test, and audit each declared shared module before a dependent catalogue uses it.

This is deliberately narrower than a shared runtime library or a general skill-dependency system: policy relationships remain composition only.

## References

- [ADR-KI-HARNESS-SKILLS-004](ADR-KI-HARNESS-SKILLS-004-skills-must-be-valid-standalone.md) — standalone skill constraint.
- [ADR-KI-HARNESS-006](ADR-KI-HARNESS-006-user-installation-repository-bootstrap-and-self-sufficiency.md) — durable vendored payloads.
- [ADR-KI-HARNESS-SKILLS-010](ADR-KI-HARNESS-SKILLS-010-comparable-cited-checker-findings-across-audit-and-conform.md) — shared finding model and aggregate rendering boundary.
