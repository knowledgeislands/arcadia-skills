---
id: KI-HARNESS-GOV-012
title: Separate rubric evidence
theme: governance-consistency
horizon: next
status: in-progress
blocks: []
blocked-by: []
baseline-ref: 6225d1d9008c2cd77df1b0b60a443f4f68f0a2ff
---

## Goal

Make every rubric criterion state separately what can be checked deterministically, what can be repaired safely, and what still requires a reviewer’s judgment and guided conforming work.

## Context

The shared rubric contract already distinguishes `mechanical` and `judgment` aspects, but its mechanical `conform` callback is optional. A deterministic audit can therefore fail without a declared repair path, while a judgment aspect exposes only a prompt. This makes the audit result more actionable than the conform result and hides whether a missing automatic repair is a safety boundary, an environmental failure, or unfinished engineering.

A catalogue-wide scan now finds 35 active rubric catalogues. Their criteria include substantial mechanical evidence, judgment prompts, and safe conform actions, but these are not consistently declared as one complete audit-and-remediation model. An earlier scan also found that `ki-skills` assessed already-correct process skills as governance skills because its classifier inferred kind from prose. The explicit `ki-kind` migration has resolved that defect: kind now comes from exact frontmatter, and governance-only checks return not applicable for process skills. Retain that regression fixture; do not change process skills merely to satisfy governance modes.

The now-enforced trade lifecycle supplies a concrete boundary for the rubric model: record shape, routes, immutable sender projection, receiver-local evidence, and release eligibility are deterministic evidence; receiver disposition, local priority, authority, and retention value remain judgment. A rubric host must report that split without treating an imported record as authority to change a peer or as proof that locally adopted work is complete.

## Boundary

Do not present a heuristic as a fact, make the host pretend to perform human judgment, or auto-rewrite user-owned, semantic, remote, or environment-dependent state. Do not require every mechanical failure to be automatically fixable: require its non-automatic boundary and next conforming action to be explicit instead. Do not turn semantic quality, intent, priority, authority, or truth into a keyword metric. A trade import never grants a peer write, release, pruning, or local-work acceptance authority.

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

### Before and after examples

#### Process-kind false positive

Before, `ki-plan` correctly says `**Kind:** process.` and exposes only `plan … | help`. The `ki-skills` context nevertheless derives `governanceSkill` from whether the description contains the unrelated literal `(kind: process`. It then emits KI-SHAPE-12 and KI-SHAPE-13 warnings, and its current CONFORM path could append governance verbs to a process skill.

After, kind is read from one canonical structured declaration and the same source drives both the process-kind audit and the governance-mode exemption. `ki-plan` returns `NOT_APPLICABLE` for governance-only mode and heading checks; CONFORM makes no governance-mode change. A governance skill missing `educate` still receives the existing warning and safe repair.

#### Automatic mechanical repair

Before, a wholly owned authoring configuration can drift and an audit can identify the byte difference without publishing whether CONFORM is safe to repair it.

After, `ki-authoring` classifies the owned configuration criterion as `automatic`: AUDIT reports exact template drift, and CONFORM transactionally restores only the regular owned file, then proves the audit clean.

#### Diagnostic mechanical evidence

Before, a configured test command can fail mechanically but the rubric gives no explicit explanation for why CONFORM cannot make the test pass.

After, the criterion is `diagnostic`: AUDIT retains the exact failed command evidence, while CONFORM reports the bounded next route—diagnose or fix the implementation—and makes no speculative source change.

#### Guarded repair and judgment

Before, a missing runtime route or a vague skill trigger-quality prompt provides little direction about the required human decision and subsequent edits.

After, a user-owned runtime, route, or remote-account decision is `guarded`: the mechanical evidence names the gap and hands to a documented judgment review. The reviewer records one named outcome and applies only the approved local configuration or decision route. The host neither chooses the route nor claims the judgment passed.

### Classification rule

Promote a judgment subcondition to mechanical evidence only when it has a stable subject, deterministic inputs, a false-positive boundary, and focused fixtures. Keep the semantic conclusion judgmental. Typical splits are:

For indexes, inventories, and generated references, discover missing, duplicate, stale, or broken entries against authoritative inputs; retain wording, ordering, and explanation for review.

For configuration and runtime bindings, parse schema, declared keys, paths, links, modes, and ownership containment; retain the appropriateness of a runtime, exception, or local arrangement for review.

