---
id: KI-HARNESS-GOV-017
title: Improve verification boundaries
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make shared engineering guidance favour observable public contracts over artificial internal test seams.

## Context

The `tools-ki` coverage recovery showed that every reachable implementation span should correspond to a legitimate end-to-end contract case; unreachable spans should be removed rather than preserved for coverage alone.

## Boundary

Do not prohibit justified interface-level fault injection or turn a coverage target into a requirement for artificial tests.

## Current state

The engineering standard requires a runner-neutral test entrypoint and, for Vitest repositories, genuine 100% coverage. Its `TEST-6` judgment criterion asks whether tests are colocated and the coverage claim is substantiated, but neither the standard nor the rubric tells a reviewer to connect a covered branch to supported externally observable behaviour. They also do not state when an unreachable branch should be removed or when boundary-level fault injection is justified.

The required distinction is judgmental. A catalogue can ask a reviewer for evidence that a test exercises a supported public contract, but it cannot mechanically decide whether an input is legitimate, a branch is unreachable, or a fault-injection seam preserves the interface boundary.

## Steps

- [ ] Extend the testing section of the engineering standard with one portable rule: begin a coverage-gap investigation at the nearest supported public boundary, prove each reachable path through an externally observable result, and remove a path that no supported input can reach.
- [ ] Define the exception for interface-level fault injection: it must model a documented boundary failure that cannot be exercised deterministically through the ordinary public entrypoint, remain outside implementation internals, and record why the seam is necessary.
- [ ] Add a dedicated judgment criterion to the `TEST` family for observable-contract coverage; keep it free of mechanical audit or conform callbacks and make its review prompt distinguish supported behaviour, justified boundary injection, and dead code.
- [ ] Add focused catalogue assertions for the new criterion's stable code, judgment-only shape, and source, and update the catalogue-size assertion without creating a synthetic coverage finding.
- [ ] Update the concise testing summary in `ki-engineering` so the portable boundary rule is discoverable without duplicating the full standard.
- [ ] Regenerate the readable engineering rubric from the structured catalogue and review the resulting publication for exact parity.

## Files touched

- `skills/governance/ki-engineering/SKILL.md`
- `skills/governance/ki-engineering/references/standards-engineering.md`
- `skills/governance/ki-engineering/scripts/rubric/items/test.ts`
- `skills/governance/ki-engineering/scripts/rubric/items/index.test.ts`
- `skills/governance/ki-engineering/references/rubric.md` (generated)
- This roadmap item

## Verify

- `bun test skills/governance/ki-engineering/scripts/rubric/items/index.test.ts`
- `ki dev skill rubric ki-engineering`
- `ki repo audit --skill ki-engineering --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- Judgment review confirms that the rule never requires an internal-only seam merely to increase coverage and directs unsupported unreachable paths toward removal.

## Dependencies / blocks

This work is independently executable. The rubric evidence separation that enriched the judgment metadata model has already landed, so implement this criterion directly in the current catalogue shape rather than adding a compatibility form.

Escalate before expanding scope if applying the rule would require an artifact-specific definition of a public boundary, a cross-repository code change, or a mechanical reachability heuristic. Artifact skills own their concrete interfaces; this item owns only the portable engineering principle and reviewer prompt.

## Delegation

Keep this as one implementation lane because the standard wording, criterion prompt, and focused assertion form one semantic unit. It can run in parallel with `KI-HARNESS-GOV-019` because their file boundaries do not overlap. The batch orchestrator retains final review of the judgment boundary and runs the shared Harness gates after both lanes converge; no durable delegation packet is warranted.

## Discussion

### Source

This item adopts `TRD-6b8cb3b4`.

### Selected rule

Coverage is evidence about a supported contract, not a reason to preserve or expose implementation detail. The first choice for a reachable gap is a case through the nearest public boundary; a path with no supported external stimulus is a deletion candidate. Fault injection is an exception only at an interface boundary and only when its failure mode is part of that interface's contract.

### Mechanical boundary

The structured catalogue can preserve the presence and wording source of a judgment criterion, but it cannot prove that a branch is reachable from a legitimate input or that a test seam is architecturally appropriate. Those conclusions remain reviewer-led.
