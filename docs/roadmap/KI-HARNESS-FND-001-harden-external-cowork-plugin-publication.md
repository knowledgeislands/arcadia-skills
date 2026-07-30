---
id: KI-HARNESS-FND-001
title: Harden external Cowork plugin publication
theme: foundation-tooling
horizon: next
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

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

### Decision still needed

Decide the rollback contract when the first generated path has been replaced but the second publication or verification fails. Do not describe two sequential renames as atomic, introduce a second publication tree, or add a cross-device fallback.

### Promotion conditions

Promote when the named target checkout, dry-run output, same-filesystem staging location, two-path backup-and-restore protocol, failure evidence, and focused builder verification are concrete.

## Current state

`build-plugin.ts` validates its output root and generated-path symlinks, but deletes `.claude-plugin/` and the plugin directory before it constructs either replacement.

The named `ki-plugins` checkout contains both generated paths and remains the only supported publication target.

## Steps

1. Refactor projection discovery into one deterministic manifest that names the marketplace metadata, plugin metadata, generated paths, and sorted Claude-compatible skills and agents.
2. Add a dry-run mode that emits that manifest and intended replacement paths without creating a staging directory or mutating the target.
3. Stage both generated paths as direct children of the verified output root, verify the staged projection, and capture existing generated paths as bounded same-filesystem backups before any replacement.
4. Publish the two staged paths with a reversible swap, verify the resulting projection, and restore every captured path if either replacement or verification fails.
5. Remove only verified backups after successful publication; preserve repository-owned scaffold throughout.

## Files touched

- `skills/environment/ki-binding-claude/scripts/build-plugin.ts`
- `skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`

## Verify

- `bun test skills/environment/ki-binding-claude/scripts/build-plugin.test.ts`
- `bun run test`
- A temporary target proves dry-run non-mutation, successful two-path replacement, restoration after each injected failure point, and refusal of unsafe paths.

## Dependencies / blocks

The harness test suite currently has a separate `ki-binding` fixture failure; it is a mandatory stop for a full-suite-clean acceptance, not a reason to widen this item into unrelated binding repair.

## Discussion

### Recovery boundary

The current builder removes `.claude-plugin/` and the plugin directory before it writes either replacement. A failure between those operations can leave a partial projection. The revised design must make both replacement order and restoration evidence visible.

### Dry-run evidence

`--json` currently reports only the completed projection summary. A dry run should instead expose the pre-write manifest: target root, generated paths, plugin identity and version, sorted projected skills and agents, and the exact path relationship it will verify after publication. It must not create staging directories or mutate the target.

### Target safety

All output-root and symlink protections remain mandatory. Backups and staging paths must be direct children of the verified output root, be regular directories when they already exist, and be cleaned only after successful verification or a successful restoration. The generator must refuse an unfamiliar, linked, or concurrently changed generated path rather than guessing ownership.
