---
id: KI-HARNESS-GOV-009
title: Make runtime coverage conformable
area: GOV
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let a repository that has declared a supported runtime converge to the required runtime-governance configuration through one deterministic `ki repo conform` run.

## Context

`ki repo audit` correctly detects when a runtime declared in `supported_runtimes` lacks its required repository skill tables and managed runtime-discovery links. At present, the failure requires a user or agent to interpret the finding and run one `ki repo skill add <skill>` command for each missing capability. This is deterministic information already held by the runtime-coverage contract, so the repair should be mechanically conformable rather than a manual diagnosis step.

The contract must distinguish repository-owned projections — shared `AGENTS.md`, the Claude `CLAUDE.md` appendix, and managed skill-discovery links — from user-owned runtime settings. It should reconcile only the declared, deterministic repository projections; `.claude/settings.json` and other personal configuration remain outside its scope.

## Boundary

Do not infer or add supported runtimes, globally install user skills, or modify unmanaged runtime configuration. Do not weaken the read-only audit boundary or conceal an unresolved runtime-to-skill mapping.

## Current state

The Harness's `ki-repo` runtime rubric already derives the required portable and runtime-specific skill tables from a repository's declared `supported_runtimes`, then reports every missing table as `RUNTIMES-2`. Managed runtime-discovery links are created safely by the existing `ki repo skill add` path.

The current recovery remains manually decomposed: a maintainer must interpret the audit finding and invoke the add command for each missing capability. The `ki repo conform` executor does not yet consume the same deterministic mapping, and the Harness must not implement that executor or write a peer repository's configuration.

## Steps

- [ ] Reconcile the Harness runtime-coverage contract, its `RUNTIMES-2` evidence, and the existing `ki repo skill add` safeguards into one precise receiver-facing conform proposal; list the recognised runtimes, required capabilities, and repository-owned projections it may repair.
- [ ] Prepare a `tools-ki` receiver-owned implementation proposal for `ki repo conform`, including shared resolver reuse, containment, ownership, compatibility, and trust checks; do not infer acceptance or edit the receiving repository.
- [ ] Specify the dry-run and apply transaction behaviour: report each exact proposed table or managed-link addition, make no user-configuration write, fail closed on missing or ambiguous mappings, and leave unrelated declarations and unmanaged runtime files byte-preserved.
- [ ] Define focused two-runtime fixtures for missing declarations and links, dry-run output, successful convergence, a repeated byte-stable conform run, and rejected ambiguous, incompatible, untrusted, or out-of-scope cases.
- [ ] Record the receiving disposition and any named park in this item; only an accepted `tools-ki` record may implement the CLI change and run its repository-local verification.

## Files touched

- This work item, containing the runtime-coverage mapping and the receiver-facing implementation proposal

No `tools-ki` source, repository configuration, managed discovery link, or user-owned runtime setting changes in this item.

## Verify

- The proposal maps every recognised declared runtime to its exact required capabilities and identifies the existing audit and `ki repo skill add` evidence it reuses.
- Each proposed CONFORM action is limited to declared repository-owned tables and managed discovery links; unsupported, missing, ambiguous, incompatible, or untrusted sources are explicit failures.
- The fixture plan proves dry-run non-mutation, apply convergence, repeat idempotence, and preservation of unrelated declarations and unmanaged runtime files.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The runtime-coverage mapping and the `ki repo skill add` safety checks already exist as Harness evidence. The actual `ki repo conform` executor and its CLI fixtures belong to `tools-ki`; no implementation may start until that repository confirms a receiver-owned record and scope.

## Discussion

### Why Next, not Soon

The required mapping, ownership boundary, failure mode, and verification shape are already concrete. A Soon shaping stage would duplicate the focused reconciliation and receiver proposal defined here, so the item can be prepared directly in Next while retaining the receiving repository's independent priority and acceptance decision.

### Local and user-owned state

The deterministic repair must reconcile only a repository's declared governance tables and managed runtime-discovery links. User settings, global skill installation, machine-local state, and unmanaged runtime configuration remain outside its authority even when they sit beside a supported runtime surface.

### Intended repair contract

For every explicitly declared supported runtime, `ki repo conform` should resolve the canonical required capability set and reconcile only missing repository-owned declarations and managed discovery links. The operation must use the same ownership, containment, compatibility, and trust checks as `ki repo skill add`, remain idempotent, and report each proposed action in `--dry-run` mode.

### Audit and conform boundary

AUDIT remains read-only and continues to report runtime coverage defects precisely. CONFORM should repair only a proven mapping from a declared runtime to its required capabilities; missing, ambiguous, incompatible, or untrusted capability sources remain explicit failures rather than guesses.

### Verification shape

Add fixtures covering a repository with both Claude Code and Codex declared, absent runtime-specific declarations and links, a dry-run that proposes the exact additions, and an apply run that converges to a clean audit. Repeat CONFORM to prove that the result is byte-stable and that existing unrelated declarations and unmanaged runtime files are preserved.

### Alternative considered

Improving the audit message with copyable `ki repo skill add` commands would make recovery clearer but retains an avoidable manual and partially-completable workflow. A single CONFORM repair is preferable because the runtime contract already supplies the required evidence and the CLI can apply the existing managed-link safeguards consistently.
