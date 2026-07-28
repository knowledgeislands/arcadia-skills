---
name: ki-next
ki-depends-on: []
description: >
  Selects, defers, and prepares the next work or a small compatible work batch in either local forward-work structure: roadmap horizons and governed plans in non-KB repositories, or Streams Focus and proposal Checklists in Knowledge Bases. It re-grounds the local structure, triages inbound handoffs, optionally reviews relevance, and applies user-confirmed promotion or deferral. A process skill (kind: process, ADR-KI-HARNESS-SKILLS-006): it applies the transition rules owned by `ki-roadmap` or `ki-kb-streams`; it does not hold a separate standard. Installable globally, cross-repo. Triggers: "what should we do next", "pick the next roadmap item", "defer this roadmap item", "plan the next work", "/ki-next". Not a session recap (`ki-recap`), a roadmap or Streams checker, or an individual plan lifecycle (`ki-plan`).
argument-hint: 'next [--review] | defer <item> <horizon-or-focus> | help'
---

# ki-next

**Kind:** process. Selects, defers, and prepares forward work through confirmed horizon or Focus transitions and governed plans or proposal Checklists. The full procedure and scenarios are in [the next-work standard](references/standards-next-work.md).

## What this skill does

`ki-next` turns a fresh local forward-work read into a small, user-confirmed planning queue.

1. **Ground** the current roadmap and plan index, or Streams Focus and proposal index, plus the inbound handoff inbox. Stop on mechanical drift; this process never repairs it as a side effect.
2. **Triage** unreviewed or review-triggered incoming handoffs through a separately confirmed local disposition; dormant parked or clarify material is acknowledged and skipped.
3. **Review** relevance when asked or when a stale signal is evident. It may identify obsolete, duplicated, already-planned, or newly-unblocked work, but presents every change as a proposal.
4. **Select** one eligible, dependency-ready immediate item, or a small compatible batch: Blocking and Next in a non-KB repository; Blocking and Active in a Knowledge Base. A batch contains only independently ready work and retains a distinct plan or proposal relationship for each item. It promotes later work only after confirmation and re-evaluates it at the destination.
5. **Defer** an explicitly named item only after presenting its exact later horizon or Focus, wording, and any affected plan or proposal; it never infers a move or disposes of governed work.
6. **Plan** confirmed immediate work through `ki-plan`: a governed repository plan with the `ki-roadmap`-owned `<REPO>-<THEME>-<NNN>` identifier in a non-KB repository, or the corresponding Streams proposal Checklist in a Knowledge Base.

## Relationship map

```text
ki-recap (optional, current-session context)
  └─> ki-next (selection, promotion, and deferral)
        └─> ki-plan (repository plan or Streams proposal Checklist)

ki-roadmap governs non-KB horizons, profiles, and plan format.
ki-kb-streams governs KB Focus and proposal enactment.
Neither has a dependency back on a process skill.
```

`ki-recap` is optional: `ki-next` works without it and never mines historical transcripts. The process skills are global invocation surfaces, not `.ki-config.toml` governance roots.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action. With no argument or `next`, run the full procedure. `--review` asks for the optional relevance pass before selection; it does not grant permission to change roadmap or Streams content. `defer <item> <horizon-or-focus>` identifies an exact proposed deferral; it still requires confirmation of the wording, destination, order, and any plan or proposal handling before it writes.

## Notes

- No universal AUDIT/CONFORM/EDUCATE/REFRESH modes — this is a process skill (ADR-KI-HARNESS-SKILLS-001, ADR-KI-HARNESS-SKILLS-006), not a roadmap standard or checker.
- No roadmap, plan, Stream, or proposal write occurs until the user explicitly confirms the selected item or batch, order, wording, and horizon or Focus transition. Rejected proposals leave the files untouched.
- The transition rules belong to `ki-roadmap` or `ki-kb-streams`; `ki-next` applies confirmed promotion and deferral consistently. `ki-plan` owns the corresponding plan or proposal-Checklist lifecycle entrypoint.
- Installed as a core user skill by `ki bootstrap`, alongside `ki-bootstrap`, `ki-recap`, `ki-plan`, and `ki-delegate`. It is not a repository-governance root and has no `["knowledgeislands/ki-agentic-harness:ki-next"]` table.
