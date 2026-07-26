---
id: 'FND-004'
title: Define compatible harness registration and native repository-maintenance boundaries
status: in-progress
roadmap: foundation-tooling/define-compatible-harness-registration-and-native-repository-maintenance-boundaries
blocks: —
blocked-by: —
baseline-ref: b4db5da1e0c5d8f6baf8039fcae81472b7a33884
---

## Context

Knowledge Islands is replacing repository-vendored runners with native `ki` operations, but the earlier one-installed-collection design is no longer the current direction.

`ki` installs the canonical `knowledgeislands/ki-agentic-harness` during bootstrap; it is never uninstallable. It may also support additional compatible harnesses, such as an organisation harness, from an XDG-managed user registry.

The harness owns compatible capability semantics and skill-specific rubrics; `tools-ki` owns the CLI platform, public grammar, and generic governed-rubric runtime; KI Specifications owns portable contracts; and the Website owns public user-guide prose.

## Current state

The released `tools-ki` surface installs direct compatible payloads under a user KI data directory, derives harness identity from the owner/repository path, provides the `ki repo educate`, `ki repo audit`, and `ki repo conform` host commands without vendored runners, and activates skills through `ki skill user` and `ki skill repo`.

`tools-ki` now owns the versioned generic governed-rubric runtime, including catalogue and session validation, subject iteration, phase/family/item ordering, progress, finding conversion, host-owned transactions, rollback, post-conform re-audit, and identity checks.

`ki-skills` is the final-contract exemplar, and `ki-handoffs` is the first catalogue cut directly to it. Each semantic family exports one complete `RubricFamily`; `items/index.ts` default-exports one `SkillRubricDefinition` with `createSession`; item-specific audit and conform behaviour lives on the item; and the session owns focused subjects, shared drafts, and one final proposal. `tools-ki` applies eligible conform actions in phase, family, and item order, so several items may change one draft without criterion-code dispatch or conflicting per-item write proposals.

The repository-local `.ki/` executor and package-script aliases have been removed. CI, remaining guide references, and the remaining 24 structured rubric catalogues still contain transitional assumptions or adapters and must be cut directly to the proven contract. The catalogue cut covers those 24 plus the completed `ki-handoffs` and `ki-skills` exemplars; the reference review covers all 27 skills in the former native-publisher fleet, including the now guidance-only `ki-bootstrap`.

[ADR-KI-HARNESS-012](../../../decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md) defines the direct compatible-payload and governed-rubric boundary. `tools-ki` owns the host implementation and its current command grammar. KI Specifications work is deliberately deferred until the implementation contract has settled.

The shared ecosystem GDR now establishes the five-repository ownership model. Its byte-identical mirrors and every local decision-record collection now conform to the current decision-record standard.

## Completed foundation

- Defined qualified capability identity: `<harness-id>:<skill-name>` for skills and the reserved `<harness-id>:<kind>/<name>` extension shape for other kinds.
- Established direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; legacy `latest/` and lock layouts migrate only as recognised old state.
- Reassigned CLI installation, command grammar, repository resolution, activation, governed-rubric hosting, migration, reporting, and delivery ownership to `tools-ki`.
- Proved the final direct catalogue/session boundary with `ki-skills`, including two ordered item actions changing one shared draft and yielding one host-published write.
- Deferred KI Specifications work until the implementation contract is stable enough to standardise.
- Added `shared_record: true` for deliberate verbatim governance-record mirrors. The decision-record checker includes a mirror in an existing local prefix-and-scope sequence, while excluding an otherwise foreign mirror from serial continuity.
- Conformed and audited the decision-record collections in Arcadia Principal, the harness, `tools-ki`, KI Specifications, and the Website with no FAIL or WARN findings.

## Steps

