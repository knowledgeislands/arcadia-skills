---
name: ki-accept
ki-depends-on: []
description: >
  Closes one evidence-backed repository work item from acceptance to done, retains completed records, and prunes done items selected by explicit roadmap-item paths or globs. A process skill (kind: process): human approval is required by default for closure, and it is the sole owner of lifecycle closure and deletion. The explicit prune selection is deletion authority; it never needs a second confirmation. Use when asked to "accept this plan", "mark this work done", "close this accepted item", "prune done plans", or "remove these completed roadmap records". For delivery use ki-implement; for plan shape use ki-plan; for work selection use ki-next; for session findings use ki-recap.
argument-hint: 'accept <work-item> | prune <work-item-or-glob>... | help'
---

# ki-accept

**Kind:** process.

Reviews acceptance evidence, records approved closure, retains completed records, and prunes explicitly selected done records.

Read [the acceptance procedure](references/standards-acceptance.md) before acting.

## What this skill does

`ki-accept` is the only process skill that closes a work-item lifecycle or deletes a completed work-item record.

1. Confirm the exact item is at `acceptance` and its evidence is complete enough for review.
2. Present the acceptance packet and require human approval by default.
3. Record approved closure as `done` and retain the done record.
4. Prune only `done` records resolved from explicit roadmap-item paths or globs; the selection is the deletion authority.

It never chooses work, starts implementation, edits plan scope, reconstructs missing verification, or treats a recap or passing command as human approval.

## Relationship boundary

`ki-recap` identifies unfinished work and may recommend an acceptance action; it never closes or deletes an item.

`ki-next` selects forward work and may surface retained records; it never accepts or prunes them.

`ki-plan` owns plan shape and the ongoing record, but terminal closure and pruning belong here.

`ki-delegate` can help execute bounded review preparation only when separately authorised; it cannot approve or delete.

`ki-batch` may request batched acceptance only when its explicit authorisation grants it for named items.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

`accept <work-item>` reviews one item at `acceptance` and stops for the required authority unless an explicit batch authorisation permits that named acceptance.

`prune <work-item-or-glob>...` resolves each explicit pathname or glob only under `docs/roadmap/`, verifies that every resolved regular work-item file is `done`, then deletes that set. Quote shell globs. The invocation is the deletion authority: do not ask for a second confirmation.

With no target, identify the required exact accepted item or done records and stop.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- Human approval is the default; it is never inferred from a clean gate, a commit, a recap, or silence.
- Done records are retained history. Pruning is explicit destructive cleanup, not automatic housekeeping.
- No KI CLI command, wrapper script, runtime-specific mechanism, push, or release belongs here.
