# Implementation procedure

This is the on-demand procedure for `ki-implement`.

The kind, boundary, and relationship map live in [the skill](../SKILL.md).

## 1. Preflight

1. Resolve the physical git root and the one canonical regular work-item file.
2. Confirm that the item is `ready`, is explicitly approved for implementation, has satisfied dependencies, and contains a bounded plan with stated verification.
3. Confirm the repository's applicable read-only gates are clean before changing lifecycle state.
4. Read the item boundary, locked decisions, escalation points, delegation instruction, and stop conditions.

Stop if any precondition is missing or ambiguous.

Do not select another candidate, promote a horizon, invent plan detail, or treat a recap as approval.

## 2. Start one delivery

1. Record the full current `HEAD` commit ID as the immutable baseline.
2. Transition only the approved item to `in-progress`.
3. Commit the coherent lifecycle start before implementation where repository practice requires it.

The baseline describes the starting evidence; it is not a substitute for verification.

## 3. Execute the approved plan

Follow the checked plan steps in order and preserve its boundary.

Use `ki-delegate` only when the plan explicitly calls for it, or when an explicit authority record permits it.

Every delegated unit must retain its bounded scope, locked decisions, escalation boundary, definition of done, and verification gate.

Review and integrate every result before the next dependent unit.

Stop rather than infer authority when scope must expand, a decision is escalated, verification fails, external coordination is needed, or an irreversible action is proposed.

## 4. Verify and prepare acceptance

Run the item's stated verification after integration and inspect its actual results.

Record an acceptance packet containing:

- the delivered boundary and any deliberately excluded work;
- baseline and resulting commits or equivalent immutable evidence;
- verification commands and outcomes;
- material decisions, deviations, and unresolved concerns; and
- proposed learning routes, if any, without promoting them automatically.

Set the item to `acceptance` only when all required steps and checks are complete.

Then stop.

`ki-accept` owns review approval, terminal closure, retention, and deletion.

## Batch authority

`ki-batch` may authorise a named item to enter this procedure only when its bounded authorisation expressly grants that execution.

It never makes a vague plan executable, and it does not make acceptance automatic unless the authorisation explicitly grants batched acceptance for the named item.
