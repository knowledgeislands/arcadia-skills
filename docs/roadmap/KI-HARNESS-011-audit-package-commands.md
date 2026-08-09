---
id: KI-HARNESS-011
title: Audit package commands
theme: governance-consistency
horizon: now
status: ready
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

## Current state

The estate has no current complete script inventory after the move to direct `ki` commands. Existing package keys therefore cannot yet be distinguished reliably between stable entrypoints, useful local aliases, stale wrappers, and unsafe or misleading operations.

## Steps

- [ ] Define the inventory fields: repository, package-manager applicability, script key, command, caller or documented purpose, side-effect class, current governing owner, and disposition.
- [ ] Inventory every estate repository with a regular `package.json`; record repositories without Bun/package scripts as not applicable rather than treating their absence as drift.
- [ ] Compare every `ki:*` key with the current direct-CLI contract and classify each script without changing, restoring, or renaming any package key.
- [ ] Record evidence-backed receiver-owned follow-ups for stale, ambiguous, destructive, or unowned scripts; retain a PASS disposition for intentional public entrypoints and local aliases.
- [ ] Reconcile inventory totals against the inspected manifests and review the report for false claims of ownership or side effects.

## Files touched

This roadmap item only, as the durable inventory and receiver-routing evidence. No peer `package.json`, lockfile, workflow, or script is changed in this audit.

## Verify

- Every regular estate `package.json` appears once, with an explicit not-applicable result where it has no scripts.
- Every declared script key is represented once in the inventory, and totals reconcile to the source manifests.
- Every proposed change names a receiving repository and remains unimplemented in this item.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This is read-only estate evidence work. Individual repairs belong to their repository owners and do not block the audit record from reaching review.

## Discussion

### Direct commands

The aim is clarity, not a blanket ban on package scripts. A script remains legitimate when it expresses a stable repository operation better than an undocumented command line.
