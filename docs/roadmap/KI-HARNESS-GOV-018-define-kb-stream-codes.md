---
id: KI-HARNESS-GOV-018
title: Define KB stream codes
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Give Knowledge Base stream proposals stable concise identifiers suitable for display and durable reference.

## Context

Human-readable stream names and paths can repeat or change. A frontmatter code would make a proposal unambiguous without deriving identity from mutable wording.

## Boundary

Do not infer codes from titles or paths, or hide missing or malformed values with a generated substitute.

## Current state

The `tools-ki` roadmap reader already exposes a scalar `code` when present, uses `KBS-001` in its compatibility fixture, and renders `undefined` when the field is absent. It does not generate an identity from a title or path.

`ki-kb-streams` currently requires `status`, `priority`, and `dependencies` on full proposals. Its standards, creation guidance, mechanical context, rubric catalogue, exemplars, and fixtures do not define or validate `code`, so duplicate, malformed, and missing values are invisible to governance.

## Steps

- [ ] Amend the Streams structure and Enactment standards so every full `stream-proposal` declares a scalar `code` matching an uppercase alpha-leading prefix plus a final zero-padded serial of at least three digits, for example `KBS-001`.
- [ ] Define proposal codes as unique across one Knowledge Base, assigned explicitly at proposal creation, stable across Focus moves, title or path changes, lifecycle transitions, and leaf/parent changes, and never intentionally reused after closure or pruning.
- [ ] Update PROPOSE, AUDIT, CONFORM, the skill summary, and exemplars: creation requires an explicit code; AUDIT reports missing, malformed, or duplicate codes; CONFORM diagnoses but never invents, renumbers, or repairs an identity.
- [ ] Extend the Streams session context and the next `ENACT-*` rubric item to inspect requiredness, grammar, and base-wide uniqueness without deriving a fallback, then add focused valid, missing, malformed, duplicate, and cross-Focus fixtures.
- [ ] Document a clean-cut migration procedure that inventories existing full proposals, has the base owner approve an explicit code map, applies it through receiver-owned KB work, and re-audits before normal proposal operation resumes; do not edit live KB repositories in this item.
- [ ] Regenerate the `ki-kb-streams` rubric publication and verify that the existing `tools-ki` `KBS-001` reader fixture remains compatible without a host-contract change.

## Files touched

- `skills/knowledge-bases/ki-kb-streams/SKILL.md`
- `skills/knowledge-bases/ki-kb-streams/references/standards-streams-structure.md`, `standards-enactment-process.md`, `exemplars.md`, and the affected mode procedures
- `skills/knowledge-bases/ki-kb-streams/scripts/rubric/contexts/streams.ts` and its focused test
- `skills/knowledge-bases/ki-kb-streams/scripts/rubric/items/enactment.ts` and catalogue-index tests
- `skills/knowledge-bases/ki-kb-streams/references/rubric.md` as generated output
- This roadmap item

## Verify

- `bun test skills/knowledge-bases/ki-kb-streams/scripts/rubric/contexts/streams.test.ts skills/knowledge-bases/ki-kb-streams/scripts/rubric/items/index.test.ts`
- Fixture-backed `ki repo audit --skill ki-kb-streams --repo <KB-fixture>` proves valid unique codes pass and missing, malformed, and duplicate codes fail without proposing writes.
- `ki dev skill rubric ki-kb-streams --write` followed by `ki dev skill rubric ki-kb-streams` proves publication parity.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit`
- Read-only confirmation that the `tools-ki` roadmap reader still renders a valid `KBS-001` and preserves explicit `undefined` for an unmigrated fixture; no `tools-ki` write is part of this item.

## Dependencies / blocks

The delivered `tools-ki` reader is compatible and creates no implementation dependency. Representative KB shapes can be modelled in the existing isolated Streams fixtures.

Applying codes to live Knowledge Bases is deliberately outside this Harness item. Each base owns its explicit allocation map, proposal edits, and Enactment approval; those migrations may follow only after this contract is accepted.

## Delegation

### Locked decisions

- The field is named `code`, is required only on full `stream-proposal` notes, and remains absent from lightweight streams and index notes.
- The grammar is `^[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*-[0-9]{3,}$`, with a positive final serial rendered to at least three digits; `KBS-001` is the compatibility exemplar.
- Uniqueness is Knowledge-Base-wide rather than Focus- or folder-scoped, and a code is immutable for the proposal's retained lifetime.
- Mechanical uniqueness covers retained proposals; preventing reuse after pruning remains an explicit allocation responsibility because the pruned record is no longer inspectable.
- Missing, malformed, and duplicate codes are explicit audit failures. CONFORM must not allocate, infer, renumber, or silently substitute an identity.

### Rounds

- Round 1: `stream-code-guidance` and `stream-code-checker` work from the locked contract in disjoint documentation and catalogue/test boundaries.
- Integration gate: the orchestrator reconciles terminology and evidence, regenerates the rubric publication once, runs all focused and repository gates, and reviews the final diff.

### Worker: stream-code-guidance

- **Deliverable:** Normative requiredness, grammar, allocation, stability, migration, and mode guidance with one conforming exemplar.
- **Files:** `SKILL.md` and `references/` under `skills/knowledge-bases/ki-kb-streams/`, excluding generated `references/rubric.md`.
- **Definition of done:** A proposal author can assign a code without using title/path derivation, and an existing base has a bounded manual migration route.
- **Model:** high-reasoning — normative standard authoring against a locked contract.
- **Verify:** Orchestrator runs the `ki-skills` audit and checks every normative statement and the exemplar against the locked grammar.
- **Checkpoint:** Return before changing catalogue code, generated publications, or any live Knowledge Base.

### Worker: stream-code-checker

- **Deliverable:** One catalogue criterion, session evidence, and fixtures for requiredness, grammar, and Knowledge-Base-wide uniqueness.
- **Files:** `skills/knowledge-bases/ki-kb-streams/scripts/rubric/` only.
- **Definition of done:** Valid codes pass; missing, malformed, and cross-Focus duplicates fail; AUDIT and CONFORM invent no code and propose no identity write.
- **Model:** balanced — a single criterion with fixtures inside one enumerated directory.
- **Verify:** Orchestrator runs the focused rubric tests and confirms CONFORM proposes no identity write on the malformed fixtures.
- **Checkpoint:** Return before regenerating the publication or changing `tools-ki`.

### Escalate

- Stop if representative existing codes cannot satisfy the locked grammar without renumbering, or if durable non-reuse requires a new registry or configuration field.
- Stop before adding automatic allocation, a title/path-derived fallback, a cross-repository write, or a `tools-ki` parser change.
- Route live-base migration and any consumer change to separately authorised receiver-owned work.

## Discussion

### Source

This item adopts `TRD-c8a23b80`.
