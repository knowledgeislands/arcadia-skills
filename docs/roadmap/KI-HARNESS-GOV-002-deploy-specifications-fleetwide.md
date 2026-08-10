---
id: KI-HARNESS-GOV-002
title: Deploy Specifications fleetwide
area: GOV
theme: governance-consistency
horizon: now
status: awaiting-review
blocks: []
blocked_by: []
baseline_ref: ba91c843419820f6c37679abd8691c665bed951d
---

## Goal

Prepare a receiver-owned rollout of `ki-specs` across eligible estate repositories, using current as-built evidence rather than a central mandate.

## Context

The former Feature Definitions concept is now the `ki-specs` concern: Decision Records explain why, Specifications state what is true and verifiable, Guides explain how, and roadmap items record when work will happen. Existing pilot evidence must therefore be re-grounded against `docs/specs/` and the `ki-specs` contract rather than the retired terminology or layout.

## Boundary

Do not create, prioritise, or edit a receiving repository's specifications corpus. This work prepares evidence and receiver-owned proposals only; an accepted receiving record remains the authority for every repository-local change.

## Shaping

### Intended approach

Use the Harness and `tools-ki` as current `ki-specs` evidence. Reconcile the existing `tools-ki` repository-audit corpus with the `docs/specs/` index, requirement, and verification contract, then classify every eligible estate repository as already covered, a bounded receiver-owned adoption candidate, or not applicable.

For each adoption candidate, prepare a concise receiver-owned proposal that names the first as-built area, its verification hooks, the local owner, and the boundary that excludes aspirational work. Do not treat a prepared proposal, historic pilot, or a shared standard as acceptance.

### Known dependencies

`ki-specs` defines the only active specification format. Every receiving repository remains the owner of its source, corpus, priority, and verification. The Harness may inspect those repositories and record a proposed handoff, but may not infer a receiving disposition.

### Rollout evidence

An eligible repository has a stable, observable area that can be described truthfully in `docs/specs/`, with named verification evidence and a receiver able to own the corpus. The `tools-ki` repository-audit corpus demonstrates this shape: its numbered requirements lead a maintainer to concrete CLI tests and behaviour.

### Approved planning basis

This plan authorises an evidence-led rollout preparation. It deliberately stops before every receiving decision, adoption, or corpus write.

## Current state

The Harness and `tools-ki` declare `ki-specs`. `tools-ki` carries an as-built repository-audit area at `docs/specs/repository-audit.md`, registered from `docs/specs/index.md`. Its requirements cover `ki repo audit` selection, reporting, output controls, failure status, and multi-repository summaries.

The corpus makes a concrete maintenance question easier to route to the relevant behaviour and focused CLI tests. Its qualitative evidence and deliberately bounded scope are sufficient to prepare receiver-owned candidates, not to imply estate-wide adoption.

## Steps

- [x] Inventory every estate repository's declared `ki-specs` state, `docs/specs/` corpus, and viable as-built areas; record covered and not-applicable repositories explicitly.
- [x] Reconcile the `tools-ki` repository-audit corpus against the current `ki-specs` contract and capture the bounded maintenance outcome as rollout evidence.
- [x] Classify eligible repositories into receiver-owned adoption candidates, naming the proposed first area, verification hook, local owner, and exclusion boundary for each.
- [x] Prepare one receiver-facing proposal per candidate without editing a peer repository or inferring acceptance; park any candidate that lacks an owner, stable behaviour, or truthful verification.
- [x] Reconcile totals to the estate inventory and record every proposal, exclusion, and park in this work item.

## Files touched

- This work item, containing the estate inventory, classifications, and receiver-facing proposals

No peer `docs/specs/`, configuration, or roadmap file changes in this item.

## Verify

- Every estate repository appears once with a declared `ki-specs` disposition, including explicit not-applicable and parked results.
- `ki repo audit --skill ki-specs --repo ../tools-ki` passes, and each cited requirement names a concrete existing verification hook.
- Every adoption candidate names a receiving repository, first area, owner, verification, and exclusion boundary; no receiving state changes here.
- `ki repo audit --skill ki-change-management-roadmap --repo .` and `ki repo audit --skill ki-authoring --repo .` pass.

## Dependencies / blocks

The `tools-ki` corpus is available as evidence. A proposal cannot progress past this work item until its receiving repository confirms a local disposition; absence of a receiver, stable as-built area, or verification is a named park, not an inferred rollout.

## Delegation

### Locked decisions

- Only this roadmap item may be written; every estate repository remains read-only and owns its own disposition.
- The estate inventory includes the Harness and the declared `ki-all` members; missing access, an absent owner, or insufficient evidence is a named park, never an inferred adoption.

### Escalate

- An inaccessible declared member, disputed estate boundary, or incomplete source inventory that prevents an honest complete count.
- Any candidate without a receiving owner, stable as-built area, or truthful verification hook, and any request to create or alter a peer record or specifications corpus.

