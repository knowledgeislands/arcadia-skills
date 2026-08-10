# Sources — where the engineering standard comes from

**Refresh:** external-spec · monthly

The toolchain pins and conventions behind [the engineering standard](standards-engineering.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard, rubric, and [canonical item catalogue](../scripts/rubric/items/index.ts), then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below. Provenance only — what changed goes in the REFRESH commit, not a changelog here.

Two layers feed the standard: the **upstream tools** (what they require / their current versions) and the **in-house convention** (the opinionated shape the sibling repos share on top). A pin is only "upstream-driven" if it traces to a tool's release; everything else is house style.

## Upstream tools (the pins the standard hard-codes)

The standard pins versions in `packageManager`, `engines`, `biome.json`'s `$schema`, and the devDependency ranges. Track the current line of each so a REFRESH knows when a pin has aged.

| Tag | Source | Governs | Pinned at | Last reviewed |
| --- | --- | --- | --- | --- |
| BUN | [bun.sh / releases][bun] | `packageManager: bun@1.3.x`; the Bun-install / Node-run split | bun@1.3.14 | 2026-08-10 |
| NODE | [Node release schedule][node] | `engines.node >= 22` (the runtime `dist/` targets) | >=22.0.0 | 2026-08-10 |
| BIOME | [biomejs.dev][biome] | `biome.json` schema + the formatter/linter config | 2.5.2 | 2026-08-10 |
| TS | [typescript releases][ts] | the `tsconfig` / `tsconfig.build` compiler options | ^6.0 | 2026-08-10 |
| VITEST | [vitest.dev][vitest] | the config-gated test profile + 100% coverage (`vitest run`, v8) | current | 2026-08-10 |
| SYNCPACK | [syncpack][syncpack] | package ordering inside engineering audit/conform | ^15 | 2026-08-10 |
| MDLINT | [rumdl][rumdl] | Markdown audit/conform inside `ki-authoring` ❡ | ^0.2.52 | 2026-08-10 |
| KNIP | [knip][knip] | dependency + dead-code checks inside engineering audit/conform | current | 2026-08-10 |

❡ The Markdown mechanical pass.

## In-house (the workspace convention)

The standard is the **majority shape** across the TS/Bun repos under `knowledgeislands/`. They are the living source of truth for house style; when they diverge, the majority wins and the outlier is a finding unless documented.

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| REPOS | the 10 TS/Bun sibling repos † | aggregate/scoped scripts, tsconfig/biome, config-gated Vitest, build/chmod | 2026-06-21 |
| FRAMEWORK | harness docs ※ | the enforcement framework (modes, checker contract, rubric tagging, sources cadence) | 2026-06-21 |

† the 7 `mcp-*` servers + `ki-agentic-harness`, `ki-arcadia-principal`, `ki-repo-website`.

※ `ki-agentic-harness/docs/skills.md` "governance-skill shape".

## Last review

REFRESH last run **2026-08-10**. Re-fetched all eight upstream tool sources. One prior watch-item resolved (TypeScript 7.0 GA); pin drift documented.

- **BUN (bun.sh, 2026-08-10):** bun@1.3.14 still the latest stable; no 1.3.x bump since 2026-05-13. Pin unchanged.
- **NODE (nodejs.org, 2026-08-10):** v22 Maintenance LTS, v24 Active LTS, v26 Current — floor `>=22` valid. Node v27 annual-cycle policy (one major per year, every release LTS) confirmed for October 2026; re-check `>=22` floor wording after v27 ships.
- **BIOME (biomejs.dev, 2026-08-10):** upstream at **2.5.7**; standard pins `2.5.2`. Patch drift, no breaking config changes. Advance pin to `2.5.7` on the next CONFORM pass once the sibling repos have upgraded.
- **TS (typescriptlang.org, 2026-08-10):** **TypeScript 7.0 GA'd 2026-07-08** (Go-native port, ~10× faster type-checking). TypeScript does not follow semver; `^6.0` pins to 6.x and will not resolve 7.0. Action required: advance the pin to `^7.0` once the ecosystem confirms readiness — Volar, Vue, and Svelte tooling lag is the current blocker. Prior watch-item (RC phase) resolved; action carried below.
- **VITEST (vitest.dev, 2026-08-10):** 5.0.0-beta still pre-release; 4.x stable continues. `current` pin unchanged.
- **SYNCPACK (2026-08-10):** 15.3.3 within `^15`; no API or config changes. Pin unchanged.
- **MDLINT/rumdl (2026-08-10):** 0.2.53 within `^0.2.52`; no behaviour changes in the Markdown pass. Pin unchanged.
- **KNIP (2026-08-10):** no breaking releases; `current` pin unchanged.
- **REPOS / FRAMEWORK (carried):** in-house rows not re-read this pass; count reconciliation carried to the next CONFORM pass.
- **Open watch-items:**
  - **TypeScript 7.0 pin decision (action required).** TS 7.0 GA'd 2026-07-08. `^6.0` locks to 6.x; advance to `^7.0` in the standard once Volar/Vue/Svelte ecosystem confirms compatibility. Deferred to next CONFORM pass.
  - **Biome pin drift.** Upstream 2.5.7 vs standard's 2.5.2 (patch-only). Advance on the next CONFORM pass.
  - **Node v27 schedule.** Annual-cycle policy confirmed; re-check `>=22` floor wording after v27 ships (October 2026).
  - **Repo-set count (carried).** "10 TS/Bun repos / seven `mcp-*` servers" overcounts — reconcile in SKILL.md, this footnote, README, and CLAUDE.md.

[bun]: https://bun.sh/blog
[node]: https://nodejs.org/en/about/previous-releases
[biome]: https://biomejs.dev/
[ts]: https://www.typescriptlang.org/
[vitest]: https://vitest.dev/
[syncpack]: https://github.com/JamieMason/syncpack
[rumdl]: https://github.com/rvben/rumdl
[knip]: https://github.com/webpro-nl/knip
