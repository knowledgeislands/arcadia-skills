---
id: KI-HARNESS-GOV-043
area: GOV
title: Conform Decision Record normalisation
theme: governance-consistency
horizon: next
status: done
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

`98e7b896ffd39dd9af0f317033a6514b7a87f89c` promotes `FM-3` and `FM-4` to one source-preserving frontmatter conform operation. `87b80d30f98b7ffac3e901485309b298154dcd12` promotes `INDEX-4` for recognised canonical index entries only. Both operations refuse malformed, conflicting, symbolic, ambiguous, and non-canonical sources.

## Steps

- [x] Apply the approved GOV-040 metadata authority to `FM-3` and `FM-4` without introducing a second schema.
- [x] Add one preserving record draft that coalesces the two exact scalar updates and refuses malformed or unsafe sources.
- [x] Add a preserving ordered-index normaliser for recognised IDs and canonical filenames while refusing ambiguous text.
- [x] Promote only the criteria whose final desired state remains fully derivable and add negative, preservation, and repeat-idempotence fixtures.
- [x] Regenerate the Decision Records rubric and publish the resulting remediation-count change.

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

This work normalises derivable Decision Record metadata and recognised canonical index-link targets after GOV-040 selects the canonical Knowledge metadata contract.

### Specifications

No behaviour-level product specification changes are planned.

### Guides

No contributor guide change is planned; the canonical Decision Record standard remains the operational reference.

### Roadmap

The metadata and index conformers are delivered and this item is awaiting review.

## Review

### Delivered

From baseline `fd1925db8eeb37adf298dc3bfc1ff4e3ab7b0b37`, `98e7b896ffd39dd9af0f317033a6514b7a87f89c` delivers the approved `FM-3` and `FM-4` metadata conformer; `87b80d30f98b7ffac3e901485309b298154dcd12` adds the bounded `INDEX-4` repair. Both are deliberately limited to derivable, canonical sources.

### Summary of changes

The Decision Records context identifies regular, non-symlink, canonical files; parses the four relevant scalar fields; and produces one coalesced frontmatter proposal. `FM-3`, `FM-4`, and `INDEX-4` are automatic. The index repair changes only the target of a recognised ordered entry whose displayed ID resolves to a regular canonical record; it preserves order, unrelated lines, and prose. Focused fixtures cover legacy scalar conversion, body preservation, repeat idempotence, malformed YAML, conflicting metadata, symlink refusal, ambiguous index text, and href preservation.

### Verification

Verification passes: focused Decision Records tests, `bunx tsc --noEmit`, `bunx biome check skills/governance/ki-decision-records`, `git diff --check`, and `ki repo audit --skill ki-decision-records --repo . --concise`. The generated rubric is source-synchronised. `rumdl` reports seven MD051 failures in that generated file because the host renderer writes mojibake em-dashes in headings while retaining normal ToC anchors; the generated publication must not be hand-edited. This is a host-renderer follow-up, not a Decision Records source defect.

### Outstanding concerns

The safe local objective is complete. Review should confirm the narrow index predicate, byte-preservation evidence, and the host-renderer follow-up. It must not treat the generated-rubric lint defect as authority to hand-edit the publication or broaden the repair.

### Post-change review

The delivered metadata and index repairs honour GOV-040 and do not alter semantic classification, filenames, bodies, arbitrary index text, order, or unrelated prose. They are appropriately fail-closed and do not broaden into estate-wide semantic rewriting.

### Mini recap

GOV-040 has been removed as a dependency. The metadata and index conformers are implemented, tested, and publication-synchronised. This item awaits human review; no acceptance, pruning, or external-repository change is proposed.

## Done

Accepted on 2026-08-17. The bounded metadata and canonical index-link conformers are retained; malformed, ambiguous, and semantic repairs remain fail-closed.

## Discussion

### One owner-specific delivery

The three candidates share the same Decision Record source and parsing boundary. Keeping them together avoids separate drafts that could overwrite one another, while the blocker prevents the index convenience from being used to bypass the unresolved metadata decision.
