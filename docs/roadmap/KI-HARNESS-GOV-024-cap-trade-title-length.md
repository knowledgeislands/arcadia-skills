---
id: KI-HARNESS-GOV-024
title: Cap trade title length
theme: governance-consistency
horizon: now
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Give `ki-trades` an explicit six-word cap on a trade record's `title`, enforced only at preparation time so that submitted and received copies remain byte-immutable.

## Context

The trade standard requires a `title` string but says nothing about its length. The only guidance a reader has is the template example `title: 'Short submission title'`, which conveys the intent by demonstration alone. Demonstration is not a constraint, and the data shows it: a ten-word title has been accepted with nothing to object to it.

`ki-roadmap` caps its own titles at four words and states the reasoning — a compact human label for lists and reports, with scope and nuance belonging in Goal and Context. A trade title needs a slightly longer allowance for a reason specific to where it is read. A roadmap title sits beside its theme, its repository-coded identifier, and its horizon, all of which supply context the title does not have to carry. A trade record lands alone in another repository's `+/_TRADES/` directory, where the reader has no surrounding structure at all and the title carries the whole of the meaning. Six words is the deliberate choice for that difference.

The constraint is that submitted records are byte-immutable, so this cap can only bind at preparation. A criterion that failed an inbound record would force a receiver to mutate immutable evidence to satisfy its own lint — destroying exactly what `KI-HARNESS-GOV-023` exists to prove. The criterion must therefore FAIL on a preparation and stay silent on submitted and received copies, and that asymmetry is the point rather than an omission.

## Boundary

This item adds one criterion and its supporting standard text. It does not change the trade record format, phase vocabulary, routes, or comparison rules. It does not rename or rewrite any existing trade title, in this repository or elsewhere. It does not enforce anything on a submitted or received copy, and it does not add a warning, advisory, or informational outcome on those copies either, because any outcome at all invites a receiver to act on it.

## Current state

`references/standards-trades.md` lists `title` among the eight required sender fields and shows `title: 'Short submission title'` in the submitted record format template. No length rule exists in the standard and no rubric criterion checks one. Across the seven distinct trade titles present in this repository, three are four words and the outliers are five, six, seven, and ten words, so the cap would fail one historical title had it applied at preparation — which it did not, and which this item does not retrospectively correct. Zero preparations exist locally, so the criterion has no preparation to run against on the first pass and its correctness is established by test rather than by live data.

## Steps

- [ ] State the six-word `title` cap in `references/standards-trades.md`, alongside the reasoning that a trade record is read without the surrounding context a roadmap item enjoys.
- [ ] State in the same place that the cap binds at preparation only, and that no submitted or received copy is ever assessed against it, with the immutability reason given explicitly.
- [ ] Replace the template's `title: 'Short submission title'` with an example that demonstrates the cap rather than merely gesturing at brevity.
- [ ] Add a `ki-trades` rubric criterion in the record family that FAILs a preparation whose title exceeds six words and produces no outcome for a record in any other phase.
- [ ] Give the criterion a remediation that edits the preparation's title, and state that it is unavailable once the record is submitted.
- [ ] Regenerate the `ki-trades` rubric publication and confirm the criterion and its phase restriction both appear.
- [ ] Add a test proving both halves: a seven-word preparation fails, and a seven-word submitted or received record produces no finding.

## Files touched

- `skills/governance/ki-trades/references/standards-trades.md` — the cap, its preparation-only scope, and the template example.
- `skills/governance/ki-trades/scripts/rubric/items/` — the new criterion and its test.
- `skills/governance/ki-trades/references/rubric.md` — regenerated publication.

## Verify

- `ki repo audit --skill ki-trades` passes clean against all existing records, none of which is a preparation, including the ten-word historical title.
- A scratch preparation with a seven-word title fails the criterion; reducing it to six words passes.
- A submitted or received record with a seven-word title produces no finding of any level.
- `bun run test` and `bunx tsc --noEmit` pass.

## Dependencies / blocks

This item is independent. It touches the `title` field alone and shares no contract surface with the configuration layout, the phase vocabulary, or the integrity comparison, so it can be delivered in any order relative to the other three items in this group.

It has no cross-repository counterpart. The cap is a standard and a rubric criterion authored here; no host behaviour changes, because preparation authoring already writes whatever title the author supplies and the criterion assesses the result.

## Discussion

### Source

This item records the user's own decision. It does not arise from an inbound trade, unlike `KI-HARNESS-GOV-021` and `KI-HARNESS-GOV-022`.

### Six rather than four

The roadmap's four-word cap was considered and deliberately not reused. The difference is context, not taste: a roadmap title is read in a list where the theme, repository code, identifier, and horizon are all visible, so a terse label resolves against that structure. A trade title is read in isolation in a foreign repository, where nothing else on screen tells the reader what the record concerns. Two extra words buy that missing context and no more.

### Why silence rather than a lower level on submitted copies

Downgrading the outcome to a warning on submitted and received copies would look like a reasonable compromise and is not one. Any reported outcome on an immutable record is an invitation to fix it, and the only available fix is a mutation the trade standard forbids and the integrity criterion is built to detect. Silence is the only outcome that cannot be acted on wrongly.
