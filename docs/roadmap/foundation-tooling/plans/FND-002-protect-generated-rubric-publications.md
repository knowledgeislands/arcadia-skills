---
id: 'FND-002'
title: Protect generated rubric publications from drift
status: in-progress
roadmap: foundation-tooling/protect-generated-rubric-publications-from-drift
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Make `ki` the sole renderer for structured rubrics. TypeScript catalogues remain authoritative and tracked `references/rubric.md` files become derived publications. `ki-skills` owns the policy criterion; `tools-ki` owns catalogue loading, rendering, guarded publication, rollback, and re-audit.

## Current state

`tools-ki` already has one renderer and `ki skill rubric` detects missing or stale publications, but that writer is outside repository CONFORM. `ki repo audit --skill ki-skills` does not yet assess publication parity, and the rubric context has no host-injected way to obtain rendered bytes without duplicating host behaviour.

## Steps

1. ✓ Agree the narrow host-injected publication capability and its failure semantics: repository containment, catalogue validation, missing/stale publication, invalid import, symlink refusal, and deterministic rendered bytes. Added the reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md) plan before implementation.
2. In `tools-ki`, route standalone and repository publication preparation through one validated renderer and guarded transaction path without weakening installed-harness validation.
3. Extend the rubric context contract so `ki-skills` receives only rendered-publication evidence and can propose derived writes; do not put criterion identity or automatic findings in the host.
4. Add `KI-CHECKER-6`: every structured catalogue has an exact derived publication; missing or differing bytes are FAIL drift and CONFORM schedules a DERIVED write. Exempt skills without structured catalogues.
5. Lock the canonical output contract for notices, family metadata, classifications, citations, judgment prompts, ordering, and final newline. Exercise drift audit, dry-run, real conform, idempotence, batching, rollback/race refusal, malformed catalogues, and FIXED reporting.
6. Regenerate every affected publication through repository CONFORM, review the derived-only diff, remove any residual per-skill publication logic, update authoring/CLI guidance, and run both repositories' final gates.

## Files touched

- `tools-ki`: rubric renderer/context/runtime and skill-command paths with their CLI and transaction tests; its reciprocal roadmap and plan.
- Harness: `skills/keystone/ki-skills/scripts/shared/rubric.ts`, focused publication context/item/tests, rubric-authoring standard, generated rubric publications, CLI guide, and this plan.

## Verify

- In `tools-ki`: `bun run test` and `bunx tsc --noEmit`, including drift, dry-run, transaction, rollback, and standalone-command parity scenarios.
- In the harness: `bun run test`, `bunx tsc --noEmit`, `ki repo audit --skill ki-skills --repo .`, `ki repo conform --skill ki-skills --repo . --dry-run`, and `ki skill rubric ki-skills`.
- After real CONFORM, a repeat dry-run proposes no publication writes and every structured publication has exact parity.

## Dependencies / blocks

The host-injected capability is specified in reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md), which blocks this plan's `ki-skills` context and `KI-CHECKER-6` implementation until its host contract is delivered. Existing renderer and transaction mechanisms are prerequisites, not blockers. Source implementation may use a local development-linked CLI; no released CLI is required.

## Delegation

- Round 1 — judgment: settle the host capability, failure semantics, and reciprocal ownership; files: read-only cross-repository scope; gate: explicit interface and reciprocal plan identifiers.
- Round 2 — mechanical: CLI worker owns `tools-ki/src/**`; harness worker owns only `ki-skills` contract/context/item/test paths; gate: focused suites agree on the frozen contract.
- Round 3 — mechanical: orchestrator runs canonical CONFORM, reviews the derived diff, updates guidance, and removes duplicates.
- Orchestrator: adversarially review loader, writer, symlink, race, rollback, and dry-run behaviour before final gates.
