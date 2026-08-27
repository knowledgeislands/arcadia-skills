---
id: KI-HARNESS-RTP-009
title: Monitor Agent Host Protocol
area: RTP
theme: runtime-portability
horizon: waiting-for
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Keep Agent Host Protocol visible as a potential common interface for exposing, observing, and interacting with sessions across heterogeneous agent harnesses without committing Knowledge Islands to the protocol before its independent ecosystem matures.

## Context

[Agent Host Protocol](https://microsoft.github.io/agent-host-protocol/) addresses a known runtime-portability need: one host-authoritative session surface can expose several running agents to multiple clients while preserving synchronized session, chat, terminal, and changeset state. VS Code supplies the principal implementation and distribution anchor. The more important adoption signal for Knowledge Islands is whether independent servers, clients, cockpits, and command centres demonstrate that the interface works beyond one vendor-owned host and client pair.

Early independent work includes CLI clients, stand-alone servers, protocol bridges, and multi-agent control surfaces. These projects are interesting evidence, not yet an adoption decision. The [official implementation catalogue](https://microsoft.github.io/agent-host-protocol/guide/implementations.html) and public code using the protocol are the starting points for later review.

## Boundary

This item owns monitoring and a later adoption decision. It does not implement an AHP adapter, select a cockpit, prescribe a server, or place AHP in the portable Knowledge Islands core. Any prototype should remain an optional runtime projection until interoperability, trust boundaries, and operational value are demonstrated.

This item does not replace `KI-HARNESS-RTP-004`, which evaluates durable remote agent terminals in a Zed-centred workflow. AHP concerns discovery and synchronized interaction across agent sessions; terminal persistence is only one possible resource behind that interface.

## Discussion

### Return trigger

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
