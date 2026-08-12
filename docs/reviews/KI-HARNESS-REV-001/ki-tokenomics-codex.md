# `ki-tokenomics-codex` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 5 remediation is authorised
- **Identity:** position 48 of 50; governance; depends on `ki-tokenomics` at position 46; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-tokenomics-codex` correctly depends on portable tokenomics and maintains an appropriate no-value, no-write boundary. Current official Codex documentation is authoritative for configuration, instruction chains, MCP, skills, memories, and custom agents.

## Mechanical trace and limits

Four tests, publication sync, type-checking, and focused audit pass. The published surface criterion claims all documented configuration, instruction, skill, MCP, memory, and subagent surfaces, but code checks only user config, root `AGENTS.md`, three skill directories, and an incorrect `.agents/agents` path.

Current Codex documents trusted project configuration, root-to-working-directory instruction chains and overrides, `~/.codex/memories/`, and agents in user or project `.codex/agents/`. The adapter incorrectly reports no documented persistent memory. Model/profile/CLI selection, active MCP, server instructions, tools, trust, and per-chat memory remain effective-session state that filesystem presence cannot prove.

Tests create only one repository skill directory and assert absence of a secret string plus four unavailable results. There is no exact adapter eval; shared evals are retired Claude-specific cases. The adapter's blanket unavailability for compaction and transcripts also conflicts with `ki-recap`'s version-sensitive evidence, requiring an ownership decision without expanding transcript access.

## Candidate improvements

1. Implement a source-grounded bounded inventory for project config, instruction chains, memories, and correct agent paths with negative fixtures.
2. Mark model, active MCP, trust, memory use, and context composition unavailable until an authorized runtime evidence source exists.
3. Reconcile recap and tokenomics ownership for transcript and compaction evidence without granting new inspection or lifecycle authority.
4. Replace retired shared evals with observed-versus-unavailable, privacy, and current-path scenarios.

## Carry-forward criteria

A runtime adapter may pass only documented, non-secret structure it directly observes. Configuration, model, memory, MCP, transcripts, and compaction need explicit observed/unavailable state and cannot become effective-session evidence by inference.

## Local evidence

- `skills/environment/ki-tokenomics-codex/SKILL.md`
- `skills/environment/ki-tokenomics-codex/references/sources.md`
- `skills/environment/ki-tokenomics-codex/scripts/rubric/contexts/codex.ts`
- `skills/environment/ki-tokenomics-codex/scripts/rubric/items/surface.ts`
- `skills/environment/ki-tokenomics-codex/scripts/rubric/items/not-applicable.ts`
- `skills/environment/ki-tokenomics-codex/scripts/rubric/contexts/codex.test.ts`
- `docs/reviews/KI-HARNESS-REV-001/ki-recap.md`
