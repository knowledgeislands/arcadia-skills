# `ki-change-management-linear` effectiveness review

- **Position:** 10 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `28ca93c80e74cc9b59e0f2b4596ef474e183190d` plus current official-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the compact safety and configuration boundary, but correct the identity contract and describe it honestly as non-operational before grading.

## Sources and mechanics

The seven-line source record contains no official Linear locator or review date, despite making volatile identifier, workflow, archiving, and remote-operation claims. Current official evidence confirms that issues belong to a team, team identifiers are configurable, [workflows are team-specific](https://linear.app/docs/configuring-workflows), and the API accepts shorthand issue identifiers and model UUIDs. The source set should track the exact primary pages for each claimed invariant.

The generated rubric is in sync and TypeScript passes. A focused repository audit is not applicable because this Harness selects and declares only the roadmap adapter; attempting to select this undeclared skill correctly fails before execution. The adapter has no focused tests, eval scenario, matrix row, or result evidence.

Its sole criterion validates that the base selects `linear`, the local team key has an uppercase shape, and no extra configuration key exists. It does not resolve the remote team, verify workflow mapping, or establish record identity.

## Selection and outcome effectiveness

The description has direct Linear triggers and useful local/GitHub off-ramps. Exact-write confirmation, pre-write rereads, explicit workflow mapping, and refusal to infer acceptance from a state name provide potentially valuable safety.

The skill is not presently an executable adapter. Shared process skills still resolve local roadmap or Streams records and have no authorised Linear path; existing `KI-HARNESS-FND-014` records this gap. The description overstates operational support by claiming those processes are mapped today.

## Instruction economy and architecture

The 36-line entrypoint and 25-line standard are appropriately small. The base owns selection, this skill should own Linear-specific identity, lifecycle translation, migration, and remote authority, and process skills should consume the resolved adapter.

The configuration cannot support the stated contract. A syntactically valid team prefix is mutable, and no exact workflow-state mapping, remote team identity, alias history, or migration boundary is declared or audited.

## Executability and safety

Current local-only audit and CONFORM behavior is safe, and remote writes remain authority-gated but unimplemented.

The core identity invariant is wrong. The skill calls `ENG-123` stable and canonical, but [moving an issue to another team creates a new issue identifier and URL](https://linear.app/docs/editing-issues); old identifiers remain searchable and redirect, the status is mapped to the destination workflow, and some fields may be cleared. Current official authority therefore establishes `ENG-123` as a current team-scoped locator and historical alias, not a stable cross-team canonical reference. Linear documents a model UUID but not its persistence across team moves, so it must not be promoted to durable identity without stronger evidence.

The retention wording also implies a separately authorised reversible archive operation, while [Linear automatically archives inactive closed issues and exposes no manual archive action](https://linear.app/docs/delete-archive-issues). Deleted issues have a bounded recovery window and are not equivalent to archive.

## Evidence and gaps

There are no fixtures for selection, remote team resolution, mutable team keys, exact lifecycle mapping, cross-team moves, alias re-resolution, metadata loss, archive/delete behavior, permissions, stale reads, conflicts, or no-write behavior. There is no assisted-versus-baseline outcome evidence.

## Proposed remediation

These proposals are not approved implementation:

1. Add dated official sources for team identity, issue identifiers, workflow states, moves, archive/delete behavior, permissions, and API identity.
2. Replace stable/canonical shorthand-ID language with current team-scoped locator language and make a team move an explicit authority-gated migration stop.
3. Require re-resolution of current identifier, team, workflow mapping, affected metadata, and retained aliases after a move; establish UUID persistence before using it as durable identity.
4. Correct archive and deletion semantics.
5. Route remote resolution, execution, conflict, and no-write fixtures through existing `KI-HARNESS-FND-014`; until delivered, narrow the description to actual configuration and guidance.

No new skill, agent, or hook is proposed. Existing `KI-HARNESS-FND-014` is the appropriate remediation owner.
