---
name: ki-handoffs
ki-depends-on: []
ki-shared-dependencies: [ki-skills:rubric]
description: >
  Govern the Knowledge Islands handoff doctrine: plan work once at the top reasoning tier, then write it as an implementation-ready spec a cheaper tier or a cold agent can execute without re-reasoning. Owns the reasoning-layer split, the handoff-spec quality bar (definition-of-done, decisions-locked vs escalate, ordered steps, acceptance criteria, a recommended implementer tier per unit), and the cold-model readiness test. AUDIT checks handoff-opted-in plans/proposals for the required markers; CONFORM fixes them; REFRESH revisits the doctrine. Does not own model-tier cost or selection — that is ki-tokenomics. Triggers: "is this ready to hand off", "make this delegable", "implementation-ready spec", "plan once execute cheap", "which tier should run this". Off-ramps: ki-tokenomics (tier cost/selection), ki-roadmap (non-KB roadmap and plan standard), ki-kb-streams (KB proposal Checklist), ki-subagents (subagent definitions).
argument-hint: 'audit [dir] | conform [dir] | help | educate <target> | refresh'
---

# Knowledge Islands handoffs standard

You are applying the **Knowledge Islands handoff doctrine** — how to split expensive reasoning from cheap execution so that work planned once at the top tier can be handed to a cheaper tier, a cold agent, or another person and executed without re-reasoning. This skill owns the _doctrine_. The normative spec — the opt-in marker contract, the quality bar in full, and the tier-assignment rules — lives in [the handoffs standard](references/standards-handoffs.md) as its single source of truth. The structured TypeScript items under `scripts/rubric/items/` are the canonical rubric; [the published rubric](references/rubric.md) is generated from them for human review. Neither restates the other.

Handoffs are a **cross-tier instrument** that rides on an existing artifact — it owns no artifact of its own. In a non-KB repository the spec is a thematic plan file, governed by `ki-roadmap`; in a Knowledge Base it is a stream proposal's `## Checklist`, governed by `ki-kb-streams`. This skill adds the **delegation-readiness delta** on top of whichever host artifact carries the work. Run where there is no such artifact, it points at `ki-roadmap` / `ki-kb-streams` and stops.

## What this skill owns

