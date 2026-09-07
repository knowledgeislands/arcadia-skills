---
id: KI-HARNESS-GOV-053
area: GOV
title: Standardise KI configuration
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked_by: []
baseline_ref: null
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

- [ ] Add a source-aware `ki-repo` configuration-presentation check that preserves TOML semantics and comments while diagnosing substantial files without recognised neighbourhood banners, non-canonical banner order, a non-foundation opening block, child tables before their explicit owner root, or owner blocks split across neighbourhoods.
- [ ] Keep semantic-neighbourhood choice at the judgment boundary: the mechanical check validates exact recognised banners, ordering, and owner continuity without maintaining a brittle global map from every skill name to one neighbourhood.
- [ ] Update `ki-repo-website` so an omitted `site-root` selects `apps/site`, an explicit non-default safe path remains valid, and explicit `site-root = "apps/site"` produces a redundant-default diagnostic.
- [ ] Add focused fixtures for compact configurations, well-structured substantial configurations, malformed banner and owner-block cases, implicit website defaults, explicit overrides, and redundant explicit defaults.
- [ ] Align this repository's `.ki.toml` with the bannered structure, prove parsed before-and-after equivalence, regenerate affected rubrics, and record the read-only estate inventory without modifying sibling repositories.

## Files touched

- `.ki.toml`
- `skills/keystone/ki-repo/references/standards-configuration.md`
- `skills/keystone/ki-repo/references/rubric.md`
- `skills/keystone/ki-repo/scripts/rubric/contexts/`
- `skills/keystone/ki-repo/scripts/rubric/items/files.ts`
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
