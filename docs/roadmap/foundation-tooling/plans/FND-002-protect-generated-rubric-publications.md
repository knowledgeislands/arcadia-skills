---
id: 'FND-002'
title: Protect generated rubric publications from drift
status: acceptance
roadmap: foundation-tooling/protect-generated-rubric-publications-from-drift
blocks: —
blocked-by: —
baseline-ref: 4df00bec34261e99eb429037c69fcc3d241afdc7
---

## Context

Make `ki` the sole renderer for structured rubrics. TypeScript catalogues remain authoritative and tracked `references/rubric.md` files become derived publications. `ki-skills` owns the policy criterion; `tools-ki` owns catalogue loading, rendering, guarded incremental publication, and re-audit.

## Current state

The host delivery in [CLI-002](https://github.com/knowledgeislands/tools-ki/commit/99d08d2) now provides one validated renderer, guarded incremental publisher, and criterion-agnostic publication evidence. Each proposed write is safely checked and published atomically in order; if a later write fails, earlier safe writes remain and the host re-audits to report the remaining state. Every one of the 30 structured catalogues consumes that evidence through a visible `RUBRIC-1` family item: a missing or stale publication fails audit, and CONFORM requests only the host-owned derived write. All vendor copies of the portable authoring contract are byte-identical, and every generated publication has been regenerated and verified in sync.

## Steps

1. ✓ Agree the narrow host-injected publication capability and its failure semantics: repository containment, catalogue validation, missing/stale publication, invalid import, symlink refusal, and deterministic rendered bytes. Added the reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md) plan before implementation.
2. ✓ In `tools-ki`, route standalone and repository publication preparation through one validated renderer and guarded incremental publisher without weakening installed-harness validation. Confirmed the [CLI-002](https://github.com/knowledgeislands/tools-ki/commit/99d08d2) contract: each safe write is atomic and independently guarded, while a later failure retains earlier completed writes and produces a re-audited remaining-state report.
3. ✓ Extend the rubric context contract so `ki-skills` receives only rendered-publication evidence and can propose derived writes; do not put criterion identity or automatic findings in the host.
4. ✓ Add exemplar `RUBRIC-1` in its own `RUBRIC` family: its exact derived publication is required; missing or differing bytes are FAIL drift and CONFORM schedules a DERIVED write. Other structured catalogues remain for the rollout step and skills without structured catalogues are exempt.
5. ✓ Lock the canonical output contract for notices, family metadata, classifications, citations, judgment prompts, ordering, and final newline. Exercised drift audit, dry-run, real conform, idempotence, batching, per-file race refusal, partial-failure retention, malformed catalogues, and FIXED reporting through the refreshed `tools-ki` full-coverage gate.
6. ✓ Standardise a visible `RUBRIC-1` derived-publication item in a `RUBRIC` family for every structured catalogue, backed by one portable vendored item factory. Each skill projects only host publication evidence into that local family; no skill adds rendering, path selection, byte construction, or writes.
7. ✓ Regenerate every affected publication through `ki skill rubric <skill> --write` or the declared repository CONFORM scope, review the derived-only diff, remove residual per-skill publication logic, update authoring/CLI guidance for incremental publication, and run both repositories' final gates. All 30 structured publications have exact parity.

## Files touched

- `tools-ki`: rubric renderer/context/runtime and skill-command paths with their CLI and guarded-publication tests; its reciprocal roadmap and plan.
- Harness: `skills/keystone/ki-skills/scripts/shared/rubric.ts`, focused publication context/item/tests, rubric-authoring standard, generated rubric publications, CLI guide, and this plan.

## Verify

- In `tools-ki`: `bun run test` and `bunx tsc --noEmit`, including drift, dry-run, per-file atomicity, partial-failure retention, race refusal, and standalone-command parity scenarios.
- In the harness: `bun run test`, `bunx tsc --noEmit`, `ki repo audit --skill ki-skills --repo .`, `ki repo conform --skill ki-skills --repo . --dry-run`, and `ki skill rubric ki-skills`.
- After real CONFORM, a repeat dry-run proposes no publication writes and every structured publication has exact parity.

## Dependencies / blocks

The host-injected capability is specified in reciprocal [CLI-002](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-002-host-generated-rubric-publication-capability.md), which blocks this plan's `ki-skills` context and `RUBRIC-1` implementation until its host contract is delivered. The renderer and guarded incremental publisher are prerequisites, not blockers. Source implementation may use a local development-linked CLI; no released CLI is required.

## Delegation

- Round 1 — judgment: settle the host capability, failure semantics, and reciprocal ownership; files: read-only cross-repository scope; gate: explicit interface and reciprocal plan identifiers.
- Round 2 — mechanical: CLI worker owns `tools-ki/src/**`; harness worker owns only `ki-skills` contract/context/item/test paths; gate: focused suites agree on the frozen contract.
- Round 3 — mechanical: orchestrator runs canonical CONFORM, reviews the derived diff, updates guidance, and removes duplicates.
- Orchestrator: adversarially review loader, writer, symlink, per-file race, partial-failure retention, re-audit, and dry-run behaviour before final gates.

## Acceptance

### Delivered

`ki` remains the sole structured-rubric renderer and publisher. The host contract is now accurately recorded as guarded incremental publication: each write is independently guarded and atomic; a later failure retains prior safe writes, then re-audits and reports the remaining state.

### Summary of changes

- Replaced the stale rollback and transaction claims in FND-002, the foundation roadmap, and the rubric-authoring standard with the delivered [CLI-002](https://github.com/knowledgeislands/tools-ki/commit/99d08d2) guarded-incremental contract.
- Returned the invalid old packet to open work, reset its affected steps, then revalidated the host behaviour and all harness publications.
- Kept the renderer, target selection, bytes, guarded publisher, and reporting in `ki`; skills retain only their visible policy item and conform request.

### Verification

- `tools-ki`: `bun run test:coverage` — 342 passing tests and 100% statements, branches, functions, and lines; `bunx tsc --noEmit` passed.
- Harness: `bun run test` — 209 passing tests; `bunx tsc --noEmit`; `ki repo audit --skill ki-roadmap --repo .`; `ki repo audit --skill ki-skills --repo .`; and `ki repo conform --skill ki-skills --repo . --dry-run` all passed.
- `ki skill rubric <skill>` confirmed exact parity for all 30 structured catalogues; `git diff --check` passed.

### Outstanding concerns

None for FND-002. The locally installed Homebrew binary predates the source host capability, so the refreshed verification and staged audit used the current checked-out CLI source; no release has been made or required.

### Mini recap

The plan now describes the shipped incremental behaviour honestly, its validation is refreshed across both repositories, and every generated publication is exact. It is ready for user acceptance.
