---
name: ki-tokenomics-codex
ki-depends-on: [ki-tokenomics]
ki-runtime-binding: true
ki-supported-runtimes: [codex]
ki-shared-dependencies: [ki-skills:rubric]
description: >
  Audit documented Codex context-cost evidence for the selected repository and bounded user configuration: instructions, skills, MCP declarations, memory and subagent surfaces, without exposing secret values. Use when a Codex repository needs runtime evidence for portable `ki-tokenomics` policy. Triggers: "audit Codex context", "check Codex tokenomics", "why is Codex context big". For portable budgets and model purpose use `ki-tokenomics`; for Claude Code use `ki-tokenomics-claude`.
argument-hint: 'audit | conform | educate | refresh | help'
---

# Codex tokenomics

`ki-tokenomics-codex` composes `ki-tokenomics` with only the documented Codex configuration, instruction, skill, MCP, memory, and subagent surfaces available for the selected repository. It does not inspect Claude state, arbitrary local caches, or undocumented local state.

The audit reports paths and structural presence only. It never reads or reports secret values, including environment variables, API keys, headers, or credential-bearing configuration values. Actual billing, tool-schema weights, compaction metrics, and transcript metrics are explicitly **not available** from this documented filesystem evidence.

CONFORM is report-only and emits no writes or commands.

## Composition

Run `ki-tokenomics` for portable configuration, budget semantics, and model purpose. Route MCP-server design to `ki-mcp` and skill-description quality to `ki-skills`.

## Operating modes

### Mode AUDIT

→ Read [mode-audit.md](references/mode-audit.md)

### Mode CONFORM

→ Read [mode-conform.md](references/mode-conform.md)

### Mode EDUCATE

Declare this adapter only for repositories that support Codex; it scaffolds no runtime state.

### Mode REFRESH

→ Read [mode-refresh.md](references/mode-refresh.md)

Refresh only in `ki-agentic-harness`; from an installed copy, stop and redirect to the canonical harness.

### Mode HELP

Explain this Codex-only evidence boundary and stop without changing anything.
