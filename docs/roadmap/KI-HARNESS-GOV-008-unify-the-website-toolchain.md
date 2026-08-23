---
id: KI-HARNESS-GOV-008
title: Unify the website toolchain
area: GOV
theme: governance-consistency
horizon: future
candidate: true
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Decide whether the two website implementations should keep separate toolchains, or whether one Vite-based generator can carry both content collections and interactive applications without giving up what the split currently protects.

## Context

`ki-repo-website` standardises a seam rather than a tool: one site source root, a reproducible `dist/`, and the `ki:site:build` lifecycle. Beneath it sit two mutually exclusive implementations — `ki-repo-website-content` on Eleventy for Markdown and data page collections, and `ki-repo-website-app` on React with Vite for a single interactive application.

The question was raised from a consuming repository as "should Vite be the default in the others". The answer for Eleventy as it stands is no, and the standard already says why in the opposite direction: Eleventy does not bundle application JavaScript, so wrapping it round a React application creates two build systems for no content-collection need. The mirror argument is stronger still — Vite exists to bundle an application, and a content site's best outcome is shipping no JavaScript at all, so making Vite its default invites a bundle nobody asked for.

What the question does surface is that a repository maintainer must currently learn two toolchains to work across the estate, and the seam only hides that at the command level. Astro is the one candidate that could collapse the two without the objection above: it is Vite-based, it has first-class Markdown and data content collections, and it ships zero JavaScript by default while still allowing interactive islands. If it holds up, both implementations could rest on one toolchain and the `-content` and `-app` skills would differ in structure and conventions rather than in build system.

## Boundary

Do not adopt Astro, change either implementation, or fold the two skills together on the strength of this record. The seam is not in question: whatever is decided, `ki-repo-website` continues to standardise the lifecycle rather than the generator, and hosting stays an orthogonal adapter.

Do not treat "one toolchain" as a goal in itself. Eleventy is simpler than Astro and carries no framework surface; a content site that never needed a component model would be paying for one.

## Shaping

### Intended approach

Establish what the split currently buys before costing a merge: which repositories use each implementation, whether any has needed the other's capability, and whether the two-toolchain cost has actually been felt or only anticipated.

Then test Astro against the harder of the two cases rather than the easier one. A content site is the case Astro is obviously good at; the question is whether an interactive application under Astro is as good as it is under plain Vite, or whether the island model gets in the way of an application that is one continuous surface rather than a page with interactive parts.

### Known dependencies

Astro's content collections, its zero-JavaScript default, and its island hydration model all need grounding in primary documentation rather than recollection. The Cloudflare adapter's behaviour under Astro must be established, since hosting is meant to stay orthogonal and an adapter that needs a server-side runtime would break the assets-only guarantee `ki-repo-website-cloudflare` rests on.

### Decisions still needed

Whether a single-surface interactive application is a good fit for Astro at all, or whether the honest outcome is that the split stays and the estate simply carries two toolchains. Whether, if Astro suits both, the two skills merge or remain separate over a shared implementation. What migration would cost for repositories already on Eleventy or plain Vite, and whether that cost is worth paying for consistency alone.

### Promotion conditions

Promote when the current cost of the split has been measured rather than assumed, Astro has been proven against an interactive single-surface application and not only a content site, and the Cloudflare assets-only guarantee has been shown to survive.

## Discussion

The seam is the part that has already earned its place. It is what lets this question be asked calmly: every repository runs the same lifecycle commands and produces the same output contract, so the generator underneath can be reconsidered without disturbing anything that consumes it. Any answer that weakens the seam to unify the tool would be trading the settled thing for the unsettled one.
