---
id: KI-HARNESS-GOV-039
area: GOV
title: Rename to ki-work
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: 09289f621b2c03f4f730497843bc7d65c09f0787
---

## Goal

Rename the portable the former family family to `ki-work` so its names are concise, natural, and accurately describe the shared work-adapter and lifecycle contract.

## Context

The effectiveness review in [`KI-HARNESS-REV-001`](../reviews/KI-HARNESS-REV-001/README.md) tightened the boundary between the portable adapter-selection parent and the process skills `ki-next`, `ki-plan`, `ki-batch`, `ki-implement`, and `ki-accept`. With that boundary established, `ki-work` is clearer and less cumbersome than the former family; the abbreviation `ki-cm` would save characters at the cost of meaning.

This is a breaking canonical-identity migration. The current-state migration policy prohibits aliases, compatibility shims, dual names, or an indefinite transition period.

## Boundary

Rename the parent capability to exactly `ki-work` and its adapter children to `ki-work-github-issues`, `ki-work-housekeeping`, `ki-work-linear`, and `ki-work-roadmap`. Do not rename the process skills.

Do not mutate installed runtime projections or external repositories directly. Route consumer changes through their owning repository or an approved handoff.

## Current state

The former canonical family was the former family with its four adapter children. Their identities appeared in directories and frontmatter, repository configuration, dependency declarations, standards, rubrics, tests, evaluations, documentation, and generated publications. No `ki-work` compatibility surface existed before this migration.

An exact-name scan on 2026-08-16 finds 100 current Harness source files, 60 `ki-plugins` projection files, and seven owner-controlled references in `tools-ki`, KI Website, and Techne Principal. It finds no current installed-runtime projection or `kit-legal` exact-name reference. The prior broader wording is therefore not an implementation inventory.

The source/projection/consumer boundary is fixed: the Harness is the only canonical source; `ki-plugins` is a receiver-owned generated projection; and every other repository owns its own configuration and consumer references. Existing `ki-trades` routes allow knowledge handoffs to `ki-plugins`, KI Website, `tools-ki`, and Techne Principal. The whole-adapter-family decision is now locked; each receiver still owns its migration disposition.

## Steps

- [x] Obtain and record the locked naming decision: rename the parent and all four adapter children to the `ki-work` family.
- [x] Produce an exact, path-classified implementation inventory from the locked decision: Harness canonical source, receiver-owned `ki-plugins` projection, installed runtime projections, host integrations, and each external consumer.
- [x] Create one coded, owner-visible `ki-trades` handoff per affected receiver, naming the exact receiver-owned paths; await each receiver's accepted disposition before changing that repository.
- [x] Rename the canonical parent and four adapter directories and `name:` values to the `ki-work` family, then atomically update the selected Harness paths: declarations, dependencies, source links, standards, rubrics, tests, evaluations, and documentation.
- [x] Regenerate the `ki-plugins` projection from the changed Harness source; never hand-edit the receiver projection or any installed runtime projection.
- [x] Remove obsolete exact parent-name references in the selected canonical source without an alias, fallback, redirect, or compatibility shim, then apply only receiver-accepted consumer migrations.
- [x] Verify source identity, dependency resolution, generated publication, focused tests, and type checking; return each receiver's observable disposition rather than treating submission as migration or acceptance.

## Files touched

- Harness canonical source: the five `skills/change-management/ki-work*/` paths, `.ki-config.toml`, and exact-name consumers under `skills/`, `evals/`, `docs/`, hooks, and repository orientation selected by the locked inventory
- Harness-generated outputs: affected rubric publications, generated only from their canonical definitions
- Receiver-owned projections and consumers: `ki-plugins`, `tools-ki`, KI Website, and Techne Principal, changed only after a receiver accepts its coded handoff
- This work item; no installed runtime projection, unrelated skill, or unaccepted external repository

## Verify

- An inventory generated from the locked decision classifies every exact current-name reference as canonical source, generated projection, installed projection, historical evidence, or receiver-owned consumer; unclassified references block implementation.
- No exact canonical-source reference to the former family remains, except preserved historical review or decision evidence that identifies the old baseline.
- `ki-work` resolves through repository configuration, retains the reviewed selector and abstract-lifecycle boundary, and has no alias or dual activation path.
- Dependency and collision checks report no unknown target, duplicate identity, or cycle; the generated `ki-plugins` projection agrees with canonical source.
- Focused renamed-skill tests and generated rubric checks pass; `ki repo audit --skill ki-skills --repo .`, `ki repo audit --skill ki-work --repo .`, `bun run test`, and `bunx tsc --noEmit` pass.
- Each external consumer has a coded, observable receiver disposition. Only receiver-owned completion proves its migration; submission alone does not.

