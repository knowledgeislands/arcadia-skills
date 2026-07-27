# The skills

The skills are the bulk of the harness today. Most are **governance skills** — each holds a house standard and ships the universal **EDUCATE / AUDIT / CONFORM / REFRESH** modes (plus skill-specific ones), backed by a tracked `references/sources.md`. A smaller, growing set are **process skills** — lightweight skills that drive an action or lifecycle rather than holding a standard (`ADR-KI-HARNESS-SKILLS-006`); `ki-recap`, `ki-next`, `ki-plan`, and `ki-delegate` are the current set. This file is the map: what a skill is, how the set fits together, and the shape they share; the per-skill entries are in [the catalogue](skill-catalogue.md).

## What a skill is

A skill is a self-contained capability an agent can load on demand — a name and description that tell the agent when to reach for it, and a body of instructions for what to do once it does. Skills are governed by the `ki-skills` standard, which sets the authoring rules; as a consumer you don't need those rules, only that a skill's `name` is what you invoke it by (via trigger or `/name`).

A `SKILL.md` follows the open [Agent Skills standard](https://agentskills.io/), so it is not Claude-Code-specific: a second runtime such as OpenAI Codex CLI discovers the same `SKILL.md` files from its own path (`.agents/skills`, vs Claude Code's `.claude/skills`), though it reads project instructions from `AGENTS.md` rather than `CLAUDE.md`.

Every skill here is a Knowledge Islands skill, shipped as part of this system, but the set has two **kinds** (`ADR-KI-HARNESS-SKILLS-006`). Most are **governance skills** — each holds a house standard and ships the universal **EDUCATE / AUDIT / CONFORM / REFRESH** modes plus a mechanical checker; what tells governance skills apart is not their kind but _what each governs_: a repository's structure, a knowledge base, the machine itself. A smaller set are **process skills** — they drive an action or lifecycle rather than holding a standard, are exempt from the governance shape and universal modes, and expose HELP only optionally: `ki-recap` (summarise / surface-outstanding / harvest-learnings over a live session, optionally handing grounded current-session actions to `ki-next`), `ki-next` (re-ground the roadmap, triage incoming transfers, and confirm the next work), `ki-plan` (the non-KB plan lifecycle, paired with `ki-roadmap`), and `ki-delegate` (bank planning reasoning in cold-agent-ready briefs, then classify / assign / sequence / gate execution). Human-led repository review is the `REVIEW` mode of `ki-repo`, so it follows the declared repository governance capability rather than being installed as a separate process skill. Knowledge Bases use `ki-kb-streams` instead of either repository-roadmap profile. Kind and physical domain are separate axes in the map below.

The Agent Skills standard is more general than this, though. A skill need not govern a standard at all — it could equally encode a standalone workflow (a review process, a release checklist, a research harness) or target one specific project or recurring task. The process kind is the first step into that territory, and the set is expected to grow further over time.

## `ki-self`: local governance for local concerns

Every governed repository may carry a repo-local `ki-self` skill for concerns that are real in that repository but do not yet belong to a shared Knowledge Islands skill. It is a **governance skill**, not a process wrapper: it holds the repository's local standard for repeatable checks, semi-regular housekeeping, and repository-specific maintenance. Author it once at `.agents/skills/ki-self/SKILL.md`, commit it with the repository, and project `.claude/skills/ki-self` to that source when Claude Code is used. It is never installed into a user-wide skills directory and is deliberately absent from the harness's shared implication graph and catalogue.

Its universal modes apply at local scale:

- **EDUCATE** establishes the local-concerns contract when needed: the repo-local skill, a judgmental recurring-work ledger such as `HOUSEKEEPING.md`, and documented focused procedures for repeatable checks.
- **AUDIT** is the repository's local-housekeeping audit. With no narrower concern it reviews the whole local-concerns contract; `audit <concern>` is an additive focused diagnostic command.
- **CONFORM** runs AUDIT first, then proposes and—only after confirmation—applies the appropriate source-state remediation.
- **REFRESH** retires resolved concerns and promotes either a recurring cross-repository pattern into a named Knowledge Islands skill or multi-step change work into the repository roadmap.

`ki-housekeeping-claude` recognises this boundary: it governs accumulated Claude machine state, while `ki-self` governs the repository-local concerns that sit beside it. The [single-page skills illustration](../../diagrams/skills-map.svg) shows `ki-self` outside the shared harness cluster, with its universal modes and any local commands, plus a promotion edge back to a named shared skill. Its [interactive companion](../../diagrams/skills-map.html) adds purpose tooltips and direct-relationship tracing without changing the canonical SVG map.

## The skill domains

The source tree groups capabilities into eight semantic domains:

1. **Agentic systems** — `ki-harness`, `ki-mcp`, `ki-plugins`, and `ki-subagents`: the containers and capability types that equip an agent.
2. **Environment** — portable `ki-binding` and `ki-tokenomics`; their `-claude` and `-codex` runtime adapters; `ki-housekeeping-claude`; and the renderer-specific `ki-binding-chezmoi` and `ki-dotfiles-chezmoi`.
3. **Governance** — `ki-authoring`, `ki-decision-records`, `ki-engineering`, `ki-feature-definitions`, `ki-git`, `ki-roadmap`, and `ki-specifications`: reusable standards and instruments that cut across repository shapes.
4. **Keystone** — `ki-bootstrap`, `ki-repo`, and `ki-skills`: the installation, repository, and skill-quality contracts that hold the set together.
5. **Knowledge bases** — `ki-kb`, `ki-kb-activities`, `ki-kb-live-artifacts`, and `ki-kb-streams`: the base shape and its operational families.
6. **Process** — `ki-delegate`, `ki-next`, `ki-plan`, and `ki-recap`: action and lifecycle skills rather than house standards.
7. **Tooling** — `ki-homebrew-tap` and `ki-tools`: standalone command-line tools and their distribution surface.
8. **Websites** — `ki-website` and `ki-website-cloudflare`: portable site builds and their Cloudflare hosting delta.

## Interdependencies

The domains group the skills by concern. A second relationship runs across them: which governance capability each skill necessarily requires. Formal composition is declared in `ki-depends-on:` frontmatter; selecting a dependent runs its prerequisites first. A repository explicitly declares both the selected skill and every dependency. Textual list order has no meaning, and separately coverage-detected standards do not appear as dependency edges. The tree below mirrors the declarations rather than expanding coverage.

<!-- BEGIN GENERATED SKILL GRAPH -->

```text
ki-bootstrap

ki-harness
├─ ki-skills
├─ ki-subagents
├─ ki-decision-records
└─ ki-roadmap

ki-kb
├─ ki-kb-activities
├─ ki-kb-live-artifacts
└─ ki-kb-streams

ki-website
└─ ki-website-cloudflare

ki-mcp

ki-plugins

ki-specifications

ki-feature-definitions

ki-git

ki-housekeeping-claude

ki-tokenomics-claude
└─ ki-tokenomics

ki-tokenomics-codex
└─ ki-tokenomics

ki-tokenomics

ki-binding-claude
└─ ki-binding

ki-binding-codex
└─ ki-binding

ki-binding-chezmoi
├─ ki-binding
└─ ki-dotfiles-chezmoi
   └─ ki-authoring

ki-delegate

ki-engineering

ki-homebrew-tap

ki-next

ki-plan

ki-recap

ki-repo
├─ ki-authoring
└─ ki-git

ki-tools
```

<!-- END GENERATED SKILL GRAPH -->

## The governance-skill shape

Governance skills share one layout, so a reader can move between them; the layout and modes are codified in the `ki-skills` rubric:

- **`references/standards-<topic>.md`** — the normative, quotable reference: what good looks like and why.
- **`references/rubric.md`** — the generated readable publication of the structured catalogue.
- **`references/sources.md`** — tracked provenance and refresh cadence where the standard depends on moving sources.
- **`scripts/rubric/items/index.ts`** — the canonical structured catalogue hosted by `ki`; its family modules carry deterministic checks and safe proposals.

The universal modes are **AUDIT**, **CONFORM**, **EDUCATE**, and **REFRESH**, with **HELP** as the safe explanation path and skill-specific modes where they fit. The verified `ki` host executes governance catalogues; skills do not carry compatibility runners.
