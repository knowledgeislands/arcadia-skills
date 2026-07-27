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

The host delivery in [CLI-002](https://github.com/knowledgeislands/tools-ki/commit/9032fa9) now provides one validated renderer, guarded transaction path, and criterion-agnostic publication evidence. The `ki-skills` exemplar consumes that evidence through `RUBRIC-1`: a missing or stale publication fails audit, and CONFORM requests only the host-owned derived write. The remaining work is to apply the proven pattern to every other structured catalogue and review the resulting derived-only publications.

## Steps

1. ✓ Agree the narrow host-injected publication capability and its failure semantics: repository containment, catalogue validation, missing/stale publication, invalid import, symlink refusal, and deterministic rendered bytes. Added the reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md) plan before implementation.
2. ✓ In `tools-ki`, route standalone and repository publication preparation through one validated renderer and guarded transaction path without weakening installed-harness validation. Delivered by [CLI-002](https://github.com/knowledgeislands/tools-ki/commit/9032fa9).
3. ✓ Extend the rubric context contract so `ki-skills` receives only rendered-publication evidence and can propose derived writes; do not put criterion identity or automatic findings in the host.
4. ✓ Add exemplar `RUBRIC-1` in its own `RUBRIC` family: its exact derived publication is required; missing or differing bytes are FAIL drift and CONFORM schedules a DERIVED write. Other structured catalogues remain for the rollout step and skills without structured catalogues are exempt.
5. ✓ Lock the canonical output contract for notices, family metadata, classifications, citations, judgment prompts, ordering, and final newline. Exercise drift audit, dry-run, real conform, idempotence, batching, rollback/race refusal, malformed catalogues, and FIXED reporting.
6. Standardise a visible `RUBRIC-1` derived-publication item in a `RUBRIC` family for every structured catalogue, backed by one portable vendored item factory. Each skill projects only host publication evidence into that local family; do not add per-skill rendering, path selection, byte construction, or writes.
7. Regenerate every affected publication through `ki skill rubric <skill> --write` or the declared repository CONFORM scope, review the derived-only diff, remove residual per-skill publication logic, update authoring/CLI guidance, and run both repositories' final gates.

## Files touched

- `tools-ki`: rubric renderer/context/runtime and skill-command paths with their CLI and transaction tests; its reciprocal roadmap and plan.
- Harness: `skills/keystone/ki-skills/scripts/shared/rubric.ts`, focused publication context/item/tests, rubric-authoring standard, generated rubric publications, CLI guide, and this plan.

## Verify

- In `tools-ki`: `bun run test` and `bunx tsc --noEmit`, including drift, dry-run, transaction, rollback, and standalone-command parity scenarios.
- In the harness: `bun run test`, `bunx tsc --noEmit`, `ki repo audit --skill ki-skills --repo .`, `ki repo conform --skill ki-skills --repo . --dry-run`, and `ki skill rubric ki-skills`.
- After real CONFORM, a repeat dry-run proposes no publication writes and every structured publication has exact parity.

## Dependencies / blocks

The host-injected capability is specified in reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md), which blocks this plan's `ki-skills` context and `RUBRIC-1` implementation until its host contract is delivered. Existing renderer and transaction mechanisms are prerequisites, not blockers. Source implementation may use a local development-linked CLI; no released CLI is required.

## Delegation

- Round 1 — judgment: settle the host capability, failure semantics, and reciprocal ownership; files: read-only cross-repository scope; gate: explicit interface and reciprocal plan identifiers.
- Round 2 — mechanical: CLI worker owns `tools-ki/src/**`; harness worker owns only `ki-skills` contract/context/item/test paths; gate: focused suites agree on the frozen contract.
- Round 3 — mechanical: orchestrator runs canonical CONFORM, reviews the derived diff, updates guidance, and removes duplicates.
- Orchestrator: adversarially review loader, writer, symlink, race, rollback, and dry-run behaviour before final gates.
