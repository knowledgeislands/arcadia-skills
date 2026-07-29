# Repository work-item format

## Contents

- [Placement and identity](#placement-and-identity)
- [Frontmatter](#frontmatter)
- [Body](#body)
- [Detail by stage](#detail-by-stage)

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

Every item begins with these sections in order and ends with `## Discussion`:

```markdown
## Context

Why the work exists and the intended outcome.

## Boundary

What this item deliberately does not include.

## Discussion

### Topic

Decision-useful reasoning, alternatives, or unresolved questions.
```

`Discussion` is topic-oriented rather than chronological.

Use descriptive `###` headings such as `### Authority model`, `### Source analysis`, `### Alternatives`, or `### Open questions`.

Do not turn it into a session log.

Material decisions that outlive the item still belong in a Decision Record.

An item may add concise structured sections between `## Boundary` and `## Discussion`.

A focused one-step item may remain brief.

When an item adopts a material handoff, process design, or architectural proposal, preserve the decision-useful detail rather than reducing it to a prompt: its operating model, sources, meaningful alternatives, authority and safety boundaries, unresolved questions, and intended first deliverable.

Use structured sections where the material has a stable shape and retain exploratory reasoning under topic headings in `Discussion`.

The roadmap item is the durable handoff record until its work is planned; external links alone are insufficient.

## Detail by stage

### Future / open

`Context`, `Boundary`, and final `Discussion` are sufficient.

They preserve why the item exists, its deliberate exclusion, and the reasoning needed to shape it later without pretending that it is planned.

### Soon / open

Add `## Shaping` between `Boundary` and `Discussion`.

It states the intended approach, known dependencies, decisions still needed, and the conditions for promotion.

### Next or Blocking / open to ready

Once selected for immediate work, retain the earlier sections and add these sections before `Discussion`, in order:

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

When delegated work is planned, add `## Delegation` after `## Dependencies / blocks`.

It names bounded worker deliverables and file boundaries, the gate between rounds, and the orchestrator’s final review and verification responsibility.

An immediate item may remain `status: open` while `ki-plan` shapes these sections.

It becomes `status: ready` only after the sections are concrete, dependencies are satisfied, verification is checkable, and the user approves the plan.

### In progress

The implementation process records the immutable full `HEAD` commit in `baseline-ref`, sets `status: in-progress`, and checks completed steps without deleting them.

Record material departures, decisions, and newly discovered constraints under the relevant topic in the final `Discussion`; do not record routine activity.

### Acceptance

Before setting `status: acceptance`, insert `## Acceptance` immediately before `Discussion` with `### Delivered`, `### Summary of changes`, `### Verification`, `### Outstanding concerns`, and `### Mini recap` in that order.

This is the evidence packet for an explicit acceptance decision.

### Done

After explicit acceptance, insert terminal `## Done` immediately before `Discussion` and set `status: done`.

Retain the accepted record until a separately confirmed prune.

At every stage, `Discussion` remains the final top-level section.

Completed steps remain checked rather than being removed.
