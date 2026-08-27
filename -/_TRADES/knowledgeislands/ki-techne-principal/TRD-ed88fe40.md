---
id: TRD-ed88fe40
title: "Adopt compositional repository ignores"
created_at: 2026-08-27T01:37:46Z
sender: knowledgeislands/ki-agentic-harness
receiver: knowledgeislands/ki-techne-principal
kind: work
source_ref: ADR-KI-HARNESS-013
observation: decision
phase: submitted
---

# TRD-ed88fe40: Adopt compositional repository ignores

## Context

The harness now defines `ki-repo` as the sole `.gitignore` composer, with marker-bounded skill blocks, a terminal unmanaged section, and `reports/` reserved for disposable generated reports. Existing repository-specific rules remain visible for later fleet reconciliation.

## Submission

After adopting the compatible harness, run the complete declared repository CONFORM operation so `ki-repo` reconciles `.gitignore`. Preserve genuine repository-specific rules beneath the unmanaged header and remove retired `.ki/audits/` or `.ki/conform/` ignore rules. Re-audit the complete declared skill set.

## Constraints

The receiver retains priority, implementation, review, and acceptance authority. Do not edit managed marker blocks by hand or add a second `.gitignore` writer. If a physical `.ki` tree appears, remove it only through the fail-closed proof for wholly untracked retired audit/conform output.
