---
id: KI-HARNESS-FND-001
title: Harden external Cowork plugin publication
theme: foundation-tooling
horizon: next
status: done
blocks: []
blocked-by: []
baseline-ref: 3621af09436a0977e73388f116063309d20ce4f4
---

## Goal

Publish the external Cowork plugin safely, so a failed update never leaves its generated marketplace half replaced.

## Context

Make `ki-binding-claude`'s `build-plugin` publication inspectable before mutation and recoverable across replacement of generated output.

## Boundary

Preserve its output-root and symlink guards and unrelated scaffold; assess a dry-run and staged replacement only where compatible with the separate target repository.

## Shaping

### Intended approach

Inspect the existing plugin builder and the named `ki-plugins` checkout without mutating either publication output.

Derive the full marketplace manifest, plugin manifest, skill set, and agent set before writing. A dry run should present that complete intended projection and the exact generated paths it would replace.

Stage the replacement beneath the verified target repository on the same filesystem. The publication has two generated paths — `.claude-plugin/` and `knowledge-islands/` — so it cannot be represented honestly as one directory rename. Design a reversible swap: preserve both existing generated paths as bounded backups, publish both staged replacements, verify their resulting relationship, then remove the backups. A failure after the first replacement restores the captured generated paths and never alters repository-owned scaffold.

### Known dependencies

The generated marketplace lives in the separate `knowledgeislands/ki-plugins` repository. Its repository-owned scaffold is `README.md`, `LICENSE`, `.gitignore`, `.editorconfig`, `CLAUDE.md`, and `.ki-config.toml`; the generator may replace only `.claude-plugin/` and `knowledge-islands/`.

Its owner and checkout scope must be explicit before any staged replacement or publication test runs. The final target may be dirty only when its generated paths and intended ownership boundary have been reviewed; the generator must not use a broad clean/reset operation.

### Selected recovery contract

Treat publication as a **two-path reversible swap**, not an atomic replacement. After a read-only preflight has produced the complete projection manifest, create both staged generated paths as direct children of the verified output root. The output root must be a physical directory; the existing generated paths may be absent or physical directories, never symlinks or another file type.

Create one unique run token. Before publishing either staged path, rename each existing generated path to its token-scoped direct-child backup path and record whether it existed. Then rename the staged marketplace path and staged plugin path into their final locations, verify the resulting pair against the same manifest, and remove only the two verified backups.

If either final rename or post-publish verification fails, remove only the final paths published by this run, restore every captured backup in reverse order, and verify restoration before reporting failure. A path absent before the run is restored by removing this run's published replacement rather than inventing an empty substitute. Every staging and backup path remains a direct child of the output root, so same-filesystem `rename` is the only supported move; no cross-device fallback, second publication tree, or broad cleanup is permitted.

### Target-owner scope

The supported real publication target is the `knowledgeislands/ki-plugins` checkout. Its owner must approve the exact resolved checkout and the two generated paths — `.claude-plugin/` and `knowledge-islands/` — as builder-owned before a real publication run. The builder remains reusable against a temporary root in focused tests, but it must not infer ownership of any other live repository.

Preflight records the resolved target root, its current Git revision and worktree state, and the ownership state of both generated paths. A dirty target is a reportable review condition, not a license for a broad clean or reset; the owner decides whether the reviewed generated-path replacement may proceed while preserving every other path.

### Promotion conditions

Promote when the named target checkout, complete dry-run manifest, same-filesystem staging location, selected two-path backup-and-restore protocol, injected failure evidence, and focused builder verification are concrete.

## Current state

`build-plugin.ts` validates its output root and generated-path symlinks, but deletes `.claude-plugin/` and the plugin directory before it constructs either replacement.

The named `ki-plugins` checkout contains both generated paths and remains the only supported publication target.

## Steps

- [x] Refactor projection discovery into one deterministic manifest that contains marketplace and plugin metadata, the two final generated paths, and sorted Claude-compatible skills and agents. Derive both dry-run output and staged files from that one manifest.
- [x] Add `--dry-run`, with `--json` rendering the complete machine-readable manifest. It must validate the named output boundary but create no staging or backup path and mutate neither generated path nor repository-owned scaffold.
- [x] Validate the physical output root and both generated-path states before every write. Create one token-scoped staging root directly below the output root and construct both replacement paths there; verify their manifests before touching either final path.
- [x] Capture each existing generated directory by same-filesystem rename to its direct-child token-scoped backup, recording absent versus captured state. Rename both verified staged paths to their final locations, then verify the final marketplace-to-plugin relationship against the original manifest.
- [x] On a final rename or verification failure, remove only paths published by the current run, restore captured backups in reverse order, verify restoration, and retain the primary failure plus any restoration failure in an actionable error. Remove staging and backups only after a verified successful publication or restoration.
- [x] Extend focused tests for a non-mutating dry run, successful two-path replacement, failure after each final rename, post-publish verification failure, absent prior generated paths, unsafe root/path rejection, and repository-scaffold preservation.

## Files touched

- `skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`
- The reviewed `knowledgeislands/ki-plugins` checkout and its two generated paths before any non-test publication

## Verify

- `bun test skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`
- `bun run test`
- A temporary target proves dry-run non-mutation, successful two-path replacement, restoration after each injected final-rename and verification failure, correct handling of initially absent generated paths, and refusal of unsafe roots or paths.
- The complete dry-run manifest and the final staged projection agree on marketplace metadata, plugin metadata, generated paths, and sorted Claude-compatible skills and agents.

