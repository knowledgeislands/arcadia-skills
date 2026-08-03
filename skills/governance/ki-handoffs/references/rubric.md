<!-- GENERATED FILE: produced by `ki dev skill rubric`. Do not hand-edit; edit scripts/rubric/items/, then rerun `ki dev skill rubric <skill> --write`. -->

# Generated rubric — Cross-repository trades

> **Generated publication.** The TypeScript rubric items under `scripts/rubric/items/` are canonical. Edit those definitions, then rerun `ki dev skill rubric ki-handoffs --write`.

Line-by-line criteria for auditing ki-handoffs. Classifications are derived from item aspects: **[M]** mechanical, **[J]** judgment, **[M + J]** hybrid, and **[M-heuristic + J]** hybrid with heuristic mechanical evidence. Sources are cited as declared by each canonical item.

## Contents

- [RUBRIC — Generated rubric publication](#rubric--generated-rubric-publication)
- [CONFIG — Declared participation](#config--declared-participation)
- [ROUTE — Typed reciprocal routes](#route--typed-reciprocal-routes)
- [SCAFFOLD — Handoff scaffold](#scaffold--handoff-scaffold)
- [RECORD — Record shape](#record--record-shape)
- [AUTH — Write authority](#auth--write-authority)
- [STATUS — Receiver lifecycle](#status--receiver-lifecycle)
- [RELEASE — Release and pruning](#release--release-and-pruning)
- [ADOPTION — Receiver local authority](#adoption--receiver-local-authority)

## RUBRIC — Generated rubric publication

→ [standard](../../../keystone/ki-skills/references/standards-rubric-authoring.md)

The tracked readable rubric is the exact publication of the structured catalogue.

- **RUBRIC-1 [M] — structured catalogue publication is exact** — A structured catalogue tracks `references/rubric.md` as its exact generated publication. The host supplies only validated publication evidence: a missing or differing file is a FAIL; during CONFORM this item requests the host-owned derived write without choosing its path or bytes. (../../../keystone/ki-skills/references/standards-rubric-authoring.md#generated-rubric-publication)

## CONFIG — Declared participation

→ [standard](standards-handoffs.md)

Typed trade routes are explicit, canonical, and owned locally.

- **CONFIG-1 [M] — typed routes are canonical** — A participating repository declares every closed trade kind as a lexically ordered, duplicate-free canonical HTTPS GitHub repository URL array under each of its own `exports_to` and `imports_from` tables; its identity comes only from `ki-repo.repository`. (standards-handoffs.md)

## ROUTE — Typed reciprocal routes

→ [standard](standards-handoffs.md)

Registered repository visibility becomes an active route only through matching declarations for the same trade kind.

- **ROUTE-1 [M] — trade routes are typed, reciprocal, and registered** — A route for a kind is active only when exactly one locally registered repository declares the canonical GitHub home, the sender exports that kind to it, and the receiver imports that same kind from the sender. (standards-handoffs.md)

## SCAFFOLD — Handoff scaffold

→ [standard](standards-handoffs.md)

The optional capability owns only its `_HANDOFFS` directories and README files.

- **SCAFFOLD-1 [M] — owned handoff scaffold is canonical** — A repository declaring ki-handoffs carries the two `_HANDOFFS` directories and their canonical README orientation beneath the generic working areas owned by ki-repo. (standards-handoffs.md)

## RECORD — Record shape

→ [standard](standards-handoffs.md)

Trade-record identity is collision-resistant and corroborated by canonical content rather than inferred from a filename.

- **RECORD-1 [M] — record identity, placement, and payload are canonical** — Every trade record uses the two-level peer layout, an `HND-` lower-case UUID-shaped identity repeated in filename, metadata, and H1, a closed sender envelope with `kind: work | knowledge`, and non-empty Context, Submission, and Constraints payload sections. (standards-handoffs.md)

## AUTH — Write authority

→ [standard](standards-handoffs.md)

A handoff remains a local copy protocol with immutable sender provenance and receiver-only disposition fields.

- **AUTH-1 [M] — sender and receiver write boundaries are preserved** — Outbound records belong to the local sender and contain no receiver-local fields; inbound records belong to the local receiver, use an active route, and preserve the outbound sender envelope and body exactly. (standards-handoffs.md)

## STATUS — Receiver lifecycle

→ [standard](standards-handoffs.md)

Receiver-owned disposition uses a closed status vocabulary and explicit local work or knowledge evidence.

- **STATUS-1 [M] — receiver status and linkage are valid** — Only inbound records carry receiver status: received, adopted, retained, parked, clarify, declined, or superseded, with status-appropriate rationale and local adoption, retention, or supersession linkage. (standards-handoffs.md)

## RELEASE — Release and pruning

→ [standard](standards-handoffs.md)

Absence is interpreted only as an observable release signal after a terminal receiver disposition.

- **RELEASE-1 [M] — release and pruning follow observable lifecycle evidence** — Sender release is permitted only after adopted, retained, declined, or superseded; parked, clarify, and received retain the outbound copy, and receiver pruning becomes eligible only after an allowed release is observable. (standards-handoffs.md)

## ADOPTION — Receiver local authority

→ [standard](standards-handoffs.md)

Human-confirmed disposition remains distinct from local work selection, acceptance, and knowledge stewardship.

- **ADOPTION-1 [J] — disposition preserves receiver authority** — A receiver disposition is trade review only; adoption does not automatically create, prioritize, implement, or accept a roadmap item, and retention does not alter local knowledge authority. (standards-handoffs.md)
  - _Review prompt:_ Confirm that every proposed adoption remains a separately confirmed local roadmap decision, every proposed retention remains a local knowledge decision, and neither grants a sender or process skill priority, implementation, acceptance, or knowledge authority.
