---
id: KI-HARNESS-RTP-005
title: Align the Codex runtime identifier with ChatGPT Codex
theme: runtime-portability
horizon: blocking
status: open
blocks: []
blocked-by: []
baseline-ref: null
---

## Context

The KI contract currently calls the runtime `codex`, while the detected local agent integration is `chatgpt-codex`.

Align the canonical runtime identifier with the integration name so repository declarations, skill metadata, validation messages, and runtime-specific guidance use one unambiguous vocabulary.

## Boundary

Do not retain `codex` as a compatibility alias or introduce a dual identifier model.

The eventual migration must make existing KI-managed state conform to the corrected current contract rather than leave legacy declarations or links in place.

Product references to Codex, such as its configuration paths and the `ki-tokenomics-codex` concern name, are not configuration-runtime identifiers and remain in scope only when their wording falsely declares the runtime contract.

## Current state

`tools-ki` defines its supported runtime vocabulary as `claude-code` and `codex`, then maps the detected `chatgpt-codex` agent to the latter.

The harness and existing repository declarations repeat `codex` in `supported_runtimes` and `ki-supported-runtimes`, requiring users to translate between the configured runtime and the agent KI actually detects and links.

## Steps

1. Inventory uses of `codex` and classify each as a runtime identifier, a detected-agent identifier, a product reference, or a path/schema key.
2. Update the canonical runtime contract to `chatgpt-codex`, including `tools-ki` validation, repository initialisation, managed-link selection, harness frontmatter, and repository configuration examples.
3. Migrate existing KI-managed user and repository declarations through a safe, explicit path; reject legacy `codex` declarations with targeted recovery guidance once migration is complete.
4. Update affected tests, fixtures, diagnostics, and runtime-specific documentation without renaming unrelated Codex product concepts.
5. Coordinate the corresponding `tools-ki` implementation and verify the two repositories publish one consistent contract.

## Files touched

- `ki-agentic-harness/.ki-config.toml`, runtime-bound skill metadata, documentation, and fixtures that declare the runtime contract.
- `tools-ki` runtime validation, agent-to-runtime mapping, repository initialisation, tests, and documentation.

## Verify

- `bun run test` and `bunx tsc --noEmit` pass in both repositories.
- `ki repo audit --skill ki-roadmap` passes in `ki-agentic-harness`; relevant native `ki repo audit` checks pass in `tools-ki`.
- A fresh bootstrap and repository-skill activation recognise `chatgpt-codex` and `claude-code`, with no accepted `codex` runtime declaration remaining.

## Dependencies / blocks

There is no known internal prerequisite.

The cross-repository `tools-ki` change must be coordinated before the corrected contract can be released; the receiving repository owns its implementation record and acceptance evidence.

## Discussion

### Target contract

Replace `codex` with `chatgpt-codex` wherever KI defines or validates its supported runtime vocabulary, while retaining `claude-code` as the Claude Code identifier.

Update the harness capability metadata, `tools-ki` runtime validation and agent mapping, repository configuration examples, tests, and runtime-specific documentation as one consistent contract change.

### Migration boundary

Inventory every current footprint of the old identifier before implementation, including user configuration, repository declarations, managed discovery paths, diagnostic output, and test fixtures.

The migration must either rewrite each managed footprint safely or fail with targeted recovery guidance; it must not accept both identifiers indefinitely.

### Verification

Prove that `chatgpt-codex` activates the correct repository and user skills, that `claude-code` remains unaffected, and that no supported configuration or generated diagnostic still emits `codex` as a runtime identifier.
