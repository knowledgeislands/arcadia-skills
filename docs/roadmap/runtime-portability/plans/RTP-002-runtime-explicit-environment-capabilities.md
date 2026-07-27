---
id: 'RTP-002'
title: Make environment capabilities runtime-explicit
status: open
roadmap: runtime-portability/make-environment-capabilities-runtime-explicit
blocks: —
blocked-by: —
baseline-ref: —
---

## Context

The environment cluster governs state and configuration around repositories rather than repository structure alone. Its present names and contracts do not consistently distinguish portable environment policy from one vendor's files, applications, and runtime behaviour.

`ki-housekeeping` and `ki-tokenomics` are currently Claude capabilities under generic names. `ki-binding` presents itself primarily as a Claude cross-surface capability while already containing a Codex MCP surface and renderer. `ki-binding-chezmoi` combines the separate renderer and runtime axes, while `ki-dotfiles-chezmoi` is broadly portable but still needs its runtime assumptions checked.

Runtime-specific capabilities should be installable and declarable only for the runtimes a user and repository actually use. A generic capability should survive only when it owns a substantive shared contract rather than serving as an empty namespace above vendor implementations.

## Current state

- The completed historical RTP-001 review made runtime binding explicit through `ki-runtime-binding: true`, but did not define vendor-specific environment capability composition or activation.
- The pre-native housekeeping context audited only the selected repository's `~/.claude/projects/<repo-slug>/memory/`; the native session now scans every physical Claude project memory directory, so one repository audit reports failures belonging to unrelated repositories.
- The pre-native tokenomics checker composed a repository target with an optional user layer. Its native session now measures only `~/.claude` and `.claude.json` and reports every repository-selected concern as NOT_APPLICABLE.
- Housekeeping's `SELF-*` family verifies the repository-local `ki-self` source and runtime projection. It supports the local-governance landing place but does not itself harvest or write learnings; `ki-recap` routes learnings and `ki-self` owns recurring local concerns.
- The repository standard currently calls housekeeping and tokenomics opt-in. Fleet configuration reflects that policy rather than the intended rule that every supported runtime has corresponding housekeeping and tokenomics coverage.
- `ki-binding` recognises both Claude and Codex client tokens, but its public contract, Cowork plugin work, Codex renderer, and renderer-neutral source model are interleaved.

## Steps

1. Inventory `ki-binding`, `ki-binding-chezmoi`, `ki-dotfiles-chezmoi`, `ki-housekeeping`, and `ki-tokenomics` across their skill bodies, references, scripts, rubric families, sources, dependencies, and generated publications. Classify every responsibility as portable environment policy, Claude-specific, Codex-specific, renderer-specific, or genuinely shared repository context.
2. Define one naming and composition matrix for environment capabilities. Retain a generic skill only where its portable rules stand independently; use explicit vendor names for vendor-bound capabilities; keep renderer selection orthogonal to agent-vendor selection; and create no empty symmetric skill, alias, fallback, or dual configuration path.
3. Restore the intended composed execution boundary before expanding coverage: housekeeping audits only the selected repository's runtime memory plus its relevant local companion evidence, and tokenomics joins repository-local and bounded user-runtime evidence in one session. Preserve safe scoped writes and ensure a repository audit cannot fail on another repository's state.
4. Reconcile the learning and local-governance boundary. Keep `ki-recap` responsible for harvesting and routing learnings, `ki-self` responsible for repository-local recurring concerns, runtime housekeeping responsible for runtime state hygiene, and runtime tokenomics responsible for the cost and placement of loaded context. Move or rewrite rubric items that cross those owners.
5. Refactor cross-surface binding around its two independent axes: the portable canonical MCP source and client-targeting contract; vendor adapters for Claude and Codex surfaces; and renderer adapters such as chezmoi. Preserve one source of truth while allowing users to activate only the vendor and renderer capabilities they use.
6. Implement evidence-backed Claude and Codex environment capabilities for the state and surfaces each runtime actually exposes. Rename the existing Claude-only housekeeping and tokenomics capabilities explicitly; add a Codex counterpart only with a real standard, sources, rubric, and executable context.
7. Make housekeeping and tokenomics coverage conditional requirements of `[ki-repo].supported_runtimes`: every declared runtime must resolve its corresponding environment capabilities. Keep binding and renderer capabilities coverage-detected by their actual source and tool usage rather than making chezmoi or a particular MCP binding universal.
8. Update `ki` activation where necessary so repository declarations and user skill links select only capabilities compatible with configured or detected runtimes. Materialise any `tools-ki` change as a direct recipient-owned roadmap plan before changing that repository.
9. Migrate the harness, all affected `.ki-config.toml` files, user guidance, taxonomy, diagrams, decisions, dependency edges, installed-skill selections, and fleet declarations directly to the final names and composition. Remove superseded names and paths in the same bounded change.
10. Regenerate rubric publications, run focused catalogue and context tests, then audit every affected repository with its declared runtime set. Confirm that Claude-only state is never read for a Codex-only repository and vice versa.

## Files touched

- `skills/environment/` and the affected shared taxonomy, guides, diagrams, decisions, and generated rubric publications
- `skills/keystone/ki-repo/` runtime-coverage rules and fixtures
- `.ki-config.toml` and affected Knowledge Islands fleet configurations
- A separate recipient-owned `tools-ki` plan and implementation only if activation or execution-host changes are required

## Verify

1. Every environment rule is visibly classified as portable, Claude-specific, Codex-specific, renderer-specific, or shared repository context.
2. Generic capability names contain no accidental vendor-only contract; vendor-named capabilities contain the complete real standard and executable evidence for that vendor.
3. A focused housekeeping audit reads only the selected repository's corresponding runtime state and local companion evidence.
4. Tokenomics reports both repository-local and bounded runtime/user attribution instead of marking the repository layer unavailable.
5. Every fleet repository resolves housekeeping and tokenomics for each declared supported runtime, and resolves no runtime capability it does not support.
6. Binding retains one canonical MCP source while Claude, Codex, and renderer-specific actions can be activated independently.
7. No superseded capability name, compatibility alias, fallback runner, stale declaration, or duplicate standard remains.
8. Focused catalogue/context tests, generated-rubric parity, `bun run test`, `bunx tsc --noEmit`, and the relevant `ki repo audit --skill <capability>` gates pass.
9. The final fleet audit does not report another repository's runtime state as a finding of the selected repository.

## Dependencies / blocks

This plan follows the completed RTP-001 runtime-binding audit and turns its structural distinction into an explicit environment-capability model.

The output-control restoration in `tools-ki` is independent. If runtime-based activation or host execution requires a CLI change, that recipient work must be planned directly in `tools-ki` and completed before the fleet migration step.
