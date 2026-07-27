# Codex binding standard

`ki-binding-codex` owns the native Codex surface after `ki-binding` establishes the canonical source.

The target is `~/.codex/config.toml` and its `[mcp_servers.*]` entries. This is application-owned TOML that can contain non-KI entries, including app-provided servers. Compare it read-only during audit. Render only canonical entries targeting `chatgpt-codex`, using `codex mcp add` so Codex owns its merge and formatting behavior. Do not template or rewrite the complete TOML file; do not remove unrecognised entries.
