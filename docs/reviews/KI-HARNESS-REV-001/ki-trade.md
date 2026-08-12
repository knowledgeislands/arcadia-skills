# `ki-trade` effectiveness review

- **Review state:** complete, ungraded
- **Candidate disposition:** revise
- **Change state:** review only; no Phase 3 remediation is authorised

## Dependency and ownership

`ki-trade` is the process consumer of `ki-trades`. Its focused CLI lifecycle and local-only write boundary are useful because hand-editing the directional protocol would be error-prone. `ki-next` correctly retains receiver disposition authority.

The installed `ki trade` command family is real and its host has 42 passing tests with 272 expectations. It validates records, route reciprocity, committed peer content, sender projection, local ownership, and sender revision evidence.

## Executability and safety gaps

The process and host materially diverge:

- The skill promises `ki-trades` audit before and after mutations, but the live command calls mutation code directly without that audit.
- `receive --all` promises complete-set validation and no partial intake, but preview suppresses invalid candidates and execution writes candidates sequentially. No fixture covers a failure after the first write.
- Completion eligibility scans immediate `docs/roadmap` entries rather than resolving the selected adapter. It lacks KB Streams and remote fail-closed behaviour.
- The host inherits the GitHub-only identity projection and syntax-only `applied_commit` evidence from `ki-trades`.
- Preparation and submission claim exact previews while executing directly.

Strong boundaries remain: local registry/root checks, committed peer reads, exact peer identity, deletion confirmation, and the receiver-only decision off-ramp.

## Candidate improvements

1. Make pre/post governance validation observable in the host, or narrow the process claim.
2. Validate and report one stable `receive --all` set before any write; test failure after the first candidate.
3. Carry the selected-adapter completion, endpoint identity, and Git-evidence corrections from `ki-trades` into the host.
4. Register the sibling host revision as executable source evidence for this process.

## Carry-forward criteria

A process skill may describe a CLI only when the current host implements every claimed destructive and transactional stop boundary. Passing host tests are insufficient when the missing failure mode is not represented.

## Local evidence

- `skills/governance/ki-trade/SKILL.md`
- `skills/governance/ki-trade/references/standards-trade-operations.md`
- `docs/reviews/KI-HARNESS-REV-001/ki-trades.md`
- sibling `tools-ki` host at checked revision `854cde5e`
