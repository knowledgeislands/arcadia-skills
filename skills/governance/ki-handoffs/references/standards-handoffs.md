# Cross-repository trade standard

This standard defines local, typed and directional trade routes between registered Knowledge Islands repositories. It carries no transport command and grants no authority over a peer repository's roadmap, priority, implementation, or acceptance state. The structured catalogue enforces the mechanical rules; the generated [rubric](rubric.md) publishes them.

## Contents

- [Participation and routes](#participation-and-routes)
- [Storage and identity](#storage-and-identity)
- [Record format](#record-format)
- [Copy and write authority](#copy-and-write-authority)
- [Receiver lifecycle](#receiver-lifecycle)
- [Release and pruning](#release-and-pruning)
- [Roadmap and process boundary](#roadmap-and-process-boundary)

## Participation and routes

A repository participates only by declaring its own table:

```toml
["knowledgeislands/ki-agentic-harness:ki-handoffs".exports_to]
work = ["https://github.com/owner/receiver"]
knowledge = []

["knowledgeislands/ki-agentic-harness:ki-handoffs".imports_from]
work = []
knowledge = ["https://github.com/owner/sender"]
```

The repository's canonical endpoint is `ki-repo.repository`, a required HTTPS GitHub URI. `exports_to` and `imports_from` each declare the initial closed trade-kind set: `work` and `knowledge`. Every route array is required, lexical, duplicate-free, and contains canonical GitHub repository URIs.

A typed route is active only when the intended receiver is in the user's local KI repository registry, exactly one registered root declares that canonical home, the sender exports the kind, and the receiver imports that same kind. Filesystem visibility, a one-sided declaration, or a declaration for another kind never activates a route.

## Storage and identity

The generic `+` and `-` working areas and their README files remain owned by `ki-repo`. A repository declaring `ki-handoffs` also carries:

```text
+/_HANDOFFS/
└── <sender-owner>/<sender-repository>/HND-<uuid>.md
-/_HANDOFFS/
└── <receiver-owner>/<receiver-repository>/HND-<uuid>.md
```

Each `_HANDOFFS` directory retains its skill-owned README when empty. The two peer path segments exactly match the record's sender for inbound records and receiver for outbound records.

The canonical identifier grammar is `HND-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`. Generation uses collision-resistant random UUID values; audit validates the shape and lower-case spelling but never infers record identity from the filename alone. Filename, `id`, and H1 must agree.

## Record format

The sender authors this immutable envelope and payload:

```markdown
---
id: HND-01234567-89ab-4cde-8f01-23456789abcd
title: 'Short submission title'
created_at: 2026-08-03T12:00:00Z
sender: sender-owner/sender-repository
receiver: receiver-owner/receiver-repository
kind: work
source_ref: KI-SENDER-FND-001
---

# HND-01234567-89ab-4cde-8f01-23456789abcd: Short submission title

## Context

Why the submission exists and the originating constraints.

## Submission

The outcome proposed to the receiver.

## Constraints

Authority, safety, dependency, and verification boundaries the receiver must retain when evaluating it.
```

The seven sender fields are required strings. `kind` is `work` or `knowledge`; the record is valid only on an active route for that kind. `created_at` is a UTC `YYYY-MM-DDTHH:MM:SSZ` timestamp. `source_ref` is provenance only; it neither reuses the source identifier as the handoff identity nor transfers source lifecycle authority. The three payload sections are required and non-empty. A blank line may separate the closing frontmatter delimiter from the H1; the H1 must remain the first non-blank body line and exactly repeat the `id` and `title`.

An inbound receiver copy adds `status: received`. It may also carry receiver-local `reviewed_at`, `rationale`, `adopted_as`, `retained_as`, or `superseded_by`. No other frontmatter key is valid, so a peer cannot hide a sender-envelope or receiver-authority change behind an extension field.

## Copy and write authority

The sender writes and removes only its outbound record. It never sets receiver-local fields. The receiver creates and changes only its inbound copy. The sender envelope and the complete body are immutable between the outbound record and every retained inbound copy; the checker compares content rather than trusting matching filenames.

`reviewed_at`, when present, is a UTC timestamp. `rationale` records the receiver's review or disposition reasoning. `adopted_as` links to receiver-local work only when status is `adopted`; `retained_as` links to receiver-local knowledge only when status is `retained`; `superseded_by` links to the replacing local or handoff identity only when status is `superseded`. These links are local evidence, not priority or acceptance authority.

The governance checker is read-only across repositories. Its only conformable write is the local, owned README scaffold; record copying and disposition remain explicitly authored local actions.

## Receiver lifecycle

The receiver alone moves its inbound status:

- `received` — copied locally and awaiting disposition.
- `adopted` — a work trade accepted as input to local work; `adopted_as` is required.
- `retained` — a knowledge trade retained in local knowledge; `retained_as` is required.
- `parked` — intentionally retained without adoption or knowledge retention; `rationale` is required.
- `clarify` — more information is requested; `rationale` is required.
- `declined` — not adopted or retained; `rationale` is required.
- `superseded` — replaced by another local record or handoff; `rationale` and `superseded_by` are required.

A newly created inbound copy starts `received`. Existing copies may hold any listed status. Other values are invalid. The checker cannot infer or author the human decision behind a transition.

## Release and pruning

The sender may release its outbound copy only after observing receiver status `adopted`, `retained`, `declined`, or `superseded`. An outbound copy with one of those terminal dispositions is release-eligible but remains valid until the sender acts. `received`, `parked`, and `clarify` require the outbound copy to remain.

The receiver may prune its inbound copy only after the matching outbound record's absence is observable. If the outbound copy disappears while status is `received`, `parked`, or `clarify`, audit reports premature sender release rather than treating the inbound copy as prune-eligible. If a terminal inbound copy remains after release, audit reports that it is eligible for receiver-controlled pruning; it never deletes the file.

## Roadmap and process boundary

`ki-next` presents inbound trades for a human-confirmed disposition, exact rationale, and any explicitly chosen local linkage. Adoption alone does not create or prioritize a roadmap item, start implementation, or accept delivered work; retention alone does not alter local knowledge authority. Any local roadmap or knowledge change follows its ordinary local lifecycle and separate confirmation boundary.

`ki-roadmap` may identify structurally valid inbound records that need review and may report local follow-up proposals. It does not change route, record, status, or peer state. Neither skill gains cross-repository write authority.
