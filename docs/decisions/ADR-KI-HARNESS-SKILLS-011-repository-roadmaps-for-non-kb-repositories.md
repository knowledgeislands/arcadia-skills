---
id: ADR-KI-HARNESS-SKILLS-011
title: 'Repository roadmaps for non-KB repositories'
date: 2026-07-16
status: current
decision_type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-SKILLS-011: Repository roadmaps for non-KB repositories

## Context

Non-KB repositories need one durable forward-work model without separate issue, plan, theme-roadmap, and projection records describing the same work.

Knowledge Bases already use their own Streams, Focus, proposals, and Checklist model through `ki-repo-kb-streams`.

## Decision

`ki-change-management-roadmap` governs one non-KB shape: flat canonical work items directly below `docs/roadmap/` and a concise root `ROADMAP.md` orientation.

Each item has a stable `<REPO>-<NNN>` identifier, a human-readable `theme`, horizon, lifecycle status, and dependency fields.

Theme remains an explicit grouping for related work, selection, and presentation; it does not create a directory hierarchy.

An item starts concise and is enriched in place with execution steps, verification, delegation, acceptance, and done evidence when needed.

`ki-plan` drives that lifecycle and never creates a second plan file.

The root orientation points to the canonical work-item directory and is not a second prose home or a duplicated queue; CLI tooling reports the items.

The replacement is direct.

There is no simple-profile exception, thematic profile, `plans/` directory, item locator, compatibility path, dual-write period, or fallback runner.

A Knowledge Base uses `ki-repo-kb-streams`, not repository roadmap artefacts.

## Consequences

- Every non-KB work item has one durable file and one stable identifier.
- Planning adds detail rather than a parallel document, making lifecycle state and context easy to read together.
- Theme retains useful project grouping without tying organisation to the filesystem.
- The concise root orientation keeps repository entry points clear while CLI reporting presents the live portfolio.
- Existing non-KB roadmap trees are cut over atomically; Git history remains the recovery mechanism.

## References

- [ADR-KI-HARNESS-SKILLS-003](ADR-KI-HARNESS-SKILLS-003-dependency-order-for-multi-skill-composition.md)
- [ADR-KI-HARNESS-SKILLS-006](ADR-KI-HARNESS-SKILLS-006-concern-first-skill-taxonomy-and-implication-graph.md)
