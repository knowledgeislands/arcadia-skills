---
id: KI-HARNESS-GOV-008
title: Evaluate website toolchain unification
area: GOV
theme: governance-consistency
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Decide whether the content and interactive website capabilities should keep separate toolchains or converge on a shared generator.

## Context

`ki-repo-website` standardises the stable seam rather than the generator: one site source root, reproducible `dist/`, and the `ki:site:*` lifecycle. Beneath it, `ki-repo-website-content` uses Eleventy for Markdown and data collections, while `ki-repo-website-app` uses React with Vite for a continuous interactive application.

Astro is a plausible convergence candidate because it is Vite-based, supports content collections, emits static HTML by default, and can hydrate interactive components. Those capabilities do not by themselves prove that migration would improve the current estate or that a continuous application is better represented as islands.

## Boundary

Do not adopt Astro, change either website capability, or merge the two skills in this item. The lifecycle and `dist/` seam are not in question. Hosting remains an orthogonal adapter, and no decision may weaken the assets-only Cloudflare contract.

Toolchain uniformity is not an outcome by itself. A convergence proposal must solve a measured estate problem and remain at least as clear as the current purpose-selected split.

## Current state

- Four declared content websites use Eleventy; one declared interactive website uses Vite.
- No declared website currently needs both capability implementations or uses Astro.
- Content repositories benefit from Eleventy's framework-independent, zero-client-JavaScript default.
- The interactive repository is a continuous React control surface rather than a mostly static page with isolated widgets.
- Shared lifecycle commands already hide generator differences from hosting and repository automation.

## Steps

- [ ] Measure the current estate split and identify any repository that needs the other implementation's capability.
- [ ] Ground Eleventy, Vite, and Astro characteristics in current primary documentation.
- [ ] Evaluate Astro against the harder continuous-application case rather than only the content-site case.
- [ ] Confirm the existing lifecycle and assets-only hosting seams remain sufficient with the split.
- [ ] Record a retain, converge, or prototype decision with explicit reconsideration triggers.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-008-unify-the-website-toolchain.md`

## Verify

- Recheck declarations and package manifests across the five current website repositories.
- Recheck the relevant official Eleventy, Vite, and Astro documentation.
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

No dependency blocks the evaluation. Any later migration would require a separate public-contract decision and receiver-repository work.

## Documentation impact

### Decision Records

No Decision Record is required if the outcome retains the current contract. A convergence decision would require a separate record before implementation.

### Specifications

No specification changes are authorised in this item.

### Guides

No guide change is expected unless the selected operating model changes.

### Roadmap

Retain the evidence and decision in this record. Create follow-up work only for a bounded prototype or approved migration.

## Discussion

The established seam permits the generator choice to be revisited without disturbing deployment consumers. That is evidence the seam is working, not evidence the underlying tools must be identical.
