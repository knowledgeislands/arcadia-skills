---
name: ki-self
ki-depends-on: []
description: >
  Repository-local governance for ki-agentic-harness. Use when making changes here to preserve the repository's direct KI CLI contract, working practices, and recoverable incremental history.
argument-hint: 'audit | conform | educate | refresh | help'
---

# KI Self

`ki-self` owns concerns specific to this repository that do not belong in a shared Knowledge Islands skill. Read [AGENTS.md](../../../AGENTS.md) first; it is the always-loaded operational anchor for this checkout.

## Operating modes

### Mode AUDIT

Inspect the current repository with `ki repo audit` and the relevant focused skill command. Treat failures as evidence to diagnose, not a reason to restore retired wrappers or compatibility paths.

### Mode CONFORM

Apply only safe, repository-local repairs through `ki repo conform` or the focused skill command. Preserve unrelated working-tree changes and verify the affected surface before committing it as an explicit, recoverable unit.

### Mode EDUCATE

Explain the current direct-CLI workflow, the repository's local standards, and the appropriate shared owner for a concern that recurs elsewhere.

### Mode REFRESH

Refresh only this committed `.agents/skills/ki-self/` source. If a rule is reusable, stop and promote it to its shared owner rather than duplicating it here. For the Claude Code runtime only, use the derived `.claude/skills/ki-self` link; do not edit that projection.

### Mode HELP

Describe this repository-local boundary and direct the caller to `AGENTS.md` for the current working contract.
