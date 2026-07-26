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

`ki` installs the canonical `knowledgeislands/ki-agentic-harness` during bootstrap; it is never uninstallable. It may also support additional compatible harnesses, such as an organisation harness, from an XDG-managed user registry.

The harness owns compatible capability semantics and skill-specific rubrics; `tools-ki` owns the CLI platform, public grammar, and generic governed-rubric runtime; KI Specifications owns portable contracts; and the Website owns public user-guide prose.

## Current state

The released `tools-ki` surface installs direct compatible payloads under a user KI data directory, derives harness identity from the owner/repository path, provides the `ki repo educate`, `ki repo audit`, and `ki repo conform` host commands without vendored runners, and activates skills through `ki skill user` and `ki skill repo`.

`tools-ki` now owns the versioned generic governed-rubric runtime, including host-owned repair transactions and identity checks. The harness's first native definition is `ki-handoffs`; its one safe repair is declared as a Markdown frontmatter replacement and never writes directly. Its source payload is now link-free: every declared shared module is an integrity-checked regular copy, matching the installed-payload rule.

This source repository still depends on its tracked `.ki/` aggregate, bootstrap payload, manifest, and package-script aliases for CI, pre-commit, and local governance. That legacy state cannot be removed until the tools-owned runtime executes the harness's converted rubrics directly.

[ADR-KI-HARNESS-012](../../../decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md) defines the direct compatible-payload and governed-rubric boundary. `tools-ki` owns the host implementation and its current command grammar. KI Specifications work is deliberately deferred until the implementation contract has settled.

The shared ecosystem GDR now establishes the five-repository ownership model. Its byte-identical mirrors and every local decision-record collection now conform to the current decision-record standard.

## Completed foundation

- Defined qualified capability identity: `<harness-id>:<skill-name>` for skills and the reserved `<harness-id>:<kind>/<name>` extension shape for other kinds.
- Established direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; legacy `latest/` and lock layouts migrate only as recognised old state.
- Reassigned CLI installation, command grammar, repository resolution, activation, governed-rubric hosting, migration, reporting, and delivery ownership to `tools-ki`.
- Deferred KI Specifications work until the implementation contract is stable enough to standardise.
- Added `shared_record: true` for deliberate verbatim governance-record mirrors. The decision-record checker includes a mirror in an existing local prefix-and-scope sequence, while excluding an otherwise foreign mirror from serial continuity.
- Conformed and audited the decision-record collections in Arcadia Principal, the harness, `tools-ki`, KI Specifications, and the Website with no FAIL or WARN findings.

## Steps

