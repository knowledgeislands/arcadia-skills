---
id: KI-HARNESS-GOV-012
title: Separate rubric evidence
theme: governance-consistency
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Make every rubric criterion state separately what can be checked deterministically, what can be repaired safely, and what still requires a reviewer’s judgment and guided conforming work.

## Context

The shared rubric contract already distinguishes `mechanical` and `judgment` aspects, but its mechanical `conform` callback is optional. A deterministic audit can therefore fail without a declared repair path, while a judgment aspect exposes only a prompt. This makes the audit result more actionable than the conform result and hides whether a missing automatic repair is a safety boundary, an environmental failure, or unfinished engineering.

A catalogue-wide scan found 34 active rubric catalogues. Their criteria include substantial mechanical evidence, judgment prompts, and safe conform actions, but these are not consistently declared as one complete audit-and-remediation model. The current `ki-skills` audit also warns where process skills are assessed as though they were governance skills; that is evidence to classify and correct, not a reason to weaken process-skill boundaries.

## Boundary

Do not present a heuristic as a fact, make the host pretend to perform human judgment, or auto-rewrite user-owned, semantic, remote, or environment-dependent state. Do not require every mechanical failure to be automatically fixable: require its non-automatic boundary and next conforming action to be explicit instead. Do not turn semantic quality, intent, priority, authority, or truth into a keyword metric.

## Shaping

### Selected criterion model

Keep one stable criterion code when a rule has both aspects, but publish and execute them separately:

#### Mechanical

AUDIT supplies deterministic evidence and an exact outcome. CONFORM supplies a safe transactional action when one exists; otherwise the criterion declares a remediation classification and concise reason.

#### Judgment

AUDIT supplies a reviewer prompt, evidence scope, and result vocabulary. CONFORM supplies reviewer-guided edits or a documented decision route; it never supplies a host callback or synthetic mechanical finding.

Every mechanical aspect must declare one remediation class:

- `automatic` — a safe, idempotent session-draft action exists and CONFORM executes it.
- `diagnostic` — the check observes a command, external state, or failure that CONFORM must not manufacture; the catalogue names the next human action.
- `guarded` — a repair is possible only after a user-owned choice, authority confirmation, or semantic decision; the item points to its judgment conforming guidance.

An omitted class is a catalogue error. `automatic` requires a conform action; `diagnostic` and `guarded` forbid a misleading automatic repair and must carry an actionable reason. A mechanical condition whose repair is actually deterministic but lacks a callback remains an implementation gap, not a legitimate classification.

Judgment aspects gain required review metadata: a bounded evidence scope, a concrete prompt, expected result vocabulary, and conforming guidance. The host reports them as unevaluated judgment work; it may render the review and guidance, but it neither executes the guidance nor converts it into PASS or FAIL.

### Classification rule

Promote a judgment subcondition to mechanical evidence only when it has a stable subject, deterministic inputs, a false-positive boundary, and focused fixtures. Keep the semantic conclusion judgmental. Typical splits are:

For indexes, inventories, and generated references, discover missing, duplicate, stale, or broken entries against authoritative inputs; retain wording, ordering, and explanation for review.

For configuration and runtime bindings, parse schema, declared keys, paths, links, modes, and ownership containment; retain the appropriateness of a runtime, exception, or local arrangement for review.

For commands, manuals, and projections, check declared script presence, `--help` or generation parity, link targets, and known output seams; retain whether a command proves the intended behaviour or a deployment path is operationally sound for review.

For lifecycle and record structure, validate identifiers, status transitions, required evidence, and reciprocal references; retain priority, readiness, disposition, authority, and retention honesty for review.

For skill and agent prose, check parseable frontmatter, link resolution, declared modes, and named sibling references where an authority set exists; retain scope, trigger quality, terminology, instruction altitude, and durable semantic fit for review.

This makes existing hybrid rules the normal form: the mechanical condition is exact and independently useful; the reviewer decides the quality or authority question that remains.

### Catalogue rollout

Start with `ki-skills` and `ki-engineering` as the shared-model and common-toolchain pilots, then classify every current rubric family. `GOV-007` remains the bounded package-script ownership adopter; it does not silently establish this broader rubric contract. The work must identify each audit-only mechanical criterion as automatic, diagnostic, guarded, or an implementation gap before declaring the fleet complete.

## Current state

