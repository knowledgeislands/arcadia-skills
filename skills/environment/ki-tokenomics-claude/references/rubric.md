<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki skill rubric <skill> --write`. -->

# Generated rubric — Bounded Claude Code tokenomics evidence

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki skill rubric ki-tokenomics-claude --write`.

Line-by-line criteria for auditing ki-tokenomics-claude. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [SURF — Claude standing surfaces](#surf--claude-standing-surfaces)
- [RUN — Claude runtime evidence](#run--claude-runtime-evidence)

## SURF — Claude standing surfaces

→ [standard](standards-claude-tokenomics.md)

Bounded Claude Code context evidence.

- **CLAUDE-SURF-1 [M] — Selected Claude surfaces are bounded** — Instruction, skill, and MCP evidence comes only from the selected repository and bounded physical user layer; out-of-scope imports FAIL. (standards-claude-tokenomics.md)

## RUN — Claude runtime evidence

→ [standard](standards-claude-tokenomics.md)

Model and compression evidence.

- **CLAUDE-RUN-1 [M] — Default and effective models are distinct** — The configured user default and selected-repository effective model are reported separately where documented settings expose them. (standards-claude-tokenomics.md)
- **CLAUDE-RUN-2 [M] — Compression evidence is report-only** — Headroom wiring may be reported, but no compression configuration or operational history is changed. (standards-claude-tokenomics.md)
