# Delegation sources

**Refresh:** external-spec · quarterly

| Source | Last reviewed | Governs |
| --- | --- | --- |
| Knowledge Islands delegation practice | 2026-08-05 | Durable briefs, cold-agent readiness, rounds, gates, and coordinator review |
| `ki-tokenomics` | 2026-08-05 | Minimum-viable model purpose and cost boundary |
| `ki-change-management-roadmap` | 2026-08-05 | Work-record lifecycle, plan ownership, and review boundary |
| [OpenAI: Codex subagents][openai-subagents] | 2026-08-11 | Coordinator focus and sandbox inheritance |
| [Anthropic: Claude Code sub-agents][anthropic-subagents] | 2026-08-11 | Task fit, restricted capabilities, and isolation |

## Last review

The 2026-08-11 review confirmed shared portable principles across both vendor guides: keep requirements and decisions with the main agent, delegate self-contained lanes into isolated contexts, narrow worker tools and permissions, and return distilled evidence for coordinator integration. The standard deliberately excludes vendor model names, configuration fields, nesting rules, concurrency limits, and user-interface behaviour.

Re-review quarterly or when either guide changes its delegation, isolation, permission, or background-execution semantics. Watch whether the runtimes converge on a portable way to enforce per-worker authority; until then, packets describe the required boundary and executing processes must choose a runtime mechanism that can honour it.

[anthropic-subagents]: https://code.claude.com/docs/en/sub-agents
[openai-subagents]: https://learn.chatgpt.com/docs/agent-configuration/subagents