## Dependencies / blocks

Planning and local implementation are unblocked. Before any non-test publication, the `ki-plugins` owner must approve the exact resolved checkout and its `.claude-plugin/` and `knowledge-islands/` generated paths. The harness test suite is currently clean (246 passing); full-suite cleanliness remains an acceptance requirement.

## Delegation

### Locked decisions

- Keep the selected two-path, same-filesystem reversible swap. One deterministic manifest supplies dry-run output, staged projection, and final verification.
- Preserve the output-root and symlink guards; create only token-scoped staging and backups directly beneath the verified output root. Never clean, reset, or alter repository-owned scaffold.
- Support a read-only `--dry-run` and complete `--json` manifest. Do not publish to the live `ki-plugins` checkout during this delivery.

### Escalate

- Stop for owner direction before any non-test publication or when the target root or either generated path fails its required physical-path safety check.
- Stop rather than invent a recovery path if a failure cannot restore the exact pre-run generated-path state or if the implementation requires scope outside the builder and its focused tests.

### Round 1 — recoverable builder delivery

- **Class / worker / model:** Judgmental implementation / fresh general-purpose worker / `gpt-5.6-sol` at high reasoning, because the recovery path guards destructive filesystem operations.
- **Scope:** `skills/environment/ki-binding-claude/scripts/build-plugin.ts` and `skills/environment/ki-binding-claude/scripts/build-plugin.test.ts` only.
- **Definition of done:** The builder derives one deterministic manifest, produces a non-mutating dry run, stages and verifies both generated paths, restores every captured path after injected write or verification failure, and has focused tests for every listed recovery and unsafe-path case.
- **Verification gate:** `bun test skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`; the orchestrator independently reviews the diff, runs the full verification set, and performs an adversarial safety review before any commit.
- **Checkpoint:** Return an uncommitted diff, focused-test output, and any escalation; do not invoke the builder against the live target.

## Acceptance

### Delivered

`build-plugin` now derives one deterministic full projection manifest, exposes it through non-mutating `--dry-run` and `--json` output, stages both generated paths beneath a pinned physical root, and publishes them only through a recoverable same-filesystem swap.

The builder refuses unsafe roots, generated paths, token paths, root substitution, and nested projection symlinks. It verifies staged and final projections against the manifest, restores the exact pre-run pair after injected failure, and retains clear recovery evidence when restoration cannot complete.

No live `ki-plugins` publication occurred. The target-owner approval gate remains required before any non-test publication.

### Verification

- `bun test skills/environment/ki-binding-claude/scripts/build-plugin.test.ts` — passed: 14 tests, 105 assertions.
- `bun run test` — passed.
- `bunx tsc --noEmit` — passed.
- `bunx biome check skills/environment/ki-binding-claude/scripts/build-plugin.ts skills/environment/ki-binding-claude/scripts/build-plugin.test.ts` — passed.
- `git diff --check` — passed before commit.
- The pre-commit staged-snapshot `ki repo audit --skill ki-skills` — passed.

### Review

An independent adversarial review found and the delivery resolved dangling-symlink handling, output-root substitution, nested-container substitution, restoration-failure reporting, callback bracketing, and truthful recovery-location reporting. Its final verdict was PASS.

### Evidence and concerns

The immutable baseline is `3621af09436a0977e73388f116063309d20ce4f4`; the implementation commit is `3b2e0001252fdcacb31f38a3bdf6f2ebe6491839`.

Node exposes the required filesystem operations by pathname rather than directory-descriptor-bound `*at` calls. The builder revalidates the pinned root before each mutation and around cooperative callbacks, but an independently hostile process can still race the validation-to-syscall gap. That bounded platform limitation is documented in the builder and does not permit an unreviewed live publication.

## Done

Accepted by the repository owner on 2026-08-03. Retain this record as the evidence for recoverable, manifest-backed Cowork plugin publication; a future live publication still requires the separate target-owner approval recorded above.

## Discussion

### Recovery boundary

The current builder removes `.claude-plugin/` and the plugin directory before it writes either replacement. A failure between those operations can leave a partial projection. The revised design must make both replacement order and restoration evidence visible.

### Chosen swap model

The two generated directories cannot be atomically swapped together. The recoverable substitute is to make every individual rename same-filesystem and reversible, retain both old directories until the complete new pair verifies, and restore the exact pre-run state on failure. The run token distinguishes only this invocation's staging, backups, and published paths from repository-owned scaffold and any unrelated filesystem state.

### Dry-run evidence

`--json` currently reports only the completed projection summary. A dry run should instead expose the pre-write manifest: target root, generated paths, plugin identity and version, sorted projected skills and agents, and the exact path relationship it will verify after publication. It must not create staging directories or mutate the target.

The manifest is the sole projection source for both dry run and write mode. That prevents a successful preview from describing a different plugin, skill set, or generated-path pair than the subsequent publication.

### Target safety

All output-root and symlink protections remain mandatory. Backups and staging paths must be direct children of the verified output root, be regular directories when they already exist, and be cleaned only after successful verification or a successful restoration. The generator must refuse an unfamiliar, linked, or concurrently changed generated path rather than guessing ownership.

The production target is a separately owned checkout, so preflight must make its resolved identity, revision, worktree state, and two generated-path ownership boundary reviewable. It may never repair, reset, or otherwise alter the target's scaffold to make publication easier.
