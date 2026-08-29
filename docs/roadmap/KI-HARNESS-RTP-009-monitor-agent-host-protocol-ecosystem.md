---
id: KI-HARNESS-RTP-009
title: Monitor Agent Host Protocol
area: RTP
theme: runtime-portability
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
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

The official implementation catalogue publishes client libraries for Rust, TypeScript, Kotlin, Swift, and Go. It also lists AHPX, an independently maintained CLI built on the official TypeScript client, with multi-session management, fleet health, session persistence, event forwarding, and remote connection profiles. VS Code remains the only catalogued host implementation, so independent client activity is real while independent-host interoperability and a two-harness cockpit remain unproven.

## Steps

- [ ] Record the exact AHP specification, official client, VS Code host, and AHPX revisions used for evaluation.
- [ ] Map stable and unstable channels against the Knowledge Islands session-aggregation need, keeping terminal persistence and agent-backend protocols outside the AHP ownership boundary.
- [ ] Verify what AHPX can observe and control through the documented VS Code host surface, including repository, agent, session, reconnection, authentication, and permission identity.
- [ ] Attempt a bounded reproducible client-host proof only where a public supported host entry point exists; otherwise record that absence as evidence against prototyping rather than infer interoperability.
- [ ] Search primary repositories for an independently maintained host or cockpit controlling at least two agent harnesses and distinguish maintained products from protocol demonstrations.
- [ ] Conclude with one explicit disposition: continue monitoring, prepare an optional prototype, adopt a named implementation, or reject AHP for the identified need.
- [ ] If a prototype is justified, create a separately bounded implementation record with trust, isolation, verification, and removal criteria; do not implement it here.

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
