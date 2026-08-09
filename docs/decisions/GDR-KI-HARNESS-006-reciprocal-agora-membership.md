---
id: GDR-KI-HARNESS-006
title: 'Reciprocal Agora membership'
date: 2026-08-09
status: current
type: Governance Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/gdr
decision_type: governance
decision_depends_on: ['GDR-KI-FUNDAMENTALS-001']
---

# GDR-KI-HARNESS-006: Reciprocal Agora membership

## Context

Local `.ki-agora` profiles currently collect absolute paths for one editor. They cannot establish that a repository approves its members, that a member consents to join, or that any local client projection is permitted. The local KI registry can resolve canonical repositories to physical roots, but registry visibility is not membership consent and must remain distinct from external source stores a client may also open.

## Decision

This island adopts `ki-agora` as the portable governance owner for named reciprocal Agora membership. An Agora home declares its stable identifier, purpose, permitted target-policy categories, and approved canonical repository members with their roles. A member independently declares the same identifier, canonical home, and role. The portable contract records no local path or application-owned state.

The `ki` host owns local registry resolution and reciprocal observation. A user-environment owner may project an agreed Agora to a supported client, while preserving its client-owned state. The full registry may separately derive one protected system-managed estate; named Agoras remain intentional subsets and never enrol external source stores by association.

## Consequences

Repositories gain one reviewable consent model that survives machines and clients without granting cross-repository write authority. A peer's absence or mismatch becomes an observable validation result, not a mutation request. The first actual Agora vocabulary and member set remain user-authorised follow-on configuration, and tools-ki can now implement resolution without inventing a competing schema.

## References

- [GDR-KI-FUNDAMENTALS-001](GDR-KI-FUNDAMENTALS-001-knowledge-islands-ecosystem-fundamentals.md) — the ecosystem authority and choreography model this decision preserves.
