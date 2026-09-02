---
id: KI-HARNESS-GOV-053
area: GOV
title: Standardise KI configuration
theme: governance-consistency
horizon: soon
status: draft
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Establish and roll out a canonical `.ki.toml` presentation that keeps each skill's declaration and configuration together, makes longer files easy to navigate, and removes redundant configuration without changing repository intent.

## Context

Recent configuration work in `krisb/dotfiles` supplied a concrete worked example. Agora memberships and trade routes were changed from separate nested table blocks to compact dotted assignments under their explicit owning skill roots in commits `9acb5e9` and `c7e43b8`. Commit `ba8247a` then grouped the file under concise Foundation, Repository shape, Governance and runtime, Change management, and Relationships comments, kept related owner declarations contiguous, and compacted the roadmap area mapping.

The roadmap example also exposed semantic drift. `krisb/dotfiles` declared both `themes = ["user-environment"]` and `areas.UE = "user-environment"`, although the roadmap standard defines repository-wide themes and fixed issuing areas as mutually exclusive modes. The repository uses identifiers such as `DOTFILES-UE-006`, so the area mapping is authoritative and the themes array was redundant. The `ki-work-roadmap` audit nevertheless passed the mixed declaration, showing a gap between the written contract and its checker.

The accepted and later pruned `KI-HARNESS-GOV-046` investigation already found that configuration readability benefits from foundation-first ordering, contiguous owner blocks, and optional navigational comments in long or heterogeneous files. It rejected a mandatory global alphabetic sort because spelling order separates structural roots from their adapters and creates churn without protecting semantics. This item uses the new compact-form feedback to turn those findings into an implementable standard and estate rollout.

## Boundary

This work may change presentation standards, examples, source-aware checks, and repository-local `.ki.toml` files. It must not infer one skill's settings from another, alter Agora membership or trade direction, change roadmap identifiers or work priority, split the shared configuration file, or treat comments as consumer-visible semantics.

Each repository retains review and acceptance authority for its own rollout commit. Complex or multiline nested configuration may remain in standard tables when compact dotted assignments would reduce readability.

## Shaping

The intended approach is to reconcile the `ki-repo`, `ki-authoring`, and owning-skill standards around one explicit root table per skill, contiguous owner configuration, and a documented choice between dotted assignments and nested tables. Preserve the earlier five optional neighbourhoods for navigational comments, with foundations first and owner affinity taking precedence over global alphabetic sorting. Decide whether stable ordering within each neighbourhood remains judgment guidance or gains a narrow deterministic check.

Add focused `ki-work-roadmap` coverage that rejects simultaneous `themes` and `areas`, while retaining `themes` for repository-wide identifiers and the area-to-theme map for fixed-area identifiers. Update examples so each issuing mode has one unambiguous canonical form.

Before promotion to Next, inventory the current registered estate, classify equivalent compact-form opportunities separately from semantic redundancy, settle which presentation rules are mechanically checkable without reserialising TOML or losing comments, and define an equivalence check plus repository-by-repository commit procedure for rollout.

Known dependencies are local and available: the current `.ki.toml` parser already resolves the compact dotted forms, and the `krisb/dotfiles` audits passed after the worked-example change. No other roadmap item blocks shaping.

## Discussion

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
