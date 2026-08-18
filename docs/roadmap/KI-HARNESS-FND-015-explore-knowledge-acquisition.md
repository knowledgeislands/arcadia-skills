---
id: KI-HARNESS-FND-015
title: Add portable Pulse
area: FND
theme: foundation-tooling
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 081922e8bf0651dfa44f8995df414c23a8b1ab29
---

## Goal

Add an on-demand `ki-pulse` process that captures interesting links, discovers relevant public developments, and routes each worthwhile signal to personal learning, monitoring, or actionable work without becoming a second destination store.

## Context

The original candidate focused on keeping the Harness aware of broader developments. The same operation is useful beyond the Harness: a person may encounter an article, post, project, book, talk, or unfamiliar topic that is worth reading or learning about even when it implies no repository change. A portable Pulse should accept those explicit user signals as well as perform bounded discovery, then hand each disposition to its real owner.

## Boundary

Pulse does not become a Knowledge Base writer, cross-repository transport, work selector, general bookmark database, authenticated scraper, or recommendation implementer. It may inspect public content and user-supplied material the user is entitled to provide. It never claims to have read inaccessible content, preserves no credentials or session material, and does not treat popularity or personal interest as proof that a signal should become durable knowledge or work.

## Current state

The delivery boundary is settled around a portable, on-demand `ki-pulse` process rather than a Harness-only background reader. It accepts explicit user signals, can perform bounded public discovery, and routes worthwhile results to the capability or repository that owns their durable destination. Pulse itself retains no standing log or second inbox.

The initial process has three related operations:

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

The first delivery uses an invocation-scoped scan brief rather than standing configuration. A Scan request supplies one or more interests or discovery queries and may name bounded public sources; the brief exists only for that invocation and creates no config file or durable subscription. Repeated scans may reuse a user-supplied brief, but Pulse does not persist it. This keeps host-specific destination resolution separate from discovery input and leaves durable monitoring with an existing owning record.

A scan inspects at most ten leads and returns at most five cited observations, prioritised by relevance to the explicit brief rather than popularity. Capture accepts one explicit URL or source and optional reason. Triage accepts the gathered signals from the current invocation; it does not reopen an unbounded history.

## Steps

- [x] Define the invocation-scoped scan brief and common signal shape in the Pulse standard, including required interests or queries, optional bounded public sources, source metadata, access state, uncertainty, and proposed destination.
- [x] Add the `ki-pulse` process skill under change management with Capture, Scan, Triage, and Help operations, no standing configuration, and no default durable write.
- [x] Define the common signal record and the read or learn, watch, act, and discard dispositions, including access state and uncertainty.
- [x] Implement bounded public discovery and primary-source verification while preserving inaccessible user-submitted links as explicitly unread candidates.
- [x] Route durable outcomes through the selected destination owner: `ki-repo-kb`, `ki-trades`, an owning skill's REFRESH mode, `ki-next`, or an existing monitoring record.
- [x] Add focused evaluation fixtures for inaccessible capture, Knowledge Base reading, actionable hand-off, and discard behaviour.
- [x] Publish the skill in the generated catalogue and add task-oriented guidance without creating a Pulse-owned log or backlog.

## Files touched

- `skills/change-management/ki-pulse/SKILL.md`
- `skills/change-management/ki-pulse/references/standards-pulse.md`
- `evals/scenarios/ki-pulse.ts`
- `evals/harness.ts`
- `skills/README.md`
- `docs/guides/skills-by-outcome.md`
- `docs/roadmap/KI-HARNESS-FND-015-explore-knowledge-acquisition.md`

## Verify

- Capture preserves source metadata, user context, access state, and uncertainty without inventing inaccessible content.
- Scan refuses an absent or empty brief, persists no interest or query configuration, and inspects only the interests, queries, and optional public sources supplied for that invocation.
- Scan inspects no more than ten leads and returns no more than five cited observations from declared interests or queries.
- Triage assigns exactly one disposition per signal and uses a primary source for actionable technical or governance claims where one exists.
- Durable read, watch, and act outcomes reach only their declared owner; discard and unavailable-destination outcomes create no artifact.
- The four selected evaluation fixtures cover an inaccessible submitted link, a Knowledge Base reading candidate, an actionable REFRESH or work hand-off, and a correctly discarded signal.
- `ki repo audit --skill ki-skills --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.

## Dependencies / blocks

The process needs web or provider access for public sources and runtime-resolved host bindings for any durable destination. `ki-skills` governs the process skill's quality; `ki-repo-kb` owns Knowledge Base placement and note writing; `ki-trades` owns cross-repository transport; `ki-next` retains work capture and selection authority; each governance skill retains authority over its own source refresh. None is a mandatory dependency merely to inspect or classify a signal: Pulse degrades to a cited transient result when the required destination capability is unavailable.

The invocation-scoped scan brief resolves the former interest-representation blocker. No other roadmap item is blocked by this work.

## Delegation

### Locked decisions

- Pulse is an on-demand process with an invocation-scoped scan brief, no standing configuration, and no Pulse-owned inbox, log, or backlog.
- The worker owns only the new Pulse skill root and isolated evaluation scenario; the coordinator owns shared catalogue, guide, evaluation-harness registration, lifecycle, integration, and commits.

### Escalate

- Any need for standing configuration, a new durable destination, authenticated-source access, scheduled scanning, changes outside the named worker files, or a conflict with an existing skill owner.

### Worker: pulse-core

- **Deliverable:** A complete `ki-pulse` skill root and isolated evaluation scenario implementing the approved Capture, Scan, Triage, and Help contract.
- **Inputs:** This work item, `ki-skills`, the Agent Skills and Knowledge Islands skill standards, representative change-management process skills, and the evaluation scenario conventions.
- **Scope:** Write only `skills/change-management/ki-pulse/` and `evals/scenarios/ki-pulse.ts`; read other Harness files as needed. Do not edit shared publications, `evals/harness.ts`, roadmap records, configuration, or external systems.
- **Authority:** Create and verify the named files with local read-only research where required. Perform no Git write, network write, message, deployment, push, release, or peer-repository action.
- **Isolation:** Exclusive non-overlapping paths in the shared worktree; no Git staging or commit commands.
- **Verify:** Coordinator reviews the full skill against `ki-skills`, runs focused tests or static checks for the new files, integrates shared publications, then runs the work item's complete gates.
- **Return:** Concise file list, material design choices, focused verification results, and any unresolved ownership or behaviour question; no raw tool transcript.
- **Checkpoint:** Return after the two named write surfaces are complete and focused checks pass, or immediately on an escalation condition.

## Documentation impact

### Decision Records

No new Decision Record is expected. Standing interest configuration remains outside the delivery; add a decision only if later work proposes a repository-wide destination-resolution or subscription contract.

### Specifications

No product Specification change is planned.

### Guides

Add task-oriented guidance for submitting a link, running a bounded scan, interpreting dispositions, and understanding when Pulse creates no durable artifact.

### Roadmap

Keep authenticated-source access, scheduled scanning, and any Pulse-owned reading store or monitoring log outside the first delivery.

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
