# AGENTS.md — ki-agentic-harness

**This is the common, runtime-neutral orientation** for any agent working in this repo — the [open agents.md standard](https://agents.md/), read directly by Codex and imported by `CLAUDE.md` for Claude Code. Put shared guidance here; keep only genuinely runtime-specific notes in per-runtime files.

The README is the entry point; [the overview](https://knowledgeislands.info/guidance/using-ki/), [skills map](https://knowledgeislands.info/guidance/skills/), and [roadmap](ROADMAP.md) supply detail. This file is the short anchor.

## What this repo is

The canonical home for Knowledge Islands [Agent Skills](https://agentskills.io/). Governance skills hold a standard, universal **EDUCATE / AUDIT / CONFORM / REFRESH** modes, and a checker; lightweight process skills drive a lifecycle. The [skills map](https://knowledgeislands.info/guidance/skills/) is the authoritative taxonomy and composition graph.

## Five-part bundle status

| Part | Directory | Status |
| --- | --- | --- |
| Skills | `skills/` | **Populated** — the governance `ki-*` skills |
| Subagents | `subagents/` | **Populated**† — governance sub-agents in `subagents/governance/` |
| MCP servers | `mcp/` | **Shelf** — scaffolded, no servers yet |
| Evals | `evals/` | **Populated (partial)** — scenarios + result matrices in `evals/` |
| Hooks | `hooks/` | **Populated (partial)**† — three global Claude Code hooks (plan lifecycle + stale Git-lock guard) + payload installer |

† Agents and Hooks are Claude-Code-specific today; multi-runtime support (Claude Code + OpenAI Codex CLI) is a targeted future effort — see `SDR-KI-HARNESS-002-runtime-portable-contracts-and-executor-positioning.md` and the [runtime parity scorecard](docs/decisions/references/runtime-parity-scorecard.md).

## How skills relate

Skills compose rather than extend: a skill runs a sibling's mode in sequence and adds its delta, declaring the edge in `ki-depends-on:`. An optional capability is declared separately in `ki-optional-depends-on:`; it is used only when active in the same scope and never blocks the parent. Repo variation is declared in `.ki-config.toml` or orientation guidance, never forked into a base-specific skill. See the `ki-skills` rubric and `ADR-KI-HARNESS-SKILLS-004`.

## Working here

- **Cross-repository choreography** — Arcadia Principal, the harness, `tools-ki`, KI Specifications, and the KI Website may add a concrete handoff item to one another's Stream or roadmap. The receiving repository owns its priority, plan, and execution. Record the originating item and whether the handoff `blocks` or is `blocked by` the local item; prefer independently executable work over a blocking dependency.
- **Delegation** — when bounded independent work materially helps, use runtime subagents while retaining orchestration, review, and integration. When `ki-delegation` is active in the same user or repository scope, read its standard before creating a durable delegation packet; otherwise do not claim a governed packet.
- **Writing or editing a `SKILL.md`** → follow the `ki-skills` rubric: run `ki repo audit --skill ki-skills` for the mechanical half and apply the judgment half by reading. The directory name **is** the `name:` frontmatter.
- **Adding a `ki-skills` rubric criterion** → pick the next code number by scanning the complete family under `skills/keystone/ki-skills/scripts/rubric/items/`. The structured catalogue is authoritative; `references/rubric.md` is its generated publication. Keep the item private to its family module and regenerate the publication with `ki dev skill rubric ki-skills --write`.
- **Markdown / TOML style** → the `ki-authoring` conventions. Until its catalogue reaches the final session contract, run rumdl directly for Markdown; TOML remains judgment-only. Wide tables → footnotes; relative Markdown links, never wikilinks; refer to another skill by its `name`, never a file path.
- **The toolchain** (package.json scripts, `tsconfig`, Biome) → the `ki-engineering` standard. Until its catalogue reaches the final session contract, use the direct tools (`biome`, `tsc`, `knip`, and `syncpack`) rather than restoring package aliases.
- A change touching a standard another skill cites is **cross-skill** — keep the set internally consistent (the skills linter's cross-skill pass flags collisions).
- **Recapping a session** (a prompt like "summarise what has happened, what is outstanding, and what lessons could be captured") — a ROADMAP item **added during the session** counts as _what happened_, not as _outstanding_. Parking work on the ROADMAP is a completed action here (the roadmap **is** the durable home for deferred work), so recording it discharges it — do not then re-list it under outstanding. Outstanding means threads left mid-change, unaddressed in the repo: uncommitted edits, a failing gate, a decision still open, work neither done nor parked.
- **Committing** — `ki-git` owns the portable commit shape, branch-selection guidance, and Git hygiene. This repo's local delta is a solo direct-to-`main` workflow with no PR/review gate: small, focused, verified changes may commit directly; reserve branches for an isolated review boundary. This repo is often dirty with unrelated in-flight work — stage only the files a given piece of work actually changed, by explicit path, never a blanket add. The pre-commit hook runs `lint-staged`, TypeScript for staged `.ts` changes, and `ki repo audit --skill ki-skills` against a staged snapshot containing only the touched skill roots. Expand that direct-CLI coverage as each remaining catalogue reaches the final session contract; do not restore retired aliases or wrappers.
- **Current-state migrations** — make the contract correct for the current repository, then make every existing footprint conform to it. Do not retain legacy switches, compatibility shims, fallbacks, or dual paths unless the user explicitly requests a transition period.
- **Recoverable history** — after each independently verified, sensible unit of work, make an explicit-path commit so the repository remains recoverable and the history explains the change. Do not wait for an entire multi-step roadmap item before committing its completed units.
- **Repository activation** — `ki repo audit`, `ki repo conform`, and `ki repo educate` run the skills declared by `.ki-config.toml`; `--skill` narrows that declared set to one governing capability. User-level installation does not add a skill to repository audit scope.
- **Verification gates** — run `bun run test`, `bunx tsc --noEmit`, and the relevant direct `ki repo audit --skill <skill>` sequentially. Record known fleet findings separately from contract or test failures; do not restore a legacy executor to make an intermediate migration green.

## Toolchain

[Bun](https://bun.sh) for install/dev; `bun install` wires the husky pre-commit hook.

The repository executor is `ki`; the retired `.ki` aggregate and package aliases are not compatibility surfaces. `ki repo audit` is read-only, `ki repo conform --dry-run` validates and reports proposed changes, and `ki repo conform` publishes host-validated changes. During the catalogue cutover, only capabilities already on the final `createSession` contract are expected to execute.

```bash
ki repo audit --skill ki-skills             # current proven skill-quality audit
ki repo conform --skill ki-skills --dry-run # validate and report safe proposals
ki dev skill rubric ki-skills               # verify generated rubric publication
bun run test                                # harness source tests
bunx tsc --noEmit                           # TypeScript gate
```

Install/link paths are runtime-specific — see `CLAUDE.md` for Claude Code (`~/.claude/skills`, `.claude/agents`) and the [runtime parity scorecard](docs/decisions/references/runtime-parity-scorecard.md) for how Codex differs (`.agents/skills`, `~/.codex/`).
