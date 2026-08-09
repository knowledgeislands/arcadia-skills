---
id: KI-HARNESS-GOV-020
title: Audit instruction surfaces
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked-by: []
baseline-ref: 9b0ae2145648782ede1ba187141a618675df8dae
---

## Goal

Assess durable AI instruction surfaces against the portable communication and precedence model before proposing any change.

## Context

User-wide, repository-level, and runtime-specific instruction files may diverge as communication governance evolves. An evidence-led read-only audit is needed before any user-owned surface changes.

## Boundary

Do not change user-wide or repository instruction files without explicit approval, or collapse runtime-specific guidance into shared portable instructions.

## Current state

`ki-communication` defines `quiet`, `standard`, and `detailed`, with precedence from explicit current-thread requests through repository and user-wide instructions to the standard default. `ki-authoring` and `ki-repo` place portable repository guidance in `AGENTS.md` and runtime-specific detail in the matching runtime file.

This repository declares Claude Code and ChatGPT Codex support and carries root `AGENTS.md` plus a thin `CLAUDE.md` supplement. The user estate is managed through chezmoi and has both canonical source files and realised runtime copies. Their authority, load path, portability, duplication, and current alignment have not been assessed together.

## Steps

- [x] Resolve the active runtime set and build a bounded inventory of canonical chezmoi sources, realised user-wide files, repository `AGENTS.md` / runtime supplements, and their explicit imports; classify each path by scope, authority, runtime, loadedness, and canonical-versus-derived status.
- [x] Exclude settings, secrets, runtime memory, plugin and skill payloads, caches, and unrelated nested repository instructions; where load semantics cannot be proven from the file graph or authoritative runtime guidance, record `unverified` rather than infer that a candidate is active.
- [x] Capture a pre-audit SHA-256 manifest for every in-scope local instruction file, then read the surfaces without invoking formatters, conformers, chezmoi apply, or any command that can write user or repository instructions.
- [x] Assess each authoritative surface against portable placement, explicit `standard` communication level, current-thread → repository → user-wide → default precedence, compact routine progress and command-output guidance, and preservation of failures, safety concerns, approvals, irreversible actions, and material uncertainty.
- [x] Compare canonical sources with realised copies and shared guidance with runtime supplements; identify contradictions, stale duplication, missing pointers, and runtime-only rules placed in shared Markdown without treating generated or managed copies as independent authorities.
- [x] Record an `## Audit evidence` section in this roadmap item with the inventory and separate PASS / WARN / FAIL findings, followed by a distinct list of proposed remediations and the exact approval each would require; do not apply any proposal in this pass.
- [x] Recompute the manifest and prove every instruction-surface hash is unchanged, then add the normal review packet for the audit result.

## Files touched

- **Writable output:** this roadmap item only, for checklist state, audit evidence, and the review packet.
- **Read-only user evidence:** canonical instruction sources under `/Users/krisbrown/.local/share/chezmoi/dot_codex/` and `dot_claude/`, their realised `/Users/krisbrown/.codex/` and `/Users/krisbrown/.claude/` instruction files, and only the topic files they explicitly import.
- **Read-only repository evidence:** `.ki-config.toml`, `AGENTS.md`, `CLAUDE.md`, and only tracked instruction files they explicitly import.
- **Read-only external evidence:** authoritative runtime documentation needed solely to establish whether a candidate surface is loaded and how precedence works.

## Verify

- Every inventory entry records physical path, scope, runtime, authority, loadedness or `unverified`, canonical/derived relationship, and pre/post SHA-256.
- Every in-scope surface has a PASS / WARN / FAIL outcome for each applicable audit criterion, with concise file-and-location evidence and no secret-bearing content reproduced.
- Findings and proposed remediations are separate; each remediation names its canonical owner and required approval.
- Pre/post hashes match for all user-wide and repository instruction surfaces; only this roadmap item appears in the task-owned write set.
- No formatter, `ki repo conform`, `chezmoi apply`, instruction-file patch, runtime-setting mutation, commit, or push occurs during the audit.

## Dependencies / blocks

The audit is independently executable and requires no instruction-file write authority. Unproven runtime load semantics are reported as uncertainty rather than resolved by inspecting secret-bearing configuration.

Any remediation, including a change to canonical chezmoi sources, realised user files, repository instructions, or shared governance, requires a separately reviewed proposal and explicit user authority after this audit is accepted.