1. **The reasoning-layer split** — the doctrine that the top reasoning tier is spent **once** to think a body of work through, and its output is banked as specs a cheaper tier executes. The expensive act is the reasoning; buy it deliberately, then delegate the execution down.
2. **The handoff-spec quality bar** — see [Handoff quality bar](#handoff-quality-bar). The delta over a plain plan: decisions-locked-vs-escalate, a per-unit recommended tier, and a recorded readiness test.
3. **Tier assignment** — each unit of work names the **cheapest tier that its spec makes safe**, referred to by the house classes (haiku / sonnet / opus, cheapest to most capable). _Which_ tier costs what and how to select the ambient default is entirely `ki-tokenomics` (its standard §4 and §8, and `preferred_model_type`); this skill only requires that a tier be assigned and justified in one line, and never hard-codes model ids or prices.
4. **The readiness test** — a spec is ready when a cold agent at the assigned tier can execute the first phase from the spec alone, with no reasoning that lives only in the planner's head. The test is recorded on the artifact, not left implicit.
5. **The opt-in marker contract** — an artifact opts into handoff-governance with `handoff: true` frontmatter; it then must carry the markers the checker enforces (`tier`, a decisions-locked-vs-escalate section, a readiness marker). Opt-in keeps the doctrine off artifacts that do not want it. The full contract lives in [the handoffs standard](references/standards-handoffs.md).

## Handoff quality bar

A spec is ready to hand down a tier when it passes these checks (they extend, not replace, the host artifact's own quality bar — `ki-roadmap` for a plan, `ki-kb-streams` for a proposal):

**Decisions are locked or escalated, explicitly** — every judgement the planner has already made is stated as locked so the executor does not re-open it; every judgement that genuinely needs the owner is flagged as an escalation, separately. An unmarked open question is the failure mode.

**Every unit has a definition-of-done** — a pass/fail acceptance test the executor can check without judgement.

**Every unit carries a recommended tier** — the cheapest tier its steps make safe, with a one-line rationale. Cost and selection defer to `ki-tokenomics`.

**Readiness is tested, not assumed** — the cold-agent test above is run and its result recorded.

## Operating modes

Carries the universal **AUDIT · CONFORM · EDUCATE · REFRESH**. Invoked as `help` / `-h` / `?`, it explains itself and stops — the generated HELP block (name, purpose, invocation, modes, off-ramps), taking no action. With no mode it does the same, then, in an interactive session only, offers the mode choice via `AskUserQuestion`, prompting for any `argument-hint` target the chosen mode shows.

### Mode AUDIT

Check that handoff-opted-in artifacts are delegable. **Run the host artifact's audit first, then add this delta** — `ki-roadmap` AUDIT in a non-KB repository, `ki-kb-streams` AUDIT in a KB; this skill does not re-check plan/proposal structure.

Run `ki repo audit --skill ki-handoffs --repo <repo>`. The `ki` host loads this skill's structured rubric, scans the repository once for `handoff: true` artifacts, and checks that `tier` is present and semantic, the decisions section distinguishes locked from escalate, and a readiness marker is present. It exits non-zero on any mechanical FAIL and counts judgment items as unevaluated rather than manufacturing findings.

Then apply the judgment half by reading, per [references/rubric.md](references/rubric.md): are the locked decisions genuinely closed (no residual reasoning), is the assigned tier appropriate to how concrete the steps are, and would the readiness test actually pass. Report FAILs first, then WARNs, then a one-line verdict.

### Mode CONFORM

Run `ki repo conform --skill ki-handoffs --repo <repo>`. The skill may add the safe `readiness: pending` marker through its session-owned draft; assigning a tier, resolving decisions, and recording the actual readiness test remain judgment work. Touch only the handoff delta — plan/proposal structure belongs to `ki-roadmap` / `ki-kb-streams`. Re-run AUDIT until clean.

### Mode EDUCATE

EDUCATE scaffolds no standalone artifact — a handoff rides on an existing plan or proposal, never a document of its own. Use `ki repo educate --skill ki-handoffs --repo <repo>` to inspect the rubric, then add `handoff: true` only to an existing host artifact that will actually be handed off.

### Mode REFRESH

**Precondition:** REFRESH edits this skill's own canonical files, which exist only in `ki-agentic-harness`. Invoked from an installed copy, it stops here and names the harness as where to run it — or, for a pattern recurring across bases, routes it through `ki-kb`'s IMPROVE mode instead.

Revisit the doctrine against practice: does the reasoning-layer split still match how work flows from the top tier to execution; does the quality bar need sharpening from real handoffs; is the composition boundary with `ki-tokenomics` still clean. Update this `SKILL.md`, [the handoffs standard](references/standards-handoffs.md), and the canonical TypeScript items under `scripts/rubric/items/`; regenerate [the published rubric](references/rubric.md) with `ki skill rubric ki-handoffs --write`, record what changed in the commit, and refresh [the source record](references/sources.md).

## Composition

- `ki-tokenomics` — owns _which tier costs what and how to pick it_ (`preferred_model_type`, the mode→tier table, standard §4/§8). This skill owns _how to decompose and write work so a cheaper tier can execute it_ and points at `ki-tokenomics` for the cost/selection question, never restating the tier table.
- `ki-roadmap` — owns non-KB repository roadmaps and the thematic plan **format**. A handoff spec **is** a plan under `docs/roadmap/<theme>/plans/`; this skill adds the delegation-readiness delta and owns no roadmap artifact.
- `ki-kb-streams` — owns KB planning: a stream proposal's `## Checklist` is the handoff spec. Run in a KB, this skill adds the delta and defers the artifact and its lifecycle to `ki-kb-streams`.
- `ki-subagents` — owns subagent **definitions**. This skill is about the _work spec_ handed to any executor — a cheaper model, a cold agent, or a person — not the agent definition. When the question is how to define the subagent, go there.
- `ki-delegate` — owns the runtime orchestration of a multi-agent run: classify, assign, sequence, and gate the work. A handoff that will be executed in parallel uses `ki-delegate`; this skill remains the quality bar for the artifact handed over.

## Notes

- **Not every plan needs handoff-governance.** Opt in (`handoff: true`) only where work will actually be executed by a different, cheaper tier or a cold agent. Work the planner will execute itself needs only the host artifact's quality bar.
- **Semantic tiers only.** The body and specs may narrate tiers as cheap / mid / top, but the `tier:` frontmatter field must itself be one of `haiku` / `sonnet` / `opus` per the opt-in marker contract — writing `tier: cheap` trips HAND-1. Concrete model ids and prices resolve at runtime through the `claude-api` skill and are never hard-coded here.
- **The doctrine is the point, the markers are the teeth.** The markers exist so a checker can confirm a spec is delegable; the value is the reasoning-once-execute-cheap discipline they enforce.
- `scripts/shared/rubric.ts` is the only vended module: it typechecks the skill-owned catalogue. Execution, reporting, publication, rollback, and re-audit belong to `ki`.
