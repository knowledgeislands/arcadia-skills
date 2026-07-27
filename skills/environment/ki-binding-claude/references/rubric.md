<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki skill rubric <skill> --write`. -->

# Generated rubric — Knowledge Islands Claude MCP binding

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki skill rubric ki-binding-claude --write`.

Line-by-line criteria for auditing ki-binding-claude. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [CLAUDEBIND — Claude binding](#claudebind--claude-binding)

## CLAUDEBIND — Claude binding

→ [standard](standards-claude-binding.md)

Claude-native JSON and Cowork plugin evidence.

- **CLAUDEBIND-1 [M] — Claude Code and Desktop surface agreement** — Claude Code and Desktop JSON surfaces contain the canonical servers targeting each client. (standards-claude-binding.md)
- **CLAUDEBIND-2 [M] — Cowork plugin integrity** — Every safe Cowork workspace registers and enables the KI plugin. (standards-claude-binding.md)
- **CLAUDEBIND-J1 [J] — Web convention is intentional** — claude.ai web use is documented as a convention rather than a local render target. (standards-claude-binding.md)
  - _Review prompt:_ Is the web convention explicit without claiming a local file or renderer exists?
