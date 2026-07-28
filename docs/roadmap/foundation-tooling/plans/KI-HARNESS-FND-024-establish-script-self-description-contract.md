---
id: 'KI-HARNESS-FND-024'
title: Establish a top-level script self-description contract
status: in-progress
roadmap: foundation-tooling/establish-a-top-level-script-self-description-contract
blocks: —
blocked-by: —
baseline-ref: ab4c941e95546367ac2548f2036b453a15c5594e
---

# KI-HARNESS-FND-024: Establish a top-level script self-description contract

## Context

User-facing top-level scripts need a concise, source-level description of their purpose, invocation, and mutation boundary without duplicating generated or private implementation detail.

## Current state

`ki-skills` owns the contract because it governs public Agent Skill command surfaces; `ki-engineering` owns repository toolchain scripts, not skill capability boundaries.

The public surface has three scripts: `ki-binding-claude`'s external Cowork projection, `ki-binding-codex`'s native Codex MCP renderer, and `ki-recap`'s read-only grounding helper. Each now begins with a compact `Purpose:`, canonical `Run: bun scripts/<name> --help`, and `Boundary:` header. The existing `SCRIPT-8` heuristic verifies those source-level facts alongside its `-h`, `--help`, and `Usage:` checks. This is enough mechanical enforcement for the declared contract; whether a command is still necessary, the header is truthful, and errors are useful remain judgment review.

## Steps

1. ✓ Inventory public top-level scripts and separate them from private modules and generated surfaces.
2. ✓ Define the three-field header and assign the contract to `ki-skills`.
3. ✓ Apply the contract to every current public script and add proportionate heuristic enforcement.
4. ✓ Update the standards and generated rubric, with focused evidence tests.

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
