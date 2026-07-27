---
id: ADR-KI-HARNESS-004
title: 'Composition over extension'
date: 2026-06-23
status: current
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-004: Composition over extension

## Context

Knowledge Islands needed a way to let skills relate to each other without coupling. Two approaches were considered: base-coupled extension (a `<base>-kb` skill that inherits another skill's modes and overrides them) and composition (selecting a capability also selects declared prerequisites before adding its delta). Extension produces tight coupling — a base skill change forces every derived skill to track the change, and a derived skill cannot execute without its base. It also introduces naming collisions when the same governance mode is exposed by both base and derived skills.

## Decision

Dependent skills relate through **composition**: selecting a skill necessarily selects and runs each prerequisite governance capability before adding its own delta. The composing skill declares every prerequisite in `ki-depends-on:` and names the relationship in AUDIT. The edges define a prerequisite partial order; their array order has no meaning. A standard that applies independently because repository shape detects it is coverage-detected and audited alongside, not composition. Off-ramps and shared-module packaging are also separate relationships. What a base or repo needs differently from the standard is **declared, not forked** — data in the repo's `.ki-config.toml` table, prose in its `CLAUDE.md` — never a `<base>-*` skill that takes the shared modes. There is no inheritance, cross-skill source import, or base-coupled extension.

## Consequences

- Every skill payload remains independently authored and self-contained; selecting a composing skill for repository execution requires its declared dependencies to be installed and explicitly declared.
- A dependent changes only when its prerequisite contract changes, not merely because the prerequisite implementation changes.
- Composition is explicit and auditable: frontmatter supplies the executable edges and AUDIT explains them.
- The host chooses a stable order among independent capabilities; authors express any required ordering with another dependency edge, never list position.
- Per-repo variance is visible in `.ki-config.toml` and `CLAUDE.md`, not hidden in a derived skill's override.
- The skills rubric enforces this rule mechanically.
