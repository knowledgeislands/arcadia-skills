---
name: ki-communication
ki-kind: process
ki-depends-on: []
description: >
  Calibrate collaboration communication without reducing delivery rigor. Use when a user asks for quieter or more detailed updates, wants to establish response or session verbosity, needs to set a repository communication convention, or asks to reduce noisy tool and test output. Applies one explicit communication level — quiet, standard, or detailed — with current-thread requests overriding repository instructions, repository instructions overriding user-wide defaults, and the skill default last. A process skill: it sets the interaction contract; it does not govern product or repository content. Triggers: "be more concise", "less noise", "show more detail", "verbosity", "communication level", "quiet mode", "detailed updates", "/ki-communication".
argument-hint: 'help | [quiet|standard|detailed]'
---

# ki-communication

**Kind:** process. Set the information density and update cadence for this collaboration without changing the work's correctness, safety, or evidence.

## Set the level

Use the first explicit setting that applies, in this order:

1. A request in the current thread or session.
2. The selected repository's `AGENTS.md` or equivalent orientation.
3. The user's shared instructions.
4. This skill's default: `standard`.

Treat natural language such as “keep this brief”, “show your working”, or “only tell me if something fails” as an explicit session setting. Apply a changed setting immediately. Ask only when the requested level is ambiguous and would materially affect the handoff.

## Levels

`quiet`

- Give the outcome, necessary decision or blocker, and only material risks.
- Do not send routine progress updates or successful verification detail.

`standard` — default

- Lead with the outcome.
- Report a material phase change, decision, blocker, or exception; otherwise work silently.
- Summarise verification as passed or failed. Include its detail only when it changes the next action.

`detailed`

- State the plan, meaningful progress, validation evidence, and relevant rationale.
- Keep raw command output compact; provide full logs only on request or when diagnosing a failure.

## Preserve signal

- Never omit an error, safety concern, required approval, irreversible action, or material uncertainty because a quieter level is active.
- Prefer a compact reporter, filtered output, or an outcome summary over exposing routine command logs.
- Keep evidence available for inspection, but do not make passing evidence the handoff's centre of gravity.
- Repository-local instructions may select a level for that repository; a user's current-thread request always wins.
