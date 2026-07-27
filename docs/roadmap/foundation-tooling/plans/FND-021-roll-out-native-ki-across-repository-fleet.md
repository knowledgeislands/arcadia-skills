---
id: 'FND-021'
title: Roll out native KI activation across the repository fleet
status: open
roadmap: foundation-tooling/roll-out-native-ki-activation-across-the-repository-fleet
blocks: —
blocked-by: —
baseline-ref: —
---

## Context

The harness and `tools-ki` now use the direct native repository-operation contract, but most neighbouring Knowledge Islands repositories still carry the retired vendored `.ki-meta` footprint. Their configuration and guidance therefore describe a mixture of the new CLI and the deleted repository-local executor.

The rollout should make the current model tangible across the estate now: `.ki-config.toml` declares governance, the installed canonical harness provides compatible capabilities, and `ki repo audit`, `ki repo conform`, and `ki repo educate` execute them directly. Repository-content findings remain useful evidence and are not activation failures merely because the native command exposes them.

RTP-002 separately redesigns environment capabilities by runtime and vendor. This rollout must not spread temporary housekeeping, tokenomics, or binding names while that contract is open.

## Current state

- Fourteen git repositories exist directly under `/Users/krisbrown/workspaces/kis/knowledgeislands/`; every one carries `.ki-config.toml`.
- Twelve repositories still track 511 `.ki-meta` files in total. The harness and `tools-ki` already track neither `.ki-meta` nor `.ki`.
- Six MCP repositories still declare the retired `ki-repo-roadmap` capability and fail before any audit operation runs because the canonical harness no longer provides it.
- `homebrew-tap` and `tools-mgit` resolve and complete native audits with warnings only. The harness, Arcadia Principal, `ki-plugins`, KI Specifications, the Website, and `tools-ki` reach native execution but report genuine findings. Those findings need classification in their owning repositories, not compatibility restoration.
- All fourteen worktrees are currently clean and track `origin/main`. Several contain committed local work ahead of their upstream; the rollout must preserve those commits and must not push without explicit instruction.
- The separate fleet-CI roadmap item remains responsible for clean hosted-runner installation and GitHub Actions verification after local activation is sound.

## Steps

1. Record the full immutable baseline commit for every repository and recheck its worktree, branch, upstream, installed `ki` resolution, canonical harness inventory, `.ki-config.toml`, supported runtimes, declared skills, runtime links, and tracked legacy footprint. Stop on a dirty or concurrently changed target rather than absorbing its work.
2. Define the stable rollout matrix for all fourteen repositories: repository shape, current declarations, declarations retained or corrected, runtime activation required, retired paths removed, and expected native audit result. Exclude housekeeping, tokenomics, binding, and renderer-name normalisation owned by RTP-002.
3. In each of the twelve legacy repositories, delete the tracked `.ki-meta` payload and remove live `.ki-meta`, `.ki/bin`, wrapper, package-alias, and vendored-runner instructions. Preserve historical records where their explicit subject is the retired design.
4. Repair only settled configuration drift. Replace `ki-repo-roadmap` with `ki-roadmap` where a repository has the non-KB roadmap shape, remove declarations for absent capabilities, add presently applicable stable declarations, and ensure `[ki-repo].supported_runtimes` honestly names the repository's supported agents.
5. Reconcile repository and user runtime discovery through `ki skill repo` or `ki skill user` only where the current activation contract requires it. Never restore copied checkers, aggregate runners, or repository-local execution payloads.
6. Run each repository's declared native audit. Separate activation failures—unresolved capability, unsafe path, stale declaration, or missing runtime publication—from genuine standards findings emitted after execution. Fix activation in this plan; record substantive content findings in the owning repository's existing roadmap, Stream, or a narrowly scoped new item only when they lack a durable home.
7. Run the relevant repository-owned test, typecheck, build, and focused audit gates after each migration. Commit every repository independently with explicit paths, preserving pre-existing commits and leaving pushes for explicit user instruction.
8. Re-run the fourteen-repository matrix from clean worktrees. Require zero tracked `.ki` or `.ki-meta`, zero live runner invocation, successful declared-skill resolution, and an honest recorded outcome for every native audit.
9. Update the onboarding and migration guidance with the proven fleet procedure and its boundary from RTP-002 and the later GitHub CI acceptance pass.

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

## Dependencies / blocks

This local activation rollout is independent of RTP-002 because it excludes environment-capability naming and conditional coverage. RTP-002 will later migrate only that deliberately deferred configuration surface.

The rollout prepares but does not complete the separate GitHub CI fleet item. It changes no live GitHub settings and performs no push without explicit instruction.
