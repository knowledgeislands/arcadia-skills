---
id: KI-HARNESS-FND-020
title: Rename KI configuration
area: FND
theme: foundation-tooling
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 0570e7f0193ea149d80828ba65e45d600ec0d38d
---

## Goal

Adopt `.ki.toml` as the repository declaration and configuration filename, preserving the existing compliance marker and one-table-per-skill model as a current-contract-only implementation.

## Context

Knowledge Islands is standardizing repository declarations on `.ki.toml`, alongside mGit's `.mgit.toml` and Git Almanac's `.git-almanac.toml`. Each tool retains its own file and schema rather than combining unrelated contracts.

The observed local estate contains thirty repository declarations across the Harness, `tools-ki`, mGit, and Git Almanac repositories. Because each declaration is both a repository marker and the normative configuration source for declared skills, the cutover needs an explicit target-state decision and separately coordinated estate rollout.

## Boundary

This item owns the Decision Record, portable repository contract, Harness skills, checkers, rubrics, generated publications, examples, and tests for `.ki.toml`. It does not change the user-level `$XDG_CONFIG_HOME/ki/config.toml`, define the `.mgit.toml` schema, implement the `ki` CLI reader, or rewrite sibling repositories.

## Current state

The Harness contract now uses `.ki.toml` throughout its declaration, decisions, specifications, skills, checkers, fixtures, and publications. The separately owned CLI and estate rollout remain outside this record.

## Steps

- [x] Reconcile ADR-KI-HARNESS-005 and dependent decisions around the canonical `.ki.toml` contract.
- [x] Update `ki-repo` to define `.ki.toml` ownership, discovery, and current-contract diagnostics.
- [x] Update dependent skills, shared checker contexts, fixtures, examples, and generated publications without changing the user-level KI configuration.
- [x] Update tests for canonical discovery, bootstrap ordering, and published-Harness behaviour.
- [x] Define the separately authorized estate rollout hand-off while keeping runtime behavior current-contract only.

## Files touched

- `docs/decisions/` and `docs/specs/`
- `skills/keystone/ki-repo/`
- Dependent skill sources and shared checker fixtures that normatively consume the repository marker
- `README.md`, `skills/README.md`, and other generated or entry-point publications
- `docs/roadmap/KI-HARNESS-FND-020-rename-ki-configuration.md`

## Verify

- `ki repo audit --skill ki-repo --repo .`
- `ki repo audit --skill ki-decision-records --repo .`
- `ki repo audit --skill ki-specs --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- `bunx biome check`
- Confirm a bounded search leaves the previous filename absent from active contracts, tests, diagnostics, and guidance.

## Dependencies / blocks

There is no local prerequisite, and `MGIT-CLI-004` can proceed independently. The accepted Harness contract becomes an external prerequisite for `KI-TOOL-CLI-055` in `tools-ki`; the later estate rollout remains outside this item until explicitly authorized.

## Documentation impact

### Decision Records

Reconcile ADR-KI-HARNESS-005 around `.ki.toml` and update current decisions to the canonical filename.

### Specifications

Update the repository and bootstrap specifications that define canonical marker discovery and initialization.

### Guides

Update entry points, examples, and any author or operator guidance that instructs users to create, find, or edit the repository declaration.

### Roadmap

Retain this record through review, unblock the waiting `tools-ki` item when the contract is accepted, and create a separate estate-rollout record only after its orchestration and authority are confirmed.

## Review

### Delivered

The Harness now defines only `.ki.toml` as its repository declaration and configuration filename. Its own declaration and every tracked contract, checker, fixture, example, and publication use that filename directly.

### Summary of changes

- Renamed the root declaration and ADR-KI-HARNESS-005 to their canonical `.ki.toml` forms.
- Updated the repository contract and all dependent skills, checkers, fixtures, tests, decisions, specifications, and publications.
- Defined pre-1.0 tool configuration as current-contract only, including `.ki.toml` and `.mgit.toml` schema-1 files.
- Removed every tracked reference to the former KI and mgit configuration filenames.

### Verification

- `bunx tsc --noEmit`
- `bun run test` — 527 tests passed.
- `bunx biome check`
- `rumdl check`
- `git diff --check`
- Tracked-file and tracked-path scans found no former KI or mgit configuration filename.

The installed `ki repo audit` cannot currently verify this checkout because the selected installed Harness package has not yet been rolled forward to `.ki.toml`. Native Harness gates provide the review evidence for this record.

### Outstanding concerns

None within the approved boundary. The `tools-ki` implementation and coordinated estate rollout remain separately owned.

### Post-change review

The change is a direct pre-1.0 contract replacement: there is no compatibility lookup, migration path, warning, tombstone, or alternate filename. User-level `$XDG_CONFIG_HOME/ki/config.toml` is unchanged.

### Mini recap

KI-HARNESS-FND-020 is ready for human review as a clean cutover to `.ki.toml`.

## Discussion

### Intended contract

Keep `.ki.toml` as a KI-owned repository declaration with the existing shared table-per-skill model. Do not create a global configuration document spanning KI, mGit, and Git Almanac. The accepted Decision Record must state filename ownership, discovery semantics, current-only behavior, and the distinction from the unchanged user-level KI configuration.

### Clean cutover

Define only the canonical `.ki.toml` contract. The Harness and `ki` CLI target that filename directly; the estate rollout remains a separately coordinated user-owned change.

### Downstream hand-off

This item can proceed independently of `MGIT-CLI-004`. Its accepted `.ki.toml` contract is the other external return condition for `KI-TOOL-CLI-055` in `tools-ki`. The subsequent estate rollout requires an explicit decision after the Harness and tooling changes are ready; this record does not authorize those cross-repository mutations.
