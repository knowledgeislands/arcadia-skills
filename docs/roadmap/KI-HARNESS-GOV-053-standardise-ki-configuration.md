---
id: KI-HARNESS-GOV-053
area: GOV
title: Standardise KI configuration
theme: governance-consistency
horizon: next
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 8079d53194b8ee3cd53663713b88242db73a50e2
---

## Goal

Establish and roll out a canonical `.ki.toml` presentation that keeps each skill's declaration and configuration together, makes longer files easy to navigate, and removes redundant configuration without changing repository intent.

## Context

Recent configuration work in `krisb/dotfiles` supplied a concrete worked example. Agora memberships and trade routes were changed from separate nested table blocks to compact dotted assignments under their explicit owning skill roots in commits `9acb5e9` and `c7e43b8`. Commit `ba8247a` then grouped the file under concise Foundation, Repository shape, Governance and runtime, Change management, and Relationships comments, kept related owner declarations contiguous, and compacted the roadmap area mapping.

Follow-up commit `942fb23` strengthened those headings into visible comment banners and framed the file title. Placing a decorative rule above the exact conformance header made `ki-repo` fail `FILES-5`; corrective commit `0c3fd5d` retained the banners but restored the two-line header and following blank line as the first bytes. This feedback establishes that navigational presentation must compose around the contract marker rather than wrap it.

The roadmap example also exposed semantic drift. `krisb/dotfiles` declared both `themes = ["user-environment"]` and `areas.UE = "user-environment"`, although the roadmap standard defines repository-wide themes and fixed issuing areas as mutually exclusive modes. The repository uses identifiers such as `DOTFILES-UE-006`, so the area mapping is authoritative and the themes array was redundant. The `ki-work-roadmap` audit nevertheless passed the mixed declaration, showing a gap between the written contract and its checker.

The accepted and later pruned `KI-HARNESS-GOV-046` investigation already found that configuration readability benefits from foundation-first ordering, contiguous owner blocks, and optional navigational comments in long or heterogeneous files. It rejected a mandatory global alphabetic sort because spelling order separates structural roots from their adapters and creates churn without protecting semantics. This item uses the new compact-form feedback to turn those findings into an implementable standard and estate rollout.

## Boundary

This work may change presentation standards, examples, source-aware checks, and repository-local `.ki.toml` files. It must not infer one skill's settings from another, alter Agora membership or trade direction, change roadmap identifiers or work priority, split the shared configuration file, or treat comments as consumer-visible semantics.

Each repository retains review and acceptance authority for its own rollout commit. Complex or multiline nested configuration may remain in standard tables when compact dotted assignments would reduce readability.

This implementation changes only the harness contract and this repository's `.ki.toml`. It does not centralise another skill's schema or defaults in `ki-repo`, automatically rewrite TOML, infer semantic neighbourhood membership from skill names, or modify sibling repositories.

## Current state

The exact two-line `.ki.toml` conformance header is mechanically enforced by `ki-repo` `FILES-5`, but neighbourhood banners, owner-block continuity, and foundation-first ordering remain judgment-only under `ki-authoring`. The website core resolves omitted `site-root` to `apps/site`, yet `SITE-2` still accepts an explicit `site-root = "apps/site"` even though the standard tells configuration writers not to materialise that default.

A read-only snapshot of 34 registered `.ki.toml` files found only three using neighbourhood banners and one explicitly materialising the website default. The rollout is therefore intentionally diagnostic first: publish actionable findings, conform this repository's own configuration, and leave every sibling repository under its own work and acceptance authority.

### Earlier shaping

The intended approach is to reconcile the `ki-repo`, `ki-authoring`, and owning-skill standards around one explicit root table per skill, contiguous owner configuration, and a documented choice between dotted assignments and nested tables. Preserve the earlier five optional neighbourhoods for navigational comments, with foundations first and owner affinity taking precedence over global alphabetic sorting. Decide whether stable ordering within each neighbourhood remains judgment guidance or gains a narrow deterministic check.

Add focused `ki-work-roadmap` coverage that rejects simultaneous `themes` and `areas`, while retaining `themes` for repository-wide identifiers and the area-to-theme map for fixed-area identifiers. Update examples so each issuing mode has one unambiguous canonical form.

Before promotion to Next, inventory the current registered estate, classify equivalent compact-form opportunities separately from semantic redundancy, settle which presentation rules are mechanically checkable without reserialising TOML or losing comments, and define an equivalence check plus repository-by-repository commit procedure for rollout.

