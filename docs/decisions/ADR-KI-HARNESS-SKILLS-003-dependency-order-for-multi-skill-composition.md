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

When auditing a repo that multiple governance skills apply to, the skills must be applied in some order. A skill that composes on a sibling (e.g. `ki-mcp` composes on `ki-engineering`) produces more accurate results if the base has already been judged. Without a canonical order, different callers would apply skills in different sequences, producing inconsistent results and risking context overflow when all skill files are loaded simultaneously.

## Decision

When walking a set of skills serially in a single agent context, apply them in **dependency order**, foundations first:

```text
authoring → engineering → repo → decision-records → feature-definitions → housekeeping-claude → kb → streams → activities → live-artifacts → mcp → website → website-cloudflare → plugins → tools → homebrew-tap → plans → agents → skills → tokenomics → tokenomics-claude → tokenomics-codex → harness → bootstrap → binding → binding-claude → binding-codex
```

Portable capabilities precede their runtime adapters: `tokenomics` precedes its Claude and Codex evidence providers, while `binding` precedes its Claude and Codex native-surface adapters. `bootstrap` precedes binding because it establishes compatible skill activation. The repo-structure skills run together — `mcp` → `website` → `website-cloudflare` → `plugins` → `tools` → `homebrew-tap` — each governing one repo shape. The KB-zone skills cluster after `kb` (`streams` → `activities` → `live-artifacts`), while `decision-records`, `feature-definitions`, and `housekeeping-claude` sit after `repo` as governance instruments. Load and release one skill at a time to keep peak context at one skill, not the full set.

### Naming grammar

Skill names follow the grammar **`ki-<concern>[-<technology>]`**. The set has three name classes, all conforming to it: **artifact-type** names govern a kind of thing (`ki-repo`, `ki-skills`, `ki-subagents`, `ki-mcp`, `ki-harness`, `ki-roadmap`, `ki-decision-records`); **doctrine/family** names govern a portable practice or family (`ki-authoring`, `ki-engineering`, `ki-tokenomics`, `ki-binding`, `ki-bootstrap`, the `ki-kb-*` family); **stack-specific standards** realise a concern in a named technology, with the concern leading and technology qualifier last. Runtime-bound examples are `ki-housekeeping-claude`, `ki-tokenomics-claude`, `ki-tokenomics-codex`, `ki-binding-claude`, and `ki-binding-codex`. A qualifier describes actual vendor-owned rules; it does not justify an empty symmetric counterpart.

## Consequences

- A composing skill's base is judged before the skill itself is reached.
- In a serial walk, execution time scales with the number of skills; in parallel invocations (ADR-KI-HARNESS-AGENTS-001, later in the reading order), this order governs synthesis ranking, not execution order.
