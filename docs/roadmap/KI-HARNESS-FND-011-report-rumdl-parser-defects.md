---
id: KI-HARNESS-FND-011
title: Report rumdl parser defects
area: FND
theme: foundation-tooling
horizon: waiting-for
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Keep verified rumdl defects ready for an upstream contribution when routine estate use shows that a fix is worth submitting, so disabled rules can be recovered without treating a migration-stage fork as an obligation to open pull requests.

## Context

The earlier rumdl-adoption rollout adopted rumdl across twenty-two repositories and disabled several rules along the way. A disabled rule is a standing cost: it is off because of a specific defect, and left unexamined a defensive setting outlives its defect and silently loses the coverage it was meant to protect. Every one of these was found by reading a diff, never by the gate — in each case `rumdl check` reported the corrupted result clean.

The defects share two root causes rather than being seven unrelated bugs.

The first is that block-level constructs are recognised on soft-wrapped continuation lines. A paragraph line beginning `##]` is admitted as an ATX heading although CommonMark requires a space after the hash run, and `MD022`, `MD018` and `MD026` then act on the phantom, splitting the paragraph and deleting its full stop. An empty list item following a wrapped line is read as a setext heading, and `MD003`'s fix injects a literal `##` into the middle of a sentence. The reference CommonMark implementation disagrees with rumdl in both of these cases.

`MD030` was investigated and is **not** a defect. It inserts a space into `8.Does ownership...`, which CommonMark reads as paragraph text and markdownlint does not flag, but rumdl reaches that line through a deliberate heuristic rather than a misparse: an unrecognised `<digits>.` marker followed by a capital letter, `[`, or `(` is taken as a list item the author meant to write. Its shared list parser already declines the line correctly. That is a design choice like `MD018`'s, so the response is to disable the rule where quoted material must not be edited, which `kit-legal` now does.

The second is that `|` is treated as a cell separator regardless of context. `MD075` merges a paragraph containing a pipe into a preceding table and splits it at that pipe, losing the prose. `MD056` counts a wikilink alias in a table cell as a separator and resolves the resulting cell-count mismatch by truncating the row. `MD013`'s reflow silently skips any paragraph containing a pipe, so a wikilink-heavy knowledge base is less normalised than its clean gate suggests.

`MD005` and `MD060` sit outside both groups and are recorded separately: `MD005` de-indents a blockquote out of its enclosing list item, and `MD060` has no style reproducing the former conditional table padding while still misfiring on a placeholder table whose only body row holds `-` cells.

## Boundary

This item owns the upstream contribution: the fork, the fixes, the tests, and the pull requests. It does not own the estate's configuration — re-enabling a rule once a fix is released belongs to `ki-authoring`'s REFRESH mode, which already carries the instruction to re-test each disabled rule against its recorded reproduction rather than trusting a changelog.

Contributions follow the upstream project's conventions and stay minimal. The aim is acceptance, not improvement of surrounding code: no refactors, no adjacent tidying, one defect per pull request.

Reproductions must carry no content from this estate. Test fixtures use neutral public-domain prose rather than reduced copies of the documents where each defect was found.

## Current state

rumdl 0.2.54 resolved the practical MD005 and MD075 cases and added Obsidian-flavour handling for the MD056 wikilink case. Direct reproductions recorded by `ki-authoring` now preserve the MD005 and MD075 fixtures; the standard-flavour house configuration enables MD056 for detection but marks it unfixable so CONFORM cannot truncate a row. Those released outcomes replace the local candidate branches as current evidence.

The soft-wrapped ATX/setext corruption and MD013 pipe-reflow gap remain open watch-items. No pull request or released fix is recorded for either. This item therefore still waits for routine estate use, a relevant upstream release, or enough operational evidence that recovering one of those rules is worth the upstream-maintenance cost. Its return begins with fresh fixture-level validation.

Six defects, each with a reproduction verified during the migration:

| Defect | Effect | Verified against |
| --- | --- | --- |
| `MD075` merges a paragraph into a table | Prose lost | Reproduction †     |
| `MD056` truncates a table row | Cells deleted | Reproduction ‡     |
| Empty list item read as setext heading | `##` injected mid-sentence | Reference CommonMark |
| `##]` continuation read as ATX heading | Paragraph split, full stop deleted | Reference CommonMark |
| `MD005` de-indents a nested blockquote | Quote split across two nestings | Reproduction §     |
| `MD013` reflow skips paragraphs with `\|` | Silent under-normalisation | Reproduction ‖     |

