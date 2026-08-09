---
id: KI-HARNESS-023
title: Optimise skill descriptions
theme: runtime-portability
horizon: now
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: e0dfb29c9287da789f0b34efc2041e8bb69a9ba2
---

## Goal

Reduce the source cost of the highest-cost advertised skill descriptions while preserving reliable selection in Codex and other supported runtimes.

## Context

The Codex tokenomics audit measured 53 advertised source descriptions at approximately 3,176 words / 23,000 characters before any undisclosed runtime shortening. The result is a ranking, not a billing measurement: Codex does not expose the post-shortening size or its internal routing budget.

`ki-recap`, `ki-repo`, `ki-authoring`, and `ki-dotfiles-chezmoi` are the first high-cost descriptions to optimise. Their workflow detail already belongs in the skill body and references, which load after selection.

## Boundary

Do not claim an exact Codex routing budget, billing figure, or post-shortening token count. Do not disable skills, alter skill bodies or capability boundaries, or apply a blanket word cap that removes necessary lifecycle or collision distinctions.

## Current state

The `ki-skills` optimisation guidance values standing description cost, but its judgment rubric does not yet make reviewers weigh source cost against retained selection signals. The four selected descriptions contain more workflow detail than their selection surface needs.

## Steps

- [x] Add a `ki-skills` judgment criterion and standard guidance: a description earns its standing source cost by retaining scope, a primary trigger, and only essential collision guidance; workflow detail moves to the body or references.
- [x] Shorten the `ki-recap`, `ki-repo`, `ki-authoring`, and `ki-dotfiles-chezmoi` descriptions to their routing essentials without making their adjacent boundaries ambiguous.
- [x] Regenerate the `ki-skills` rubric publication from its structured catalogue.
- [x] Re-run the skill, authoring, roadmap, and Codex tokenomics audits; run TypeScript and test gates.

## Files touched

- `skills/change-management/ki-recap/SKILL.md`
- `skills/keystone/ki-repo/SKILL.md`
- `skills/governance/ki-authoring/SKILL.md`
- `skills/environment/ki-dotfiles-chezmoi/SKILL.md`
- `skills/keystone/ki-skills/SKILL.md`
- `skills/keystone/ki-skills/references/standards-agent-skills.md`
- `skills/keystone/ki-skills/scripts/rubric/items/description.ts`
- `skills/keystone/ki-skills/references/rubric.md`
- This roadmap item

## Verify

- Each edited description remains third-person, states its capability and primary trigger, and retains an essential off-ramp where selection could collide.
- `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-authoring --repo .`, `ki repo audit --skill ki-roadmap --repo .`, and `ki repo audit --skill ki-tokenomics-codex --repo .` pass.
- `bun run test` and `bunx tsc --noEmit` pass.

## Dependencies / blocks

Nothing blocks this item. The user approved both its Now placement and the described delivery boundary.

## Review

Delivered the four first-priority description reductions and added `DESC-10`, a `ki-skills` judgment rule that keeps source cost proportionate to routing value.

| Skill | Before | After |
| --- | ---: | ---: |
| `ki-recap` | 141 words / 1,013 chars | 42 / 314 |
| `ki-repo` | 131 / 1,013 | 48 / 340 |
| `ki-authoring` | 127 / 921 | 41 / 296 |
| `ki-dotfiles-chezmoi` | 119 / 997 | 41 / 319 |

The selected descriptions fall from 418 words / 3,944 characters to 172 / 1,269. The figures measure source text only; they do not claim a Codex routing, shortening, or billing token count.

Baseline: `e0dfb29c9287da789f0b34efc2041e8bb69a9ba2`.

Delivery commit: `4ec00a3a91f50908465652389812d95742ee3b46`.

Verification passed: `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-authoring --repo .`, `ki repo audit --skill ki-roadmap --repo .`, `ki repo audit --skill ki-tokenomics-codex --repo .`, `bunx tsc --noEmit`, and `bun run test` (332 pass, 0 fail).

The standard deliberately sets no universal word target: `DESC-10` remains judgment-only so an essential trigger or collision discriminator is not cut to satisfy a proxy metric.

## Discussion

### Source-cost evidence, not runtime accounting

The source ranking supports an optimisation order, but it cannot establish the runtime's internal routing cost. The durable rule therefore judges whether a description earns its standing surface, not a vendor-specific token threshold.
