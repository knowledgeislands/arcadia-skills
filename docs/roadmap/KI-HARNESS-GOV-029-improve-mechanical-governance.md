---
id: KI-HARNESS-GOV-029
title: Improve mechanical governance
theme: governance-consistency
horizon: now
status: done
blocks: []
blocked-by: []
baseline-ref: 6a3097c9bac5e0e1c6e619356241a512bc96aecd
housekeeping-template: KI-HARNESS-HK-001
scheduled-for: 2026-08-09
---

## Goal

Increase safe mechanical verification and repair where evidence is deterministic, reducing repeated agent context and manual effort without automating judgment or destructive changes.

## Context

The Harness has a growing set of rubric checks, process boundaries, and generated publications. Some recurring work still consumes substantial agent context to rediscover stable facts, while other concerns are appropriately judgment-led and must remain so.

## Boundary

Do not manufacture scores, turn subjective quality into PASS/FAIL, make an external write automatic, or consolidate checks merely to reduce token use at the cost of evidence quality.

## Shaping

### Intended approach

Measure repeated evidence gathering and recurring manual checks, then identify the smallest safe improvements: shared prepared contexts, concise generated evidence, targeted mechanical criteria, or better stop diagnostics. Retain human review for wording, architecture, priorities, and repository-specific safety decisions.

### Promotion conditions

Promote when the candidate measurements distinguish a real repeated cost from a one-off task and each proposed automation has an owner, testable evidence boundary, and non-destructive failure mode.

## Current state

The Harness has measured recurring cost anecdotally through repeated audits, generated-rubric checks, transcript grounding, and estate sweeps, but no current evidence set separates repeatable mechanical work from one-off investigation or judgment-led review.

## Steps

- [x] Define a compact measurement record: repeated operation, evidence source, frequency or repeated-call signal, current owner, token or time cost, deterministic input, and unsafe or judgment boundary.
- [x] Gather current Harness and estate evidence without modifying skills, package scripts, repository configuration, or runtime settings.
- [x] Classify each candidate as retain-as-judgment, improve diagnostic or prepared context, add a bounded mechanical check, or route to a separately owned proposal.
- [x] For each proposed improvement, name its owning skill, fixture or test boundary, safe no-write failure mode, and a receiver-owned work record where implementation is non-trivial.
- [x] Review the resulting shortlist against the boundary: no score, no automatic external write, and no compression that hides uncertainty.

## Measurement

| Repeated operation | Evidence | Current owner | Deterministic input | Boundary | Disposition |
| --- | --- | --- | --- | --- | --- |
| Skill-quality and rubric publication checks | 46 skills, 36 generated rubric publications, and 76 rubric contexts in this Harness | `ki-skills` and each owning skill | Selected skill root and structured catalogue | Publication and mechanical checks cannot judge architecture or wording | Retain the prepared-context and generated-publication model; no new consolidator |
| Estate package-command assessment | 15 estate repositories and 11 package manifests | GOV-028 / repository owners | Regular `package.json` manifests | A key's purpose and side effect need repository judgment | Keep the separate read-only GOV-028 inventory; do not duplicate it here |
| Broad repository gates | 77 skill documents name a repository audit | Owning governance skill and `ki-engineering` | Selected declared skill and repository state | A clean command does not prove a content-safe fix | Retain scoped audit selection and one final full gate; no aggregate success score |
| Authorised multi-item delivery | `ki-batch` and `ki-agenda` require one durable authorisation and run ledger, but source search found only their exemplar | `ki-batch` / `ki-agenda` | Named ready records, scope, timebox, and explicit approval | Storage must not become a tracker, scheduler, or standing authority | Route [FND-013](KI-HARNESS-FND-013-persist-batch-authorisations.md) for a canonical no-write record contract and fixture boundary |

The current evidence supports one contract gap, not a new estate-wide measurement layer. The existing mechanical forms already preserve the important separation: deterministic input may produce focused evidence, while quality, prioritisation, content safety, and external change remain review decisions.

## Files touched

This roadmap item and the separately owned FND-013 follow-up. The audit makes no direct automation change.

## Verify

- Every proposal cites a repeated measured signal rather than a one-off experience.
- Every proposal has one owner, a testable deterministic boundary, and a non-destructive failure mode.
- Judgmental concerns and external writes are explicitly excluded or routed separately.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This read-only assessment is independent. Proposed mechanical work is not started or accepted by its inclusion in the shortlist.

## Review

### Delivered

Recorded the compact Harness and estate measurements, retained established prepared-context and scoped-gate practices, and routed the only concrete contract gap to FND-013.

### Summary of changes

The review adds evidence and a receiver-owned proposal only. It does not alter a skill, package command, configuration file, runtime setting, or another repository.

### Verification

- Static inventory: 46 skills, 36 generated rubric publications, 76 rubric contexts, 15 estate repositories, and 11 package manifests.
- `ki repo audit --skill ki-roadmap --repo .`, `ki repo audit --skill ki-authoring --repo .`, and `ki repo audit --skill ki-housekeeping --repo .` pass before review publication.

### Outstanding concerns

The current system has no repository-owned measurement of exact agent-token or elapsed-time cost. This review deliberately does not manufacture one from anecdote; FND-013 addresses the separate durable-authorisation gap exposed by the first intended agenda use.

### Post-change review

The shortlist preserves the boundary against quality scores, automatic external writes, and evidence compression. Existing GOV-028 retains package-command ownership; no duplicated inventory or generic dashboard was added.

### Mini recap

One source search was sufficient to establish the missing authorisation-record contract. Re-running broad audits would not have provided stronger evidence.

## Done

Accepted on 2026-08-09 by explicit user approval. The measured review is complete; FND-013 owns the one identified contract follow-up.

## Discussion

### Efficiency boundary

The success measure is more reliable progress with less repeated context, not maximal automation. A concise clear failure is more useful than a broad mechanism that hides uncertainty.
