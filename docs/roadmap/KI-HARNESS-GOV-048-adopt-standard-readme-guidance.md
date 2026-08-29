---
id: KI-HARNESS-GOV-048
title: Adopt Standard Readme guidance
area: GOV
theme: governance-consistency
horizon: next
status: ready
blocks: []
blocked_by: []
baseline_ref: null
---

## Goal

Give `ki-authoring` a scoped README convention set informed by Standard Readme, so Knowledge Islands repositories gain clearer entry points and progressive disclosure without inheriting a library-oriented external template as universal policy.

## Context

[Standard Readme](https://github.com/RichardLitt/standard-readme) is a credible, maintained synthesis of README practice. Its strongest transferable ideas match Knowledge Islands needs: lead with identity and purpose, make installation and usage discoverable where applicable, add navigation only when length warrants it, and keep contribution and licence information easy to find.

The source is nevertheless optimized for open-source libraries and prescribes details that should not become universal KI rules. `ki-authoring` currently has no dedicated README convention set, and its source list does not distinguish advisory practice sources from the specifications and tools that define the mechanical authoring baseline.

## Boundary

This item adds an advisory source category and a judgment-layer `standards-readme.md` convention set. It does not adopt Standard Readme wholesale, require fixed section titles or ordering, mandate a table of contents at its 100-line threshold, require badges, force licence-last placement, or take repository metadata and repo-kind-specific README requirements away from their owning skills.

## Current state

`skills/governance/ki-authoring/references/sources.md` tracks the normative external specifications and tooling used during REFRESH. `SKILL.md` routes Markdown, TOML, and knowledge-placement conventions, but it has no README-specific set or advisory-source semantics. README obligations remain distributed between `ki-repo`, repository-structure skills, and individual repository guidance.

## Steps

- [ ] Add an Advisory category to the `ki-authoring` source list and record Standard Readme's scope, review date, and non-normative role.
- [ ] Create `references/standards-readme.md` with the transferable principles, applicability tests, explicit exclusions, and ownership off-ramps.
- [ ] Route the new convention set from `SKILL.md` and update its description so README authoring is discoverable at skill-selection time.
- [ ] Reconcile the rubric and exemplars only where a stable KI judgment criterion or worked example materially improves the convention.
- [ ] Verify the new guidance remains compatible with existing `ki-repo` and repository-kind ownership rather than duplicating their contracts.

## Files touched

- `skills/governance/ki-authoring/SKILL.md`
- `skills/governance/ki-authoring/references/sources.md`
- `skills/governance/ki-authoring/references/standards-readme.md`
- `skills/governance/ki-authoring/references/rubric.md` and `references/exemplars.md` if the adopted judgment criteria require them
- `docs/roadmap/KI-HARNESS-GOV-048-adopt-standard-readme-guidance.md`

## Verify

- `ki repo audit --skill ki-authoring --repo .`
- `ki repo audit --skill ki-skills --repo .`
- `bun run test`
- `bunx tsc --noEmit`
- `bunx biome check`
- Review the resulting convention against at least one library README and one non-library KI repository README to prove the applicability language does not force one shape onto both.

## Dependencies / blocks

There are no local blockers. The external source is available, the ownership split is agreed, and implementation can proceed independently of the configuration-renaming work.

## Documentation impact

### Decision Records

No Decision Record is required because this extends an existing authoring-governance boundary without changing repository or skill ownership.

### Specifications

No behaviour-level specification changes are expected; README guidance remains a judgment-layer authoring convention.

### Guides

The new convention set is the canonical guidance. Update another guide only if implementation reveals a reader workflow that cannot be expressed clearly within the skill and its references.

### Roadmap

Retain this record through review. No follow-on roadmap item is currently required.

## Discussion

### Advisory source semantics

An Advisory category should make the evidence relationship explicit: REFRESH rechecks the source for useful developments, but differences from Standard Readme are not findings and do not automatically change KI policy. The KI convention set remains the normative local interpretation.

### Principles to adopt

Prefer a README that quickly establishes the repository's name, purpose, and audience, then exposes the shortest useful route to installation, usage, or orientation. Use progressive disclosure, descriptive links, credible examples, and a table of contents only when it materially improves navigation. Make contribution and licence information discoverable where those concerns apply.

### Deliberate exclusions

Do not copy Standard Readme's fixed headings, ordering, badge, licence placement, or line-count threshold into universal checks. Repository purpose determines which sections exist, while `ki-repo` owns baseline presence and purpose and repository-kind skills own specialized content.

### Ownership boundary

`ki-authoring` owns generic README composition and readability. `ki-repo` continues to own repository-level README existence, identity, purpose, and metadata expectations. Repository-kind skills continue to own content required by their structures, and `ki-skills` continues to own `SKILL.md` rather than treating it as a README variant.