For commands, manuals, and projections, check declared script presence, `--help` or generation parity, link targets, and known output seams; retain whether a command proves the intended behaviour or a deployment path is operationally sound for review.

For lifecycle and record structure, validate identifiers, status transitions, required evidence, and reciprocal references; retain priority, readiness, disposition, authority, and retention honesty for review.

For trades, validate the mandatory observation policy, typed reciprocal route, raw sender projection, receiver-only fields, closed status/linkage vocabulary, and release/pruning eligibility. Retain the receiver's disposition, whether direct work is genuinely trivial and reversible, whether adoption belongs on the local roadmap, and whether knowledge merits canonical retention. The host may render those review routes but cannot mutate either trade copy or manufacture a terminal decision.

For skill and agent prose, check parseable frontmatter, link resolution, declared modes, and named sibling references where an authority set exists; retain scope, trigger quality, terminology, instruction altitude, and durable semantic fit for review.

This makes existing hybrid rules the normal form: the mechanical condition is exact and independently useful; the reviewer decides the quality or authority question that remains.

### Catalogue rollout

Start with `ki-skills` and `ki-engineering` as the shared-model and common-toolchain pilots, then classify every current rubric family. `GOV-007` remains the bounded package-script ownership adopter; it does not silently establish this broader rubric contract. The work must identify each audit-only mechanical criterion as automatic, diagnostic, guarded, or an implementation gap before declaring the fleet complete.

## Current state

The rubric-authoring standard expressly permits an audit-only mechanical item and gives judgment only a `prompt`. Its generated publications describe criterion type but do not require an audit/remediation classification or a judgment conforming path. Existing CONFORM behaviour is appropriately conservative in many places; the missing distinction is whether that conservatism is deliberate and what the user should do next. The completed explicit `ki-kind` migration supplies the process-kind regression fixture but does not establish the broader remediation model.

The completed baseline inventory covers 35 catalogues and 613 criteria: 387 mechanical aspects, 250 judgment aspects, and 24 hybrids. It identifies 299 audit-only mechanical aspects, 88 existing conform callbacks, and 250 judgment aspects that all need evidence scope, outcome vocabulary, and guided conforming work. The first implementation batch is the shared contract and publication model, followed by `ki-skills` and `ki-engineering`; every `RUBRIC-1` publication check and the known mixed-remediation criteria must split before one remediation class can be assigned.

## Model review

This draft and its initial catalogue audit were reviewed by OpenAI GPT-5.6 through Codex on 2026-08-05.

This draft was reviewed by Anthropic Claude through Claude Code on 2026-08-06, by Sonnet 5 for the plan review and by Opus 5 for the follow-on `ki-delegation` catalogue audit. First material finding: the catalogue count was inconsistent — Context and Current state reported 35 active catalogues while Steps and Dependencies said 34. A directory scan of `skills/**/scripts/rubric` confirms 35 catalogues exist, and the 34-name list in "Completed initial audit" omitted `ki-delegation`, which has a populated rubric catalogue. Resolved: `ki-delegation` is now listed in the governance family paragraph, audited in "Delegation packet alignment", and the Steps wording reads 35 catalogues.

Second material finding, from auditing that catalogue: `PACKET-1` is already a hybrid, but its mechanical aspect spans two remediation classes — `normaliseLegacyEscalation` is a safe idempotent rename and therefore `automatic`, while every missing section, worker, or worker field requires authored content and is therefore `guarded`. The one-class-per-mechanical-aspect rule in the criterion model cannot be satisfied by this criterion without splitting its mechanical evidence, so the model must state that a mechanical aspect mixing classes is a split trigger rather than a labelling choice. "Delegation packet alignment" records the required split. No further material findings; the mechanical/judgment/remediation-class model, the boundary section, and the trade-lifecycle alignment are internally consistent and sufficiently bounded.

Two distinct vendors have now reviewed the plan: OpenAI GPT-5.6 through Codex and Anthropic Claude through Claude Code. The latter's follow-on `ki-delegation` audit confirms the mixed-remediation-class split trigger, and its finding is incorporated in the selected model. The user confirmed this two-vendor review gate complete on 2026-08-06; no review gate remains before implementation.

## Steps

