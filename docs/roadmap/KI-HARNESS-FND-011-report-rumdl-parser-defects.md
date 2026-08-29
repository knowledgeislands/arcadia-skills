---
id: KI-HARNESS-FND-011
title: Report rumdl parser defects
area: FND
theme: foundation-tooling
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: f8434d81229dffda0f602710905fb09dc895b74d
---

## Goal

Revalidate the remaining rumdl defects against the current release, recover any safe rule coverage, and prepare minimal upstream fixes only for failures that still reproduce.

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

Rumdl `0.2.62` was released on 2026-08-27, superseding the release state used for the completed `0.2.54` reproduction pass and satisfying this item's relevant-upstream-release return trigger. The evidence below remains the last completed fixture result, not the current upstream version. Revalidation must compare exact output bytes rather than trust a changelog or a clean exit.

rumdl 0.2.54 resolved the practical MD005 and MD075 cases and added Obsidian-flavour handling for the MD056 wikilink case. Direct reproductions recorded by `ki-authoring` now preserve the MD005 and MD075 fixtures; the standard-flavour house configuration enables MD056 for detection but marks it unfixable so CONFORM cannot truncate a row. Those released outcomes replace the local candidate branches as current evidence.

The `0.2.62` pass resolves this watch set to one unpublished patch and no house-configuration change. MD005 and MD075 preserve their exact neutral controls; MD056 remains diagnostic-only under Standard and clean under Obsidian; the lazy-setext root cause now has comprehensive upstream regression coverage. The `##]` continuation still triggered MD018, MD022, and MD026 together, so an unpublished minimal patch now retains MD018 while preventing structural heading rules from acting on that bracket continuation. MD013 already reflows aliased wikilink prose under Obsidian and deliberately preserves Standard-flavour pipe semantics, so no patch is justified there.

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

The released baseline is tag `v0.2.62` at `96c8520425eaf1b6d362e4a98754adf6ee604acb`. The unpublished scratch commit is `cf86a6af` in `/tmp/ki-rumdl-b6KsIo/rumdl`; publishing it as a branch or pull request is the exact remaining external action and was not authorised in this batch.

## Steps

- [x] Re-run every recorded neutral reproduction under rumdl `0.2.62`, using the resolved MD005, MD075, and MD056 cases as regression controls before changing a rule or branch.
- [x] Classify the soft-wrapped ATX and setext misparses and the MD013 pipe-reflow gap as fixed, changed, or still reproducible without using estate-derived fixture text.
- [x] Install the Rust toolchain the project pins and confirm the test suite passes before any change.
- [x] Re-validate released rumdl 0.2.54 against the exact MD005, MD075, and MD056 cases and record the safe house configuration in `ki-authoring`.
- [x] Confirm that no superseded candidate branch remains in the Harness and that the released MD005, MD075, MD056, and setext work carries no independent local fix.
- [x] Confirm the setext root cause is fixed upstream and prepare the remaining bracket-continuation fix as unpublished scratch commit `cf86a6af`.
- [x] Confirm `MD013` already reflows aliased wikilink prose under Obsidian and that Standard-flavour preservation is deliberate rather than an unfixed reflow defect.
- [x] Record pull-request publication as the exact excluded external action; no issue, branch, or pull request was created.
- [x] Retain release-triggered coverage recovery under `ki-authoring` REFRESH rather than holding this local revalidation record open.

## Files touched

No file in this repository changes except this item and the record of the pull requests under Discussion. The work lands in a fork of `rvben/rumdl` in a scratch checkout outside the estate.

`skills/governance/ki-authoring/scripts/rubric/contexts/authoring.ts` and `references/sources.md` change only later, when a released fix allows a rule to come back on.

## Verify

Each pull request carries a test that fails before its fix and passes after, and the project's own suite passes unchanged otherwise.

No test fixture contains text originating in this estate. This is a hard condition, not a preference: the defects were found in a repository holding legal evidence and in personal knowledge bases, and a reduced reproduction that keeps the original wording would publish it.

A fix is only proven by re-running the original reproduction, not by the rule reporting clean. That is the lesson `MD075` taught: it corrupted two files and reported both clean.

## Dependencies / blocks

No local dependency blocks revalidation: rumdl `0.2.62` is released and the neutral reproductions are already recorded. External branch publication and pull requests remain a separate authority boundary and do not prevent a verified local preparation outcome.

