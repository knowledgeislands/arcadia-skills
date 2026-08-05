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

## 4. Prune explicitly selected completed records

1. Accept one or more explicit canonical work-item paths or filename globs. Resolve globs only beneath `docs/roadmap/`; reject absolute paths, parent traversal, an empty match, symlinks, directories, and files outside the canonical work-item shape. The caller should quote a shell glob so the procedure receives it.
2. Resolve the full matching set before deleting anything and confirm from each record that its status is `done`.
3. The explicit paths or globs are the deletion authority. Do not ask for a second confirmation merely because the resolved set contains more than one `done` item.
4. Delete only the resolved regular `done` files, then run the applicable repository gates and record the cleanup coherently.

Do not broaden a supplied glob, prune an accepted-but-not-done item, follow a symlink, or delete a record because it looks old.

`ki repo roadmap prune` is a separate native host operation: it sweeps every selected repository's canonical regular `done` records after validating the complete selected set. It does not approve closure, choose records by inference, delete a non-terminal item, or replace this procedure when an explicit path or glob selection is required.

## Batch authority

`ki-batch` may request batched acceptance only when its authorisation explicitly names the accepted items and grants that closure authority.

Pruning remains separate from batch execution and acceptance. An explicit path or glob selection is required even when the batch authorisation names the completed items.
