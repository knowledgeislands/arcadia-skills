---
id: KI-HARNESS-GOV-020
title: Audit instruction surfaces
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Assess durable AI instruction surfaces against the portable communication and precedence model before proposing any change.

## Context

User-wide, repository-level, and runtime-specific instruction files may diverge as communication governance evolves. An evidence-led read-only audit is needed before any user-owned surface changes.

## Boundary

Do not change user-wide or repository instruction files without explicit approval, or collapse runtime-specific guidance into shared portable instructions.

## Current state

The communication model exists but the current instruction estate has not been assessed against it.

## Steps

- [ ] Inventory relevant user-wide, repository, and runtime instruction surfaces.
- [ ] Assess portability, precedence, communication-level guidance, and failure-reporting preservation.
- [ ] Report findings and proposed changes separately from any future authorised edit.

## Files touched

- Read-only instruction-surface inventory and audit evidence
- Relevant guidance only after separate approval

## Verify

- A reviewable inventory with source locations and evidence
- No instruction-surface writes in the audit pass

## Dependencies / blocks

The audit is independently executable; any remediation needs separate user authority.

## Discussion

### Source

This item adopts [TRD-5875ee10](../../+/_TRADES/knowledgeislands/tools-ki/TRD-5875ee10.md).
