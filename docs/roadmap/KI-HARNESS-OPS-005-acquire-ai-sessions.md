---
id: KI-HARNESS-OPS-005
title: Acquire AI sessions
area: OPS
theme: operations
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 7373e7c496caa223f5e2dce988ab41bb700f31ad
---

## Goal

Give Knowledge Islands a provider-neutral way to discover and faithfully stage repository-relevant AI sessions so durable knowledge can later be harvested and the source can eventually be retired safely.

## Context

Claude and Codex currently hold accumulated local working state through different mechanisms. Both providers need a comparable read-only discovery, listing, reading, and checkpoint surface. The KI command owns acquisition into a repository working area; the provider MCPs supply only source mechanics.

## Boundary

This first delivery does not archive or delete source sessions, infer durable knowledge automatically, or make MCP a knowledge store. It preserves provider-specific tools and does not require perfect repository routing.

## Current state

`mcp-housekeeping-claude` exposes Claude-specific audits and session previews. `mcp-housekeeping-codex` has a repository-scoped app-server inventory/delete prototype. `ki space acquire chatgpt import` now stages a validated, user-prepared local ChatGPT capture content-addressably at `+/_ACQUIRE/chatgpt/`; a direct ChatGPT data-export adapter remains to be built and verified against real export material.

## Steps

- [x] Define the shared session adapter result and checkpoint contract.
- [x] Add matching read-only session discovery surfaces to the Claude and Codex MCPs.
- [x] Align the Claude and Codex housekeeping skills with the acquisition lifecycle.
- [x] Extend `tools-ki` with provider-context staging for validated local ChatGPT captures.
- [ ] Add a complete ChatGPT data-export adapter, including image and attachment fidelity verified against an actual export.
- [ ] Verify provider adapters, skills, and KI working-area import together with available source material.

## Files touched

- `docs/decisions/ADR-KI-HARNESS-SKILLS-007-provider-neutral-ai-session-acquisition-and-adapter-pairing.md`
- `skills/environment/ki-housekeeping-claude/`
- `skills/environment/ki-housekeeping-codex/`
- sibling `mcp-housekeeping-claude`, `mcp-housekeeping-codex`, and `tools-ki` repositories

## Verify

- The two MCPs expose equivalent read-only session discovery, list, read, and checkpoint operations.
- A provider capture retains source identity, timestamps, content, and checkpoint provenance before any harvesting action.
- Repository audits and each affected repository's test suite pass.

## Dependencies / blocks

Provider implementation depends on the available local Claude state and Codex app-server protocol. The raw ChatGPT export adapter requires a representative export, including generated-image and attachment cases, so it can faithfully preserve what the export actually contains and record omissions where bytes are unavailable. Granola and communication-source acquisition remain follow-on adapters.

## Documentation impact

### Decision Records

Arcadia's `ADR-KI-ARCADIA-001` records the provider-neutral acquisition architecture. ADR-KI-HARNESS-SKILLS-007 records this item's provider-adapter boundary.

### Specifications

No as-built KI acquisition specification exists until repository-context staging is implemented and verified.

### Guides

Add an operational guide once an end-to-end provider acquisition command is usable.

### Roadmap

This item holds the cross-repository delivery sequence and future provider work.

## Discussion

### Provider vocabulary

The comparable operations are `discover`, `list`, `read`, and `checkpoint`. `import` is deliberately not an MCP operation: `ki space acquire <provider> import` is the repository-context command that turns a provider read into staged KI material.

### Safety boundary

Archive and deletion require a later verified acquisition and harvest decision. A checkpoint is evidence for incremental selection, not authority to destroy a source session.
