---
id: KI-HARNESS-GOV-052
title: Reference external Agora repositories
area: GOV
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Let an Agora owner include an ordinary Git repository in the Agora's working-set projection without representing it as a consenting Knowledge Islands member.

## Context

The current Agora contract admits only registered Knowledge Islands repositories with canonical `ki-repo.repository` identities. Non-owner members require reciprocal home approval and member consent. That is the correct authority model for membership, but it prevents an Agora from representing a useful supporting repository that is plain Git, cannot or should not adopt Knowledge Islands configuration, and needs no Agora role.

An Agora is also used as a purposeful working set opened in editors and other local clients. The working set can therefore need repositories that are relevant to the work without being governed participants in it.

## Boundary

Keep reciprocal membership unchanged: every non-owner member remains a registered Knowledge Islands repository and independently consents to the same home and role. Only the repository that owns the Agora home may declare a referenced repository. A reference grants no membership, role, consent, Knowledge Islands conformance, trust, work routing, trade, priority, publication, implementation, or acceptance authority.

Limit the first contract to Git repositories with a portable canonical remote identity. Do not put local filesystem paths in the Agora declaration, infer references from editor state, mutate the referenced repository, require it to add `.ki.toml`, or extend the mechanism to arbitrary source directories. A repository with no portable remote identity may be added only through a separate machine-local projection overlay, not the portable Agora declaration.

## Shaping

### Intended model

Add an optional owner-authored reference collection to each Agora home alongside `members`. References are not eligible for reciprocal observation and never appear in a member's `memberships` table. The resolver classifies every resolved root as owner, reciprocal member, or reference so clients cannot mistake working-set inclusion for governance participation.

The home owner may add, order, or remove references by changing only its own declaration. A referenced repository cannot add itself, grant another repository permission to reference it, or become a reciprocal member implicitly. If it later becomes a Knowledge Islands repository and should participate as a member, the owner and repository must complete the ordinary reciprocal membership flow and remove or supersede the reference explicitly.

### Portable and local resolution

The portable declaration identifies a reference by canonical Git remote rather than local path. The `ki` host needs a distinct local association for resolving that identity to a checkout because the existing registry contains registered Knowledge Islands repositories only. Missing or ambiguous local association is an observable reference diagnostic, not evidence of consent and not permission to clone or register the repository automatically.

### Decisions still needed

- Choose the portable Git identity syntax and whether the initial contract remains HTTPS GitHub-only or accepts a provider-neutral canonical clone URL.
- Choose the owner-home field shape and how `order` addresses references without confusing them with members.
- Define the local external-repository association owned by `ki`, including duplicate remotes, worktrees, unavailable checkouts, and privacy-preserving diagnostics.
- Decide whether an unresolved optional reference blocks opening the whole Agora or opens resolved roots while reporting the omission.
- Define migration and audit behavior when the same canonical repository is declared both as a reference and reciprocal member.

### Promotion conditions

Promote to Next when the portable reference shape, owner-only mutation rule, canonical Git identity, local association boundary, projection classification, ordering, conflict behavior, and missing-reference diagnostics are concrete enough to test without weakening reciprocal member consent.

## Discussion

### Contract surfaces

Implementation will amend `GDR-KI-HARNESS-006`, the `ki-agora` standard and rubric, and its examples and sources. `tools-ki` will need separately owned resolver, local-association, audit, roots, open, and editor-projection work after the portable contract is accepted.

### Required examples

Cover an owner referencing a plain Git repository, a member attempting to add a reference, an unavailable local checkout, duplicate local checkouts for one remote, a reference promoted deliberately to reciprocal membership, and a reference removed without touching its repository.
