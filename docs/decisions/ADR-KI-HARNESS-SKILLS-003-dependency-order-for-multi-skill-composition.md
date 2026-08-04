---
id: ADR-KI-HARNESS-SKILLS-003
title: 'Dependency order for multi-skill composition'
date: 2026-06-23
status: current
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-003: Dependency order for multi-skill composition

## Context

When auditing a repo that multiple governance skills apply to, executable prerequisites and independent governance layers must not be conflated. A formal composition edge, such as `ki-binding-claude` depending on `ki-binding`, requires the prerequisite first. Coverage-detected standards such as `ki-engineering` and `ki-mcp` remain independent even when a complete repository audit runs both. Human judgment synthesis still benefits from a foundations-first reading priority, but that priority is not another executable dependency graph.

## Decision

Executable repository operations use the declared `ki-depends-on:` graph. Dependencies run before their dependent; list order has no meaning; and the host orders otherwise independent capabilities stably by canonical name.

When synthesising judgment across an already completed multi-skill mechanical audit, use this **foundations-first review priority**:

```text
authoring → engineering → repo → decision-records → feature-definitions → housekeeping-claude → kb → streams → activities → live-artifacts → mcp → website → website-cloudflare → plugins → tools → homebrew-tap → plans → agents → skills → tokenomics → tokenomics-claude → tokenomics-codex → harness → bootstrap → binding → binding-claude → binding-codex
```

The priority keeps foundational judgment ahead of downstream interpretation. It is intentionally broader than the executable dependency graph: adjacent entries may be independently coverage-detected. Portable capabilities precede their runtime adapters, and KB or repository-shape families stay together for coherent synthesis.

### Naming grammar

Skill names follow the grammar **`ki-<concern>[-<technology>]`**. The set has three name classes, all conforming to it: **artifact-type** names govern a kind of thing (`ki-repo`, `ki-skills`, `ki-subagents`, `ki-mcp`, `ki-harness`, `ki-roadmap`, `ki-decision-records`); **doctrine/family** names govern a portable practice or family (`ki-authoring`, `ki-engineering`, `ki-tokenomics`, `ki-binding`, `ki-bootstrap`, the `ki-kb-*` family); **stack-specific standards** realise a concern in a named technology, with the concern leading and technology qualifier last. Runtime-bound examples are `ki-housekeeping-claude`, `ki-tokenomics-claude`, `ki-tokenomics-codex`, `ki-binding-claude`, and `ki-binding-codex`. A qualifier describes actual vendor-owned rules; it does not justify an empty symmetric counterpart.

Within this Harness, the concern is plural for a collection or repeated unit (`ki-skills`, `ki-subagents`, `ki-decision-records`, `ki-trades`); it is singular for a discipline, lifecycle action, conceptual surface, or repository-structure concern (`ki-authoring`, `ki-plan`, `ki-mcp`, `ki-harness`). Proper names and mass nouns retain their natural form. This is a local naming convention, not an addition to the generic Agent Skills standard.

Every compatible harness has one common skill-name prefix. The prefix belongs to the harness contract, not to individual skills, and must be explicitly declared and auditable through `ki-harness`; `ki` is this Harness's prefix. A technology qualifier does not alter the prefix or the singular/plural rule for the concern.

## Consequences

- A composing skill's declared prerequisite executes before the skill itself.
- Reordering TOML tables or dependency-array entries cannot change executable order.
- In parallel judgment review (ADR-KI-HARNESS-AGENTS-001), the foundations-first list governs synthesis ranking only.
- Harness implementations declare and audit their common skill-name prefix rather than assuming `ki` implicitly.
