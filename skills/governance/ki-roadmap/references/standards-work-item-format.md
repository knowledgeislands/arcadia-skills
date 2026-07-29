# Repository work-item format

## Placement and identity

Each work item is one regular Markdown file directly under `docs/roadmap/`:

```text
docs/roadmap/<REPO>-<THEME>-<NNN>-<slug>.md
```

`<REPO>-<THEME>-<NNN>` is the identifier described by [the repository-roadmap standard](standards-repository-roadmaps.md).

`<slug>` is lowercase kebab-case and no longer than 50 characters.

## Frontmatter

```yaml
---
id: KI-HARNESS-FND-001
title: Short descriptive title
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---
```

`id`, `title`, `theme`, `horizon`, `status`, `blocks`, `blocked-by`, and `baseline-ref` are required.

`candidate` is required for Future items and must be `true`; it is absent from every other horizon.

`horizon` is one of `blocking`, `next`, `soon`, `waiting-for`, `parked`, or `future`.

`status` is `open`, `ready`, `in-progress`, `acceptance`, or `done`.

`blocks` and `blocked-by` are arrays of item identifiers and use `[]` when empty.

`baseline-ref` is `null` until execution begins, then the immutable full lowercase commit ID.

`theme` is the human-readable kebab-case project grouping.

An optional non-empty `transferred-from` records a durable handoff origin.

## Body

Every item begins with these sections in order:

```markdown
## Context

Why the work exists and the intended outcome.

## Boundary

What this item deliberately does not include.
```

An item may add concise relevant context after `## Boundary`.

When it enters execution, retain those sections and append these sections in order:

```markdown
## Current state

The honest baseline, including gaps.

## Steps

1. Concrete, inspectable action.

## Files touched

The minimal expected scope.

## Verify

A pass/fail command or assertion.

## Dependencies / blocks

Narrative dependency context.
```

When delegated work is planned, append `## Delegation` after `## Dependencies / blocks`.

It names bounded worker deliverables and file boundaries, the gate between rounds, and the orchestrator’s final review and verification responsibility.

Before acceptance, append `## Acceptance` with `### Delivered`, `### Summary of changes`, `### Verification`, `### Outstanding concerns`, and `### Mini recap` in that order.

After explicit acceptance, append terminal `## Done`.

Completed steps remain checked rather than being removed.
