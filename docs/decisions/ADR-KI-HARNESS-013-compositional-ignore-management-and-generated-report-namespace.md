---
id: ADR-KI-HARNESS-013
title: 'Compositional ignore management and generated report namespace'
date: 2026-08-27
status: current
decision_type: architecture
decision_type_url: https://knowledgeislands.info/specifications/decision-records/adr
---

# ADR-KI-HARNESS-013: Compositional ignore management and generated report namespace

## Context

Knowledge Islands repositories accumulated hand-maintained ignore rules for dependencies, runtime projections, coverage, test artifacts, website builds, Cloudflare state, and retired `.ki` output. The rules varied between repositories and sometimes hid legacy state that should instead be visible. Multiple skills have legitimate knowledge of generated artifacts, but the native rubric host rejects overlapping writes to one path, so independent `.gitignore` writers cannot safely compose. Tool-default output locations also spread disposable reports across repository roots and workspaces.

## Decision

`ki-repo` is the sole writer and composer of each root `.gitignore`. It renders dependency-stable, marker-bounded blocks whose rules and explanatory comments are owned by the relevant declared skills. Existing repository-specific rules are preserved beneath an exact terminal unmanaged header and surfaced as informational inventory for later fleet reconciliation; malformed managed markers fail closed.

The `ki-repo` block reserves `reports/` at every workspace depth for disposable generated reports. Coverage tools write to `reports/coverage` in a flat repository or `<workspace>/reports/coverage` in a monorepo. Browser and integration test artifacts use the corresponding `reports/tests` location. Semantic build output remains at its capability seam, such as `dist/`.

The retired `.ki/audits/` and `.ki/conform/` rules are removed. `.ki` is forbidden and deliberately visible. Automatic cleanup is limited to a physical, wholly untracked `.ki` tree containing only regular files and directories under those two retired output roots; tracked content, links, special files, or any other path fail closed.

## Consequences

Repository ignore policy becomes attributable and mechanically reconcilable without permitting concurrent writes to the same file. A single `reports/` rule replaces an expanding list of coverage and test-tool defaults, while workspace scoping keeps generated evidence beside the package that owns it. Repository-specific needs remain intact and auditable until a recurring pattern has a clear producing skill and portable boundary.

The initial fleet rollout must rewrite every registered repository's `.gitignore`, reconfigure existing report producers, and remove generated legacy output only where the safety proof succeeds. Until receiving repositories accept those changes, their old output paths and unmanaged inventories remain migration findings rather than harness defects.

## References

- [ADR-KI-HARNESS-004](ADR-KI-HARNESS-004-composition-over-extension.md) — establishes composition as the harness architecture.
- [ADR-KI-HARNESS-012](ADR-KI-HARNESS-012-compatible-harness-publication-and-governed-rubric-boundary.md) — establishes the native governed-rubric host and retires vendored repository runners.
- [GDR-KI-HARNESS-003](GDR-KI-HARNESS-003-portable-git-governance-ownership.md) — establishes portable Git-governance ownership.
