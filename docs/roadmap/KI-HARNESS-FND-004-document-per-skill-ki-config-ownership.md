---
id: KI-HARNESS-FND-004
title: Make repository audit evidence local-first
theme: foundation-tooling
horizon: next
status: acceptance
blocks: []
blocked-by: []
baseline-ref: d1cff26c9f59c9cdb127017f7f27043f32c4371f
---

## Context

Make repository audits use a physical local checkout as their primary evidence source when one is available. A local run must inspect its current repository files and configuration rather than silently substituting GitHub's default branch. A sandboxed or scheduled remote run that has no filesystem access must remain able to audit the published default branch through GitHub APIs.

The current `ki-repo` evidence collector is remote-first for root files, `.ki-config.toml`, tree coverage, and `package.json`, even when its target is a local checkout. That makes a local, unpushed fix appear absent. Live GitHub settings remain necessarily remote evidence.

## Boundary

Do not grant a remote sandbox filesystem access, infer a remote fallback after an explicitly selected local target fails, or blur the evidence source in findings. Live GitHub settings such as titles, descriptions, visibility, merge policy, topics, security, and Actions remain remote checks in every mode.

## Current state

The local-target collector identifies a checkout, then replaces its file, configuration, tree, and package evidence with GitHub default-branch API responses whenever `gh` is available. `--org` already gives a filesystem-free discovery route for remote runs, but the rendered evidence does not distinguish its GitHub-default-branch content from a local checkout or live GitHub settings.

## Steps

- [x] Define explicit local-checkout and remote-repository evidence modes, including how a scheduled cloud run selects remote mode without a filesystem.
- [x] Refactor `ki-repo` so a local target reads local root files, configuration, tree signals, and package metadata; keep live GitHub settings remote.
- [x] Retain GitHub default-branch evidence for an organisation or remote-only target, including a sandboxed judgmental run with no local checkout.
- [x] Label the evidence source in findings and diagnostics so an unpushed local change and a published remote state cannot be confused.
- [x] Add black-box coverage for local-first evidence, remote-only fallback, explicit-target failure, and the retained live-GitHub checks; then align the repository standard and user-facing guidance.

## Files touched

- `skills/keystone/ki-repo/scripts/rubric/contexts/audit.ts`
- `skills/keystone/ki-repo/scripts/rubric/contexts/repository.test.ts`
- `skills/keystone/ki-repo/references/standards-repository.md`
- `skills/keystone/ki-repo/SKILL.md`
- `skills/keystone/ki-repo/references/rubric.md`

## Verify

- `bun test skills/keystone/ki-repo/scripts/rubric/contexts/repository.test.ts`
- `ki skill rubric ki-repo`
- `ki repo audit --skill ki-repo --repo .`
- `bunx tsc --noEmit`

## Dependencies / blocks

The local-first collector and its standards live in this harness. A future `ki repo audit` remote-repository selector, if needed beyond the collector's existing `--org` scheduled-run route, belongs to `tools-ki` and is deliberately not part of this item.

## Acceptance

### Delivered

Local `ki-repo` evidence now reads the checkout tree, `.ki-config.toml`, coverage signals, and `package.json`; a filesystem-free `--org` run continues to read GitHub default-branch content. Live GitHub settings remain remote in both modes, and subjects identify local, default-branch, live, or mixed evidence.

### Summary of changes

The collector uses `git ls-files --cached --others --exclude-standard` for a local snapshot, so ignored dependencies and `.git` do not become repository evidence. An unavailable explicitly selected local checkout produces a local-evidence failure rather than a GitHub fallback. The standard, skill orientation, and generated rubric now describe the model.

### Verification

- Focused `ki-repo` context tests pass (11 tests).
- `bunx tsc --noEmit` passes.
- A temporary GitHub-identified checkout with an unpushed invalid package version produced a local-checkout finding while live GitHub checks passed.
- `ki repo audit --skill ki-repo --repo .` passes.

### Outstanding concerns

The current linked CLI exposes no direct remote-repository selector; the collector's `--org` route remains available for scheduled filesystem-free use. Adding a CLI-level remote selector belongs to `tools-ki` if it becomes needed.

### Mini recap

FND-004 corrects the remote-first file-evidence regression without granting filesystem access to remote runners or weakening live GitHub checks.
