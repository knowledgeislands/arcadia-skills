<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — Knowledge Islands chezmoi MCP rendering

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-binding-chezmoi --write`.

Line-by-line criteria for auditing ki-binding-chezmoi. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [BINDCHEZ — Chezmoi binding render path](#bindchez--chezmoi-binding-render-path)
- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)

## BINDCHEZ — Chezmoi binding render path

→ [standard](standards-chezmoi-mcp-rendering.md)

The renderer-specific delta connecting MCP source data, a chezmoi partial, and rendered surface targets.

- **BINDCHEZ-1 [M] — Chezmoi source repository is inspectable** — The explicitly targeted chezmoi source repository is a physical directory that can supply render evidence. (standards-chezmoi-mcp-rendering.md)
- **BINDCHEZ-2 [M] — Surface agreement remains renderer-neutral** — The renderer-neutral ki-binding audit, composed separately, remains the authority for rendered surface agreement. (standards-chezmoi-mcp-rendering.md)
- **BINDCHEZ-3 [M] — MCP source data is present** — The chezmoi repository carries MCP source data through either supported, explicitly chosen render pattern. (standards-chezmoi-mcp-rendering.md)
- **BINDCHEZ-4 [M] — Render template is present** — An mcp-servers-json render template partial exists in the chezmoi source repository. (standards-chezmoi-mcp-rendering.md)
- **BINDCHEZ-5 [M] — Render template is wired** — At least one surface target template references the mcp-servers-json partial. (standards-chezmoi-mcp-rendering.md)
- **BINDCHEZ-6 [J] — Render parity** — A previewed chezmoi apply reproduces the surfaces that ki-binding audits. (standards-chezmoi-mcp-rendering.md)
  - _Review prompt:_ Does a reviewed chezmoi diff reproduce exactly the intended renderer-neutral surface state?
- **BINDCHEZ-7 [J] — Contract coherence** — The render standard, structured rubric, provenance, and sibling ownership boundaries remain coherent. (standards-chezmoi-mcp-rendering.md)
  - _Review prompt:_ Do the standard, rubric, sources, and composition instructions describe the same render contract without duplicating sibling policy?

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)
