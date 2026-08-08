---
id: KI-HARNESS-FND-010
title: Adopt rumdl markdown toolchain
theme: foundation-tooling
horizon: now
status: complete
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

`MD060` is therefore left off entirely, which is its default. `any` was tried first and rejected: it enforces nothing, and it still misfires on a placeholder table whose only body row holds `-` cells, stripping the padding and leaving the table misaligned. A rule that enforces nothing and damages one case is not worth enabling. Table width moves from the mechanical layer to the judgment layer, which is the one capability this migration gives up.

`MD005` is disabled for the same class of reason: an ordered list inside a blockquote inside a list item is read as top-level, so its `>` markers are de-indented to column 0 while the surrounding blockquote lines keep their indent, splitting one quote across two nestings. Found in `kit-pkb` and reverted before landing.

The estate is wider than this item first recorded. Twenty-two repositories carry the toolchain, not fifteen: the fifteen under `knowledgeislands` plus `er-research`, `kit-legal`, `kit-midnight.ninja`, `kit-pkb`, `kit-techmedix`, `vallearmonia-principal`, and `vallearmonia-website`. Three further repositories hold a stale configuration without declaring `ki-authoring` — `5g-emerge-testbed-website`, `hnr-agentic-harness`, and `kit-principal` — and are outside this harness's governance.

`vallearmonia-website` needed a content change beyond formatting: rumdl does not honour another tool's ignore comments, so its `prettier-ignore` markers became `rumdl-disable`/`rumdl-enable`. Without that, `MD013` reflow joined the Claude Code memory imports in `CLAUDE.md` onto one line, which stops them being imports at all. That file was the only `prettier-ignore` user in the estate.

`MD075` is disabled because **its autofix destroys data**. A paragraph that follows a table and contains a `|` anywhere — inside inline code, or as a wikilink alias such as `[[Note|label]]` — is merged into the table as a row and split at that pipe. The paragraph is lost as prose, and rumdl then reports the corrupted file clean, so nothing surfaces the damage. It was caught during rollout in `ki-plugins`, where a status-order sentence was swallowed into its own status table, and in `ki-arcadia-principal`, where a paragraph was absorbed and a wikilink torn at its alias pipe. Both were reverted before landing. This is the most important finding of the migration: `rumdl check` reporting clean is not evidence that a fix was safe, only that the result satisfies the rules.

Separately, `ki-arcadia-principal/Streams/Parked/Parked.md` is a genuine defect: given a placeholder table whose only body row is `| - | - | - |` padded to the header widths, rumdl strips the padding, leaving the table visually misaligned, then reports the result clean while Prettier reports it unformatted. Reduced to a minimum, a table whose sole body row holds `-` cells is flagged while the identical table with `a` and `b` cells of the same widths is not, so the trigger is cell content rather than column width.

`kit-legal` adopted the toolchain. Its Markdown had never actually been linted — the markdownlint `globs` were `src/**`, `docs/**` and `README.md`, none of which exist in that repository — so the 23,553 findings were an accumulated backlog behind a gate that never ran, not rumdl being aggressive. All 6,645 files are now clean. Every changed file was verified by comparing normalised word streams against the previous commit, which is what surfaced the defects below; the only content-affecting changes are `MD034` autolinks, where a bare hostname in quoted correspondence becomes `<https://host>`, the CommonMark autolink form.

That repository disables four further rules, and the reasoning generalises: in a corpus of quoted material, a rule that edits the characters of a quotation is changing substance, not formatting. `MD029` renumbers ordered lists, but a correspondent who restarted a list at `2.` wrote exactly that; `MD030` inserts a space into `8.Does ownership...`, which CommonMark does not read as a list item at all; `MD028` fires on a quoted-passage-then-annotation pattern that is two blockquotes by design. `MD056` is disabled estate-wide instead, in the `ki-authoring` template, because its autofix truncates a table row when a wikilink alias in a cell inflates the cell count — the same pipe-confusion root cause as `MD075`, and every knowledge base in the estate uses that construct.

Three further defects surfaced there, all found by reading diffs and none by the gate, which reported the corrupted results clean each time. An empty list item after a wrapped line is read as a setext heading and `##` is injected mid-sentence. A continuation line beginning `##]` is admitted as an ATX heading, splitting the paragraph and deleting its full stop — this one landed in two appeal-bundle documents carrying `mirror_type: verbatim`. `MD013`'s reflow silently skips any paragraph containing a pipe, so a wikilink-heavy base is less normalised than a clean gate implies. Reference CommonMark disagrees with rumdl on the first two. All seven defects are now `KI-HARNESS-FND-011`.

