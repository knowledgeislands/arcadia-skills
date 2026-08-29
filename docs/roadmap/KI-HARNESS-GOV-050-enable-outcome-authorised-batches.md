---
id: KI-HARNESS-GOV-050
title: Enable outcome-authorised batches
area: GOV
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let a human grant bounded outcome authority such as “crack on with the roadmap” without requiring a separately reviewed batch payload before useful work begins, while retaining an exact delivery ledger, consolidated acceptance boundary, and mandatory safety stops.

## Context

The current `ki-batch` contract treats a hash-bound, exact candidate authorisation as a pre-execution gate. That is appropriate when the human wants to approve a fixed plan, but it prevents the explicitly requested autonomous mode where the agent should select and deliver non-contentious work while the human is unavailable.

The approved operating model distinguishes outcome authority from item selection. A clear human instruction may authorize the orchestrator to select eligible local records, create the exact batch contract, deliver them, and apply consolidated acceptance. The resulting contract is evidence over the run and a boundary on the agent’s authority, not an additional human checkpoint.

## Boundary

Preserve exact-item reviewed authorization as a supported mode. Add outcome-authorized preparation only when the human explicitly grants autonomous delivery authority and states a repository or roadmap outcome. Do not infer authority from silence, a clean gate, ordinary implementation requests, or historic conversation.

Outcome authority never permits destructive or irreversible work, push or release, material public-contract changes outside existing plans, external coordination, bypassed verification, or contentious decisions. Affected items park with evidence while independent items may continue.

## Current state

`ki-batch` requires an explicit candidate set, a reviewed authorisation payload, and an approval-bound hash before implementation. `ki-next` separately requires exact confirmation of selected candidates, and `ki-accept` permits batch closure only when the batch explicitly names closure items.

## Steps

- [ ] Define explicit outcome authority and the evidence that distinguishes it from blanket or inferred permission.
- [ ] Let the orchestrator select and prepare eligible local records under that authority without a second pre-run approval gate.
- [ ] Require the created batch contract to record the selected set, boundaries, checks, stops, run evidence, and exact consolidated-acceptance scope.
- [ ] Permit named consolidated acceptance when outcome authority explicitly asks for autonomous delivery, while retaining records and capturing remedial work separately.
- [ ] Update fixtures and exemplars for exact-item and outcome-authorized modes, including refusal and partial-progress cases.
- [ ] Audit the changed skill and run its focused tests plus repository gates.

## Files touched

- `skills/change-management/ki-batch/SKILL.md`
- `skills/change-management/ki-batch/references/standards-batch.md`
- `skills/change-management/ki-batch/references/exemplars.md`
- `skills/change-management/ki-batch/scripts/internal/authorisation.ts`
- `skills/change-management/ki-batch/scripts/internal/batch-cycle.ts`
- focused tests beside those helpers
- `docs/roadmap/KI-HARNESS-GOV-050-enable-outcome-authorised-batches.md`

## Verify

- `bun test skills/change-management/ki-batch/scripts`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No local blocker. The user explicitly approved the outcome-authorized model, autonomous local selection, stable viable delivery, remedial follow-up capture, and consolidated acceptance for this run.

## Delegation

No runtime delegation is required for this contract change. The orchestrator owns the contract, fixtures, integration, and verification.

## Documentation impact

### Decision Records

No Decision Record is required because this refines the existing process skill’s authority modes without changing repository architecture or portable work-item lifecycle ownership.

### Specifications

No separate product specification is required; the process skill and its controlled fixture model own the executable contract.

### Guides

The skill procedure and exemplars are the user-facing operating guidance. Add no separate guide unless implementation exposes a broader workflow needing orientation outside the skill.

### Roadmap

Retain this record through consolidated acceptance. Any limitation discovered after viable delivery becomes a scoped remedial record rather than blocking the batch contract by default.

## Discussion

### Authority shape

Outcome authority must be affirmative and current. It names an outcome and grants the agent discretion to select and deliver non-contentious work within a repository boundary. The orchestrator translates it into an exact run contract and remains accountable for exclusions and stops.

### Consolidated acceptance

When the same authority explicitly asks the agent to finish the batch without further review, the run contract may name every admitted item for acceptance after its own verification and review packet passes. Acceptance remains evidence-backed and item-specific even though the human reviews the consolidated result later.

### Remedial work

Post-change concerns that do not invalidate the delivered outcome should become explicit follow-up records. They should not keep viable, verified work artificially open merely because further improvement is possible.
