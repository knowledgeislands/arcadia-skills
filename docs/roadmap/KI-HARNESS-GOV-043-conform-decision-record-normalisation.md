---
id: KI-HARNESS-GOV-043
area: GOV
title: Conform Decision Record normalisation
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: [KI-HARNESS-GOV-040]
baseline_ref: null
---

## Goal

Make the derivable Decision Record metadata and index-link checks safely conformable after the governing metadata authority is settled.

## Context

The GOV-009 source-loaded review identified `ki-decision-records` `FM-3`, `FM-4`, and `INDEX-4` as deterministic automation candidates. The first two map a canonical filename prefix to metadata, while the third maps a recognised record ID to its canonical filename in the ordered index.

GOV-040 still owns the unresolved conflict between the Decision Record `type` contract and the Knowledge Base-wide sole-kind classifier. Implementing metadata normalisation before that decision would encode one authority accidentally.

## Boundary

Wait for GOV-040 before changing `type` or `decision_type`. Preserve record identity, prefix, filename, body, unrelated frontmatter, index order, and unrelated prose. Do not renumber records, choose their semantic classification, rewrite malformed YAML, or normalise unrecognised index text.

## Current state

All three criteria remain diagnostic with specific guidance. `ki-decision-records` already parses canonical record identity and index entries, but its conform session only appends missing index entries and has no operation-scoped record draft.

## Steps

- [ ] Apply the approved GOV-040 metadata authority to `FM-3` and `FM-4` without introducing a second schema.
- [ ] Add one preserving record draft that coalesces the two exact scalar updates and refuses malformed or unsafe sources.
- [ ] Add a preserving ordered-index normaliser for recognised IDs and canonical filenames while refusing ambiguous text.
- [ ] Promote only the criteria whose final desired state remains fully derivable and add negative, preservation, and repeat-idempotence fixtures.
- [ ] Regenerate the Decision Records rubric and publish the resulting remediation-count change.

## Files touched

- `skills/governance/ki-decision-records/`
- Generated Decision Records rubric publication
- GOV-009 remediation inventory evidence
- This work item

## Verify

- GOV-040 is Done and the standard, context, and item criteria use its one approved metadata authority.
- Conformance changes only exact recognised scalars or ordered index targets and preserves unrelated bytes.
- Malformed YAML, symbolic sources, ambiguous identities, unrecognised entries, and unsafe paths produce no write.
- A repeated conform proposal is empty and the affected criteria pass a clean re-audit.
- Focused Decision Records tests, rubric publication parity, repository audits, and TypeScript pass.

## Dependencies / blocks

Blocked by GOV-040. GOV-009 supplies the candidate evidence but grants no authority to choose the pending Knowledge Base metadata contract.

## Discussion

### One owner-specific delivery

The three candidates share the same Decision Record source and parsing boundary. Keeping them together avoids separate drafts that could overwrite one another, while the blocker prevents the index convenience from being used to bypass the unresolved metadata decision.
