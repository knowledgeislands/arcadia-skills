---
id: KI-HARNESS-FND-021
title: Explore local repository console
area: FND
theme: foundation-tooling
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 7a17aca903e44ea15a68f91820e028bc7149dbaa
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

- [x] Inventory authoritative inputs and existing generators for a Project repository and a Knowledge Base.
- [x] Compare `kit-legal`, Git Almanac, IBC 2026, KB Live Artifacts, and current website capability boundaries.
- [x] Sketch the minimum common console and repository-specific panel model without choosing a frontend stack.
- [x] Identify the portable capability owner, executable owner, opt-in declaration, and one-command local run experience.
- [x] Define how projections expose provenance and staleness without becoming another source of truth.
- [x] Name a bounded prototype and objective promotion evidence, or record why implementation should wait.

## Files touched

- `docs/roadmap/KI-HARNESS-FND-021-explore-a-local-repository-console.md`

## Verify

- Recheck each cited local surface against its canonical repository files.
- Confirm the conclusion preserves the Harness and `tools-ki` ownership boundary.
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

No dependency blocks the exploration. Any implementation follow-up that changes the public `ki` interface must be owned and prioritised in `tools-ki`.

## Outcome

Retain the repository console as a shaped concept, but do not create a capability or implementation record yet. The evidence establishes a useful boundary, not a sufficiently common product.

The three mature surfaces solve different problems:

- `kit-legal` projects one repository-specific operational schema into a Live Artifact and deliberately keeps canonical status in Markdown frontmatter.
- Git Almanac emits a self-contained report pack with a manifest, structured datasets, generated views, source repository identity, selected Git ref, and generation time.
- IBC 2026 is a purpose-built continuous dashboard over repository-specific contracts and panels.

A portable console would therefore need a very small shell: repository identity, source provenance, generation or refresh status, and links to capability-provided projections. Roadmap, trade, health, and report panels would remain independent typed projections; the shell must not scrape prose, reinterpret status, or write derived state back to source records. Repository-specific vocabulary and panels would remain extensions rather than mandatory universal views.

If implementation becomes justified, the candidate ownership split is:

- `tools-ki` owns the public executable and local loopback server because it already resolves repository identity, capabilities, roadmap JSON, trade state, and projection health;
- the Harness owns portable projection semantics only after executable evidence proves a reusable contract;
- a repository opts in explicitly rather than acquiring a console from its primary kind; and
- the candidate one-command experience is `ki repo console --repo .`, bound to loopback and read-only by default.

These are design constraints, not an adopted command or configuration contract. Promote implementation only when at least two repositories need the same combined projections, a named prototype has structured inputs for those views, and the browser surface answers an operational question that existing CLI output or a repository-local artifact does not. None of the inspected repositories currently meets that test: `kit-legal` and Git Almanac already have effective local projections, while IBC 2026 is intentionally product-specific.

No receiver-owned implementation item is created from this exploration. That avoids assigning `tools-ki` a speculative public surface before a concrete consumer exists.

## Documentation impact

### Decision Records

No Decision Record is required for the exploration. A later public console contract may require one in its executable owner.

### Specifications

No behaviour-level specification changes are authorised in this item.

### Guides

No guide changes are expected until an executable prototype exists.

### Roadmap

Retain the evidence and conclusion in this record. A future concrete consumer may create a receiver-owned `tools-ki` record against the promotion test above.

## Review

### Delivered

Delivered the repository-console exploration from baseline `7a17aca903e44ea15a68f91820e028bc7149dbaa` in implementation commit `6ced3fa0`.

### Summary of changes

Compared the canonical `kit-legal` Command Centre, Git Almanac report pack, IBC 2026 dashboard, KB Live Artifacts contract, website boundaries, and `tools-ki` repository projections. Defined a read-only projection shell, provenance requirements, candidate ownership split, and objective promotion test without adopting a command, configuration table, framework, or capability.

### Verification

Local source files and manifests were inspected directly. `ki repo audit --skill ki-work-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass. The batch-wide 531-test suite, TypeScript, Biome, and `ki-skills` audit also pass.

### Outstanding concerns

No implementation is justified until two repositories need the same combined projections and a named prototype answers a question existing surfaces do not. This is a deliberate promotion condition, not incomplete work in the exploration.

### Post-change review

The result preserves canonical repository state and executable ownership, avoids a lowest-common-denominator dashboard, and leaves a checkable path to implementation when real demand appears. It is stable for consolidated acceptance.

### Mini recap

The repository console now has a bounded portable shape and a demand-based promotion test, without creating speculative public tooling.

## Discussion

Use **repository console** as the generic working name. A repository may present its own surface as a Command Centre, dashboard, or report without making that vocabulary portable policy.
