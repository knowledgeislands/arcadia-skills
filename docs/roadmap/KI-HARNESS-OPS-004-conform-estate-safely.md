---
id: KI-HARNESS-OPS-004
title: Conform estate safely
area: OPS
theme: operations
horizon: soon
status: draft
blocks: []
blocked_by: [KI-HARNESS-GOV-026]
baseline_ref: null
---

## Goal

Bring the governed estate to its current standards through reviewed, repository-bounded conform runs that preserve content and safety constraints.

## Context

The estate has accumulated configuration, documentation, and toolchain changes across many repositories. A broad conform pass is useful only after every destructive safety exception is expressible and verified; GOV-026 supplies the immediate missing guard for kit-legal.

## Boundary

Do not run an unreviewed estate-wide write command, treat a clean tool result as proof that an autofix preserved meaning, overwrite declared owned-file exceptions, or absorb repository-specific defects into a central standards change.

## Shaping

### Intended approach

Audit the estate first, classify each proposed write by repository and safety class, inspect dry-run diffs, and apply only independent bounded batches with explicit path staging and a post-write audit. Read every formatter diff where content or structural Markdown may change.

### Dependencies

GOV-026 must be accepted first so kit-legal's protective `.rumdl.toml` variation survives Authoring conform. Each repository remains the owner of any finding that requires a local decision or substantive content change.

### Promotion conditions

Promote when the initial inventory is cleanly separated into safe mechanical writes, repository-owned decisions, and blocked work; all declared safety variations are protected; and each batch has a verification and recovery boundary.

## Discussion

### Conform is evidence gathering

Conform is not a permission slip for bulk rewriting. Its value is an inspectable proposal whose actual diff is reviewed before a repository changes.
