---
id: KI-HARNESS-GOV-047
title: Classify open trade routes
area: GOV
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 2b81c73ed896eaa9f73a1ce2eaadb697b39291fa
---

## Goal

Let reciprocal trade routes classify knowledge subtypes and declare itemized or standing intake, so eligible receiver-approved knowledge can enter receiver-owned work or canonical knowledge directly while preserving provenance and receiver control.

## Context

The current route model distinguishes `work` from `knowledge`. Those top-level kinds have different lifecycle semantics but are too coarse when a repository wants to accept only a precise recurring class of knowledge from another authority. The itemized protocol remains appropriate whenever each exchange needs submission, receipt, and receiver disposition. It is disproportionate when both sides have already consented to a narrow recurring knowledge class and the receiver can retain provenance directly.

## Boundary

Retain `work` and `knowledge` as the top-level lifecycle kinds. Introduce standing intake only for knowledge. A route never grants peer write, review, priority, implementation, publication, acceptance, or completion authority. Work always enters through the itemized trade and receiver-local work lifecycle. Agora membership may provide relationship context but grants no routing or publication authority.

### Shaping

#### Selected model

Treat standing intake as an exact, two-sided knowledge subtype grant layered onto an active reciprocal route. The receiver owns the subtype vocabulary and imports it; the sender explicitly exports the same subtype. Preserve the current itemized lifecycle as the default fallback.

The proposed receiver declaration is:

```toml
[skills.ki-trades.subtypes.knowledge]
shared-capability-maintenance = "Maintenance evidence about receiver-owned shared capabilities."

[skills.ki-trades.routes."knowledgeislands/tools-git-almanac"]
import = ["knowledge"]

[skills.ki-trades.routes."knowledgeislands/tools-git-almanac".standing.import]
knowledge = ["shared-capability-maintenance"]
```

The sender independently declares the ordinary reciprocal `knowledge` export and matching `standing.export.knowledge` subtype. Standing intake is eligible only when both canonical repositories are registered, the ordinary knowledge route is active, the receiver defines and imports the subtype, the sender exports it, and the receiver-local capture carries valid provenance. Anything absent, malformed, unknown, one-sided, or uncertain remains itemized.

#### Provenance

The proposed first portable form is a visible structured block in the receiver-owned Markdown artifact:

```toml
schema = "ki-trades/standing-intake/v1"
id = "STI-1a2b3c4d"
source = "https://github.com/knowledgeislands/tools-git-almanac"
source_ref = "<40-hex-commit>:docs/path.md#anchor"
receiver = "https://github.com/knowledgeislands/ki-agentic-harness"
kind = "knowledge"
subtype = "shared-capability-maintenance"
captured_at = "2026-08-30T12:00:00Z"
capture = "docs/roadmap/KI-HARNESS-GOV-047-classify-open-trade-routes.md#source-analysis"
```

Audit validates declared blocks rather than attempting to infer copied prose. New capture must match the currently active standing route. Committed capture is validated against its introduction commit and committed source reference; missing or rewritten historical evidence is reported as unverifiable rather than silently accepted. Revocation disables new direct capture immediately while preserving receiver-owned evidence introduced under the former grant.

#### Capture rules

- Augment an existing roadmap record only when the insight directly supports its existing goal and boundary without expanding approved implementation scope.
- Create a new local draft when the insight introduces distinct work, a material decision, a dependency, or new scope.
- Capture directly into canonical knowledge only when the knowledge itself is the outcome; a public contract or implementation change still requires receiver-local work.
- Keep work on the explicit `TRD-*` disposition and local work lifecycle even when its topic resembles a standing knowledge subtype.
- Keep Agora membership presentational only. It neither activates nor is required for standing intake.
- Permit an optional subtype on itemized knowledge as classification only. Refuse work subtypes in the first version.

#### Compatibility

Existing `export` and `import` arrays retain their itemized semantics. Absence of `subtypes` or `standing` means itemized-only. Existing knowledge records without a subtype remain valid. An optional subtype on an itemized knowledge record never upgrades it to standing. Removing either standing declaration stops new direct capture without invalidating receiver-owned evidence captured while the route was active.

#### Promotion conditions

Mark Ready only after the proposed two-sided grant, receiver-owned vocabulary, inline `STI-*` evidence, Agora boundary, and optional itemized knowledge classification receive approval. The implementation contract must remain testable without inventing peer-write, priority, implementation, acceptance, or publication authority.

## Current state

