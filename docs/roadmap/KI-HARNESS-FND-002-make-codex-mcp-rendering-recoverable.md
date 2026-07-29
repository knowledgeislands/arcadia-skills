---
id: KI-HARNESS-FND-002
title: Make Codex MCP rendering recoverable
theme: foundation-tooling
horizon: future
status: open
candidate: true
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Improve `ki-binding-codex`'s native `codex mcp remove` / `add` sequence around partial updates.

## Boundary

Preserve its no-write `--check` mode and the Codex CLI's ownership of live configuration; determine recovery without claiming native operations are transactional.

## Discussion

### Partial-update recovery

The unresolved design question is what evidence and recovery action can safely surround native remove/add operations while leaving Codex as the configuration owner.
