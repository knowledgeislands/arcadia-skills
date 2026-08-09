---
id: KI-HARNESS-GOV-034
area: GOV
title: Migrate Streams identities
theme: governance-consistency
horizon: future
status: draft
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Give KB Streams the same durable repository, area, and serial identity model as area-enabled repository roadmaps.

## Context

Streams currently require a bespoke `code` field and an owner-approved migration map. The agreed direction is a stable `id`, fixed issuing `area`, optional multi-valued `groups`, and a `Streams/_ISSUES.md` ledger, while Focus and category remain navigational structure. Arcadia has 23 retained proposals and Techne has two.

## Boundary

Do not move Streams into repo operations, alter canonical knowledge, or derive identities from Focus, category, title, or path. The migration must preserve retained proposal history and non-reuse guarantees.

## Discussion

### Migration contract

First establish the shared Streams contract and allocation ledger, then migrate each base's proposal metadata through its receiving Knowledge Base work. Existing proposal titles, paths, status, and approval evidence remain stable.
