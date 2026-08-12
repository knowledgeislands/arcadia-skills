# `ki-subagents-claude` integration record

- **Review state:** post-baseline remediation artifact validated
- **Change state:** applied in `f27f9d76`
- **Identity:** governance; depends on `ki-subagents`; Claude Code runtime binding

## Applied contract

This adapter owns Claude Code Markdown and YAML source mechanics only. It uses a semantic YAML parser, rejects malformed mappings, checks current required and supported fields, and keeps duplicate-name evidence within the candidate source tree. It does not claim publication, activation, effective permissions, or execution.

## Evidence and remaining gap

Focused malformed-YAML, name, field, duplicate, and publication tests pass. Current Claude source authority is recorded in the adapter. The Harness host advertises Claude subagent metadata but implements no publisher, and there is no executed-agent outcome evidence.
