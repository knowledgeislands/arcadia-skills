---
id: KI-HARNESS-FND-021
title: Explore local repository console
area: FND
theme: foundation-tooling
horizon: future
status: draft
candidate: true
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Shape an opt-in, locally served Knowledge Islands repository console that projects canonical repository state into coherent live views, beginning with a repository-specific Command Centre and roadmap.

## Context

Knowledge Islands repositories increasingly expose useful operational state through roadmaps, live artifacts, reports, generated SVGs, trade channels, capability declarations, and CLI output. These remain individually useful but do not yet form one navigable local view of what a repository is, what is happening in it, and which operational surfaces are available.

The `kit-legal` Command Centre supplies a concrete repository-specific concept. The Git Almanac demonstrates locally generated repository reporting, while the IBC 2026 portal demonstrates a richer project-local browser surface. The latter's editor is not proposed here; the relevant evidence is the coherent portal experience.

The existing `ki-repo-kb-live-artifacts` capability governs Markdown and rendered HTML pairs inside a Knowledge Base, and `ki-repo-website-app` governs repositories whose primary artifact is an interactive website. This candidate is different: it explores an optional local projection layer that any supported KI repository could adopt without changing its primary repository kind.

## Boundary

Do not establish a centralized service, require an always-running daemon, or make the console a new source of truth. The first slice is read-only and does not provide a repository editor or mutate roadmap, trade, configuration, or knowledge records.

Do not select React, Vite, Astro, another web stack, static generation, or a local-server architecture before the projection and extension boundaries are understood. Do not decide prematurely whether execution belongs in `ki`, `tools-ki`, a new tool repository, or a reusable package. Harness may own a portable capability contract while another repository owns execution.

## Shaping

### Conceptual surfaces

- **Repository console** — the opt-in local browser capability and navigation shell.
- **Command Centre** — the default landing surface, adapted to the repository's kind, purpose, and vocabulary.
- **Pinned views** — optional repository capabilities such as roadmap, trade topology, generated trade-channel SVGs, live artifacts, reports, health, and capability discovery.
- **Canonical projections** — read-only views derived from repository-owned records or existing tools, with provenance and refresh state visible.

The console should reuse generators and structured outputs that already exist rather than duplicate their logic in presentation components. A coherent view may also reveal where a reusable generator, data contract, or capability boundary should be extracted from an existing tool.

### Decisions still needed

Decide whether one universal shell with repository-kind modules is preferable to independently composed portals sharing a small projection contract. Define how a repository opts in, discovers available views, starts the console, refreshes derived information, and keeps generated assets out of conflict with canonical authored material.

Determine the minimum common Command Centre content across repository kinds and which naming and panels must remain repository-specific. Establish accessibility, offline operation, dependency installation, build-cache, and secret-handling expectations before choosing a runtime.

### Promotion conditions

Before promotion from Future:

- inventory the authoritative inputs and existing generators for at least a Project repository and a Knowledge Base;
- compare `kit-legal`, Git Almanac, the IBC 2026 portal, KB Live Artifacts, and current website capability boundaries as concrete evidence;
- sketch the default Command Centre and at least roadmap and trade-topology views without choosing a frontend stack;
- identify the portable capability owner, executable owner, opt-in declaration, and one-command local run experience;
- define how projections expose provenance and staleness without becoming another source of truth; and
- name one bounded prototype repository and the evidence that would make the console useful rather than a decorative duplicate of CLI output.

## Discussion

The working names are **repository console**, **local portal**, and **Command Centre**. Use **repository console** for the generic capability until evidence shows a better system name; allow the primary surface to use language natural to each repository.
