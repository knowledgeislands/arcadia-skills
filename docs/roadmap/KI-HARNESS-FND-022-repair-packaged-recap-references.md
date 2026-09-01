---
id: KI-HARNESS-FND-022
area: FND
title: Repair packaged recap references
theme: foundation-tooling
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Make every supported `ki-recap` projection able to reach the knowledge-promotion standard it requires.

## Context

The canonical `ki-recap` source links to `ki-authoring` through the harness's categorised `skills/change-management/` and `skills/governance/` tree. The active user installation at `~/.agents/skills/ki-recap` is a symlink to that canonical source, so resolving the real file preserves the link.

The generated `ki-plugins/knowledge-islands/skills/ki-recap` projection is flat. Its verbatim `../../governance/ki-authoring/` and `../../../governance/ki-authoring/` links resolve to paths that do not exist, preventing a packaged recap consumer from loading the required promotion procedure by following the documented references.

## Boundary

Do not hand-edit generated plugin projections, duplicate the full knowledge-promotion standard into `ki-recap`, or redesign every cross-skill dependency without evidence that the defect is broader. Preserve the separation between recap procedure and `ki-authoring`'s normative ownership.

## Shaping

Select a source-level reference or dependency form that works from the canonical harness, symlinked user activation, and flattened plugin projection. Add projection-focused verification so generation fails when a required Markdown reference becomes unreachable. Confirm whether the repair belongs wholly in harness skill authoring or also requires an approved `ki-plugins` generator change.

Promote to Next when the portable reference contract, affected projection boundary, and focused regression check are identified.

## Discussion

### Evidence boundary

The defect is not present in the current symlinked user activation when the link is resolved relative to the canonical file. It is directly reproducible in the flattened `ki-plugins` projection, so the work must distinguish activation styles rather than label every installed copy broken.

### Ownership

The harness owns the canonical skill relationship and portable skill-authoring contract. `ki-plugins` owns generated projection shape and must receive any required downstream change through its normal repository authority rather than an untracked manual repair.

### Candidate approaches

A named formal dependency, a projection-safe source reference, or generator-supported link materialisation may preserve single ownership. Shaping should reject any approach that silently copies normative prose and lets the two skills drift.
