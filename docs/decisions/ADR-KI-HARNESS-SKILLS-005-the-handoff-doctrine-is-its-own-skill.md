---
id: ADR-KI-HARNESS-SKILLS-005
title: 'The handoff doctrine is its own skill'
date: 2026-07-02
status: archive
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-005: The handoff doctrine is its own skill

## Context

This historical record addressed a recurring methodology: reason about a body of work once, then bank that reasoning in an implementation-ready brief a cheaper model or cold agent can execute without reconstructing the planner's context. At the time, `ki-roadmap` owned non-KB roadmap and plan quality, `ki-kb-streams` owned the Knowledge Base equivalent, and `ki-tokenomics` owned model cost and selection. The unresolved question was whether delegation readiness needed a separate governance standard.

## Decision

The original decision created the composition-shaped governance skill `ki-handoffs`. It owned the reasoning-layer split, a delegation-readiness quality bar, the `handoff: true` opt-in marker, semantic tier metadata, locked-versus-escalate decisions, and a recorded cold-agent readiness test. It owned no artifact of its own and added that delta to plans and proposal checklists, while deferring model cost and selection to `ki-tokenomics`.

## Consequences

- The doctrine became discoverable, but its governance shape introduced a standalone declaration, rubric, and marker contract for a concern exercised only while delegating execution.
- The term “handoff” became ambiguous with cross-repository work transfer, whose receiving repository owns adoption, priority, and planning.
- The separate semantic tier metadata duplicated the more portable, explicit per-spawn model choice made by the orchestrator.

## Supersession

This decision was superseded on 2026-07-27. Delegation readiness belongs to runtime subagent orchestration: reason once, lock or escalate decisions, give every unit a definition of done, choose the explicit minimum-viable model per spawn, test the brief against a cold agent, bound its scope, gate, and checkpoint, then require orchestrator review. When active, `ki-delegation` adds the durable packet standard. Cross-repository transfer is a distinct roadmap lifecycle concern. The standalone governance skill, declaration, rubric, evals, marker fields, and compatibility surface were retired.

## References

- [ADR-KI-HARNESS-SKILLS-003](ADR-KI-HARNESS-SKILLS-003-dependency-order-for-multi-skill-composition.md) — executable dependency ordering and the separate foundations-first review priority.
- [ADR-KI-HARNESS-SKILLS-004](ADR-KI-HARNESS-SKILLS-004-skills-must-be-valid-standalone.md) — standalone validity.