† Caught in `ki-repo-plugins` and `ki-arcadia-principal` during rollout; both reverted before landing.

‡ Caught in `ki-agentic-harness`, where a wikilink alias in a table cell lost its second half.

§ Caught in `kit-pkb`; reverted before landing.

‖ Non-destructive, and the weakest of the seven as a report — it is a behavioural gap rather than corruption.

`MD060`'s placeholder-table misfire came from that earlier rollout and is the weakest case of all: the rule is opt-in and off by default, so it costs the estate nothing. It is carried here for completeness rather than as work.

The `MD018` heuristic itself is not a defect and is not challenged. markdownlint flags `##].` too, and rumdl aims for parity with it. The difference is that markdownlint reports one finding and stops, whereas rumdl admits the candidate into its document model so four rules fire and their combined fixes corrupt the paragraph. The report is about the amplification, not the heuristic.

The current local evidence is rumdl 0.2.54. The upstream project uses conventional commits with a `fix(rules)` scope, generates its changelog from commit messages with git-cliff, and runs its tests through `cargo-nextest`. `CONTRIBUTING.md` asks contributors not to hand-edit `CHANGELOG.md`.

## Steps

- [x] Install the Rust toolchain the project pins and confirm the test suite passes before any change.
- [x] Re-validate released rumdl 0.2.54 against the exact MD005, MD075, and MD056 cases and record the safe house configuration in `ki-authoring`.
- [ ] Retire the three superseded local candidate branches after confirming that none carries an independent unreleased fix.
- [ ] Fix the ATX and setext misparses, which are one root cause and may be one pull request.
- [ ] Fix the `MD013` reflow gap, the last of the pipe-context defects.
- [ ] Open one pull request per remaining fix, each carrying its reproduction, and record the references under Discussion.
- [ ] Once a remaining fix is released, re-test the rule against its recorded reproduction and recover its coverage through `ki-authoring` REFRESH.

## Files touched

No file in this repository changes except this item and the record of the pull requests under Discussion. The work lands in a fork of `rvben/rumdl` in a scratch checkout outside the estate.

`skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` and `references/sources.md` change only later, when a released fix allows a rule to come back on.

## Verify

Each pull request carries a test that fails before its fix and passes after, and the project's own suite passes unchanged otherwise.

No test fixture contains text originating in this estate. This is a hard condition, not a preference: the defects were found in a repository holding legal evidence and in personal knowledge bases, and a reduced reproduction that keeps the original wording would publish it.

A fix is only proven by re-running the original reproduction, not by the rule reporting clean. That is the lesson `MD075` taught: it corrupted two files and reported both clean.

## Dependencies / blocks

This item waits for routine estate use of rumdl to create a reason to resume: a recurrent defect, a relevant upstream release, or sufficient operational evidence that a specific rule should be recovered. It blocks nothing. The estate remains stable with the affected rules disabled, so an upstream contribution is coverage recovery rather than delivery-critical work.

## Discussion

### Why fix rather than only report

An issue leaves the estate carrying seven disabled rules for as long as a single maintainer takes to reach them. A patch with a failing test attached is both a better report and a plausible path to getting the coverage back, and the reproductions already exist from the migration.

### The wikilink fixes are flavor-scoped

The first attempt at `MD056` made its truncating fix non-destructive outright. Three existing tests assert the truncation, so it is behaviour upstream chose rather than an oversight, and inverting it means asking a maintainer to accept a changed contract.

rumdl already carries an Obsidian flavor that simply does not know about wikilinks in tables, so both pipe fixes became additions to an existing feature instead: masking wikilink pipes when the flavor is Obsidian, alongside the masking already applied to escaped pipes and inline code. No existing test changes, and GFM semantics are untouched — under `standard` an unescaped pipe remains a delimiter, which is correct per spec.

The consequence for the estate is that recovering these rules means setting `flavor = "obsidian"` in the knowledge-base repositories, not merely upgrading. Measured separately: the flavor's own adjustments to `MD028`, `MD034`, `MD030` and `MD064` apply to callouts and `%%comments%%`, and do **not** cover the cases `kit-legal` disables, so the flavor is not a route to re-enabling those.

### Why one pull request per defect

The defects group into two root causes, which argues for two changes. They are being sent to a single-maintainer project, where a large diff touching several rules is harder to accept than a small one touching a single rule with an obvious test. Where two defects genuinely share one code path, they share one pull request; otherwise they are separate.
