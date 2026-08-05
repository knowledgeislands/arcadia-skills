---
name: ki-recap
ki-depends-on: []
description: >
  Recaps a live session in three legs — summarise what happened (changes, decisions, files touched), surface only unfinished work from that session, and harvest its learnings (dead-ends, workarounds, conventions), routing each to its proper home. It does not inventory generic repository backlog or choose future work; `ki-next` owns that separate selection. At a safe boundary, preserves only next-work carry-forward information and uses available documented runtime/vendor compaction to reduce active context to that scope. A process skill (kind: process, ADR-KI-HARNESS-SKILLS-006): it drives an action, it does not hold a standard. Installable globally, cross-repo — usable in any repo on the machine, not just this one. Triggers: "recap this session", "summarise what happened", "what's outstanding", "harvest what we learned", "/ki-recap". Not the offline, mechanical mining of historical transcripts after the fact — that is a separate ROADMAP candidate sharing this skill's grounding substrate.
argument-hint: 'recap [--runtime detect|claude|codex] [--transcript <session-file>] | help'
---

# ki-recap

**Kind:** process. Recaps a **live** session — warm, in-context, run inside the session itself. Full procedure in [the session-recap standard](references/standards-session-recap.md).

## What this skill does

Three legs, always in this order:

1. **Summarise** what happened this session — changes, decisions, files touched.
2. **Surface what is outstanding** — only unfinished threads and explicitly deferred fixes from this session. Always check whether the session's work is fully committed — dirty files this session touched are outstanding; dirty files from other threads and generic future work are out of scope. A roadmap item or Stream **added this session** is "what happened", not outstanding.
3. **Harvest the learnings** — dead-ends, workarounds, conventions discovered in-session — and route each through the [knowledge-promotion standard](../../governance/ki-authoring/references/standards-knowledge-promotion.md): distinguish a durable learning from unfinished work, then choose its narrowest appropriate owner. Confirm with the user before writing anywhere durable.

The recap always closes with an **Actions** section: a concrete, imperative checklist of only the current session's unfinished work (files to commit, gates to re-run, approved learning routes to apply) — or a one-line "no actions" if the tree is clean and nothing is outstanding. Do not turn roadmap backlog, peer state, or prospective work into an action; `ki-next` owns selecting or sequencing that work. Prefix each action with a short, unique, uppercase hyphenated label that names the work, rather than an arbitrary sequence number (for example, `FIX-AUTHORING-AUDIT`). It is a checklist for the user, not actions taken unprompted.

When `ki-accept` asks for a work-record mini recap, use the same grounding and learning-routing boundary in the smaller item scope: delivered work, verification evidence, outstanding concerns, and proposed learning routes. In a non-KB repository, cite the item by its canonical `<REPO>-<THEME>-<NNN>` identifier; in a KB, cite the proposal path. The roadmap item's `## Review` section or proposal review evidence is not permission to promote a learning outside that record.

When the user wants to select or sequence future work after a recap, route that separate request to `ki-next`. Do not present it as an action, invent a future-work checklist, or invoke `ki-next` from the recap itself.

At the safe boundary after every recap and before a new work cycle, determine automatically whether context pressure warrants compaction. Preserve only what is in scope for that next cycle, then use the documented runtime- or vendor-specific compaction mechanism when available to reduce the active context to that scope. Do this only after the recap has recorded the durable outcome, not in the middle of an active change, unresolved tool operation, or uncommitted implementation unit. The applicable `ki-tokenomics` runtime adapter owns the mechanism's evidence boundary; if no mechanism is available, say so plainly — a digest alone is useful handoff material, not context reduction.

The recap grounds every checkable claim in current reality, not in warm context or recalled memory: before asserting a commit landed, a gate passed, or a file's state, it re-checks (`git log`, the read-only gate, a fresh read) — stale context otherwise reads as fact.

A mechanical **grounding helper**, [`scripts/recap-grounding.ts`](scripts/recap-grounding.ts), resolves the newest matching Claude or Codex session transcript and emits files-touched, tool-tally, high-cost-candidate, and versioned repository-evidence data. On a later recap it compares a compatible prior evidence marker and reports `unchanged`, `changed`, or `unavailable`; current Git state remains authoritative. It grounds the summarise and harvest legs, it does not replace judgment over them.

## Invocation

`help` / `-h` / `?` explains this skill and stops, taking no action. With no argument, run the three-leg procedure over the current session, then automatically assess whether to preserve a carry-forward digest and compact. Grounding uses `--runtime detect` by default, selecting the newest repository-matching Claude or Codex transcript; use `--runtime claude` or `--runtime codex` to force one runtime. `--transcript <session-file>` selects one eligible candidate by basename only when concurrent sessions make modification time ambiguous.

## Notes

- No universal AUDIT/CONFORM/EDUCATE/REFRESH modes — this is a process skill (ADR-KI-HARNESS-SKILLS-001, ADR-KI-HARNESS-SKILLS-006); it has one procedure with an optional leg.
- Sibling to the offline, mechanical "mine historical sessions" ROADMAP candidate — that is the **cold** leg (after the fact, over stored transcripts); this is the **warm** leg (in-session, while context is live). They share the grounding substrate and the routing table, not an implementation.
- Installed as a core user skill by `ki bootstrap` — usable in any repo on the machine. Like `ki-bootstrap`, it is not a repository-governance root and has no `["knowledgeislands/ki-agentic-harness:ki-recap"]` table.
