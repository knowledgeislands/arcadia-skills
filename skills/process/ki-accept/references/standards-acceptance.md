# Acceptance and pruning procedure

This is the on-demand procedure for `ki-accept`.

The kind, authority boundary, and relationship map live in [the skill](../SKILL.md).

## 1. Review acceptance evidence

1. Resolve the physical git root and one canonical regular work-item file.
2. Confirm that it is at `acceptance` and read its acceptance packet.
3. Check that the packet identifies the delivered boundary, verification evidence, deviations, and unresolved concerns honestly.
4. Re-check any state claim that materially affects approval from current repository evidence.

Do not repair missing implementation evidence by inference.

Return the item to implementation only through an explicit new decision; this procedure does not silently reopen or reshape it.

## 2. Obtain closure authority

Present the exact item, its evidence, known concerns, and proposed terminal state.

Require explicit human approval before writing `done`.

The sole exception is a batch authorisation that explicitly grants batched acceptance for this named item or exact named set.

An authorisation that merely permits execution, delegation, or reporting is not acceptance authority.

## 3. Record and retain done work

Append the terminal closure evidence required by the repository work-item format and set the approved item to `done`.

Retain the completed record as recoverable history.

Do not delete it as part of acceptance.

## 4. Prune exact completed records

1. Resolve only the exact user-named canonical records.
2. Confirm that every target is `done`.
3. Present the complete deletion set and require a separate explicit confirmation.
4. Delete only the confirmed regular files, then run the applicable repository gates and record the cleanup coherently.

Do not infer a wildcard, prune an accepted-but-not-done item, follow a symlink, or delete a record because it looks old.

## Batch authority

`ki-batch` may request batched acceptance only when its authorisation explicitly names the accepted items and grants that closure authority.

Pruning remains a separate destructive confirmation unless the authorisation explicitly grants the exact deletion set as well.
