# Modes AUDIT and CONFORM

_On-demand procedure for streams' AUDIT and CONFORM modes (CONFORM runs AUDIT first, so they share this file). The shared model — the zone-at-a-glance, the status lifecycle, the proposal anatomy, the bindings, Step 1, and the working rules + Enactment gate — lives in [`SKILL.md`](../SKILL.md) and is already loaded; this file is the procedure only._

## Mode AUDIT — check a base's Streams against the model

1. **Run the mechanical checker** — `ki repo audit --skill ki-kb-streams`. It grades the `[M]` criteria on the unified severity ladder (FAIL / WARN / INFO / NA / PASS) and exits non-zero on any FAIL: Focus folders under `Streams/`, a same-name index per Focus, the `Proposal` suffix (filename + leaf folder), and proposal frontmatter (`status` / `priority` / `dependencies` present; `status` and `priority` within their vocabularies). It resolves the `Streams` zone through any `ki-kb` zone alias. Capture its output.
2. **Apply the `[J]` criteria by reading** ([the rubric](rubric.md)): focus-index tables present and correctly ordered; the proposals index matches the streams present and their statuses (no lag); each stream carries a `Governance` section linking the bound process note; `completed` proposals' documents have been deleted and their knowledge migrated.
3. **Report** drift, FAILs first, citing paths and the fix. This audit is one part of a base audit — `ki-kb`'s AUDIT composes it alongside the zone-model checks; run them together so "clean" means every applicable skill's audit passes, not just this one.

## Mode CONFORM — bring a base's Streams into line

1. Run **AUDIT** first for the gap list.
2. Run `ki repo conform --skill ki-kb-streams` to apply its one safe native repair: normalising an existing proposal's non-bare `status` or `priority` value to its recognised lifecycle token. Add missing `Proposal` suffixes and Focus/stream index notes, add missing `Governance` sections, reconcile the proposals index, and record the process-note binding as deliberate edits. **Confirm before moving or renaming notes** (the name-confirmation gate in the Working rules in [`SKILL.md`](../SKILL.md)); where the base mandates it, run the conforming itself as a proposal.
3. **Install the gate anchor if `GATE-1` flagged it missing**: add the standing directive to the base's `CLAUDE.md` / `AGENTS.md` (route canonical changes through a proposal; load this skill) — otherwise the gate won't fire on a plain edit, so a structurally-conformed base still leaks. But first confirm the base _should_ run the Enactment Process at all: a base that uses `Streams/` as a lightweight tracker, not a proposal workflow, should not be force-fitted — flag it for a decision rather than conforming it (a lightweight-Streams opt-out is a tracked ROADMAP candidate).
4. Re-run **AUDIT** until clean.
