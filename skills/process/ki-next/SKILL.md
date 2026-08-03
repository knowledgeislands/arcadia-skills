---
name: ki-next
ki-depends-on: []
description: >
  Selects and defers the next work in either local forward-work structure: flat roadmap work items in non-KB repositories, or Streams Focus and proposal Checklists in Knowledge Bases. It re-grounds the local structure, triages inbound handoffs, checks viable work for safe delivery synergy, and applies user-confirmed promotion or deferral before handing selected work to ki-plan. Once every member of a confirmed independent group is Ready, it can hand that group to ki-batch preparation. A process skill (kind: process, ADR-KI-HARNESS-SKILLS-006): it applies the transition rules owned by ki-roadmap or ki-kb-streams; it does not hold a separate standard.
argument-hint: 'next [--review] | defer <item> <horizon-or-focus> | help'
---

# ki-next

**Kind:** process.

Selects and prepares forward work through confirmed horizon or Focus transitions and canonical work items or proposal Checklists.

The full procedure is in [the next-work standard](references/standards-next-work.md).

## What this skill does

1. **Ground** the generated repository roadmap index and canonical work items, or Streams Focus and proposal index, plus any inbound records validated by declared `ki-handoffs` governance.
2. **Triage** incoming submissions through an exact human-confirmed receiver disposition, without treating adoption as roadmap authority.
3. **Review** relevance when asked or when a material stale signal is evident.
4. **Screen for synergy** across dependency-ready candidates: propose a batch only when the items share a bounded delivery advantage and remain independently executable. A shared theme alone is not enough.
5. **Select** one dependency-ready immediate item, or a small, explicitly confirmed synergistic group to plan independently before it can become a `ki-batch prepare` candidate. Compare material alternatives with the evidence-based change-value profile in the next-work standard; focused fixes keep the lightweight path.
6. **Defer** an explicitly named item only after presenting its exact later horizon or Focus, wording, and affected lifecycle state.
7. **Hand off for planning** confirmed immediate non-KB work to `ki-plan`, which shapes each selected `docs/roadmap/` item through Ready. A confirmed synergistic group can go to `ki-batch prepare` only after every member is Ready; a KB uses its proposal Checklist.
8. **Recommend cleanup** when accepted done records are eligible for pruning, without deleting them.

## Relationship map

```text
ki-recap (optional current-session context)
  └─> ki-next (selection, promotion, and deferral)
        └─> ki-plan (shape each selected repository item through Ready)
              ├─> ki-implement (one Ready item through Acceptance)
              │     └─> ki-accept (Acceptance through Done)
              └─> ki-batch prepare (confirmed independent, synergistic Ready set)
                    └─> repeated ki-implement cycles under an approved authorisation

ki-roadmap governs non-KB horizons, work-item shape, and execution format.
ki-kb-streams governs KB Focus and proposal enactment.
```

`ki-recap` is optional.

`ki-next` works without it and never mines historical transcripts.

When a preceding recap records context pressure, `ki-next` begins only after that recap has preserved its bounded handoff and the runtime has compacted where it can. It then re-grounds the repository rather than trusting the carry-forward digest as current state.

`ki-batch` prepares and coordinates an explicitly authorised independent Ready set. It does not change `ki-next` ownership of selection, priority, or an individual item's lifecycle.

The process skills are global invocation surfaces, not `.ki-config.toml` governance roots.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

With no argument or `next`, run the full procedure.

`--review` asks for the optional relevance pass before selection; it does not grant permission to change roadmap or Streams content.

`defer <item> <horizon-or-focus>` identifies an exact proposed deferral; it still requires confirmation of wording, destination, order, and affected lifecycle handling before it writes.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- No roadmap or work-item write occurs until the user explicitly confirms the selected item or batch, order, wording, and horizon or Focus transition.
- `ki-next` does not start or authorise a batch from similarity alone. A confirmed candidate group proceeds only to `ki-batch prepare`; implementation still requires that skill's reviewed authorisation.
- `ki-roadmap` or `ki-kb-streams` owns transition rules; `ki-next` applies them consistently.
- `ki-next` may recommend `status: done` records for pruning, but only `ki-accept` may delete an explicitly selected path or glob.
- Installed as a core user skill by `ki bootstrap`; it is not a repository-governance root.
