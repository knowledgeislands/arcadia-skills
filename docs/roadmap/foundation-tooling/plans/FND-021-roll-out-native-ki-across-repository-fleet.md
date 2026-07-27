---
id: 'FND-021'
title: Roll out native KI activation across the repository fleet
status: in-progress
roadmap: foundation-tooling/roll-out-native-ki-activation-across-the-repository-fleet
blocks: —
blocked-by: —
baseline-ref: 4515a613f05bee0f0c2c8588d98458d263dbbc5c
---

## Context

The harness and `tools-ki` now use the direct native repository-operation contract, but most neighbouring Knowledge Islands repositories still carry the retired vendored `.ki-meta` footprint. Their configuration and guidance therefore describe a mixture of the new CLI and the deleted repository-local executor.

The rollout should make the current model tangible across the estate now: `.ki-config.toml` declares governance, the installed canonical harness provides compatible capabilities, and `ki repo audit`, `ki repo conform`, and `ki repo educate` execute them directly. Repository-content findings remain useful evidence and are not activation failures merely because the native command exposes them.

RTP-002 separately redesigns environment capabilities by runtime and vendor. This rollout must not spread temporary housekeeping, tokenomics, or binding names while that contract is open.

## Current state

- Fourteen git repositories exist directly under `/Users/krisbrown/workspaces/kis/knowledgeislands/`; every one carries `.ki-config.toml` and declares support for Claude Code and Codex.
- No repository tracks `.ki` or `.ki-meta`; the twelve legacy repositories removed 511 tracked `.ki-meta` files in total.
- The six MCP repositories declare `ki-roadmap` instead of the retired `ki-repo-roadmap`, and no live legacy invocation remains.
- Every repository resolves its declared stable capabilities and reaches native audit execution. Remaining non-zero outcomes are genuine standards findings for the owning repositories, not activation failures.
- All fourteen worktrees were clean at their individual migration checkpoints and at the final fleet scan. Several contain committed local work ahead of their upstream; no rollout commit was pushed.
- The separate fleet-CI roadmap item remains responsible for clean hosted-runner installation and GitHub Actions verification.

## Execution baseline

The start gate recorded these immutable repository revisions before any rollout edit:

- `homebrew-tap` — `ee4fec66ef40f7575c7ac8dacd3cdbc1e06a9b9f`
- `ki-agentic-harness` — `4515a613f05bee0f0c2c8588d98458d263dbbc5c`
- `ki-arcadia-principal` — `01cc68c7dc6d92e33b46ee6d44511595888b0a29`
- `ki-plugins` — `9ae2e981ba4967c235a445619545d9910a97f281`
- `ki-specifications` — `c6409bfca823da0c2c679598b4e59a13bfc6084c`
- `ki-website` — `15602f960a6174391892f188176e8e24c448174d`
- `mcp-claude-housekeeping` — `442ed0bca6d5340584e8e29434ea0859f92a6c9c`
- `mcp-git-audit` — `4faa74a0e59668feab4a839c498511a9046deb03`
- `mcp-gsuite` — `487eaebf2c8251414a34fdeb749a115f1c2c8f94`
- `mcp-ki-kb-fs` — `b7cfa647fff4277f30b5eb11fe14cf5460b2bf50`
- `mcp-ki-kb-notion-mirror` — `1226a4a7ff91a2af1bc674bed69b351b218e1e52`
- `mcp-m365` — `772fb5ba1854d3220331cf7ed87c5feb99cb5fe3`
- `tools-ki` — `f1e17e8582a03376ddc441fd513c8b4f505108b1`
- `tools-mgit` — `08980d3e274683d093403f5ed00be0530111fcd6`

All targets except `tools-ki` were clean and on `main` tracking `origin/main` at the execution gate. `tools-ki` had an unrelated uncommitted `src/core/runtime.ts` change and was quarantined from rollout edits pending a clean recheck. Every target resolved `ki` 0.2.6; the harness used its local development link and the other repositories used the Homebrew installation.

## Steps

