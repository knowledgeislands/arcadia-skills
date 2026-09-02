---
id: KI-HARNESS-GOV-052
title: Reference external Agora repositories
area: GOV
theme: governance-consistency
horizon: now
status: in-progress
blocks: []
blocked_by: []
baseline_ref: 02b22991a63068423c6c84279e5431667b81a5d8
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

### Selected portable shape

Add one optional duplicate-free `references` array to an Agora home. Each value is a canonical HTTPS GitHub repository identity using the same `https://github.com/<owner>/<repository>` grammar as `ki-repo.repository`, without credentials, query, fragment, trailing slash, or `.git` suffix. The first version deliberately does not invent provider-neutral Git URL normalization.

```toml
[skills.ki-agora.homes.research]

owner = "https://github.com/example/agora-home"
purpose = "Repositories used for a focused research programme"
references = ["https://github.com/example/plain-git-repository"]
order = [
  "https://github.com/example/agora-home",
  "https://github.com/example/plain-git-repository",
]

[skills.ki-agora.homes.research.members]

"https://github.com/example/consenting-member" = "maintainer"
```

`order` becomes a duplicate-free ordered prefix drawn from the owner, members, and references. Ordering affects projection only. A reference has no role, never appears in `memberships`, and is not eligible for reciprocal observation. The owner adds or removes references only through its own home declaration; no declaration in the referenced repository is required or interpreted.

### Identity and conflicts

The owner identity, every member identity, and every reference identity must be unique within a home. Declaring one identity as both a member and a reference is a configuration failure, not an implicit promotion or precedence rule. Converting a reference into a member requires removing it from `references` and completing the existing reciprocal owner-and-member declarations. Expanding beyond GitHub HTTPS identities is later contract work because it first requires one canonical provider-neutral repository identity grammar.

### Local association and resolution

`ki` owns a separate machine-local external-repository association from canonical reference identity to exactly one selected absolute Git checkout root. That association is not a KI repository registration, does not require `.ki.toml`, and grants no authority. The host validates that the selected root is a Git worktree whose canonical remote matches the reference. It never clones, discovers, or chooses among duplicate checkouts automatically. Multiple checkouts or worktrees for one identity remain ambiguous until the user selects one association explicitly; a missing path or changed remote makes the association unresolved.

Resolution returns each root with an explicit `owner`, `member`, or `reference` classification. An unresolved reference produces a diagnostic keyed by canonical identity, omits only that reference from the resolved roots, and does not invalidate or reclassify the owner and reciprocal members. Diagnostics distinguish `unassociated`, `missing`, `ambiguous`, and `remote-mismatch` without exposing alternative local paths in ordinary output. Target-specific exit and launch behavior belongs to the separately owned `tools-ki` command contract.

## Current state

The current `ki-agora` contract accepts only an owner and reciprocal members, and its `order` field may address only those participants. The selected extension is now concrete: strict GitHub HTTPS identity, an owner-only `references` array, union ordering, explicit projection classification, fail-closed member conflicts, and a separate host-owned local association. No external dependency blocks delivery of the portable Harness contract.

## Steps

- [ ] Amend `GDR-KI-HARNESS-006` to distinguish governance membership from owner-selected working-set references.
- [ ] Extend the `ki-agora` standard with the exact `references` shape, identity grammar, ordering, classification, conflict, migration, and unresolved-reference semantics.
- [ ] Extend the Agora audit context and rubric so unknown fields, malformed identities, duplicates, owner or member conflicts, and invalid order entries fail closed.
- [ ] Add fixtures for an owner referencing plain Git, an unavailable association, duplicate local candidates, an attempted member conflict, deliberate promotion to membership, and removal without peer mutation.
- [ ] Refresh the generated rubric and capability documentation, then create separately owned `tools-ki` roadmap work for local association, resolution, roots, audit, open, and editor projection.

## Files touched

- `docs/decisions/GDR-KI-HARNESS-006-reciprocal-agora-membership.md`
- `skills/governance/ki-agora/SKILL.md`
- `skills/governance/ki-agora/references/standards-agora.md`
- `skills/governance/ki-agora/scripts/rubric/` context, criteria, and tests
- Generated Agora rubric and capability documentation
- This work item

## Verify

- Existing homes without `references` retain identical membership and ordering behavior.
- Valid references use only canonical GitHub HTTPS identities and never require reciprocal declarations.
- Duplicate references, owner or member conflicts, malformed identities, unknown fields, and invalid `order` entries fail closed.
- Resolver examples classify owner, member, and reference roots distinctly and preserve reciprocal-member results when a reference is unresolved.
- Promotion from reference to member requires explicit removal plus matching reciprocal declarations.
- `ki repo audit --skill ki-agora --repo .`
- `ki repo audit --skill ki-skills --repo .`
- Focused Agora rubric tests
- `bun run test`
- `bunx tsc --noEmit`

## Dependencies / blocks

No external dependency blocks the portable contract. `tools-ki` owns the machine-local association schema, command behavior, repository resolution, and client projections; that implementation must be captured directly in its roadmap after this contract is accepted and must not be folded into this Harness item.

## Documentation impact

### Decision Records

Amend `GDR-KI-HARNESS-006` because the Agora projection will deliberately include a new non-member class.

### Specifications

No separate Harness product specification is required; the `ki-agora` standard owns the portable declaration behavior. `tools-ki` will update its Agora specifications in its own delivery item.

### Guides

Keep the portable declaration and migration examples in the Agora standard. User-facing local-association and recovery guidance belongs to `tools-ki` once its command design is implemented.

### Roadmap

Create a separately identified `tools-ki` roadmap item for the host-owned local association and projection work after the portable contract is accepted.

## Discussion

### Authority boundary

Working-set inclusion is presentation, not governance. Explicit classification and a hard member/reference conflict prevent clients and users from treating convenience inclusion as consent.

### Identity scope

GitHub HTTPS-only is intentionally narrower than arbitrary Git remotes, but it reuses the only canonical repository identity already governed by KI. A provider-neutral extension should follow a separate canonicalization decision rather than making this delivery depend on unresolved URL equivalence.

### Missing references

An optional supporting repository should not make consenting members unusable. Omitting only the unresolved reference preserves the Agora while the typed diagnostic prevents the resulting projection from being represented as complete.

### Required examples

Cover an owner referencing a plain Git repository, an unavailable local checkout, duplicate local checkouts for one remote, an identity declared as both member and reference, a reference promoted deliberately to reciprocal membership, and a reference removed without touching its repository.
