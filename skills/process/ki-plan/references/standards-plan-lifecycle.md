# Work-item lifecycle procedure

The preflight and ownership boundary live in [`SKILL.md`](../SKILL.md).

This procedure operates only canonical non-KB work-item files.

## `new <theme> <title>`

1. Require explicit user confirmation of the theme, title, honest horizon, concise Context and Boundary, and initial topic-oriented Discussion.
2. Allocate the next `<REPO>-<THEME>-<NNN>` identifier and write `docs/roadmap/<id>-<slug>.md` using the work-item format with `status: open`.
3. When the confirmed horizon is Soon, include its Shaping section; when it is Blocking or Next, continue through `shape` before proposing readiness.
4. Rebuild the root index through `ki repo conform --skill ki-roadmap` and audit before reporting the created item for review.

## `shape <id>...`

1. Resolve every named item and require `status: open`, user-confirmed wording, and a horizon whose detail contract can be satisfied.
2. At Soon, add or refine Shaping: intended approach, known dependencies, decisions still needed, and promotion conditions.
3. At Blocking or Next, add or refine Current state, Steps, Files touched, Verify, Dependencies / blocks, and Delegation where appropriate.
4. Preserve structured rationale and the final topic-oriented Discussion; never replace a material handoff or design proposal with a thin execution checklist.
5. Re-audit and stop for review. Shaping does not imply readiness approval.

## `ready <id>...`

1. Resolve every named item and require `horizon: blocking` or `horizon: next`, `status: open`, concrete execution sections, a final topic-oriented Discussion, satisfied dependencies, checkable verification, and explicit approval.
2. Atomically set every selected item to `status: ready`.
3. Re-audit and commit the coherent batch.

## `promote`

Promotion consumes an available runtime-native Plan Mode scratch record.

It creates or enriches one canonical item through `new` and `shape`, preserving durable material in the work-item format and replacing the scratch record only with a pointer after the canonical item is safely published.

## `status [theme]`

Read the root orientation and all canonical work-item frontmatter.

Without a theme, report active and retained items plus dependency edges.

With a kebab-case theme, filter by the item `theme` field.

## Handoff after Ready

`ki-plan` stops after a successful readiness transition.

`ki-implement` owns `ready` → `in-progress` → `acceptance`, including the immutable baseline, checked implementation steps, verification, material execution decisions, and acceptance evidence packet.

`ki-accept` owns explicit `acceptance` → `done` and confirmed pruning.

`ki-recap` and `ki-next` may recommend retained done records for cleanup but never delete them.

This is a clean responsibility cut: do not retain `execute`, `accept`, `done`, or `prune` aliases in `ki-plan`.

## Mandate

For a multi-file or multi-step non-KB change, enrich the selected work item before implementation.

The Ready record is committed before implementation and remains the recoverable, dependency-aware history.

For a Knowledge Base, use the `ki-kb-streams` proposal Checklist instead.
