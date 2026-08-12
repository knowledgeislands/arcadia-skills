# `ki-tokenomics-claude` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised
- **Identity:** position 47 of 50; governance; depends on `ki-tokenomics` at position 46; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-tokenomics-claude` correctly depends on portable tokenomics and retains a valuable report-only, no-secret boundary. Current Claude sources govern memory, settings, MCP, instruction precedence, overrides, and runtime state; Headroom remains supporting house policy.

## Mechanical trace and limits

Four tests, publication sync, type-checking, and focused audit pass. They prove a narrow filesystem inventory, not effective-session observation. The checker calls project settings `model` effective despite CLI, environment, local, and managed overrides and `/status` runtime evidence.

It reads only two root instructions, root settings, root `.mcp.json`, a guessed memory path, and skill/server names. Current Claude surfaces also include ancestor and local instructions, `.claude/CLAUDE.md`, rules, importer-relative imports, configurable memory, plugins, connectors, approvals, and active MCP state. Missing evidence becomes informational or not applicable. Import resolution is root-relative rather than importer-relative and omits documented code-span/fence and depth behavior.

Character estimates are marked approximate, but loaded tokens, tool schemas, compaction, billing, active model, and runtime MCP remain unavailable. The catalogue also reads user-home state without declaring that scope. There is no exact adapter eval; portable evals are obsolete, and tests cover only simple model override and no-write behavior.

## Candidate improvements

1. Distinguish declared filesystem configuration from session-effective model and mark unobserved runtime facts unavailable.
2. Add a bounded source-grounded resolver for hierarchy, local/rules/imports, memory overrides, and MCP configuration with negative fixtures.
3. Clarify user-home authority before expanding observation; keep session commands and more private state behind a separate privacy decision.
4. Replace obsolete evals with unavailable-state, override, import-containment, and no-secret scenarios.

## Carry-forward criteria

Filesystem inventory may pass only observed physical files. Effective model, loaded context, active tools/approvals, and measurement remain unavailable until an authorized session-level source proves them.

## Local evidence

- `skills/environment/ki-tokenomics-claude/SKILL.md`
- `skills/environment/ki-tokenomics-claude/references/standards-claude-tokenomics.md`
- `skills/environment/ki-tokenomics-claude/references/sources.md`
- `skills/environment/ki-tokenomics-claude/scripts/rubric/contexts/claude.ts`
- `skills/environment/ki-tokenomics-claude/scripts/rubric/contexts/claude.test.ts`
- `evals/scenarios/ki-tokenomics.ts`
