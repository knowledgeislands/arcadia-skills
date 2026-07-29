# Next-work procedure

`ki-next` applies the transition rules owned by `ki-roadmap` or `ki-kb-streams`.

It never treats a recap, handoff, or historic transcript as authority to write.

Its responsibility ends at selecting, promoting, or deferring work and handing confirmed immediate non-KB work to `ki-plan` for shaping.

## Contents

- [1. Ground](#1-ground)
- [2. Triage inbound handoffs](#2-triage-inbound-handoffs)
- [3. Review relevance](#3-review-relevance)
- [4. Select candidates](#4-select-candidates)
- [5. Defer](#5-defer)
- [6. Compare, rank, and confirm](#6-compare-rank-and-confirm)
- [7. Finish](#7-finish)

## 1. Ground

When a preceding `ki-recap` records high context pressure, require its safe handoff/compaction boundary before starting a new selection cycle. After compaction, treat the digest as orientation only and re-ground every repository fact below.

1. Resolve the current git repository physically and read `.ki-config.toml`.
2. In a non-KB repository, run `ki repo audit --skill ki-roadmap --repo <git-root>` and stop on any FAIL or WARN. Read the generated `ROADMAP.md` and every canonical item directly below `docs/roadmap/`; derive lifecycle status and dependencies from frontmatter.
3. In a Knowledge Base, run `ki repo audit --skill ki-kb-streams --repo <git-root>` and read the Focus and proposal indexes fresh.
4. Inspect `+/_HANDOFFS/` after the clean governing-skill audit. Its `README.md` is orientation, not a handoff.

## 2. Triage inbound handoffs

Review every unreviewed regular handoff file other than `README.md`.

Present its origin, scope, constraints, existing disposition, and the available dispositions: **adopt**, **park**, **clarify**, **decline**, or **supersede**.

Require confirmation of the exact file, disposition, wording, horizon, and resulting writes or deletion.

An adoption creates a local work item at an honest horizon; detailed execution material is retained by enriching that item, never a separate plan file.

Preserve the handoff's operating model, sources, alternatives, authority and safety boundaries, and unresolved questions in the work item's structured sections and final topic-oriented Discussion.

After a resolved disposition, prompt the sender to remove its corresponding outbound copy.

## 3. Review relevance

Run this pass for `--review`, or briefly when grounded evidence shows a material concern.

Identify only evidence-backed proposals: stale or obsolete work, duplicates, changed Waiting conditions, changed dependencies, or an item at the wrong horizon.

Do not change content until the user confirms exact wording and placement.

## 4. Select candidates

### Non-KB repositories

1. Gather dependency-ready `blocking` and `next` items. Reuse their canonical item record; if several are independently ready, recommend a small ranked set only when each retains its own lifecycle and the user confirms the set and order.
2. Only when none is eligible, assess `soon` items against the Next entry rule. After confirmation, change `horizon` to `next`, run CONFORM and AUDIT, then re-evaluate it at the destination.
3. Only when Soon has no viable item, assess Future candidates. Move directly to Next only when the full Next rule is met and Soon adds no value; otherwise move to Soon once the intended outcome and boundary are known. Re-evaluate after every confirmed move.
4. Reconsider Waiting-for or Parked items only when their named external condition or return trigger changed.

### Knowledge Bases

Use the native Focus and proposal procedure in `ki-kb-streams`.

## 5. Defer

`defer <item> <horizon-or-focus>` is an explicit user-confirmed move.

Resolve the exact record and identify linked dependencies before proposing it.

Use Soon only for understood but non-immediate work; Waiting for only with a named external condition; Parked only with an intentional pause and named return trigger; Future only when re-scoping is needed, adding `candidate: true`.

Never silently delete, reopen, or detach a canonical execution record.

## 6. Compare, rank, and confirm

Use the **change-value profile** only when comparing viable material candidates or when a human asks for a material engineering-change comparison.

For a focused single-step fix, retain the lightweight selection path: explain the immediate reason and confirmation boundary without manufacturing a profile.

The profile makes these dimensions visible, with short evidence only for the dimensions that materially distinguish the candidates:

- **Capability** — user or system outcome enabled.
- **Comprehensibility** — reduction in ambiguity, indirection, or cognitive load.
- **Maintenance reduction** — obsolete code, duplication, or recurring manual work removed.
- **Reliability** — failure mode, verification, or recovery improved.
- **Leverage** — downstream work or users enabled by the result.
- **Delivery cost** — bounded implementation and verification effort.
- **Reversibility** — ease and safety of changing course after delivery.
- **Readiness** — decision, scope, and evidence are sufficient to begin.
- **Dependency availability** — required prerequisites, people, repositories, or services are available.

Do not calculate a composite score, store profile metadata on a work item, or imply that the profile chooses work automatically.

### Worked trade-off

Two ready candidates can both be worthwhile: a narrow local repair may have low delivery cost and high reversibility, while a compatibility improvement has higher leverage and reliability but depends on another repository.

Present those facts directly, choose only after the human confirms the order, and record neither candidate as objectively "higher value" once the unavailable dependency or chosen sequencing changes the decision.

Before a write, show selected items, exact frontmatter or wording changes, order, and dependency effects.

Require explicit confirmation, then run CONFORM and AUDIT.

Invoke `ki-plan` only after a non-KB item is Blocking or Next.

It shapes the same item through the stage-detail contract and stops for review before marking it Ready.

`ki-batch` may repeat this selection-and-shaping procedure only within an approved preparation boundary.

That orchestration does not permit `ki-next` to infer selection authority.

## 7. Finish

Report each confirmed handoff disposition, files changed, selected work, and audit result.

Identify `done` records that are eligible for pruning when useful, but do not delete them; path- or glob-selected pruning belongs to `ki-accept`.

If no work is eligible, identify the missing condition or scoping decision plainly.
