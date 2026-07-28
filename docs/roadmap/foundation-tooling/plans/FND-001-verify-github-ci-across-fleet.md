---
id: 'FND-001'
title: Verify GitHub CI across the repository fleet
status: done
roadmap: foundation-tooling/verify-github-ci-across-the-repository-fleet
blocks: —
blocked-by: —
baseline-ref: 6c0f8dab73b4cb5381dc7b4d4a89cecb9bf0c669
---

## Context

Every active Knowledge Islands repository must prove its declared governance and repository gates on a clean GitHub-hosted runner using a verified released `ki` and canonical harness inventory. Repository-owned workflow corrections remain in their receiving repositories; this plan coordinates the evidence and acceptance only.

## Current state

Every workflow-bearing active repository now proves a released `ki` installation and canonical harness bootstrap before its repository gates. [tools-ki v0.2.11](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.11) pins the current canonical harness payload; its [hosted release run](https://github.com/knowledgeislands/tools-ki/actions/runs/30315149739) verifies the signed Linux release installation. The final fleet sweep is green for all 13 workflow-bearing repositories. `ki-plugins` is the sole reviewed exclusion because it is a generated projection whose source and generator remain owned and verified by the harness.

## Steps

1. ✓ Freeze a manifest of every non-archived Knowledge Islands repository and record its current workflow, declared skills, required test/build/release-adjacent gates, permissions, secrets, caches, and justified runner platforms.
2. ✓ Prove the released-install contract once on a clean Linux runner: [tools-ki v0.2.11](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.11) [run 30315149739](https://github.com/knowledgeislands/tools-ki/actions/runs/30315149739) installs the signed immutable release into a known directory, asserts `ki --version`, `ki diag`, and `command -v ki` identify that executable, bootstraps isolated KI state, and inventories the canonical harness. The executable-path assertions are the fail-closed shadow-path guard before bootstrap.
3. ✓ Each receiving repository owns its workflow change. Each workflow installs and verifies released `ki`, rejects a shadow executable, bootstraps the canonical harness non-interactively, runs `ki repo audit --repo .` before its repository-specific gates, and retains only its justified platforms, permissions, caches, and secrets. `ki-plugins` is the reviewed generated-projection exclusion.
4. ✓ Review and land each receiving-repository change through its normal default-branch path. The acceptance packet records the accepted commit, hosted workflow, release version, resolved executable path, harness evidence, and gate result.
5. ✓ Run the final GitHub-only fleet sweep. Every workflow-bearing active repository has a green default-branch workflow; `ki-plugins` has the documented, justified exclusion.

## Files touched

- This plan and its derived roadmap reference.
- Receiving repositories: `.github/workflows/` and only their own CI helpers, tests, or explicit exclusion records.

## Verify

- `gh api --paginate 'orgs/knowledgeislands/repos?per_page=100&type=all'` classifies every non-archived repository.
- Each workflow proves the released executable path, non-development `ki diag` result, isolated `ki bootstrap`, canonical harness inventory, and fail-closed path-shadow guard.
- Each workflow runs `ki repo audit --repo .` before its declared repository gates, and every accepted default-branch run is green or has a documented, justified exclusion.

## Dependencies / blocks

The [CLI-005](https://github.com/knowledgeislands/tools-ki/blob/main/docs/roadmap/cli/plans/CLI-005-repair-verified-release-installer-contract.md) release-install acceptance gate is satisfied by [tools-ki v0.2.11](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.11) and [run 30315149739](https://github.com/knowledgeislands/tools-ki/actions/runs/30315149739). Do not repair fleet rollout by using a checkout, package alias, vendored executor, or unsigned side download.

## Delegation

- Round 1 — research: inventory disjoint repository groups and return evidence rows; files: read-only workflow/configuration scope; gate: the released-install contract is proven.
- Round 2 — mechanical: make one receiving repository own one workflow change; files: exclusive receiving-repository paths; gate: local workflow review and repository gates.
- Round 3 — verification: independently inspect disjoint hosted default-branch runs; gate: every evidence row is complete.
- Orchestrator: review every external diff, confirm exclusions, run the final fleet sweep, and accept only the complete green/excluded matrix.

## Acceptance

### Delivered

All 13 active Knowledge Islands repositories that own a GitHub workflow now install and verify released `ki` v0.2.11, bootstrap the canonical harness in isolated state, and audit the repository before their existing gates.

`ki-plugins` is explicitly excluded: it is a generated marketplace projection, not an independently authored or executable surface. Its generator and source contract remain verified in `ki-agentic-harness`; adding a hand-maintained duplicate workflow there would violate its ownership boundary.

### Summary of changes

- Released `tools-ki` v0.2.11 with canonical harness commit `8e7b9fd9ee69ea5497996c41251aa21fad3affc1` and its immutable archive evidence.
- Added the released-install, shadow-path, isolated-bootstrap, canonical-harness, and repository-audit prelude to each receiving workflow.
- Persisted the isolated KI data, configuration, cache, state, executable, and man paths between CI steps.
- Restored the minimal repository scaffolds, authoring configuration, and shell conditional clarity required for the receiving repositories' existing gates.

### Verification

- [tools-ki v0.2.11](https://github.com/knowledgeislands/tools-ki/releases/tag/v0.2.11) completed its hosted release validation, including a clean Linux installation.
- Each green workflow below proves the exact installed executable, regular diagnostic state, canonical bootstrap inventory, and `ki repo audit --repo .` before its repository gates.

| Repository                | Landed commit | Default-branch evidence |
| ------------------------- | ------------- | ----------------------- |
| `ki-agentic-harness`      | `c7902a57`    | [green][ci-harness]     |
| `tools-ki`                | `1b5d0ff`     | [green][ci-tools]       |
| `tools-mgit`              | `1ff4511`     | [green][ci-mgit]        |
| `homebrew-tap`            | `9c83470`     | [green][ci-homebrew]    |
| `ki-specifications`       | `517e219`     | [green][ci-specs]       |
| `ki-website`              | `cfd1ede`     | [green][ci-website]     |
| `mcp-ki-kb-fs`            | `e46b330`     | [green][ci-kb-fs]       |
| `ki-arcadia-principal`    | `2349a76`     | [green][ci-arcadia]     |
| `mcp-m365`                | `a3cad30`     | [green][ci-m365]        |
| `mcp-claude-housekeeping` | `ee58b1b`     | [green][ci-housekeep]   |
| `mcp-git-audit`           | `86ac6f0`     | [green][ci-git-audit]   |
| `mcp-ki-kb-notion-mirror` | `f54e5b5`     | [green][ci-notion]      |
| `mcp-gsuite`              | `68a5130`     | [green][ci-gsuite]      |

[ci-harness]: https://github.com/knowledgeislands/ki-agentic-harness/actions/runs/30315445562
[ci-tools]: https://github.com/knowledgeislands/tools-ki/actions/runs/30315948664
[ci-mgit]: https://github.com/knowledgeislands/tools-mgit/actions/runs/30316043529
[ci-homebrew]: https://github.com/knowledgeislands/homebrew-tap/actions/runs/30315904347
[ci-specs]: https://github.com/knowledgeislands/ki-specifications/actions/runs/30315927867
[ci-website]: https://github.com/knowledgeislands/ki-website/actions/runs/30315803939
[ci-kb-fs]: https://github.com/knowledgeislands/mcp-ki-kb-fs/actions/runs/30315802692
[ci-arcadia]: https://github.com/knowledgeislands/ki-arcadia-principal/actions/runs/30315993593
[ci-m365]: https://github.com/knowledgeislands/mcp-m365/actions/runs/30315802397
[ci-housekeep]: https://github.com/knowledgeislands/mcp-claude-housekeeping/actions/runs/30315808215
[ci-git-audit]: https://github.com/knowledgeislands/mcp-git-audit/actions/runs/30315284819
[ci-notion]: https://github.com/knowledgeislands/mcp-ki-kb-notion-mirror/actions/runs/30315286499
[ci-gsuite]: https://github.com/knowledgeislands/mcp-gsuite/actions/runs/30315288199

### Outstanding concerns

None. `ki-plugins` is a reviewed source-owned exclusion, not an unverified active workflow repository.

### Mini recap

The release must embed the harness contract that its workflows verify. CI must also persist all isolated KI state between steps and install the repository toolchain before audit. Once those boundaries were explicit, the remaining failures were ordinary receiving-repository conformance issues and could be corrected in their owning repositories.

## Done

Recorded complete after explicit acceptance on 2026-07-28. All workflow-bearing repositories have green default-branch CI against released `ki` v0.2.11; the `ki-plugins` generated-projection exclusion remains intentional. No residual concern or follow-up is required for this completed tranche.