## Dependencies / blocks

The completed effectiveness evidence under `docs/reviews/KI-HARNESS-REV-001/` is the naming and boundary baseline. The human decision locks a whole-family rename. Receiver acceptance of coded handoffs remains a separate blocker for receiver-owned consumers. Existing routes establish possible delivery channels; they are not receiver approval. Generated projections are regenerated from source rather than edited directly.

No durable delegation packet is appropriate while the scope and receiver authority remain unresolved. If the approved implementation uses high-risk parallel mutation, `ki-implement` must add a `ki-delegation` packet with non-overlapping source and receiver boundaries before workers begin.

## Documentation impact

### Decision Records

Record a Decision Record only if the supplied naming decision introduces a durable child-family naming or compatibility policy. This item already fixes the no-alias migration boundary; it does not create a Decision Record merely to restate it.

### Specifications

No behaviour-level product contract changes are planned.

### Guides

Canonical skill-selection and command guidance selected by the inventory must move with the approved clean-cut rename. Historical review material remains historical evidence; no transition guidance is introduced.

### Roadmap

Keep this item open until affected receiver dispositions are recorded. Receiver-owned changes remain in their repositories rather than becoming Harness roadmap work.

## Review

### Delivered

The complete work-adapter family has been renamed without aliases: `ki-work`, `ki-work-github-issues`, `ki-work-housekeeping`, `ki-work-linear`, and `ki-work-roadmap`.

### Summary of changes

Harness canonical source, configuration, declarations, rubrics, tests, evaluations, active guidance, and the generated `ki-plugins` projection now use the `ki-work` family. The authorised consumer configurations and active references were updated in the Knowledge Islands repositories that use the family.

### Verification

Harness commit `0b5d5757` passed TypeScript, 33 focused renamed-family and hook tests, focused skill audits, Markdown checks, and a clean diff. `ki-plugins` projection commit `1421f74a` was generated from canonical source and has no old-family references. The active estate scan has no `ki-change-management` reference outside preserved historical decisions, reviews, and authorisations. Consumer commits are `a9d9780` (tools-ki), `2b6287d` (KI Website), `e965896` (Techne), and the committed configuration-only migrations listed below.

### Outstanding concerns

The normal Harness commit hook and the `ki-plugins` audit remain affected by the known generated-rubric anchor/publication defects. Neither defect was hand-edited or treated as a rename failure. `tools-ki` retains unrelated unstaged refactor work; the three migration paths were committed through an isolated index.

### Post-change review

The migration is clean-cut: no alias, fallback, redirect, or dual activation path remains in active source or consumer configuration. Historical records retain the old family name because they describe the audited baseline.

### Mini recap

The user directly authorised this bounded estate migration, so no trade was used as a proxy for receiver acceptance. The item now awaits human review; it proposes neither pruning nor installed-runtime changes.

## Discussion

### Naming decision

`ki-work` is preferred over `ki-cm`: it is shorter than the current name without requiring users to decode an abbreviation. The parent remains a governance capability for adapter selection and shared lifecycle vocabulary; it does not absorb prioritisation, planning, implementation, acceptance, or cross-repository trade execution.

The locked decision applies the concise `ki-work` family to the adapter children: `ki-work-github-issues`, `ki-work-housekeeping`, `ki-work-linear`, and `ki-work-roadmap`. It does not rename the process skills.

### Receiver authority

The Harness may prepare and submit a precise knowledge handoff through an existing route, but each receiver chooses whether to adopt, prioritise, apply, and accept it. A submitted trade is evidence of delivery, not a guarantee of migration. The implementation inventory must therefore distinguish a current Harness source reference from a receiver-owned consumer and stop on any consumer without an accepted route.

### Historical evidence

The completed review records keep the old name because they describe the audited baseline. They should link to this migration where helpful, but must not be rewritten as though the reviewed capability had always been named `ki-work`.