1. ✓ Record the full immutable baseline commit for every repository and recheck its worktree, branch, upstream, installed `ki` resolution, canonical harness inventory, `.ki-config.toml`, supported runtimes, declared skills, runtime links, and tracked legacy footprint. Stop on a dirty or concurrently changed target rather than absorbing its work.
2. ✓ Define the stable rollout matrix for all fourteen repositories: repository shape, current declarations, declarations retained or corrected, runtime activation required, retired paths removed, and expected native audit result. Exclude housekeeping, tokenomics, binding, and renderer-name normalisation owned by RTP-002.
3. ✓ In each of the twelve legacy repositories, delete the tracked `.ki-meta` payload and remove live `.ki-meta`, `.ki/bin`, wrapper, package-alias, and vendored-runner instructions. Preserve historical records where their explicit subject is the retired design.
4. ✓ Repair only settled configuration drift. Replace `ki-repo-roadmap` with `ki-roadmap` where a repository has the non-KB roadmap shape, remove declarations for absent capabilities, add presently applicable stable declarations, and ensure `[ki-repo].supported_runtimes` honestly names the repository's supported agents.
5. ✓ Reconcile repository and user runtime discovery through `ki skill repo` or `ki skill user` only where the current activation contract requires it. Never restore copied checkers, aggregate runners, or repository-local execution payloads.
6. ✓ Run each repository's declared native audit. Separate activation failures—unresolved capability, unsafe path, stale declaration, or missing runtime publication—from genuine standards findings emitted after execution. Fix activation in this plan; record substantive content findings in the owning repository's existing roadmap, Stream, or a narrowly scoped new item only when they lack a durable home.
7. ✓ Run the relevant repository-owned test, typecheck, build, and focused audit gates after each migration. Commit every repository independently with explicit paths, preserving pre-existing commits and leaving pushes for explicit user instruction.
8. ✓ Re-run the fourteen-repository matrix from clean worktrees. Require zero tracked `.ki` or `.ki-meta`, zero live runner invocation, successful declared-skill resolution, and an honest recorded outcome for every native audit.
9. ✓ Update the onboarding and migration guidance with the proven fleet procedure and its boundary from RTP-002 and the later GitHub CI acceptance pass.

## Files touched

- The twelve legacy repositories' tracked `.ki-meta` payloads, `.ki-config.toml`, runtime links, live developer guidance, and obsolete runner/package entry points
- Recipient-owned roadmap or Stream files only for newly exposed substantive findings without an existing durable home
- Harness onboarding and migration guidance plus this rollout plan

## Verify

1. `git ls-files '.ki/**' '.ki-meta/**'` returns no path in any of the fourteen repositories.
2. No live developer command, package script, hook, or CI step invokes `.ki/bin`, `.ki-meta`, a vendored checker, `ki-repo-roadmap`, or a retired aggregate alias.
3. Every `.ki-config.toml` resolves its stable declared capabilities from the installed canonical harness and declares an honest supported-runtime set.
4. `ki repo audit --repo <path>` reaches native execution in every repository; any non-zero result is traced to explicit standards findings rather than activation or legacy-footprint failure.
5. Every repository's relevant local tests, typecheck, build, and focused native audits pass for the migrated surface.
6. Each repository is clean after its own explicit-path commit, with its pre-rollout baseline and any pre-existing ahead commits preserved.
7. No temporary RTP-002 environment naming or coverage decision is propagated by this rollout.
8. The later fleet-CI item remains the sole owner of GitHub Actions and clean hosted-runner acceptance.

## Delegation

- Round 1 — orchestrator, judgment: record and lock the fourteen-repository baseline and rollout matrix, including the distinction between activation defects and substantive audit findings. Gate: every target is clean, its immutable commit is recorded, and no RTP-002 environment decision is included.
- Round 2A — general worker, mechanical, `gpt-5.6-terra` at medium reasoning: migrate the six homogeneous MCP repositories (`mcp-claude-housekeeping`, `mcp-git-audit`, `mcp-gsuite`, `mcp-ki-kb-fs`, `mcp-ki-kb-notion-mirror`, and `mcp-m365`). Remove `.ki-meta`, replace `ki-repo-roadmap` with `ki-roadmap`, remove live legacy-runner references, run repository gates, and commit each repository independently.
- Round 2B — general worker, mechanical, `gpt-5.6-terra` at medium reasoning: migrate `homebrew-tap`, `ki-plugins`, and `tools-mgit`. Remove `.ki-meta` and live legacy-runner references, retain only settled stable declarations, run repository gates, and commit each repository independently.
- Round 2C — general worker, mechanical with bounded classification, `gpt-5.6-terra` at medium reasoning: migrate `ki-arcadia-principal`, `ki-specifications`, and `ki-website`. Remove `.ki-meta` and live legacy-runner references, retain stable configuration, run repository gates, and commit each repository independently. Preserve explicit historical discussion of the retired design.
- Round 3 — the same repository-exclusive workers, mechanical, `gpt-5.6-terra` at medium reasoning: replace only marker-and-integrity-proven regular runtime skill copies with `ki skill repo` managed links for the current declarations. Preserve the committed `.agents/skills/ki-self/` source and its Claude projection; stop on every unproved or concurrently changed entry.
- Locked decisions for every worker: do not add compatibility paths, copied checkers, aggregate runners, environment-capability renames, remote GitHub changes, hosted-runner redesign, pushes, or unrelated content fixes. Tracked workflows may change only to replace live retired aliases with native `ki repo` commands. A native audit that reaches execution but emits standards findings is evidence, not an activation failure.
- Escalate rather than guess when a reference may be historical, a stable capability does not resolve, a repository becomes dirty or changes from its recorded baseline, a config change would touch RTP-002 scope, or a failing gate appears unrelated to activation.
- Definition of done for each delegated repository: no tracked `.ki` or `.ki-meta`; no live legacy invocation; no legacy regular-file runtime skill copy; current declarations have managed runtime links; stable declarations resolve; native audit reaches execution; relevant local gates are recorded; one explicit-path commit exists where tracked state changed; and the worktree is clean.
- Orchestrator gate: review every diff and commit against the recorded baseline, repeat the legacy scan and native audit, classify remaining findings, and reject scope expansion before completing the fleet matrix.
- Completion checkpoint: each worker returns repository-by-repository commit hashes, commands and outcomes, remaining substantive findings, and any escalations. Medium-reasoning Terra is the minimum viable choice because the edits are mechanical but live-versus-historical references and audit classification still require reliable bounded judgment.