## Delegation

### Locked decisions

- The first pass is read-only for every instruction surface; the roadmap record is the sole writable evidence carrier.
- Canonical managed sources and realised runtime copies are inventoried separately but are not treated as two independent policy owners.
- Portable guidance belongs in shared `AGENTS.md`; runtime files retain only genuinely runtime-specific detail.
- The audit uses the portable precedence and communication-level contract as written and does not convert a current-thread preference into durable policy.

### Rounds

- Round 1: the orchestrator resolves scope and captures the pre-audit hash manifest.
- Round 2: `codex-user-surface`, `claude-user-surface`, and `repository-surface` run independent read-only reviews and return structured findings without editing files.
- Integration gate: the orchestrator reconciles cross-scope contradictions, records the evidence and proposed remediations separately, verifies hashes, and owns the final review packet.

### Worker: codex-user-surface

- **Deliverable:** Inventory and criterion outcomes for the canonical Codex user source, realised `~/.codex/AGENTS.md`, `~/.codex/instructions.md` if proven active, and explicit imports only.
- **Files:** Read-only paths under the named chezmoi Codex source and realised `~/.codex/` instruction surfaces; exclude plugins, skills, caches, memory, configuration, and secrets.
- **Definition of done:** Every candidate is classified as active or `unverified`, canonical or derived, and assessed without a write.
- **Model:** high-reasoning — loadedness and precedence inference from indirect evidence.
- **Verify:** Orchestrator re-reads each cited path and confirms every `unverified` classification is genuinely unprovable rather than unexamined.
- **Checkpoint:** Return findings to the orchestrator; do not append to the roadmap item directly.

### Worker: claude-user-surface

- **Deliverable:** Inventory and criterion outcomes for the canonical Claude user source, realised `~/.claude/CLAUDE.md`, and its explicit instruction-topic imports only.
- **Files:** Read-only paths under the named chezmoi Claude source and realised `~/.claude/` instruction surfaces; exclude settings, plugins, skills, memory, and secrets.
- **Definition of done:** Shared preferences and Claude-only mechanics are distinguished, and source/realised drift is reported without repair.
- **Model:** high-reasoning — the shared-versus-runtime-specific split is a judgment call, not a lookup.
- **Verify:** Orchestrator confirms each reported drift against both the chezmoi source and the realised copy before any repair is scheduled.
- **Checkpoint:** Return findings to the orchestrator; do not run chezmoi or edit any source or realised file.

### Worker: repository-surface

- **Deliverable:** Inventory and criterion outcomes for this repository's `AGENTS.md`, `CLAUDE.md`, runtime declaration, and explicit tracked imports.
- **Files:** Read-only `.ki-config.toml`, `AGENTS.md`, `CLAUDE.md`, and explicit imports in this repository.
- **Definition of done:** Portable placement, thin runtime supplementation, precedence, level, progress, output, and failure-preservation criteria are each evidenced.
- **Model:** balanced — a bounded, tracked file set assessed against an enumerated criterion list.
- **Verify:** Orchestrator checks each criterion outcome against the cited line in the tracked file rather than the worker's summary.
- **Checkpoint:** Return findings to the orchestrator; do not change repository instructions.

### Escalate

- Stop if proving loadedness would require reading secrets, runtime history, memory, or an unbounded cache/plugin tree.
- Stop before changing any instruction, chezmoi source, realised copy, runtime setting, or shared standard, even when the correction appears mechanical.
- Escalate contradictions that require choosing a policy owner, changing the communication contract, or overriding an explicit current-thread request.

## Audit evidence

### Scope and manifest

