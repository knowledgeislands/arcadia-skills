---
id: TRD-91eae65a
title: "Adopt compositional repository ignores"
created_at: 2026-08-27T01:37:46Z
sender: knowledgeislands/ki-agentic-harness
receiver: knowledgeislands/tools-mgit
kind: work
source_ref: ADR-KI-HARNESS-013
observation: decision
phase: submitted
---

# TRD-91eae65a: Adopt compositional repository ignores

## Context

The harness now defines `ki-repo` as the sole `.gitignore` composer, with marker-bounded skill blocks, a terminal unmanaged section, and `reports/` reserved for disposable generated reports. Existing repository-specific rules remain visible for later fleet reconciliation.

## Submission

After adopting the compatible harness, run the complete declared repository CONFORM operation so `ki-repo` reconciles `.gitignore`. Configure any coverage producer to use `reports/coverage` and any generated test-artifact producer to use `reports/tests`; leave `dist/` at its build seam. Re-audit the complete declared skill set and run the repository's normal verification gates.

## Constraints

The receiver retains priority, implementation, review, and acceptance authority. Do not edit managed marker blocks by hand or add a second `.gitignore` writer. Remove generated output only after confirming it is untracked and reproducible. Preserve genuine repository-specific rules beneath the unmanaged header.
