---
id: KI-HARNESS-FND-015
title: Add Harness pulse review
area: FND
theme: foundation-tooling
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Add an on-demand `ki-pulse` process that keeps the Harness aware of relevant public developments and turns worthwhile signals into evidence-backed improvement candidates.

## Context

The Harness already refreshes each governance skill against its tracked normative sources, but it has no bounded way to look across broader public developments and ask whether a new tool, technique, standard, or recurring pattern warrants a Harness change. The earlier acquisition candidate mixed that discovery need with preservation of private source material. This item retains only the public discovery and review outcome.

## Boundary

The process is scoped to the selected `ki-agentic-harness` repository and stops elsewhere. It does not acquire private material, preserve conversations, scrape authenticated sessions, create a general discovery index, automatically change the Harness, or replace an owning skill's REFRESH authority. A signal is evidence for review, not proof that the Harness should adopt it.

## Shaping

### Intended approach

Create `ki-pulse` as a process skill invoked explicitly when the user asks to check what is changing around the Harness. It reviews a bounded, declared set of current public signals, records the source, observation date, reason for relevance, affected Harness capability, and uncertainty, then compares each viable signal with current repository evidence.

Route a normative-source change to the owning skill's REFRESH mode. Route a distinct finite improvement proposal through `ki-next`. Report interesting but unactionable signals without creating work, and discard irrelevant popularity noise.

### Known dependencies

The process needs current web or provider access to its declared public sources and a clean way to identify the selected Harness repository. `ki-skills` governs the new process skill's quality; `ki-next` retains roadmap selection authority; each governance skill retains authority over its own source refresh.

### Decisions still needed

Choose the first deliberately small signal set and the maximum evidence retained in the run result. Decide whether repeated observations remain session output until they justify work or whether the Harness needs a concise repository-owned pulse record.

### Promotion conditions

Promote when the initial signal set, source-selection boundary, result shape, repository applicability check, and hand-off rules to REFRESH and `ki-next` are concrete enough to verify without turning the process into open-ended browsing.

## Discussion

### Candidate signals

A pulse may inspect release notes and primary documentation for relevant agent runtimes, standards, developer tools, and repositories; repeated appearances in selected public discovery surfaces may supply a lead. Every lead must be checked against a primary source before it can support a Harness proposal.

| Signal | Suggested observation | Boundary |
| --- | --- | --- |
| Relevant release or standard | Changed supported behaviour with a primary source. | A release is not automatically applicable to the Harness. |
| Repeated public discovery signal | Repeated appearances in a declared topic or tool area. | Popularity is discovery evidence, not quality or fit. |
| Curated public index | A newly relevant category or linked project. | A curated list is a seed, not wholesale ingestion authority. |

### Review outcome

The process ends with cited observations and one disposition per signal: route to an owning REFRESH, propose finite roadmap work, retain as a named monitoring trigger, or discard. It never implements its own recommendation.
