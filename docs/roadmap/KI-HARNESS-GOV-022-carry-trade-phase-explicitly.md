---
id: KI-HARNESS-GOV-022
title: Carry trade phase explicitly
theme: governance-consistency
horizon: now
status: in-progress
blocks: [KI-HARNESS-GOV-023]
blocked-by: []
baseline-ref: 6c63ce419b28311b87780c5da5559eeb2bdd51dc
---

## Goal

Give every trade record copy an explicit `phase` field drawn from a closed vocabulary, so lifecycle is read from the record rather than inferred from its directory, and retire the `_PREPARATIONS` path segment.

## Context

A trade record's lifecycle is encoded twice, once in its path and once in its frontmatter, and the two carry different amounts of it. A local preparation lives beneath `-/_TRADES/_PREPARATIONS/<owner>/<name>/` and declares `phase: preparing`, which a reader can validate. A submitted sender copy lives beneath `-/_TRADES/<owner>/<name>/` and declares no phase at all, because submission removes the field. The submitted state is therefore expressed by the absence of a marker rather than by a value, so a record that lost its phase line for any other cause is indistinguishable from a submitted one.

The reserved directory name shares a namespace with repository owners, so an outbound scan must skip an entry literally named `_PREPARATIONS` while walking owner directories — a reserved name colliding with the owner namespace it sits inside. Submission also strips the field by replacing the exact text of the phase line followed by the closing frontmatter delimiter, which silently depends on `phase` remaining the last key in the block; reordering frontmatter would leave a submitted record still declaring itself preparing, with nothing to catch it.

Under an explicit `phase` field, a preparation differs from a submission by the value of a field rather than by its location, and submission becomes an ordinary field update instead of a text substitution that depends on key order. The vocabulary is closed and names every state a copy can hold rather than only the first one: `preparing` for a mutable sender-local intent, `submitted` for a frozen outbound copy, and `received` for a receiver's inbound copy, which reads `phase: received` beside the `decision_status` and `received_from_ref` that receipt already adds.

`decision_status` remains a separate field with its own vocabulary, because it records the receiver's disposition toward the trade rather than the state of the copy that carries it, and the two axes advance independently.

## Boundary

This item owns the record contract, the phase vocabulary, the directory-layout change, the rubric criteria, and the migration of existing records. It does not change the host's preparation, submission, observation, receipt, or release implementation; that lands as a separate item in `tools-ki`. It does not change per-partner `<owner>/<name>` grouping, which stays. It does not touch the `-` and `+` working areas, which continue to encode direction. It does not merge `decision_status` into the phase vocabulary, and it does not add a compatibility period in which both the reserved directory and the explicit field are honoured.

## Current state

`references/standards-trades.md` in `ki-trades` documents the `_PREPARATIONS/<receiver-owner>/<receiver-repository>/` path, states that a preparation carries `phase: preparing`, and states that submission atomically moves the identity to the canonical outbound path and removes `phase`. The submitted record format lists eight required sender fields and does not include `phase`. Ten trade records exist across the estate and zero preparations, so migration adds an explicit phase line and moves no directories. Seven inbound copies live here under `+/_TRADES/`; the remaining three are outbound copies in `tools-ki` under `-/_TRADES/`. Three trades — `TRD-094f7987`, `TRD-961f5d5a`, and `TRD-aacc8a12` — hold both copies, so their two sides must be migrated to identical sender-owned content or `KI-HARNESS-GOV-023` will report them as divergent forever. The other four inbound copies have no surviving sender copy, their senders having released.

Adding a phase line to an already-submitted record is a deliberate, one-off exception to the immutability of the sender projection, authorised by this contract change and performed as a single migration commit rather than by any ongoing operation.

## Steps

- [ ] Define the closed `phase` vocabulary — `preparing`, `submitted`, `received` — in `references/standards-trades.md`, making the field required on every copy and naming which value each copy holds.
- [ ] Rewrite the storage layout in the same standard to remove the `_PREPARATIONS` segment, so a preparation and its submitted successor share one path under `-/_TRADES/<owner>/<name>/`.
- [ ] Restate submission as a field rewrite from `preparing` to `submitted` at a stable path, and delete the text-substitution rule that depends on `phase` being the last frontmatter key.
- [ ] Add `phase: received` to the inbound receiver copy's permitted fields, and state explicitly that it is the copy's own state while `decision_status` remains the receiver's disposition.
- [ ] Update the `ki-trades` rubric criteria and generated publication to require a valid phase on every record, reject the reserved directory name, and drop the reserved-name skip from the outbound scan rule.
- [ ] Migrate the seven inbound copies here, adding `phase: received`, in one clearly-labelled commit.
- [ ] Coordinate the three paired trades with `tools-ki` so both sides of `TRD-094f7987`, `TRD-961f5d5a`, and `TRD-aacc8a12` gain identical sender-owned content, since a one-sided migration would leave them permanently divergent under `KI-HARNESS-GOV-023`.
- [ ] Raise the corresponding host implementation item in `tools-ki` and confirm its sequencing against this repository's migration.

## Files touched

- `skills/governance/ki-trades/references/standards-trades.md` — phase vocabulary, storage layout, submission semantics, and record format.
- `skills/governance/ki-trades/scripts/rubric/items/` and `references/rubric.md` — criteria for phase validity, layout, and scanning, plus the regenerated publication.
- `+/_TRADES/` and `-/_TRADES/` — the ten existing records gaining an explicit phase line.
- Any other skill or document reproducing the `_PREPARATIONS` path in an example.

## Verify

- `ki repo audit --skill ki-trades` passes clean against the migrated records.
- Every record under `+/_TRADES/` and `-/_TRADES/` declares a `phase` value drawn from the closed vocabulary.
- No `_PREPARATIONS` directory exists in the repository and no tracked file references that path except as historical narration.
- The standard nowhere makes submission depend on the ordering of frontmatter keys.

## Dependencies / blocks

The host implementation of preparation, submission, and receipt against the new field and path lands in `tools-ki` as `KI-TOOL-CLI-026`, authored in parallel with this item. That repository owns its own priority, plan, and execution; this item does not block on it, and the two repositories coordinate their cutover explicitly rather than through a blocking dependency.

This item blocks `KI-HARNESS-GOV-023`, because the integrity criterion that item introduces must compare records in their post-migration shape, and because the one-off addition of a phase line to already-submitted copies is exactly the kind of rewrite that criterion is designed to reject once it exists.

## Discussion

### Source

This item adopts [TRD-961f5d5a](../../+/_TRADES/knowledgeislands/tools-ki/TRD-961f5d5a.md).

### Consequence: version control reads submission differently

Replacing a file move with a field rewrite changes what version control shows for a submission, from a rename to a content change. The trade flags this without arguing for either reading. The rename is the more legible artifact in a `git log --follow` view; the content change is the more honest one, because a submission genuinely alters what the record asserts about itself and does not relocate the trade. This item accepts the content change and records the loss deliberately.

### Consequence: working areas still encode direction

The `-` and `+` working areas continue to encode direction even though the `sender` and `receiver` fields already determine it. Whether that redundancy is worth removing is a distinct question, raised by the source trade but not settled here, because the working areas carry meaning across this repository beyond trades and any change to them is far wider in scope than the record contract.

### Why phase and decision status stay separate

Collapsing them would be tempting, since both look like lifecycle. They are not one axis. A copy can be `received` while its disposition is `unconsidered`, `parked`, or `applied`; a copy can be `submitted` while no disposition exists anywhere, because no inbound copy has been created. Merging them would force one of the two states to be inferred, which is exactly the defect this item removes from the path encoding.
