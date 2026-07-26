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

Knowledge Islands is replacing repository-vendored runners with native `ki` operations.

The canonical `knowledgeislands/ki-agentic-harness` is installed during bootstrap and cannot be uninstalled. The harness owns compatible capability semantics and skill-specific rubrics; `tools-ki` owns the CLI platform and generic governed-rubric runtime.

[ADR-KI-HARNESS-012](../../../decisions/ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md) records the settled ownership and direct compatible-payload boundary. KI Specifications work is deliberately outside this plan until the implementation contract has settled.

## Current state

The compatible-harness identity, installation, activation, and governed-rubric host boundaries are implemented. `ki repo educate`, `ki repo audit`, and `ki repo conform` run TypeScript rubric definitions directly through the `tools-ki` host.

The repository-local `.ki/` executor, package-script aliases, publishers, wrapper runners, and legacy educate scripts have been removed. `ki-skills` establishes the intended family/session contract, and `ki-handoffs` is the first additional catalogue cut to that shape.

Twenty-three in-scope structured catalogues still use transitional catalogue or context adapters. All 26 in-scope skills require a final implementation-and-reference review: the 25 structured catalogues other than the deferred `ki-specifications` catalogue, plus the guidance-only `ki-bootstrap`.

CI still invokes the removed `ki:audit` package alias and describes `.ki/bootstrap`. The pre-commit hook uses the direct CLI but its staged snapshot needs a final dependency-completeness review. Maintainer guidance still contains obsolete vendoring and executor assumptions.

## Steps

1. Review and finish the 26 in-scope skills one at a time. For every structured catalogue, make each family module export one complete `RubricFamily`, default-export one `SkillRubricDefinition` with `createSession`, keep criterion behaviour on its item, keep shared-draft composition in the session, and remove catalogue splits, `LegacyFamily` casts, family mappers, barrel exports, and per-skill execution or reporting adapters.
2. Review each skill's reference set in the same pass. Treat `standards.md`, generated `rubric.md`, `sources.md`, and optional `exemplars.md` as the normal core; justify every omission and every additional format, mode, contract, template, or guide reference by a distinct reader need; merge or remove stale and duplicative references; and align `SKILL.md` navigation, family `standard` fields, item sources, and relative links with the retained set. A row is complete only when both its implementation shape and references pass review.
   - [ ] `ki-skills` — re-review the exemplar first; keep one clean catalogue/session contract, then justify `rubric-authoring.md`, candidate and mode references, and either reconcile or remove the retired checker contract and response documents.
   - [ ] `ki-authoring` — move formatter, subprocess, and owned-file proposal policy out of the index; justify the split Markdown and TOML normative standards.
   - [ ] `ki-binding` — preserve mixed repository and user-home evidence honestly while removing the legacy adapter; decide whether the lack of exemplars is intentional.
   - [ ] `ki-binding-chezmoi` — retain external chezmoi choices as report-only policy; justify the core set and absent exemplars.
   - [ ] `ki-bootstrap` — retain its guidance-only, no-catalogue boundary; decide whether `rubric.md` is still useful or is retired catalogue residue.
   - [ ] `ki-decision-records` — separate its context builder and multi-file index draft from catalogue wiring; justify `dr-format.md` and each mode procedure.
   - [ ] `ki-dotfiles-chezmoi` — retain explicit-create semantics for `.chezmoiignore`; decide whether the lack of exemplars is intentional.
   - [ ] `ki-engineering` — replace `createContext` with `createSession`, remove remaining item exports, split context by evidence responsibility, and confirm its core four references.
   - [ ] `ki-feature-definitions` — remove family mapping and index-owned heading-normalisation policy; justify `feature-format.md` and each mode procedure.
   - [ ] `ki-handoffs` — retain its completed one-family `createSession` cut and session-owned readiness draft; review the core four references.
   - [ ] `ki-harness` — preserve harness-marker append safety while removing index-owned write planning; confirm its references describe the direct installed-harness boundary.
   - [ ] `ki-homebrew-tap` — preserve applicability and manual Homebrew checks, move marker mutation to an item-owned action, and justify its mode procedures and absent exemplars.
   - [ ] `ki-housekeeping` — preserve bounded user-home scope and memory-repair containment while removing its adapter; justify `memory-format.md`, mode procedures, and absent exemplars.
   - [ ] `ki-kb` — split evidence context by responsibility and keep index or `MEMORY.md` creation as session-owned proposals; justify the KB reference, mode procedures, and templates.
   - [ ] `ki-kb-activities` — retain safe `Activities.md` creation outside catalogue wiring; decide whether its mode documents replace a missing `standards.md`.
   - [ ] `ki-kb-live-artifacts` — retain safe index and frontmatter drafts while leaving rendering and deletion manual; justify each mode procedure.
   - [ ] `ki-kb-streams` — preserve controlled-vocabulary normalisation on one shared proposal; reconcile the structure and process references and mode procedures with the missing canonical `standards.md`.
   - [ ] `ki-mcp` — retain bounded configuration edits and keep client generation outside conform; justify the surface-specific references and mode procedures.
   - [ ] `ki-plugins` — remain report-only for generated projections; remove the adapter and catalogue barrel, and decide whether absent exemplars are intentional.
   - [ ] `ki-repo` — replace `definitions.ts` and the mixed context adapter; preserve explicit create or append actions and GitHub confirmation boundaries; justify `config-standards.md`.
   - [ ] `ki-repo-roadmap` — move multi-file evidence and replacement aggregation behind focused session drafts without weakening transaction semantics; justify `plan-format.md`.
   - [ ] `ki-subagents` — preserve per-agent subjects and filename-alignment drafts while removing the family adapter; confirm its core four references.
   - [ ] `ki-tokenomics` — preserve bounded `.claude` user-home scope and report-only unsafe work; justify `headroom-operations.md` and each mode procedure.
   - [ ] `ki-tools` — retain bounded executable and configuration repairs as item or session behaviour; justify its mode procedures and absent exemplars.
   - [ ] `ki-website` — retain safe `.gitignore` and `.ki-config.toml` creation in the session proposal while leaving deployment manual; confirm its core four references.
   - [ ] `ki-website-cloudflare` — keep Cloudflare and Wrangler operations report-only, remove the thin adapter, and justify `setup-guide.md`.
