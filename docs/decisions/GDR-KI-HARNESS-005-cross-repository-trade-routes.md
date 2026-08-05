---
id: GDR-KI-HARNESS-005
title: 'Cross-repository trade routes'
date: 2026-08-03
status: current
type: Governance Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/gdr
decision_type: governance
decision_depends_on: ['GDR-KI-FUNDAMENTALS-001']
---

# GDR-KI-HARNESS-005: Cross-repository trade routes

## Context

Knowledge Islands repositories have generic inbound and outbound working areas, but the `_TRADES` subdirectories do not establish a trusted typed route, stable trade identity, immutable sender evidence, or a safe release signal. The Feature Definitions pilot between the Harness and `tools-ki` used direct super trust and recorded the receiving work directly; that bootstrap bridge supplied design evidence without creating a reusable transport or granting one repository authority over another.

A repository remains the sole authority for its roadmap, priority, implementation, acceptance, and knowledge state. Local registered-repository visibility can support review of another repository's files, but filesystem visibility alone does not prove that either repository consents to exchange trades.

## Decision

We adopt `ki-trades` as the portable governance owner for optional cross-repository trades. Each participating repository declares its canonical HTTPS GitHub home once through `ki-repo.repository`; its optional `ki-trades` table declares normalized, typed `exports_to` and `imports_from` routes. A route is active only when a sender exports a kind to a locally registered receiver and that receiver imports the same kind from the sender; absence, mismatch, or ambiguity is reported and never trusted.

Each trade record represents one trade, receives an independent `TRD-` identifier followed by eight lower-case hexadecimal characters, and declares `kind: work | knowledge`. This concise identifier deliberately accepts its collision risk. The sender creates only its own outbound record under `-/_TRADES/<receiver-owner>/<receiver-repo>/`; the receiver creates and changes only its inbound copy under `+/_TRADES/<sender-owner>/<sender-repo>/`. Sender provenance and payload are immutable between copies. Receiver-local metadata begins at `received`; work may move to `adopted` with a local work link, knowledge may move to `retained` with a local knowledge link, and either may be `parked`, `clarify`, `declined`, or `superseded`.

Adoption and retention are dispositions, not authority to create, prioritize, implement, or accept local roadmap work, nor to alter local knowledge. `ki-next` presents inbound trades for an exact human-confirmed disposition. `ki-roadmap` may report structural and review guidance but remains read-only for trades. `ki-repo` retains ownership of the generic `+` and `-` directories and their README orientation; `ki-trades` owns only the optional `_TRADES` directories, their README files, records, route checks, and lifecycle when declared.

The sender may release its outbound copy only after observing `adopted`, `retained`, `declined`, or `superseded`. `parked` and `clarify` retain it. The receiver may prune its inbound copy only after sender release is observable. Neither silence nor file visibility implies acceptance or retention.

## Consequences

Repositories gain a reviewable typed-trade protocol without a cross-repository write authority or automatic transfer semantics. A malformed repository identity, nonreciprocal declaration for a trade kind, altered payload, peer-side status write, or premature release becomes detectable evidence rather than an inferred route, acceptance, or retention signal.

The initial capability depends on mutually visible repositories in the local KI registry. Remote interchange remains outside this authority model: any later transport may relay permitted records and receiver statuses, but it cannot decide a disposition or mutate either repository's roadmap. The direct-super-trust pilot remains historical bootstrap evidence rather than a compatibility path.

## References

- [GDR-KI-FUNDAMENTALS-001](GDR-KI-FUNDAMENTALS-001-knowledge-islands-ecosystem-fundamentals.md) — the repository authority and choreography model this decision preserves.