## Dependencies / blocks

This local activation rollout is independent of RTP-002 because it excludes environment-capability naming and conditional coverage. RTP-002 will later migrate only that deliberately deferred configuration surface.

The rollout prepares but does not complete the separate GitHub CI fleet item. It changes no live GitHub settings and performs no push without explicit instruction.

## Acceptance

### Delivered

- Removed all 511 tracked `.ki-meta` files from the twelve legacy repositories and left all fourteen repositories with no tracked `.ki` or `.ki-meta` footprint.
- Replaced integrity-verified generated runtime skill copies with `ki skill repo` managed links for both Claude Code and Codex. The harness retains `.agents/skills/ki-self/` as the single intentional repository-owned runtime skill source.
- Replaced the six MCP repositories' retired `ki-repo-roadmap` declaration with `ki-roadmap`, removed live legacy invocations, and declared `claude-code` and `codex` as supported runtimes throughout the fleet.
- Regenerated the `ki-plugins` projection from the current harness and proved the result idempotent.
- Replaced the harness's vendored-bootstrap Feature Definitions and updated the onboarding and developer migration guidance for the native activation procedure.

### Verification

- Every repository's declared capabilities resolve and `ki repo audit` reaches native execution. Remaining non-zero outcomes are explicit standards findings owned by the affected repository, not unresolved capability, runtime publication, or legacy-runner failures.
- The final fleet scan found no broken managed links, no retired `ki-repo-roadmap` runtime entry, and no regular runtime skill copy other than the canonical `ki-self` source.
- The harness passed `bun run test` with 177 tests, `bunx tsc --noEmit`, and focused native audits for `ki-feature-definitions`, `ki-roadmap`, and `ki-repo`.
- All six MCP repositories passed their test and build gates: 307 housekeeping tests, 161 Git-audit tests, 464 Google Workspace tests, 236 KB filesystem tests, 288 Notion-mirror tests, and 551 Microsoft 365 tests.
- Homebrew formula style and strict audit passed; `tools-mgit` passed all 23 Bats tests; the plugin builder passed both tests and its generator produced no follow-up diff.
- All repositories were clean at their individual rollout checkpoints and again at the final fleet scan. No repository was pushed.

### Evidence revisions

- `homebrew-tap` — `89ee26019db37b310b928cb5f826cc665ca08f86`, `b677d4cbce560e8deed271122d6b52f3cb540d96`
- `ki-agentic-harness` — `5163fd98`, `bd7bfb54`
- `ki-arcadia-principal` — `4afca1e7`, `204768d4`
- `ki-plugins` — `951a0b59`
- `ki-specifications` — `b6aeaece`
- `ki-website` — `b4b137a8`, `ab14b7de`
- `mcp-claude-housekeeping` — `079bfccd`
- `mcp-git-audit` — `0924835a`
- `mcp-gsuite` — `ca5929fc`
- `mcp-ki-kb-fs` — `3dbca60d`
- `mcp-ki-kb-notion-mirror` — `9d0839f1`
- `mcp-m365` — `8395eae2`
- `tools-ki` — `6d4973f0`
- `tools-mgit` — `5b9fa411`, `eec7382a`

### Deferred boundaries

- Repository standards findings exposed by native audit remain with their owning repositories; this activation plan does not conceal them with compatibility code or expand into their remediation.
- RTP-002 remains responsible for runtime- and vendor-specific environment capabilities.
- The separate fleet-CI roadmap item remains responsible for proving installation and native commands on clean GitHub-hosted runners.