1. ✓ Define qualified capability identity, including the settled `<harness-id>:<skill-name>` form for skills and an explicit extension point for other capability kinds.
2. ✓ Adopt direct owner/repository installation paths with immutable archive evidence and no user-selectable version model; retain legacy `latest/` only as a recognised migration input.
3. ✓ Consolidate the harness decision records around direct compatible payloads, capability semantics, and the harness publication boundary; keep CLI-host, release, and delivery ownership in `tools-ki`.
4. ✓ Reconcile the `tools-ki` host decision with its delivered direct-payload layout, user configuration, command grammar, scoped activation, tools-owned governed-rubric runtime, migration, reporting, and status listing.
5. ✓ Reconcile the planned maintenance vocabulary with the delivered command surface, retaining only forms that remain intentionally planned and their relationship to explicit `ki skill user` and `ki skill repo` activation.
6. ✓ Defer KI Specifications decisions and portable-contract material until the implementation contract is stable enough to standardise.
7. ✓ Align the harness guide, bootstrap standards, capability rubrics, and `ki(1)` with the settled boundary; preserve current-versus-planned command status and remove obsolete one-collection terminology.
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
     - [x] Port `ki-skills`, then replace its transitional adapter with the final exemplar: self-contained family exports, one default catalogue export with `createSession`, item-owned conform actions, operation-scoped subjects and drafts, and one final session proposal. `tools-ki` orders overlapping actions against the shared draft and publishes one validated replacement.
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
     - [x] Complete the `ki-skills` context review before using it as the fleet exemplar: subjects now prepare evidence once per session and return a stable context; each subject supplies only its declared family facets; missing evidence fails closed; shared draft capabilities coalesce ordered item actions; and dead footprint/status modes plus unnecessary public exports are removed.
     - [ ] Review and finish all 27 former native-publisher skills one at a time. For every structured catalogue, apply the common cut: make each family module export one complete family only; default-export one `SkillRubricDefinition` with `createSession`; move rule behaviour onto its item; move shared-draft composition into the session; and remove `catalogue.ts` splits, `LegacyFamily` casts, family mappers, barrel exports, and per-skill execution/reporting adapters. Every row also includes a reference-set review: treat `standards.md`, generated `rubric.md`, `sources.md`, and optional `exemplars.md` as the normal core; justify every omission and every additional format, mode, contract, template, or guide reference by a distinct reader need; merge or remove stale and duplicative references; and align `SKILL.md` navigation, rubric-family `standard` fields, item sources, and relative links with the retained set. A row is complete only when both its implementation shape and references pass review.
       - [ ] `ki-authoring` — move formatter/subprocess and owned-file proposal policy out of the index; retain only bounded item actions and session draft/command capabilities; justify the split `standards/markdown.md` and `standards/toml.md` normative set instead of a single `standards.md`.
       - [ ] `ki-binding` — preserve its mixed repository and user-home evidence honestly while removing the legacy adapter; decide whether the core set's lack of `exemplars.md` is intentional.
       - [ ] `ki-binding-chezmoi` — retain external chezmoi choices as report-only domain policy; justify its core set and absent exemplars.
       - [ ] `ki-bootstrap` — retain its guidance-only, no-catalogue boundary; re-evaluate whether `rubric.md` still belongs beside `standards.md`, `sources.md`, and `exemplars.md`, or is retired catalogue residue.
       - [ ] `ki-decision-records` — separate its large context builder and multi-file index draft from catalogue wiring; justify `dr-format.md` and each mode procedure against the core references.
       - [ ] `ki-dotfiles-chezmoi` — retain explicit-create semantics for `.chezmoiignore` in the session proposal; decide whether the core set's lack of exemplars is intentional.
       - [ ] `ki-engineering` — it already has self-contained family files; replace `createContext` with `createSession`, remove remaining item exports, split its 1,155-line context surface by evidence responsibility, and confirm its core four references remain sufficient.
       - [ ] `ki-feature-definitions` — remove family mapping and index-owned heading-normalisation proposal policy; justify `feature-format.md` and each mode procedure against the core references.
       - [ ] `ki-handoffs` — retain its completed one-family `createSession` cut and session-owned readiness draft; review the core four references and only then mark the full row complete.
       - [ ] `ki-harness` — preserve harness-marker append safety while removing index-owned write planning; confirm its core four references describe the direct installed-harness boundary.
       - [ ] `ki-homebrew-tap` — preserve applicability/manual Homebrew checks and move marker mutation into an item-owned draft action; justify its mode procedures and absent exemplars.
       - [ ] `ki-housekeeping` — preserve bounded user-home scope and memory repair containment while removing its 193-line adapter index; justify `memory-format.md`, the mode procedures, and absent exemplars.
       - [ ] `ki-kb` — split its 331-line evidence context and keep index/MEMORY creation as session-owned create proposals; justify the KB reference, mode procedures, and templates as distinct from standards and exemplars.
       - [ ] `ki-kb-activities` — retain safe `Activities.md` creation and move it out of catalogue wiring; determine whether its mode documents collectively replace a missing `standards.md` or whether the normative core is incomplete.
       - [ ] `ki-kb-live-artifacts` — retain safe index/frontmatter drafts while leaving rendering and deletion manual; justify each mode procedure against the core references.
       - [ ] `ki-kb-streams` — preserve controlled-vocabulary normalisation on one shared proposal rather than index write aggregation; reconcile the two title-cased structure/process references and many mode procedures with the missing canonical `standards.md`.
       - [ ] `ki-mcp` — retain bounded configuration edits and keep client generation outside conform; justify the two surface-specific references and mode procedures against the core set.
       - [ ] `ki-plugins` — remain report-only for generated projections; remove the adapter and catalogue barrel, and decide whether the core set's lack of exemplars is intentional.
       - [ ] `ki-repo` — replace `definitions.ts`, its 137-line adapter index, and its 2,159-line mixed context surface; preserve explicit create/append and GitHub confirmation boundaries, and justify `config-standards.md` as a distinct secondary norm.
       - [ ] `ki-repo-roadmap` — move its 1,349-line multi-file context and replacement aggregation behind focused session drafts without weakening transaction semantics; justify `plan-format.md` as the one distinct format reference.
       - [ ] `ki-skills` — re-review the exemplar before any fleet fan-out; keep one clean catalogue/session contract, then justify `rubric-authoring.md`, candidate/mode references, and either reconcile or remove the explicitly retired `checker-contract.md` and `checker-response.md`.
       - [ ] `ki-specifications` — defer implementation work; when resumed, remove family mapping and index-owned marker proposals without expanding Specifications scope, and decide whether the core set's lack of exemplars is intentional.
       - [ ] `ki-subagents` — preserve per-agent subjects and filename-alignment drafts while removing its legacy family adapter; confirm the core four references remain sufficient.
       - [ ] `ki-tokenomics` — preserve bounded `.claude` user-home scope and report-only unsafe work; justify `headroom-operations.md` and each mode procedure against the core references.
       - [ ] `ki-tools` — retain bounded executable/configuration repairs as item/session behaviour, not index policy; justify its mode procedures and absent exemplars.
       - [ ] `ki-website` — retain safe `.gitignore` and `.ki-config.toml` creation in the session proposal while leaving external deployment manual; confirm the core four references remain sufficient.
       - [ ] `ki-website-cloudflare` — keep Cloudflare/Wrangler operations report-only and reduce its thin context/catalogue adapter directly; justify `setup-guide.md` as distinct from standards and exemplars.
   - [x] Resolve the source harness's nested shared-module symlinks without weakening installed-payload validation: materialise regular, integrity-checked payload files or replace the links before an installed or local direct payload executes rubrics.
   - [ ] Migrate source-harness package scripts, CI, and pre-commit to the proven native repository commands, retaining only commands whose role is explicitly outside governed-rubric execution; run the full source-harness suite against that native path before deleting its predecessor.
     - [ ] Execute the guide-led, fail-closed source-harness deletion: remove each migrated skill's `scripts/govern.ts`, `scripts/educate.ts`, vendored execution payload, and wrapper-only test only after its native role has passed; then remove the repository `.ki/` aggregate, bootstrap payload, manifest, aliases, and superseded bootstrap/guide fixtures. The repository-local source is now deliberately retained at `.agents/skills/ki-self/`, with a derived Claude projection.

