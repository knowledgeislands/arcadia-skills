# `ki-subagents-codex` integration record

- **Review state:** post-baseline remediation artifact validated
- **Change state:** applied in `f27f9d76`
- **Identity:** governance; depends on `ki-subagents`; Codex runtime binding

## Applied contract

This adapter owns Codex standalone TOML source mechanics only. It rejects malformed TOML, requires `name`, `description`, and `developer_instructions`, validates supported native keys, and detects duplicate source names. It does not claim publication, activation, effective settings, or execution.

## Evidence and remaining gap

Focused malformed-TOML, field, key, duplicate, and publication tests pass. Current official Codex source authority is recorded in the adapter. `tools-ki` has neither a Codex subagent capability/path nor a generic publisher, and there is no executed-agent outcome evidence.
