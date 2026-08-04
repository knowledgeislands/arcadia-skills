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
4. When the repository declares `ki-trades`, run its audit and inspect validated inbound records after the clean governing-skill audits. Its `README.md` is orientation, not a record.

## 2. Triage inbound handoffs

Present every inbound record that still needs receiver judgment. Use the receiver vocabulary: **adopted**, **parked**, **clarify**, **declined**, or **superseded**; a newly copied record begins **received**.

Present its sender provenance, payload, constraints, current status, existing receiver rationale and linkage, and the exact available status transitions.

Require confirmation of the exact inbound file, receiver status, rationale, local linkage, and resulting local record write. Change only receiver-local fields; do not rewrite sender provenance or payload, mutate an outbound or peer copy, or delete a record as part of disposition.

An adopted status records receiver judgment only. It does not create, prioritize, implement, or accept a roadmap item. If adoption suggests local work, present that as a separate roadmap proposal with its own exact wording, horizon, dependency effects, and confirmation boundary.

If the receiver separately confirms a local work item, preserve the submission's operating model, sources, alternatives, authority and safety boundaries, and unresolved questions in that item's structured sections and final topic-oriented Discussion.

After adopted, declined, or superseded, report that sender release is eligible. Parked and clarify retain the outbound copy. Recommend receiver pruning only after eligible sender release is observable; `ki-next` never performs a peer write or infers release from silence.

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

### Roadmap batchability screen

Before selecting one viable non-KB item, compare the whole dependency-ready candidate set for a **safe delivery synergy**. Do not promote a later-horizon item merely to create a batch: every candidate must first satisfy its normal route into immediate work. A group is a batch candidate only when all of the following are true:

- every item remains a distinct canonical work item with its own lifecycle, verification, and acceptance evidence;
- the items share a concrete delivery advantage, such as one bounded source surface, setup or verification pass, external coordination window, or coherent user outcome;
- their planned changes can be sequenced without conflicting writes, concealed dependencies, or one item's result changing another item's honest scope; and
- each item is independently executable at its position, with satisfied dependencies and no unapproved decision required.

Do not treat a shared theme, adjacent numbering, the same repository, or a desire for throughput as synergy. Related work that changes the same uncertain contract, needs a new decision, or would make a failure hard to isolate stays separate.

For each safe candidate group, present the named items in proposed order, the concrete advantage, the evidence that keeps them independent, the shared verification where relevant, and the mandatory stops that `ki-batch` will enforce. Also state why any superficially related candidate was excluded.

Require confirmation of the exact candidate set and order before planning each member through `ki-plan`. Once every selected item is Ready, offer the set to `ki-batch prepare`. This is a preparation handoff, not implementation authority: `ki-batch` re-validates scope, readiness, verification, and stops, then requires its own reviewed authorisation before any `ki-implement` cycle begins.

If no group meets every condition, say so briefly and use the ordinary single-item selection path.

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

Before a write, show selected items, any proposed batch set and order, exact frontmatter or wording changes, and dependency effects.

Require explicit confirmation, then run CONFORM and AUDIT.

Invoke `ki-plan` only after a non-KB item is Blocking or Next.

It shapes the same item through the stage-detail contract and stops for review before marking it Ready.

`ki-batch` may coordinate a confirmed synergistic group only when every member is Ready and only within an approved preparation boundary.

That handoff does not permit `ki-next` to infer batch, selection, or implementation authority.

## 7. Finish

Report each confirmed handoff disposition, synergy decision (including excluded near-matches), files changed, selected work, and audit result.

Identify `done` records that are eligible for pruning when useful, but do not delete them; path- or glob-selected pruning belongs to `ki-accept`.

If no work is eligible, identify the missing condition or scoping decision plainly.
