# Specifications

The behaviour-level contract for what the **ki-agentic-harness** does — the **what**. Decisions capture the why ([`../decisions/`](../decisions)); guides capture the how ([`../guides/`](../guides)); roadmap items capture the when ([`../roadmap/`](../roadmap)); these Specifications capture the observable behaviour the harness exhibits today, stated normatively and each paired with a verification hook. This corpus is governed by the `ki-specs` skill and checked by its native rubric.

> **Status:** as-built baseline, behaviour-level.

## How this fits with other docs

| Location               | Question | Instrument                               |
| ---------------------- | -------- | ---------------------------------------- |
| `decisions/`           | Why      | Decision Records (`ki-decision-records`) |
| `specs/`               | What     | Specifications (this corpus)             |
| [`guides/`](../guides) | How      | Guides (`ki-guides`)                     |
| `roadmap/`             | When     | Repository work items (`ki-change-management-roadmap`)     |

## How to read a requirement

Each requirement is a level-3 heading `### <PREFIX>-NNN — <title>`, one RFC-2119 statement, and a `_Verify:_` hook. For example:

    ### BOOT-015 — Repository governance executes natively

    `ki repo audit` MUST resolve and execute the repository's declared compatible catalogues through the CLI host.

    _Verify:_ run the command against a declared fixture and confirm its compatible catalogues execute without a repository-local runner.

RFC-2119 keywords (`MUST` / `MUST NOT` / `SHOULD` / `SHOULD NOT` / `MAY`) are normative and uppercase. `_Verify:_` names the concrete check. A requirement governed by a recorded decision cites its DR.

## ID scheme

`<PREFIX>-<NNN>` — a per-file prefix plus a zero-padded three-digit serial, sequential within the file. IDs are **append-only and never reused**: a retired requirement keeps its number, struck through with a `(deprecated)` note. Never renumber to tidy up.

## Gaps

Each area file may end with a `## Gaps` section of **unnumbered** bullets — known divergences or desirable-but-unbuilt behaviours, deliberately outside the as-built contract. Promote a gap to a numbered requirement only once it is built and true.

## Areas

| File          | Prefix | Covers                                                                 |
| ------------- | ------ | ---------------------------------------------------------------------- |
| bootstrap.md  | `BOOT` | User bootstrap, activation scopes, native repository operations        |
| governance.md | `GOV`  | Universal modes, mechanical-first, severity, composition, checker root |
| harness.md    | `HARN` | Five-part bundle, root anchors, toolchain, skills naming               |
| modes.md      | `MODE` | The four universal modes + HELP as a behavioural contract              |
| checkers.md   | `CHK`  | Checker contract: ladder, exit, `--json`, tally, footer                |
