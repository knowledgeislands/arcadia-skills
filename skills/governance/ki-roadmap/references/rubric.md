<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — repository roadmaps

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-roadmap --write`.

Line-by-line criteria for auditing ki-roadmap. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)
- [SCOPE — scope](#scope--scope)
- [ROAD — roadmaps](#road--roadmaps)
- [ITEM — items](#item--items)
- [INDEX — root orientation](#index--root-orientation)
- [EXEC — execution](#exec--execution)
- [SAFE — safe mechanics](#safe--safe-mechanics)
- [HANDOFF — handoff review](#handoff--handoff-review)

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)

## SCOPE — scope

→ [standard](standards-repository-roadmaps.md)

Repository-roadmap applicability.

- **SCOPE-1 [M] — KB scope** — KB repositories use `ki-kb-streams`; repository-roadmap artifacts in a KB fail, while a KB without them is not applicable. (standards-repository-roadmaps.md)

## ROAD — roadmaps

→ [standard](standards-repository-roadmaps.md)

Canonical generated-index structure, placement, and readiness.

- **ROAD-1 [M] — root orientation** — Root ROADMAP.md is a concise orientation that points to canonical work items rather than duplicating their queue. (standards-repository-roadmaps.md)
- **ROAD-2 [J] — honest horizon placement** — Items sit in honest horizons; Waiting-for items name their external condition; speculative Future work carries `candidate: true`. (standards-repository-roadmaps.md)
  - _Review prompt:_ Review horizon placement, waiting conditions, and Future candidate marking.
- **ROAD-3 [J] — open finite work** — Work-item indexes are open-only and contain finite work rather than continuous practice. (standards-repository-roadmaps.md)
  - _Review prompt:_ Review that roadmap items are finite open work, not completed work or ongoing practice.
- **ROAD-4 [M] — horizon vocabulary** — Every work item uses the canonical horizon vocabulary; the root orientation carries no parallel horizon list. (standards-repository-roadmaps.md)
- **ROAD-5 [J] — horizon transitions and readiness** — Horizon promotion and deferral meet the readiness contract; execution state remains honest and CONFORM never chooses a move. (standards-repository-roadmaps.md)
  - _Review prompt:_ Review each promotion or deferral against its readiness contract and plan state.
- **ROAD-6 [M] — repository work-item code** — The ki-roadmap table declares a valid stable repository code and a complete uppercase-code-to-theme mapping. (standards-repository-roadmaps.md)

## ITEM — items

→ [standard](standards-repository-roadmaps.md)

Flat work-item identity, grouping, lifecycle, and dependencies.

- **ITEM-1 [M] — flat work-item identity** — Each canonical item lives directly under docs/roadmap with a unique stable identifier and matching filename. (standards-repository-roadmaps.md)
- **ITEM-2 [M] — item state and theme grouping** — Each item has valid theme, horizon, candidate, status, baseline, and dependency fields. (standards-repository-roadmaps.md)
- **ITEM-3 [M] — item body shape** — Every item has concise issue sections; execution and terminal statuses carry the required lifecycle sections. (standards-repository-roadmaps.md)
- **ITEM-4 [M] — item dependencies** — Dependencies name existing work items, are reverse-consistent and acyclic, and do not permit active blocked work. (standards-repository-roadmaps.md)

## INDEX — root orientation

→ [standard](standards-repository-roadmaps.md)

The exact concise root orientation for flat work items.

- **ROOT-1 [M] — root work-item orientation** — Root `ROADMAP.md` is the canonical concise orientation and does not duplicate the work-item queue. (standards-repository-roadmaps.md)

## EXEC — execution

→ [standard](standards-work-item-format.md)

In-place execution shape and lifecycle integrity.

- **EXEC-1 [M] — in-place execution record** — A work item entering execution retains its concise issue context and adds the required execution sections in the same file. (standards-work-item-format.md)
- **EXEC-2 [J] — ready execution content** — Ready, in-progress, and acceptance items have concrete Steps, checkable Verify, honest Current state, and minimal Files touched. (standards-work-item-format.md)
  - _Review prompt:_ Review active work-item execution detail for concreteness and checkability.
- **EXEC-3 [J] — honest execution status** — Open awaits readiness approval; ready awaits execution; in-progress reflects live work; acceptance awaits explicit user acceptance; done is a retained closure record. Every non-open item is Blocking or Next. (standards-work-item-format.md)
  - _Review prompt:_ Review whether work-item status honestly reflects its lifecycle gate or retained completion record.

## SAFE — safe mechanics

→ [standard](standards-repository-roadmaps.md)

Regular-file boundaries and host-owned transactional publication.

- **SAFE-1 [M] — safe mechanics** — Governed roadmap inputs and outputs are regular local files; CONFORM changes session-owned drafts and leaves dry-run, validation, atomic publication, and rollback to the host. (standards-repository-roadmaps.md)

## HANDOFF — handoff review

→ [standard](standards-repository-roadmaps.md)

Judgment-led inbound adoption and outbound follow-up review.

- **HANDOFF-1 [J] — handoff review** — Where `+/_HANDOFFS/` or `-/_HANDOFFS/` exists, review incoming adoption and outgoing receiving-repository progress without inferring or changing remote state. (standards-repository-roadmaps.md)
  - _Review prompt:_ Inspect the handoff areas: identify any inbound material that needs a local roadmap decision and any outbound material needing follow-up or closure; report proposals only.