1. ✓ Define qualified capability identity, including the settled `<harness-id>:<skill-name>` form for skills and an explicit extension point for other capability kinds.
2. ✓ Adopt direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; retain legacy `latest/` only as a recognised migration input.
3. ✓ Consolidate the harness decision records around direct compatible payloads, capability semantics, and the harness publication boundary; keep CLI-host, release, and delivery ownership in `tools-ki`.
4. Reconcile the `tools-ki` host decision with its delivered direct-payload layout, user configuration, command grammar, scoped activation, tools-owned governed-rubric runtime, migration, reporting, and status listing. Do not edit the active tools implementation as part of this harness tranche.
5. Reconcile the planned maintenance vocabulary with the delivered command surface, retaining only forms that remain intentionally planned and their relationship to explicit `ki skill user` and `ki skill repo` activation.
6. Defer KI Specifications decisions and portable-contract material until the implementation contract is stable enough to standardise.
7. Align the harness guide, bootstrap standards, capability rubrics, and `ki(1)` with the settled boundary; preserve current-versus-planned command status and remove obsolete one-collection terminology.
8. Retire the harness's repository-local `.ki/` executor only after `ki repo educate`, `ki repo audit`, and `ki repo conform` can replace its aggregate, CI, and pre-commit roles for this source harness.
   - [x] Inventory the source harness's live legacy surface: `.ki/bin`, `.ki/bootstrap`, `.ki/manifest.json`, package-script aliases, CI, pre-commit, and the repository-local `ki-self` orientation.
   - [x] Move the generic governed-rubric runtime out of the harness and into `tools-ki`: execution, finding rendering, dry-run, dependency order, and safe publication. The harness retains only skill-specific rubric definitions, context/evidence builders, and declared repair plans; do not retain a parallel wrapper or runner convention.
   - [x] Convert every wrapper-bearing governance skill to the native definition contract, replacing direct-writing callbacks only after the tools-owned transaction preserves its existing fail-closed safety guarantees.
     - [x] Port `ki-handoffs` as the first definition-contract vertical slice, including its pure readiness-marker repair plan and focused contract test.
     - [x] Prove that slice through `ki dev on`: native audit, byte-identical dry run, host-owned conform, and post-conform re-audit against a canonical development payload.
     - [x] Port `ki-feature-definitions`, retaining its read-only corpus evidence and declaring its heading-normalisation repair as a cached file-replacement plan; prove it through the canonical development payload.
     - [x] Port `ki-subagents`, scope its evidence to each repository's `subagents/` directory, and declare filename alignment as a host-owned replacement rather than a direct writer; prove audit, dry-run, conform, and re-audit through the canonical development payload.
     - [x] Add an explicit tools-owned subprocess capability; native definitions declare bounded pathless commands, while `ki` validates, reports, dry-runs, executes from the resolved repository without a shell, and re-audits.
     - [x] Port `ki-authoring`: declare its Markdown formatter/linter repair through that host capability, retain owned-file drift as host file replacements, and prove audit, dry-run, conform, and re-audit through the canonical development payload.
     - [x] Port `ki-engineering` through the subprocess capability, separating its safe file replacements from the toolchain commands and adding a host-owned, race-safe declared-file creation primitive.
     - [x] Port `ki-decision-records`, retaining its audit catalogue and declaring index maintenance as a host-owned file replacement; prove audit, dry-run, conform, and re-audit through the canonical development payload.
     - [x] Port `ki-harness`, retaining its audit catalogue and declaring the existing harness-marker append as a host-owned replacement; its full CLI proof remains blocked by declared dependencies that have no native contract yet.
     - [x] Port `ki-skills`, coalescing overlapping canonical edits to each `SKILL.md` into one host-owned replacement per file; identical proposals are deduplicated by the host while conflicting content fails closed.
     - [x] Port `ki-repo-roadmap` as a multi-file native repair plan; compose compatible overlapping changes into identical host-owned replacement proposals, while leaving the remaining unsupported create/delete cases as explicit violations.
     - [x] Port `ki-repo`, retaining its full native audit catalogue and declaring only safe local configuration and `.gitignore` repairs; live GitHub mutation remains deliberately outside the native contract until `ki` has an explicit confirmation model.
     - [x] Add bounded user-home evidence and repair scopes to the repository host for `ki-housekeeping` and `ki-tokenomics`: `ki repo audit` / `ki repo conform` select only the repository's declarations, while user activation records global installation and per-skill home-relative paths retain containment and identity checks.
     - [x] Port `ki-housekeeping` into the bounded `.claude/projects` user scope, retaining its full catalogue while making repository-dependent checks explicitly not applicable; declare only host-owned memory repairs and remove its publisher.
     - [x] Port `ki-tokenomics` into bounded `.claude` / `.claude.json` user scope, retaining its catalogue while making repository-only checks explicitly not applicable; declare no unsafe repairs and remove its publisher.
     - [x] Port `ki-bootstrap`, retaining its full audit catalogue and declaring only safe generated-`.gitignore` repairs; runtime payload publication remains a reported violation until `ki` owns verified tree/link transactions.
     - [x] Port `ki-binding`, retaining its repository evidence and cataloguing its user-home and retired-bootstrap checks honestly until their native host scopes exist; publish through `ki skill rubric` and remove its legacy publisher.
     - [x] Port `ki-binding-chezmoi`, retaining its complete audit and judgment catalogue while keeping chezmoi source decisions and apply actions manual; publish through `ki skill rubric` and remove its publisher.
     - [x] Port `ki-dotfiles-chezmoi`, retaining its full audit catalogue and declaring only safe `.chezmoiignore` creation; preserve template, source-name, lock, and external chezmoi choices as reported work, and remove its publisher.
     - [x] Port `ki-homebrew-tap`, retaining its full audit catalogue and declaring only a safe marker repair; preserve Homebrew validation as explicit manual findings, and remove its publisher.
     - [x] Port `ki-mcp`, retaining its full audit catalogue and declaring safe configuration replacements only; preserve client generation as an explicit repo command, and remove its publisher.
     - [x] Port `ki-plugins`, retaining its full audit catalogue and leaving generated marketplace/plugin projections report-only for explicit `ki-binding` regeneration; remove its publisher.
     - [x] Port `ki-tools`, retaining its full audit catalogue and declaring only bounded executable/configuration repairs; preserve missing content and external operations as reported work, and remove its publisher.
     - [x] Port `ki-kb`, retaining its full audit catalogue and declaring safe missing-index and `Admin/MEMORY.md` creation through the host; publish through `ki skill rubric` and remove its legacy publisher.
     - [x] Port `ki-kb-activities`, retaining its full audit catalogue and declaring only safe `Activities.md` creation; preserve frontmatter and external scheduling work as findings, and remove its publisher.
     - [x] Port `ki-kb-live-artifacts`, retaining its full audit catalogue and declaring only safe missing-index and frontmatter repairs; preserve rendering, deletion, status, and regeneration choices as manual work, and remove its publisher.
     - [x] Port `ki-kb-streams`, retaining its full audit catalogue and declaring only controlled-vocabulary proposal-frontmatter repairs; preserve moves, indexes, and gates as manual work, and remove its publisher.
     - [x] Port `ki-website-cloudflare`, retaining its full audit catalogue while keeping Cloudflare and Wrangler operations manual; remove its publisher.
     - [x] Port `ki-website`, retaining its full audit catalogue and declaring only safe `.gitignore` and `.ki-config.toml` repairs; remove its publisher.
     - [x] Port `ki-specifications`, retaining its full audit catalogue and declaring only safe markers in existing valid configuration; treat missing configuration, directories, and malformed manual work as findings; remove its publisher.
     - [x] Retire `scripts/rubric/publish.ts` for all 27 native definitions: regenerate `references/rubric.md` through `ki skill rubric <skill> --write`, remove its publisher and publisher-only test, and replace every authoring instruction with the `ki` command.
       - [x] Retire the publishers for all 27 native skills: `ki-authoring`, `ki-binding`, `ki-binding-chezmoi`, `ki-bootstrap`, `ki-decision-records`, `ki-dotfiles-chezmoi`, `ki-engineering`, `ki-feature-definitions`, `ki-handoffs`, `ki-harness`, `ki-homebrew-tap`, `ki-housekeeping`, `ki-kb`, `ki-kb-activities`, `ki-kb-live-artifacts`, `ki-kb-streams`, `ki-mcp`, `ki-plugins`, `ki-repo`, `ki-repo-roadmap`, `ki-skills`, `ki-specifications`, `ki-subagents`, `ki-tokenomics`, `ki-tools`, `ki-website`, and `ki-website-cloudflare`.
     - [ ] Establish native self-hosted parity and a role map before removing any legacy executor: run the installed or explicit local canonical harness against this source repository, prove that `ki repo educate`, `ki repo audit`, and `ki repo conform --dry-run` resolve every declared repository skill (including declared bounded user-home scopes), and map each remaining aggregate, package-script, CI, pre-commit, bootstrap, and guide-suite role to its native replacement or deliberate retirement.
     - [ ] Decide and implement the native EDUCATE disposition before removing `scripts/educate.ts`: distinguish the legacy repository bootstrap/scaffolding operation from `ki repo educate`'s repository-declared rubric education, then either retain/rehome each build concern or deliberately retire its fixture coverage. The private existing-repository estate uses the maintainer retirement guide, not a tools-owned migration command. Do not leave a compatibility delegator or a second repository runner.
     - [ ] Perform a high-reasoning manual review of every native `scripts/rubric/index.ts` after the parity and EDUCATE boundary are proven: extract the native contract shape from the transitional `RubricItem` casts and repeated mechanical/judgment mappers, retaining only native contract data, read-only evidence contexts, and skill-specific repair policy. Do not move this legacy adapter into `tools-ki`, which must consume native definitions only.
   - [x] Resolve the source harness's nested shared-module symlinks without weakening installed-payload validation: materialise regular, integrity-checked payload files or replace the links before an installed or local direct payload executes rubrics.
   - [ ] Migrate source-harness package scripts, CI, and pre-commit to the proven native repository commands, retaining only commands whose role is explicitly outside governed-rubric execution; run the full source-harness suite against that native path before deleting its predecessor.
   - [ ] Execute the guide-led, fail-closed source-harness deletion: remove each migrated skill's `scripts/govern.ts`, `scripts/educate.ts`, vendored execution payload, and wrapper-only test only after its native role has passed; then remove the repository `.ki/` aggregate, bootstrap payload, manifest, aliases, and superseded bootstrap/guide fixtures. The repository-local source is now deliberately retained at `.agents/skills/ki-self/`, with a derived Claude projection.

