---
id: KI-HARNESS-OPS-002
title: Reconcile the three memory-store defects
theme: operations
horizon: waiting-for
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Correct the known memory-store defects so the stored guidance has one trustworthy source of truth.

## Context

When project memory is writable, update its runtime-strategy reference and delete two superseded guidance records that have already been promoted.

## Boundary

Verify changes in the canonical memory directory and avoid speculative backend redesign unless a reproducible inconsistency remains.

## Discussion

### Return condition

Resume when the canonical memory directory is writable; any remaining backend concern must be supported by a reproducible inconsistency after the known records are corrected.
