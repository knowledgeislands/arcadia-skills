# Sources — where the standard comes from

**Refresh:** external-spec · monthly

The sources behind [the subagent-definitions standard](standards-subagent-definitions.md) and its [rubric](rubric.md). Mode REFRESH reads this file, re-fetches each source, diffs it against the standard + rubric, then **bumps the `last reviewed` dates** and refreshes the `## Last review` block below (what changed is recorded in the commit, not a changelog). This is the skill's memory of where best practice comes from — keep it current.

Abbreviations match the `(SOURCE)` tags in [the standard](standards-subagent-definitions.md) and [rubric](rubric.md).

## Authoritative

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| CC | [Claude Code — subagents][cc] | Subagent file format, the frontmatter spec set,[^cc] invocation control | 2026-08-10 |
| BP | [Skill authoring best practices][bp] | Description, conciseness, least-privilege, evaluation-first † | 2026-08-10 |
| A2A | [Agent2Agent protocol][a2a] | Remote-agent discovery plus task lifecycle and status updates | 2026-07-17 |

[^cc]: Full set: `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`.

† Description writing, conciseness, least-privilege, and evaluation-first — all applied to agents.

## Community / practitioner

| Tag  | Source                                          | Governs                            | Last reviewed |
| ---- | ----------------------------------------------- | ---------------------------------- | ------------- |
| COM1 | [awesome-claude-code-subagents (VoltAgent)][c1] | Example agent definitions (100+) ‡ | 2026-08-10    |
| COM2 | [Sub-agent best practices (PubNub)][c2]         | Production patterns §              | 2026-06-26    |

‡ Patterns for tool scoping, model routing, and description quality.

§ SubagentStop hooks, the skills+hooks+subagents trinity, and concurrent agent limits.

## In-house

| Tag | Source | Governs | Last reviewed |
| --- | --- | --- | --- |
| HOUSE | The harness `subagents/README.md` + the role-prompt shape | Layout and the role/lane prompt pattern ¶ | 2026-08-10 |

¶ Grounding, lane disambiguation, and KB-note wikilinks.

## Last review

REFRESH last run **2026-08-10**. Re-fetched CC and BP live; A2A and COM2 proxy-blocked (carried); COM1 and HOUSE re-verified.

- **CC (Claude Code subagents docs, 2026-08-10):** re-fetched live. Core 16-field set unchanged. Three platform-level additions since 2026-07-04 not yet reflected in the standard — see watch-items.
- **BP (platform best-practices, 2026-08-10):** re-fetched live. Third-person description, specific trigger phrases, least-privilege, evaluation-first, and the caps (name ≤ 64, desc ≤ 1024) all unchanged. No rubric drift.
- **A2A (a2a-protocol.org):** proxy-blocked this pass — `last reviewed` carried from 2026-07-17. Still a watch source; no conformance requirement on local definitions.
- **COM1 (awesome-claude-code-subagents, 2026-08-10):** re-fetched; 154+ community agents reviewed. No non-spec frontmatter fields observed. Confirms PROC-1 patterns.
- **COM2 (PubNub best practices):** proxy-blocked this pass — `last reviewed` carried from 2026-06-26. `SubagentStop`-hook pattern (FM-7) unchanged.
- **HOUSE (harness subagents/README.md, 2026-08-10):** re-verified. Five governance agents in `subagents/governance/`; role/lane prompt shape and KB-wikilink divergence unchanged.
- **Open watch-items:**
  - **`permissionMode` seventh value (`manual`).** Added v2.1.200 as an alias for `default`. FM-3 currently lists six values. Enumerate all seven on the next CONFORM pass.
  - **`name` colon restriction.** v2.1.218 documents that `:` is reserved for plugin scoping. No NAME criterion encodes this constraint. Add on the next CONFORM pass.
  - **`effort` level enumeration.** FM-8 describes the field; the five levels (low / medium / high / xhigh / max) are not enumerated explicitly. Add on the next CONFORM pass.
  - **Adjacent surfaces (agent-view / agent-teams).** Carried from 2026-07-04. Watch whether house practice starts authoring these and whether they warrant their own governance surface.
  - **`SubagentStop`-hook enforcement (COM2).** Carried. FM-7 codifies the field; re-examine once a live governance agent uses a scoped hook.
  - **A2A / COM2 proxy-blocked.** Re-fetch on the next pass.

[cc]: https://code.claude.com/docs/en/sub-agents
[bp]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
[a2a]: https://a2a-protocol.org/latest/
[c1]: https://github.com/VoltAgent/awesome-claude-code-subagents
[c2]: https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/
