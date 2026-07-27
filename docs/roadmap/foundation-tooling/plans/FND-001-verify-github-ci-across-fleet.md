---
id: 'FND-001'
title: Verify GitHub CI across the repository fleet
status: in-progress
roadmap: foundation-tooling/verify-github-ci-across-the-repository-fleet
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Every active Knowledge Islands repository must prove its declared governance and repository gates on a clean GitHub-hosted runner using a verified released `ki` and canonical harness inventory. Repository-owned workflow corrections remain in their receiving repositories; this plan coordinates the evidence and acceptance only.

## Current state

The harness workflow currently runs `ki repo audit` from its checkout without first proving a released `ki` installation and canonical harness bootstrap. Seven existing governance workflows fail because `ki` is absent, while five active repositories have no workflow. [CLI-005](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-005-repair-verified-release-installer-contract.md) is now proven by [tools-ki v0.2.10](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.10) and its [clean hosted Linux run](https://github.com/knowledgeislands/tools-ki/actions/runs/30313258611): the signed immutable release installed into isolated paths, `command -v ki` and `ki diag` identified the installed executable, bootstrap created valid isolated state, and the canonical harness inventory was present. The remaining work is the receiving-repository workflow rollout and fleet sweep.

## Steps

1. ✓ Freeze a manifest of every non-archived Knowledge Islands repository and record its current workflow, declared skills, required test/build/release-adjacent gates, permissions, secrets, caches, and justified runner platforms.
2. ✓ Prove the released-install contract once on a clean Linux runner: [tools-ki v0.2.10](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.10) [run 30313258611](https://github.com/knowledgeislands/tools-ki/actions/runs/30313258611) installs the signed immutable release into a known directory, asserts `ki --version`, `ki diag`, and `command -v ki` identify that executable, bootstraps isolated KI state, and inventories the canonical harness. The executable-path assertions are the fail-closed shadow-path guard before bootstrap.
3. Have each receiving repository own its workflow change or an explicit, reviewed exclusion. Each workflow installs and verifies released `ki`, rejects a shadow executable, bootstraps the canonical harness non-interactively, runs `ki repo audit --repo .` before its repository-specific gates, and retains only its justified platforms, permissions, caches, and secrets.
4. Review and land each receiving-repository change through its normal default-branch path. Record the accepted commit, workflow URL or run ID, release version, resolved executable path, harness evidence, and gate result in this plan's acceptance packet.
5. Run a final GitHub-only fleet sweep. Require a green default-branch workflow for every active non-excluded repository and escalate each acquisition, harness, permissions, or platform failure to its owner without hiding it in the harness.

## Files touched

- This plan and its derived roadmap reference.
- Receiving repositories: `.github/workflows/` and only their own CI helpers, tests, or explicit exclusion records.

## Verify

- `gh api --paginate 'orgs/knowledgeislands/repos?per_page=100&type=all'` classifies every non-archived repository.
- Each workflow proves the released executable path, non-development `ki diag` result, isolated `ki bootstrap`, canonical harness inventory, and fail-closed path-shadow guard.
- Each workflow runs `ki repo audit --repo .` before its declared repository gates, and every accepted default-branch run is green or has a documented, justified exclusion.

## Dependencies / blocks

The [CLI-005](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-005-repair-verified-release-installer-contract.md) release-install acceptance gate is satisfied by [tools-ki v0.2.10](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.10) and [run 30313258611](https://github.com/knowledgeislands/tools-ki/actions/runs/30313258611). Do not repair the remaining fleet rollout by using a checkout, package alias, vendored executor, or unsigned side download.

## Delegation

- Round 1 — research: inventory disjoint repository groups and return evidence rows; files: read-only workflow/configuration scope; gate: the released-install contract is proven.
- Round 2 — mechanical: make one receiving repository own one workflow change; files: exclusive receiving-repository paths; gate: local workflow review and repository gates.
- Round 3 — verification: independently inspect disjoint hosted default-branch runs; gate: every evidence row is complete.
- Orchestrator: review every external diff, confirm exclusions, run the final fleet sweep, and accept only the complete green/excluded matrix.
