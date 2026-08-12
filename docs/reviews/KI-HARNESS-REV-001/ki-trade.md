# `ki-trade` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** approved local remediation applied; asynchronous receipt semantics corrected
- **Identity:** position 23 of 50; process; depends on `ki-trades` at position 22; baseline `94f0b775903286fcf37c0ec050d5568672a5154f`; order valid

## Dependency and ownership

`ki-trade` is the process consumer of `ki-trades`. Its focused CLI lifecycle and local-only write boundary are useful because hand-editing the directional protocol would be error-prone. `ki-next` correctly retains receiver disposition authority.

The installed `ki trade` command family is real and its host has 42 passing tests with 272 expectations. It validates records, route reciprocity, committed peer content, sender projection, local ownership, and sender revision evidence.

## Executability and safety gaps

The process and host materially diverge:

- The skill promises `ki-trades` audit before and after mutations, but the live command calls mutation code directly without that audit.
- The review originally misclassified `receive --all` as an all-or-nothing batch. The established protocol is asynchronous: it is a convenience loop over independent receiver-local receipts. The host must report its actual per-operation behaviour and must not imply a complete estate scan or rollback guarantee.
- Completion eligibility scans immediate `docs/roadmap` entries rather than resolving the selected adapter. It lacks KB Streams and remote fail-closed behaviour.
- The host inherits the GitHub-only identity projection and syntax-only `applied_commit` evidence from `ki-trades`.
- Preparation and submission claim exact previews while executing directly.

Strong boundaries remain: local registry/root checks, committed peer reads, exact peer identity, deletion confirmation, and the receiver-only decision off-ramp.

## Candidate improvements

1. Make pre/post governance validation observable in the host, or narrow the process claim.
2. Describe and report `receive --all` as sequential independent receipts; add a failure-path fixture only when the host claims more than that.
3. Carry the selected-adapter completion, endpoint identity, and Git-evidence corrections from `ki-trades` into the host.
4. Register the sibling host revision as executable source evidence for this process.

## Applied changes

The process no longer promises host-provided atomicity or automatic pre/post audits. A review-time all-or-nothing interpretation of `receive --all` was removed: it remains an asynchronous convenience operation over independent receipts. The remaining host follow-up is truthful result reporting and evidence for any stronger capability it later claims.

## Carry-forward criteria

A process skill may describe a CLI only when its claims match the current host behaviour. Passing host tests are insufficient when the claimed failure mode is not represented.

## Local evidence

- `skills/governance/ki-trade/SKILL.md`
- `skills/governance/ki-trade/references/standards-trade-operations.md`
- `docs/reviews/KI-HARNESS-REV-001/ki-trades.md`
- sibling `tools-ki` host at checked revision `854cde5e`
