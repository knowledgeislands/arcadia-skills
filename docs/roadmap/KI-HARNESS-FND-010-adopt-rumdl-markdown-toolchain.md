---
id: KI-HARNESS-FND-010
title: Adopt rumdl markdown toolchain
theme: foundation-tooling
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 3d354b9a6de1d7e6aed62a3b44a73e272b1ff75e
---

## Goal

Replace Prettier and markdownlint-cli2 with [rumdl](https://github.com/rvben/rumdl) as the single Markdown formatter and linter, so the estate carries one Markdown tool and one configuration file instead of two of each.

## Context

Markdown is the dominant content type in this estate — 1,134 tracked files across fifteen repositories — and it is currently governed by two tools with a hand-negotiated boundary between them. Prettier owns whitespace, list markers, emphasis characters, table padding, and line width via `printWidth` and `proseWrap`. markdownlint-cli2 owns document structure and link integrity: heading increment, duplicate and multiple `<h1>`, bare URLs, empty links, unlabelled code fences, and anchor links that resolve to no heading. The division is real and neither tool subsumes the other today, which is why the split has survived.

Keeping the boundary costs more than the split is worth. `MD013` must be disabled in the markdownlint configuration with a comment explaining that Prettier owns line length, because the two rules otherwise contradict each other. `.prettierrc.json` declares seven options of which only `printWidth` and `proseWrap` reach a Markdown file; the remaining five — `semi`, `singleQuote`, `trailingComma`, `tabWidth`, `useTabs` — apply to no file Prettier ever touches and silently duplicate Biome's `javascript.formatter` policy, inviting a maintainer to keep two unrelated settings in sync. Prettier is confined to Markdown only by the glob list its callers pass, not by anything in its own configuration, so a bare `prettier --write .` would reformat every TypeScript file in the repository straight into conflict with Biome.

Biome cannot absorb either role. Version 2.5.7 was given a `.md` file with formatting enabled and reported `Checked 0 files`, listing the path under paths "provided but ignored"; the 2.5.6 schema exposes language blocks for `css`, `graphql`, `grit`, `html`, `javascript`, and `json` and no `markdown` key at any depth, so there is no experimental gate to enable. Markdown support is a stated Biome ambition with no version or date attached, and this item does not wait on it.

rumdl covers both roles in one binary. It is distributed on npm as well as crates.io and PyPI, so `bunx rumdl` works without adding a Rust or Python toolchain to a Bun repository.

## Boundary

This item owns the Markdown toolchain: the `ki-authoring` owned-file templates, the audit and conform command lists, the standard text describing the Markdown gate, and the migration of every affected repository in the estate. It does not change Biome's role, configuration, or file coverage — Biome remains the sole formatter and linter for TypeScript, JavaScript, and JSON, and the two tools' file domains stay disjoint. It does not change any Markdown content: the migration is a toolchain swap, and any change to a tracked `.md` file is a defect in this item rather than an expected outcome. It does not introduce a transition period in which both toolchains run; per this repository's current-state migration rule, the contract changes and every footprint conforms in the same pass.

## Current state

`ki-authoring` owns four files through OWN-1, defined as string templates in `scripts/rubric/contexts/authoring.ts`: `.prettierrc.json` (`PRETTIER_DEFAULT`), `.prettierignore` (`PRETTIER_IGNORE_DEFAULT`), `.markdownlint-cli2.jsonc` (`MARKDOWNLINT_DEFAULT`), and `.editorconfig`. Its `MARKDOWN_AUDIT_COMMANDS` and `MARKDOWN_CONFORM_COMMANDS` each invoke `bunx prettier` with an explicit `MARKDOWN_PATHS` glob list and two `--ignore-path` flags, then `bunx markdownlint-cli2`.

The markdownlint configuration enables every rule by default and disables five with stated reasons: `MD013` (Prettier owns line length), `MD024` (siblings only), `MD025` (frontmatter title), `MD033` (inline HTML, for `<br>` in table cells and angle-bracket placeholders), and `MD036` (intentional bold labels).

rumdl's rule-selection flags are exclusive, not additive, and this invalidated a first attempt to measure the migration. Both `--enable` on the command line and `enable` in configuration mean _enable only these_; a sweep run with `--enable MD060` therefore executed that one rule and nothing else, and its apparently clean result across the estate proved only that tables were aligned. The additive forms are `--extend-enable` and `extend-enable`, and a rule that is off by default additionally needs `enabled = true` in its own table. Any measurement of this migration must first confirm that the rules it claims to be running are actually running.

Re-measured correctly against the full rule set, eleven of fifteen repositories are clean and four report seventy-one findings across thirty-seven files: `ki-arcadia-principal` (13), `ki-plugins` (28), `mcp-m365` (22), and `tools-ki` (8). This repository is clean.

Only four of those seventy-one are formatter-parity divergences — two `MD013` prose-reflow, one `MD049` emphasis, one `MD040` unlabelled code fence. The remaining sixty-seven are **new signal rather than disagreement**: rules rumdl applies that the current markdownlint configuration does not reach. The largest group is thirty-nine `MD057` relative links that resolve to no file, concentrated in `ki-plugins`, where published copies of harness skills retain links back into the harness's own `docs/` tree that does not exist in the publishing repository. Nineteen are `MD060` table alignment, and the rest are `MD071`, `MD075`, and `MD076`.

So the migration is close to content-neutral on formatting but is not finding-neutral, and the sixty-seven new findings need triage on their own merits before the toolchain swap can be called complete.

`MD060` has no setting that reproduces Prettier, because Prettier's own table behaviour is conditional: it pads cells to equal width only when the padded table still fits `printWidth`, and collapses a wider table to minimal `| --- |` delimiters and unpadded cells. rumdl's styles are unconditional. Measured against a Prettier-formatted table and a compact one, `aligned` accepts the first and rejects the second, `compact` does the reverse, and `any` accepts both; `aligned` therefore reports four hundred and eighteen findings across forty-nine files in this repository, all of them wide tables Prettier deliberately left compact.

This item selects `any`, which keeps the migration content-neutral at the cost of no longer enforcing table alignment at all — a real reduction in governance against the current toolchain, and the one capability this migration gives up. Enforcing `aligned` instead would rewrite every wide table into a single very long row, working against the footnote convention that exists precisely to keep tables narrow.

Separately, `ki-arcadia-principal/Streams/Parked/Parked.md` is a genuine defect: given a placeholder table whose only body row is `| - | - | - |` padded to the header widths, rumdl strips the padding, leaving the table visually misaligned, then reports the result clean while Prettier reports it unformatted. Reduced to a minimum, a table whose sole body row holds `-` cells is flagged while the identical table with `a` and `b` cells of the same widths is not, so the trigger is cell content rather than column width.

The gate also gets substantially cheaper. Across this repository's 383 files, Prettier takes 3.6 seconds and markdownlint-cli2 a further 1.5 seconds, against 0.06 seconds for rumdl — a gate that runs on every audit and every pre-commit.

## Steps

- [ ] Report the `MD060` placeholder-table defect upstream with the reduced repro, and record the issue reference under Discussion.
- [ ] Decide and record how the `Parked.md` table is handled: whether the upstream fix is a precondition for migration, or the placeholder row is rewritten so the case does not arise.
- [ ] Add `rumdl` as a development dependency and define the canonical `.rumdl.toml` template in `ki-authoring`, mapping every currently disabled markdownlint rule to its rumdl equivalent and setting `MD013` to `reflow = true` with `reflow-mode = "normalize"` and an effectively unbounded `line-length`, which is what reproduces `proseWrap: "never"`.
- [ ] Enable `MD060` in the template through `extend-enable` rather than `enable`, with `style = "any"`, and record in the comment both why the additive form is required and that `any` is a deliberate reduction in enforcement rather than a match for Prettier.
- [ ] Triage the sixty-seven findings that are new signal rather than formatting divergence, deciding per rule whether to adopt it, configure it, or disable it with a stated reason — `MD057` in particular, where the published-skill link pattern in `ki-plugins` may be legitimate rather than broken.
- [ ] Replace the Prettier and markdownlint entries in `MARKDOWN_AUDIT_COMMANDS` and `MARKDOWN_CONFORM_COMMANDS` with `rumdl check` and `rumdl fmt`, and drop the `MARKDOWN_PATHS` glob list and both `--ignore-path` flags in favour of rumdl's own `exclude` configuration.
- [ ] Retire `.prettierrc.json`, `.prettierignore`, and `.markdownlint-cli2.jsonc` from the OWN-1 owned-file set, and remove the `OwnedFile` union members and template constants that define them.
- [ ] Rewrite the Markdown gate description in `references/standards-authoring.md`, and update every cross-reference in the catalogue and repository documentation that names Prettier or markdownlint as the Markdown authority — `AGENTS.md`, the `ki-engineering-lead` subagent, `ki-skills` `KI-LINK-4` and its publication, `standards-knowledge-islands.md`, and `standards-markdown.md`, whose line 87 also misattributes `MD060` table padding to Prettier.
- [ ] Edit `ADR-KI-HARNESS-TOOLCHAIN-001` and `ADR-KI-HARNESS-007` in place so each names rumdl as the Markdown toolchain, per the living-record principle in `standards-decision-records.md`. These edits land in the same commit as the implementation, because a record must read as written today and must carry no forward-looking narration under `BODY-10`.
- [ ] Repoint the `ki-authoring` `sources.md` REFRESH target from the markdownlint rules page to rumdl's, and update the `MD013`/`MD060` notes that describe the retired configuration.
- [ ] Replace the `markdownlint-cli2` and `prettier` entries in `package.json`, including the `lint-staged` hook, which otherwise invokes an uninstalled tool on the next commit.
- [ ] Conform all fifteen repositories, deleting the three retired files and adding `.rumdl.toml`, and confirm no tracked `.md` file changes in the same pass.
- [ ] Format `mcp-m365/fixtures/routing/example-rules.md`, which is unformatted under both toolchains, as a separate change from the migration so the migration's own diff stays content-free.

## Files touched

- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` — the owned-file templates, the `OwnedFile` union, and both Markdown command lists.
- `skills/governance/ki-authoring/references/standards-authoring.md` — the Markdown gate description.
- `skills/governance/ki-authoring/scripts/rubric/items/` — any criterion asserting the retired files or their contents.
- `package.json` — the `rumdl` development dependency, replacing `prettier` and `markdownlint-cli2`.
- `.prettierrc.json`, `.prettierignore`, `.markdownlint-cli2.jsonc`, `.rumdl.toml` in this repository and the fourteen others.
- Every document in the catalogue naming Prettier or markdownlint as the Markdown authority.

## Verify

`ki repo audit --skill ki-authoring` passes clean in this repository, and `bun run test` and `bunx tsc --noEmit` pass.

`rumdl check` reports no issues across all fifteen repositories, once the seventy-one findings recorded under Current state have each been adopted, configured, or disabled with a reason.

Any measurement quoted as evidence must first prove its own rule selection, by confirming through `rumdl config` that the rules being claimed are enabled. The exclusive-`enable` trap already invalidated one sweep and would do so again silently, since the failure mode is a clean report rather than an error.

The formatting half of the migration must change no content: the commit that swaps the toolchain shows the three retired files deleted and `.rumdl.toml` added, with **no tracked `.md` file modified**. Content changes arising from newly adopted rules land as their own separate commits, so a rule-mapping error stays distinguishable from a deliberate lint adoption.

Running `rumdl fmt` twice must be a fixed point, since a formatter that does not converge would reintroduce the OWN-1 idempotency defect this repository has already paid for once.

## Dependencies / blocks

Nothing blocks this item. It subsumes the outstanding OWN-1 re-conform across the estate, because `.prettierignore` is retired rather than corrected, and it dissolves the separately proposed `.prettierrc.json` dead-option cleanup, because that file ceases to exist.

## Discussion

### Why not wait for Biome

Consolidating on Biome would be the tidier end state, since it already owns the code half of the toolchain, but the capability does not exist to adopt: Markdown is not a language Biome recognises, so there is nothing to configure or gate. Waiting means keeping a two-tool Markdown boundary for an unbounded period against an unannounced release. Should Biome ship Markdown support later, it would displace rumdl's formatter role but not its linter role, since the structural and link-integrity rules have no Biome counterpart either.

### Why the maturity risk is acceptable

rumdl is at 0.2.52 with a single maintainer, and replacing two widely-adopted tools with a young one concentrates dependency risk in a way that deserves stating plainly rather than assuming away. The mitigating fact is the sweep: because rumdl is already a fixed point on content that Prettier and markdownlint jointly produced, the migration rewrites nothing and a reversion would rewrite nothing either. The cost of being wrong is restoring three configuration files, not reformatting 1,134 documents.

### Why the one divergence does not block on its own

The `MD060` defect is real and rumdl's output is worse than Prettier's, but it needs a placeholder table with no substantive rows and reaches exactly one file in the estate. It is recorded here, reported upstream, and settled explicitly in the second Step rather than discovered during the migration.

### Why the retired files are removed by command

`ConformWrite` carries `path`, `content`, and `create`, with no deletion primitive, so conform cannot express "this file should no longer exist". Adding one would change the shared rubric contract across its thirty-five vendored copies and would need the host to implement it — an unknown field is silently ignored, so a half-landed contract would delete nothing while appearing to. The retirement therefore issues a `ConformCommand`, which is an existing primitive, emitted only when the evidence shows a retired file present. A deletion primitive may still be worth adding later on its own merits; it is not worth coupling to this migration.
