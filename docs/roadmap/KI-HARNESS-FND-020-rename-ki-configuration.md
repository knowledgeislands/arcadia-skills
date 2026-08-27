---
id: KI-HARNESS-FND-020
title: Rename KI configuration
area: FND
theme: foundation-tooling
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Adopt `.ki.toml` as the repository declaration and configuration filename, with a durable decision and migration contract that preserves the existing compliance marker and one-table-per-skill model.

## Context

Knowledge Islands currently calls the repository-level file `.ki-config.toml`, while Git Almanac already uses the tidier tool-level `.git-almanac.toml` convention. Dropping `config` makes the repository markers uniform without combining unrelated tools into one file.

The observed local estate contains thirty `.ki-config.toml` files and references the filename across the Harness, `tools-ki`, mGit, and Git Almanac repositories. Because the file is both a repository marker and the normative configuration source for declared skills, the rename needs an explicit compatibility and rollout decision rather than a mechanical search and replace.

## Boundary

This item owns the Decision Record, portable repository contract, Harness skills, checkers, rubrics, generated publications, examples, tests, and migration policy for `.ki.toml`. It does not change the user-level `$XDG_CONFIG_HOME/ki/config.toml`, define the mGit schema, implement the `ki` CLI reader migration, or silently rewrite sibling repositories.

## Current state

`.ki-config.toml` is the required repository marker throughout the `ki-repo` contract and is embedded in many dependent skills, decisions, specifications, examples, and checker fixtures. ADR-KI-HARNESS-005 currently names that contract, and neither the Harness nor the CLI defines a canonical `.ki.toml` transition.

## Steps

- [ ] Create the naming Decision Record and reconcile the authority of ADR-KI-HARNESS-005 and any dependent decisions.
- [ ] Update `ki-repo` to define `.ki.toml` ownership, discovery, compatibility states, and migration diagnostics.
- [ ] Update dependent skills, shared checker contexts, fixtures, examples, and generated publications without changing the user-level KI configuration.
- [ ] Add tests covering legacy-only, canonical-only, conflict, bootstrap-ordering, and published-Harness behaviour.
- [ ] Define the separately authorized estate rollout hand-off, including whether Chezmoi project threads or a migration command should orchestrate it.

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
- Confirm a bounded search leaves `.ki-config.toml` only in intentional migration tests, diagnostics, or historical evidence.

## Dependencies / blocks

There is no local prerequisite, and `MGIT-CLI-004` can proceed independently. The accepted Harness contract becomes an external prerequisite for `KI-TOOL-CLI-055` in `tools-ki`; the later estate rollout remains outside this item until explicitly authorized.

## Documentation impact

### Decision Records

Create a Decision Record for `.ki.toml`, reconcile ADR-KI-HARNESS-005, and update any current decisions whose normative wording still requires the legacy filename.

### Specifications

Update the repository and bootstrap specifications that define marker discovery, initialization, compatibility states, and migration behaviour.

### Guides

Update entry points, examples, and any author or operator guidance that instructs users to create, find, or edit the repository declaration.

### Roadmap

Retain this record through review, unblock the waiting `tools-ki` item when the contract is accepted, and create a separate estate-rollout record only after its orchestration and authority are confirmed.

## Discussion

### Intended contract

Keep `.ki.toml` as a KI-owned repository declaration with the existing shared table-per-skill model. Do not create a global configuration document spanning KI, mGit, and Git Almanac. The accepted Decision Record must state filename ownership, discovery semantics, migration rules, and the distinction from the unchanged user-level KI configuration.

### Migration and rollout

Define a bounded transition that lets repositories move safely without creating indefinite dual-read or dual-write paths. Account for the bootstrap ordering between the installed Harness, repository declarations, and the `ki` CLI implementation, and specify diagnostics for legacy-only, canonical-only, and conflicting states.

Treat the later estate migration as a coordinated but separately authorized delivery. Chezmoi project threads are a candidate orchestration surface for generated or user-managed declarations; evaluate that route alongside a dedicated migration command. Preserve receiving-repository authority and one independently reviewable commit per repository.

### Downstream hand-off

This item can proceed independently of `MGIT-CLI-004`. Its accepted `.ki.toml` contract is the other external return condition for `KI-TOOL-CLI-055` in `tools-ki`. The subsequent estate rollout requires an explicit decision after the Harness and tooling changes are ready; this record does not authorize those cross-repository mutations.
