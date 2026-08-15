---
id: KI-HARNESS-GOV-044
area: GOV
title: Conform generated-surface exclusions
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 7eb84d97f2c3485270dc8911e4c78823c1366acf
---

## Goal

Give `ki-engineering` a bounded conform path for the generated-surface exclusions it owns, while retaining a truthful cross-tool check for the `.rumdl.toml` surface owned by `ki-authoring`.

## Context

The GOV-009 source-loaded review found that the managed-surface set and retired `.ki` exclusion are closed standard data, so `GEN-1` appeared to be a genuine automation candidate. Readiness review found an ownership split that the candidate inventory did not capture: `ki-engineering` owns `biome.json` and `knip.json`, while `ki-authoring` wholly owns `.rumdl.toml` and already conforms it from a canonical template.

The safe design therefore keeps `GEN-1` as the cross-tool diagnostic and adds one automatic Engineering-owned criterion for Biome and Knip. This is an ownership split, not a duplicate check or a coverage-metric split: `GEN-1` continues to prove agreement across all three tools, while the new criterion alone owns the bounded local write.

## Boundary

Normalise only the generated-surface exclusion entries in regular, contained Biome and Knip JSON/JSONC configuration. Preserve unrelated configuration, comments, ordering outside the owned arrays, and user-selected tool policy. Refuse symbolic files, malformed input, `knip.ts`, duplicate or ambiguous properties, unsafe ancestry, and paths outside the selected repository. Do not write `.rumdl.toml`; route its correction to `ki-authoring`.

## Current state

`GEN-1` deterministically reports missing generated-surface coverage and legacy KI runtime exclusions but remains diagnostic. The Engineering session exposes evidence only and has no focused Biome/Knip draft capability. `ki-authoring` already owns an automatic canonical `.rumdl.toml` write containing all current managed-surface exclusions.

## Steps

- [ ] Retain `GEN-1` as the diagnostic cross-tool agreement check and add one automatic criterion limited to Engineering-owned Biome and Knip exclusions.
- [ ] Add one operation-scoped, format-preserving JSON/JSONC draft that coalesces the two files and fails closed on unsupported or ambiguous input.
- [ ] Prove positive, malformed, preservation, comment, symlink, dry-run, and repeat-idempotence cases without writing `.rumdl.toml`.
- [ ] Regenerate the Engineering rubric and update the GOV-009 remediation inventory evidence with the ownership-corrected disposition and totals.

## Files touched

- `skills/governance/ki-engineering/`
- Generated Engineering rubric publication
- GOV-009 remediation inventory evidence
- This work item

## Verify

- Each supported Biome or Knip format proposes only the exact generated-surface exclusion delta.
- Malformed, symbolic, unsupported, ambiguous, or escaping targets produce no write.
- Existing unrelated configuration, comments, and ordering remain intact.
- A repeated conform proposal is empty; the automatic criterion passes a clean re-audit; `GEN-1` remains truthful about any unresolved authoring-owned surface.
- Focused Engineering tests, rubric publication parity, repository audits, and TypeScript pass.

## Dependencies / blocks

GOV-009 supplies the candidate evidence. This concern-specific parser work is independent of its shared rubric contract and runtime activation proof.

## Delegation

### Worker: generated-exclusion-conformer

- **Inputs:** This approved record; `ki-engineering`'s generated-surface standard, `GEN` family, session/context, focused tests, and generated rubric; `ki-authoring`'s explicit `.rumdl.toml` ownership contract; GOV-009's remediation evidence.
- **Scope:** `skills/governance/ki-engineering/` only. The coordinator owns this roadmap record and `docs/reviews/KI-HARNESS-REV-001/audit-remediation-review.md`.
- **Authority:** Implement the locked `GEN-1`/new automatic criterion split and its focused tests. Regenerate only the Engineering rubric publication. Do not stage, commit, run conform against a real repository, or change dependencies.
- **Isolation:** Work only in the shared checkout within the exclusive skill root above. Do not edit `.rumdl.toml`, `ki-authoring`, root configuration, other skills, roadmap files, or external repositories.
- **Locked decisions:** `GEN-1` remains diagnostic and cross-tool; `.rumdl.toml` remains wholly `ki-authoring`-owned; the new automatic criterion edits only contained regular Biome and Knip JSON/JSONC sources; no generic parser dependency is added; unrelated bytes and comments are preserved; unsupported or ambiguous forms fail closed.
- **Escalation:** Stop before widening supported formats, changing ownership, adding a dependency, changing the host contract, renumbering an existing criterion, or weakening an audit outcome.
- **Definition of done:** The bounded conform draft, item classification, focused fixtures, standard wording, and generated Engineering rubric agree; the affected criterion re-audits clean after applying the proposal and produces no repeat proposal.
- **Verify:** Focused Engineering tests, Biome on touched TypeScript, rumdl on touched Markdown, Engineering rubric publication parity, focused `ki-engineering` audit, TypeScript, and `git diff --check`.
- **Return:** Concise changed-file list, exact behaviour and refusal cases, gate results, unresolved concerns, and confirmation that no out-of-scope or Git writes occurred.
- **Checkpoint:** Return after the focused implementation and checks pass, or immediately on any escalation condition.

## Discussion

### Why this is separate

The desired values are deterministic, but format-preserving edits are substantial enough to warrant focused tests. Keeping this separate prevents a coverage metric from expanding a cross-cutting contract item into an unsafe generic config rewriter.

### Readiness decision

The user's 2026-08-15 instruction to move on to GOV-043 and GOV-044 and get more completed supplies planning and implementation approval. GOV-044 is locally executable and has no dependency blocker. GOV-043 remains blocked by GOV-040 and is not part of this delivery.
