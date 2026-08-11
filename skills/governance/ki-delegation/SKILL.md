---
name: ki-delegation
ki-kind: governance
ki-depends-on: []
ki-shared-dependencies: [ki-skills:rubric]
description: >
  Governs coordinator-first delegation for substantial bounded agent work: the suitability decision, human-facing coordinator responsibilities, sandboxed worker packets, rolling worker replenishment, and safe mechanical checks. Use when deciding whether the current agent should coordinate subagents, designing or auditing a delegation packet, or making an approved plan ready for delegation. It augments runtime subagent delegation only when active in the same scope; model-purpose policy belongs to ki-tokenomics; cross-repository work transfer is ki-trades.
argument-hint: 'audit <repo> | conform <repo> | educate <work-item> | help | refresh'
---

# Knowledge Islands delegation standard

`ki-delegation` owns the portable coordinator-first suitability decision and the quality of an explicit delegation packet embedded in a governed work record.

It does not select work, authorise execution, choose a model, spawn a worker, accept results, or transfer work between repositories.

Read [the delegation-packet standard](references/standards-delegation-packets.md) before deciding whether to delegate or designing a packet, [the generated rubric](references/rubric.md) for its mechanical and judgment criteria, and [the sources](references/sources.md) when refreshing the standard.

When active during authorised execution, substantial work with safe independent lanes defaults to the primary agent becoming the coordinator and dispatching bounded runtime subagents. The coordinator remains the human-facing thread and retains requirements, decisions, authority, dependency ordering, integration, verification, and final accountability. Quick, tightly coupled, context-heavy, overlapping, or interaction-intensive work stays with the primary agent.

This standard supplies the suitability and packet contract to an executing process such as `ki-implement`; it is not an execution command and does not depend on repository orientation prose to take effect.

Independent worker capacity is used as a rolling pool: after the coordinator verifies and integrates one completed worker result, it assigns that worker the next independent bounded lane without waiting for other workers in the initial set. Rounds record only genuine ordering or dependency gates. `ki-batch` remains the separate process for an explicitly authorised set of distinct work records; it does not describe ordinary rolling worker utilisation.

## Operating modes

Carries the universal **AUDIT · CONFORM · EDUCATE · REFRESH** modes.

Invoked as `help` / `-h` / `?`, it explains this boundary and stops.

### Mode AUDIT

Run `ki repo audit --skill ki-delegation --repo <repo>`.

The native rubric inspects only delegation packets: a roadmap record opts in by carrying `## Delegation` with a `### Rounds` section.

It checks the mechanically legible packet shape, then reviews whether the coordinator-first decision, packet partitioning, model choices, locked decisions, authority, isolation, escalation boundaries, return contract, and verification gates are actually sound.

Ordinary `## Delegation` plan notes without the packet marker remain under `ki-change-management-roadmap` and are not a failure here.

### Mode CONFORM

Run `ki repo conform --skill ki-delegation --repo <repo> --dry-run` before applying it.

CONFORM makes no authored packet-content change.

It never creates a packet, chooses a worker, model, or round, invents a locked decision, alters an escalation boundary, or grants execution authority.

### Mode EDUCATE

For one explicitly selected approved work record, explain or add the packet shape from [the delegation-packet standard](references/standards-delegation-packets.md).

Ask the planner to supply every semantic value; EDUCATE never guesses the delegation design.

### Mode REFRESH

**Precondition:** REFRESH writes only this canonical skill under `ki-agentic-harness`.

When invoked from an installed copy, stop and redirect to the harness.

Read [the sources](references/sources.md), compare durable delegation practice and its sources against [the standard](references/standards-delegation-packets.md) and rubric, then update the source review in the same commit as any normative change.

### Mode HELP

Explain the coordinator-first suitability decision, delegation-packet boundary, runtime subagent delegation, model-purpose policy in `ki-tokenomics`, and cross-repository transfer in `ki-trades`.

## Notes

- A packet makes a runtime subagent brief durable, sandbox-conscious, and reviewable; it is not a separate execution lifecycle.
- The local rubric is the materialised domain contract; generic execution, reporting, transaction safety, and publication remain owned by `ki`.
