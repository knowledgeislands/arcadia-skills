# Repository roadmap standard

## Scope

This standard applies to non-KB repositories.

A repository whose `.ki-config.toml` declares `repo_type = "kb"` uses `ki-kb-streams` and must not add a parallel project `ROADMAP.md` or `docs/roadmap/` tree.

## Contents

- [Canonical shape](#canonical-shape)
- [Horizons](#horizons)
- [Horizon transitions and readiness](#horizon-transitions-and-readiness)
- [Work-item discipline](#work-item-discipline)
- [Handoff review](#handoff-review)
- [Conform and educate](#conform-and-educate)

## Canonical shape

Every non-KB repository uses one shape.

```text
ROADMAP.md                              # concise orientation
docs/roadmap/
  <REPO>-<THEME>-<NNN>-<slug>.md        # one durable work item
```

`ROADMAP.md` is a concise stable orientation that points to `docs/roadmap/` and explicitly does not duplicate the work-item queue.

CLI tooling reports and filters the canonical items.

Each work-item file is canonical and owns its full authored detail.

There are no simple or thematic profiles, theme `ROADMAP.md` files, `plans/` directories, item locators, or standalone plan records.

The item identifier is globally unique within its repository: `<REPO>-<THEME>-<NNN>`.

`<REPO>` is the stable uppercase `repo_code` in the `ki-repo` table.

`<THEME>` is an uppercase semantic code declared in the `ki-roadmap` table’s `themes` mapping.

`<NNN>` is a zero-padded serial allocated within that repository/theme pair from `001`.

The filename repeats the identifier followed by a lowercase kebab-case slug.

The `theme` frontmatter field is a human-readable kebab-case grouping such as `foundation-tooling`.

It is deliberately retained after flattening: items in one theme may be selected, shaped, and executed together without becoming a physical directory hierarchy. Its identifier code and name must be declared together in `.ki-config.toml`:

```toml
["knowledgeislands/ki-agentic-harness:ki-repo"]
repo_code = "KI-HARNESS"

["knowledgeislands/ki-agentic-harness:ki-roadmap"]
["knowledgeislands/ki-agentic-harness:ki-roadmap".themes]
FND = "foundation-tooling"
GOV = "governance-consistency"
```

The mapping is the complete allowed theme vocabulary for the repository. Every item’s `<THEME>` identifier segment must map to its `theme` frontmatter value. It may declare a theme before that theme has an item. Keep horizons, lifecycle values, work-item location, and reporting behaviour universal rather than per-repository configuration.

## Horizons

Every work item carries one of these six `horizon` values:

1. `Blocking` — actively broken or preventing `Next`; plans permitted.
2. `Next` — scoped and ready for immediate work; plans permitted.
3. `Soon` — understood but not yet started.
4. `Waiting for` — blocked by a named external condition.
5. `Parked` — intentionally paused with a named return trigger.
6. `Future` — speculative or unscoped; `candidate: true` marks uncommitted work.

The root orientation holds no horizon headings or item list.

Work items are open-only.

Completed work is removed by an explicit prune after its accepted item record has been committed.

Continuous practices belong in a standard or orientation file, not among finite work items.

## Horizon transitions and readiness

Horizon moves are authored, judgment-led decisions.

CONFORM never chooses a move; it only repairs the concise root orientation.

- **Future → Soon** requires enough scope to state the intended outcome and boundary.
- **Future → Next** is permitted when one review establishes the Future minimum plus actionable scope, understood dependencies, and readiness to start; state why Soon adds no useful shaping stage and re-evaluate at Next.
- **Soon → Next** requires actionable scope, understood dependencies, and readiness to start.
- **Waiting for → another horizon** requires evidence that its named external condition changed.
- **Parked → another horizon** requires evidence that its named return trigger or priority changed.
- A move back to **Soon**, **Waiting for**, **Parked**, or **Future** must preserve honest wording and any linked item lifecycle state.

`Blocking` and `Next` are the only horizons that may be shaped into an execution-ready plan or enter implementation.

An item may be expanded with executable steps only after it reaches one of those horizons and the user confirms the work.

An immediate item may remain `status: open` while `ki-plan` shapes it.

It becomes `status: ready` only after its execution detail and verification are reviewable, its dependencies are satisfied, and the user approves it for implementation.

When no immediate work is eligible, `ki-next` evaluates Blocking and Next first, then Soon, then Future.

Every confirmed move is re-evaluated at its destination.

## Work-item discipline

Every item conforms to [the work-item format](standards-work-item-format.md), including the final topic-oriented `Discussion` section and the detail required at its current horizon and lifecycle state.

An item begins as a concise issue: outcome, boundary, current context, and enough discussion to preserve decision-useful reasoning.

At Soon, shaping records the intended approach, known dependencies, open decisions, and promotion conditions.

When multi-file or multi-step execution is selected for immediate work, `ki-plan` enriches that same file in place with current state, steps, files, verification, dependencies, and delegation where appropriate.

It never creates a duplicate plan file.

`status` records the lifecycle independently of `horizon`:

`open` → `ready` → `in-progress` → `acceptance` → `done`.

`open` covers unplanned and actively shaped work.

`ready`, `in-progress`, `acceptance`, and `done` must remain in Blocking or Next.

`ki-implement` owns `ready` → `in-progress` → `acceptance`.

Its start transition records the immutable full `HEAD` commit in `baseline-ref`; its completion writes the acceptance evidence packet.

`ki-accept` owns explicit `acceptance` → `done` and pruning selected by an explicit roadmap-item path or glob.

`ki-recap` and `ki-next` may identify or recommend eligible pruning, but they never delete a work-item record.

`blocks` and `blocked-by` use work-item identifiers, must be reverse-consistent and acyclic, and cannot permit execution while a blocker is not done.

An explicit later prune path or glob removes only the resolved `done` items; the selection itself is the deletion authority and does not need a second confirmation.

## Handoff review

Where `+/_HANDOFFS/` or `-/_HANDOFFS/` exists, include their review in the judgment portion of a roadmap audit.

- **Inbound:** identify each received handoff that needs local adoption, clarification, decline, or archive. An adopted handoff becomes this repository's own work item at an honest horizon.
- **Outbound:** identify known recipient progress that needs an originating follow-up or closure decision. The receiving repository owns its priority and execution.

The review reports proposed local action only.

It does not inspect a remote repository by default, infer acceptance from silence, move working files, or change another repository's state.

## Conform and educate

`ki repo conform --skill ki-roadmap --repo <repo> --dry-run` shows the exact root-orientation replacement.

CONFORM repairs that orientation only when every canonical item is valid.

It never invents an item, changes a horizon, changes lifecycle status, removes authored prose, reallocates an identifier, or edits an item body.

`ki repo educate --skill ki-roadmap --repo <repo>` scaffolds the root orientation only when the repository has no roadmap artefacts.

It does not create speculative work-item files.
