---
id: 'FND-004'
title: Define compatible harness registration and native repository-maintenance boundaries
status: acceptance
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

Every in-scope structured catalogue has now been accepted against the final family/session contract. The deferred `ki-specifications` catalogue remains outside this completed sweep.

CI, pre-commit, active maintainer guidance, evals, hook guidance, and skill standards now use the direct native `ki` surface. Obsolete repository-executor, package-alias, bootstrap, and installed-copy assumptions have been removed while intentional migration and legacy-detection material remains explicit.

### Current skill tree

The current physical tree mixes semantic domains, dependency roles, and historical importance. The arrows show the one capability rename proposed by this plan; `ki-repo-review` keeps its current name because dropping `repo` would make a deliberately repository-scoped review process ambiguous.

```text
skills/
├── environment/
│   ├── ki-binding
│   ├── ki-housekeeping
│   └── ki-tokenomics
├── foundations/
│   ├── ki-authoring
│   └── ki-engineering
├── general-governance/
│   ├── ki-decision-records
│   ├── ki-feature-definitions
│   ├── ki-handoffs
│   ├── ki-roadmap → ki-roadmap
│   └── ki-subagents
├── implied-families/
│   ├── ki-binding-chezmoi
│   ├── ki-kb-activities
│   ├── ki-kb-live-artifacts
│   ├── ki-kb-streams
│   └── ki-website-cloudflare
├── keystone/
│   ├── ki-bootstrap
│   ├── ki-repo
│   └── ki-skills
├── process/
│   ├── ki-delegate
│   ├── ki-next
│   ├── ki-plan
│   ├── ki-recap
│   └── ki-repo-review
└── repo-structure/
    ├── ki-dotfiles-chezmoi
    ├── ki-harness
    ├── ki-homebrew-tap
    ├── ki-kb
    ├── ki-mcp
    ├── ki-plugins
    ├── ki-specifications
    ├── ki-tools
    └── ki-website
```

### Target skill tree

The target groups skills by the domain they govern. Importance and composition remain in frontmatter and the generated dependency graph rather than being encoded as `foundations` or `implied-families` directories. `ki-harness` and `ki-plugins` are domain-specific agentic-system standards, not universal keystones.

```text
skills/
├── agentic-systems/
│   ├── ki-harness
│   ├── ki-mcp
│   ├── ki-plugins
│   └── ki-subagents
├── environment/
│   ├── ki-binding
│   ├── ki-binding-chezmoi
│   ├── ki-dotfiles-chezmoi
│   ├── ki-housekeeping
│   └── ki-tokenomics
├── governance/
│   ├── ki-authoring
│   ├── ki-decision-records
│   ├── ki-engineering
│   ├── ki-feature-definitions
│   ├── ki-handoffs
│   ├── ki-roadmap
│   └── ki-specifications
├── keystone/
│   ├── ki-bootstrap
│   ├── ki-repo
│   └── ki-skills
├── knowledge-bases/
│   ├── ki-kb
│   ├── ki-kb-activities
│   ├── ki-kb-live-artifacts
│   └── ki-kb-streams
├── process/
│   ├── ki-delegate
│   ├── ki-next
│   ├── ki-plan
│   ├── ki-recap
│   └── ki-repo-review
├── tooling/
│   ├── ki-homebrew-tap
│   └── ki-tools
└── websites/
    ├── ki-website
    └── ki-website-cloudflare
```

The target placement of `ki-specifications` is recorded for completeness, but its move and all content changes remain deferred with the rest of that skill's excluded scope.

## Steps