- [x] Obtain and record independent plan reviews from two distinct models supplied by different vendors — OpenAI GPT-5.6 through Codex and Anthropic Claude through Claude Code are both recorded; resolve material findings before moving this item to `ready`.
- [ ] Extend the shared rubric types, catalogue validator, and generated publication so every mechanical aspect declares its remediation class and every judgment aspect supplies review scope, outcome vocabulary, and guided conforming work.
- [ ] Update the `ki` rubric host to validate the new metadata, show mechanical audit/conform and judgment review/conform sections distinctly, execute only `automatic` draft actions, and retain its no-synthetic-judgment-finding boundary.
- [x] Build an inventory of every current criterion across all 35 catalogues, recording its evidence, remediation class, safe writer or manual route, and whether a hybrid split is warranted. Treat a mechanical aspect whose conditions mix remediation classes as a mandatory split, not a labelling choice.
- [ ] Migrate `ki-skills` and `ki-engineering` first, retaining the completed process-kind classifier fix as a regression fixture, then use fixtures to prove automatic, diagnostic, guarded, hybrid, and invalid-metadata cases. Use `ki-trades` as the reference hybrid: structural lifecycle evidence is mechanical, while disposition and direct-application suitability remain judgment.
- [ ] Migrate the remaining catalogues in concern-sized batches. Promote only deterministic subconditions with reliable fixtures; preserve semantic, authority, and truth questions as judgment.
- [ ] Regenerate every affected rubric publication, update standards and skill procedures, and publish a concise reviewer workflow explaining judgment audit and guided conforming work.
- [ ] Run a cross-catalogue audit proving no mechanical item lacks a remediation class, no `automatic` class lacks a safe conform action, and no judgment aspect is reported as mechanically evaluated.

## Files touched

- `skills/keystone/ki-skills/` rubric-authoring standard, shared rubric types, catalogue, generated rubric, and tests
- `skills/governance/ki-engineering/` pilot catalogue, standards, generated rubric, and tests
- `skills/governance/ki-trades/` rubric metadata, publication, and fixtures preserving its read-only lifecycle boundary
- Every governed skill under `skills/**/scripts/rubric/`, its generated `references/rubric.md`, and focused tests as classified
- `tools-ki` rubric-host validation, rendering, CONFORM planning, and CLI fixtures through a receiving trade or local work item
- This roadmap item

## Verify

- Shared rubric type and validator tests, including invalid missing or inconsistent remediation metadata
- Focused `ki-skills` and `ki-engineering` rubric tests, then each migrated family’s colocated tests
- `ki dev skill rubric <skill> --write` followed by publication-parity audit for every migrated catalogue
- `ki repo audit --skill ki-skills --repo .` and affected focused audits, with process skills no longer judged as governance-mode skills
- `ki repo audit --skill ki-trades --repo .`, including fixtures for mandatory observation, immutable sender projection, terminal knowledge retention, and explicit release/pruning eligibility
- `bun run test` and `bunx tsc --noEmit` in the Harness; receiving `tools-ki` host tests and type gate
- A dry-run and apply fixture proving automatic repair is idempotent, while diagnostic, guarded, and judgment cases make no unapproved write

## Dependencies / blocks

The complete initial catalogue audit and two-vendor review establish the implementation boundary and migration approach. Delivery begins with the detailed per-criterion inventory and the `ki-skills` and `ki-engineering` pilots. `tools-ki` has accepted the bounded host work as `KI-TOOL-CLI-020`; it waits for this Harness contract before host implementation begins. `GOV-007` is a coordinated adopter, not a hidden ownership dependency.

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
- The accepted `KI-TOOL-CLI-020` host item remains blocked on the published Harness contract; this item owns the standard and catalogue migration, not an unapproved cross-repository write.

### Rounds

- Round 1: `rubric-fleet-inventory` and `rubric-host-boundary` perform independent read-only analysis.
- Round 2: the orchestrator integrates the inventory, then implements the Harness contract and pilots without overlapping catalogue writes.

### Worker: rubric-fleet-inventory

- **Deliverable:** A complete 35-catalogue inventory of mechanical and judgment shapes, remediation candidates, and mandatory split cases.
- **Files:** Read-only `skills/**/scripts/rubric/` and generated rubric publications; do not edit files.
- **Definition of done:** Every catalogue is classified with concrete evidence, and every ambiguous or mixed-remediation criterion is identified for the orchestrator.
- **Model:** high-reasoning — fleet-wide structural classification.
- **Verify:** Orchestrator spot-checks the inventory against source catalogues before any migration edit.
- **Checkpoint:** Return the inventory and unresolved classification decisions; make no writes.

