---
id: KI-HARNESS-RTP-011
title: Review runtime binding drift
area: RTP
theme: runtime-portability
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Discuss whether the observed Claude Desktop and Codex binding differences are intended runtime-local choices or drift that should be reconciled.

## Context

The 2026-09-04 estate audit passed all declared harness skills except for two warnings. `ki-binding-claude` reported that Claude Desktop did not match the targeted full non-secret definition while Claude Code did, and `ki-binding-codex` reported a non-secret TOML difference in the Codex configuration. Repository-local conformance proposed no deterministic changes.

## Boundary

This record captures audit evidence for discussion only. It is not an accepted decision, priority assignment, implementation authorisation, or permission to alter user-level runtime configuration. Any change must first inspect the exact non-secret diff and confirm whether each runtime is intended to share the portable binding inventory.

## Shaping

Compare each runtime-native configuration with the canonical binding inventory, classify deliberate client-specific representation separately from missing or stale registrations, and prepare an exact reversible proposal. Keep credentials, tokens, and other secrets outside roadmap evidence.

## Discussion

The relevant focused audits are `ki repo audit --skill ki-binding-claude --repo .` and `ki repo audit --skill ki-binding-codex --repo .`. Review should decide whether to retain, reconcile, or explicitly document each difference before any conform operation targets user configuration.
