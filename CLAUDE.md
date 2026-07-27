# CLAUDE.md — ki-agentic-harness

@AGENTS.md

The runtime-neutral orientation for this repo lives in [AGENTS.md](AGENTS.md), imported above — read it first. **This file holds only Claude-Code-specific notes.** When you add or change orientation guidance, put it in `AGENTS.md` by default; only keep a note here if it is genuinely Claude-Code-only (a `.claude/` path, a Claude-Code tool or setting). Common guidance written in `CLAUDE.md` is invisible to Codex and the 20+ other tools that read `AGENTS.md` — so a shared rule placed here silently fails to reach them.

## Claude Code specifics

- **Install/link paths** — `ki bootstrap` installs the core user skills into `~/.claude/skills`; `ki skill repo add` manages repository-scoped links under `.claude/skills` and `.agents/skills`. Harness contributors use `ki dev on <checkout>` to make the installed canonical harness follow this checkout. Codex uses `.agents/skills` and `~/.codex/` — see the [runtime parity scorecard](docs/decisions/references/runtime-parity-scorecard.md).
- **Hooks** — the canonical harness carries the three global hook payload files, but `ki` does not write `.claude/settings.json`. A user-environment manager binds the Plan Mode lifecycle pair and `Stop(*)` stale Git-lock guard into settings. These are Claude Code-native and have no confirmed Codex equivalent.

<!-- headroom:learn:start -->

<!-- headroom:learn:end -->
