# `ki-change-management-housekeeping` effectiveness review

- **Position:** 11 of 50.
- **Baseline:** `94f0b775903286fcf37c0ec050d5568672a5154f`.
- **Evidence snapshot:** `bc6208ab9cc328487361e70c69a24a2f50f5f5e5` plus current house-source checks on 2026-08-12.
- **Kind / dependencies:** governance / none.
- **Review state:** complete and ungraded.
- **Proposed disposition:** `revise` — retain the template/run separation, but reconcile lifecycle authority and validate the actual template contract before grading or automatic spawning.

## Sources and mechanics

The source list contains one dated house-authority label, “Knowledge Islands forward-work practice,” but no reproducible locator or completed sample set. The current Harness templates exercise the declared shape but retain `last-run: null`, so they provide no completed-run evidence. No external source is necessary for this house-owned model.

`ki repo audit --skill ki-change-management-housekeeping --repo .` passed with `FAIL=0 WARN=0`. Four focused tests and eight assertions passed, and TypeScript passed. The tests cover valid and invalid scalar fields, KB placement, and catalogue remediation shape; they do not cover due calculation or lifecycle handoffs.

## Selection and outcome effectiveness

The description clearly selects recurring repository obligations and routes runtime cleanup to `ki-housekeeping-claude`. Separating a durable schedule template from each finite delivery record prevents recurring work from becoming a second roadmap lifecycle.

Cadence, grace, evidence, obsolescence, and spawn policy can make recurring authority legible before a run exists. No completed-run, spawn, duplicate-prevention, or assisted-versus-baseline evidence yet shows that the skill prevents missed or duplicated maintenance in practice.

## Instruction economy and architecture

The 54-line entrypoint and 68-line standard are proportionate. Templates own `active`/`paused` standing state; `ki-next` should decide whether to spawn a due draft; roadmap or Streams owns the run; and `ki-plan`, `ki-implement`, and `ki-accept` own later transitions. A KB Housekeeping area is correctly a template container, not a delivery state.

The problem is contradictory state ownership, not excessive prose. The housekeeping contract says `ki-accept` updates `last-run` and clears `active-run` only after the linked run is reviewed, committed, and `done`. `ki-next` instead says it updates both fields in the spawn transaction. The former treats `last-run` as successful completion; the latter treats it as draft creation. `ki-accept` currently contains no housekeeping field procedure, so neither cross-skill story is complete.

## Executability and safety

CONFORM creates no schedule or run and never changes `last-run`, which is safe. Automatic due spawning is not safe to treat as settled while its state semantics conflict.

The sole checker validates only a subset of its claimed contract. It does not validate `active-run`, linked-run existence or state, duplicate active runs, filename/ID correspondence, required body sections, unexpected or malformed frontmatter, or non-file and symlink entries. Non-Markdown and non-file entries are silently filtered. A clean audit therefore cannot establish the advertised safe location, controlled fields, or duplicate-run protection.

## Evidence and gaps

There is no eval scenario or result evidence. Missing fixtures include due/overdue calendar behavior, manual versus automatic policy, active-run linkage, duplicate refusal, success recording, failed/abandoned runs, KB spawning, and end-to-end template-to-run identity continuity.

## Proposed remediation

These proposals are not approved implementation:

1. Choose one canonical state machine: normally set `active-run` when spawning, set `last-run` only after accepted completion, then clear `active-run`; define abandoned/replaced-run behavior explicitly.
2. Align housekeeping, `ki-next`, and `ki-accept` and add cross-skill fixtures before permitting automatic spawning.
3. Extract a pure template parser/validator shared by audit and spawn logic, covering exact fields, regular files, filename identity, body, linkage, duplicate blocking, and dates.
4. Give the house source an exact path or immutable record and add completed-run evidence.
5. Add assisted-versus-baseline scenarios for missed, duplicate, premature, and successfully completed maintenance.

No new skill, agent, or hook is proposed. Any lifecycle remediation requires separately confirmed cross-skill amendments.
