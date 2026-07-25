---
id: 'FND-004'
title: Define compatible harness registration and native repository-maintenance boundaries
status: in-progress
roadmap: foundation-tooling/define-compatible-harness-registration-and-native-repository-maintenance-boundaries
blocks: —
blocked-by: —
---

## Context

Knowledge Islands is replacing repository-vendored runners with native `ki` operations, but the earlier one-installed-collection design is no longer the current direction.

`ki` must always include the base `knowledgeislands/ki-agentic-harness` and support additional compatible harnesses, such as an organisation harness, from an XDG-managed user registry.

The harness owns compatible capability semantics; `tools-ki` owns the CLI platform and public grammar; KI Specifications owns portable contracts; and the Website owns public user-guide prose.

## Current state

The released `tools-ki` surface installs direct compatible payloads under a user KI data directory, derives harness identity from the owner/repository path, discovers and resolves registered native repository operations without vendored runners, and activates skills through `ki skill user` and `ki skill repo`.

The host is ready, but this harness has not yet published native operation modules for its declared governance skills. Its source repository still depends on its tracked `.ki/` aggregate, bootstrap payload, manifest, and package-script aliases for CI, pre-commit, and local governance. That legacy state cannot be removed until compatible native audit and conform modules replace each of those roles.

[ADR-KI-HARNESS-012](../../../decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-native-operation-boundary.md) defines the direct compatible-payload boundary. `tools-ki` owns the host implementation and its current command grammar. KI Specifications work is deliberately deferred until the implementation contract has settled.

The shared ecosystem GDR now establishes the five-repository ownership model. Its byte-identical mirrors and every local decision-record collection now conform to the current decision-record standard.

## Completed foundation

- Defined qualified capability identity: `<harness-id>:<skill-name>` for skills and the reserved `<harness-id>:<kind>/<name>` extension shape for other kinds.
- Established direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; legacy `latest/` and lock layouts migrate only as recognised old state.
- Reassigned CLI installation, command grammar, repository resolution, activation, native-operation hosting, migration, reporting, and delivery ownership to `tools-ki`.
- Deferred KI Specifications work until the implementation contract is stable enough to standardise.
- Added `shared_record: true` for deliberate verbatim governance-record mirrors. The decision-record checker includes a mirror in an existing local prefix-and-scope sequence, while excluding an otherwise foreign mirror from serial continuity.
- Conformed and audited the decision-record collections in Arcadia Principal, the harness, `tools-ki`, KI Specifications, and the Website with no FAIL or WARN findings.

## Steps

1. ✓ Define qualified capability identity, including the settled `<harness-id>:<skill-name>` form for skills and an explicit extension point for other capability kinds.
2. ✓ Adopt direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; retain legacy `latest/` only as a recognised migration input.
3. ✓ Consolidate the harness decision records around direct compatible payloads, capability semantics, and the harness publication boundary; keep CLI-host, release, and delivery ownership in `tools-ki`.
4. Reconcile the `tools-ki` host decision with its delivered direct-payload layout, user configuration, command grammar, scoped activation, native operation hosting, migration, reporting, and status listing. Do not edit the active tools implementation as part of this harness tranche.
5. Reconcile the planned maintenance vocabulary with the delivered command surface, retaining only forms that remain intentionally planned and their relationship to explicit `ki skill user` and `ki skill repo` activation.
6. Defer KI Specifications decisions and portable-contract material until the implementation contract is stable enough to standardise.
7. Align the harness guide, bootstrap standards, capability rubrics, and `ki(1)` with the settled boundary; preserve current-versus-planned command status and remove obsolete one-collection terminology.
8. Retire the harness's repository-local `.ki/` executor only after `ki repo audit` and `ki repo conform` can replace its aggregate, CI, and pre-commit roles for this source harness.
   - [x] Inventory the source harness's live legacy surface: `.ki/bin`, `.ki/bootstrap`, `.ki/manifest.json`, package-script aliases, CI, pre-commit, and the `.ki/self` orientation.
   - [ ] Publish contained native audit and conform modules for every governance skill declared by this repository, with a finding translation and transaction contract that preserves existing safety guarantees.
   - [ ] Prove `ki repo audit --repo .` and `ki repo conform --repo . --dry-run` against an installed current harness, then move package scripts, CI, and pre-commit to those commands.
   - [ ] Execute the explicit, fail-closed source-harness migration and remove only the legacy entries proven redundant; retain or relocate `.ki/self` deliberately rather than deleting it as collateral.

## Files touched

- Affected decisions and indexes across the five primary repositories
- Harness standards, guides, capability rubrics, and this foundation roadmap
- `ki-decision-records` standard, checker, tests, and vendored bootstrap material when its mirror rule changes
- Portable contract material in KI Specifications, executable-decision material in `tools-ki`, and the `ki(1)` roadmap item

## Verify

1. Every changed decision-record collection passes its applicable decision-record audit, apart from separately recorded pre-existing findings.
2. The shared ecosystem GDR is byte-identical in every approved mirror.
3. The harness, `tools-ki`, KI Specifications, and Website agree on capability vocabulary, ownership, projection modes, and the current-versus-planned command boundary without duplicate or contradictory contracts.
4. The harness roadmap, authoring, decision-record, skill, bootstrap, test, and aggregate audit gates pass after any harness or checker change.

## Dependencies / blocks

This work establishes the architectural prerequisite for [CLI-004](../../../../../tools-ki/docs/roadmap/cli/plans/CLI-004-native-repo-maintenance.md). CLI-004 owns the implementation and release evidence; it remains independently executable once the contract is accepted.