### Rounds

- Round 1: `specifications-estate-inventory`.

### Worker: specifications-estate-inventory

- **Deliverable:** Complete estate inventory, `tools-ki` pilot reconciliation, classifications, receiver-facing proposals, exclusions, and reconciled totals in this item.
- **Files:** Write only `docs/roadmap/KI-HARNESS-GOV-002-deploy-specifications-fleetwide.md`; read estate configuration, `docs/specs/`, and existing verification evidence.
- **Definition of done:** Every declared estate repository has a covered, candidate, not-applicable, or parked disposition; every candidate names its proposed first area, receiver, verification, and exclusion boundary.
- **Model:** frontier — cross-repository evidence synthesis under strict receiving-authority boundaries.
- **Verify:** Orchestrator confirms no peer write, samples every cited evidence source, checks totals, then runs the item's roadmap and authoring audits.
- **Checkpoint:** Return with the completed record and a concise list of every park or human decision; use `GIT_INDEX_FILE=/private/tmp/ki-harness-batch-001-gov002.index` for any Git staging and do not commit.

## Estate inventory

The inventory was observed on 2026-08-10 from the Harness-owned `ki-all` membership in `.ki-config.toml`: the Harness plus fifteen declared members, sixteen repositories total. Every declared checkout was accessible. All were clean except `tools-ki`; its unrelated working changes did not touch the four pilot evidence paths named below.

- **`knowledgeislands/ki-agentic-harness` — covered.** It declares `ki-specs` and registers five current areas from `docs/specs/index.md`; the corpus has concrete hooks into Harness tests and source.
- **`knowledgeislands/tools-ki` — covered.** It declares `ki-specs` and registers twelve current areas from `docs/specs/index.md`; `docs/specs/repository-audit.md` is the reconciled pilot evidence.
- **`krisb/dotfiles` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; the Claude Code hook binding is stable, observable, and exercised by `tests/claude-code-hook-binding.test.mjs`.
- **`knowledgeislands/homebrew-tap` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `Formula/ki.rb` and `Formula/mgit.rb` define installation output with executable version and help assertions in their `test do` blocks.
- **`knowledgeislands/ki-plugins` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `.claude-plugin/marketplace.json`, `knowledge-islands/.claude-plugin/plugin.json`, and the declared `ki-repo-plugins` audit expose a bounded publication surface.
- **`knowledgeislands/ki-website` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `site/src/sitemap.njk`, `site/src/robots.njk`, `site/src/_redirects`, and the `ki:site:build` package command define verifiable generated discovery outputs.
- **`knowledgeislands/mcp-claude-housekeeping` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `src/main/claude-desktop/audit.test.ts` exercises the read-only audit summaries and error boundaries.
- **`knowledgeislands/mcp-git-audit` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `src/main/repo-audit/scan.test.ts`, `audit.test.ts`, and `detail.test.ts` exercise repository discovery and read-only audit behaviour.
- **`knowledgeislands/mcp-gsuite` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `src/main/messages/index.test.ts` exercises the bounded Gmail message-handler surface.
- **`knowledgeislands/mcp-ki-kb-fs` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `src/main/files/index.test.ts` and `src/tools/kb/index.test.ts` exercise file operations, protection, KB selection, and result envelopes.
- **`knowledgeislands/mcp-ki-kb-notion-mirror` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; the tests under `src/main/notes/` exercise frontmatter, Markdown transformation, and wikilink conversion without a live Notion call.
- **`knowledgeislands/mcp-m365` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; `src/main/triage/parser.test.ts` and `semantics.test.ts` exercise the email-triage rule language and first-match semantics.
- **`knowledgeislands/tools-mgit` — candidate.** It does not declare `ki-specs` and has no `docs/specs/`; the hermetic `tests/mgit.bats` suite exercises workspace discovery, selection, grouping, and command dispatch.
- **`knowledgeislands/ki-arcadia-principal` — not applicable.** It declares `repo_type = "kb"`, uses the governed Knowledge Base shape, has no `docs/specs/`, and exposes no repository-local software behaviour that warrants the non-KB four-document Specifications corpus.
- **`knowledgeislands/ki-techne-principal` — not applicable.** It declares `repo_type = "kb"`, uses the governed Knowledge Base shape, has no `docs/specs/`, and exposes no repository-local software behaviour that warrants the non-KB four-document Specifications corpus.
- **`knowledgeislands/ki-specifications` — not applicable.** It declares `ki-repo-specifications` and owns ecosystem-normative `specifications/` documents; adding a repo-local `docs/specs/` as-built corpus would duplicate terminology without an implementation surface.

