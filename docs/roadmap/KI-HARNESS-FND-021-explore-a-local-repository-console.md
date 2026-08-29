---
id: KI-HARNESS-FND-021
title: Explore local repository console
area: FND
theme: foundation-tooling
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Determine whether an opt-in, locally served Knowledge Islands repository console has a useful portable shape, and name the ownership and evidence required before implementation.

## Context

Knowledge Islands repositories expose useful operational state through roadmaps, live artifacts, generated reports, trade topology, capability declarations, and CLI output. These surfaces remain individually useful but do not yet form one navigable local view of what a repository is and what is happening in it.

Three existing repositories provide different evidence. `kit-legal` has a canonical, repository-specific Command Centre backed by structured Markdown. Git Almanac produces an offline HTML report pack from structured Git projections. The IBC 2026 portal demonstrates a coherent interactive project dashboard whose source contract remains repository-local. The relevant question is not whether these interfaces can be copied, but whether a small portable console boundary can expose existing canonical state without becoming another source of truth.

## Boundary

Do not establish a central service, require an always-running daemon, select a frontend framework, or implement a console in this item. The first viable slice must be local-only and read-only. It must not edit roadmaps, trades, configuration, or knowledge records.

This exploration does not replace `ki-repo-kb-live-artifacts`, make the console a repository kind, or weaken the `ki-repo-website` boundary. Repository-specific panels and vocabulary remain owned by their source capabilities.

## Current state

- `kit-legal` derives operational views from canonical Command Centre item frontmatter and prohibits hand-maintained duplicate status tables.
- Git Almanac publishes an offline manifest, JSON datasets, HTML views, and generated assets with explicit repository and Git-ref provenance.
- IBC 2026 is a static-safe Vite application with repository-specific panels and versioned contract documents.
- `tools-ki` already resolves repository identity, registered capabilities, roadmap JSON, trade state, and projection health, but it does not expose a local browser shell.
- The Harness governs portable capability semantics; it does not own the public `ki` executable.

## Steps

- [ ] Inventory authoritative inputs and existing generators for a Project repository and a Knowledge Base.
- [ ] Compare `kit-legal`, Git Almanac, IBC 2026, KB Live Artifacts, and current website capability boundaries.
- [ ] Sketch the minimum common console and repository-specific panel model without choosing a frontend stack.
- [ ] Identify the portable capability owner, executable owner, opt-in declaration, and one-command local run experience.
- [ ] Define how projections expose provenance and staleness without becoming another source of truth.
- [ ] Name a bounded prototype and objective promotion evidence, or record why implementation should wait.

## Files touched

- `docs/roadmap/KI-HARNESS-FND-021-explore-a-local-repository-console.md`

## Verify

- Recheck each cited local surface against its canonical repository files.
- Confirm the conclusion preserves the Harness and `tools-ki` ownership boundary.
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

No dependency blocks the exploration. Any implementation follow-up that changes the public `ki` interface must be owned and prioritised in `tools-ki`.

## Documentation impact

### Decision Records

No Decision Record is required for the exploration. A later public console contract may require one in its executable owner.

### Specifications

No behaviour-level specification changes are authorised in this item.

### Guides

No guide changes are expected until an executable prototype exists.

### Roadmap

Retain the evidence and conclusion in this record. Create a receiver-owned implementation record only if the exploration establishes a bounded viable slice.

## Discussion

Use **repository console** as the generic working name. A repository may present its own surface as a Command Centre, dashboard, or report without making that vocabulary portable policy.