- PASS — active repository runtimes: Claude Code and ChatGPT Codex, declared in `.ki-config.toml`; `AGENTS.md` is shared repository authority and `CLAUDE.md` explicitly imports it as a Claude supplement.
- PASS — Codex canonical source `/Users/krisbrown/.local/share/chezmoi/dot_codex/private_AGENTS.md` and realised `/Users/krisbrown/.codex/AGENTS.md` are byte-identical: `cdda4e77ebb00541838736a332b0b513b18bc51495777ac0d2ffae0a22f6bb58`.
- WARN — `/Users/krisbrown/.codex/instructions.md` has hash `2c383dc9c90fe36409ba6560017228d5520fc6150707282ec5014f7cc806f32b`, but no allowed-surface import proves it active; it is `unverified`, not a second authority.
- PASS — Claude canonical root and realised root are byte-identical: `/Users/krisbrown/.local/share/chezmoi/dot_claude/private_CLAUDE.md` → `/Users/krisbrown/.claude/CLAUDE.md`, `8db82e1f1c4546fcb1e957c35713b9a53285fe5fd65a80607735f129b54c2ae1`.
- PASS — explicitly imported Claude Markdown and workflow topics are byte-identical: `f0b608a1b4e23d4a8fff90f16128e05d5b9e870b64c2b6f4c841a5603f8c0dca` and `044321c8541cb6840c47c542ed4d82c2251d3dff47dde80ec6564d60f74c75ae`, respectively.
- PASS — tracked repository hashes are unchanged: `AGENTS.md` `49e09e708f53c6ca8eef6c2655aa90e4880e9b269a6b109c649beec28ad6191b`, `CLAUDE.md` `2a0b3fac1332558a766dfbc2b95e67c6d4d6a8f89066f004cf87422a9308d382`, `.ki-config.toml` `c41fe627ac2a74b37b9fa9e21715eaf822e139bbeb981de276eb56a868d33e2c`.

Settings, secrets, memory, plugins, skills, caches, and unrelated nested instructions were excluded. Codex user `AGENTS.md` is observed active in this session; other runtime loadedness is `unverified` unless the explicit import graph proves it.

### Findings

- PASS — portable placement. The personal Codex source assigns cross-project preferences to itself and project detail to repository `AGENTS.md`; the Claude root is runtime-specific; repository `AGENTS.md` is the shared orientation.
- PASS — current-thread → repository → user-wide → default precedence and the `standard` communication level are explicit in the active personal Codex authority.
- PASS — user and repository guidance preserves safety, explicit-path commits, failures, decisions, and material risk.
- WARN — no in-scope user or repository surface names a general uncertainty-reporting or approval/authority boundary. Existing safety rules are strong but implicit here.
- WARN — neither runtime-specific user topic supplies a general progress/output contract; the active personal Codex source is concise but does not say when interim progress is required.
- WARN — repository `CLAUDE.md` is a Claude supplement but includes a Codex path sentence. This is stale cross-runtime duplication, not a functional contradiction.
- WARN — repository instructions do not point to the shared precedence/communication contract. The contract is active through the personal Codex surface, but the repository-local relationship is not discoverable in the tracked orientation.

### Proposed remediations

- User-managed communication policy — propose explicit uncertainty, authority, and interim-progress wording in the canonical chezmoi Codex source, then review `chezmoi diff` before any apply. Requires the user's explicit approval for a user-wide policy change.
- Harness repository orientation — propose a thin pointer to the shared communication/precedence contract and remove the Codex-specific sentence from `CLAUDE.md` if the source of truth is confirmed. Requires a separately reviewed Harness record and explicit approval.
- Codex `instructions.md` — first establish loadedness from authoritative runtime documentation or a bounded runtime experiment. No edit is proposed while it remains `unverified`.

No instruction surface, formatter, conformer, `chezmoi apply`, runtime setting, or remote state changed during evidence collection. The lifecycle and evidence commits affect this roadmap record only.

## Review

### Delivered

A read-only, bounded instruction-surface inventory with source-to-realised integrity evidence, explicit uncertainty labels, and separated remediation proposals.

### Summary of changes

Only this roadmap record records the audit. No user instruction, repository instruction, runtime configuration, or external state was edited.

### Verification

- PASS — pre/post SHA-256 manifests match for every included source, realised copy, and repository surface.
- PASS — active runtime declarations and every explicit import were re-read; unproven loadedness is labelled `unverified`.
- PASS — the working tree's only task-owned changes are this record's lifecycle and evidence updates.

### Outstanding concerns

The three proposed remediation areas require their named authority. No audit evidence establishes whether the legacy Codex `instructions.md` is loaded.

### Post-change review

Confirm that future remediation preserves the user-wide/repository/runtime layering without duplicating the communication contract across every surface.

### Mini recap

The audit preserved the distinction between canonical managed sources, realised copies, and runtime candidates; byte identity is evidence of synchronisation, not a second policy owner.

## Done

Accepted by the user on 2026-08-09. Retained until explicitly selected for pruning.

## Discussion

### Source

This item adopts `TRD-5875ee10`.
