---
id: ADR-KI-HARNESS-TOOLCHAIN-001
title: 'Bun, Biome, and knip standard toolchain'
date: 2026-08-12
status: current
type: Architecture Decision Record
type_url: https://knowledgeislands.info/specifications/decision-records/adr
decision_type: architecture
---

# ADR-KI-HARNESS-TOOLCHAIN-001: Bun, Biome, and knip standard toolchain

## Context

Knowledge Islands repos need a consistent toolchain for installing, running scripts, linting, type-checking, and dependency/dead-code hygiene across TypeScript. Multiple viable options exist (npm/yarn/pnpm vs Bun; ESLint/Prettier vs Biome; depcheck vs knip). Without a single standard, each repo would carry different configuration, script names, and lock files, making cross-repo tooling and the governance checkers themselves inconsistent.

## Decision

All Knowledge Islands TypeScript repos use Bun for package management and development, while compiled output runs on supported Node. Biome provides TypeScript and JSON formatting/linting, `tsc --noEmit` provides type-checking, rumdl provides the authoring-owned Markdown pass, and knip provides dependency and dead-code hygiene. Each repository has an intentional `knip.json` describing its real entry points, generated surfaces, and justified exceptions.

The verified installed `ki` collection is the only governance entrypoint. `ki repo audit` runs the read-only declared governance set and `ki repo conform` performs its bounded write pass; each command may be focused to a declared skill. The registered engineering operation invokes its code tools directly. Package scripts retain only universal lifecycle entrypoints (`test`, `build`, `clean`, `prepare`) and explicitly owned repository capabilities. Derived governance aliases and per-tool lint, dependency, knip, or aggregate verification script families are retired. `ki:deps:update` remains the explicit dependency-maintenance action.

## Consequences

- CI and contributors use the same native collection-backed governance commands rather than a checkout-local script wrapper. Building and testing remain explicit lifecycle operations after conformance when applicable.
- Toolchain checks remain executable inside the engineering operation, while authoring owns Markdown execution. A new published entry point must be represented in `knip.json`; otherwise the audit makes the potentially destructive false-positive risk visible for human resolution.
- Repositories retain a small, predictable package-script surface. Removing the retired aliases is a clean cutover: no compatibility command is retained solely for an intermediate workflow.
- A local engineering check record can document an exception but cannot suppress an audit finding; the repository's owning change process decides and records any actual divergence.
- A change of toolchain or a compatibility floor remains a repository decision with a documented rationale.

## References

- [knip.dev](https://knip.dev) — dependency and dead-code analysis.
