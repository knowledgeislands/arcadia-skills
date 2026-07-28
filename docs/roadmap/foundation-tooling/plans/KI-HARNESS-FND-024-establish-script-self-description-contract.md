---
id: 'KI-HARNESS-FND-024'
title: Establish a top-level script self-description contract
status: done
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

## Acceptance

### Delivered

Established and enforced the public top-level script self-description contract under `ki-skills`.

### Summary of changes

- Defined the required `Purpose:`, canonical `Run:`, and `Boundary:` header fields for public skill commands.
- Applied the header to the three current public scripts.
- Extended the existing SCRIPT-8 heuristic and added focused evidence tests.

### Verification

- Focused SCRIPT-8 evidence tests — 13 passing tests.
- `bun run test` — 216 passing tests.
- `bunx tsc --noEmit` — passed.
- `ki repo audit --skill ki-skills --repo .` — clean.
- `ki repo audit --skill ki-engineering --repo .` — clean.
- `ki repo audit --skill ki-roadmap --repo .` — clean.
- Evidence revision: `5293231a9bf91bed1aecc37d4bd1b4b52457e158`.

### Outstanding concerns

None. The heuristic checks stable structural facts; command necessity and header truth remain deliberate judgment review.

### Mini recap

Public script documentation belongs with skill quality when it describes capability ownership and mutation boundaries, rather than with the repository toolchain.

## Done

Established and verified the public script header contract and its proportionate SCRIPT-8 enforcement.

Residual concern: None.

Follow-up: Apply the existing rule naturally when a future public skill script is introduced.