Known dependencies are local and available: the current `.ki.toml` parser already resolves the compact dotted forms, and the `krisb/dotfiles` audits passed after the worked-example change. No other roadmap item blocks shaping.

## Steps

- [x] Add a source-aware `ki-repo` configuration-presentation check that preserves TOML semantics and comments while diagnosing substantial files without recognised neighbourhood banners, non-canonical banner order, a non-foundation opening block, child tables before their explicit owner root, or owner blocks split across neighbourhoods.
- [x] Keep semantic-neighbourhood choice at the judgment boundary: the mechanical check validates exact recognised banners, ordering, and owner continuity without maintaining a brittle global map from every skill name to one neighbourhood.
- [x] Update `ki-repo-website` so an omitted `site-root` selects `apps/site`, an explicit non-default safe path remains valid, and explicit `site-root = "apps/site"` produces a redundant-default diagnostic.
- [x] Add focused fixtures for compact configurations, well-structured substantial configurations, malformed banner and owner-block cases, implicit website defaults, explicit overrides, and redundant explicit defaults.
- [x] Align this repository's `.ki.toml` with the bannered structure, prove parsed before-and-after equivalence, regenerate affected rubrics, and record the read-only estate inventory without modifying sibling repositories.
- [x] Apply the established banner and owner-block presentation to the 29 registered receiver configurations reporting `FILES-9`, without changing their parsed TOML data.
- [x] Remove the explicit `site-root = "apps/site"` default from `infoschematics`, proving that the effective website root remains `apps/site`.
- [x] Verify and commit each receiver independently, skipping and reporting any contested `.ki.toml`, ambiguous neighbourhood assignment, malformed source, or repository-specific failed gate.
- [x] Re-scan all 34 registered configurations and record zero remaining presentation or redundant-default findings before returning to review.

## Files touched

- `.ki.toml`
- `skills/keystone/ki-repo/SKILL.md`
- `skills/keystone/ki-repo/references/standards-configuration.md`
- `skills/keystone/ki-repo/references/rubric.md`
- `skills/keystone/ki-repo/scripts/rubric/contexts/`
- `skills/keystone/ki-repo/scripts/rubric/items/files.ts`
- `skills/governance/ki-authoring/references/standards-toml.md`
- `skills/governance/ki-authoring/references/rubric.md`
- `skills/governance/ki-authoring/scripts/rubric/items/toml.ts`
- `skills/keystone/ki-skills/scripts/internal/remediation-inventory.test.ts`
- `skills/repo-structure/ki-repo-website/SKILL.md`
- `skills/repo-structure/ki-repo-website/references/standards-website.md`
- `skills/repo-structure/ki-repo-website/references/rubric.md`
- `skills/repo-structure/ki-repo-website/scripts/rubric/contexts/website.test.ts`
- `skills/repo-structure/ki-repo-website/scripts/rubric/items/site.ts`
- This roadmap record.

## Verify

Run the focused `ki-repo` and `ki-repo-website` tests, `bunx tsc --noEmit`, and `bun run test`. Regenerate the two affected rubrics, then run focused `ki-repo`, `ki-repo-website`, `ki-authoring`, `ki-skills`, and `ki-work-roadmap` audits. Parse `.ki.toml` before and after its presentation-only edit and compare the complete data model for equality.

## Dependencies / blocks

No local dependency blocks implementation. Cross-repository rollout is deliberately outside this item: the harness publishes diagnostics and inventory evidence, while each registered repository owns its configuration edit, review, acceptance, and commit.

## Documentation impact

### Decision Records

No new decision record is planned. This is executable enforcement of the already-adopted validate-down, implicit-default, and configuration-presentation contracts.

Update the `ki-repo` configuration standard and generated rubric for the source-aware structure diagnostic. Update the `ki-repo-website` standard, skill summary, and generated rubric so the implicit `apps/site` default and redundant explicit spelling agree with executable evidence.

### Specifications

No specification change is planned. The behaviour is a repository-governance audit contract rather than a product-facing system requirement.

### Guides

No guide change is planned. The rule concerns configuration contract and presentation rather than a task procedure.

### Roadmap

Retain fleet rollout as receiver-owned work. This item records read-only evidence and does not create or mutate another repository's roadmap record without an accepted route.

## Delegation

### Locked decisions

