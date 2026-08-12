# Sources — Codex adapter

**Refresh:** external-spec · monthly

**Last reviewed:** 2026-08-12

## Normative

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| CODEX | [OpenAI Codex Subagents documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents.md) | TOML locations, required fields, supported source keys, and runtime boundaries | 2026-08-12 |

The checked official OpenAI manual cache contains the same Subagents section at lines 1973–2385. It confirms source paths and native fields, while leaving effective runtime behavior outside file evidence.

## Local boundary

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| HOST | Harness host capability inspection recorded in the Round 25 packet | Codex has no subagent capability/path and no generic subagent publisher exists | 2026-08-12 |

## Last review

The current Codex documentation defines TOML source locations and fields but does not make a source file proof of publication, activation, or execution. The current Harness host exposes neither a Codex subagent capability nor a generic subagent publisher, so this adapter reports source conformance only.
