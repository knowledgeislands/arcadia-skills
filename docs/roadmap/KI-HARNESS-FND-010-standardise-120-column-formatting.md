---
id: KI-HARNESS-FND-010
title: Standardise 120-column formatting
theme: foundation-tooling
horizon: next
status: draft
blocks: []
blocked-by: []
baseline-ref: null
---

## Goal

Use 120 columns as the repository's shared formatting width in both Prettier and EditorConfig.

## Context

Prettier currently uses a 160-column `printWidth`, while the repository has no matching EditorConfig width. A single 120-column policy gives formatters, editors, reviews, generated Markdown, and the documented authoring convention one predictable line-length target.

## Boundary

This changes formatting policy only. It does not alter Markdown semantic structure, relax Markdown table guidance, or impose a hard lint rule where the tools do not support one. Reformat only files changed by the formatter under the new policy; do not use the policy change to make unrelated prose edits.

## Current state

Prettier is configured with `printWidth: 160`; no repository `.editorconfig` currently supplies a matching maximum line length.

## Steps

- [ ] Set Prettier `printWidth` to `120`.
- [ ] Add or update `.editorconfig` with `max_line_length = 120` for the applicable text formats, without overriding language-specific indentation or line-ending policy.
- [ ] Run Prettier over the repository and retain only mechanical formatting changes.
- [ ] Update any repository guidance that states the former 160-column convention.

## Files touched

- `.prettierrc.json`
- `.editorconfig`
- Formatter-changed repository files
- Applicable formatting or authoring guidance
- This roadmap item

## Verify

- Prettier reports the repository in sync at 120 columns.
- EditorConfig resolves a 120-column maximum line length for Markdown, JSON, TypeScript, and JavaScript editors.
- `bun run test`, `bunx tsc --noEmit`, and the relevant repository audits pass.

## Dependencies / blocks

This change is independently executable after the active rubric-metadata migration restores clean repository-wide audits.

## Discussion

The 120-column target is the forward formatting policy. Existing long lines need change only when the formatter rewrites them under this policy or when they are otherwise edited.
