---
name: ki-implement
ki-depends-on: []
description: >
  Implements one explicitly approved, ready repository work item through the delivery cycle: preflight, immutable baseline, in-progress transition, bounded plan execution, delegation when the approved plan says so, integration, verification, and an acceptance packet. A process skill (kind: process): it stops at acceptance and never selects work, reshapes a plan, self-accepts, prunes, pushes, releases, or expands authority. Use when asked to "implement this ready plan", "start this work item", "execute the approved plan", or "prepare this plan for acceptance". For next-work selection use ki-next; for plan shaping use ki-plan; for delegated execution use ki-delegate; for closure and pruning use ki-accept.
argument-hint: 'implement <work-item> | help'
---

# ki-implement

**Kind:** process.

Delivers one approved, ready repository work item to an evidence-backed acceptance boundary.

Read [the implementation procedure](references/standards-implementation.md) before acting.

## What this skill does

`ki-implement` owns one work item's delivery path from `ready` to `in-progress` to `acceptance`.

It does not choose work, create or reshape a plan, close a lifecycle, or delete a record.

1. Preflight the repository, exact work item, readiness, approval, dependencies, and stated verification.
2. Record the immutable full-commit baseline and transition only that item to `in-progress`.
3. Apply the approved plan within its boundary.
4. Use `ki-delegate` only when the approved plan or an explicit authority record calls for delegation.
5. Review and integrate bounded results, run the required verification, and record the evidence.
6. Create the acceptance packet, transition the item to `acceptance`, and stop.

The caller or `ki-accept` owns the next decision.

## Relationship boundary

`ki-recap` may surface unfinished work and learning routes, but it does not start or close implementation.

`ki-next` selects and prepares forward work; it does not authorise its execution.

`ki-plan` owns plan shape and readiness material; it does not replace this delivery procedure.

`ki-delegate` prepares and gates bounded worker lanes when this item's approved plan calls for them; it does not confer execution authority.

`ki-batch` may coordinate repeated independent runs only under an explicit bounded authorisation.

It does not bypass readiness, baseline, scope, verification, or acceptance gates.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

`implement <work-item>` resolves one canonical repository work item and follows the procedure.

With no item, identify that an explicit approved ready item is required and stop.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- Implementation is not autonomous authority. Stop for a missing approval, an ambiguous plan, a failed required gate, material scope expansion, an external coordination need, an irreversible action, or any decision outside the item's stated authority.
- No KI CLI command, wrapper script, runtime-specific spawning mechanism, push, release, or deletion belongs here.
- `acceptance` is evidence for review, never inferred approval.
