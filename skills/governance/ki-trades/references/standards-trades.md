# Cross-repository trade standard

This standard defines local, typed, directional trade routes between registered Knowledge Islands repositories. It grants no transport, peer-write, roadmap, priority, implementation, knowledge, or acceptance authority. The structured catalogue enforces the mechanical rules; the generated [rubric](rubric.md) publishes them.

## Contents

- [Participation and routes](#participation-and-routes)
- [Storage and identity](#storage-and-identity)
- [Preparation and observation](#preparation-and-observation)
- [Submitted record format](#submitted-record-format)
- [Copy and write authority](#copy-and-write-authority)
- [Delivery and decision](#delivery-and-decision)
- [Observation policies](#observation-policies)
- [Release and pruning](#release-and-pruning)
- [Roadmap and process boundary](#roadmap-and-process-boundary)

## Participation and routes

A repository participates only by declaring its own table:

```toml
["knowledgeislands/ki-agentic-harness:ki-trades".exports_to]
work = ["https://github.com/owner/receiver"]
knowledge = []

["knowledgeislands/ki-agentic-harness:ki-trades".imports_from]
work = []
knowledge = ["https://github.com/owner/sender"]
```

The repository's canonical endpoint is `ki-repo.repository`, a required HTTPS GitHub URI. `exports_to` and `imports_from` each declare the closed trade-kind set `work` and `knowledge`. Every route array is required, lexical, duplicate-free, and contains canonical repository URIs.

A sender-declared export authorises only sender-local preparation and submission. It remains a pending observation route while the receiver is absent from the local registry, does not participate, or has not declared the matching import. Receipt requires an active reciprocal route: exactly one registered root declares the receiver's canonical home, the sender exports that kind, and the receiver imports the same kind from the sender. Filesystem visibility, one-sided declaration, or reciprocity for another kind never activates receipt. Route removal must refuse while a local preparation, submitted outbound, or retained inbound record depends on that typed route.

## Storage and identity

The generic `+` and `-` working areas remain owned by `ki-repo`. A repository declaring `ki-trades` also carries:

```text
+/_TRADES/
└── <sender-owner>/<sender-repository>/TRD-<eight-hex>.md
-/_TRADES/
├── _PREPARATIONS/<receiver-owner>/<receiver-repository>/TRD-<eight-hex>.md
└── <receiver-owner>/<receiver-repository>/TRD-<eight-hex>.md
```

Each `_TRADES` directory retains its skill-owned README when empty. The two peer path segments match the record's sender for inbound records and receiver for preparations and outbound records.

The canonical identity grammar is `TRD-[0-9a-f]{8}`. Generation uses eight lower-case hexadecimal characters from a random UUID and deliberately accepts the short form's collision risk. One identity appears in at most one local phase: submitting moves the preparation rather than copying it. Filename, `id`, and H1 must agree.

## Preparation and observation

A preparation uses the submitted sender envelope and body described below, plus `phase: preparing`. It must declare `observation` explicitly. It is mutable only at its sender-local `_PREPARATIONS` path and is not receivable. Committing it makes it available for silent inspection through the sender's registered repository root but creates no receiver copy, acknowledgement, decision, response expectation, or dialogue record.

Preparation history is Git history. Observation compares the current committed record with one host-local last-observed full commit reference. When those commits are comparable it presents their diff; on first view, shallow or rewritten history, or a repository without usable history, it presents the current preparation verbatim and explains why comparison is unavailable. Observation writes only that disclosed host-local cursor. Abandonment removes only the local preparation.

Submission atomically moves the identity to the canonical outbound path, removes `phase`, and freezes the raw sender projection. It does not require receiver registration or reciprocity. A submitted record is self-contained and survives sender disconnection.

## Submitted record format

The sender authors this envelope and payload:

```markdown
---
id: TRD-01234567
title: 'Short submission title'
created_at: 2026-08-03T12:00:00Z
sender: sender-owner/sender-repository
receiver: receiver-owner/receiver-repository
kind: work
source_ref: KI-SENDER-FND-001
observation: decision
---

# TRD-01234567: Short submission title

## Context

Why the submission exists and the originating constraints.

## Submission

The outcome proposed to the receiver.

## Constraints

Authority, safety, dependency, and verification boundaries the receiver must retain when evaluating it.
```

The eight sender fields are required strings. `kind` is `work` or `knowledge`; `observation` is `unattended`, `receipt`, `decision`, or `completion`. `created_at` is a UTC `YYYY-MM-DDTHH:MM:SSZ` timestamp. `source_ref` is provenance only and transfers no lifecycle authority. The three payload sections are required and non-empty. The H1 is the first non-blank body line and exactly repeats `id` and `title`.

An inbound receiver copy adds `decision_status: unconsidered` and, when the committed sender reference is available, `received_from_ref: <full-commit>`. It may also carry receiver-local `reviewed_at`, `rationale`, `applied_commit`, `adopted_as`, `retained_as`, or `superseded_by`. Receiver-local commit references are 40 lower-case hexadecimal characters. No other frontmatter key is valid.

## Copy and write authority

The sender writes and removes only its preparation and outbound record and never sets receiver-local fields. The receiver creates and changes only its inbound copy. The complete sender projection—every sender frontmatter byte, delimiters, spacing, and body byte—is immutable after submission. Audit derives the inbound sender projection by removing only recognised single-line receiver-local fields and compares the remaining raw bytes with the outbound record; it does not reconstruct either copy from parsed values.

`received_from_ref`, when present, identifies the committed sender version received. `reviewed_at` is a UTC timestamp. `rationale` records receiver reasoning. `applied_commit` is valid only for `applied`; `adopted_as`, `retained_as`, and `superseded_by` are valid only for their matching decisions. These are local evidence, not priority or acceptance authority.

The governance checker is read-only across repositories. Its only conformable write is the local owned README scaffold. Preparation, observation, submission, receipt, disposition, release, and pruning are explicit local operations outside CONFORM.

## Delivery and decision

Publication, delivery, and decision are independent axes:

- `preparing` — mutable sender-local intent; no delivery fact exists.
- `submitted · awaiting receipt` — immutable outbound exists without a matching inbound copy.
- `submitted · received` — both copies exist; this means delivery only.
- `released` — the receiver observes that an eligible outbound has gone.

The receiver alone moves its inbound decision status:

- `unconsidered` — received but not reviewed.
- `in_progress` — actively being considered.
- `parked` — intentionally paused; `rationale` is required.
- `clarify` — more information is requested; `rationale` is required.
- `applied` — a bounded work change was applied directly; `applied_commit` is required.
- `adopted` — a work trade informs separately governed local work; `adopted_as` is required.
- `retained` — a knowledge trade is retained in a canonical local artifact; `retained_as` is required.
- `declined` — not applied, adopted, or retained; `rationale` is required.
- `superseded` — replaced by another local record or trade; `rationale` and `superseded_by` are required.

`applied` and `adopted` are work-only; `retained` is knowledge-only. There is no generic trade `completed` status. Adopted local work owns its completion state; `applied` proves a completed direct update through its verified local commit.

## Observation policies

The sender chooses one policy without imposing an obligation on the receiver:

- `unattended` — no response is requested; receipt alone permits release.
- `receipt` — the sender waits only until receipt is observable.
- `decision` — the sender waits for `applied`, `adopted`, `retained`, `declined`, or `superseded`.
- `completion` — the sender waits through decision and, for `adopted`, until the linked local work record is `done`; `applied` and `retained` satisfy completion directly, while `declined` and `superseded` resolve the observation without completion.

`parked` and `clarify` are non-terminal under every policy that waits beyond receipt. A policy grants no deadline, delivery guarantee, response guarantee, priority, or implementation commitment.

## Release and pruning

The sender may release its outbound copy only when its declared observation policy is satisfied. `unattended` does not permit immediate deletion: receipt must first be observable. A release-eligible outbound remains valid until the sender explicitly removes it.

The receiver may prune its inbound copy only after an eligible sender release is observable. Absence before policy satisfaction is premature release, not permission to prune. An inbound record retains enough sender-policy and receiver-decision evidence to distinguish those cases after release. Cleanup is explicit and previewed; neither side performs background deletion.

## Roadmap and process boundary

`ki-next` presents inbound trades for a human-confirmed disposition. Direct `applied` is available only for one bounded, reversible, independently verifiable local work change with clear authority, no material design decision, dependency, migration, public-contract change, or cross-repository write, and an existing targeted gate. Everything else creates or links separately prioritised local work. Knowledge never uses the direct-work path and is retained only in a named canonical artifact.

`ki-roadmap` may identify valid inbound records needing review and may record an explicit trade observation on which local work waits. It does not change a route, record, decision, or peer state. Neither skill gains cross-repository write authority.
