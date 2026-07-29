---
id: KI-HARNESS-FND-004
title: Document per-skill ki-config ownership
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Document the existing validate-down convention: each skill owns and validates its own table, while shared configuration stays with its owner.

## Boundary

Use `ki-authoring.printWidth` as the worked example; do not design a central editor schema without a concrete cross-skill use case.
