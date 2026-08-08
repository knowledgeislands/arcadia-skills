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
- **rumdl:** reviewed at v0.2.52. Owns formatting and linting together, so the former `MD013`-versus-`printWidth` split is gone: `MD013` now carries `reflow = true` and `reflow-mode = "normalize"` at an unbounded width, which is what reproduces one line per paragraph. Four rules are disabled in the house configuration and each records its reason in `.rumdl.toml` itself: `MD033` and `MD036` carry over from the markdownlint configuration, while `MD057` and `MD075` are new decisions to revisit. `MD060` is left at its default of off. One behaviour is worth stating separately because it fails silently rather than loudly: rule selection is exclusive by default — `enable` and `--enable` mean _run only these_, and the additive forms are `extend-enable` and `--extend-enable` — so choosing the wrong one disables every other rule and still reports success.
- **GitHub alerts:** added as a judgment convention. GitHub documents five labels (`NOTE`, `TIP`, `IMPORTANT`, `WARNING`, and `CAUTION`), advises using alerts sparingly, and reserves them for information important enough to break prose flow.
- **TOML:** v1.1.0 spec page still shows "Published on 12/18/2025", presented as finalized; the v1.1.0 URL was already tracked. Its additions (multi-line / trailing-comma inline tables, `\e` and `\xHH` escapes, optional datetime seconds) are additive and do not touch `.ki-config.toml` formatting (lowercase `snake_case` keys, double-quoted strings, inline arrays, one-table-per-skill, `#` comments all unchanged).
- **Convention change this run:** table column alignment moves from the mechanical layer to the judgment layer, because no rumdl setting reproduces the former conditional padding. The wide-table → footnote convention is now load-bearing rather than advisory.
- **Standing check:** a rule this configuration disables is a deferral, not a verdict. Re-test each one against its recorded reproduction on every rumdl upgrade, and re-enable the ones upstream has fixed — otherwise a defensive setting outlives the defect and quietly costs the coverage it was meant to protect.
- **Open watch-items:**
  - `MD075` **destroys content** and is the reason that rule is disabled. A paragraph following a table that contains a pipe anywhere — inside an inline code span, or as a wikilink alias such as `[[Note|label]]` — is merged into the table as a row and split at that pipe; the paragraph is lost as prose and the corrupted file then reports clean. To re-test: write a two-column table, a blank line, then a sentence whose only pipe sits inside an inline code span, run `rumdl check --fix`, and read the result. Re-enable when that sentence survives as a paragraph.
  - `MD060` mis-handles a placeholder table whose only body row holds `-` cells, stripping the padding and leaving it misaligned while reporting clean. Even once fixed, re-enabling needs the separate judgment above, since no style reproduces the former conditional padding: `aligned` rewrites every wide table into one long row and `any` enforces nothing.
  - `MD057` is disabled pending a decision about published skill copies, whose links into the source repository's `docs/` tree resolve there and dangle in the publication. This one waits on a decision here, not on upstream.
  - rumdl is pre-1.0 and single-maintainer; confirm the house Markdown output is unaffected on each bump. The estate is a fixed point of this configuration, so any diff on upgrade is a regression to investigate rather than an improvement to accept.
  - Biome does not support Markdown at all (no `markdown` key in its schema); if that changes it would displace rumdl's formatter role but not its linter role, since the structural and link-integrity rules have no Biome counterpart.