## Delegation

The 27-skill review is judgment-led and runs as one bounded task per skill. A worker owns only its assigned `skills/<family>/<name>/` root and returns a reference inventory, keep/merge/remove justification, implementation diff, focused verification, and any cross-skill finding without editing this plan. The orchestrator reviews each diff, regenerates `references/rubric.md`, runs the direct `ki` gates, commits the verified skill independently, and then marks only that skill's row complete. Run no more than three non-overlapping workers concurrently.

1. **Round 1 — exemplar gate:** assign `ki-skills` alone to a general-purpose `gpt-5.6-sol` worker at `xhigh` reasoning. It settles the reference taxonomy and final catalogue/session shape, including the disposition of the retired checker contract/response documents. No other skill starts until the orchestrator accepts this exemplar and records the reusable review checklist.
2. **Round 2 — complex ownership boundaries:** assign one skill per general-purpose `gpt-5.6-sol` worker at `high` reasoning, with at most three in flight: `ki-engineering`, `ki-decision-records`, `ki-repo`, `ki-repo-roadmap`, `ki-kb`, `ki-kb-streams`, and `ki-tokenomics`. Gate each on item-owned behaviour, session-owned shared drafts, reference-purpose justification, generated-rubric parity, focused tests, and direct audit/conform dry-run evidence.
3. **Round 3 — bounded fleet fan-out:** review every remaining row one skill at a time with general-purpose `gpt-5.6-sol` at `high` reasoning, again with at most three non-overlapping workers. Although many code cuts are mechanical, reference retention is a standards judgment; do not lower the model tier for a combined code-and-reference review. Keep `ki-specifications` parked until the user explicitly resumes that scope.
4. **Round 4 — integration gate:** the orchestrator re-audits all retained references and links, checks every rubric-family `standard` and item source, verifies all declared repository skills through `ki repo educate`, `ki repo audit`, and `ki repo conform --dry-run`, then proceeds to CI/pre-commit migration and legacy deletion. A worker may identify cross-skill cleanup, but only the orchestrator schedules it so skill-root ownership never overlaps.

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
5. All 27 skill rows record a reviewed reference set: core omissions are justified, every additional reference has one distinct purpose, retained files are linked from the appropriate navigation or catalogue field, and retired execution-contract prose is absent.
6. Every structured catalogue follows the accepted `ki-skills` family/session contract, its generated `references/rubric.md` is in sync, and the installed or explicit local harness passes educate, audit, and conform dry-run through `ki`.

## Dependencies / blocks

This work establishes the architectural prerequisite for [CLI-004](../../../../../tools-ki/docs/roadmap/cli/plans/CLI-004-native-repo-maintenance.md). CLI-004 owns the implementation and release evidence; it remains independently executable once the contract is accepted.
