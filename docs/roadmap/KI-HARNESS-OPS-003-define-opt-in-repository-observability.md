---
id: KI-HARNESS-OPS-003
title: Define opt-in repository observability via OTLP
theme: operations
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Define an off-by-default `ki-observability` capability for reporting repository and skill activity to a configured OTLP-compatible endpoint.

## Boundary

Disabled means no network activity; enabled reporting is best-effort and never changes AUDIT or CONFORM results. Do not introduce transcript scraping or a required gateway in the first slice.
