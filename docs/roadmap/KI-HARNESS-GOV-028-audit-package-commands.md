---
id: KI-HARNESS-GOV-028
title: Audit package commands
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make every `bun run` command in the estate intentional, correctly named, and aligned with the current direct-CLI governance contract.

## Context

Package scripts can become stale wrappers, duplicate native commands, hide destructive behaviour, or name a verification scope inaccurately. The estate has moved several responsibilities to `ki` and direct tools, so its script keys need one evidence-led inventory rather than ad hoc cleanup.

## Boundary

Do not remove or rename a script merely because it looks redundant, restore retired wrappers for compatibility, or use a script inventory to change a repository's toolchain without its owner and verification boundary.

## Shaping

### Intended approach

Inventory every declared `scripts` key, its caller, underlying command, side effects, and current standard owner. Classify each as a necessary public entrypoint, a useful local alias, stale compatibility surface, or a candidate for repository-owned follow-up.

### Promotion conditions

Promote when the inventory format, estate scope, treatment of scripts outside Bun repositories, and receiver-owned path for any non-trivial repair are agreed.

## Discussion

### Direct commands

The aim is clarity, not a blanket ban on package scripts. A script remains legitimate when it expresses a stable repository operation better than an undocumented command line.
