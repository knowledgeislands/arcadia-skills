---
id: ADR-KI-HARNESS-TOOLCHAIN-001
title: 'Bun, Biome, and knip standard toolchain'
date: 2026-09-07
status: current
decision_type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-TOOLCHAIN-001: Bun, Biome, and knip standard toolchain

## Context

The repository root and a selected application workspace expose different command surfaces. The root composes public capability aliases across the repository, while an artifact skill can require exact package-local implementation names inside its workspace. Reading the root naming law across every nested manifest makes those local names appear unowned; limiting it to the root leaves nested script ownership to the selected artifact standard.

Knowledge Islands repos need a consistent toolchain for installing, running scripts, linting, type-checking, and dependency/dead-code hygiene across TypeScript. Multiple viable options exist (npm/yarn/pnpm vs Bun; ESLint/Prettier vs Biome; depcheck vs knip). Without a single standard, each repo would carry different configuration, script names, and lock files, making cross-repo tooling and the governance checkers themselves inconsistent.

## Decision

The script ownership namespace contract applies to the repository root `package.json`. Capability-owned public commands use claimed `ki:` names there, repository-owned commands use `self:`, and `script_exclusions` records only externally constrained bare root names. A selected workspace package follows its artifact skill's local command contract and does not repeat those names in the root exclusion list.

The content website implementation keeps exact local `build`, `dev`, `dev:css`, `dev:serve`, and `clean` scripts inside the selected site workspace. The root website seam claims only `ki:site:build`, `ki:site:dev`, and `ki:site:clean`, which delegate to that package. A flat content site does not satisfy this composition; it must move the site into a root-declared workspace rather than exclude the mandated local names.

All Knowledge Islands TypeScript repos use Bun for package management and development, while compiled output runs on supported Node. Biome provides TypeScript and JSON formatting/linting, `tsc --noEmit` provides type-checking, rumdl provides the authoring-owned Markdown pass, and knip provides dependency and dead-code hygiene. Each repository has an intentional `knip.json` describing its real entry points, generated surfaces, and justified exceptions.

The verified installed `ki` collection is the only governance entrypoint. `ki repo audit` runs the read-only declared governance set and `ki repo conform` performs its bounded write pass; each command may be focused to a declared skill. The registered engineering operation invokes its code tools directly. Package scripts use three ownership shapes: the universal bare lifecycle entrypoints (`build`, `prepare`, `test`, `test:coverage`, `test:watch`, and `clean`), capability-owned `ki:` names, and repository-owned `self:` names with a non-empty suffix. An exact `script_exclusions` entry is reserved for a bare name constrained by external tooling. Derived governance aliases and per-tool lint, dependency, knip, or aggregate verification script families are retired. `ki:deps:update` remains the explicit dependency-maintenance action.

## Consequences

- Content website repositories need no `script_exclusions` for the site package's mandated local development scripts.
- A content site must have a root workspace declaration covering its selected non-root site package; the content rubric checks this mechanically.
- Workspace-local artifact commands and root public capability aliases remain distinguishable without teaching `ki-engineering` every artifact's internal script vocabulary.
- The website core does not claim implementation-private `ki:site:dev:css` or `ki:site:dev:serve` root aliases.
- CI and contributors use the same native collection-backed governance commands rather than a checkout-local script wrapper. Building and testing remain explicit lifecycle operations after conformance when applicable.
- Toolchain checks remain executable inside the engineering operation, while authoring owns Markdown execution. A new published entry point must be represented in `knip.json`; otherwise the audit makes the potentially destructive false-positive risk visible for human resolution.
- Repositories retain a small, predictable package-script surface. Removing the retired aliases is a clean cutover: no compatibility command is retained solely for an intermediate workflow.
- A local engineering check record can document an exception but cannot suppress an audit finding; the repository's owning change process decides and records any actual divergence.
- A change of toolchain or a compatibility floor remains a repository decision with a documented rationale.

## References

- [knip.dev](https://knip.dev) — dependency and dead-code analysis.
