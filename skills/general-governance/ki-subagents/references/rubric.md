<!-- GENERATED FILE: produced by `ki skill rubric`. Do not hand-edit; edit scripts/rubric/index.ts, then rerun `ki skill rubric <skill> --write`. -->

# Rubric — ki-subagents

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/index.ts` are canonical. Edit that definition, then rerun `ki skill rubric <skill> --write`.

## Contents

- [LAY — File and frontmatter layout](#lay--file-and-frontmatter-layout)
- [NAME — Frontmatter name](#name--frontmatter-name)
- [DESC — Frontmatter description](#desc--frontmatter-description)
- [FM — Frontmatter tools and model](#fm--frontmatter-tools-and-model)
- [PROMPT — System-prompt quality](#prompt--system-prompt-quality)
- [LANE — Lane and delegation](#lane--lane-and-delegation)
- [LINK — Linking](#link--linking)
- [PROC — Process and evaluation](#proc--process-and-evaluation)
- [LONG — Longevity](#long--longevity)
- [COLL — Cross-agent collision](#coll--cross-agent-collision)

## LAY — File and frontmatter layout

- **LAY-1 [FAIL · INSPECT] — Agent file and frontmatter layout**
- **LAY-2 [J] — Path-independent identity**
  > Grouping subdirectories are for human organisation only; identity is name, not path.
- **LAY-3 [WARN · INSPECT] — Filename and name alignment**

## NAME — Frontmatter name

- **NAME-1 [FAIL · INSPECT] — Name present**
- **NAME-2 [FAIL · INSPECT] — Name characters and length**
- **NAME-3 [FAIL · INSPECT] — Name hyphen placement**
- **NAME-4 [FAIL · INSPECT] — Name safety**
- **NAME-5 [FAIL · INSPECT] — Unique name**
- **NAME-6 [J] — Specific role name**
  > name is a specific role, not generic (engineering-lead, not helper/assistant).

## DESC — Frontmatter description

- **DESC-1 [FAIL · INSPECT] — Description present**
- **DESC-2 [WARN · INSPECT] — Description soft length cap**
- **DESC-3 [FAIL · INSPECT] — Description XML safety**
- **DESC-4 [J] — Ownership and delegation signal**
  > States both what the agent owns and when to delegate to it.
- **DESC-5 [J] — Third-person description**
  > Written in the third person, never first/second person.
- **DESC-6 [J] — Concrete request cues**
  > Includes concrete cues a request would carry (the role's nouns/verbs).
- **DESC-7 [J] — Specific description**
  > Avoids vague phrasing ("helps with engineering").

## FM — Frontmatter tools and model

- **FM-1 [J] — Least-privilege tools**
  > `tools` / `disallowedTools`, if set, is least-privilege — only what the role needs (omitting inherits all, the wrong default for a narrow role). An advisory agent carries no write/exec tools.
- **FM-2 [J] — Deliberate model choice**
  > `model` is deliberate: `inherit` by default, a pin (a Claude alias `sonnet` / `opus` / `haiku` / `fable`, not a rot-prone full id) only with a stated reason. The reason should trace to the portable model type the role needs (`fast` / `standard` / `reasoning` / `frontier` — `ki-tokenomics`, ADR-KI-HARNESS-009), of which the alias is this runtime’s resolution.
- **FM-3 [J] — Current frontmatter fields**
  > Every frontmatter field is in the current subagents spec set — `name`, `description`, `tools`, `disallowedTools`, `model`, `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation`, `color`, `initialPrompt`. A field outside this set is flagged as a portability risk.
- **FM-4 [J] — Deliberate permission mode**
  > `permissionMode`, if set, is deliberate, and `bypassPermissions` (which skips permission prompts) carries a stated reason.
- **FM-5 [J] — Deliberate skill preload**
  > `skills`, if set, preloads a named skill’s full content at startup — use only when the role must always have that standard before acting and runtime discovery would be fragile. For optional or situational context, prefer grounding-at-runtime.
- **FM-6 [J] — Deliberate memory**
  > `memory`, if set (`user` / `project` / `local`), enables cross-session accumulation — set only when the role genuinely needs state across sessions; the system prompt should describe what to learn and how to apply it.
- **FM-7 [J] — Scoped hooks**
  > `hooks`, if set, are scoped to this subagent — use for invariants local to this role. Prefer project-level `settings.json` hooks for workspace-wide rules; state the invariant each scoped hook enforces.
- **FM-8 [J] — Deliberate reasoning effort**
  > `effort`, if set, pins reasoning effort for this agent — `low` for mechanical/high-volume roles; `high`+ for deep-analysis roles where extra reasoning is load-bearing. Prefer inheriting when the session effort is appropriate.
- **FM-9 [J] — Deliberate worktree isolation**
  > `isolation: worktree`, if set, runs the agent in a fresh git worktree — use only when the role makes file edits that could conflict with the caller’s working tree; do not use it for read-only or advisory roles.
- **FM-10 [J] — Deliberate background execution**
  > `background: true`, if set, always runs the agent as a non-blocking background task — use when the caller does not need to wait for the result; otherwise omit it.
- **FM-11 [FAIL · INSPECT] — Tier-agnostic model**

## PROMPT — System-prompt quality

- **PROMPT-1 [FAIL · INSPECT] — System-prompt body present**
- **PROMPT-2 [J] — Role and lane opening**
  > Opens with role & lane — what it owns and, explicitly, what it does not.
- **PROMPT-3 [J] — Grounding before action**
  > Grounding: names the sources it must read before acting and requires citing them, not reasoning from memory.
- **PROMPT-4 [J] — When-invoked procedure**
  > A short ordered when-invoked procedure (clarify → read → reason → produce).
- **PROMPT-5 [J] — Own-versus-defer boundary**
  > An explicit own-vs-defer list naming the siblings it hands work to.
- **PROMPT-6 [J] — Safe write guidance**
  > If it may write, requires confirm-before-write and house conventions, stating the why alongside each rule.
- **PROMPT-7 [J] — Focused prompt**
  > Focused on one role, consistent terminology, no token spent on what Claude already knows.

## LANE — Lane and delegation

- **LANE-1 [J] — Distinct lane**
  > The agent owns a distinct lane; its boundary keeps it from overlapping siblings.
- **LANE-2 [J] — Reciprocal hand-offs**
  > Where a sibling is genuinely adjacent, each names the other as the hand-off — reciprocal, not one-directional.
- **LANE-3 [J] — Bounded coordinator tools**
  > A coordinator agent — one that spawns subagents — restricts which agents it may spawn via `Agent(type)` in `tools` (e.g. `tools: Agent(worker, researcher)`). Its own-vs-defer boundary declares which agents it orchestrates and why; an unrestricted coordinator is a blast-radius risk.
- **LANE-4 [J] — Bounded nesting depth**
  > Subagents may nest to a depth of at most five. A coordinator’s system prompt declares its spawn depth so callers can reason about total depth. Avoid nesting unless hierarchical decomposition genuinely helps; flat fan-out is simpler and easier to audit.
- **LANE-5 [J] — Coordinator progress visibility**
  > A coordinator’s system prompt owns progress visibility for long-running/background work: it announces the next checkpoint, reports phase completion and material blockers, and uses the caller’s cadence or five-minute default. Workers report to the coordinator; the coordinator updates the caller.

## LINK — Linking

- **LINK-1 [FAIL · INSPECT] — Resolvable relative links**
- **LINK-2 [J] — Allowed knowledge-base wikilinks**
  > `[[wikilinks]]` to KB notes are allowed here (a grounded agent cites its notes) and are not a defect, unlike in a `SKILL.md`.
- **LINK-3 [J] — Name-based composition references**
  > Other agents/skills are referred to by name, never by file path.

## PROC — Process and evaluation

- **PROC-1 [J] — Representative in-lane evaluation**
  > Exercised on representative in-lane tasks — does it stay in lane, ground itself, and defer correctly?
- **PROC-2 [J] — Cross-model evaluation**
  > Tested across the models it will run under.

## LONG — Longevity

- **LONG-1 [J] — Volatile fact handling**
  > Volatile facts (model IDs, tool names, note paths, dated specifics) are resolved at runtime (read the live KB, prefer `model: inherit`) or covered by a refresh path — prefer grounding-at-runtime over baked-in facts.

## COLL — Cross-agent collision

- **COLL-1 [WARN · INSPECT] — Distinct quoted trigger phrases**
- **COLL-2 [J] — Reciprocal collision off-ramps**
  > Where two agents could take one request, each names the other as the off-ramp; a one-directional guard is a half-fix.