- Preserve each repository's parsed `.ki.toml` data exactly; the sole semantic-source removal is `infoschematics`'s explicit `site-root = "apps/site"`, whose omission selects the same default.
- Keep the exact two-line conformance header as the first bytes, then use only the established banners in canonical order: Foundation, Repository shape, Governance runtime, Change management, Relationships.
- Keep `[repo]`, `[skills.ki-repo]`, and `[skills.ki-authoring]` in Foundation; group remaining declarations by their established purpose and keep every skill root with its child tables.
- Change only `.ki.toml` in receiver repositories, make one Conventional Commit per repository, and never push.

### Escalate

- Return without editing when `.ki.toml` is already dirty, staged, symlinked, malformed, or contains changes the worker cannot fully account for.
- Return any ambiguous neighbourhood classification, parsed-data mismatch, new audit failure attributable to the edit, or need to touch a caller, workflow, platform, roadmap, or other file.
- Do not repair unrelated repository drift or include another actor's staged paths.

### Worker: hnr-equalremedy-infoschematics

- **Deliverable:** Align the seven assigned repository configurations and commit each uncontested result.
- **Inputs:** `5g-emerge-ibc-2026`, `hnr-agentic-harness`, `kit-hnr`, `dafacts-website`, `er-agentic-harness`, `er-research`, and `infoschematics`; canonical checker at the harness baseline; locked decisions above.
- **Scope:** Only each assigned repository's root `.ki.toml`; no other file or external system.
- **Authority:** Read local instructions and repository state, edit the scoped files, run read-only verification, and create one local commit per repository; do not push.
- **Isolation:** Exclusive assigned repository set in the shared filesystem; maintain a per-repository touched-path set containing only `.ki.toml` and serialise each Git write window.
- **Verify:** Compare parsed TOML before and after, confirm the presentation inspector reports no issue, run the applicable focused repository audit, and inspect the resulting commit and clean status.
- **Return:** Repository-by-repository commit IDs, verification outcomes, and exact escalations or skips.
- **Checkpoint:** Return after all seven repositories are committed or safely escalated.

### Worker: knowledgeislands-core

- **Deliverable:** Align the eight assigned repository configurations and commit each uncontested result.
- **Inputs:** `homebrew-tap`, `ki-arcadia-principal`, `ki-plugins`, `ki-specifications`, `ki-techne-principal`, `ki-website`, `mcp-acquire-whatsapp`, and `mcp-git-audit`; canonical checker at the harness baseline; locked decisions above.
- **Scope:** Only each assigned repository's root `.ki.toml`; no other file or external system.
- **Authority:** Read local instructions and repository state, edit the scoped files, run read-only verification, and create one local commit per repository; do not push.
- **Isolation:** Exclusive assigned repository set in the shared filesystem; maintain a per-repository touched-path set containing only `.ki.toml` and serialise each Git write window.
- **Verify:** Compare parsed TOML before and after, confirm the presentation inspector reports no issue, run the applicable focused repository audit, and inspect the resulting commit and clean status.
- **Return:** Repository-by-repository commit IDs, verification outcomes, and exact escalations or skips.
- **Checkpoint:** Return after all eight repositories are committed or safely escalated.

### Worker: knowledgeislands-mcp-tools

- **Deliverable:** Align the eight assigned repository configurations and commit each uncontested result.
- **Inputs:** `mcp-gsuite`, `mcp-housekeeping-chatgpt`, `mcp-housekeeping-claude`, `mcp-housekeeping-codex`, `mcp-ki-kb-fs`, `mcp-ki-kb-notion-mirror`, `mcp-m365`, and `tools-git-almanac`; canonical checker at the harness baseline; locked decisions above.
- **Scope:** Only each assigned repository's root `.ki.toml`; no other file or external system.
- **Authority:** Read local instructions and repository state, edit the scoped files, run read-only verification, and create one local commit per repository; do not push.
- **Isolation:** Exclusive assigned repository set in the shared filesystem; maintain a per-repository touched-path set containing only `.ki.toml` and serialise each Git write window.
- **Verify:** Compare parsed TOML before and after, confirm the presentation inspector reports no issue, run the applicable focused repository audit, and inspect the resulting commit and clean status.
- **Return:** Repository-by-repository commit IDs, verification outcomes, and exact escalations or skips.
- **Checkpoint:** Return after all eight repositories are committed or safely escalated.

## Review

### Delivered

