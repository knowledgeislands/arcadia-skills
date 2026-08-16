---
id: ADR-KI-HARNESS-010
title: 'Managed hook payloads and user-environment binding'
date: 2026-07-16
status: current
decision_type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-010: Managed hook payloads and user-environment binding

## Context

The harness ships three Claude Code hooks: the Plan Mode lifecycle pair and the stale Git-lock guard. They operate in a user's Claude Code environment, not inside any one repository.

Retired standalone installers and checkout linkers obscured that boundary by treating hook payload delivery and Claude settings mutation as one operation.

## Decision

Compatible harness publication and Claude Code runtime binding are separate operations.

- `ki bootstrap` installs or restores the compatible canonical harness payload. The CLI does not register Claude Code hooks or mutate Claude settings.
- The harness publishes hook source as compatible payload content. Repository bootstrap and repository operations neither install hook payloads nor write Claude settings.
- A compliant user-environment manager establishes the settings binding after selecting a compatible installed payload. Chezmoi is the current manager and the sole writer of its managed settings entries; another manager may implement the same requirement.
- `ki-git` owns the portable safety semantics of the stale Git-lock guard. The harness retains hook payload layout, and the user-environment manager retains runtime registration.

## Consequences

- Canonical harness installation, hook payload publication, and runtime registration remain independently testable and auditable.
- Runtime registration can change without adding installation authority to the CLI or a portable Git policy skill.
- The hook payload remains source content of the installed harness; it is not a repository-local executor or an implicit runtime registration mechanism.

## References

- [ADR-KI-HARNESS-006](ADR-KI-HARNESS-006-user-installation-repository-bootstrap-and-self-sufficiency.md) — the user-install and repository-bootstrap boundary.
- [ADR-KI-HARNESS-SKILLS-004](ADR-KI-HARNESS-SKILLS-004-skills-must-be-valid-standalone.md) — renderer-specific composition over a renderer-neutral concern.