### Worker: rubric-host-boundary

- **Deliverable:** A read-only map of the Harness catalogue contract versus the receiver-owned `tools-ki` host work, including the minimum compatible metadata shape.
- **Files:** Read-only Harness shared rubric modules and `tools-ki` host sources; do not edit either repository.
- **Definition of done:** The report separates Harness-owned type/publication changes from receiver-owned host validation and rendering work, with no hidden cross-repository dependency.
- **Model:** high-reasoning — interface and authority analysis.
- **Verify:** Orchestrator verifies each claimed owner and source location.
- **Checkpoint:** Return before proposing any `tools-ki` edit.

## Discussion

### Why audit-only mechanics need a classification

Some checks are deliberately observational: a test command may fail, a GitHub setting may require authority, and a source URL may be parseable but not provably the intended release. Suppressing those failures would lose useful evidence, but treating their absence of a callback as accidental hides the safety decision. The classification therefore makes the difference visible and testable.

### Why judgment still has conforming work

Judgment is not a failure to provide a workflow. A reviewer can inspect a bounded evidence set, reach one named outcome, and make governed edits or route a decision. That is a conforming procedure, just not an automatic one. Rendering it alongside mechanical CONFORM prevents a prompt from becoming an unowned afterthought while preserving the host’s epistemic boundary.

### Fleet review findings

The broad scan found repeated candidates for exact structural checks: index completeness, reference and link integrity, declared configuration vocabulary, record relationships, generated projection parity, command-surface shape, and required evidence fields. It also found repeated irreducibly judgmental questions: semantic fit, intent, useful wording, appropriate scope, repository-specific authority, truthful external correspondence, and lifecycle honesty. The migration must record the candidate, evidence boundary, and rejected automation reason for each family rather than applying a one-size-fits-all heuristic.

### Implementation inventory

The 2026-08-06 baseline inventory found 35 catalogues and 613 criteria. `ki-authoring`, `ki-delegation`, `ki-decision-records`, `ki-engineering`, `ki-feature-definitions`, `ki-repo`, `ki-roadmap`, and scaffold-owning Knowledge Base skills contain the first mandatory split cases: their individual rules combine safe normalization or derived writes with authored content, external evidence, unsafe paths, or user-owned choices. The `RUBRIC-1` publication rule itself must split into automatic stale/missing publication repair and diagnostic absent-host evidence.

The resulting metadata extends the retained contract-1 shape. The receiver must validate and preserve it under `contract: 1`; no contract-2 path or version bump is part of this work. The next implementation boundary is therefore a coordinated `tools-ki` receiver update: validation, automatic-only CONFORM execution, judgment review rendering, generated publication, and its focused tests. The existing `--allow-guarded` host option must be renamed or made unambiguous because it has a different meaning from the new non-executable `guarded` remediation class.

### Completed initial audit

The audit read every `SKILL.md`, structured rubric catalogue, and generated `references/rubric.md` in the current fleet, and compared mode claims with the Harness configuration. All 35 catalogues publish a rubric. The resulting source-level shape is uneven by design: `ki-engineering` already has substantial safe conform coverage; several safety- and environment-oriented catalogues correctly carry only observational checks; and `ki-git` is judgment-only. The missing contract is the explicit reason for those different shapes.

`ki-harness`, `ki-mcp`, `ki-plugins`, and `ki-subagents` can preserve or extend checks for manifests, local layout, declarations, link targets, command surfaces, and generated projections. Capability fit, tool behaviour, plugin value, agent lanes, prompts, and delegation quality remain reviewer-led.

`ki-binding`, `ki-binding-chezmoi`, `ki-binding-claude`, `ki-binding-codex`, `ki-dotfiles-chezmoi`, `ki-housekeeping-claude`, `ki-tokenomics`, `ki-tokenomics-claude`, and `ki-tokenomics-codex` can check parseable runtime configuration, managed links, renderer-neutral surface inventory, declared files, and measured context inputs. Runtime choice, configuration preservation, intended rendered state, memory doctrine, and portable policy fit remain reviewer-led.

