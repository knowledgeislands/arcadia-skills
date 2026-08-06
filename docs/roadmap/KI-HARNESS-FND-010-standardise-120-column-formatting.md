---
id: KI-HARNESS-FND-010
title: Standardise 120-column formatting
theme: foundation-tooling
horizon: next
status: awaiting-review
blocks: []
blocked-by: []
baseline-ref: 19656a1fbe8b4fcab67a9a25f61c2e32aba9b65b
---

## Goal

Use 120 columns as the repository's shared formatting width in both Prettier and EditorConfig.

## Context

Prettier and Biome currently use a 160-column width, while the repository `.editorconfig` has no maximum line length. A single 120-column policy gives formatters, editors, reviews, generated Markdown, and the documented authoring convention one predictable line-length target.

## Boundary

This changes formatting policy only. It does not alter Markdown semantic structure or relax Markdown table guidance. Reformat only files changed by the formatter under the new policy; do not use the policy change to make unrelated prose edits.

## Current state

Prettier `printWidth` and Biome `lineWidth` are both `160`; `.editorconfig` exists but has no `max_line_length`. The authoring and engineering standards repeat the 160-column convention, so changing only one formatter would leave the repository internally inconsistent.

## Steps

- [x] Set Prettier `printWidth` to `120`.
- [x] Set Biome `lineWidth` to `120` wherever the shared engineering configuration and its fixtures define the formatter contract.
- [x] Add `max_line_length = 120` to the existing `.editorconfig` without overriding language-specific indentation or line-ending policy.
- [x] Run Prettier and Biome over the repository and retain only mechanical formatting changes.
- [x] Update every applicable repository guidance, rubric evidence, and fixture that states the former 160-column convention.

## Files touched

- `.prettierrc.json`
- `.editorconfig`
- `biome.json` and its governing engineering fixtures
- Formatter-changed repository files
- Applicable formatting or authoring guidance
- This roadmap item

## Verify

- Prettier and Biome report the repository in sync at 120 columns.
- EditorConfig resolves a 120-column maximum line length for Markdown, JSON, TypeScript, and JavaScript editors.
- `bun run test`, `bunx tsc --noEmit`, and the relevant repository audits pass.

## Dependencies / blocks

The active rubric-metadata migration is complete and repository-wide gates are clean. The user approved the shared 120-column policy, including Biome and governing guidance, on 2026-08-06.

## Review

### Delivered boundary

The repository now uses 120 columns in Prettier, EditorConfig, and Biome. The authoring and engineering standards, their rubric evidence, and their fixtures use the same policy. Prettier reformatted Markdown and Biome reformatted TypeScript and JSON mechanically under the new width.

### Evidence

- Baseline: `19656a1fbe8b4fcab67a9a25f61c2e32aba9b65b`.
- Planning and delivery start: `7f369550` and `a02779eb`.
- Verification: `bunx prettier --write '**/*.md'`; `bunx biome check --write .`; clean follow-up Biome check; `bun run test` (309 passing); `bunx tsc --noEmit`; and focused `ki-authoring`, `ki-engineering`, and `ki-roadmap` audits all pass.
- The only tool notice is Biome's non-blocking schema URL advisory (`2.5.6` configuration versus `2.5.7` CLI); it does not affect formatting or validation.

### Decision

No scope deviation or unresolved concern remains. The policy and mechanical reformat await user review.

## Discussion

The 120-column target is the forward formatting policy. Existing long lines need change only when the formatter rewrites them under this policy or when they are otherwise edited.