## Cross-repository delivery split

The work proceeds in dependency order, with no overlapping implementation ownership.

1. **`tools-ki` / Claude-owned bulk move** — define and implement the versioned governed-rubric contract and its generic runtime: contained definition loading, audit execution, finding conversion and rendering, dependency ordering, dry-run, transaction/rollback, and repair-plan validation. Its fixtures must prove a malformed or unsafe payload fails closed. This is the interface-setting tranche; it touches `tools-ki` only.
2. **Harness / Codex-owned preparation** — the completed inventory identifies every direct-writing context and the 131 nested shared-module links. The first conversion waits for the tools contract to be committed and then ports `ki-handoffs`: one repository-local Markdown-frontmatter repair, with no process, network, GitHub, or user-home side effects. Its fixture proves audit, byte-identical dry-run, host-applied conform, and refusal after a replacement or link attack.
3. **Harness / Codex-owned migration batches** — after that vertical slice proves the contract, port `ki-decision-records`, `ki-feature-definitions`, and `ki-subagents`, then the remaining repository-scoped skills. Treat `ki-authoring` and `ki-engineering` as explicit subprocess-capability designs, `ki-repo-roadmap` as a multi-file transaction, and `ki-repo` as a later exceptional case because it includes hardened transaction and GitHub effects. Route `ki-housekeeping` and `ki-tokenomics` separately because they are user-scoped.
4. **Joint integration boundary** — only after the converted harness runs from an installed or explicit local regular-file payload do the command host, CI, package scripts, and pre-commit migrate. `.ki` is removed last, one proven-redundant surface at a time.

The synchronization point is the committed tools contract and fixture package, not a speculative shared wrapper. The harness migration consumes that contract; it does not alter the tools runtime during a conversion batch.

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
