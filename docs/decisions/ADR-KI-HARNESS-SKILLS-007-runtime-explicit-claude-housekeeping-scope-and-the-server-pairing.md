---
id: ADR-KI-HARNESS-SKILLS-007
title: 'Provider-neutral AI session acquisition and adapter pairing'
date: 2026-07-09
status: current
decision_type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-007: Provider-neutral AI session acquisition and adapter pairing

## Context

AI clients retain transient working state: sessions, local artifacts, caches, and optional memory. A useful session may contain durable knowledge, but the client history is not a Knowledge Islands knowledge base. The acquisition lifecycle must therefore preserve source material and provenance before any interpretation, harvesting, archival, or deletion. Claude Code and Codex currently expose different local storage and protocol mechanics, while ChatGPT and Granola remain priority future sources.

The former `ki-memory` skill governed one narrow thing: the Claude Code auto-memory file format. It broadened into `ki-housekeeping-claude` alongside `mcp-housekeeping-claude`, but that pairing was initially limited to hygiene and cleanup. Codex now has an app-server identity that can discover, list, and read repository-scoped threads. The two providers need comparable operating surfaces without making MCP a second knowledge architecture.

## Decision

Knowledge Islands adopts a provider-neutral lifecycle: **acquire → stage → harvest → durable knowledge → archive/delete source**. Acquisition is conservative and incremental: it captures the original material, source identity, timestamps, provenance, and a checkpoint before any knowledge judgement. A later process may move incorrectly routed material between spaces; acquisition optimises for not losing knowledge, not perfect first classification.

`ki space acquire <provider> import` owns repository-context staging and checkpoint persistence. Provider MCPs are adapters only. Each provider exposes an additive, access-gated session surface with comparable semantics: `sessions_discover`, `sessions_list`, `session_read`, and `sessions_checkpoint`. Provider-specific names and storage details remain local. Archive and delete stay separate destructive operations and require a verified acquisition/harvest checkpoint; neither is part of initial import.

`ki-housekeeping-claude` and `ki-housekeeping-codex` are the standards-and-judgment counterparts to their respective MCPs. They guide selection, review, durable promotion, and safe later cleanup; the MCPs supply source mechanics and do not decide what knowledge is worth retaining.

## Consequences

- Claude and Codex can be operated through the same acquisition vocabulary while retaining only verified provider capabilities.
- The common surface is additive. Existing Claude housekeeping tools remain available while callers migrate to the acquisition path.
- A provider adapter may report no readable sessions or an unavailable source; it must not synthesize transcript data or silently fall back to a different provider surface.
- Memory remains one area of housekeeping, not a substitute for source acquisition. A KB's own `Admin/MEMORY.md` cascade remains `ki-repo-kb`'s concern, and context cost remains `ki-tokenomics`'s concern.
- The server's code quality remains `ki-repo-mcp`'s concern. The skills and future `ki` acquisition command must evolve together as the provider contract grows.

## References

- [ADR-KI-HARNESS-SKILLS-006](ADR-KI-HARNESS-SKILLS-006-concern-first-skill-taxonomy-and-implication-graph.md) — the taxonomy that places `ki-housekeeping-claude` in the Environment concern.
