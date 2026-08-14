---
id: KI-HARNESS-GOV-044
area: GOV
title: Conform generated-surface exclusions
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Give `ki-engineering` `GEN-1` a bounded conform path for the governed generated-surface exclusions it already audits.

## Context

The GOV-009 source-loaded review found that the managed-surface set and retired `.ki` exclusion are closed standard data, so `GEN-1` is a genuine automation candidate. Implementing it safely is larger than the cross-cutting GOV-009 tranche because Biome, Knip, and Markdown configuration use different parsed shapes and preservation constraints.

## Boundary

Normalise only the exclusion entries owned by `GEN-1`. Preserve unrelated configuration, comments where the format supports them, ordering outside the owned arrays, and user-selected tool policy. Refuse symbolic files, malformed input, unsupported formats, ambiguous legacy entries, and paths outside the selected repository.

## Current state

`GEN-1` deterministically reports missing generated-surface coverage and legacy KI runtime exclusions but remains diagnostic. Its engineering session exposes evidence only and has no focused draft capability for these configuration formats.

## Steps

- [ ] Inventory each currently supported Biome, Knip, and Markdown configuration shape and define the exact owned exclusion paths.
- [ ] Add parsed, format-specific draft capabilities that preserve unrelated content and fail closed on unsupported input.
- [ ] Promote `GEN-1` only after every supported format has positive, negative, preservation, symlink, dry-run, and repeat-idempotence fixtures.
- [ ] Regenerate the Engineering rubric and update the GOV-009 remediation inventory evidence.

## Files touched

- `skills/governance/ki-engineering/`
- Generated Engineering rubric publication
- GOV-009 remediation inventory evidence
- This work item

## Verify

- Each supported format proposes only the exact generated-surface exclusion delta.
- Malformed, symbolic, unsupported, ambiguous, or escaping targets produce no write.
- Existing unrelated configuration and comments remain intact within the format's preserving capability.
- A repeated conform proposal is empty and `GEN-1` passes a clean re-audit.
- Focused Engineering tests, rubric publication parity, repository audits, and TypeScript pass.

## Dependencies / blocks

GOV-009 supplies the candidate evidence. This concern-specific parser work is independent of its shared rubric contract and runtime activation proof.

## Discussion

### Why this is separate

The desired values are deterministic, but multi-format parsing and byte preservation are a substantial Engineering-owned implementation. Keeping it separate prevents a coverage metric from expanding a cross-cutting contract item into an unsafe generic config rewriter.
