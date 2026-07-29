---
name: ki-roadmap
ki-depends-on: []
ki-shared-dependencies: [ki-skills:rubric]
owns: ['ROADMAP.md']
description: >
  Governs flat repository work items and their generated roadmap index in non-KB repositories. Use for "audit the roadmap", "audit plans", roadmap horizons, theme grouping, work-item identity, execution lifecycle, plan dependencies, or generated index drift. Every repository work item lives directly under docs/roadmap and is enriched in place when planned. Knowledge Bases are out of scope: use ki-kb-streams, where streams and proposal checklists replace repository roadmaps and plans. The ki-plan process skill drives individual work-item lifecycle operations; ki-decision-records owns durable decisions.
argument-hint: 'audit <repo> | conform <repo> | help | educate <repo> | refresh'
---

# Knowledge Islands repository roadmap standard

This governance skill owns the forward-work model for **non-KB projects**. Every repository has a generated root index and flat canonical work items directly under `docs/roadmap/`. Each work item carries a theme field so related work can form a coherent project without needing its own physical subtree. Knowledge Bases use `ki-kb-streams` instead: a stream is the thematic roadmap and proposal checklists are plans. `ki-next` is the separate process skill that applies this skill's user-confirmed transition rules to select the next work; this governance skill has no process-skill dependency.

Read [the repository-roadmap standard](references/standards-repository-roadmaps.md) before changing a roadmap shape or lifecycle. Read [the generated rubric](references/rubric.md) for the mechanical and judgment criteria. Work-item details live in [the work-item-format standard](references/standards-work-item-format.md). Tracked methodology sources and the REFRESH cadence live in [the source list](references/sources.md).

## Shared model

`ROADMAP.md` is a generated six-horizon index. Each canonical item is a single file at `docs/roadmap/<REPO>-<THEME>-<NNN>-<slug>.md`. The item’s `theme` field groups related work in the index; the item’s `horizon` field establishes priority; and `status` records its independent lifecycle. A concise item becomes an execution plan by gaining plan sections in the same file. The `ki-roadmap` table declares the stable uppercase `repo_code`; `<THEME>` is a stable semantic code; and the serial begins at `001` for each repository/theme pair. The globally unique identifier is also used by dependencies.

## Operating modes

Carries the universal **AUDIT · CONFORM · EDUCATE · REFRESH** modes. Invoked as `help` / `-h` / `?`, it emits generated HELP and stops. With no recognised mode, it emits the same HELP and, only in an interactive session, offers the mode choice and prompts for the target shown in `argument-hint`.

### Mode AUDIT

Run `ki repo audit --skill ki-roadmap --repo <repo>`. The catalogue applies the mechanical criteria in [the generated rubric](references/rubric.md): generated root-index structure and exact blurbs; work-item placement, frontmatter, identity, theme grouping, lifecycle, and dependency integrity; and a current generated index. It reports KB scope as not applicable, or FAIL when a KB carries repository-roadmap artifacts, and makes no changes.

Then apply the rubric's judgment criteria by reading: item quality, horizon placement and transition readiness, execution detail where present, honest lifecycle state, and theme coherence. Where `+/_HANDOFFS/` exists, identify material that needs a local adoption decision; where `-/_HANDOFFS/` exists, identify known receiving-repository progress that needs a local follow-up or closure decision. Report proposed roadmap action only: never infer remote acceptance, move working material, or edit another repository's roadmap. Iterate until mechanical findings are clean and judgment findings are resolved.

After changing the catalogue or contexts, run their colocated Bun tests for item identity, frontmatter, horizon, dependency, root-index, KB, and safe-draft fixtures.

### Mode CONFORM

Run `ki repo conform --skill ki-roadmap --repo <repo> --dry-run` to inspect the proposal. In a valid repository, CONFORM rebuilds only the generated root index. Ordered actions update one session-owned draft per file, and the session emits each final replacement once; the host validates and publishes the transaction. CONFORM never invents work items, moves horizons, removes or rewrites authored prose, reallocates identifiers, or changes lifecycle content. Re-run AUDIT afterward.

### Mode EDUCATE

Run `ki repo educate --skill ki-roadmap --repo <repo>` to render the catalogue's concern and families. To establish a new non-KB repository, scaffold the root index only when `ROADMAP.md` and `docs/roadmap/` are both absent; use every canonical horizon and blurb. In a KB, use the `ki-kb-streams` skill and create no repository-roadmap artifact.

### Mode REFRESH

**Precondition:** REFRESH writes only the canonical skill files in `ki-agentic-harness`. If invoked from an installed copy, stop and redirect to that harness; route recurring base-specific pressure through the `ki-kb` IMPROVE mode.

On the cadence in [the source list](references/sources.md), compare actual repository-roadmap usage with [the repository-roadmap standard](references/standards-repository-roadmaps.md), [the work-item-format standard](references/standards-work-item-format.md), and [the generated rubric](references/rubric.md). Revisit the horizon model, item identity, theme grouping, index usefulness, and execution quality bar. Update the source review dates and explain normative changes in the commit.

## Notes

- Not every change needs a plan. A focused single-file or one-step fix can execute directly.
- Exploration needs no plan; multi-file or multi-step implementation enriches its item before execution.
- A plan answers “how”; a Decision Record answers “why”. Use `ki-decision-records` for the latter.
- The `ki-plan` process skill operates work-item lifecycles. This skill owns their standard and repository-roadmap representation.
- The `ki-next` process skill selects and promotes work through the readiness contract defined here. It gathers confirmation and invokes `ki-plan`; it does not alter this skill's ownership of horizons, item shape, or execution format.
- The local `scripts/shared/rubric.ts` is the materialised compile-time contract from `ki-skills`; generic execution, findings, progress, transaction safety, rollback, and reporting belong to `ki`.
