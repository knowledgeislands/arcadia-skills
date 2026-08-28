---
id: KI-HARNESS-GOV-047
title: Classify open trade routes
area: GOV
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

# KI-HARNESS-GOV-047: Classify open trade routes

## Goal

Let reciprocal trade routes classify knowledge subtypes and declare itemized or standing intake, so receiver-approved knowledge can enter receiver-owned roadmap or canonical knowledge directly without a per-item trade record, while preserving provenance and receiver control of priority, implementation, and acceptance.

## Context

The current route and record model distinguishes only `work` and `knowledge`. Those top-level kinds correctly carry different lifecycle semantics, but they are too coarse when a repository wants to accept only selected material from another authority. Knowledge could distinguish an operating practice, configuration pattern, research finding, publication candidate, or shared-capability maintenance insight. Work may also need subtypes for classification, but remains separately governed local work.

The current itemized protocol is appropriate when each exchange needs an explicit submission, receipt, and receiver disposition. It is disproportionate when the receiver has already consented to a precise recurring class of knowledge and the receiver-owned roadmap or canonical artifact can preserve the intake evidence directly.

Shared capability consumers make the distinction concrete. Git Almanac, `tools-ki`, or mGit may discover a maintenance insight about a Harness-owned skill. Harness may pre-approve that exact knowledge subtype for standing intake, allowing the insight to be captured directly in an existing or new Harness roadmap item without manufacturing an intermediate trade lifecycle. The Harness record, not the standing route, then governs whether and when any skill update is implemented.

A standalone source repository remains authoritative for its own subject while another repository selectively consumes suitable knowledge. The route expresses standing eligibility for a bounded subtype; it does not create global trust or a general cross-repository work mandate.

## Boundary

Retain `work` and `knowledge` as the top-level lifecycle kinds unless evidence shows their lifecycle distinction is wrong. Introduce standing intake only for knowledge. A work subtype may improve route classification, but a task still enters the receiver's local roadmap through the existing itemized trade and adoption path.

Standing intake means the receiver has pre-approved direct capture of an eligible knowledge subtype into a named receiver-owned roadmap record or canonical artifact. It does not mean automatic transfer, peer writes, review, priority, implementation, publication, acceptance, or completion. An approved receiver-local roadmap item may separately authorize the resulting edit; the route alone does not.

Reciprocal route activation and receiver authority remain mandatory. Any standing grant must be bounded by partner, kind, and subtype; explicit and mechanically unambiguous; compatible with default-deny routes; and safe to revoke without invalidating knowledge or provenance already retained locally.

Do not make every repository adopt one universal content taxonomy merely to participate. Agora membership may help identify an intentional repository relationship, but it grants no work-routing or intake authority and must not silently activate a standing route.

## Shaping

Treat standing intake as a receiver-declared policy for an exact knowledge subtype layered onto an active reciprocal route. Preserve the current itemized lifecycle as the default and fallback. Qualifying knowledge enters a receiver-owned roadmap record or canonical artifact with compact source and route provenance replacing the `TRD-*` envelope; any resulting work proceeds only through that receiver-local authority.

Shape the portable configuration, provenance, audit, discovery, compatibility, and revocation rules together before implementation. The current trade decision and standard, `ki-next` intake boundary, and Agora's non-routing membership boundary are known contract dependencies. Git Almanac, `tools-ki`, and mGit provide required examples but do not need to change before this contract can be shaped.

Promotion to Next requires decisions on route representation, subtype ownership, replacement provenance, existing-versus-new roadmap capture, and removal safety, plus default-deny examples concrete enough to verify mechanically.

## Discussion

### Questions to resolve

- Decide the route representation for kind, subtype, and `itemized` versus `standing` intake without ambiguous precedence or accidental cross-kind permission.
- Decide whether subtype identifiers use a shared vocabulary, a receiver-qualified vocabulary, or a combination. Prefer receiver-owned meaning for a standing import unless evidence supports a genuinely shared term.
- Define the receiver-local provenance that replaces a `TRD-*` envelope for standing intake, including source repository, source reference, declared subtype, active reciprocal route, and capture location.
- Define when eligible knowledge may augment an existing roadmap item, when it needs a new item, and when it belongs directly in another canonical artifact.
- Establish how route discovery explains why an insight is eligible before capture and how audit distinguishes standing intake from an undeclared cross-repository write.
- Preserve compatibility for existing `export = ["work", "knowledge"]` and `import = [...]` declarations and existing records with no subtype or intake policy.
- Define removal and revocation safety: closing a standing route stops new intake but does not erase or invalidate receiver-owned records created while it was active.
- Decide whether Agora membership is merely presentational context or an optional prerequisite, without changing Agora's independent-authority boundary.

### Required examples

Before promotion to Next, model at least:

- Harness standing import of a receiver-defined shared-capability maintenance subtype from Git Almanac, `tools-ki`, and mGit, with direct provenance-preserving capture into a Harness roadmap item and no per-insight trade record;
- a non-matching insight from the same repository falling back to the itemized `TRD-*` lifecycle;
- a work request that still requires explicit trade disposition and a separately governed local roadmap item even when its topic resembles a standing knowledge subtype;
- a configuration repository exporting selected operating practices to a private principal;
- the same source offering publication candidates to a public persona or website while withholding unrelated private knowledge;
- revocation of a standing route while preserving previously captured receiver-local evidence.

### Contract and implementation surfaces

The shaped outcome must identify required changes to `GDR-KI-HARNESS-005`, the `ki-trades` standard, route configuration, itemized record schema, standing-intake provenance contract, `ki-next` intake handling, rubric, fixtures, migration guidance, and capability documentation. Harness owns the portable contract; any `tools-ki` parsing, discovery, or execution change remains separately bounded receiver-owned implementation work rather than being smuggled into this record.

### Promotion conditions

Promote to Next only when subtype ownership, itemized and standing intake semantics, replacement provenance, compatibility, revocation safety, and at least one default-deny representation are concrete enough to test without inventing peer-write, priority, implementation, or acceptance authority.
