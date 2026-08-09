---
id: KI-HARNESS-008
title: Make runtime coverage conformable
theme: governance-consistency
horizon: future
status: draft
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Let a repository that has declared a supported runtime converge to the required runtime-governance configuration through one deterministic `ki repo conform` run.

## Context

`ki repo audit` correctly detects when a runtime declared in `supported_runtimes` lacks its required repository skill tables and managed runtime-discovery links. At present, the failure requires a user or agent to interpret the finding and run one `ki repo skill add <skill>` command for each missing capability. This is deterministic information already held by the runtime-coverage contract, so the repair should be mechanically conformable rather than a manual diagnosis step.

The contract must distinguish repository-owned projections — shared `AGENTS.md`, the Claude `CLAUDE.md` appendix, and managed skill-discovery links — from user-owned runtime settings. It should reconcile only the declared, deterministic repository projections; `.claude/settings.json` and other personal configuration remain outside its scope.

## Boundary

Do not infer or add supported runtimes, globally install user skills, or modify unmanaged runtime configuration. Do not weaken the read-only audit boundary or conceal an unresolved runtime-to-skill mapping.

## Discussion

### Intended repair contract

For every explicitly declared supported runtime, `ki repo conform` should resolve the canonical required capability set and reconcile only missing repository-owned declarations and managed discovery links. The operation must use the same ownership, containment, compatibility, and trust checks as `ki repo skill add`, remain idempotent, and report each proposed action in `--dry-run` mode.

### Audit and conform boundary

AUDIT remains read-only and continues to report runtime coverage defects precisely. CONFORM should repair only a proven mapping from a declared runtime to its required capabilities; missing, ambiguous, incompatible, or untrusted capability sources remain explicit failures rather than guesses.

### Verification shape

Add fixtures covering a repository with both Claude Code and Codex declared, absent runtime-specific declarations and links, a dry-run that proposes the exact additions, and an apply run that converges to a clean audit. Repeat CONFORM to prove that the result is byte-stable and that existing unrelated declarations and unmanaged runtime files are preserved.

### Alternative considered

Improving the audit message with copyable `ki repo skill add` commands would make recovery clearer but retains an avoidable manual and partially-completable workflow. A single CONFORM repair is preferable because the runtime contract already supplies the required evidence and the CLI can apply the existing managed-link safeguards consistently.
