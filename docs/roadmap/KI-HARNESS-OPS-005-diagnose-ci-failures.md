---
id: KI-HARNESS-OPS-005
title: Diagnose CI failures
theme: operations
horizon: now
status: done
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

- [x] Collect the current failing GitHub workflow runs, check names, timestamps, logs, and affected repositories without changing remote state.
- [x] Classify each failure as deterministic repository defect, stale workflow contract, credential or environment issue, dependency or service failure, or flake with supporting evidence.
- [x] Compare each deterministic failure with the corresponding local command and current standards to identify the owning repair boundary.
- [x] Create or link receiver-owned follow-up work for every non-trivial fix; do not centralise peer changes in this item.
- [x] Define the smallest recurrent CI health report or verification improvement justified by the evidence.

## Files touched

This record, any Harness CI diagnostic guidance justified by the findings, and separately owned follow-up records. No workflow or remote configuration change is presumed.

## Verify

Every listed failure has a linked run, classification, evidence, and owning next action or an explicit explanation of why it is external or flaky. Re-running the corresponding local command confirms the diagnosis where that is possible.

## Dependencies / blocks

This work can begin read-only. A repair may depend on repository-owner authority, secrets access, or an external service, but diagnosis does not.

## Audit evidence

### Inventory

- FAIL — [run 31301952513](https://github.com/knowledgeislands/ki-agentic-harness/actions/runs/31301952513), push to `main` at `16714084d4bd3570a088d3b9b7ddb3391415fb61`, 2026-08-09 07:47 UTC. The sole `verify` job completed checkout, mise setup, frozen install, released-KI installation, and Audit; its Test step failed.
- FAIL — [run 31269013961](https://github.com/knowledgeislands/ki-agentic-harness/actions/runs/31269013961), push to `main` at `96771f0957896f08159a2d8d3d1c482a2f2aa4c7`, 2026-08-08 17:16 UTC. It has the same successful steps and failed Test step.
- WARN — the runner reports that Actions now force `actions/checkout@v4` from Node 20 to Node 24. It is advisory and occurs after the test failure; it is not the cause of this incident.

### Classification

- FAIL — deterministic Harness repository defect. The failed assertion is `trade records are normalized like any other authored Markdown` in `skills/governance/ki-authoring/scripts/rubric/items/index.test.ts:122`: the CI runner receives `-/_TRADES/...` before the `+/_TRADES/...` paths, while the assertion requires the reverse.
- PASS — no credential, installation, dependency, or service failure was observed. The audited released KI installation and the native Audit step both completed before Test.
- PASS — `bun run test` is clean in the current local checkout. The failure is filesystem enumeration-sensitive: `markdownFiles()` consumes unsorted `readdirSync()` entries, so a local filesystem may happen to satisfy the test's fixed sequence while an Actions runner does not.

### Proposed remediations

- `KI-HARNESS-OPS-006` — Harness-owned source repair: sort collected Markdown evidence paths (or otherwise assert order independently) and verify on a new CI run. It needs its own ready plan and implementation approval; this diagnosis does not modify source or workflow configuration.
- No workflow, secret, runner, dependency, or peer-repository remediation is proposed from this evidence.

### Smallest health improvement

The smallest justified improvement is the deterministic authoring test/evidence repair in `KI-HARNESS-OPS-006`. A separate CI health report is not yet justified: the sole recurrent signature is already a precise, reproducible Test failure and the workflow exposes the required step-level evidence.

## Review

### Delivered

A current GitHub Actions failure inventory, classification, and owning follow-up record for the recurring Harness CI failure.

### Summary of changes

Diagnostic evidence only: this item changed no workflow, remote setting, secret, or source file. `KI-HARNESS-OPS-006` holds the proposed local repair.

### Verification

- Read-only GitHub inspection — the latest and an earlier recurring run have the same completed setup and Audit steps, then fail only Test.
- Log evidence — the failed assertion differs solely in valid Markdown file enumeration order.
- Local comparison — `bun run test` passes in the current checkout, confirming the test is environment-order-sensitive rather than a broad dependency or service failure.

### Outstanding concerns

Remote CI remains red until the separately reviewed OPS-006 repair lands and an Actions run verifies it. The Actions Node 20-to-24 warning is advisory and unowned by this diagnosis.

### Post-change review

Confirm OPS-006 sorts or otherwise makes evidence order-independent without narrowing frontmatter coverage.

### Mini recap

The diagnosis stayed read-only against GitHub and created one local follow-up record; no repair was conflated with evidence collection.

## Done

Accepted by the user on 2026-08-09. Retained until explicitly selected for pruning.

## Discussion

### Diagnosis before repair

The first deliverable is a reliable map of what is failing. A green rerun without a cause does not close the operational problem.
