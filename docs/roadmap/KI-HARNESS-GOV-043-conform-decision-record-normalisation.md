---
id: KI-HARNESS-GOV-043
area: GOV
title: Conform Decision Record normalisation
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: fd1925db8eeb37adf298dc3bfc1ff4e3ab7b0b37
---

## Goal

Make the derivable Decision Record metadata and index-link checks safely conformable after the governing metadata authority is settled.

## Context

The GOV-009 source-loaded review identified `ki-decision-records` `FM-3`, `FM-4`, and `INDEX-4` as deterministic automation candidates. The first two map a canonical filename prefix to metadata, while the third maps a recognised record ID to its canonical filename in the ordered index.

GOV-040 selected the Decision Record-specific `decision_type` and `decision_type_url` contract, with `note_type` remaining the generic Knowledge Base classifier. The remaining work must preserve that chosen boundary rather than widening the conformer into a semantic classifier or index rewriter.

## Boundary

Change only the exact derivable metadata scalars and a separately proven index operation. Preserve record identity, prefix, filename, body, unrelated frontmatter, index order, and unrelated prose. Do not renumber records, choose their semantic classification, rewrite malformed YAML, or normalise unrecognised index text.

## Current state

`98e7b896ffd39dd9af0f317033a6514b7a87f89c` promotes `FM-3` and `FM-4` to one source-preserving frontmatter conform operation. It refuses malformed, conflicting, symbolic, and non-canonical sources and leaves `INDEX-4` diagnostic. The published Decision Records rubric is currently stale against the structured catalogue.

## Steps

- [x] Apply the approved GOV-040 metadata authority to `FM-3` and `FM-4` without introducing a second schema.
- [x] Add one preserving record draft that coalesces the two exact scalar updates and refuses malformed or unsafe sources.
- [ ] Add a preserving ordered-index normaliser for recognised IDs and canonical filenames while refusing ambiguous text.
- [x] Promote only the criteria whose final desired state remains fully derivable and add negative, preservation, and repeat-idempotence fixtures.
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

GOV-040 is accepted and no longer blocks this work. GOV-009 supplies the candidate evidence but does not make the planned `INDEX-4` normaliser automatic without its own preservation and ambiguity evidence.

## Documentation impact

### Decision Records

This work normalises derivable Decision Record metadata after GOV-040 selects the canonical Knowledge metadata contract. Index-entry correction remains unimplemented.

### Specifications

No behaviour-level product specification changes are planned.

### Guides

No contributor guide change is planned; the canonical Decision Record standard remains the operational reference.

### Roadmap

The metadata conformer is delivered; the outstanding index operation and rubric publication remain in this item.

## Review

### Delivered

From baseline `fd1925db8eeb37adf298dc3bfc1ff4e3ab7b0b37`, `98e7b896ffd39dd9af0f317033a6514b7a87f89c` delivers the approved `FM-3` and `FM-4` metadata conformer. It is deliberately limited to records whose canonical filename and YAML scalar fields make the repair safe.

### Summary of changes

The Decision Records context now identifies regular, non-symlink, canonical files; parses the four relevant scalar fields; and produces one coalesced frontmatter proposal. `FM-3` and `FM-4` are automatic, while `INDEX-4` remains diagnostic. Focused fixtures cover legacy scalar conversion, preservation of the body, repeat idempotence, malformed YAML, conflicting metadata, and symlink refusal.

### Verification

Current verification passes: `bun test skills/governance/ki-decision-records/scripts/rubric/contexts/decision-records.test.ts` (15 passing tests) and `bunx tsc --noEmit`. `ki dev skill rubric ki-decision-records` and the focused Decision Records audit fail because `skills/governance/ki-decision-records/references/rubric.md` is stale against the structured catalogue. The repository authoring audit also reports pre-existing broken anchors in the change-management-roadmap generated rubric plus the same stale publication.

### Outstanding concerns

This item cannot move to awaiting review. The planned `INDEX-4` preserving index normaliser is not implemented, and the generated Decision Records rubric has not been republished. Both are explicit acceptance conditions. No evidence supports treating the published rubric or diagnostic `INDEX-4` state as complete.

### Post-change review

The delivered metadata repair honours GOV-040 and does not alter semantic classification, filenames, bodies, or arbitrary index text. It is appropriately fail-closed. Completing the item requires only the remaining bounded index operation, its negative and preservation coverage, and rubric regeneration; it must not broaden into estate-wide semantic rewriting.

### Mini recap

GOV-040 has been removed as a dependency. The metadata conformer is implemented and tested, but this work remains in progress until the index operation and generated-rubric parity are complete. No acceptance, pruning, or external-repository change is proposed.

## Discussion

### One owner-specific delivery

The three candidates share the same Decision Record source and parsing boundary. Keeping them together avoids separate drafts that could overwrite one another, while the blocker prevents the index convenience from being used to bypass the unresolved metadata decision.
