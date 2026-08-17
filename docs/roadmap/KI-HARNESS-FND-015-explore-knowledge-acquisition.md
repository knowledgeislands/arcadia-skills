---
id: KI-HARNESS-FND-015
title: Add portable Pulse
area: FND
theme: foundation-tooling
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Add an on-demand `ki-pulse` process that captures interesting links, discovers relevant public developments, and routes each worthwhile signal to personal learning, monitoring, or actionable work without becoming a second destination store.

## Context

The original candidate focused on keeping the Harness aware of broader developments. The same operation is useful beyond the Harness: a person may encounter an article, post, project, book, talk, or unfamiliar topic that is worth reading or learning about even when it implies no repository change. A portable Pulse should accept those explicit user signals as well as perform bounded discovery, then hand each disposition to its real owner.

## Boundary

Pulse does not become a Knowledge Base writer, cross-repository transport, work selector, general bookmark database, authenticated scraper, or recommendation implementer. It may inspect public content and user-supplied material the user is entitled to provide. It never claims to have read inaccessible content, preserves no credentials or session material, and does not treat popularity or personal interest as proof that a signal should become durable knowledge or work.

## Shaping

### Intended approach

Create `ki-pulse` as a portable process skill with three related operations:

- **Capture** accepts an explicitly submitted URL or source plus the user's optional reason for interest. An explicit capture request authorises creation of the minimal reading candidate through the selected destination owner; casually mentioning a link does not.
- **Scan** reviews a bounded, declared set of public sources and discovery queries for potentially relevant signals.
- **Triage** verifies accessible claims against primary sources where appropriate, records uncertainty and access limits, and assigns one disposition without implementing it.

Every signal carries its source, observed date, title and author when resolvable, user or query context, reason for relevance, access state, uncertainty, and proposed destination. Pulse resolves host-specific destinations at runtime rather than hard-coding the Harness or one personal Knowledge Base.

Use four dispositions:

- **Read / learn** hands a minimal reading candidate to `ki-repo-kb` SAVE when the selected repository is the intended Knowledge Base, or to `ki-trades` when another declared repository owns the destination.
- **Watch** adds a named monitoring trigger only to an existing owning record; otherwise it remains transient session output.
- **Act** routes a normative-source change to the owning skill's REFRESH mode or presents a finite work proposal to `ki-next` in the owning repository.
- **Discard** records no durable artifact.

Begin with user-submitted links, primary release notes and documentation for configured interests, primary changes to declared standards or tools, and public projects that recur across a deliberately named discovery query. Discovery surfaces may identify a lead, but only a primary source may support an actionable technical or governance claim.

### Known dependencies

The process needs web or provider access for public sources and runtime-resolved host bindings for any durable destination. `ki-skills` governs the process skill's quality; `ki-repo-kb` owns Knowledge Base placement and note writing; `ki-trades` owns cross-repository transport; `ki-next` retains work capture and selection authority; each governance skill retains authority over its own source refresh. None is a mandatory dependency merely to inspect or classify a signal: Pulse degrades to a cited transient result when the required destination capability is unavailable.

### Decisions still needed

Choose the initial declared interest and discovery-query representation during planning. A scan should inspect at most ten leads and return at most five cited observations, prioritised by relevance to declared interests rather than popularity.

Do not create a standing Pulse log in the first delivery. Session output remains transient unless an explicit capture is accepted by a Knowledge Base destination, an observation routes to an owning REFRESH, a confirmed proposal enters work through `ki-next`, or an existing record receives a named monitoring trigger. This avoids a second inbox or backlog and makes the durable hand-off itself the evidence-retention decision.

### Promotion conditions

Promote when the interest/query representation and destination-resolution rule are concrete and four evaluation fixtures are selected: one inaccessible user-submitted link correctly captured as unread without invented content, one Knowledge Base reading candidate, one actionable REFRESH or work hand-off, and one interesting signal correctly discarded. The portable applicability and transient-output boundaries are settled.

## Discussion

### Candidate signals

A pulse may begin with an explicitly submitted link or inspect release notes, primary documentation, public reading lists, developer tools, projects, books, talks, and topics related to declared interests. Repeated appearances in selected discovery surfaces may supply a lead. Every actionable claim must be checked against a primary source where one exists; a reading candidate may remain deliberately unread.

| Signal | Suggested observation | Boundary |
| --- | --- | --- |
| User-submitted link | Capture known metadata, why it matters, and whether content was accessible. | Never invent a title, summary, or claim when the content cannot be read. |
| Relevant release or standard | Changed supported behaviour verified with a primary source. | A release is not automatically applicable to any repository. |
| Repeated public discovery signal | Repeated appearances in a declared interest or query. | Popularity is discovery evidence, not quality or fit. |
| Curated public index | A newly relevant category, work, or project. | A curated list is a seed, not wholesale ingestion authority. |

### Inaccessible-link example

[Anatoli Kopadze's X post](https://x.com/anatolikopadze/status/2080668775796314331?s=46) links to an X Article whose text was not available through the public embed. A correct Pulse capture may retain the submitted URL, resolvable author, observation date, the user's statement that it is interesting, and `unread / content unavailable`. It must not manufacture the article title, subject, or summary.

### Review outcome

The process ends with cited observations and one disposition per signal: read or learn, watch, act, or discard. It hands any durable result to the owning skill or repository process and never implements its own recommendation.
