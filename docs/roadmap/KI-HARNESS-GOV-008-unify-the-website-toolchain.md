---
id: KI-HARNESS-GOV-008
title: Evaluate website toolchain unification
area: GOV
theme: governance-consistency
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 7a17aca903e44ea15a68f91820e028bc7149dbaa
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

- [x] Measure the current estate split and identify any repository that needs the other implementation's capability.
- [x] Ground Eleventy, Vite, and Astro characteristics in current primary documentation.
- [x] Evaluate Astro against the harder continuous-application case rather than only the content-site case.
- [x] Confirm the existing lifecycle and assets-only hosting seams remain sufficient with the split.
- [x] Record a retain, converge, or prototype decision with explicit reconsideration triggers.

## Files touched

- `docs/roadmap/KI-HARNESS-GOV-008-unify-the-website-toolchain.md`

## Verify

- Recheck declarations and package manifests across the five current website repositories.
- Recheck the relevant official Eleventy, Vite, and Astro documentation.
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

No dependency blocks the evaluation. Any later migration would require a separate public-contract decision and receiver-repository work.

## Outcome

Retain the purpose-selected Eleventy and Vite implementations. Do not prototype or adopt Astro from current evidence.

The measured estate contains four `ki-repo-website-content` repositories on Eleventy 3.1 and one `ki-repo-website-app` repository on Vite 7. None declares both implementations, uses Astro, or records a need for the other implementation's capability. The shared `ki:site:*` lifecycle and `dist/` contract already isolate deployment consumers from the generator choice.

Current primary documentation supports the purpose split:

- [Eleventy](https://www.11ty.dev/) remains framework-independent and produces zero client-side JavaScript by default, matching content repositories.
- [Vite](https://vite.dev/guide/) provides a development server and production bundle for modern applications, and its [static deployment guide](https://vite.dev/guide/static-deploy.html) retains `dist/` as the default output.
- Astro provides typed [content collections](https://docs.astro.build/en/guides/content-collections/) and an [islands architecture](https://docs.astro.build/en/concepts/islands/) that emits HTML by default and hydrates selected components. Its own explanation distinguishes islands from a continuous single-page application, while allowing an SPA to be embedded.
- Astro's [Cloudflare adapter guidance](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) says a static Astro site does not need the runtime adapter, so an assets-only build is possible. That removes one objection to a future prototype but does not supply a reason to migrate.

Astro is strongest in the unrepresented middle case: a content-led site that needs selected interactive regions. The current continuous React dashboard would gain another framework layer without evidence that islands simplify its shared state or control surface, while four content sites would pay migration cost despite already meeting the zero-JavaScript outcome with the simpler generator.

Reconsider only when a consuming repository needs both content collections and substantial interaction, the split creates a measured maintenance failure beyond the common lifecycle seam, or a bounded Astro prototype proves a continuous application and assets-only deployment materially simpler than the current Vite implementation. Toolchain uniformity alone is not a trigger.

## Documentation impact

### Decision Records

No Decision Record is required if the outcome retains the current contract. A convergence decision would require a separate record before implementation.

### Specifications

No specification changes are authorised in this item.

### Guides

No guide change is expected unless the selected operating model changes.

### Roadmap

Retain the evidence and decision in this record. No follow-up work is justified until a reconsideration trigger occurs.

## Review

### Delivered

Delivered the website-toolchain evaluation from baseline `7a17aca903e44ea15a68f91820e028bc7149dbaa` in implementation commit `6ced3fa0`.

### Summary of changes

Measured the five declared website repositories, grounded the Eleventy, Vite, Astro, and Cloudflare characteristics in current primary documentation, evaluated the continuous-application case, and recorded a retain decision with explicit reconsideration triggers.

### Verification

All five `.ki.toml` declarations and package manifests were inspected directly. Primary documentation was rechecked. `ki repo audit --skill ki-work-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass. The batch-wide 531-test suite, TypeScript, Biome, and `ki-skills` audit also pass.

### Outstanding concerns

Astro remains a credible option for a future content-led site with selected interactivity. No current repository presents that need, so absence of a prototype is proportionate rather than unfinished migration work.

### Post-change review

Retaining the split preserves the simpler generator for content, the direct application toolchain for the continuous dashboard, and the settled lifecycle and deployment seams. The conclusion is evidence-backed and stable for consolidated acceptance.

### Mini recap

Website capabilities retain Eleventy and Vite by purpose; Astro is reconsidered only against a concrete mixed-capability need.

## Discussion

The established seam permits the generator choice to be revisited without disturbing deployment consumers. That is evidence the seam is working, not evidence the underlying tools must be identical.
