---
id: GDR-KI-HARNESS-005
title: 'Cross-repository handoff submissions'
date: 2026-08-03
status: current
type: Governance Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/gdr
decision_type: governance
decision_depends_on: ['GDR-KI-FUNDAMENTALS-001']
---

# GDR-KI-HARNESS-005: Cross-repository handoff submissions

## Context

Knowledge Islands repositories have generic inbound and outbound working areas, but the `_HANDOFFS` subdirectories do not establish a trusted route, stable submission identity, immutable sender evidence, or a safe release signal. The Feature Definitions pilot between the Harness and `tools-ki` used direct super trust and recorded the receiving work directly; that bootstrap bridge supplied design evidence without creating a reusable transport or granting one repository authority over another.

A repository remains the sole authority for its roadmap, priority, implementation, and acceptance state. Local registered-repository visibility can support review of another repository's files, but filesystem visibility alone does not prove that either repository consents to exchange submissions.

## Decision

We adopt `ki-handoffs` as the portable governance owner for optional cross-repository submissions. Each participating repository declares its canonical lower-case `owner/repo` identity and a normalized, duplicate-free peer list in its own `ki-handoffs` configuration. A route is active only when both locally registered repositories declare matching identities and reciprocal peer entries; absence, mismatch, or ambiguity is reported and never trusted.

Each submission receives an independent `HND-` identifier followed by a lower-case UUID-shaped value. The sender creates only its own outbound record under `-/_HANDOFFS/<receiver-owner>/<receiver-repo>/`; the receiver creates and changes only its inbound copy under `+/_HANDOFFS/<sender-owner>/<sender-repo>/`. Sender provenance and payload are immutable between copies. Receiver-local metadata begins at `received` and may move to `adopted`, `parked`, `clarify`, `declined`, or `superseded`, with receiver-owned rationale and local adoption or supersession linkage.

Adoption is a disposition, not authority to create, prioritize, implement, or accept local roadmap work. `ki-next` presents inbound submissions for an exact human-confirmed disposition. `ki-roadmap` may report structural and review guidance but remains read-only for handoffs. `ki-repo` retains ownership of the generic `+` and `-` directories and their README orientation; `ki-handoffs` owns only the optional `_HANDOFFS` directories, their README files, records, route checks, and lifecycle when declared.

The sender may release its outbound copy only after observing `adopted`, `declined`, or `superseded`. `parked` and `clarify` retain it. The receiver may prune its inbound copy only after sender release is observable. Neither silence nor file visibility implies acceptance.

## Consequences

Repositories gain a reviewable submission protocol without a cross-repository write authority or automatic transfer semantics. A malformed identity, nonreciprocal declaration, altered payload, peer-side status write, or premature release becomes detectable evidence rather than an inferred route or acceptance signal.

The initial capability depends on mutually visible repositories in the local KI registry. Remote interchange remains outside this authority model: any later transport may relay permitted records and receiver statuses, but it cannot decide a disposition or mutate either repository's roadmap. The direct-super-trust pilot remains historical bootstrap evidence rather than a compatibility path.

## References

- [GDR-KI-FUNDAMENTALS-001](GDR-KI-FUNDAMENTALS-001-knowledge-islands-ecosystem-fundamentals.md) — the repository authority and choreography model this decision preserves.
