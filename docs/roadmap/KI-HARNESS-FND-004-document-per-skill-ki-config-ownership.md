---
id: KI-HARNESS-FND-004
title: Make repository audit evidence local-first
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Make repository audits use a physical local checkout as their primary evidence source when one is available. A local run must inspect its current repository files and configuration rather than silently substituting GitHub's default branch. A sandboxed or scheduled remote run that has no filesystem access must remain able to audit the published default branch through GitHub APIs.

The current `ki-repo` evidence collector is remote-first for root files, `.ki-config.toml`, tree coverage, and `package.json`, even when its target is a local checkout. That makes a local, unpushed fix appear absent. Live GitHub settings remain necessarily remote evidence.

## Boundary

Do not grant a remote sandbox filesystem access, infer a remote fallback after an explicitly selected local target fails, or blur the evidence source in findings. Live GitHub settings such as titles, descriptions, visibility, merge policy, topics, security, and Actions remain remote checks in every mode.

## Steps

1. Define explicit local-checkout and remote-repository evidence modes, including how a scheduled cloud run selects remote mode without a filesystem.
2. Refactor `ki-repo` so a local target reads local root files, configuration, tree signals, and package metadata; keep live GitHub settings remote.
3. Retain GitHub default-branch evidence for an organisation or remote-only target, including a sandboxed judgmental run with no local checkout.
4. Label the evidence source in findings and diagnostics so an unpushed local change and a published remote state cannot be confused.
5. Add black-box coverage for local-first evidence, remote-only fallback, explicit-target failure, and the retained live-GitHub checks; then align the repository standard and user-facing guidance.