`ki-authoring`, `ki-decision-records`, `ki-delegation`, `ki-engineering`, `ki-feature-definitions`, `ki-git`, `ki-guides`, `ki-housekeeping`, `ki-roadmap`, `ki-specifications`, and `ki-trades` can check formatting, schemas, IDs, links, index completeness, record relations, configured toolchain evidence, delegation-packet section and worker-field structure, and route structure. Prose usefulness, decision reasoning, test adequacy, feature behaviour, Git hygiene, priority, authority, adoption, worker-boundary and model-choice suitability, and retention remain reviewer-led.

`ki-repo` and `ki-skills` can check root and configuration shape, declared relationships, catalogue/publication parity, links, names, modes, and owned-file containment. Repository purpose, warranted overrides, trigger quality, skill scope, instruction altitude, semantic collisions, and refresh fitness remain reviewer-led.

### Trade lifecycle alignment

`ki-trades` already demonstrates the intended division. Its record, authority, status, and release checks are deterministic and read-only; its receiver-disposition criterion is reviewer-led. The migration must preserve that separation: metadata can make the remediation route explicit, but it must not turn a decision, retention, direct application, or peer cleanup into an automatic rubric-host action.

Knowledge trades are retained only by linking a terminal `retained` decision to a named canonical local artifact. Work trades may be `applied` only for a bounded, reversible, independently verifiable local change with commit evidence; otherwise adoption creates separately governed local work. Sender release and receiver pruning remain explicit lifecycle operations after the declared observation condition, not CONFORM side effects or a substitute for roadmap acceptance.

`ki-kb`, `ki-kb-activities`, `ki-kb-live-artifacts`, `ki-kb-streams`, and `ki-principal` can check zone and note structure, frontmatter, required sections, identifiers, indexes, state transitions, and local link integrity. Knowledge placement, activity rationale, authoritativeness, reader usefulness, Focus, governance fit, and charter meaning remain reviewer-led.

`ki-homebrew-tap` and `ki-tools` can check formula and manifest syntax, declared files, generated completions, manual presence, CLI command geometry, and release projection parity. Release/archive correspondence, meaningful installed-binary tests, command semantics, and documentation usefulness remain reviewer-led.

`ki-website` and `ki-website-cloudflare` can check site configuration, declared build/dist seams, physical routing, and static deployment configuration. Site purpose, domain choice, real deployment correctness, and remote-account authority remain reviewer-led.

### Delegation packet alignment

`ki-delegation` is the second reference hybrid and exposes a case the migration must decide explicitly. Its single `PACKET-1` criterion already carries both aspects under one stable code: the mechanical aspect derives exact structural evidence from an opted-in `## Delegation` section — the `### Rounds` opt-in gate, non-empty `Locked decisions`, `Escalate`, and `Rounds` sections, at least one `### Worker:` subsection, and non-empty `Deliverable`, `Files`, `Definition of done`, `Model`, `Verify`, and `Checkpoint` fields per worker — while worker boundaries, model choices, and gate fit remain reviewer-led.

Its mechanical aspect nevertheless spans two remediation classes. The only conform action, `normaliseLegacyEscalation`, renames a legacy `### Escalation` heading to `### Escalate`: a safe, idempotent, wholly owned session-draft write, and therefore `automatic`. Every other violation — a missing section body, a missing worker, or a missing worker field — requires authored content and a delegation decision that CONFORM must not manufacture, and is therefore `guarded`. Because the model requires one class per mechanical aspect, this criterion must split its mechanical evidence rather than declare a single misleading class: retain packet structure as `guarded` under `PACKET-1` and give legacy-heading normalisation its own `automatic` criterion. Its judgment aspect currently supplies only a prompt and needs the standard evidence scope, outcome vocabulary, and conforming guidance. Fixtures must cover both the opted-in packet and the `NOT_APPLICABLE` note that never opted in, since most repositories return the latter.

### Submitted scope

This item adopts [TRD-312359ed](../../+/_TRADES/knowledgeislands/tools-ki/TRD-312359ed.md), whose proposed evidence and remediation model is consistent with the selected criterion model above.

The audit also confirms a concrete migration test: a mechanical item that reports a failed external command, a remote-setting discrepancy, or an environment-derived measurement is not automatically repairable merely because the evidence is exact. It must become `diagnostic`, with a bounded next action. A parseable missing declaration or wholly owned generated projection is instead an `automatic` candidate. A required choice such as a runtime, route, knowledge destination, or user-owned configuration edit is `guarded` and must hand into the criterion's judgment conforming guidance.