The rubric-authoring standard expressly permits an audit-only mechanical item and gives judgment only a `prompt`. Its generated publications describe criterion type but do not require an audit/remediation classification or a judgment conforming path. Existing CONFORM behaviour is appropriately conservative in many places; the missing distinction is whether that conservatism is deliberate and what the user should do next.

## Model review

This draft and its initial catalogue audit were reviewed by OpenAI GPT-5.6 through Codex on 2026-08-05.

Before this item enters `ready`, two distinct models from different vendors must have reviewed the plan. The second review is pending and must use a non-OpenAI vendor. Record each reviewer's model, vendor, date, material findings, and their resolution in this section; a second run of the same vendor does not satisfy the gate.

## Steps

- [ ] Obtain and record independent plan reviews from two distinct models supplied by different vendors — currently OpenAI GPT-5.6 through Codex; obtain a non-OpenAI review — then resolve material findings before moving this item to `ready`.
- [ ] Extend the shared rubric types, catalogue validator, and generated publication so every mechanical aspect declares its remediation class and every judgment aspect supplies review scope, outcome vocabulary, and guided conforming work.
- [ ] Update the `ki` rubric host to validate the new metadata, show mechanical audit/conform and judgment review/conform sections distinctly, execute only `automatic` draft actions, and retain its no-synthetic-judgment-finding boundary.
- [ ] Build an inventory of every current criterion across all 34 catalogues, recording its evidence, remediation class, safe writer or manual route, and whether a hybrid split is warranted.
- [ ] Migrate `ki-skills` and `ki-engineering` first, including the process-skill mode false warnings, then use their fixtures to prove automatic, diagnostic, guarded, hybrid, and invalid-metadata cases.
- [ ] Migrate the remaining catalogues in concern-sized batches. Promote only deterministic subconditions with reliable fixtures; preserve semantic, authority, and truth questions as judgment.
- [ ] Regenerate every affected rubric publication, update standards and skill procedures, and publish a concise reviewer workflow explaining judgment audit and guided conforming work.
- [ ] Run a cross-catalogue audit proving no mechanical item lacks a remediation class, no `automatic` class lacks a safe conform action, and no judgment aspect is reported as mechanically evaluated.

## Files touched

- `skills/keystone/ki-skills/` rubric-authoring standard, shared rubric types, catalogue, generated rubric, and tests
- `skills/governance/ki-engineering/` pilot catalogue, standards, generated rubric, and tests
- Every governed skill under `skills/**/scripts/rubric/`, its generated `references/rubric.md`, and focused tests as classified
- `tools-ki` rubric-host validation, rendering, CONFORM planning, and CLI fixtures through a receiving trade or local work item
- This roadmap item

## Verify

- Shared rubric type and validator tests, including invalid missing or inconsistent remediation metadata
- Focused `ki-skills` and `ki-engineering` rubric tests, then each migrated family’s colocated tests
- `ki dev skill rubric <skill> --write` followed by publication-parity audit for every migrated catalogue
- `ki repo audit --skill ki-skills --repo .` and affected focused audits, with process skills no longer judged as governance-mode skills
- `bun run test` and `bunx tsc --noEmit` in the Harness; receiving `tools-ki` host tests and type gate
- A dry-run and apply fixture proving automatic repair is idempotent, while diagnostic, guarded, and judgment cases make no unapproved write

## Dependencies / blocks

The design is ready for detailed inventory, but status must remain `draft` until the first complete criterion inventory establishes the exact migration batches and the `tools-ki` host owner accepts its bounded host-contract work. `GOV-007` is a coordinated adopter, not a hidden ownership dependency.

## Delegation

### Locked decisions

- A criterion may remain hybrid under one stable code; the two aspects must be rendered and operated separately.
- Mechanical AUDIT is mandatory for a mechanical aspect; automatic CONFORM is mandatory only for the `automatic` remediation class.
- Audit-only mechanical evidence is permitted only as explicitly classified `diagnostic` or `guarded` work with a meaningful next route.
- Judgment receives an explicit review and guided-conform workflow, but no executable callback and no synthetic host finding.
- Heuristics may assist a reviewer but cannot create a fact-like failure without a trustworthy deterministic boundary.

### Escalate

- Stop if a proposed automatic repair would overwrite user-owned content, cross a repository boundary, change remote state, or choose semantic meaning.
- Stop if an item’s evidence cannot distinguish a deterministic defect from a reviewer judgment; retain or split the judgment aspect rather than inventing a weak check.
- Create a receiving `tools-ki` record before changing the shared host contract; this Harness item owns the standard and catalogue migration, not an unapproved cross-repository write.

