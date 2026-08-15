---
id: KI-HARNESS-GOV-044
area: GOV
title: Conform generated-surface exclusions
theme: governance-consistency
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: 7eb84d97f2c3485270dc8911e4c78823c1366acf
---

## Goal

Resolve whether `ki-engineering` can gain a proportionate bounded conform path for generated-surface exclusions without crossing `ki-authoring` ownership or weakening preservation guarantees.

## Context

The GOV-009 source-loaded review found that the managed-surface set and retired `.ki` exclusion are closed standard data, so `GEN-1` appeared to be a genuine automation candidate. Readiness review found an ownership split that the candidate inventory did not capture: `ki-engineering` owns `biome.json` and `knip.json`, while `ki-authoring` wholly owns `.rumdl.toml` and already conforms it from a canonical template.

The safe design therefore keeps `GEN-1` as the cross-tool diagnostic and adds one automatic Engineering-owned criterion for Biome and Knip. This is an ownership split, not a duplicate check or a coverage-metric split: `GEN-1` continues to prove agreement across all three tools, while the new criterion alone owns the bounded local write.

## Boundary

Normalise only the generated-surface exclusion entries in regular, contained Biome and Knip JSON/JSONC configuration. Preserve unrelated configuration, comments, ordering outside the owned arrays, and user-selected tool policy. Refuse symbolic files, malformed input, `knip.ts`, duplicate or ambiguous properties, unsafe ancestry, and paths outside the selected repository. Do not write `.rumdl.toml`; route its correction to `ki-authoring`.

## Current state

`GEN-1` remains a justified diagnostic cross-tool check. A fully local preserving parser prototype required 514 lines; using `Bun.JSONC.parse` for validation still required a 365-line byte-offset walker/editor. Although 13 focused cases passed, that implementation was disproportionate to four managed paths and was completely reverted. `ki-authoring` already owns automatic canonical `.rumdl.toml` conformance; Biome and Knip await a proportionate owned editor capability or narrower configuration contract.

## Steps

- [x] Confirm the ownership split: retain `GEN-1` as the diagnostic cross-tool agreement check and never write `.rumdl.toml` from Engineering.
- [x] Prototype a no-dependency, operation-scoped, format-preserving JSON/JSONC draft for the two Engineering-owned files.
- [x] Prove the prototype's positive, malformed, preservation, comment, symlink, dry-run, and repeat-idempotence cases, then reject and remove it when its size proved disproportionate.
- [x] Keep the catalogue and totals unchanged, strengthen `GEN-1` owner routing, and update the GOV-009 remediation evidence from deferred candidate to justified boundary.

## Files touched

- `skills/governance/ki-engineering/`
- `skills/keystone/ki-skills/scripts/internal/remediation-inventory.ts`
- `skills/keystone/ki-skills/scripts/internal/remediation-inventory.test.ts`
- GOV-009 remediation inventory evidence
- This work item

## Verify

- No automatic write or new dependency survives without a proportionate preservation and refusal contract.
- `GEN-1` remains diagnostic, retains the same cross-tool evidence, and routes `.rumdl.toml` to its owner.
- The source-loaded inventory reports three deferred candidates and 344 justified report-only boundaries without changing the accepted criterion totals.
- Focused remediation-inventory and Engineering catalogue tests, rubric publication parity, repository audits, Markdown, Biome, TypeScript, and the full harness suite pass.

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

## Review

### Delivered

From immutable baseline `7eb84d97f2c3485270dc8911e4c78823c1366acf`, GOV-044 resolved the `GEN-1` automation candidate without crossing the approved ownership or preservation boundaries. The delegated implementation tested two no-dependency approaches, rejected both as disproportionate, removed every prototype byte, and retained the criterion as a justified diagnostic boundary. The persistent delivery is commit `98e5d591`.

### Summary of changes

- Clarified in the Engineering standard and generated rubric that `ki-authoring` wholly owns and automatically conforms `.rumdl.toml`, while Biome and Knip correction remains deliberate until a proportionate preserving editor exists.
- Changed the GOV-009 source-loaded disposition for `ki-engineering/GEN-1` from deferred candidate to justified boundary, leaving the accepted catalogue and remediation totals unchanged.
- Updated the review evidence to three deferred candidates, 331 diagnostic boundaries, 13 guarded boundaries, and 344 justified report-only boundaries.
- Used the approved delegation packet to test a 514-line fully local parser and a 365-line `Bun.JSONC.parse`-assisted editor. Thirteen focused safety cases passed, but the implementation was completely reverted because its cost was disproportionate to four exclusion paths.

### Verification

- Focused remediation-inventory and Engineering catalogue tests: 10 passed, 0 failed.
- `bunx tsc --noEmit`: passed.
- `ki dev skill rubric ki-engineering`: exact publication parity passed.
- Focused `ki-engineering`, `ki-skills`, and roadmap audits: passed with no FAIL or WARN.
- `bun run test`: full harness suite passed.
- Biome, rumdl, and `git diff --check`: passed on the changed surface.

### Outstanding concerns

`GEN-1` intentionally remains diagnostic. A future automatic repair needs either a proportionate owner-approved JSON/JSONC editor capability or a narrower configuration contract; neither is invented here. GOV-043 remains separately blocked by GOV-040's metadata-authority decision.

### Post-change review

The work now answers the candidate question with stronger evidence than the original source-loaded classification. It preserves the useful cross-tool audit, makes the correction route explicit, introduces no parser dependency or partial repair, and leaves no prototype code. The narrowed delivery meets its safety and proportionality goal and is ready for acceptance.

### Mini recap

GOV-044 tested the strongest practical no-dependency conform designs, rejected an over-engineered result, and folded that learning into the recurring review inventory and Engineering guidance. No new durable learning route is needed beyond the existing `KI-HARNESS-REV-001` evidence and this retained work record.

## Done

Accepted by the user on 2026-08-15. The accepted outcome is the ownership-corrected diagnostic boundary, not an automatic JSON/JSONC rewriter.

## Discussion

### Why this is separate

The desired values are deterministic, but format-preserving edits proved too substantial for this four-path rule. The failed proportionality test is the delivery result: it prevents a coverage metric from expanding a cross-cutting contract item into an unsafe generic config rewriter.

### Readiness decision

The user's 2026-08-15 instruction to move on to GOV-043 and GOV-044 and get more completed supplies planning and implementation approval. GOV-044 is locally executable and has no dependency blocker. GOV-043 remains blocked by GOV-040 and is not part of this delivery.
