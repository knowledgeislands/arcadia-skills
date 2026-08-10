---
id: ADR-KI-HARNESS-SKILLS-005
title: 'Delegation and trades are distinct capabilities'
date: 2026-08-10
status: current
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-005: Delegation and trades are distinct capabilities

## Context

Delegating work to an agent and transferring a proposal between repositories both move context, but they have different authority, lifecycle, and evidence boundaries. An orchestrator remains responsible for an agent's execution, review, and integration. A receiving repository alone decides whether to accept a cross-repository submission.

## Decision

The harness keeps these concerns separate. Runtime subagent orchestration provides delegation; when durable packet governance is useful, `ki-delegation` supplies it as an optional capability. `ki-trades` governs typed, receiver-controlled cross-repository submissions. Neither capability grants a sender or delegated worker authority over a repository's roadmap, priorities, implementation, or acceptance.

## Consequences

- Delegation packets remain optional and contextual rather than becoming a required repository-wide declaration.
- Cross-repository submissions remain reviewable and directional, with receiver-owned disposition and no automatic adoption.
- The capability names describe their distinct operations, avoiding an overloaded handoff concept.

## References

- [ADR-KI-HARNESS-SKILLS-003](ADR-KI-HARNESS-SKILLS-003-dependency-order-for-multi-skill-composition.md) — executable dependency ordering and the separate foundations-first review priority.
- [ADR-KI-HARNESS-SKILLS-004](ADR-KI-HARNESS-SKILLS-004-skills-must-be-valid-standalone.md) — standalone validity.