## Documentation impact

### Decision Records

No Decision Record is required; this is source revalidation under the existing `ki-authoring` refresh contract.

### Specifications

No behaviour-level specification changes are expected.

### Guides

No guide change is expected. Update the authoring source evidence and owned configuration only where a released fix safely restores coverage.

### Roadmap

Retain this record through review. Any prepared but unpublished upstream contribution must name its exact external action rather than remain implicit.

## Review

### Delivered

Against immutable Harness baseline `f8434d81229dffda0f602710905fb09dc895b74d`, revalidated the recorded neutral cases on released rumdl `v0.2.62`, classified every remaining watch item, and prepared one minimal unpublished upstream commit. No estate configuration, sibling repository, upstream branch, issue, pull request, or release changed.

### Summary of changes

The record now distinguishes released fixes, deliberate flavour behavior, and the one remaining reproducible amplification. The disposable upstream checkout at `/tmp/ki-rumdl-b6KsIo/rumdl` contains commit `cf86a6af`, which adds a neutral bracket-continuation regression and prevents MD022 and MD026 from acting while retaining the MD018 diagnostic. No MD013 patch remains because upstream `0.2.62` already reflows the case under Obsidian and deliberately preserves Standard pipe semantics.

### Verification

Built tag `v0.2.62` (`96c8520425eaf1b6d362e4a98754adf6ee604acb`) with Rust `1.96.0`. Exact neutral MD005 and MD075 controls remained byte-identical; Standard MD056 reported without mutation and Obsidian MD056 remained clean. Upstream lazy-setext and Obsidian MD013 tests passed. The prepared bracket-continuation test passed, as did the affected 1,836-test MD013, MD018, MD022, MD026, and heading filter. `cargo fmt --all -- --check` passed in the scratch checkout.

### Outstanding concerns

The prepared commit is intentionally unpublished and exists only in the named disposable checkout. Publishing a durable branch or pull request requires separate external authority. A later released fix must still pass `ki-authoring` REFRESH before any house rule or flavour configuration changes.

### Post-change review

The local revalidation goal and privacy boundary are met. The sole code change is narrow, independently tested, and isolated outside the estate; the absence of an MD013 patch avoids contradicting upstream's existing flavour contract. The record is ready for consolidated acceptance as a completed local preparation outcome.

### Mini recap

Rumdl `0.2.62` removes the setext uncertainty and confirms the pipe behavior is flavour-specific. One reproducible bracket-continuation amplification remains with a tested unpublished fix. No new durable Knowledge Islands guidance is promoted until upstream publication and release evidence exist.

## Done

Accepted at `2026-08-29T22:54:03Z` through the closure authority bound to `KI-HARNESS-BATCH-006`. The current six-part review packet, exact reproduction evidence, scratch-patch verification, roadmap audit, and authoring audit were rechecked before closure. The unpublished external action remains explicitly outside the accepted local outcome.

## Discussion

### Why fix rather than only report

An issue leaves the estate carrying seven disabled rules for as long as a single maintainer takes to reach them. A patch with a failing test attached is both a better report and a plausible path to getting the coverage back, and the reproductions already exist from the migration.

### The wikilink fixes are flavor-scoped

The first attempt at `MD056` made its truncating fix non-destructive outright. Three existing tests assert the truncation, so it is behaviour upstream chose rather than an oversight, and inverting it means asking a maintainer to accept a changed contract.

rumdl already carries an Obsidian flavor that simply does not know about wikilinks in tables, so both pipe fixes became additions to an existing feature instead: masking wikilink pipes when the flavor is Obsidian, alongside the masking already applied to escaped pipes and inline code. No existing test changes, and GFM semantics are untouched — under `standard` an unescaped pipe remains a delimiter, which is correct per spec.

The consequence for the estate is that recovering these rules means setting `flavor = "obsidian"` in the knowledge-base repositories, not merely upgrading. Measured separately: the flavor's own adjustments to `MD028`, `MD034`, `MD030` and `MD064` apply to callouts and `%%comments%%`, and do **not** cover the cases `kit-legal` disables, so the flavor is not a route to re-enabling those.

### Why one pull request per defect

The defects group into two root causes, which argues for two changes. They are being sent to a single-maintainer project, where a large diff touching several rules is harder to accept than a small one touching a single rule with an obvious test. Where two defects genuinely share one code path, they share one pull request; otherwise they are separate.