1. [x] Review and finish the 26 in-scope skills one at a time. For every structured catalogue, make each family module export one complete `RubricFamily`, default-export one `SkillRubricDefinition` with `createSession`, keep criterion behaviour on its item, keep shared-draft composition in the session, and remove catalogue splits, `LegacyFamily` casts, family mappers, barrel exports, and per-skill execution or reporting adapters.
2. [x] Review each skill's reference set in the same pass. Every top-level Markdown reference must be `standards-<topic>.md`, generated `rubric.md`, `sources.md`, optional `exemplars.md`, or `mode-<verb>.md`; a skill includes only the classes it needs, and each mode file owns exactly one mode. Classify normative artifact formats, shared mode contracts, and process doctrine as standards; split combined mode files such as `mode-audit-conform.md`; move reusable output templates to `assets/`; remove nested references and ad hoc guide, format, or contract filenames; merge stale or duplicative material; and align `SKILL.md` navigation, family `standard` fields, item sources, and relative links with the retained set. A row is complete only when both its implementation shape and closed reference vocabulary pass review.
   - [x] `ki-skills` — accepted in `42d4e707`: one catalogue/session contract; closed references split into Agent Skills, Knowledge Islands, rubric-authoring, and candidate-finding standards plus one-mode REVIEW and EXTRACT procedures; retired checker-response contract and optional candidate validator removed; no top-level public scripts remain.
   - [x] `ki-authoring` — accepted in `a2c305ec`: self-contained families, one `createSession` catalogue, session-owned safe drafts and bounded formatter commands, flat authoring/Markdown/TOML standards, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-binding` — accepted in `e16430a6`: stable mixed repository and user-home evidence, item-owned binding action, session-owned contained Cowork drafts, wiring-only catalogue, legacy adapter removed, cross-surface binding standard named explicitly, generated rubric in sync, and both necessary public commands retained with strict safety and focused tests.
   - [x] `ki-binding-chezmoi` — accepted in `a482ef25`: physical and symlink-safe render evidence, external chezmoi choices retained as report-only policy, one complete family and wiring-only catalogue, legacy adapter removed, chezmoi MCP rendering standard named explicitly, generated rubric in sync, and no top-level public scripts. Composed execution passed after the accepted `ki-dotfiles-chezmoi` migration.
   - [x] `ki-bootstrap` — accepted in `fdf12690`: guidance-only process boundary, native CLI standard and examples, stale BOOT rubric removed, closed four-reference set retained, and no catalogue or top-level public scripts.
   - [x] `ki-decision-records` — accepted in `ea8d5dc4`: focused session contexts and one shared index draft, self-contained families, wiring-only catalogue, `standards-decision-records.md`, separate AUDIT and CONFORM mode files, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-dotfiles-chezmoi` — accepted in `0646f000`: explicit `.chezmoiignore` creation retained as an idempotent item-owned action and session proposal, eight complete families, wiring-only catalogue, legacy adapter removed, chezmoi dotfiles standard named explicitly, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-engineering` — accepted in `f8261a73` and independently post-verified after its concurrent-worktree hook bypass: focused family contexts, session-owned coalesced drafts and bounded commands, item-owned actions, wiring-only catalogue, `standards-engineering.md`, exact shared rubric contract, generated rubric in sync, and no top-level public scripts. Repository CI and legacy exclusion findings remain for integration steps 5–6.
   - [x] `ki-feature-definitions` — accepted in `473562e2`: ten complete families, heading normalisation owned by its identity item, shared file drafts coalesced by the session, wiring-only catalogue, legacy mapper and adapter removed, feature-definition standard named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-handoffs` — accepted in `3da3d73b`: one self-contained HAND family, wiring-only default catalogue, item-owned behaviour, session-owned readiness draft, renamed `standards-handoffs.md`, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-harness` — accepted in `4d717fb2`: safe harness-marker append owned by its item and coalesced by the session, unsafe configuration and shelf links refused, physical installed capabilities discovered directly, seven complete families, wiring-only catalogue, compatible-harness standard named explicitly, generated rubric in sync, and the obsolete global-skill linker and package-alias family removed. Composed execution passed after the accepted `ki-subagents` migration.
   - [x] `ki-homebrew-tap` — accepted in `67c3e287`: stable applicability, marker mutation retained as an item-owned and session-coalesced proposal, all Homebrew commands explicitly report-only, complete TAP and CONFIG families, wiring-only catalogue, legacy adapter removed, Homebrew-tap standard named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-housekeeping` — accepted in `031154c0`: repository SELF evidence separated from bounded user-home memory subjects, contained memory repairs coalesced in one session, destructive cleanup retained as manual policy, five complete families, wiring-only catalogue, Claude-state and auto-memory standards named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-kb` — accepted in `955ce63d`: evidence split by responsibility, safe index and `MEMORY.md` creation retained as session-owned proposals, item-owned zone actions, wiring-only catalogue, templates moved to assets, KB and frontmatter standards named explicitly, generated rubric in sync, and no top-level public scripts. Composed execution passed after the accepted `ki-kb-activities` migration.
   - [x] `ki-kb-activities` — accepted in `2fe6b97e`: idempotent `Activities.md` creation retained as one contained session proposal with an item-owned action, complete ACT family, wiring-only catalogue, legacy adapter removed, activities standard added, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-kb-live-artifacts` — accepted in `7feaf9d1`: safe index create and append plus missing-render drafts coalesced in one session, rendering and orphan deletion retained as manual policy, complete structure and frontmatter families, wiring-only catalogue, live-artifact standard named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-kb-streams` — accepted in `b095552d`: lifecycle normalisation preserved on one coalesced session proposal, four complete families, wiring-only catalogue, legacy adapter removed, stream-structure and enactment-process standards named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-mcp` — accepted in `7ed32e5c`: bounded configuration proposals retained in the session, client generation and smoke checks kept report-only, ten complete families, wiring-only catalogue, legacy adapter removed, MCP server and surface-specific standards named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-plugins` — accepted in `262cc024`: generated projections and all external or scaffold work retained as report-only policy, one complete PLUG family, wiring-only catalogue, legacy adapter removed, plugin-marketplace standard named explicitly, complete one-mode procedure set retained, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-repo` — accepted in `0d865632`: focused repository contexts, item-owned explicit create and append actions, session-owned coalesced configuration drafts, wiring-only catalogue, GitHub confirmation boundaries preserved, repository and configuration standards named explicitly, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-roadmap` — accepted in `686466bd`: focused evidence plus session-owned multi-file drafts, item-owned actions, wiring-only catalogue, legacy writer/schema removed, repository-roadmap and plan-format standards named explicitly, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-subagents` — accepted in `b0419a26`: per-agent subjects and safe filename-alignment drafts preserved, ten explicit complete families, wiring-only catalogue, legacy mapper and shared barrels removed, subagent-definition standard named explicitly, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-tokenomics` — accepted in `24b99d37`: bounded user-home evidence separated into focused contexts, all unsafe work retained as report-only policy, seven complete families, wiring-only catalogue, legacy shared adapter removed, tokenomics and Headroom-operation standards named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-tools` — accepted in `83ce459d`: bounded executable and configuration repairs retained as item-owned and session-coalesced proposals, four complete families, wiring-only catalogue, legacy adapter removed, tool-repository standard named explicitly, AUDIT and CONFORM procedures split, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-website` — accepted in `4e37e0d8`: safe `.gitignore` and `.ki-config.toml` creation retained as session proposals, deployment kept manual, one complete WEB family, wiring-only catalogue, legacy topic fragments and adapter removed, Eleventy-site standard named explicitly, complete one-mode procedure set retained, generated rubric in sync, and no top-level public scripts.
   - [x] `ki-website-cloudflare` — accepted in `8c4b62cc`: real read-only hosting evidence, all Cloudflare, Wrangler, and deployment operations retained as report-only policy, one complete WCF family, wiring-only catalogue, legacy adapter removed, Cloudflare-hosting standard named explicitly, complete one-mode procedure set retained, generated rubric in sync, and no top-level public scripts.
3. [x] Review every top-level `skills/**/scripts/*.ts` file in the same skill pass. Retain only a necessary public skill command with a clear purpose, useful `--help`, explicit error handling, and focused tests; move private implementation to `scripts/internal/`, published or materialised compile-time dependencies to `scripts/shared/`, and governed rubric behaviour to `scripts/rubric/`. Remove wrappers, one-off validators, and helpers whose capability now belongs to `ki`. Tests may remain adjacent to the public command they cover. The retained public surface is the two tested `ki-binding` projection commands and the tested `ki-recap` transcript-grounding helper.
4. [x] Apply the target taxonomy as one clean cut after the active per-skill edits land. Adopt `ki-roadmap` as the roadmap-governance capability name; keep `ki-repo-review`; consolidate the governance skills; and move the remaining skills into `agentic-systems`, `environment`, `knowledge-bases`, `tooling`, and `websites` as shown above. Update frontmatter dependencies, `.ki-config.toml`, generated graphs, documentation, fixtures, and every source or link reference in the same change. Do not move or edit `ki-specifications` during this plan. Accepted at `fa6b29c7`; the commit also aligned four process reference names exposed by the staged-snapshot gate.
5. [x] Prove native self-hosted parity: the explicit canonical CLI resolves and executes EDUCATE, AUDIT, and CONFORM dry-run for all 12 declared skills, with exact dependency expansion, moved-source resolution, bounded user-home scopes, and no proposed writes or commands. Aggregate compliance is not claimed: three intentionally deferred `ki-specifications` failures and ten FAIL / three WARN external housekeeping fleet findings remain.
6. [x] Finish the live-role cutover: replace the stale CI alias and `.ki/bootstrap` description, make the direct pre-commit staged snapshot dependency-complete, and remove obsolete vendoring, executor, bootstrap, and educate guidance. Retain only commands and fixtures whose roles sit outside governed-rubric execution.
7. [x] Run the complete source-harness verification through the native path and present FND-004 for acceptance.

## Files touched

- The 26 in-scope skill roots under `skills/`
- Skill path, dependency, configuration, graph, catalogue, and documentation references affected by the target taxonomy
- `.github/workflows/ci.yml`, `.husky/pre-commit`, and affected maintainer guidance
- This plan and its foundation-tooling roadmap item

## Verify

1. Every in-scope skill row records an accepted implementation shape, closed reference vocabulary, and justified top-level script set.
2. Every in-scope structured catalogue follows the accepted `ki-skills` family/session contract and its generated `references/rubric.md` is in sync.
3. The in-scope physical tree matches the target taxonomy, except for the explicitly deferred `skills/repo-structure/ki-specifications` path; `ki-roadmap` is the only roadmap-governance capability name; and no other source path retains `implied-families`, `foundations`, `general-governance`, or `repo-structure`.
4. The canonical local harness resolves and executes educate, audit, and conform dry-run for every skill declared by this repository; any non-zero result is attributable only to explicitly excluded catalogue work or external user-home evidence.
5. CI and pre-commit use the direct `ki` surface without `.ki`, package aliases, compatibility runners, or incomplete staged dependency material.
6. `bun run test`, TypeScript, Biome, knip, syncpack, the authoring gate, and the roadmap audit pass. The aggregate native audit executes fully with no harness-source, resolution, loader, or proposal failures; explicitly deferred `ki-specifications` and external user-home housekeeping findings are recorded separately.

## Dependencies / blocks

The generic CLI runtime and command surface are delivered in `tools-ki`; CLI-004 now needs only its own final acceptance gate.

`ki-specifications` remains deliberately parked. Its catalogue and references are not part of this plan's 26-skill review and must not be changed until the user resumes that scope.

## Delegation

- Round 1 — judgment: assign `ki-skills` alone to a `gpt-5.6-sol` worker at `xhigh`; files: only its skill root; gate: the orchestrator accepts the exemplar reference taxonomy and catalogue/session checklist.
- Round 2 — judgment: assign the complex ownership-boundary skills one per `gpt-5.6-sol` worker at `high`, with no more than three non-overlapping workers; files: `ki-engineering`, `ki-decision-records`, `ki-repo`, `ki-roadmap`, `ki-kb`, `ki-kb-streams`, and `ki-tokenomics`; gate: focused tests, generated-rubric parity, and direct audit or conform-dry-run evidence.
- Round 3 — judgment: review each remaining row one skill at a time with `gpt-5.6-sol` at `high`, with no more than three non-overlapping workers; files: one exclusive skill root per worker; gate: the same implementation-and-reference checklist. Do not include `ki-specifications`.
- Round 4 — integration: the orchestrator checks all retained references, catalogue fields, declared repository skills, CI, pre-commit, and native repository commands before acceptance.

## Acceptance

### Delivered

FND-004 delivers the compatible-harness registration boundary, the native governed-rubric execution contract, the complete 26-skill catalogue and reference migration, the target skill taxonomy, and the removal of the repository-vendored executor surface.

### Summary of changes

The canonical harness now publishes complete `RubricFamily` modules and `SkillRubricDefinition` session entrypoints consumed directly by `tools-ki`. The in-scope skill tree uses the accepted domain taxonomy, `ki-roadmap` is the sole roadmap-governance capability, and every reviewed reference set and public script surface follows the closed authoring contract.

CI, pre-commit, active user and developer guides, process skills, evals, hooks, subagent guidance, and skill standards now invoke native `ki` operations. The retirement guide records the clean-end-state capability renames needed by existing repositories. Historical decision evidence and explicit legacy-detection rules remain intentionally.

### Verification

The implementation was verified at harness revision `fb861597cbb8d20eeba4210ffe5cf63d52ef8996` with the local `tools-ki` CLI:

- `bun run test` — 173 passed, 0 failed.
- `bunx tsc --noEmit` — clean.
- `bunx biome check .` — 306 files clean.
- `bunx knip` — exit 0; configuration hints only.
- `bunx syncpack format --check` — clean.
- `ki repo audit --skill ki-authoring` — zero FAIL and zero WARN.
- `ki repo audit --skill ki-engineering` — zero FAIL and zero WARN.
- `ki repo audit --skill ki-roadmap` and `ki repo conform --skill ki-roadmap --dry-run` — zero FAIL and zero WARN.
- `ki repo educate` — all 12 declared executions resolved and rendered.
- Aggregate `ki repo audit` and `ki repo conform --dry-run` — all declared executions resolved; no proposed writes or commands; only the excluded findings recorded below remain.

The subsequent guidance-only commits `ad99d04b` and `9ce317d2` aligned the documented native command grammar and recorded the rollout capability renames. Their focused Prettier, markdownlint, `ki-authoring`, and `ki-repo` audits passed without changing the verified runtime.

### Outstanding concerns

The deliberately deferred `ki-specifications` catalogue produces three known findings: two `KI-CHECKER-4` failures and one `KI-SHAPE-6` failure.

The user-home `ki-housekeeping` scope reports ten filename failures and three index-length warnings in unrelated Claude memory stores. These are external fleet findings, not harness-source or native-host failures.

The user setting reported by `ki-tokenomics` contains the literal value `claude-fable-5[1m]`; `tools-ki` now strips real terminal control sequences, but correcting already stored user configuration is outside this plan.

### Mini recap

The clean-end-state cutover removed compatibility machinery instead of preserving an intermediate executor. Keeping criterion semantics in rubric items, cross-item coalescing in skill sessions, and generic publication in `tools-ki` produced a smaller and clearer ownership boundary. The next catalogue migration should reuse the accepted exemplar directly rather than introduce adapters.
