---
id: KI-HARNESS-GOV-056
area: GOV
title: Track work item timestamps
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

# Track Work Item Timestamps

## Goal

Give every governed change-management record reliable creation and last-update metadata so local and remote portfolios can report age and staleness consistently.

## Context

Roadmap and KB Streams records currently store lifecycle state but no portable timestamps. Independent agents operating from isolated environments need monotonic metadata that does not depend on a shared filesystem, while GitHub Issues and Linear already expose native creation and update times.

## Boundary

This first increment does not claim cycle time, throughput, or time-in-state statistics. Those require explicit lifecycle timestamps or retained event history beyond `created_at` and `updated_at`.

## Shaping

Define `created_at` and `updated_at` as RFC 3339 UTC timestamps with second precision. Set them equal when a local record is created, keep `created_at` immutable, and advance `updated_at` on each governed record mutation. Let remote adapters project their native timestamps rather than duplicating them. Establish compatibility and Git-history backfill before making the fields universally required.

## Discussion

### Distributed authority

Prefer `tools-ki` as the timestamp writer for deterministic local operations and require process skills to preserve monotonic values during authored changes. Specify optimistic conflict handling so an isolated agent cannot silently overwrite a newer record.

### Statistical scope

The initial reporting contract may calculate record age, inactivity, timestamp coverage, and stale-active counts. A later decision can add `started_at`, `completed_at`, or lifecycle events when reliable delivery and throughput measures are needed.

### Rollout order

First accept and validate optional timestamps, then update tooling and process skills, backfill existing records from Git history, and only then consider a required-field gate. This avoids breaking repositories still running the earlier parser.
