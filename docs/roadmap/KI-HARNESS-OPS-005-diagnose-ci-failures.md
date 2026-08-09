---
id: KI-HARNESS-OPS-005
title: Diagnose CI failures
theme: operations
horizon: now
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 5acfd5e208230fbc87dbd91fefc4e62eed32b76a
---

## Goal

Identify the recurring GitHub CI failures, their actual causes, and the repository-owned fixes needed to make CI a trustworthy delivery signal.

## Context

GitHub CI continues to report errors despite locally clean or newly migrated work. Without a current failure inventory, the estate cannot distinguish flaky infrastructure, stale workflow assumptions, environment drift, and genuine contract failures.

## Boundary

Do not change workflows, secrets, branch settings, or remote repositories merely to make a check green. Diagnose from the current failing runs first, preserve evidence, and route each repair to its owning repository.

## Current state

The failures are reported as a recurring operational issue, but the affected workflows, repository set, failure signatures, and relationship to local gates have not yet been captured in one current record.

## Steps

- [ ] Collect the current failing GitHub workflow runs, check names, timestamps, logs, and affected repositories without changing remote state.
- [ ] Classify each failure as deterministic repository defect, stale workflow contract, credential or environment issue, dependency or service failure, or flake with supporting evidence.
- [ ] Compare each deterministic failure with the corresponding local command and current standards to identify the owning repair boundary.
- [ ] Create or link receiver-owned follow-up work for every non-trivial fix; do not centralise peer changes in this item.
- [ ] Define the smallest recurrent CI health report or verification improvement justified by the evidence.

## Files touched

This record, any Harness CI diagnostic guidance justified by the findings, and separately owned follow-up records. No workflow or remote configuration change is presumed.

## Verify

Every listed failure has a linked run, classification, evidence, and owning next action or an explicit explanation of why it is external or flaky. Re-running the corresponding local command confirms the diagnosis where that is possible.

## Dependencies / blocks

This work can begin read-only. A repair may depend on repository-owner authority, secrets access, or an external service, but diagnosis does not.

## Discussion

### Diagnosis before repair

The first deliverable is a reliable map of what is failing. A green rerun without a cause does not close the operational problem.
