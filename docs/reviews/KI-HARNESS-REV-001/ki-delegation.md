# `ki-delegation` effectiveness review

- **Position:** 6 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `e6c91dc52d2307ac2a8c3c4b766e32df124dfbba` plus current-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none; optional consumer relationships from `ki-implement` and `ki-batch` are not executable dependencies.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain a smaller durable-governance delta; remove runtime-default advice, duplicated execution guidance, and unproven ceremony before grading.
- **Change state:** applied in `ba4bd18a`.

## Sources and mechanics

`ki repo audit --skill ki-delegation --repo .` passed with `FAIL=0 WARN=0`. Its focused delegation test passed 15 tests and 15 assertions.

The two tracked sources were re-fetched: [OpenAI's Codex subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents) and [Anthropic's Claude Code subagent guidance](https://code.claude.com/docs/en/sub-agents). Both runtimes already teach the core suitability rule: use subagents for independent, bounded, self-contained work; keep quick or tightly coupled work in the main thread; restrict permissions where appropriate; and return concise summaries. The local source record now contains resolvable links, but its REFRESH test should explicitly compare the skill's unique governance delta rather than only the runtime feature lists.

## Selection and outcome effectiveness

The description selects durable delegation-packet design and audit, but it also claims ordinary suitability, coordinator duties, rolling utilisation, and mechanical checks that current runtimes or process skills already cover. This makes false activation likely for normal runtime delegation that needs no durable work-record instrument.

The defensible residual value is narrower: an approved roadmap record can preserve worker authority, isolation, escalation, verification, and return boundaries in a portable, auditable packet. That is a Knowledge Islands governance delta. The generic independent-work heuristic, concise result handoff, permission restriction, and coordinator focus are no longer sufficient reasons for a separate skill.

## Instruction economy and architecture

The packet requires ten fields per worker plus locked decisions, escalation, rounds, and a rolling-pool plan. That structure can be valuable for risky or long-lived delegated implementation, but it is disproportionate for ordinary read-only research and review lanes. The current skill does not state a sufficiently high threshold for opting into that ceremony.

`ki-implement` repeats substantive suitability and coordinator guidance, while `ki-delegation` describes ordinary execution behavior that belongs in the runtime or process owner. The skill should own only the durable packet and its cross-runtime governance delta. Rolling-pool instructions are runtime-sensitive operating advice and should not be universal policy unless evaluation shows a stable benefit.

## Executability and safety

The contract is conservative: the coordinator remains human-facing, workers receive explicit authority and isolation, proposals require coordinator verification, and escalation stops unsafe or ambiguous work. These boundaries improve safety for delegated mutation.

The checker verifies headings and non-empty fields only. It cannot determine whether delegation was suitable, authority is actually safe, lanes overlap, model selection is appropriate, or verification occurred. Its clean result must not be presented as proof of delegation quality.

## Evidence and gaps

The focused tests prove packet shape, including exact headings and required worker fields, but not whether those fields improve outcomes. Existing scenarios are recall-oriented and have no checked-in current result evidence. There is no cross-runtime assisted-versus-baseline evaluation of the unique durable-packet delta, nor evidence that rolling replenishment or all ten fields outperform a smaller brief.

This overnight review itself supplies qualitative evidence: durable locked decisions and authority limits helped constrain independent workers, while repeating the full ten-field block for read-only skill reviews added substantial roadmap text without changing worker capability. That observation is informative but not a controlled grade.

## Proposed remediation

These proposals are not approved implementation:

1. Narrow activation to delegated work whose risk, duration, handoff, or audit needs justify a durable record.
2. Retain portable authority, isolation, escalation, verification, and return boundaries; defer ordinary subagent suitability and reporting guidance to current runtime documentation.
3. Remove duplicated coordinator procedure from either `ki-delegation` or its process consumers, leaving one clear owner for each rule.
4. Test a smaller packet against the ten-field form and treat rolling replenishment as runtime-specific guidance unless it proves a stable portable benefit.
5. Add cross-runtime assisted-versus-baseline scenarios that measure missed constraints, unsafe authority, integration defects, context cost, and completion time.

No new skill, agent, hook, or standalone script is proposed.

## Applied changes

**State:** applied in `ba4bd18a`.

Narrowed activation to durable high-risk handoffs and reduced the packet to its portable authority, isolation, escalation, verification, return, and checkpoint fields. Ordinary scheduling, model choice, worker selection, and coordination remain with runtime/process owners. Existing packets, rubric fixtures, and evals were migrated to the current contract.
