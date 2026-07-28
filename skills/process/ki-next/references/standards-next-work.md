# Next-work procedure

_On-demand procedure for `ki-next`. The kind, scope, and relationship map live in [`SKILL.md`](../SKILL.md) and are already loaded; this file is the executable decision procedure._

## Contents

- [1. Preflight and grounding](#1-preflight-and-grounding)
- [2. Inbound handoff triage](#2-inbound-handoff-triage)
- [3. Optional relevance review](#3-optional-relevance-review)
- [4. Staged candidate loop](#4-staged-candidate-loop)
- [5. Explicit deferral](#5-explicit-deferral)
- [6. Rank and confirm](#6-rank-and-confirm)
- [7. Scenario checks](#7-scenario-checks)
- [8. Finish](#8-finish)

## 1. Preflight and grounding

1. Resolve the current git repository physically and read its `.ki-config.toml` when present.
2. In a non-KB repository, ask `ki-roadmap` to identify the simple or thematic profile. Run `ki repo audit --skill ki-roadmap --repo <git-root>`. Stop on any FAIL or WARN; name the repair route, but do not run CONFORM or repair unrelated state. Read root `ROADMAP.md` for the simple profile; for the thematic profile read each `docs/roadmap/<theme>/ROADMAP.md`, its plans, and the generated root projection. Derive active plans and dependencies from frontmatter before ranking items.
3. In a Knowledge Base, run `ki repo audit --skill ki-kb-streams --repo <git-root>`. Stop on any FAIL or WARN. Read the Streams index, each Focus index, and the selected proposal documents fresh; derive proposal status and dependencies before ranking items.
4. Inspect `+/_HANDOFFS/` after the clean governing-skill audit. If it is absent, continue without a handoff step. Do not treat a directory, symlink, or `README` as a handoff. The required `README.md` is orientation, not a placeholder: if it is the only file, record an empty inbox and continue normally.
5. If the user continues from a current `ki-recap`, use only its grounded outstanding work, learning routes with their approval status, and Specific actions as context. Re-check every dynamic forward-work claim now; an unapproved route remains a proposal, and an item parked during recap is not automatically a candidate. Do not scan stored or historical transcripts. A recap is optional: without one, ground the same facts directly.

## 2. Inbound handoff triage

Every normal `ki-next` grounding performs this inbox pass; it is not a separate invocation. The clean roadmap audit is the precondition, and normal selection continues once the pass has no pending disposition.

1. Review every unreviewed regular handoff file in `+/_HANDOFFS/` except `README`. For a retained `park` or `clarify` handoff, re-check its named review trigger against current evidence. Present it only when that trigger has fired. A trigger without evidence remains unfired: acknowledge the retained handoff and skip it without asking for another disposition.
2. For every handoff that needs review, present its origin, scope, constraints, prior disposition if any, and the available dispositions: **adopt**, **park**, **clarify**, **decline**, and **supersede**. Require explicit confirmation of the exact file, selected disposition, wording, horizon, and resulting writes or deletion before changing anything.
3. **Adopt** creates the receiving repository's own forward-work record at its honest horizon or Focus; it does not promote priority or infer readiness. In a non-KB thematic profile, when the transferred detail merits preservation, create an open plan with a non-empty `transferred-from` origin. A non-KB simple profile may adopt the roadmap item, but must run `ki-roadmap` EXPAND before preserving detailed transferred work in a plan. A Knowledge Base adopts detail into the relevant proposal Checklist. Do not discard a detail-bearing inbound brief until that preservation is confirmed.
4. **Park** or **clarify** retains the inbound file only with a recorded receiving owner, its disposition, a reason for parking or a concrete clarification request, and a named review trigger. The review trigger is the event or evidence that will make the item eligible for presentation again; it cannot be an indefinite archive label.
5. **Decline** or **supersede** resolves the handoff without local forward-work. Delete its inbound copy after confirmation. For an adoption, delete the inbound copy only after its approved record and any required plan or proposal preservation are durable. After any resolved disposition, prompt the sender to remove its corresponding outbound copy. When no inbound handoff remains, retain `+/_HANDOFFS/README.md` and the empty directory as the required working-area orientation.
6. After an adoption changes the local forward-work structure, regenerate any derived views, re-run the governing-skill audit, and ground the affected state again before continuing. Do not turn a newly adopted item into the selected next work without the ordinary staged candidate loop and its separate confirmation.

## 3. Optional relevance review

Run this pass when `--review` is supplied, or briefly when the grounded view shows a material concern. Identify only evidence-backed proposals:

- stale or obsolete work;
- duplicates or work already covered by an active plan;
- a Waiting condition that has changed;
- changed dependencies or an item placed in the wrong horizon or Focus.

State the evidence, the proposed wording or placement, and the effect on selection. Do not remove, move, or rewrite anything until the user confirms the exact authored change. A relevance proposal can be declined without ending the selection process.

## 4. Staged candidate loop

Apply the readiness rules in `ki-roadmap` or `ki-kb-streams`, according to the repository structure; do not invent a local substitute.

### Non-KB repositories

1. **Blocking and Next.** Gather items that are ready to start and not blocked by an active plan dependency. Reuse a valid existing plan rather than creating a duplicate. If any qualify, rank and present them; do not inspect later horizons for planning candidates.
2. **Soon.** Only when no eligible Blocking or Next item exists, assess Soon items against the governance-owned Next entry rule: actionable scope, understood dependencies, and readiness to start. Present the viable options. After the user confirms an item, wording, and order, move it to Next as an authored roadmap edit, regenerate derived views, re-run AUDIT, and restart from Blocking and Next. Never create a plan while the item remains Soon.
3. **Future.** Only when Soon is empty or has no viable candidate, inspect Future items. For a selected candidate, do the minimum scoping needed to state an intended outcome and boundary. Present that proposed wording and Future-to-Soon move. After confirmation, make the authored edit, regenerate and audit, then restart in Soon. A second readiness evaluation and confirmation are required before any Soon-to-Next move. If no candidate can meet the Soon entry rule, report that no eligible work exists; do not manufacture an item.
4. **Waiting for.** It never becomes a candidate merely because the immediate queue is empty. Reconsider it only when its named external condition has changed, then present the proposed re-entry horizon and the evidence for confirmation.

5. **Parked.** It never becomes a candidate merely because the immediate queue is empty. Reconsider it only when its named return trigger or priority has changed, then present the proposed re-entry horizon and evidence for confirmation.

### Knowledge Bases

1. **Blocking and Active.** Gather streams that are ready for current attention and whose proposal dependencies are satisfied. Reuse the existing proposal Checklist; do not create a repository plan.
2. **Background.** Only when no immediate stream qualifies, assess Background streams. After confirmation, move one to Active only when its scope is actionable and its dependencies are understood.
3. **Waiting for.** It never becomes a candidate merely because immediate work is empty. Reconsider it only when its named dependency or external condition has changed; then present the proposed move to Active or Background.
4. **Dormant.** It never becomes a candidate merely because immediate work is empty. Reconsider it only when its named return trigger or priority has changed, then present its honest re-entry Focus.
5. **Future.** Only when Background has no viable stream, scope a Future stream enough to move it to Background. After confirmation, re-evaluate it there before any later promotion.

After every confirmed transition, return to the destination horizon or Focus evaluation rather than assuming that an earlier assessment is still valid.

## 5. Explicit deferral

`defer <item> <horizon-or-focus>` is an explicit, user-confirmed move to a later horizon or Focus. It is distinct from `ki-plan promote`, which is a runtime-plan conversion rather than a forward-work move.

1. Resolve the exact canonical item or stream and identify every linked plan or proposal before proposing a move. In a non-KB repository, an ordinary plan with `ready`, `in-progress`, `acceptance`, or `done` status prevents deferral: stop and require the user to resolve its lifecycle through `ki-plan` before changing the item's horizon. In a Knowledge Base, preserve the proposal and its status while moving only its Focus. Do not silently delete, reopen, or detach governed work.
2. Present one honest destination with the resulting wording. In a non-KB repository, use **Soon** only when the work remains understood but is no longer immediate; use **Waiting for** only when a named external condition blocks it; use **Parked** only for an intentional pause with a named return trigger; use **Future** only when it needs re-scoping, adding `_(candidate)_` to the item. In a Knowledge Base, use **Background**, **Waiting for**, **Dormant**, or **Future** by the equivalent Focus meaning. Do not create a persistent `(defer)` marker.
3. Require confirmation of the exact item, destination, wording, order, dependency consequences, and any required plan or proposal handling. Write only that confirmed authored move, regenerate derived views, run the governing-skill audit, and report the result. A rejected proposal leaves every artifact untouched.

## 6. Rank and confirm

For each viable option, give a compact evidence-backed comparison covering expected benefit, leverage, risk reduction, delivery cost, reversibility, readiness, and dependency availability. Do not collapse these into a misleading single score. Preserve any order the user supplies.

Before writing, show:

- selected item, plan, or proposal;
- proposed horizon or Focus transition and exact wording changes;
- the proposed order and dependency implications;
- existing-plan reuse or the new `<theme>/<id>` plan location.

Require explicit confirmation for the exact set and order. Write only the approved authored transitions, then regenerate and audit projections where the local structure has them. Invoke `ki-plan` only once a confirmed item is in an immediate state: Blocking or Next in a non-KB repository, Blocking or Active in a Knowledge Base. `ki-plan` creates or revises the corresponding plan or proposal Checklist under its own lifecycle contract; `ki-next` then stops for review rather than beginning implementation.

## 7. Scenario checks

Apply these behavioural checks whenever the process changes:

| Scenario | Required result |
| --- | --- |
| Eligible Blocking or Next work exists | Evaluate it before every later horizon; do not promote later work. |
| No immediate candidate, but a Soon item is ready | Confirm and move it to Next, regenerate/audit, then re-evaluate it there before planning. |
| No Soon candidate, but a Future candidate can be scoped | Confirm Future-to-Soon wording and move; re-evaluate in Soon, then separately confirm any Next move. |
| Future candidate cannot meet Soon entry | Leave it in Future and report no eligible work. |
| Waiting condition changed | Present the evidence and proposed re-entry; do not move it automatically. |
| Existing valid plan covers selected work | Reuse it and respect its cross-theme dependency edges. |
| No regular inbound handoff exists | Continue normal selection without presenting an inbox step. |
| Only `+/_HANDOFFS/README.md` remains | Treat it as the required empty-inbox orientation and continue normally. |
| Unreviewed inbound handoff exists | Present its exact proposed disposition and require confirmation before any write or deletion. |
| Parked or clarified handoff's trigger has not fired | Acknowledge it and skip it; do not re-present or alter it. |
| Parked or clarified handoff's trigger has fired | Present it for a newly confirmed disposition. |
| Adopted detailed handoff in a thematic profile | Create its honest-horizon item and, when its detail merits retention, an open plan with non-empty `transferred-from`. |
| Adopted detailed handoff in a simple profile | Adopt the item, then require EXPAND before a detail-preserving plan; retain the inbound brief until that plan is confirmed. |
| Declined or superseded handoff | Delete the confirmed inbound copy and prompt the sender to remove its outbound copy. |
| Explicit deferral to Soon | Confirm that the work remains understood but is not immediate, then move it without a marker. |
| Explicit deferral to Waiting for | Require and retain the named external condition before the confirmed move. |
| Explicit deferral to Parked / Dormant | Confirm the intentional pause and named return trigger before the move. |
| Explicit deferral to Future | Confirm that re-scoping is needed and add `_(candidate)_` to a non-KB roadmap item. |
| Deferral with an ordinary active or retained plan | Stop until its lifecycle is explicitly resolved through `ki-plan`; never silently detach or alter the plan. |
| Current recap offers a handoff | Re-audit the roadmap; use only grounded action labels and approval state as context, never as authority to write. |
| Recap contains an unapproved learning route | Keep it a proposal; do not write it while selecting or planning work. |
| User rejects a proposal | Leave the local forward-work structure untouched. |
| KB repository | Audit Streams, rank Blocking and Active first, and use the existing proposal Checklist rather than a repository plan. |

## 8. Finish

Report each confirmed handoff disposition, exact inbound files removed or retained, any sender-removal prompt, the forward-work files changed, and the audit result. If a plan or proposal Checklist was created or revised, ask for its review; do not begin execution. If no work is eligible, say so plainly and identify the required external condition or scoping decision.
