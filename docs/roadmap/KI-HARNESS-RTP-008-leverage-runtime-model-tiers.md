---
id: KI-HARNESS-RTP-008
title: Leverage runtime model tiers
area: RTP
theme: runtime-portability
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make Knowledge Islands use each supported runtime's current model family deliberately, so orchestration, judgment work, and mechanical delegation receive an appropriate capability and cost profile without weakening the portable model-purpose contract.

## Context

The Harness already defines the portable `frontier`, `reasoning`, `standard`, and `fast` purposes, accepts repository-local runtime bindings, and requires delegation packets to choose the minimum viable model. Current [OpenAI model guidance](https://developers.openai.com/api/docs/models) distinguishes GPT-5.6 Sol for complex reasoning and coding, Terra for balanced capability and cost, and Luna for cost-sensitive high-volume work. The existing Codex tokenomics adapter reports context surfaces but does not yet turn changing provider guidance into a governed, evidence-backed resolution and evaluation path across tokenomics, delegation, and Codex subagents.

This is ready for immediate shaping because the portable taxonomy and relevant ownership boundaries already exist, the official provider evidence is available, and a bounded runtime-adapter investigation can establish what should change without first inventing a new shared abstraction.

## Boundary

Preserve purpose-based names in portable governance and keep provider model IDs, pricing, and volatile capability claims in runtime-specific evidence or bindings. Do not grant automatic worker-spawning or spending authority, hard-code one provider's family into shared process skills, build an OpenAI application, or change repository delivery priorities as part of this item.

## Current state

`ki-tokenomics` defines portable purposes and validates optional `model_tier_bindings`; `ki-delegation` requires a minimum viable worker model; and the current subagent guidance relates runtime aliases to the portable taxonomy. Codex guidance, model resolution, reasoning-effort choice, orchestration defaults, refresh cadence, and cross-model evaluation are not yet joined into one documented and testable operating path.

## Steps

- [ ] Re-ground current official OpenAI model, reasoning-effort, and agent orchestration guidance alongside the portable tokenomics and delegation contracts.
- [ ] Map the Sol, Terra, and Luna family to portable purposes as runtime evidence, identifying where one-to-one bindings are insufficient or would become stale.
- [ ] Decide the smallest runtime-owned contract for resolving main-thread, judgment-worker, and mechanical-worker choices without leaking provider names into portable governance.
- [ ] Update the relevant Codex tokenomics, delegation, or subagent surfaces and their refresh sources, with focused tests for any new mechanical rule.
- [ ] Exercise representative orchestration, hard-judgment, and high-volume tasks across the proposed tiers and record the evidence and limitations.
- [ ] Verify that repository overrides remain advisory and that execution, delegation, and spending still require their existing authority gates.

## Files touched

- This roadmap item
- Runtime-specific tokenomics guidance and sources under `skills/environment/ki-tokenomics-codex/`
- Portable tokenomics, delegation, or subagent surfaces only where evidence shows a runtime-neutral contract gap
- Focused rubric tests and generated publications for any changed mechanical criteria

## Verify

- `ki repo audit --skill ki-tokenomics --repo .` passes.
- `ki repo audit --skill ki-tokenomics-codex --repo .` passes.
- `ki repo audit --skill ki-delegation --repo .` passes.
- Applicable focused catalogue tests pass for every changed rubric.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.
- The resulting guidance preserves `frontier`, `reasoning`, `standard`, and `fast` as portable purposes and treats provider names and capabilities as refreshable runtime evidence.

## Dependencies / blocks

ADR-KI-HARNESS-009 and the current tokenomics and delegation standards supply the governing baseline. No roadmap dependency blocks investigation; implementation must stop for a Decision Record if the evidence requires a new cross-runtime abstraction or changes an established authority boundary.

## Discussion

### Portability boundary

The useful distinction is between a stable statement of work purpose and a volatile provider resolution. Repositories should be able to say that mechanical extraction needs `fast` or that long-horizon orchestration needs `frontier`; the Codex adapter should own whether today's resolution is Luna, Terra, Sol, or a later family.

### Evaluation before defaulting

Provider positioning is a strong starting hypothesis, not sufficient evidence for a KI default. Representative work should test output quality, instruction adherence, latency, context behavior, and review burden. A lower-cost worker is only cheaper when orchestration and correction do not erase the saving.

### Authority and cost

Choosing a model purpose does not authorize delegation, parallelism, external actions, or an open-ended token budget. Those remain separate process and user-authority decisions even if a runtime can resolve a tier automatically.