`MD057` is triaged and stays disabled. This repository's eleven findings were all genuine and are fixed: four links to reference files since renamed, one to a roadmap item since completed and pruned, and six to trade records pruned after release, which now cite the trade ID in backticks as the rest of the roadmap already does. The remaining findings fall into two classes. In `ki-arcadia-principal` (10), `kit-pkb` (16), `vallearmonia-website` (10), `kit-legal` (6), `tools-ki` (3) and `mcp-m365` (1) they are genuinely broken links to relocated content — real defects, each repository's own to fix. In `ki-plugins` (25) they are not fixable as links at all: published copies of harness skills retain `../../../../docs/…` references that are correct in the harness and dangle in the publishing repository. Enabling `MD057` estate-wide would therefore fail a repository for links that are correct at source, so it waits on the publication tooling rewriting them.

The gate also gets substantially cheaper. Across this repository's 383 files, Prettier takes 3.6 seconds and markdownlint-cli2 a further 1.5 seconds, against 0.06 seconds for rumdl — a gate that runs on every audit and every pre-commit.

## Steps

- [x] Establish the rule mapping with `rumdl import`, which converts the markdownlint configuration rather than translating it by hand.
- [x] Add `rumdl` as a development dependency and define the canonical `.rumdl.toml` template in `ki-authoring`, with `MD013` at `reflow = true`, `reflow-mode = "normalize"` and an unbounded `line-length`, which is what reproduces `proseWrap: "never"`.
- [x] Disable `MD057`, `MD075`, and leave `MD060` off, each with its reason recorded in the template itself.
- [x] Replace the Markdown audit and conform commands with `rumdl check` and `rumdl check --fix`, dropping the caller-side glob list in favour of the config's own `exclude`.
- [x] Retire `.prettierrc.json`, `.prettierignore`, and `.markdownlint-cli2.jsonc` from `OWN-1`, and add `OWN-2` to remove them, since `ConformWrite` has no deletion primitive.
- [x] Update `ki-engineering`, which mechanically required the retired tools as devDependencies and asserted the old `lint-staged` shape.
- [x] Rewrite the Markdown gate description and every cross-reference naming Prettier or markdownlint as the Markdown authority.
- [x] Edit `ADR-KI-HARNESS-TOOLCHAIN-001` and `ADR-KI-HARNESS-007` in place per the living-record principle.
- [x] Repoint the `ki-authoring` and `ki-engineering` `sources.md` REFRESH targets to rumdl.
- [x] Replace the `package.json` toolchain entries including the `lint-staged` hook, across every repository that carries one.
- [x] Conform every repository carrying the toolchain and confirm no unintended Markdown content change.
- [x] Hand the upstream reports to `KI-HARNESS-FND-011`, which covers the `MD075` and `MD060` defects alongside the five found later and carries the fixes as well as the reports.
- [x] Triage `MD057`, which reports genuinely broken relative links across the estate and is disabled rather than resolved.
- [x] Decide whether `kit-legal` adopts the toolchain. Its first conform rewrites 4,546 files — legitimate prose unwrapping in a repository never previously gated — but it holds legal evidence, so the scale and the subject both warrant an explicit decision rather than a sweep.
- [x] Migrate `tools-ki`, held back because another writer has work in flight in that checkout.

## Files touched

- `skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` — the owned-file templates, the `OwnedFile` union, and both Markdown command lists.
- `skills/governance/ki-authoring/references/standards-authoring.md` — the Markdown gate description.
- `skills/governance/ki-authoring/scripts/rubric/items/` — any criterion asserting the retired files or their contents.
- `package.json` — the `rumdl` development dependency, replacing `prettier` and `markdownlint-cli2`.
- `.prettierrc.json`, `.prettierignore`, `.markdownlint-cli2.jsonc`, `.rumdl.toml` in this repository and the fourteen others.
- Every document in the catalogue naming Prettier or markdownlint as the Markdown authority.

## Verify

`ki repo audit --skill ki-authoring` passes clean in this repository, and `bun run test` and `bunx tsc --noEmit` pass.

`rumdl check` reports no issues across every repository carrying the toolchain, once the seventy-one findings recorded under Current state have each been adopted, configured, or disabled with a reason.

Any measurement quoted as evidence must first prove its own rule selection, by confirming through `rumdl config` that the rules being claimed are enabled. The exclusive-`enable` trap already invalidated one sweep and would do so again silently, since the failure mode is a clean report rather than an error.

The formatting half of the migration must change no content: the commit that swaps the toolchain shows the three retired files deleted and `.rumdl.toml` added, with **no tracked `.md` file modified**. Content changes arising from newly adopted rules land as their own separate commits, so a rule-mapping error stays distinguishable from a deliberate lint adoption.

Three `MD076` blank-line removals did ride into this repository's toolchain commit rather than landing separately, because the pre-commit hook reformats staged files after the diff has been reviewed. Auditing a formatter migration by reviewing the working tree is therefore insufficient — the hook writes again after the review.

Every autofix must be read as a diff before it is committed. `rumdl check` reporting clean does not establish that a fix preserved meaning, as the `MD075` defect demonstrates: it corrupted two files and reported both clean.

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
