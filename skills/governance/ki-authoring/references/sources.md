# Sources — where the authoring conventions come from

**Refresh:** external-spec · monthly

The sources behind [the enforcement standard](standards-authoring.md), [the Markdown standard](standards-markdown.md), and [the TOML standard](standards-toml.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the conventions, then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). The house style is mostly internally owned, but it sits on top of these external tools and specs, which move — so this is the skill's memory of what it rests on.

## Authoritative

| Source                      | Governs                                                     | Last reviewed |
| --------------------------- | ----------------------------------------------------------- | ------------- |
| [CommonMark spec][cm]       | the Markdown syntax baseline                                | 2026-07-04    |
| [rumdl rules][ru]           | the `MDxxx` rules enforced, their options, and reflow modes | 2026-08-08    |
| [GitHub alert guidance][ga] | GitHub alert labels, purpose, and Markdown form             | 2026-07-24    |
| [TOML spec][toml]           | TOML syntax for the shared `.ki-config.toml`                | 2026-07-04    |

[cm]: https://spec.commonmark.org/
[ru]: https://rumdl.dev/rules
[ga]: https://docs.github.com/en/contributing/style-guide-and-content-model/style-guide#alerts
[toml]: https://toml.io/en/v1.1.0

## Last review

REFRESH last run **2026-08-08**. CommonMark and the TOML spec were reviewed on 2026-07-04; GitHub alert guidance was reviewed on 2026-07-24; rumdl was reviewed on 2026-08-08 when it replaced Prettier and markdownlint.

- **CommonMark:** accessible. Version 0.31.2 (released 2024-01-28) confirmed still current; no newer version. Syntax baseline unchanged.
- **rumdl:** reviewed at v0.2.52. Owns formatting and linting together, so the former `MD013`-versus-`printWidth` split is gone: `MD013` now carries `reflow = true` and `reflow-mode = "normalize"` at an unbounded width, which is what reproduces one line per paragraph. Two behaviours need watching. Rule selection is exclusive by default — `enable` and `--enable` mean _run only these_, and the additive forms are `extend-enable` and `--extend-enable`; choosing the wrong one silently disables every other rule and still reports success. And `MD060` has no style matching the former conditional table padding, so the house configuration sets `style = "any"` and table alignment is no longer enforced mechanically.
- **GitHub alerts:** added as a judgment convention. GitHub documents five labels (`NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION`), advises using alerts sparingly, and reserves them for information important enough to break prose flow.
- **TOML:** v1.1.0 spec page still shows "Published on 12/18/2025", presented as finalized; the v1.1.0 URL was already tracked. Its additions (multi-line / trailing-comma inline tables, `\e` and `\xHH` escapes, optional datetime seconds) are additive and do not touch `.ki-config.toml` formatting (lowercase `snake_case` keys, double-quoted strings, inline arrays, one-table-per-skill, `#` comments all unchanged).
- **Convention change this run:** table column alignment moves from the mechanical layer to the judgment layer, because no rumdl setting reproduces the former conditional padding. The wide-table → footnote convention is now load-bearing rather than advisory.
- **Open watch-items:**
  - rumdl is pre-1.0 and single-maintainer; confirm the house Markdown output is unaffected on each bump.
  - `MD060` mis-handles a placeholder table whose only body row holds `-` cells, stripping padding and leaving it misaligned. Recheck on upgrade.
  - Biome does not support Markdown at all (no `markdown` key in its schema); if that changes it would displace rumdl's formatter role but not its linter role.
