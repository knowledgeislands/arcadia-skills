---
id: KI-HARNESS-GOV-006
title: Add authorised autonomous roadmap-work batches
theme: governance-consistency
horizon: next
status: acceptance
blocks: []
blocked-by: []
baseline-ref: 31cc6e4ba6d1454175626c8d3b27a4667a198fca
---

## Context

Create `ki-batch`, a process skill for preparing and running human-approved autonomous batches of governed roadmap work.

The aim is not simply to let an agent continue unattended. It is to make a reviewed set of ready work safely executable while the human is away: each admitted plan has explicit authority, verification, and an accountable outcome.

The process joins two cycles without erasing their ownership boundaries:

```text
roadmap preparation
  ki-recap → ki-next → ki-plan → Ready

implementation
  ki-implement → Acceptance → ki-accept → Done
```

`ki-batch` applies the preparation cycle across a selected set, stops for a manual authorisation gate, then coordinates repeated `ki-implement` cycles.

## Boundary

`ki-batch` orchestrates `ki-next`, `ki-plan`, `ki-implement`, `ki-accept`, `ki-delegate`, and `ki-recap`; it does not replace their responsibilities or add a KI CLI command.

It must not introduce a tracker, plugin, worktree scheme, runtime-specific machinery, automatic push or release, or an open-ended "agent may decide" authority. A batch authorisation is bounded to the named work and expires at its declared completion target or timebox.

The first delivery is the process skill and examples only. CLI support is a later decision after the process has been exercised.

## Preparation cycle

Batch preparation starts from a human-confirmed candidate set and scope boundary.

It repeats the existing roadmap responsibilities rather than creating a parallel planner:

1. `ki-recap` grounds current session state when useful.
2. `ki-next` evaluates dependencies, confirms selection and horizon placement, and hands each immediate item to planning.
3. `ki-plan` shapes each selected item in place and marks it Ready only after its own review gate.
4. `ki-batch` orders the resulting Ready items, identifies work that can proceed independently, and drafts the batch authorisation.

Preparation may repair deterministic documentation and plan alignment within its confirmed scope.

It does not authorise implementation.

If an item cannot become Ready, preparation records the missing decision or evidence and excludes it explicitly; it never quietly drops work.

## Batch authorisation

The durable control surface for implementation is a human-approved **batch authorisation**.

It records:

- a batch identifier, purpose, timebox, and completion target;
- the exact work-item IDs in dependency order;
- repositories and file or capability boundaries;
- required verification for each item and for the batch as a whole;
- permitted agent decisions and deterministic repairs;
- permitted use of `ki-delegate`, including worker boundaries and review gates;
- mandatory and item-specific stop conditions;
- whether independent work may continue after another item is parked;
- whether the batch stops at Acceptance or may invoke `ki-accept` to reach Done.

The normal completion target is Acceptance.

Authority to accept delivery, mark Done, or prune must be explicit rather than inferred from implementation authority.

The authorisation gate is manual and occurs only after the human can review the Ready items and the proposed execution order.

## Implementation cycle

After authorisation, `ki-batch` preflights the complete set before changing implementation files.

The pre-gate rejects an incomplete or ambiguous authorisation and any item that is no longer Ready, correctly ordered, in scope, dependency-clean, or verifiable.

For every admitted item, `ki-batch`:

1. invokes `ki-implement` for Ready → In progress → Acceptance;
2. permits delegation only within the authorisation and retains orchestrator review;
3. commits independently verified coherent units;
4. keeps implementation evidence distinct from final review and required verification;
5. records the resulting lifecycle state before starting a dependent item.

A plan is never self-certified merely because an implementor reports success.

## Parking and continuation

When an item reaches ambiguity or a stop condition, park that item with the reason, evidence, affected dependencies, and exact human decision required.

Continue only with items proven independent of the parked item and only when the authorisation permits that continuation.

A park is an accountable batch result, not an omitted or failed-to-report item.

## Mandatory stops

Stop rather than infer authority for a public-contract change outside the approved plan, material scope expansion, destructive or irreversible action, a new external dependency or coordination, required-verification failure, release or push, or any decision the authorisation does not expressly permit.

## Post-gate

The post-gate records a per-item and batch-level run ledger:

