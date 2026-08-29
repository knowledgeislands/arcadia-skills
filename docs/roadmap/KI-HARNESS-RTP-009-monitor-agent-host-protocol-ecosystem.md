---
id: KI-HARNESS-RTP-009
title: Monitor Agent Host Protocol
area: RTP
theme: runtime-portability
horizon: next
status: done
blocks: []
blocked_by: []
baseline_ref: fff435c90e7271a5d10af727f36128c4e810bc05
---

## Goal

Evaluate whether Agent Host Protocol's now-stable core and emerging independent client ecosystem justify a bounded optional Knowledge Islands prototype, without treating maturity as adoption.

## Context

[Agent Host Protocol](https://microsoft.github.io/agent-host-protocol/) addresses a known runtime-portability need: one host-authoritative session surface can expose several running agents to multiple clients while preserving synchronized session, chat, terminal, and changeset state. VS Code supplies the principal implementation and distribution anchor. The more important adoption signal for Knowledge Islands is whether independent servers, clients, cockpits, and command centres demonstrate that the interface works beyond one vendor-owned host and client pair.

Early independent work includes CLI clients, stand-alone servers, protocol bridges, and multi-agent control surfaces. These projects are interesting evidence, not yet an adoption decision. The [official implementation catalogue](https://microsoft.github.io/agent-host-protocol/guide/implementations.html) and public code using the protocol are the starting points for later review.

## Boundary

This item owns monitoring and a later adoption decision. It does not implement an AHP adapter, select a cockpit, prescribe a server, or place AHP in the portable Knowledge Islands core. Any prototype should remain an optional runtime projection until interoperability, trust boundaries, and operational value are demonstrated.

This item does not replace `KI-HARNESS-RTP-004`, which evaluates durable remote agent terminals in a Zed-centred workflow. AHP concerns discovery and synchronized interaction across agent sessions; terminal persistence is only one possible resource behind that interface.

## Current state

The 2026-08-29 primary-source review satisfies the stability return trigger. AHP now documents protocol-version-1 messages and marks Root, Session, Chat, Terminal, Telemetry, and Resource Watch as stable. Changesets and the MCP channel remain release candidates; Annotations remain in active development; Automation remains early development.

The official implementation catalogue now publishes clients for Rust, TypeScript, Kotlin, Swift, Go, and .NET. It also lists AHPX, an independently maintained CLI built on the official TypeScript client, with multi-session management, fleet health, session persistence, event forwarding, and remote connection profiles. VS Code remains the only catalogued server implementation, so independent client activity is real while independent-host interoperability and a two-harness cockpit remain unproven.

## Evaluation result

The explicit disposition is **continue monitoring; do not prototype yet**. Stable Root, Session, Chat, Terminal, Telemetry, and Resource Watch channels cover the basic session inventory, interaction, terminal, and observation model Knowledge Islands would need. Changesets and MCP remain release candidates, while Annotations and Automation remain too unstable to treat AHP as a complete command-centre contract.

AHPX is the strongest cockpit-like signal: it can maintain several server profiles, manage concurrent sessions, query agents and server health, persist transcripts, forward events, browse server content, carry tokens, and apply permission modes. Those capabilities still exercise the official client against server endpoints supplied elsewhere. The official catalogue names only the VS Code reference server, and its public route is source code rather than a supported standalone host launch contract. No primary-source evidence demonstrates an independent server or one cockpit controlling two distinct agent harness implementations.

The reviewed revisions are AHP `adf77a58fd493f24dae10ee0c87fcc47a3c947c4`, AHPX `a178119ec56ec467cef7c0794a9991315dc8974c`, and VS Code `3aa54039a0bec1bd4f9b428cdb202b4271bf22ef`. Absence of a supported host entry point prevents an honest live proof; building an undocumented VS Code development surface would test source adjacency rather than an adoptable boundary.

## Steps

- [x] Record the exact AHP specification, official client, VS Code host, and AHPX revisions used for evaluation.
- [x] Map stable and unstable channels against the Knowledge Islands session-aggregation need, keeping terminal persistence and agent-backend protocols outside the AHP ownership boundary.
- [x] Verify what AHPX can observe and control through its documented client surface, including server profiles, agents, sessions, reconnection, authentication, permissions, persistence, and event forwarding.
- [x] Record the absence of a public supported standalone host entry point as evidence against a live proof rather than infer interoperability from VS Code source.
- [x] Search the primary implementation catalogue and repositories for an independently maintained server or a cockpit controlling at least two agent harnesses; none is evidenced.
- [x] Conclude with the explicit disposition to continue monitoring without a prototype.
- [x] Record that no implementation item is justified until an independent-server, two-harness, or concrete unmet-local-need trigger appears.

## Files touched

- `docs/roadmap/KI-HARNESS-RTP-009-monitor-agent-host-protocol-ecosystem.md`
- A Decision Record only if the evaluation changes the portable Knowledge Islands architecture

## Verify

- Use the official AHP versioning and implementation catalogue plus the exact primary implementation repositories.
- Record protocol and implementation revisions for any live proof.
- Require reproducible client-host evidence before claiming interoperability.
- `ki repo audit --skill ki-work-roadmap --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

No dependency blocks the evaluation. The absence of an independent host, multi-harness cockpit, or supported runnable host entry point is an admissible negative result and prevents prototype promotion rather than preventing this evaluation.

## Documentation impact

### Decision Records

Create an RDR or ADR only if the evaluation selects a prototype or changes the portable architecture. Continued monitoring remains fully evidenced by this retained work record.

### Specifications

No specification change is authorised by this evaluation.

### Guides

No guide change is expected unless a supported prototype is selected.

### Roadmap

Any implementation outcome becomes a separate record. This item stops at an evidence-backed disposition.

## Review

### Delivered

Against immutable baseline `fff435c90e7271a5d10af727f36128c4e810bc05`, completed the evidence-backed AHP maturity evaluation and recorded the explicit disposition to continue monitoring without a prototype. No implementation, dependency, Decision Record, external configuration, or runtime state changed.

### Summary of changes

The record now maps channel stability to the Knowledge Islands session-aggregation need, captures exact AHP, AHPX, and VS Code revisions, and distinguishes AHPX's genuine multi-server client capabilities from absent independent-server interoperability. It names the lack of a supported standalone host entry point as a negative prototype result rather than filling that gap with an undocumented development build.

### Verification

Reviewed the official AHP versioning and implementation catalogue, the AHP repository at `adf77a58fd493f24dae10ee0c87fcc47a3c947c4`, AHPX at `a178119ec56ec467cef7c0794a9991315dc8974c`, and VS Code at `3aa54039a0bec1bd4f9b428cdb202b4271bf22ef`. The official catalogue names VS Code as the sole server, while AHPX documents server profiles, multi-session operation, fleet health, persistence, event forwarding, tokens, permissions, and remote tunnels. No live interoperability claim is made.

### Outstanding concerns

AHP still lacks primary-source evidence for an independent server, a supported standalone host launch boundary, and one cockpit controlling two distinct agent harnesses. Changesets and MCP remain release candidates; Annotations and Automation remain less stable. These are explicit monitoring triggers, not local delivery failures.

### Post-change review

The evaluation answers the adoption question proportionately: AHP is credible enough to monitor and AHPX is a meaningful cockpit signal, but a prototype would presently validate only one vendor's reference server. Continued monitoring is reversible, carries no portable architecture commitment, and is ready for consolidated acceptance.

### Mini recap

The stable AHP core fits the conceptual need, and AHPX demonstrates useful client-side command-centre behavior. Host diversity and cross-harness proof remain missing, so no prototype or adoption record is warranted yet. The existing independent-server, two-harness, and concrete-local-need triggers remain the durable return route.

## Done

Accepted at `2026-08-29T22:54:03Z` through the closure authority bound to `KI-HARNESS-BATCH-006`. The current six-part review packet, primary-source revision evidence, negative live-proof result, roadmap audit, and authoring audit were rechecked before closure. Continued monitoring remains a trigger-based future activity rather than an open delivery obligation.

## Discussion

### Trigger assessment

The equivalent stability milestone is now met: AHP's core session-facing channels are marked stable and protocol-version-1 messages are published. The independent-host and two-harness-cockpit triggers remain unmet, which narrows the evaluation rather than returning the item to Waiting for.

Resume this item when at least one of these external conditions becomes true:

- AHP reaches `1.0` or publishes an equivalent stability and conformance milestone.
- An independently maintained server and client demonstrate interoperability outside the VS Code implementation.
- A cockpit or command centre demonstrates useful live control of sessions from at least two distinct agent harnesses.
- Knowledge Islands develops a concrete multi-client session-aggregation requirement that current runtime surfaces cannot meet.

### Questions on return

- Can clients discover several hosts and present stable repository, runtime, agent, and session identity?
- Do reconnection, replay, capability negotiation, authentication, and authorization support unattended local and remote sessions safely?
- Which independent implementations are maintained, interoperable, and useful rather than protocol demonstrations or inherited VS Code code?
- Should Knowledge Islands continue monitoring, prototype an optional adapter, adopt an implementation, or reject AHP for the identified need?

### Verify

Use primary protocol releases, implementation repositories, and reproducible client-server demonstrations. Do not infer adoption from package downloads, lockfiles, repository forks, or copied VS Code sources alone. Record the protocol version and implementation revisions used by any interoperability proof.

### Dependencies / blocks

This item waits for a named maturity, interoperability, cockpit, or local-requirement trigger above. It blocks nothing.
