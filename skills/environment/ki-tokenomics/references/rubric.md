<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki skill rubric <skill> --write`. -->

# Generated rubric — Portable agent-context tokenomics policy

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki skill rubric ki-tokenomics --write`.

Line-by-line criteria for auditing ki-tokenomics. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [CFG — Portable configuration](#cfg--portable-configuration)
- [POL — Portable policy and attribution](#pol--portable-policy-and-attribution)

## CFG — Portable configuration

→ [standard](standards-tokenomics.md)

Selected-repository tokenomics configuration.

- **CFG-1 [M] — Selected configuration validates down** — Only the selected repository’s [ki-tokenomics] table is validated; malformed recognised values FAIL and unknown keys WARN. (standards-tokenomics.md)

## POL — Portable policy and attribution

→ [standard](standards-tokenomics.md)

Budget semantics, purpose taxonomy, and owner routing.

- **POL-1 [M] — Budgets remain guide-rails** — A token budget overage is always WARN, never FAIL. (standards-tokenomics.md)
- **POL-2 [M] — Model purpose is portable** — Model choice uses the portable frontier, reasoning, standard, and fast purpose taxonomy. (standards-tokenomics.md)
- **POL-3 [M] — Standing-surface findings have an owner** — Selected-repository standing surfaces are attributed and routed to their artifact owner or runtime adapter. (standards-tokenomics.md)
