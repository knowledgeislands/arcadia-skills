---
id: GDR-KI-HARNESS-003
title: 'Portable Git governance ownership'
date: 2026-07-27
status: current
decision_type_url: https://knowledgeislands.info/specifications/decision-records/gdr
decision_type: governance
---

# GDR-KI-HARNESS-003: Portable Git governance ownership

## Context

Knowledge Islands has established commit-message conventions, direct-main working where a repository permits it, and a tested stale Git-lock guard, but their policy was dispersed across repository orientation, hook prose, and a runtime-specific dotfiles standard.

`ki-repo` already owns repository configuration and GitHub settings, the harness owns hook payload layout, and `ki-repo-dotfiles-chezmoi` owns Claude Code settings registration. None of those boundaries owns portable commit discipline or the guard's Git-safety semantics.

## Decision

Knowledge Islands adopts `ki-git` as the sole owner of portable Git and commit policy.

- The `ki-git` standard owns Conventional Commit shape and vocabulary, branch-selection guidance, safe Git hygiene, and the semantic contract of the stale-lock guard.
- The harness continues to publish the hook source under `hooks/`; its test remains beside that executable payload. `ki-git` defines what the guard may do, not how a runtime installs it.
- `ki-repo-dotfiles-chezmoi` retains runtime-specific Claude Code settings registration. It does not own portable Git policy or install authority for `ki-git`.
- `ki-repo` retains repository and GitHub configuration, including each repository's branch-protection choice.
- `ki-git` begins as a guidance and standard surface only. It has no compatible native rubric, `.ki-config.toml` table, user-skill activation, or commit-message enforcement until that execution contract is deliberately designed.

## Consequences

- New repository guidance routes portable Git questions to one standard while retaining only its local operating deltas.
- The lock guard has one safety policy even though its payload and runtime binding remain in their specialised owners.
- Existing historic commit messages are evidence, not a migration target; Git history remains intact.
- Any future deterministic enforcement must be proposed against the `ki-git` standard rather than inferred from a hook or runtime binding.

## References

- [ADR-KI-HARNESS-010](ADR-KI-HARNESS-010-managed-hook-payloads-and-user-environment-binding.md) — compatible hook payload and runtime-binding boundary.