3. Prove native self-hosted parity: run the installed or explicit local canonical harness against this source repository and confirm that `ki repo educate`, `ki repo audit`, and `ki repo conform --dry-run` resolve every declared repository skill, including bounded user-home evidence.
4. Finish the live-role cutover: replace the stale CI alias and `.ki/bootstrap` description, make the direct pre-commit staged snapshot dependency-complete, and remove obsolete vendoring, executor, bootstrap, and educate guidance. Retain only commands and fixtures whose roles sit outside governed-rubric execution.
5. Run the complete source-harness verification through the native path and present FND-004 for acceptance.

## Files touched

- The 26 in-scope skill roots under `skills/`
- `.github/workflows/ci.yml`, `.husky/pre-commit`, and affected maintainer guidance
- This plan and its foundation-tooling roadmap item

## Verify

1. Every in-scope skill row records an accepted implementation shape and justified reference set.
2. Every in-scope structured catalogue follows the accepted `ki-skills` family/session contract and its generated `references/rubric.md` is in sync.
3. The canonical installed or local harness passes educate, audit, and conform dry-run for every skill declared by this repository.
4. CI and pre-commit use the direct `ki` surface without `.ki`, package aliases, compatibility runners, or incomplete staged dependency material.
5. `bun run test`, the TypeScript and authoring gates, the roadmap audit, and the aggregate native repository audit pass.

## Dependencies / blocks

The generic CLI runtime and command surface are delivered in `tools-ki`; CLI-004 now needs only its own final acceptance gate.

`ki-specifications` remains deliberately parked. Its catalogue and references are not part of this plan's 26-skill review and must not be changed until the user resumes that scope.

## Delegation

- Round 1 — judgment: assign `ki-skills` alone to a `gpt-5.6-sol` worker at `xhigh`; files: only its skill root; gate: the orchestrator accepts the exemplar reference taxonomy and catalogue/session checklist.
- Round 2 — judgment: assign the complex ownership-boundary skills one per `gpt-5.6-sol` worker at `high`, with no more than three non-overlapping workers; files: `ki-engineering`, `ki-decision-records`, `ki-repo`, `ki-repo-roadmap`, `ki-kb`, `ki-kb-streams`, and `ki-tokenomics`; gate: focused tests, generated-rubric parity, and direct audit or conform-dry-run evidence.
- Round 3 — judgment: review each remaining row one skill at a time with `gpt-5.6-sol` at `high`, with no more than three non-overlapping workers; files: one exclusive skill root per worker; gate: the same implementation-and-reference checklist. Do not include `ki-specifications`.
- Round 4 — integration: the orchestrator checks all retained references, catalogue fields, declared repository skills, CI, pre-commit, and native repository commands before acceptance.
