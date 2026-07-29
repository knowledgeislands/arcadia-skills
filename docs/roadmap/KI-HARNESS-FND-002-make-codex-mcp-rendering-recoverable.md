---
id: KI-HARNESS-FND-002
title: Make Codex MCP rendering recoverable
theme: foundation-tooling
horizon: next
status: ready
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

## Current state

`render-codex.ts` removes a drifted managed entry and then adds the canonical replacement through the native CLI.

The local CLI exposes `mcp get <name> --json`, `mcp add`, and `mcp remove`, but the renderer has no captured prior native representation or add-failure recovery path.

## Steps

1. Characterize and parse the native JSON representation needed to replay only renderer-supported stdio and URL servers, without printing secret values.
2. Add a narrow native-command seam so focused tests can model `get`, `remove`, `add`, and post-write verification without running the real CLI.
3. Before replacing a managed server, reject an unsupported or unreplayable prior representation; otherwise capture it, remove, add the desired canonical entry, and verify the native result.
4. If replacement or verification fails after removal, attempt one replay of the captured supported representation; report both the primary and recovery outcome without claiming a transaction.
5. Preserve `--check` as read-only and update the binding standard only for the evidence-backed recovery boundary.

## Files touched

- `skills/environment/ki-binding-codex/scripts/render-codex.ts`
- `skills/environment/ki-binding-codex/scripts/render-codex.test.ts`
- `skills/environment/ki-binding-codex/references/standards-codex-binding.md`
- this work-item record

## Verify

- Focused renderer tests cover clean agreement, add, remove, failed replacement with successful restore, failed restore, unreplayable prior state, and no native call in `--check`.
- Tests use only a fake native command seam and do not read or alter the live user configuration.
- `bun test skills/environment/ki-binding-codex/scripts/render-codex.test.ts`
- `bunx tsc --noEmit`
- `ki repo audit --skill ki-skills --repo .`
- `ki repo audit --skill ki-authoring --repo .`

## Dependencies / blocks

This item is independent.

It stops if the native JSON shape cannot replay a renderer-supported prior server without revealing or discarding configuration.

## Discussion

### Partial-update recovery

The unresolved design question is what evidence and recovery action can safely surround native remove/add operations while leaving Codex as the configuration owner.

### Local capability evidence

The local CLI confirms the required command vocabulary exists, but command availability alone is not evidence that a prior server can be reconstructed faithfully.

### Batch decision

The batch permits only the supported-replay subset above; an unreplayable state is a stop, not a compatibility fallback.
