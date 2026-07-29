---
name: ki-plan
ki-depends-on: []
description: >
  Creates and shapes governed work items in a non-KB repository through explicit readiness — new / shape / ready / promote / status — and routes equivalent planning requests to the native Streams proposal Checklist lifecycle in a KB. A process skill (kind: process, ADR-KI-HARNESS-SKILLS-006): it enriches one canonical work item in place and stops at Ready. Item shape, horizons, and methodology belong to ki-roadmap; implementation and acceptance are separate process responsibilities.
argument-hint: 'new <theme> <title> | shape <REPO>-<THEME>-<NNN>... | ready <REPO>-<THEME>-<NNN>... | promote | status [theme] | help'
---

# ki-plan

**Kind:** process.

Creates and shapes one or more repository work items through Ready.

The class-level standard—horizons, identity, and file shape—is owned by `ki-roadmap`; read [the lifecycle procedure](references/standards-plan-lifecycle.md) for the complete operation.

## What this skill does

`ki-plan` operates a **non-KB repository** item through `new`, `shape`, `ready`, `promote`, and `status`.

An item begins as a concise issue under `docs/roadmap/`.

As its horizon advances, this skill adds the stage-appropriate shaping and execution-plan sections to that same file.

It never creates a duplicate plan document.

`ready` is an explicit, all-or-nothing transition: validate every named item before publishing any status change, then commit the transition once.

In a Knowledge Base, it dispatches to `ki-kb-streams`: `new` and `shape` → PROPOSE, `ready` → READY, and `status` → Focus and proposal indexes.

`promote` is unavailable in a Knowledge Base.

## Responsibility boundary

```text
ki-next
  selection and horizon placement
    └─> ki-plan
          create, shape, and mark Ready
            └─> ki-implement
                  Ready → In progress → Acceptance
                    └─> ki-accept
                          Acceptance → Done and confirmed prune
```

`ki-plan` does not implement work, assemble acceptance evidence, accept delivery, mark an item Done, or prune retained records.

Those responsibilities move cleanly to the dedicated process skills; `ki-plan` carries no compatibility verbs or fallback path for them.

Until those skills ship, the relationship map states the target contract rather than claiming their invocation surfaces are available.

## Planning is repo-first

In a KI code repository the canonical record is `docs/roadmap/<REPO>-<THEME>-<NNN>-<slug>.md`, authored through this skill—not a runtime-native Plan Mode scratch file.

`ki-roadmap` owns the stable `<REPO>` code in `.ki-config.toml`; the identifier holds `<THEME>` and frontmatter holds the human-readable `theme`.

A native scratch file is only a draft.

Where one exists, prefer to leave it a pointer to the governed item rather than duplicate content.

When referring to a specific work item in prose, link its canonical document using the host’s Markdown-link convention; use a bare identifier only in structured fields or lifecycle commands.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action.

With no argument, present the lifecycle verbs using the runtime’s available interactive choice mechanism; in a non-interactive session, print the choices and stop.

Otherwise dispatch on the first token of the argument per [the lifecycle procedure](references/standards-plan-lifecycle.md).

## Preflight

1. Run `git rev-parse --show-toplevel` and physically resolve the result.
2. If `.ki-config.toml` declares `repo_type = "kb"`, dispatch the requested verb to `ki-kb-streams` and create no repository work-item artifact.
3. Run `ki repo audit --skill ki-roadmap --repo <git-root>` and stop on any failure or warning.
4. Resolve an item identifier only to its one regular file directly below `docs/roadmap/`; never follow a symlink outside the physical git root or infer an alternate tree.

## Notes

- This is a process skill, not a universal AUDIT / CONFORM / EDUCATE / REFRESH checker.
- Installed as a core user skill by `ki bootstrap`; it is not a repository-governance root.
- `shape` and `ready` accept one or more explicit item identifiers; `promote` is runtime-only because it consumes host Plan Mode state.
