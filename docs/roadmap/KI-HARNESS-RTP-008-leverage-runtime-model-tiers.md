---
id: KI-HARNESS-RTP-008
title: Leverage runtime model tiers
area: RTP
theme: runtime-portability
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make Knowledge Islands use each supported runtime's current model family deliberately, so orchestration, judgment work, and mechanical delegation receive an appropriate capability and cost profile without weakening the portable model-purpose contract.

## Context

The Harness already defines the portable `frontier`, `reasoning`, `standard`, and `fast` purposes, accepts repository-local runtime bindings, and requires delegation packets to choose the minimum viable model. Current [OpenAI model guidance](https://developers.openai.com/api/docs/models) distinguishes GPT-5.6 Sol for complex reasoning and coding, Terra for balanced capability and cost, and Luna for cost-sensitive high-volume work. The existing Codex tokenomics adapter reports context surfaces but does not yet turn changing provider guidance into a governed, evidence-backed resolution and evaluation path across tokenomics, delegation, and Codex subagents.

The portable taxonomy and relevant ownership boundaries already exist. Official OpenAI model guidance checked on 2026-08-13 identifies Sol for frontier work, Terra for balancing intelligence and cost, Luna for efficient high-volume work, and `medium` reasoning as a balanced starting point while requiring representative evaluation before a lower effort or model becomes a default. A bounded Codex-owned investigation can therefore proceed without inventing a new shared abstraction.

## Boundary

Preserve purpose-based names in portable governance and keep provider model IDs, pricing, and volatile capability claims in runtime-specific evidence or bindings. Do not grant automatic worker-spawning or spending authority, hard-code one provider's family into shared process skills, build an OpenAI application, or change repository delivery priorities as part of this item.

## Current state

`ki-tokenomics` defines portable purposes and validates optional `model_tier_bindings`; `ki-delegation` requires a minimum viable worker model; and the current subagent guidance relates runtime aliases to the portable taxonomy. Codex guidance, model resolution, reasoning-effort choice, orchestration defaults, refresh cadence, and cross-model evaluation are not yet joined into one documented and testable operating path.

The first delivery is limited to Codex-owned evidence and resolution guidance. It may update `ki-tokenomics-codex`, its source record, Codex subagent guidance, focused tests, and one dated evaluation report. Portable `ki-tokenomics`, `ki-delegation`, or `ki-subagents` changes are out of scope unless the investigation proves an exact runtime-neutral contract gap; such a gap stops for separate review and, where necessary, a Decision Record.

## Approved planning basis

Use three fixed, repository-local evaluation cases: a deterministic extraction/classification task with exact assertions, a conflicting-governance judgment task with a required evidence rubric, and a coordinator task with three independent read-only lanes plus one integrated answer. Run Sol, Terra, and Luna twice on each case at `medium` reasoning when the runtime supports it, then test one lower supported effort only for a model that passes both baseline repetitions.

A run passes only when every case-specific assertion, evidence requirement, authority boundary, and return shape passes without corrective prompting. Record latency, input/output tokens or the runtime's explicit unavailable result, and required correction count separately; do not calculate a composite score. Recommend the lowest-cost model and effort that passes both repetitions for a purpose. If evidence is mixed, unavailable, or no lower tier passes, retain inheritance or the existing binding and record `no default change`.

## Steps

- [ ] Record the current official OpenAI model, reasoning-effort, and multi-agent guidance with a review date alongside the portable tokenomics and delegation contracts.
- [ ] Map the Sol, Terra, and Luna family to portable purposes as runtime evidence, identifying where one-to-one bindings are insufficient or would become stale.
- [ ] Define the smallest Codex-owned resolver for main-thread orchestration, judgment workers, and mechanical workers without leaking provider names into portable governance.
- [ ] Add the three fixed evaluation fixtures and an evidence schema covering assertions, authority, return shape, latency, available token usage, and correction count; require separate user authority before live model calls.
- [ ] Exercise the fixed cases twice across Sol, Terra, and Luna at the common baseline effort, test one lower effort only for a passing candidate, and publish the raw outcomes and limitations without a composite score.
- [ ] Update only the relevant Codex tokenomics and subagent surfaces plus refresh sources, with focused tests for any new mechanical resolver; route a proven portable gap separately.
- [ ] Verify that repository overrides remain advisory and that execution, delegation, and spending still require their existing authority gates.

## Files touched

- This roadmap item
- Runtime-specific tokenomics guidance and sources under `skills/environment/ki-tokenomics-codex/`
- Runtime-specific guidance under `skills/agentic-systems/ki-subagents-codex/` only where the resolver affects Codex projection
- `evals/` fixtures or an equivalent deterministic local case definition for the three named tasks
- `docs/reviews/runtime-model-tiers-2026-08.md`
- Focused rubric tests and generated publications for any changed mechanical criteria

Portable tokenomics, delegation, and subagent roots are not edited by this item; a proven runtime-neutral gap is a stop and separate proposal.

## Verify

- `ki repo audit --skill ki-tokenomics --repo .` passes.
- `ki repo audit --skill ki-tokenomics-codex --repo .` passes.
- `ki repo audit --skill ki-delegation --repo .` passes.
- Applicable focused catalogue tests pass for every changed rubric.
- The dated evaluation report contains two baseline runs per model and case, exact assertion and authority outcomes, available latency and usage evidence, correction counts, and an explicit recommendation or `no default change`.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.
- The resulting guidance preserves `frontier`, `reasoning`, `standard`, and `fast` as portable purposes and treats provider names and capabilities as refreshable runtime evidence.

## Dependencies / blocks

ADR-KI-HARNESS-009 and the current tokenomics and delegation standards supply the governing baseline. No roadmap dependency blocks the local preparation. Live model calls require explicit execution and spending authority; absent authority stops after fixtures and the evidence schema. Implementation must also stop for separate review if evidence requires a cross-runtime abstraction or changes an established authority boundary.

## Documentation impact

### Decision Records

No new decision record is planned unless the bounded evaluation changes the portable tokenomics or delegation policy.

### Specifications

No behaviour-level product specification changes are planned.

### Guides

Runtime-specific guidance may be updated only with reproducible evaluation evidence; no volatile provider defaults are added to portable guidance.

### Roadmap

Any confirmed model-binding, measurement, or cross-runtime policy work is captured as explicit follow-on work.

## Discussion

### Portability boundary

The useful distinction is between a stable statement of work purpose and a volatile provider resolution. Repositories should be able to say that mechanical extraction needs `fast` or that long-horizon orchestration needs `frontier`; the Codex adapter should own whether today's resolution is Luna, Terra, Sol, or a later family.

### Evaluation before defaulting

Provider positioning is a strong starting hypothesis, not sufficient evidence for a KI default. Representative work should test output quality, instruction adherence, latency, context behavior, and review burden. A lower-cost worker is only cheaper when orchestration and correction do not erase the saving.

### Authority and cost

Choosing a model purpose does not authorize delegation, parallelism, external actions, or an open-ended token budget. Those remain separate process and user-authority decisions even if a runtime can resolve a tier automatically.
