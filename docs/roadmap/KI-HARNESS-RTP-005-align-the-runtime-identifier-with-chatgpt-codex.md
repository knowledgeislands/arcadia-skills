---
id: KI-HARNESS-RTP-005
title: Align the Codex runtime identifier with ChatGPT Codex
theme: runtime-portability
horizon: blocking
status: acceptance
blocks: []
blocked-by: []
baseline-ref: 20b134022b361b09d9a75a4f166dd6e5ad3eb198
---

## Context

The KI contract currently calls the runtime `codex`, while the detected local agent integration is `chatgpt-codex`.

Align the canonical runtime identifier with the integration name so repository declarations, skill metadata, validation messages, and runtime-specific guidance use one unambiguous vocabulary.

## Boundary

Do not retain `codex` as a compatibility alias or introduce a dual identifier model.

The eventual migration must make existing KI-managed state conform to the corrected current contract rather than leave legacy declarations or links in place.

Product references to Codex, such as its configuration paths and the `ki-tokenomics-codex` concern name, are not configuration-runtime identifiers and remain in scope only when their wording falsely declares the runtime contract.

## Current state

`tools-ki` previously defined its supported runtime vocabulary as `claude-code` and `codex`, then mapped the detected `chatgpt-codex` agent to the latter.

The harness and existing repository declarations repeated `codex` in `supported_runtimes` and `ki-supported-runtimes`, requiring users to translate between the configured runtime and the agent KI actually detects and links. The CLI, harness, and fleet declarations now use the detected identifier directly.

## Steps

1. [x] Inventory uses of `codex` and classify each as a runtime identifier, a detected-agent identifier, a product reference, or a path/schema key.
2. [x] Update the canonical runtime contract to `chatgpt-codex`, including `tools-ki` validation, repository initialisation, managed-link selection, harness frontmatter, and repository configuration examples.
3. [x] Migrate existing KI-managed user and repository declarations through a safe, explicit path; reject legacy `codex` declarations with targeted recovery guidance once migration is complete.
4. [x] Update affected tests, fixtures, diagnostics, and runtime-specific documentation without renaming unrelated Codex product concepts.
5. [x] Hand off the CLI-owned migration to `tools-ki`, then coordinate its adopted implementation record and verify the two repositories publish one consistent contract.

## Files touched

- `ki-agentic-harness/.ki-config.toml`, runtime-bound skill metadata, documentation, and fixtures that declare the runtime contract.
- `tools-ki` runtime validation, agent-to-runtime mapping, repository initialisation, tests, and documentation, through [KI-TOOL-CLI-012](../../tools-ki/docs/roadmap/KI-TOOL-CLI-012-align-runtime-identifier-with-chatgpt-codex.md).

## Verify

- `bun run test` and `bunx tsc --noEmit` pass in both repositories.
- `ki repo audit --skill ki-roadmap` passes in `ki-agentic-harness`; relevant native `ki repo audit` checks pass in `tools-ki`.
- A fresh bootstrap and repository-skill activation recognise `chatgpt-codex` and `claude-code`, with no accepted `codex` runtime declaration remaining.

## Dependencies / blocks

There is no known internal prerequisite.

The cross-repository `tools-ki` change must be coordinated before the corrected contract can be released; the receiving repository owns its implementation record and acceptance evidence.

`tools-ki` has adopted the bounded CLI-owned work as [KI-TOOL-CLI-012](../../tools-ki/docs/roadmap/KI-TOOL-CLI-012-align-runtime-identifier-with-chatgpt-codex.md). Its implementation and acceptance evidence at `535335c297c5ac2fdc539671cf480af66b437752` satisfy the prerequisite for this item's standard and fleet migration.

## Acceptance

### Delivered

The canonical KI runtime identifiers are now `claude-code` and `chatgpt-codex`.

`tools-ki` accepts, writes, and activates `chatgpt-codex`, while its targeted diagnostics reject legacy `codex` with a direct replacement instruction.

The harness validates the same vocabulary in repository declarations and runtime-bound skill metadata, with the old identifier expressly rejected rather than retained as a compatibility path.

### Summary of changes

KI-TOOL-CLI-012 delivered the executable contract at `535335c297c5ac2fdc539671cf480af66b437752` and recorded its acceptance evidence at `0422e85`.

The harness contract changed at `92eea5a7`: its own declaration, runtime-bound skills, `ki-repo` default and coverage checker, `ki-skills` metadata checker, standards, exemplars, and focused test cases now agree on `chatgpt-codex`.

The exact legacy declaration was migrated and pushed in twelve repositories: `homebrew-tap`, `ki-arcadia-principal`, `ki-plugins`, `ki-specifications`, `ki-website`, `mcp-claude-housekeeping`, `mcp-git-audit`, `mcp-gsuite`, `mcp-ki-kb-fs`, `mcp-ki-kb-notion-mirror`, `mcp-m365`, and `tools-mgit`.

### Verification

- `tools-ki`: 448 CLI tests, `bunx tsc --noEmit`, and `bunx biome check src README.md` passed.
- `ki-agentic-harness`: 234 tests and `bunx tsc --noEmit` passed.
- `ki repo audit --skill ki-skills` and `ki repo audit --skill ki-repo` passed in the harness.
- `ki repo audit --skill ki-repo` passed in `tools-ki` when evaluated through the current local launcher.
- All twelve migrated repositories passed the `ki-repo` audit after their declaration update.
- A workspace-wide scan found no exact `"codex"` entry in any Knowledge Islands `.ki-config.toml`.

### Outstanding concerns

The source change is published, but the default `ki` command in the `tools-ki` shell still resolves Homebrew's 0.2.13 release, whose parser accepts only the old vocabulary.

Release or upgrade that installed CLI before expecting ordinary system `ki` invocations to consume `chatgpt-codex`; this item does not authorise a release, Homebrew formula update, or production deployment.

### Mini recap

The migration reaches the source contract, CLI, tests, and every available Knowledge Islands repository declaration without a legacy alias.

It stops at acceptance pending the normal review decision and a separately authorised CLI release path.

## Discussion

### Target contract

Replace `codex` with `chatgpt-codex` wherever KI defines or validates its supported runtime vocabulary, while retaining `claude-code` as the Claude Code identifier.

Update the harness capability metadata, `tools-ki` runtime validation and agent mapping, repository configuration examples, tests, and runtime-specific documentation as one consistent contract change.

### Migration boundary

Inventory every current footprint of the old identifier before implementation, including user configuration, repository declarations, managed discovery paths, diagnostic output, and test fixtures.

The migration must either rewrite each managed footprint safely or fail with targeted recovery guidance; it must not accept both identifiers indefinitely.

### Verification

Prove that `chatgpt-codex` activates the correct repository and user skills, that `claude-code` remains unaffected, and that no supported configuration or generated diagnostic still emits `codex` as a runtime identifier.

### Cross-repository ownership

The harness owns the portable standard, its configuration/rubric consequences, and the fleet migration that follows the corrected CLI contract.

`tools-ki` owns the executable vocabulary, agent-to-runtime mapping, repository initialisation, managed activation, CLI-facing diagnostics, and their contract tests.

`tools-ki` adopted this work as [KI-TOOL-CLI-012](../../tools-ki/docs/roadmap/KI-TOOL-CLI-012-align-runtime-identifier-with-chatgpt-codex.md), which remains independently prioritised and owns the executable's acceptance evidence.
