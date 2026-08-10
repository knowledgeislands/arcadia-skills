# Sources — where the standard comes from

**Refresh:** external-spec · monthly

The authoritative and in-house sources behind the [Cloudflare hosting standard](standards-cloudflare-hosting.md) and [generated rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard and structured catalogue, then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). Regenerate the published rubric with `ki dev skill rubric ki-repo-website-cloudflare --write`. This is the skill's memory of where the standard comes from — keep it current.

Two layers feed the standard: **Cloudflare's platform** (what Workers + Static Assets supports and how `wrangler` is configured) and the **in-house convention** (the shape the canonical deployed site uses on top of it). A finding is only "platform-driven" if it traces to the Authoritative table; everything else is house style and should be labelled as such.

## Authoritative (Cloudflare platform)

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| ASSETS | [Workers · Static Assets][assets] | The `assets` block and its keys † | 2026-08-10 |
| WRANGLER | [wrangler configuration][wrangler] | `name`, `compatibility_date`, `routes`/`custom_domain`, `observability` | 2026-08-10 |
| PAGES | [Pages → Workers migration / status][pages] | Whether Pages remains the recommended target for static sites ‡ | 2026-08-10 |

† `directory`, `binding`, `html_handling`, `not_found_handling`.

‡ It does not.

## In-house (the hosting convention)

The standard is self-contained; it is the source of truth for house style. Any conformant site repo that carries a `[skills.ki-repo-website-cloudflare]` table is an example, not a source.

| Tag   | Source       | Governs                                                 | Last reviewed |
| ----- | ------------ | ------------------------------------------------------- | ------------- |
| BUILD | `ki-repo-website` | The `dist/` seam this serves (referenced, not restated) | 2026-08-10    |

## Last review

REFRESH last run **2026-08-10**. Cloudflare sources proxy-blocked (developers.cloudflare.com); re-verified via WebSearch and npm registry. No standard drift; two new additive features noted.

- **ASSETS (via WebSearch, 2026-08-10):** Static Assets config surface confirmed unchanged — `directory`, `binding`, `html_handling`, `not_found_handling`, `run_worker_first` all current. New additive feature: `.assetsignore` file support (analogous to `.gitignore`) for excluding files from the asset bundle. Optional per-site opt-in; out of scope for the current standard but noted for a future catalogue expansion pass.
- **WRANGLER (via WebSearch, 2026-08-10):** `wrangler` still major **v4.x** (current release ~4.106.x, still major v4; no v5). Config schema unchanged. Optional wrangler.toml fields for the Vite plugin (additive, December 2025) confirmed — static-only sites unaffected. Deploy model: Workers + Static Assets via `wrangler deploy` (never `wrangler pages deploy`). Standard current.
- **PAGES (via WebSearch, 2026-08-10):** Cloudflare still steers new static sites to Workers + Static Assets. Migration page frames transition as optional/low-friction; Workers retains the "distinctly broader set of features" framing. Standard's wording remains accurate; `pages deploy` prohibition unchanged.
- **BUILD (ki-repo-website, 2026-08-10):** ki-repo-website REFRESH run this same cycle — `dist/` seam unchanged. Date bump.
- **Open watch-items:**
  - **`.assetsignore` support (new).** New optional feature for excluding files from the asset bundle. Determine whether to add it to the catalogue on a future CONFORM pass.
  - **wrangler v5 major.** Still no v5; re-confirm schema-breaking changes only on a major bump (the `assets` surface is otherwise mature).
  - **Pages↔Workers guidance.** Has only hardened toward Workers so far; re-confirm on each pass.
  - **`run_worker_first` route-pattern / `assets_navigation_prefers_asset_serving`.** Carried. Worker-present concerns; out of scope for pure static sites.
  - **Cloudflare sources proxy-blocked.** developers.cloudflare.com blocked by org network policy; re-verified via WebSearch this pass. Re-fetch directly when policy allows.

[assets]: https://developers.cloudflare.com/workers/static-assets/
[wrangler]: https://developers.cloudflare.com/workers/wrangler/configuration/
[pages]: https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