The totals reconcile to sixteen: two covered, eleven candidates, three not applicable, and zero parked. Fourteen repositories do not declare `ki-specs` and have no `docs/specs/`; that absence is classified evidence, not automatic drift.

## Pilot reconciliation

The current `ki-specs` contract requires a flat `docs/specs/` corpus, an `index.md` registry, append-only area prefixes and identifiers, one behaviour-level RFC-2119 statement per requirement, and a concrete `_Verify:_` hook. `tools-ki/docs/specs/index.md` registers `repository-audit.md` under `REPO-AUDIT`, and `tools-ki/docs/specs/repository-audit.md` carries seven sequential as-built requirements with no aspirational item promoted from `## Gaps`.

Every requirement's named hook exists:

- `REPO-AUDIT-001` maps to `src/tests/cli/repo/repo.test.ts` — `requires a resolved KI repository`.
- `REPO-AUDIT-002` maps to `src/tests/cli/repo/repo.test.ts` — `runs only a declared skill's mechanical rubric items`.
- `REPO-AUDIT-003` maps to `src/tests/cli/repo/repo.test.ts` — `selects an exact capability when another declared skill extends its name`.
- `REPO-AUDIT-004` maps to `src/tests/cli/repo/repo.test.ts` — `filters complete outcome levels by default and renders every level on request`.
- `REPO-AUDIT-005` maps to `src/tests/cli/repo/repo.test.ts` — `exposes and validates repository-operation output controls`.
- `REPO-AUDIT-006` maps to `src/tests/cli/repo/repo.test.ts` — `fails when a FAIL-level item reports a violation`.
- `REPO-AUDIT-007` maps to `src/tests/cli/repo/targets.test.ts` — `runs audit independently for every preflighted explicit target` and `recaps every repository verdict and aggregate finding volume`.

The bounded maintenance outcome is demonstrated: a maintainer can route questions about repository resolution, declared capability selection, finding visibility, output validation, failure status, and multi-repository summaries from one registered area to named CLI evidence. The structural audit passed; this inventory did not execute the peer test suite or independently prove every test assertion's runtime truth.

## Receiver-facing proposals

Each entry is a proposal only. Its named repository maintainers are the local owner because every repository is declared in `ki-all` with the `maintainer` role; those receivers must explicitly accept, park, decline, clarify, or supersede the proposal before any local activation or corpus write.

- **`krisb/dotfiles`.** First area: Claude Code hook binding and fail-closed validation. Owner: `krisb/dotfiles` maintainers. Verify: `node tests/claude-code-hook-binding.test.mjs`. Exclude: secrets, general chezmoi rendering, and untested personal configuration.
- **`knowledgeislands/homebrew-tap`.** First area: formula installation and installed executable identity. Owner: repository maintainers. Verify: the `test do` assertions in `Formula/ki.rb` and `Formula/mgit.rb` through `brew test`. Exclude: upstream CLI semantics, release creation, and behaviours not asserted by the formulae.
- **`knowledgeislands/ki-plugins`.** First area: marketplace manifest, plugin manifest, and the skills-plus-agents publication boundary. Owner: repository maintainers. Verify: `ki repo audit --skill ki-repo-plugins --repo .`. Exclude: Harness-owned skill semantics, host-local MCP execution, and publication work not present in the projection.
- **`knowledgeislands/ki-website`.** First area: generated `sitemap.xml`, `robots.txt`, and redirects. Owner: repository maintainers. Verify: `bun run ki:site:build` followed by assertions on `site/dist/sitemap.xml`, `site/dist/robots.txt`, and `site/dist/_redirects`. Exclude: editorial truth, analytics, and Cloudflare deployment behaviour.
- **`knowledgeislands/mcp-claude-housekeeping`.** First area: read-only Claude Desktop housekeeping audit summaries. Owner: repository maintainers. Verify: `bunx vitest run src/main/claude-desktop/audit.test.ts`. Exclude: destructive prune operations and Claude Code or VS Code surfaces until separately evidenced.
- **`knowledgeislands/mcp-git-audit`.** First area: repository discovery, audit, and detail reporting. Owner: repository maintainers. Verify: `bunx vitest run src/main/repo-audit/scan.test.ts src/main/repo-audit/audit.test.ts src/main/repo-audit/detail.test.ts`. Exclude: fetch, pull, push, commit, and remote mutation tools.
- **`knowledgeislands/mcp-gsuite`.** First area: Gmail message search, retrieval, labelling, state changes, and batching. Owner: repository maintainers. Verify: `bunx vitest run src/main/messages/index.test.ts`. Exclude: live OAuth or Google API availability and Calendar, Drive, Sheets, drafts, or thread behaviour.
- **`knowledgeislands/mcp-ki-kb-fs`.** First area: filesystem note operations and KB selection boundaries. Owner: repository maintainers. Verify: `bunx vitest run src/main/files/index.test.ts src/tools/kb/index.test.ts`. Exclude: Knowledge Base content semantics, cross-product publication, and Notion mirroring.
- **`knowledgeislands/mcp-ki-kb-notion-mirror`.** First area: local note frontmatter, Markdown block conversion, and wikilink transformation. Owner: repository maintainers. Verify: `bunx vitest run src/main/notes/frontmatter.test.ts src/main/notes/markdown.test.ts src/main/notes/wikilinks.test.ts`. Exclude: live Notion API behaviour, remote tree mutation, and pruning.
- **`knowledgeislands/mcp-m365`.** First area: email-triage rule parsing, precedence, fallback, and lint semantics. Owner: repository maintainers. Verify: `bunx vitest run src/main/triage/parser.test.ts src/main/triage/semantics.test.ts`. Exclude: live Microsoft Graph mutations, authentication, Calendar, and OneDrive.
- **`knowledgeislands/tools-mgit`.** First area: workspace discovery, selection, named groups, and multi-repository command dispatch. Owner: repository maintainers. Verify: `bats tests/mgit.bats`, whose fixtures are local and network-free. Exclude: release installation, worktree mutation, and behaviours outside the selected first area.