- admitted, excluded, completed, parked, skipped, and deferred work;
- lifecycle state before and after the run;
- commits and checks;
- decisions exercised under the authorisation;
- failures, stops, and the human action needed next;
- independent review and verification evidence;
- a concise `ki-recap` result.

When the completion target is Acceptance, stop for the normal human `ki-accept` decision.

When Done authority was expressly granted, record how the acceptance criteria were satisfied before invoking `ki-accept`.

Pruning remains a separate cleanup action selected by an explicit roadmap-item path or glob and is never implied by batch completion.

## Reference analysis

[faff](https://github.com/shftwst/faff) is the principal operational reference. Its unattended-work model distinguishes eligible work from work that needs human intervention, uses a park protocol rather than silently discarding a loose end, and records a run ledger so the human can inspect the morning outcome. KI should retain those properties, but make the roadmap plans and batch authorisation the control plane rather than adopting a tracker or autonomy-level framework.

[gstack](https://github.com/garrytan/gstack) is the quality-process reference. Its staged flow separates thinking and planning from implementation, review, QA, and reflection; its scope guard shows the value of an explicit boundary. KI should retain the separation of execution from review and verification, but not import its broad, product-focused, Claude-specific command surface.

The KI-specific contribution is therefore an auditable authority boundary tied to roadmap items and their lifecycle evidence: the batch may progress approved work autonomously, but cannot silently broaden, ship, or declare an unapproved result complete.

## Current state

The two-cycle model and manual gates are documented in the harness diagram, and `ki-next`, `ki-plan`, `ki-delegate`, and `ki-recap` already provide the constituent responsibilities.

`ki-plan` now ends at Ready, `ki-implement` owns Ready → Acceptance, and `ki-accept` owns explicit closure and pruning.

The remaining proof is an exercised bounded batch and its judgment review; no CLI command is required for this first delivery.

## Steps

1. [x] Finalise and verify the roadmap stage-detail contract and the planning, implementation, and acceptance ownership split.
2. [x] Add `ki-implement` and `ki-accept` as focused process skills and verify their lifecycle handoffs independently.
3. [x] Add `ki-batch` with distinct preparation, manual authorisation, implementation, parking, and post-gate procedures.
4. [x] Add a complete batch-authorisation exemplar, including dependency order, authority, verification, stops, and completion target.
5. [x] Add a parked-item exemplar and a post-gate acceptance packet that accounts for every admitted item.
6. [x] Exercise the process against a bounded set of ready harness work without adding CLI support.
7. [x] Apply the judgment portions of the relevant skill and roadmap rubrics, then present the result for acceptance.

## Files touched

- `skills/process/ki-implement/`
- `skills/process/ki-accept/`
- `skills/process/ki-batch/`
- `skills/process/ki-plan/`
- `skills/process/ki-next/`
- `skills/process/ki-recap/`
- `skills/process/ki-delegate/`
- `skills/governance/ki-roadmap/`
- the process-family and user-facing composition documentation

## Verify

- Each process skill has one non-overlapping responsibility and names its exact incoming and outgoing lifecycle state.
- Every example is internally consistent with the work-item stage-detail contract.
- A dry rehearsal demonstrates that ambiguous or out-of-authority work is parked and accounted for while authorised independent work may continue.
- Normal batch execution stops at Acceptance; reaching Done requires explicit acceptance authority.
- No process step can push, release, prune, broaden scope, or introduce external coordination without explicit authority.
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

The process depends logically on the clean lifecycle split landing first: `ki-plan` must stop at Ready, `ki-implement` must own delivery to Acceptance, and `ki-accept` must own Done and pruning.

The work does not require CLI support.

CLI reporting or execution may be considered later from exercised process evidence.

## Delegation

Use bounded rounds with separate file ownership:

- one round for each new process skill and its examples;
- one cross-skill alignment round for relationships and public composition documentation;
- one independent review round for authority leaks, lifecycle overlap, and unaccounted batch outcomes.

The orchestrator owns integration, generated publications, full verification, and the final review against this item.

## First authorised batch

### BATCH-2026-07-29-FND-003-FND-005

The user approved this authorisation on 2026-07-29.

It admits `KI-HARNESS-FND-003` and `KI-HARNESS-FND-005` from the immutable baseline `31cc6e4ba6d1454175626c8d3b27a4667a198fca`.

Both are independent: FND-005 research may proceed beside FND-003 drafting, but no workers may edit the same file and final integration remains serial.

Scope is `knowledgeislands/ki-agentic-harness`, limited to each item’s Ready plan and a necessary directly related public-guidance alignment.

Excluded are runtime spawning mechanics, new agents, Cloudflare plugin/skill/MCP/OAuth setup, pushes, releases, pruning, and unrelated refactors.

The timebox is two hours from approval.

The completion target is Acceptance: each item must reach `acceptance` with its own verification packet or be parked with evidence and the exact human decision required.

Allowed delegation is bounded source classification and mechanical wording work.

The orchestrator owns policy judgment, diff review, integration, and verification.

FND-005 may record non-adoption where the Cloudflare prompt exceeds an existing KI owner’s boundary.

Batch acceptance is not authorised.

Mandatory stops are a public-contract change outside either plan, material scope expansion, overlapping write ownership, user-level installation, remote MCP, OAuth, push, release, destructive action, external coordination, failed required verification, or an unapproved policy decision.

If either item is parked, the other may continue only after confirming it is independent.

### Run ledger

`KI-HARNESS-FND-003` entered as `ready` and reached `acceptance`.

Its policy source change is [`8fe77940`](../../commit/8fe77940), and its item acceptance packet is [`5b98b3e3`](../../commit/5b98b3e3).

It exercised the allowed judgment and mechanical delegation boundary without adding a runtime mechanic, model default, or context store.

`KI-HARNESS-FND-005` entered as `ready` and reached `acceptance`.

Its acceptance packet is [`b0a28c68`](../../commit/b0a28c68).

The official Cloudflare prompt review adopted no directive: the prompt is agent-local provisioning guidance, not hosting-standard evidence, and no user-level installation, remote MCP, OAuth, or external coordination occurred.

Both items passed their stated `ki-skills` and `ki-authoring` audits.

The batch post-gate passed `bun run test` (218 pass), `bunx tsc --noEmit`, and clean `ki-skills`, `ki-roadmap`, and `ki-authoring` audits.

No item was parked, skipped, or deferred; no stop condition occurred; and no acceptance, Done transition, prune, push, or release authority was exercised.

The required next human action is normal `ki-accept` review of FND-003 and FND-005.

## Acceptance

### Delivered

Exercised `ki-batch` through one explicitly authorised, independent two-item harness batch and recorded the complete post-gate ledger.

### Summary of changes

Both admitted items progressed from Ready to Acceptance under the approved boundary.

The run retained independent item baselines, evidence, verification, and manual acceptance boundaries; it added no KI CLI command or runtime-specific orchestration.

### Verification

- Revalidated both admitted items as Ready before the run and recorded their immutable common baseline.
- Reviewed each delegated result before its acceptance packet was recorded.
- `bun run test` — 218 pass, 0 fail.
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

### Outstanding concerns

FND-003 and FND-005 await normal human acceptance.

This item awaits review of the first exercised batch before any CLI support or broader batch authority is considered.

### Mini recap

The rehearsal shows that a tightly scoped, human-authorised batch can deliver independent Ready work to Acceptance while preserving item ownership, explicit stop conditions, and the human closure gate.

## Discussion

### First deliverable

Start with the `ki-batch` process skill, a batch-authorisation example, a parked-plan example, and a reviewable plan/acceptance packet. Do not add KI CLI commands until the process has been exercised and accepted.

### Preparation authority

Preparation still needs a bounded human-confirmed candidate set, but it should remain lighter than implementation authorisation.

The exemplar should show whether that boundary is best recorded as a short preparation brief or as the draft portion of the eventual batch authorisation.

### Acceptance authority

The default batch target is Acceptance because implementation success is not the same as human acceptance.

An explicitly authorised Done target is useful for deterministic, low-risk work, but its exemplar must make the additional authority and acceptance criteria unmistakable.

### Multi-repository batches

The authorisation shape allows multiple repositories, but the first rehearsal should remain within this repository.

Cross-repository execution adds independent Git state, verification, and commit accounting and should be exercised only after the single-repository process is accepted.
