---
id: 'KI-HARNESS-FND-024'
title: Establish a top-level script self-description contract
status: open
roadmap: foundation-tooling/establish-a-top-level-script-self-description-contract
blocks: —
blocked-by: —
baseline-ref: —
---

# KI-HARNESS-FND-024: Establish a top-level script self-description contract

## Context

User-facing top-level scripts need a concise, source-level description of their purpose, invocation, and mutation boundary without duplicating generated or private implementation detail.

## Current state

Ownership between `ki-skills` and `ki-engineering` is undecided. The script classes and acceptable header shape must be established before any mechanical enforcement is added.

## Steps

1. Inventory public top-level scripts and separate them from private modules and generated surfaces.
2. Propose the minimal self-description fields and decide the owning standard.
3. Apply the accepted contract to representative scripts and assess whether mechanical enforcement is justified.
4. Add only the agreed documentation or rubric enforcement, with focused tests where applicable.

## Files touched

- `skills/**/scripts/`
- `skills/keystone/ki-skills/`
- `skills/governance/ki-engineering/`

## Verify

- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-engineering --repo .`
- Focused tests for any changed catalogue or script.

## Dependencies / blocks

None.
