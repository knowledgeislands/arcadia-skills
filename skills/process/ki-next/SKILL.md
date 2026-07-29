---
name: ki-next
ki-depends-on: []
description: >
  Selects and defers the next work in either local forward-work structure: flat roadmap work items in non-KB repositories, or Streams Focus and proposal Checklists in Knowledge Bases. It re-grounds the local structure, triages inbound handoffs, optionally reviews relevance, and applies user-confirmed promotion or deferral before handing immediate non-KB work to ki-plan for shaping. A process skill (kind: process, ADR-KI-HARNESS-SKILLS-006): it applies the transition rules owned by ki-roadmap or ki-kb-streams; it does not hold a separate standard.
argument-hint: 'next [--review] | defer <item> <horizon-or-focus> | help'
---

# ki-next

**Kind:** process.

Selects and prepares forward work through confirmed horizon or Focus transitions and canonical work items or proposal Checklists.

The full procedure is in [the next-work standard](references/standards-next-work.md).

## What this skill does

1. **Ground** the generated repository roadmap index and canonical work items, or Streams Focus and proposal index, plus the inbound handoff inbox.
2. **Triage** incoming handoffs through a separately confirmed local disposition.
3. **Review** relevance when asked or when a material stale signal is evident.
4. **Select** one dependency-ready immediate item, or a small explicitly confirmed compatible set.
5. **Defer** an explicitly named item only after presenting its exact later horizon or Focus, wording, and affected lifecycle state.
6. **Hand off for planning** confirmed immediate non-KB work to `ki-plan`, which shapes the same `docs/roadmap/` item through Ready; a KB uses its proposal Checklist.
7. **Recommend cleanup** when accepted done records are eligible for pruning, without deleting them.

## Relationship map

```text
ki-recap (optional current-session context)
  └─> ki-next (selection, promotion, and deferral)
        └─> ki-plan (shape repository work through Ready)
              └─> ki-implement (Ready through Acceptance)
                    └─> ki-accept (Acceptance through Done)

ki-roadmap governs non-KB horizons, work-item shape, and execution format.
ki-kb-streams governs KB Focus and proposal enactment.
```

`ki-recap` is optional.

`ki-next` works without it and never mines historical transcripts.

The planned `ki-batch` process will apply repeated, explicitly authorised selection and shaping passes before coordinating repeated `ki-implement` cycles.

It does not change `ki-next` ownership of an individual selection decision.

The process skills are global invocation surfaces, not `.ki-config.toml` governance roots.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

With no argument or `next`, run the full procedure.

`--review` asks for the optional relevance pass before selection; it does not grant permission to change roadmap or Streams content.

`defer <item> <horizon-or-focus>` identifies an exact proposed deferral; it still requires confirmation of wording, destination, order, and affected lifecycle handling before it writes.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- No roadmap or work-item write occurs until the user explicitly confirms the selected item or batch, order, wording, and horizon or Focus transition.
- `ki-roadmap` or `ki-kb-streams` owns transition rules; `ki-next` applies them consistently.
- `ki-next` may recommend exact `status: done` records for pruning, but only `ki-accept` may perform the confirmed deletion.
- Installed as a core user skill by `ki bootstrap`; it is not a repository-governance root.