The existing `ki-work`, roadmap, and `ki-trades` contracts are mechanically healthy, and no dependency blocks delivery. The ready plan adopts the proposed two-sided grant, receiver-owned vocabulary, inline `STI-*` evidence, Agora independence, and itemized fallback as one default-deny policy bundle. The representation, provenance form, compatibility model, revocation rule, and capture policy are concrete enough to implement and verify.

## Steps

- [x] Amend `GDR-KI-HARNESS-005` with the exact-subtype, two-sided standing-authority model.
- [x] Extend the `ki-trades` standard with subtype definitions, standing configuration, optional itemized knowledge classification, inline provenance, capture rules, compatibility, and revocation.
- [x] Extend the trade rubric context and generated criteria for subtype definitions, reciprocity, provenance, historical revocation, and default-deny failures.
- [x] Update `ki-next` guidance for receiver-local standing capture while preserving its selection and implementation authority boundaries.
- [x] Model all required private, public, matching, non-matching, work, and revocation examples in fixtures and migration guidance.
- [x] Capture actual route activation and `tools-ki` command support as separately owned follow-on work; do not mutate peer repositories from this item.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-005-cross-repository-trade-routes.md`
- `skills/governance/ki-trades/` standard, context, rubric items, tests, and generated rubric
- `skills/change-management/ki-next/` standing-intake guidance and tests
- This work item and migration guidance or fixtures carrying the required examples

## Verify

- Existing configurations with only `export` and `import` remain itemized-only and valid.
- Unknown, absent, malformed, one-sided, revoked, and cross-kind subtype declarations fail closed to itemized handling.
- Each `STI-*` block has a unique identity, committed source reference, valid introduction history, matching reciprocal route, and receiver-local capture.
- Work never enters standing intake, and an itemized knowledge subtype never upgrades itself to standing.
- Revocation stops new capture without invalidating historical receiver-owned evidence.
- Agora membership changes discovery presentation only.
- `ki repo audit --skill ki-trades --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No external dependency blocks delivery. The five policy choices are approved together as the default-deny authority model. Actual standing-route activation and peer tooling belong to receiver-owned follow-on work.

## Documentation impact

### Decision Records

Amend `GDR-KI-HARNESS-005` because standing intake changes the approved route authority model.

### Specifications

No separate product specification is required unless `tools-ki` later exposes a user-facing standing-intake command.

### Guides

Add migration examples for itemized fallback, direct knowledge capture, and revocation.

### Roadmap

Route activation and provider tooling remain separate follow-on records owned by their receiving repositories.

## Review

### Delivered

Implemented the exact-subtype, two-sided standing knowledge-intake contract from baseline `2b81c73ed896eaa9f73a1ce2eaadb697b39291fa` in commit `cee9613de6328fc5a12c2ca6959da10f90f9053b`, with receiver-owned vocabulary, reciprocal activation, optional itemized classification, marked `STI-*` evidence, revocation-aware reporting, and preserved authority boundaries. Created receiver-owned CLI follow-on `KI-TOOL-CLI-062` in `tools-ki` commit `f378982`.

### Summary of changes

Amended `GDR-KI-HARNESS-005`, the `ki-trades` standard, generated rubric, checker context, and fixtures; added `STANDING-1`; and extended `ki-next` routing guidance. Existing configurations remain itemized-only when subtype and standing tables are absent.

### Verification

Focused Biome, TypeScript, and 31 `ki-trades` tests passed. `ki repo audit --skill ki-trades --repo .` passed. The hook-backed implementation commit also passed Markdown repair and staged-snapshot `ki-skills` audit.

### Outstanding concerns

Historical capture after route revocation is retained and reported for introduction-time review; the first checker slice does not automatically reconstruct both repositories' historical route configuration. This is visible `INFO` evidence rather than a silent pass. User-facing mutation and capture commands remain separately owned by ready `KI-TOOL-CLI-062`.

### Post-change review

The implementation keeps standing intake narrower than itemized trades: knowledge-only, exact and reciprocal, receiver-local, source-commit anchored, and default-deny. It introduces no peer write or lifecycle authority and leaves existing route and record contracts compatible.

### Mini recap

Durable policy belongs in `GDR-KI-HARNESS-005` and `standards-trades.md`; receiver workflow belongs in `ki-next`; CLI mutation belongs in `tools-ki`. No additional harness learning route is required.

## Discussion

### Locked policy bundle

Reciprocity, subtype ownership, provenance, Agora independence, and itemized fallback are one inseparable default-deny authority model. Implementation must not weaken one element independently; any material departure returns the record to planning or creates a new decision.
