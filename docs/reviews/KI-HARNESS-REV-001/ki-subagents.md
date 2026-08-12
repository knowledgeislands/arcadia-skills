# `ki-subagents` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised
- **Identity:** position 26 of 50; governance; no declared dependency; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-subagents` owns the quality of the Harness's Claude-oriented source payload. The runtime's permissions, tools, memory, isolation, worktree, and delegation controls justify a runtime-specific governance capability beyond `ki-skills` and `ki-delegation`.

The checker audits `subagents/`, not installed `.claude/agents` or user agents. SDR-002 confirms Claude Markdown and Codex TOML definitions are incompatible projections. The source-payload boundary is coherent, but the proposed portable conceptual core remains unproven.

## Mechanical trace and limits

The hosted audit and publication pass; six focused tests with 188 assertions cover catalogue shape, filename diagnostics, subject creation, symlink refusal, and publication. The 83-line entrypoint is economical.

Material gaps remain:

- Current Claude documentation differs on name grammar, permission aliases, plugin-scoped identity, omitted `background`, typed spawn allowlists, and nesting depth.
- The skill claims parsed frontmatter, but the checker uses a handwritten line matcher and delimiter regex; malformed YAML can appear valid.
- There is no malformed-YAML, current field-set, plugin identity, background/default-tool, or installed-runtime fixture.
- Three regex evals test recall, not lane adherence, permission behavior, memory, tool restriction, or assisted outcomes.
- Monthly source refresh is overdue.

## Candidate improvements

1. Refresh every Claude field/default claim and align the standard, rubric, checker, publication, tests, and evals together.
2. Replace delimiter recognition with real YAML parsing and fail-closed malformed-input fixtures.
3. Establish the boundary among portable concept, source payload, runtime projection, and installed activation.
4. Add real subagent-run outcome evidence before claiming operational effectiveness.

## Carry-forward criteria

Runtime-bound skills must refresh vendor defaults and capabilities. A parser claim requires actual parse failure evidence. Source payload, runtime projection, and installed activation are distinct contracts and cannot inherit assurance from one another.

## Local evidence

- `skills/agentic-systems/ki-subagents/SKILL.md`
- `skills/agentic-systems/ki-subagents/references/standards-subagent-definitions.md`
- `skills/agentic-systems/ki-subagents/references/sources.md`
- `skills/agentic-systems/ki-subagents/scripts/rubric/contexts/agents.ts`
- `skills/agentic-systems/ki-subagents/scripts/rubric/items/index.test.ts`
- `evals/scenarios/ki-subagents.ts`
- `docs/decisions/SDR-KI-HARNESS-002-runtime-portable-contracts-and-executor-positioning.md`