Delivered the approved `.ki.toml` enforcement boundary and its explicitly authorised estate rollout from immutable baseline `8079d53194b8ee3cd53663713b88242db73a50e2`. The harness now diagnoses configuration-presentation and redundant website-default drift, while all 30 affected receiver configurations are aligned in separate local commits.

### Summary of changes

- Added `FILES-9`, backed by a source scanner that diagnoses the established substantial-file threshold, exact banner form and order, foundation opening, explicit roots before child tables, and owners split across banners.
- Kept selection of non-foundation neighbourhoods within `ki-authoring` judgment while aligning `ki-repo`, `ki-authoring`, and generated rubric wording.
- Changed website `SITE-2` to diagnose explicit `site-root = "apps/site"` while retaining omission and safe non-default overrides.
- Aligned the harness and 29 receiver configurations under their needed canonical neighbourhoods.
- Removed the redundant explicit website default from `infoschematics`; omission still resolves to `apps/site`.

#### Receiver commits

- `5g-emerge-ibc-2026` — `7bc2b0f8fc904678dfffb628e9d68c6bd6f966f3`
- `hnr-agentic-harness` — `c56b103f7103f1f457b79a5f58a4cc68a691b57a`
- `kit-hnr` — `3782191dcb75319b04df955b588921387339d48c`
- `dafacts-website` — `9cb4a1812351441506af53628c2ea5379453ad7c`
- `er-agentic-harness` — `9949828e0f0c566d9cc543103ddc4fc2faef07ce`
- `er-research` — `a5f846260650c8780a296f72dc52ef408ed7e91e`
- `infoschematics` — `0dacf9cc2be690520fd8332fc24c49b1a281a80c`
- `homebrew-tap` — `60928c8512acb40d15e2f0c8f0b20116ab3296b2`
- `ki-arcadia-principal` — `d2ad8252fac40dfb5cf0908fe86b9dfdf7c10857`
- `ki-plugins` — `4ccffdf5d07432ede0a6fdbb03cdafd3411595f7`
- `ki-specifications` — `ade36679edaf11b879b800fb05b247b6763fcdcc`
- `ki-techne-principal` — `2d91b7e6e72698c73f65f608f48112752215ee9a`
- `ki-website` — `9f7bce8532ae37fb9c5e988b71159ce4eac0858f`
- `mcp-acquire-whatsapp` — `377786574ecb9761668b75526f5685b5912360db`
- `mcp-git-audit` — `7e6f9c0b94e38ba2f8068413f455d1f14a8403d1`
- `mcp-gsuite` — `18a99edd8651573e97b3a10a58676d930d8dd86c`
- `mcp-housekeeping-chatgpt` — `de5808d13a421d78a73f267f5668e490c569d60b`
- `mcp-housekeeping-claude` — `bf3460d90da64a2c446a3906a0d85911e89223e1`
- `mcp-housekeeping-codex` — `4dc5d76ebbc24422c44147ee59220900339f00b7`
- `mcp-ki-kb-fs` — `6ca50e953198c7689032fd81e6ab396d97f88e2c`
- `mcp-ki-kb-notion-mirror` — `8abe30aef919ae264115744b47bdd6ca4d7d8613`
- `mcp-m365` — `67a63b98cd45cd329bf508e7c3ee3c4cd6713e1e`
- `tools-git-almanac` — `fc37f96060354148868c5b2e0b9d6e104812afcf`
- `tools-ki` — `8f12c0e27754a6a9c31523919971d436508173ba`
- `tools-mgit` — `7d8aef0437330cbfdd64741233ee472a9702490a`
- `kit-midnight.ninja` — `ad47a749d880d5b1434c925cc05cd73e684f5d12`
- `kit-principal` — `c66e461dfe029165316144a645305758e5de3659`
- `kit-techmedix` — `ce7b7f7981de051fcd392b12b22876de24f81c7a`
- `vallearmonia-principal` — `71872dfdf59c0bd0be710e89e416d69a5c96b9f9`
- `vallearmonia-website` — `8b396d961d4b74e539059e24fce6a20d5a0cf161`

### Verification

