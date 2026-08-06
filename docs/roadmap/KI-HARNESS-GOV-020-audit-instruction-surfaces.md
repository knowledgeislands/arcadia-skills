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

`ki-communication` defines `quiet`, `standard`, and `detailed`, with precedence from explicit current-thread requests through repository and user-wide instructions to the standard default. `ki-authoring` and `ki-repo` place portable repository guidance in `AGENTS.md` and runtime-specific detail in the matching runtime file.

This repository declares Claude Code and ChatGPT Codex support and carries root `AGENTS.md` plus a thin `CLAUDE.md` supplement. The user estate is managed through chezmoi and has both canonical source files and realised runtime copies. Their authority, load path, portability, duplication, and current alignment have not been assessed together.

## Steps

- [ ] Resolve the active runtime set and build a bounded inventory of canonical chezmoi sources, realised user-wide files, repository `AGENTS.md` / runtime supplements, and their explicit imports; classify each path by scope, authority, runtime, loadedness, and canonical-versus-derived status.
- [ ] Exclude settings, secrets, runtime memory, plugin and skill payloads, caches, and unrelated nested repository instructions; where load semantics cannot be proven from the file graph or authoritative runtime guidance, record `unverified` rather than infer that a candidate is active.
- [ ] Capture a pre-audit SHA-256 manifest for every in-scope local instruction file, then read the surfaces without invoking formatters, conformers, chezmoi apply, or any command that can write user or repository instructions.
- [ ] Assess each authoritative surface against portable placement, explicit `standard` communication level, current-thread → repository → user-wide → default precedence, compact routine progress and command-output guidance, and preservation of failures, safety concerns, approvals, irreversible actions, and material uncertainty.
- [ ] Compare canonical sources with realised copies and shared guidance with runtime supplements; identify contradictions, stale duplication, missing pointers, and runtime-only rules placed in shared Markdown without treating generated or managed copies as independent authorities.
- [ ] Record an `## Audit evidence` section in this roadmap item with the inventory and separate PASS / WARN / FAIL findings, followed by a distinct list of proposed remediations and the exact approval each would require; do not apply any proposal in this pass.
- [ ] Recompute the manifest and prove every instruction-surface hash is unchanged, then add the normal review packet for the audit result.

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
- **Checkpoint:** Return findings to the orchestrator; do not append to the roadmap item directly.

### Worker: claude-user-surface

- **Deliverable:** Inventory and criterion outcomes for the canonical Claude user source, realised `~/.claude/CLAUDE.md`, and its explicit instruction-topic imports only.
- **Files:** Read-only paths under the named chezmoi Claude source and realised `~/.claude/` instruction surfaces; exclude settings, plugins, skills, memory, and secrets.
- **Definition of done:** Shared preferences and Claude-only mechanics are distinguished, and source/realised drift is reported without repair.
- **Checkpoint:** Return findings to the orchestrator; do not run chezmoi or edit any source or realised file.

### Worker: repository-surface

- **Deliverable:** Inventory and criterion outcomes for this repository's `AGENTS.md`, `CLAUDE.md`, runtime declaration, and explicit tracked imports.
- **Files:** Read-only `.ki-config.toml`, `AGENTS.md`, `CLAUDE.md`, and explicit imports in this repository.
- **Definition of done:** Portable placement, thin runtime supplementation, precedence, level, progress, output, and failure-preservation criteria are each evidenced.
- **Checkpoint:** Return findings to the orchestrator; do not change repository instructions.

### Escalate

- Stop if proving loadedness would require reading secrets, runtime history, memory, or an unbounded cache/plugin tree.
- Stop before changing any instruction, chezmoi source, realised copy, runtime setting, or shared standard, even when the correction appears mechanical.
- Escalate contradictions that require choosing a policy owner, changing the communication contract, or overriding an explicit current-thread request.

## Discussion

### Source

This item adopts [TRD-5875ee10](../../+/_TRADES/knowledgeislands/tools-ki/TRD-5875ee10.md).
