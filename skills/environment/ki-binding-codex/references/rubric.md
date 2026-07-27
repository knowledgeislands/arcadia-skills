<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki skill rubric <skill> --write`. -->

# Generated rubric — Knowledge Islands Codex MCP binding

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki skill rubric ki-binding-codex --write`.

Line-by-line criteria for auditing ki-binding-codex. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [CODEXBIND — Codex binding](#codexbind--codex-binding)

## CODEXBIND — Codex binding

→ [standard](standards-codex-binding.md)

Codex TOML comparison and merge-safe render boundary.

- **CODEXBIND-1 [M] — Codex TOML agrees with targeted source** — The native Codex TOML MCP section contains canonical Codex-targeted servers without touching unrelated application entries. (standards-codex-binding.md)
- **CODEXBIND-J1 [J] — Native merge remains appropriate** — The Codex native writer remains the safe merge boundary for the live TOML file. (standards-codex-binding.md)
  - _Review prompt:_ Does the native Codex writer still preserve non-KI application configuration better than whole-file ownership would?
