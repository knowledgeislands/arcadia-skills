---
id: KI-HARNESS-FND-018
area: FND
title: Support compatible refresh owners
theme: foundation-tooling
horizon: now
status: done
blocks: []
blocked_by: []
baseline_ref: 9e53f049cf3bfa001b445f01e75140e0a0a3bddc
---

## Goal

Make REFRESH ownership evidence accept a compatible source Harness that truthfully names its own canonical skill files.

## Context

`KI-SHAPE-14` currently treats `ki-agentic-harness` as the only shared Harness source. HNR's compatible Harness declares and installs the canonical KI Harness, but its own `hnr-*` skills are authored under `hnr-agentic-harness`. Its correct REFRESH procedure therefore names `hnr-agentic-harness` and redirects installed copies there, yet the current literal-name check reports a warning.

## Boundary

Do not accept arbitrary owner names, loosen the stop-and-redirect requirement, or change installed-copy behaviour. The source name must be derived from a repository that declares `ki-repo-harness` and from its own configured repository identity. Repository-local `ki-self` remains a separate, stricter source boundary.

## Current state

KI-SHAPE-14 has only two ownership forms: `.agents/skills/ki-self` and a literal `ki-agentic-harness`. Its context has no evidence of a compatible source Harness or its configured identity.

## Steps

- [x] Add focused source-Harness identity evidence derived from the source repository's `ki-repo-harness` declaration and `ki-repo.repository` URL.
- [x] Make KI-SHAPE-14 require that exact configured source-Harness name for compatible source Harness skills, while retaining the canonical and repository-local checks.
- [x] Add regression coverage for canonical, compatible, malformed, and installed-copy ownership claims.
- [x] Regenerate the skill rubric, re-audit the canonical and HNR Harnesses, and finish HNR-HARNESS-001's mode work.

## Files touched

- `skills/keystone/ki-skills/scripts/rubric/contexts/skill.ts` — source-Harness evidence.
- `skills/keystone/ki-skills/scripts/rubric/contexts/contexts.ts` and `items/ki-shape.ts` — typed ownership contract and audit.
- Focused KI Skills context/item tests, generated rubric publication, and this work record.

## Verify

- Focused KI Skills tests accept only the declared exact source Harness, reject unconfigured and wrong names, and retain local-source enforcement.
- `ki repo audit --skill ki-skills` passes in the canonical Harness and removes only the compatible-owner warning in HNR.
- The Harness typecheck, formatter, and relevant test gates pass.

## Dependencies / blocks

None.

## Documentation impact

### Decision Records

No decision record is expected; this implements the existing compatible-Harness ownership model.

### Specifications

No public CLI behaviour changes.

### Guides

Refresh skill guidance only if it incorrectly says the KI Harness is the sole possible source Harness.

### Roadmap

Unblocks the remaining HNR-HARNESS-001 REFRESH ownership warnings.

## Review

### Delivered

KI-SHAPE-14 now derives a source Harness name only from a physical or resolved `skills/` source beneath a repository that declares `ki-repo-harness` and a canonical `ki-repo.repository` identity.

### Summary of changes

The ownership check accepts the exact configured canonical or compatible source Harness name, including a symlinked installed copy resolving to that source. It retains the stricter repository-local `ki-self` rule and fails closed for absent, malformed, or mismatched source evidence.

### Verification

Focused KI Skills tests pass (18 tests), as do the Harness typecheck and focused Biome check. The generated KI Skills rubric was refreshed. The canonical Harness KI Skills audit has only its standing LONG-3 source-refresh warning; HNR's KI Skills and roadmap audits pass cleanly.

### Outstanding concerns

The full Harness suite still fails the pre-existing remediation-inventory assertion. `git blame` attributes it to `5fa55b52`, and comparison with this item's immutable baseline shows neither its test nor source changed during this work.

### Post-change review

The check no longer assumes a single source Harness, but it still requires an exact, repository-derived owner. HNR's source skills can now state their real write boundary without granting installed copies a loophole to invent one.

### Mini recap

Implemented the compatible-Harness ownership contract, regenerated its public rubric, and cleared the HNR source-owner warning.

## Done

Accepted on 2026-08-20 after the focused compatibility contract, canonical Harness checks, and HNR audit confirmed that only the exact configured source owner is accepted.

## Discussion

Source identity must be configuration-derived and exact. A prose match for any `*-agentic-harness` would let an installed copy invent an owner and defeat the ownership boundary this check protects.
