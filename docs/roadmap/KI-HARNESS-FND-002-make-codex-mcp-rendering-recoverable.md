---
id: KI-HARNESS-FND-002
title: Make Codex MCP rendering recoverable
theme: foundation-tooling
horizon: soon
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

Improve `ki-binding-codex`'s native `codex mcp remove` / `add` sequence around partial updates.

## Boundary

Preserve its no-write `--check` mode and the Codex CLI's ownership of live configuration; determine recovery without claiming native operations are transactional.

## Shaping

### Intended approach

Characterise the installed Codex CLI's `mcp get <name> --json` output for the renderer-supported stdio and URL server shapes without changing the live user configuration.

Extend the renderer only when that native record can be safely parsed, redacted, and replayed through `codex mcp add`: capture a recoverable managed-server snapshot before removal, replace the server through the native CLI, verify the resulting entry, and attempt one bounded native restore if the replacement fails.

Keep `--check` read-only and make test doubles prove command order, add-failure recovery, verification failure, unsupported native snapshots, and redaction.

### Known dependencies

The locally installed Codex CLI exposes `mcp get <name> --json`, `mcp add`, and `mcp remove`.

No network call, OAuth/login, user-configuration mutation, or external repository is needed for the characterization and test design.

### Decision still needed

Determine whether `mcp get --json` contains enough information to replay every renderer-supported managed server without exposing a secret or silently dropping a native option.

If it does not, retain the existing no-transaction claim and stop before any remove/add recovery implementation.

### Promotion conditions

Promote when the native JSON shape is characterized, the supported recovery subset and stop condition are explicit, and the renderer test seam plus focused verification are concrete.

## Discussion

### Partial-update recovery

The unresolved design question is what evidence and recovery action can safely surround native remove/add operations while leaving Codex as the configuration owner.

### Local capability evidence

The local CLI confirms the required command vocabulary exists, but command availability alone is not evidence that a prior server can be reconstructed faithfully.
