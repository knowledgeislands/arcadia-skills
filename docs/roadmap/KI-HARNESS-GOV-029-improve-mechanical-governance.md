---
id: KI-HARNESS-GOV-029
title: Improve mechanical governance
theme: governance-consistency
horizon: now
status: ready
blocks: []
blocked-by: []
baseline-ref: null
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

- [ ] Define a compact measurement record: repeated operation, evidence source, frequency or repeated-call signal, current owner, token or time cost, deterministic input, and unsafe or judgment boundary.
- [ ] Gather current Harness and estate evidence without modifying skills, package scripts, repository configuration, or runtime settings.
- [ ] Classify each candidate as retain-as-judgment, improve diagnostic or prepared context, add a bounded mechanical check, or route to a separately owned proposal.
- [ ] For each proposed improvement, name its owning skill, fixture or test boundary, safe no-write failure mode, and a receiver-owned work record where implementation is non-trivial.
- [ ] Review the resulting shortlist against the boundary: no score, no automatic external write, and no compression that hides uncertainty.

## Files touched

This roadmap item only, containing the measurement evidence, classification, and routed follow-ups. The audit makes no direct automation change.

## Verify

- Every proposal cites a repeated measured signal rather than a one-off experience.
- Every proposal has one owner, a testable deterministic boundary, and a non-destructive failure mode.
- Judgmental concerns and external writes are explicitly excluded or routed separately.
- `ki repo audit --skill ki-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

This read-only assessment is independent. Proposed mechanical work is not started or accepted by its inclusion in the shortlist.

## Discussion

### Efficiency boundary

The success measure is more reliable progress with less repeated context, not maximal automation. A concise clear failure is more useful than a broad mechanism that hides uncertainty.