## Discussion

### Why audit-only mechanics need a classification

Some checks are deliberately observational: a test command may fail, a GitHub setting may require authority, and a source URL may be parseable but not provably the intended release. Suppressing those failures would lose useful evidence, but treating their absence of a callback as accidental hides the safety decision. The classification therefore makes the difference visible and testable.

### Why judgment still has conforming work

Judgment is not a failure to provide a workflow. A reviewer can inspect a bounded evidence set, reach one named outcome, and make governed edits or route a decision. That is a conforming procedure, just not an automatic one. Rendering it alongside mechanical CONFORM prevents a prompt from becoming an unowned afterthought while preserving the host’s epistemic boundary.

### Fleet review findings

The broad scan found repeated candidates for exact structural checks: index completeness, reference and link integrity, declared configuration vocabulary, record relationships, generated projection parity, command-surface shape, and required evidence fields. It also found repeated irreducibly judgmental questions: semantic fit, intent, useful wording, appropriate scope, repository-specific authority, truthful external correspondence, and lifecycle honesty. The migration must record the candidate, evidence boundary, and rejected automation reason for each family rather than applying a one-size-fits-all heuristic.

### Completed initial audit

The audit read every `SKILL.md`, structured rubric catalogue, and generated `references/rubric.md` in the current fleet, and compared mode claims with the Harness configuration. All 34 catalogues publish a rubric. The resulting source-level shape is uneven by design: `ki-engineering` already has substantial safe conform coverage; several safety- and environment-oriented catalogues correctly carry only observational checks; and `ki-git` is judgment-only. The missing contract is the explicit reason for those different shapes.

`ki-harness`, `ki-mcp`, `ki-plugins`, and `ki-subagents` can preserve or extend checks for manifests, local layout, declarations, link targets, command surfaces, and generated projections. Capability fit, tool behaviour, plugin value, agent lanes, prompts, and delegation quality remain reviewer-led.

`ki-binding`, `ki-binding-chezmoi`, `ki-binding-claude`, `ki-binding-codex`, `ki-dotfiles-chezmoi`, `ki-housekeeping-claude`, `ki-tokenomics`, `ki-tokenomics-claude`, and `ki-tokenomics-codex` can check parseable runtime configuration, managed links, renderer-neutral surface inventory, declared files, and measured context inputs. Runtime choice, configuration preservation, intended rendered state, memory doctrine, and portable policy fit remain reviewer-led.

`ki-authoring`, `ki-decision-records`, `ki-engineering`, `ki-feature-definitions`, `ki-git`, `ki-guides`, `ki-housekeeping`, `ki-roadmap`, `ki-specifications`, and `ki-trades` can check formatting, schemas, IDs, links, index completeness, record relations, configured toolchain evidence, and route structure. Prose usefulness, decision reasoning, test adequacy, feature behaviour, Git hygiene, priority, authority, adoption, and retention remain reviewer-led.

`ki-repo` and `ki-skills` can check root and configuration shape, declared relationships, catalogue/publication parity, links, names, modes, and owned-file containment. Repository purpose, warranted overrides, trigger quality, skill scope, instruction altitude, semantic collisions, and refresh fitness remain reviewer-led.

`ki-kb`, `ki-kb-activities`, `ki-kb-live-artifacts`, `ki-kb-streams`, and `ki-principal` can check zone and note structure, frontmatter, required sections, identifiers, indexes, state transitions, and local link integrity. Knowledge placement, activity rationale, authoritativeness, reader usefulness, Focus, governance fit, and charter meaning remain reviewer-led.

`ki-homebrew-tap` and `ki-tools` can check formula and manifest syntax, declared files, generated completions, manual presence, CLI command geometry, and release projection parity. Release/archive correspondence, meaningful installed-binary tests, command semantics, and documentation usefulness remain reviewer-led.

`ki-website` and `ki-website-cloudflare` can check site configuration, declared build/dist seams, physical routing, and static deployment configuration. Site purpose, domain choice, real deployment correctness, and remote-account authority remain reviewer-led.

The audit also confirms a concrete migration test: a mechanical item that reports a failed external command, a remote-setting discrepancy, or an environment-derived measurement is not automatically repairable merely because the evidence is exact. It must become `diagnostic`, with a bounded next action. A parseable missing declaration or wholly owned generated projection is instead an `automatic` candidate. A required choice such as a runtime, route, knowledge destination, or user-owned configuration edit is `guarded` and must hand into the criterion's judgment conforming guidance.
