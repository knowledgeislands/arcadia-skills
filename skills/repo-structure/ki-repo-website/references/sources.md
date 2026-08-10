# Sources — where the standard comes from

**Refresh:** external-spec · monthly

The authoritative and in-house sources behind the [Eleventy site standard](standards-eleventy-site.md) and [Audit Rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard + rubric + native rubric definition, then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). This is the skill's memory of where the standard comes from — keep it current.

Two layers feed the standard: the **upstream tools** (Eleventy, Tailwind, Lucide — what they support and how they're configured) and the **in-house convention** (the shape the standard defines on top of those tools). A finding is only "upstream-driven" if it traces to the Authoritative table; everything else is house style and should be labelled as such.

## Authoritative (upstream tools)

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| ELEVENTY | [Eleventy docs][11ty] | Config API: `addTransform`, `addDataExtension`, `eleventy.before`, `dir` | 2026-08-10 |
| TAILWIND | [Tailwind CSS v4 docs][tw] | Config-less `@import "tailwindcss"`, `@theme inline`, the CLI | 2026-08-10 |
| LUCIDE | [Lucide docs][lucide] | Icon delivery (UMD passthrough, client educate) | 2026-08-10 |

## In-house (the website convention)

The standard is self-contained; it is the source of truth for house style. Any conformant site repo that carries a `[skills.ki-repo-website]` table is an example, not a source.

| Tag | Source           | Governs                                                                 | Last reviewed |
| --- | ---------------- | ----------------------------------------------------------------------- | ------------- |
| ENG | `ki-engineering` | Separately coverage-selected toolchain layer (referenced, not restated) | 2026-08-10    |

## Last review

REFRESH last run **2026-08-10**. Re-fetched all three upstream sources and the ENG in-house reference. Standard confirmed current; one prior watch-item expanded.

- **Pins (2026-08-10):** Eleventy `^3.1.x` (npm stable still **3.1.6**, 2026-06-02 — unchanged); `@tailwindcss/cli` `^4.3.x` (current **4.3.3**, patch over 4.3.2; `^4.3.x` still valid); Lucide vanilla `lucide` **1.31.0** (was 1.23.0 at last review — minor-version advance, UMD confirmed present); TypeScript type-stripping confirmed stable (native on Node ≥ 24 / Bun; `--experimental-strip-types` a no-op); `tsx` recorded as legacy.
- **ELEVENTY (2026-08-10):** Font Awesome acquired the Eleventy project in June 2026; the GitHub repository moved to `11ty/buildawesome`. The npm package `@11ty/eleventy` 3.1.6 remains the stable install target and is unchanged. Config API (`addTransform`, `addDataExtension('ts'|'json5', { read: false, parser })`, `eleventy.before`, `dir`) confirmed unchanged. Standard current; watch-item expanded (see below).
- **TAILWIND (2026-08-10):** 4.3.3 (patch over 4.3.2). Config-less `@import "tailwindcss"`, `@theme` / `@theme inline` idioms unchanged; 4.3.x is additive and does not touch our config-less idioms. Standard current.
- **LUCIDE (2026-08-10):** 1.31.0 (was 1.23.0 — minor-version advance). UMD build (`dist/umd/lucide.min.js`) + client-side `createIcons()` confirmed present at 1.31.0. Standard current; UMD watch-item carries.
- **ENG (2026-08-10):** ki-engineering REFRESH run this same cycle — no structural change to the toolchain seam this references. Date bump.
- **Open watch-items:**
  - **Eleventy v4 / "Build Awesome" rename.** Prior watch-item expanded: Font Awesome acquired the project June 2026; the GitHub repo is `11ty/buildawesome`. The stable npm name `@11ty/eleventy` is unchanged for 3.x, but v4 stable may ship under a new npm name. Re-anchor the config API and install-target name when v4 GAs.
  - **Lucide UMD exception.** Framework packages dropped UMD; vanilla `lucide` retains it as the documented exception. Confirmed present at 1.31.0. Watch in case withdrawn in a future minor or major.
  - **Tailwind `@theme` / `@import` surface.** Confirmed stable — routine, kept tracked.
  - **Node type-stripping.** Confirmed stable — routine, kept tracked.

[11ty]: https://www.11ty.dev/docs/
[tw]: https://tailwindcss.com/docs
[lucide]: https://lucide.dev/guide/
