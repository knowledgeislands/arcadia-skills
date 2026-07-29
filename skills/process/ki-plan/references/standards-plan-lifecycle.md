# Work-item lifecycle procedure

The preflight and ownership boundary live in [`SKILL.md`](../SKILL.md).

This procedure operates only canonical non-KB work-item files.

## `new <theme> <title>`

1. Require explicit user confirmation of the theme, title, horizon, and concise Context and Boundary.
2. Allocate the next `<REPO>-<THEME>-<NNN>` identifier and write `docs/roadmap/<id>-<slug>.md` using the work-item format with `status: open`.
3. Rebuild the root index through `ki repo conform --skill ki-roadmap` and audit before reporting the created item for review.

## `ready <id>...`

1. Resolve every named item and require `horizon: blocking` or `horizon: next`, `status: open`, concrete execution sections, satisfied dependencies, and explicit approval.
2. Atomically set every selected item to `status: ready`.
3. Re-audit and commit the coherent batch.

## `execute <id>...`

1. Resolve every named item and require `status: ready`, an immediate horizon, satisfied dependencies, and a clean confirmed start decision.
2. Atomically set every selected item to `status: in-progress` and set immutable `baseline-ref` to the full current `HEAD` commit ID.
3. Complete work in the item’s checked steps, verify it, and keep the item honest if execution pauses.

## `accept <id>`

1. Require `status: in-progress`, completed steps, and recorded verification.
2. Append the complete Acceptance packet defined by the work-item format and set `status: acceptance`.
3. Stop for explicit user acceptance; do not infer it from a passing command.

## `done <id>`

1. Require `status: acceptance` and explicit user acceptance.
2. Append terminal `## Done`, set `status: done`, and retain the record until an explicit prune.

## `prune [theme]`

1. List only selected `status: done` items and require explicit confirmation of the exact batch.
2. Delete those canonical files, rebuild the root index, audit, and commit the selected batch.

## `promote`

Promotion consumes an available runtime-native Plan Mode scratch record.

It creates or enriches one canonical item through `new`, preserving durable material in the work-item format and replacing the scratch record only with a pointer after the canonical item is safely published.

## `status [theme]`

Read the generated root index and all canonical work-item frontmatter.

Without a theme, report active and retained items plus dependency edges.

With a kebab-case theme, filter by the item `theme` field.

## Mandate

For a multi-file or multi-step non-KB change, enrich the selected work item before implementation.

The record is committed with the work and remains the recoverable, dependency-aware history.

For a Knowledge Base, use the `ki-kb-streams` proposal Checklist instead.