- The focused configuration-presentation, repository-integration, and website-context suites passed; the complete Bun test suite and TypeScript gate passed for the harness implementation.
- Each of the 30 receiver commits contains only `.ki.toml`; 29 preserve parsed TOML exactly, while `infoschematics` differs only by omission of the explicit value already supplied by the `apps/site` default.
- Every committed receiver source reports zero presentation-inspector issues and passes `git diff --check`.
- The `mcp-acquire-whatsapp` explicit-path commit preserved the other actor staged raw index projection byte-for-byte and excluded every unrelated path.
- Focused receiver audits report no `FILES-9` or redundant-default finding. Existing failures and warnings in other repository areas remain out of scope.
- A final independent scan found 34 registered configurations, zero presentation or redundant-default findings, and zero dirty `.ki.toml` paths.

### Outstanding concerns

No concern remains within the approved rollout. Existing unrelated repository audit findings and concurrent implementation changes were not repaired, staged, or included. The pre-existing `infoschematics` stylesheet change and the active `mcp-acquire-whatsapp` implementation set remain owned by their original actors. No repository was pushed.

### Post-change review

The goal boundary is met. Deterministic source relationships are enforced centrally, semantic neighbourhood fit remains human-reviewable, the implicit website default is effective across the estate, and every affected receiver has an isolated configuration-only commit.

### Mini recap

The shared `.ki.toml` standard is executable and deployed across all 34 registered configurations. The rollout also exercised the shared-working-tree Git contract: touched-path commits stayed isolated even where unrelated work was present.

## Discussion

### Mechanical threshold

A compact configuration has at most two declared skill roots beyond the required `[skills.ki-repo]` and `[skills.ki-authoring]` foundation and may omit banners. A substantial configuration has three or more additional skill roots and must use at least the exact `Foundation` banner plus one other needed recognised neighbourhood banner. Recognised banners are unique and appear only in canonical order: Foundation, Repository shape, Governance runtime, Change management, Relationships. Each banner must introduce a non-empty declaration group.

The source-aware check additionally fixes the mechanically knowable foundation: `[repo]` is the first table, `[skills.ki-repo]` is the first skill root, and `[skills.ki-authoring]` follows it. Every explicit skill root precedes its child tables, and no owner's block crosses a neighbourhood banner. Assigning a non-foundation skill to the most meaningful neighbourhood remains a `ki-authoring` judgment rather than a central hard-coded skill taxonomy.

### Compact owner blocks

The Agora and trade changes preserve parsed data while making the declaration boundary visible in one place:

```toml
[skills.ki-agora]
memberships.ki-all = { home = "https://github.com/knowledgeislands/ki-agentic-harness", role = "maintainer" }

[skills.ki-trades]
routes."knowledgeislands/tools-ki" = { export = ["work", "knowledge"], import = ["work", "knowledge"] }
```

This is a presentation convention, not a schema shortcut: the owning root remains explicit, and each skill still validates only its own parsed table. A source-aware rule should prefer this form only for short keyed maps whose complete value remains readable on one line.

### Themes and issuing areas

The two roadmap forms serve different identity schemes. A repository-wide sequence declares `themes = ["user-environment"]` and issues identifiers such as `DOTFILES-006`. Fixed-area mode declares `areas.UE = "user-environment"` and issues identifiers such as `DOTFILES-UE-006`; the map simultaneously declares the immutable area code and its allowed human-readable theme. Declaring both does not add information and contradicts the standard's one-mode rule.

The worked example therefore uses:

```toml
[skills.ki-work-roadmap]
areas.UE = "user-environment"
```

The current checker accepts both forms together and verifies only that each area value appears in the themes list. Implementation should replace that compatibility behaviour with an explicit mixed-mode failure and a regression fixture.

### Ordering and comments

The prior estate investigation remains the starting point: `[repo]` first, `[skills.ki-repo]` first among skills, each owner's root and nested data contiguous, and data-heavy relationship blocks toward the end. Optional headings should use only the neighbourhoods a file needs:

- Foundation
- Repository shape
- Governance and runtime
- Change management
- Relationships

Global alphabetical ordering remains a rejected default unless new estate evidence overturns the earlier conclusion. Alphabetic order may still be useful within a neighbourhood where it does not separate an owning skill from its adapter or nested configuration.

### Rollout evidence

The `krisb/dotfiles` worked example passed the `ki-repo`, `ki-authoring`, `ki-work`, `ki-work-roadmap`, `ki-agora`, `ki-trades`, and `ki-repo-dotfiles-chezmoi` audits. A parsed before-and-after comparison also confirmed semantic equivalence after excluding the deliberately removed redundant `themes` key. Estate rollout should retain that standard: parse before and after, compare the complete data model after only approved semantic removals, preserve comments, and commit each repository independently.