No proposal is parked at preparation time: every candidate has a declared maintainer receiver, a stable source-bounded behaviour, and a truthful existing verification hook. Receiver acceptance is still required for all eleven proposals. If a receiver cannot own the corpus or rejects the observed evidence boundary, that receiver's proposal must be parked or declined locally rather than treated as adopted here.

## Review

### Delivered

A complete receiver-owned rollout inventory covering the Harness and all fifteen declared `ki-all` members, a reconciled `tools-ki` pilot, and eleven bounded receiver-facing proposals.

### Summary of changes

Recorded two covered repositories, eleven adoption candidates, three structural exclusions, and zero parks. Every candidate names its first as-built area, local receiver, existing verification hook, and explicit exclusion boundary; no peer state was changed.

### Verification

- `ki repo audit --skill ki-specs --repo ../tools-ki` — passed with no FAIL or WARN findings.
- Exact-name search across `tools-ki/src/tests/cli/repo/repo.test.ts` and `targets.test.ts` — all seven requirement hooks found.
- `git -C ../tools-ki diff --quiet -- docs/specs/index.md docs/specs/repository-audit.md src/tests/cli/repo/repo.test.ts src/tests/cli/repo/targets.test.ts` — exit 0; pilot evidence paths match `tools-ki` HEAD.
- `ki repo audit --skill ki-change-management-roadmap --repo .` — passed with no FAIL or WARN findings.
- `ki repo audit --skill ki-authoring --repo .` — passed with no FAIL or WARN findings.

### Outstanding concerns

All eleven candidate dispositions require explicit receiver decisions. The peer verification hooks were inspected but not executed; `tools-ki` had unrelated working-tree changes outside the four pilot evidence paths, so this record relies on their clean HEAD-matching state rather than treating the whole checkout as immutable.

### Post-change review

The write boundary remains this roadmap item only. No peer record, configuration, specification, source file, or test was created or changed, and no receiving acceptance was inferred.

### Mini recap

The estate count reconciles at sixteen, the current pilot conforms mechanically, and every eligible uncovered repository now has a bounded proposal ready for its receiver's decision.

## Discussion

### Current terminology

Historic Feature Definitions terminology describes superseded work. `ki-specs` and `docs/specs/` are the current contract, so this item does not preserve a parallel format or an alternate documentation category.

### Receiving ownership

The Harness supplies the originating evidence and proposals. Each receiving repository chooses whether to adopt, park, clarify, decline, or supersede its proposal and owns its local specification corpus.

### Evidence boundary

The existing `tools-ki` corpus demonstrates a bounded use case; it does not make any other repository's behaviour, priority, or specification scope a Harness decision.

### Source-grounded classification

The estate boundary comes from this repository's `[skills.ki-agora.homes.ki-all.members]` table. Declaration and corpus state came from each member's `.ki-config.toml` and `docs/specs/`; candidate areas came only from existing source and tests named in the inventory. The two Knowledge Bases were excluded because their declared repository type does not use the non-KB four-document shape, while `ki-specifications` was excluded because its `specifications/` tree is the normative ecosystem instrument rather than a built implementation corpus.

### Pilot finding

The repository-audit pilot is current enough to remain rollout evidence: its index registration, seven requirement shapes, and named hooks satisfy the present `ki-specs` mechanical contract. Its useful maintenance boundary is narrow and explicit, and its empty `## Gaps` does not smuggle planned behaviour into the numbered contract.

### Parks and receiver decisions

There are no evidence-stage parks. All eleven proposals stop at receiver review; a missing future ownership commitment, disagreement about the first area, or inability to keep its verification truthful is the explicit trigger to park or decline that proposal in the receiving repository.
