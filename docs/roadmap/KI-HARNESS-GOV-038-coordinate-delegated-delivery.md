---
id: KI-HARNESS-GOV-038
area: GOV
title: Coordinate delegated delivery
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked_by: []
baseline_ref: bb4eb190744ed65d9c73c456bfa13ed8eb55dd90
---

# Coordinate delegated delivery

## Goal

Make substantial authorised delivery keep the primary agent available as the human-facing coordinator while suitable bounded work proceeds through isolated subagents.

## Context

The current `ki-delegation` standard governs durable worker packets but does not state when the primary agent should adopt a coordinator role. `ki-implement` recommends runtime subagents for bounded parallel work, while the portable suitability test, coordinator responsibilities, isolation requirements, and return contract remain implicit.

Official OpenAI and Anthropic subagent guidance now provides external evidence for the shared principles. The portable Knowledge Islands contract should extract their common operating model without importing vendor-specific model names, configuration keys, or concurrency limits.

## Boundary

This work does not depend on or change `AGENTS.md`, grant new execution authority, require subagents for quick or tightly coupled work, implement a runtime executor, or resolve runtime-specific model selection. It does not make `ki-delegation` a mandatory dependency of every process skill.

## Current state

`ki-delegation` owns packet quality, rolling replenishment, and durable checkpoints. Its checker covers project-roadmap records only, accepts a legacy escalation heading, and verifies fewer worker fields than a safely sandboxed request needs. `ki-implement` retains orchestration and integration but does not explicitly apply a coordinator-first suitability decision. No delegation-specific eval scenario exercises the combined behaviour.

## Steps

- [ ] Define the portable coordinator-first suitability test and responsibility split in `ki-delegation` while preserving its authority boundary.
- [ ] Record the official OpenAI and Anthropic subagent guides as dated sources and extract only shared portable principles.
- [ ] Strengthen delegation packets with explicit inputs, authority, isolation, return, and existing completion and verification fields.
- [ ] Extend mechanical checks, negative tests, adapter coverage, and evaluation scenarios for the strengthened contract.
- [ ] Update `ki-implement` to apply the `ki-delegation` coordinator contract during authorised execution.
- [ ] Regenerate publications, run the relevant audits and repository gates, and prepare the required review packet.

## Files touched

- `skills/governance/ki-delegation/`
- `skills/change-management/ki-implement/`
- `evals/scenarios/`
- `evals/harness.ts`
- `docs/roadmap/KI-HARNESS-GOV-037-route-command-follow-up.md`
- `docs/roadmap/_ISSUES.md`
- this work item

## Verify

- `bun test skills/governance/ki-delegation/scripts/rubric/contexts/delegation.test.ts skills/governance/ki-delegation/scripts/rubric/items/index.test.ts`
- `ki dev skill rubric ki-delegation`
- `ki repo audit --skill ki-delegation --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-change-management-roadmap --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

The work has no unresolved dependency. Existing multi-skill coordination practice supplies internal precedent. `KI-HARNESS-RTP-008` remains the separate owner of runtime model-tier selection and does not block this portable doctrine.

## Delegation

### Locked decisions

- `ki-delegation` owns the portable coordinator-first doctrine and packet quality; `ki-implement` applies it during authorised execution.
- No worker changes `AGENTS.md`, grants execution authority, or adds vendor-specific runtime settings to the portable standard.
- Workers use disjoint file boundaries, do not stage or commit, and return evidence for primary-agent review.

### Escalate

Escalate source conflicts, any proposed authority expansion, a need for runtime-specific configuration, overlapping write scopes, or a change outside the named files.

### Rounds

- **Round 1:** author the delegation doctrine and sources while independently strengthening the checker, tests, and evaluation coverage.
- **Round 2:** the primary agent integrates both lanes, updates `ki-implement`, regenerates derived publications, runs all gates, and prepares the review packet.

### Worker: author-delegation-doctrine

- **Deliverable:** A concise portable coordinator-first standard and current external source record.
- **Inputs:** The existing `ki-delegation` skill and standard, the approved work item, and the official OpenAI and Anthropic subagent guides.
- **Files:** `skills/governance/ki-delegation/SKILL.md`, `skills/governance/ki-delegation/references/standards-delegation-packets.md`, and `skills/governance/ki-delegation/references/sources.md` only.
- **Authority:** Edit only the named files; do not change lifecycle state, stage, commit, browse unrelated sources, or perform external writes.
- **Isolation:** Shared worktree with an exclusive write boundary over the named files; no Git write commands.
- **Definition of done:** The doctrine defines suitability, coordinator and worker responsibilities, worker replenishment, sandboxing, and fallback behaviour without vendor-specific runtime policy.
- **Model:** Reasoning-capable worker suited to policy synthesis.
- **Verify:** Run targeted Markdown checks over the named files and report any unresolved finding.
- **Return:** Concise summary, exact files changed, checks run, and risks or judgment calls for coordinator review.
- **Checkpoint:** Stop after the three files are internally consistent and return them for integration review.

### Worker: strengthen-delegation-checks

- **Deliverable:** Mechanical and evaluation coverage for the strengthened delegation packet.
- **Inputs:** The existing delegation rubric context and tests, work-item adapters, evaluation scenario patterns, and this approved packet.
- **Files:** `skills/governance/ki-delegation/scripts/rubric/`, `skills/governance/ki-delegation/evals/` if present, and delegation-specific files under `evals/scenarios/` only.
- **Authority:** Edit only the named files; do not change standards prose, lifecycle state, stage, commit, or perform external writes.
- **Isolation:** Shared worktree with an exclusive write boundary over the named files; no Git write commands.
- **Definition of done:** Checks cover both roadmap adapters, exact packet headings, all required worker fields, representative failures, and at least one coordinator-first evaluation scenario.
- **Model:** Engineering worker suited to TypeScript tests and evaluation design.
- **Verify:** Run the targeted delegation rubric tests and any directly affected evaluation validation.
- **Return:** Concise summary, exact files changed, test results, and any contract ambiguity requiring coordinator resolution.
- **Checkpoint:** Stop after targeted checks pass or the first unresolved contract ambiguity is documented.

The primary agent owns the `ki-implement` changes, lifecycle transitions, cross-lane review, derived publication, full verification, and final response to the human.

## Discussion

### Coordinator boundary

Coordinator-first is a suitability decision for substantial work that has independent, bounded lanes and adequate context to write a safe brief. The primary agent remains responsible for user interaction, decisions, authority, dependency ordering, integration, verification, and final accountability. Quick work, context-heavy work, overlapping edits, and work whose safe brief would cost more than execution remain local.

### Source boundary

The vendor guides are evidence for shared principles such as isolated contexts, bounded tools and permissions, background or parallel work, and a main-agent coordination role. They are not a portable mandate for either vendor's configuration surface.

### Current-state migration

The strengthened checker exposed one existing Ready packet in GOV-037 that used the earlier six-field worker shape. Bringing that packet forward with explicit inputs, authority, isolation, and return evidence is part of making the current repository conform; it does not change GOV-037's execution authority or outcome.

### Verification runner

The delegation rubric tests use Bun's native `bun:test` API and the repository does not declare Vitest. The targeted verification therefore uses `bun test` rather than the originally drafted `bunx vitest run` command.
